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
import { Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MaterialDialog } from "@/components/inventory/MaterialDialog";

interface Material {
  id: string;
  name: string;
  description: string | null;
  unit: string;
  stock_quantity: number;
  min_stock_quantity: number;
  unit_price: number;
  created_at: string;
}

export default function Inventory() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const { toast } = useToast();

  const fetchMaterials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .order("name");

    if (error) {
      toast({
        title: "Error al cargar materiales",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setMaterials(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de eliminar este material?")) return;

    const { error } = await supabase.from("materials").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error al eliminar material",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Material eliminado",
        description: "El material se eliminó correctamente",
      });
      fetchMaterials();
    }
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingMaterial(null);
    fetchMaterials();
  };

  const isLowStock = (material: Material) =>
    material.stock_quantity <= material.min_stock_quantity;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventario</h1>
            <p className="text-muted-foreground mt-2">
              Gestión de materiales de empaque
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Material
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Materiales</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-muted-foreground">Cargando...</p>
            ) : materials.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No hay materiales registrados
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Stock Mínimo</TableHead>
                      <TableHead>Precio Unitario</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>{material.description || "-"}</TableCell>
                        <TableCell>{material.unit}</TableCell>
                        <TableCell>{material.stock_quantity}</TableCell>
                        <TableCell>{material.min_stock_quantity}</TableCell>
                        <TableCell>${material.unit_price}</TableCell>
                        <TableCell>
                          {isLowStock(material) ? (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Stock Bajo
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Normal</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(material)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(material.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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

      <MaterialDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        material={editingMaterial}
      />
    </AppLayout>
  );
}