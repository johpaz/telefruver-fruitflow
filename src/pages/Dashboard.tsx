import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalMaterials: 0,
    totalOrders: 0,
    lowStockCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: clientsCount },
        { count: materialsCount },
        { count: ordersCount },
        { data: lowStockData },
      ] = await Promise.all([
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("materials").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase
          .from("materials")
          .select("id")
          .lt("stock_quantity", supabase.from("materials").select("min_stock_quantity")),
      ]);

      setStats({
        totalClients: clientsCount || 0,
        totalMaterials: materialsCount || 0,
        totalOrders: ordersCount || 0,
        lowStockCount: lowStockData?.length || 0,
      });
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Últimas actividades del sistema aparecerán aquí
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen del Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Estadísticas mensuales aparecerán aquí
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}