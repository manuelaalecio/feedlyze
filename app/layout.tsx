import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Feedlyze - Roadmap Público",
  description:
    "Plataforma para usuários reportarem ideias e sugestões em funcionalidades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          className={cn(
            "font-sans antialiased min-h-screen flex flex-col",
            inter.variable,
          )}
        >
          {/* Navbar */}
          <Navbar />
          {/* Main Section */}
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          {/* Footer */}
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
