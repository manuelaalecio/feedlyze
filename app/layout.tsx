import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

import { cn } from "@/lib/utils";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { syncCurrentUser } from "@/lib/sync-user";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Feedlyze - Roadmap Público",
  description:
    "Plataforma para usuários reportarem ideias e sugestões em funcionalidades",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncCurrentUser();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased min-h-screen flex flex-col",
          inter.variable,
        )}
      ><ClerkProvider localization={ptBR}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Navbar */}
            <Navbar />
            {/* Main Section */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            {/* Footer */}
            <Footer />
            <Toaster richColors />
          </ThemeProvider>
        </ClerkProvider></body>
    </html>
  );
}
