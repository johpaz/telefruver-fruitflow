import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  order?: any;
}

export const OrderDialog = ({ open, onClose, order }: OrderDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    client_id: "",
    status: "pending",
    notes: "",
  });
  const [orderItems, setOrderItems] = useState<
    Array<{ material_id: string; quantity: string }>
  >([{ material_id: "", quantity: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      const [clientsRes, materialsRes] = await Promise.all([
        supabase.from("clients").select("id, name").order("name"),
        supabase.from("materials").select("*").order("name"),
      ]);

      if (clientsRes.data) setClients(clientsRes.data);
      if (materialsRes.data) setMaterials(materialsRes.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (order) {
      setFormData({
        client_id: order.client_id || "",
        status: order.status || "pending",
        notes: order.notes || "",
      });
    } else {
      setFormData({
        client_id: "",
        status: "pending",
        notes: "",
      });
      setOrderItems([{ material_id: "", quantity: "" }]);
    }
  }, [order, open]);

  const addOrderItem = () => {
    setOrderItems([...orderItems, { material_id: "", quantity: "" }]);
  };

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateOrderItem = (
    index: number,
    field: "material_id" | "quantity",
    value: string
  ) => {
    const newItems = [...orderItems];
    newItems[index][field] = value;
    setOrderItems(newItems);
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const material = materials.find((m) => m.id === item.material_id);
      if (material && item.quantity) {
        return total + material.unit_price * parseFloat(item.quantity);
      }
      return total;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Usuario no autenticado");
      }

      const totalAmount = calculateTotal();

      if (order) {
        const { error } = await supabase
          .from("orders")
          .update({
            client_id: formData.client_id,
            status: formData.status,
            notes: formData.notes || null,
            total_amount: totalAmount,
          })
          .eq("id", order.id);

        if (error) throw error;

        toast({
          title: "Pedido actualizado",
          description: "Los datos del pedido se actualizaron correctamente",
        });
      } else {
        // Generate order number
        const orderNumber = `ORD-${Date.now()}`;

        const { data: newOrder, error: orderError } = await supabase
          .from("orders")
          .insert([
            {
              order_number: orderNumber,
              client_id: formData.client_id,
              status: formData.status,
              notes: formData.notes || null,
              total_amount: totalAmount,
              created_by: user.id,
            },
          ])
          .select()
          .single();

        if (orderError) throw orderError;

        // Insert order items
        const itemsToInsert = orderItems
          .filter((item) => item.material_id && item.quantity)
          .map((item) => {
            const material = materials.find((m) => m.id === item.material_id);
            const quantity = parseFloat(item.quantity);
            const unitPrice = material?.unit_price || 0;
            return {
              order_id: newOrder.id,
              material_id: item.material_id,
              quantity,
              unit_price: unitPrice,
              subtotal: quantity * unitPrice,
            };
          });

        if (itemsToInsert.length > 0) {
          const { error: itemsError } = await supabase
            .from("order_items")
            .insert(itemsToInsert);

          if (itemsError) throw itemsError;
        }

        toast({
          title: "Pedido creado",
          description: "El nuevo pedido se creó correctamente",
        });
      }

      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {order ? "Editar Pedido" : "Nuevo Pedido"}
            </DialogTitle>
            <DialogDescription>
              {order
                ? "Modifica los datos del pedido"
                : "Ingresa los datos del nuevo pedido"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="client">Cliente *</Label>
              <Select
                value={formData.client_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, client_id: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="processing">En Proceso</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!order && (
              <div className="space-y-4">
                <Label>Items del Pedido</Label>
                {orderItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Select
                      value={item.material_id}
                      onValueChange={(value) =>
                        updateOrderItem(index, "material_id", value)
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Material" />
                      </SelectTrigger>
                      <SelectContent>
                        {materials.map((material) => (
                          <SelectItem key={material.id} value={material.id}>
                            {material.name} - ${material.unit_price}/{material.unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Cantidad"
                      value={item.quantity}
                      onChange={(e) =>
                        updateOrderItem(index, "quantity", e.target.value)
                      }
                      className="w-32"
                    />
                    {orderItems.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeOrderItem(index)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOrderItem}
                >
                  Agregar Item
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
              />
            </div>

            {!order && (
              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};