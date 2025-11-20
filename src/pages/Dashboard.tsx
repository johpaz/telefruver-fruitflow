import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LowStockMaterial {
  id: string;
  name: string;
  stock_quantity: number;
  min_stock_quantity: number;
  unit: string;
}

interface CompletedOrder {
  id: string;
  order_number: string;
  total_amount: number;
  created_at: string;
  clients: {
    name: string;
  };
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalMaterials: 0,
    totalOrders: 0,
    lowStockCount: 0,
  });
  const [lowStockMaterials, setLowStockMaterials] = useState<LowStockMaterial[]>([]);
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: clientsCount },
        { count: materialsCount },
        { count: ordersCount },
        { data: lowStockData },
        { data: completedOrdersData },
      ] = await Promise.all([
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("materials").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase
          .from("materials")
          .select("id, name, stock_quantity, min_stock_quantity, unit")
          .lt("stock_quantity", "min_stock_quantity"),
        supabase
          .from("orders")
          .select(`
            id,
            order_number,
            total_amount,
            created_at,
            clients (name)
          `)
          .eq("status", "completed")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setStats({
        totalClients: clientsCount || 0,
        totalMaterials: materialsCount || 0,
        totalOrders: ordersCount || 0,
        lowStockCount: lowStockData?.length || 0,
      });
      setLowStockMaterials(lowStockData || []);
      setCompletedOrders(completedOrdersData || []);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Clientes",
      value: stats.totalClients,
      icon: Users,
      description: "Clientes registrados",
    },
    {
      title: "Materiales",
      value: stats.totalMaterials,
      icon: Package,
      description: "Items en inventario",
    },
    {
      title: "Pedidos",
      value: stats.totalOrders,
      icon: ShoppingCart,
      description: "Pedidos totales",
    },
    {
      title: "Stock Bajo",
      value: stats.lowStockCount,
      icon: TrendingUp,
      description: "Requieren reposición",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Vista general del sistema Telefruver
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {lowStockMaterials.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Alerta de Stock Bajo</AlertTitle>
            <AlertDescription>
              Hay {lowStockMaterials.length} material(es) con stock bajo que requieren reposición.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Materiales con Stock Bajo</CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockMaterials.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay materiales con stock bajo
                </p>
              ) : (
                <div className="space-y-3">
                  {lowStockMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between border-b pb-2 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{material.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Stock actual: {material.stock_quantity} {material.unit}
                        </p>
                      </div>
                      <Badge variant="destructive">
                        Mín: {material.min_stock_quantity}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimos Pedidos Facturados</CardTitle>
            </CardHeader>
            <CardContent>
              {completedOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay pedidos facturados aún
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Fecha</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium text-sm">
                            {order.order_number}
                          </TableCell>
                          <TableCell className="text-sm">{order.clients.name}</TableCell>
                          <TableCell className="text-sm">
                            ${order.total_amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}