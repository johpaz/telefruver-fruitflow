import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  id: string;
  material_id: string;
  quantity: number;
  materials: {
    name: string;
    stock_quantity: number;
  };
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  clients: {
    name: string;
  };
  order_items: OrderItem[];
}

export default function Billing() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        clients (name),
        order_items (
          id,
          material_id,
          quantity,
          materials (
            name,
            stock_quantity
          )
        )
      `)
      .in("status", ["pending", "processing"])
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error al cargar pedidos",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleInvoice = async (order: Order) => {
    setProcessingId(order.id);

    // Verificar stock disponible
    const insufficientStock = order.order_items.some(
      (item) => item.materials.stock_quantity < item.quantity
    );

    if (insufficientStock) {
      toast({
        title: "Error al facturar",
        description: "No hay suficiente inventario para completar este pedido",
        variant: "destructive",
      });
      setProcessingId(null);
      return;
    }

    try {
      // Actualizar estado del pedido
      const { error: orderError } = await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("id", order.id);

      if (orderError) throw orderError;

      // Descontar inventario para cada material
      for (const item of order.order_items) {
        const newQuantity = item.materials.stock_quantity - item.quantity;
        
        const { error: inventoryError } = await supabase
          .from("materials")
          .update({ stock_quantity: newQuantity })
          .eq("id", item.material_id);

        if (inventoryError) throw inventoryError;
      }

      toast({
        title: "Pedido facturado",
        description: `El pedido ${order.order_number} se facturó correctamente y se actualizó el inventario`,
      });

      fetchOrders();
    } catch (error: any) {
      toast({
        title: "Error al facturar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: "secondary",
      processing: "default",
    };

    const labels: Record<string, string> = {
      pending: "Pendiente",
      processing: "En Proceso",
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Facturación</h1>
            <p className="text-muted-foreground mt-2">
              Facturar pedidos y actualizar inventario
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Pendientes de Facturar</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-muted-foreground">Cargando...</p>
            ) : orders.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No hay pedidos pendientes de facturar
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const hasInsufficientStock = order.order_items.some(
                        (item) => item.materials.stock_quantity < item.quantity
                      );

                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.order_number}
                          </TableCell>
                          <TableCell>{order.clients.name}</TableCell>
                          <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {order.order_items.map((item, idx) => (
                                <div key={idx} className={hasInsufficientStock && item.materials.stock_quantity < item.quantity ? "text-destructive" : ""}>
                                  {item.materials.name}: {item.quantity}
                                  {item.materials.stock_quantity < item.quantity && (
                                    <Badge variant="destructive" className="ml-2">
                                      Stock insuficiente
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleInvoice(order)}
                              disabled={processingId === order.id || hasInsufficientStock}
                              className="gap-2"
                            >
                              {processingId === order.id ? (
                                "Procesando..."
                              ) : (
                                <>
                                  <Check className="h-4 w-4" />
                                  Facturar
                                </>
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
