import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, TrendingUp, CheckCircle, BarChart3 } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Gestión de Clientes",
      description: "Administra tu cartera de clientes con información detallada de contacto y historial completo.",
    },
    {
      icon: Package,
      title: "Control de Inventario",
      description: "Monitorea tu stock en tiempo real con alertas automáticas cuando los niveles sean bajos.",
    },
    {
      icon: ShoppingCart,
      title: "Gestión de Pedidos",
      description: "Procesa pedidos eficientemente con cálculo automático de totales y seguimiento de estados.",
    },
    {
      icon: BarChart3,
      title: "Reportes y Estadísticas",
      description: "Visualiza el rendimiento de tu negocio con dashboards y reportes detallados.",
    },
    {
      icon: TrendingUp,
      title: "Análisis de Ventas",
      description: "Identifica tendencias y toma decisiones basadas en datos reales de tu operación.",
    },
    {
      icon: CheckCircle,
      title: "Sistema Seguro",
      description: "Protección de datos con autenticación robusta y control de accesos por roles.",
    },
  ];

  const benefits = [
    "Reduce tiempo en tareas administrativas",
    "Evita pérdidas por desabastecimiento",
    "Mejora la satisfacción del cliente",
    "Optimiza tus procesos de venta",
    "Accede desde cualquier dispositivo",
    "Información actualizada en tiempo real",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Telefruver</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Sistema de Gestión para Empaque de Frutas
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Controla tu inventario, gestiona clientes y procesa pedidos de manera eficiente. 
              Todo en una plataforma centralizada y fácil de usar.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto">
                  Comenzar Ahora
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Todo lo que necesitas
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Herramientas diseñadas específicamente para la industria del empaque de frutas
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
                Optimiza tu operación
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Telefruver te ayuda a administrar tu negocio de manera más eficiente, 
                reduciendo errores y mejorando la productividad de tu equipo.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/auth">
                  <Button size="lg">
                    Empezar Gratis
                  </Button>
                </Link>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dashboard en tiempo real</CardTitle>
                <CardDescription>
                  Monitorea todas las métricas importantes de tu negocio desde un solo lugar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Total Clientes</span>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">248</p>
                    <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Pedidos del Mes</span>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">1,429</p>
                    <p className="text-xs text-muted-foreground">+8% vs mes anterior</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Materiales en Stock</span>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-xs text-muted-foreground">3 requieren reposición</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Únete a empresas que ya optimizan su gestión con Telefruver
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Crear Cuenta Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">Telefruver</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema de gestión para la industria del empaque de frutas.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Producto</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Telefruver. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}