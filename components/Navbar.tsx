"use client"

import {
  ArrowRightLeft,
  ChartBarStacked,
  ChartColumnDecreasing,
  Github,
  Home,
  Landmark,
  Loader2,
  Package2,
  Settings,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ModeToggle } from "./AlterarModo";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [activeIcon, setActiveIcon] = useState<string>("/");
  const isActive = (path: string): boolean => activeIcon === path;

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Github className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">Finance Management</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive("/")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("/")}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Visão Geral</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Visão Geral</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/transferencias"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive("/transferencias")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("/transferencias")}
              >
                <ArrowRightLeft className="h-5 w-5" />
                <span className="sr-only">Tranferências</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Transferências</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/contas"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive("/contas")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("/contas")}
              >
                <Landmark className="h-5 w-5" />
                <span className="sr-only">Contas</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Contas</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/categorias"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive("/categorias")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("/categorias")}
              >
                <ChartBarStacked className="h-5 w-5" />
                <span className="sr-only">Categorias</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Categorias</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/carteira"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive("/carteira")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("/carteira")}
              >
                <Wallet className="h-5 w-5" />
                <span className="sr-only">Carteira</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Carteira</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <ModeToggle />
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="size-8 animate-spin text-slate-400" />
        </ClerkLoading>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive("#")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("#")}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Configurações</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Configurações</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}