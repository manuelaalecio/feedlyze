"use client";

import { useEffect } from "react";
import { Map, MessageSquare, Shield, Sparkle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import {
  Show,
  SignInButton,
  UserButton,
  useAuth,
  useClerk,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Navbar() {
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const shouldOpen = searchParams.get("sign-in") === "1";
    if (!shouldOpen || isSignedIn) return;

    clerk.openSignIn();

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("sign-in");
    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname;
    router.replace(nextUrl);
  }, [clerk, isSignedIn, pathname, router, searchParams]);

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
          <Show when="signed-in">
            <Link
              href="/admin"
              className="text-sm hover:text-primary flex items-center gap-1"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          </Show>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button>Entrar</Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
}
