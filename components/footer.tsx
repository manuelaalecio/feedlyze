import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full shrink-0 border-t bg-background">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row sm:items-center">
          <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0 text-center text-muted-foreground">
            <span>Feito com</span>
            <Heart
              className="size-4 shrink-0 text-pink-500 fill-pink-500"
              aria-hidden
            />
            <span>
              por{" "}
              <Link
                href="https://manuelaalecio.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                Manuela Alecio
              </Link>
            </span>
          </p>
          <p className="text-center text-muted-foreground sm:text-right">
            © {currentYear} Feedlyze. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
