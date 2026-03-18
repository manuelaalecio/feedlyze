import { GradientHeader } from "@/components/gradient-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  Map,
  MessageSquare,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <GradientHeader
        title="Molde o futuro do nosso produto"
        subtitle="No Feedlyze, suas ideias ganham vida. Sugira funcionalidades, vote no que é mais importante e acompanhe nosso roteiro público."
      >
        <div className="flex gap-4 justify-center pt-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/feedback/new">
              Envie seu feedback <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-gray-100"
          >
            <Link href="/roadmap">
              Veja o roadmap <Map className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </GradientHeader>
      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Como funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Envie Ideias</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compartilhe sua sugestão e ideias com a comunidade
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <ChartNoAxesColumnIncreasing className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Vote & Priorize</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Vote nas ideias que você mais gosta para nos ajudar a entender o
                que é mais importante.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Acompanhe o progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Acompanhe nosso roteiro público para ver em que estamos
                trabalhando a seguir.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Veja resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Veja como seu feedback se transforma em recursos e melhorias
                reais.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Stats Section */}
      <section className="text-center">
        <div className="inline-grid grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold">2,352+</div>
            <div className="text-muted-foreground">Sugestões</div>
          </div>
          <div>
            <div className="text-3xl font-bold">7,152+</div>
            <div className="text-muted-foreground">Votos</div>
          </div>
          <div>
            <div className="text-3xl font-bold">352+</div>
            <div className="text-muted-foreground">Implementações</div>
          </div>
        </div>
      </section>
    </div>
  );
}
