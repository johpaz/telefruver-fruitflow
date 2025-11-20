import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, TrendingUp, CheckCircle, BarChart3, Sparkles, Zap, Shield } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Gestión de Clientes",
      description: "Administra tu cartera de clientes con información detallada de contacto y historial completo.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Package,
      title: "Control de Inventario",
      description: "Monitorea tu stock en tiempo real con alertas automáticas cuando los niveles sean bajos.",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: ShoppingCart,
      title: "Gestión de Pedidos",
      description: "Procesa pedidos eficientemente con cálculo automático de totales y seguimiento de estados.",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: BarChart3,
      title: "Reportes y Estadísticas",
      description: "Visualiza el rendimiento de tu negocio con dashboards y reportes detallados.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: TrendingUp,
      title: "Análisis de Ventas",
      description: "Identifica tendencias y toma decisiones basadas en datos reales de tu operación.",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: CheckCircle,
      title: "Sistema Seguro",
      description: "Protección de datos con autenticación robusta y control de accesos por roles.",
      gradient: "from-indigo-500 to-blue-600",
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

  const stats = [
    { icon: Users, label: "Total Clientes", value: "248", change: "+12% vs mes anterior", gradient: "from-emerald-500 to-teal-600" },
    { icon: ShoppingCart, label: "Pedidos del Mes", value: "1,429", change: "+8% vs mes anterior", gradient: "from-violet-500 to-purple-600" },
    { icon: Package, label: "Materiales en Stock", value: "89", change: "3 requieren reposición", gradient: "from-blue-500 to-cyan-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 group">
              <div className="relative">
                <Package className="h-6 w-6 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                Telefruver
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Sistema de Gestión Inteligente</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-foreground via-primary to-emerald-600 bg-clip-text text-transparent">
                Gestión para Empaque
              </span>
              <br />
              <span className="text-foreground">de Frutas</span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              Controla tu inventario, gestiona clientes y procesa pedidos de manera eficiente.
              Todo en una plataforma centralizada y fácil de usar.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-in-up delay-200">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-xl shadow-primary/25 transition-all hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 text-lg px-8 py-6">
                  <Zap className="mr-2 h-5 w-5" />
                  Comenzar Ahora
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 hover:bg-primary/5 hover:border-primary transition-all hover:scale-105 text-lg px-8 py-6">
                Ver Demo
              </Button>
            </div>

            {/* Floating stats */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Empresas Activas", value: "150+" },
                { label: "Pedidos Procesados", value: "50K+" },
                { label: "Satisfacción", value: "98%" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Funcionalidades Completas</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-lg text-muted-foreground">
              Herramientas diseñadas específicamente para la industria del empaque de frutas
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 bg-card/80 backdrop-blur-sm"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <CardHeader className="relative">
                    <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Optimización Total</span>
              </div>

              <h2 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
                Optimiza tu operación
              </h2>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Telefruver te ayuda a administrar tu negocio de manera más eficiente,
                reduciendo errores y mejorando la productividad de tu equipo.
              </p>

              <div className="space-y-4 mb-10">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-xl shadow-primary/25 transition-all hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 text-lg px-8">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Empezar Gratis
                </Button>
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <Card className="overflow-hidden border-2 shadow-2xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-emerald-600/10 border-b">
                  <CardTitle className="text-2xl">Dashboard en tiempo real</CardTitle>
                  <CardDescription className="text-base">
                    Monitorea todas las métricas importantes de tu negocio desde un solo lugar
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-xl border-2 p-5 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-card to-muted/20"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                          <div className="relative flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-foreground">{stat.label}</span>
                            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                          </div>

                          <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-1">
                            {stat.value}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">{stat.change}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-emerald-600 to-primary" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <Sparkles className="h-4 w-4 text-white animate-pulse" />
              <span className="text-sm font-medium text-white">Comienza Hoy</span>
            </div>

            <h2 className="text-4xl font-bold sm:text-5xl mb-6 text-white">
              ¿Listo para comenzar?
            </h2>

            <p className="text-xl mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto">
              Únete a más de 150 empresas que ya optimizan su gestión con Telefruver
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/auth">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto shadow-2xl hover:shadow-3xl transition-all hover:scale-105 text-lg px-10 py-6 bg-white text-primary hover:bg-white/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Crear Cuenta Gratis
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105 text-lg px-10 py-6"
              >
                Hablar con Ventas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4 group">
                <div className="relative">
                  <Package className="h-6 w-6 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                  Telefruver
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sistema de gestión para la industria del empaque de frutas.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Producto</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
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