"use client";

import { Map, MessageSquare, Sparkle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkle className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">Feedlyze</span>
            </div>
          </Link>
          <Link
            href="/roadmap"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <Map className="h-4 w-4" />
            Roadmap
          </Link>
          <Link
            href="/feedback"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignInButton mode="modal">
            <Button>Entrar</Button>
          </SignInButton>
        </div>
      </div>
    </nav>
  );
}
