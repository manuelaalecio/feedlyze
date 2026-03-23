"use client";

import { CATEGORIES_TYPES } from "@/app/data/category";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

async function submitFeedback(
  prevState: { success: boolean; error: string },
  formData: FormData,
) {
  const loadingToast = toast.loading("Criando feedback...");

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create feedback");
    }

    toast.dismiss(loadingToast);
    toast.success("Feedback criado com sucesso");

    return { success: true, error: "" };
  } catch (error) {
    console.error("Something went wrong. Please try again.", error);
    toast.dismiss(loadingToast);
    toast.error(
      "Ocorreu um erro ao criar o feedback. Por favor, tente novamente.",
    );
    return {
      success: false,
      error: "Ocorreu um erro ao criar o feedback. Por favor, tente novamente.",
    };
  }
}

export default function NewFeedbackPage() {
  const router = useRouter();
  const [category, setCategory] = useState(CATEGORIES_TYPES[0]);
  const [state, action, isPending] = useActionState(submitFeedback, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/feedback");
        router.refresh();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/feedback">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Compartilhe seu Feedback</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novo Feedback</CardTitle>
          <CardDescription>
            Compartilhe sua ideia com a comunidade. Seja específico sobre o que
            você gostaria de ver.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                placeholder="O que você gostaria de ver?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <input type="hidden" name="category" value={category} />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES_TYPES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descreva sua ideia em detalhes..."
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Criando feedback..." : "Criar feedback"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/feedback">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
