import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface MaterialDialogProps {
  open: boolean;
  onClose: () => void;
  material?: any;
}

export const MaterialDialog = ({ open, onClose, material }: MaterialDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unit: "",
    stock_quantity: "",
    min_stock_quantity: "",
    unit_price: "",
  });

  useEffect(() => {
    if (material) {
      setFormData({
        name: material.name || "",
        description: material.description || "",
        unit: material.unit || "",
        stock_quantity: material.stock_quantity?.toString() || "",
        min_stock_quantity: material.min_stock_quantity?.toString() || "",
        unit_price: material.unit_price?.toString() || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        unit: "",
        stock_quantity: "",
        min_stock_quantity: "",
        unit_price: "",
      });
    }
  }, [material, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        name: formData.name,
        description: formData.description || null,
        unit: formData.unit,
        stock_quantity: parseFloat(formData.stock_quantity),
        min_stock_quantity: parseFloat(formData.min_stock_quantity),
        unit_price: parseFloat(formData.unit_price),
      };

      if (material) {
        const { error } = await supabase
          .from("materials")
          .update(dataToSave)
          .eq("id", material.id);

        if (error) throw error;

        toast({
          title: "Material actualizado",
          description: "Los datos del material se actualizaron correctamente",
        });
      } else {
        const { error } = await supabase
          .from("materials")
          .insert([dataToSave]);

        if (error) throw error;

        toast({
          title: "Material creado",
          description: "El nuevo material se creó correctamente",
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
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {material ? "Editar Material" : "Nuevo Material"}
            </DialogTitle>
            <DialogDescription>
              {material
                ? "Modifica los datos del material"
                : "Ingresa los datos del nuevo material"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unit">Unidad *</Label>
                <Input
                  id="unit"
                  placeholder="ej: Kg, Unidad"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit_price">Precio Unitario *</Label>
                <Input
                  id="unit_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.unit_price}
                  onChange={(e) =>
                    setFormData({ ...formData, unit_price: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock_quantity">Stock Actual *</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.stock_quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, stock_quantity: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="min_stock_quantity">Stock Mínimo *</Label>
                <Input
                  id="min_stock_quantity"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.min_stock_quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, min_stock_quantity: e.target.value })
                  }
                  required
                />
              </div>
            </div>
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