"use client";

import {
  ArrowLeft,
  ArrowRightLeft,
  Github,
  Home,
  Landmark,
  List,
  Loader2,
  Settings,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./AlterarModo";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function Navbar() {
  const [activeIcon, setActiveIcon] = useState<string>("/");
  const isActive = (path: string): boolean => activeIcon === path;

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {/*
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <ArrowLeft className="h-5 w-5 transition-all group-hover:scale-110" />

          <Github className="h-5 w-5 transition-all group-hover:scale-110" />

          <span className="sr-only">Página de apresentação</span>
        </Link>
        */}
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base ${
                  isActive("/")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("/")}
              >
                <ArrowLeft className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Página de apresentação</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Página de apresentação</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/"
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
                onClick={() => setActiveIcon("/dashboard/")}
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
                href="/dashboard/transferencias"
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
                href="/dashboard/contas"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive("/dashboard/contas")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("/dashboard/contas")}
              >
                <Landmark className="h-5 w-5" />
                <span className="sr-only">Contas</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Contas</TooltipContent>
          </Tooltip>
          {/*


          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/categorias"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive("/dashboard/categorias")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("/dashboard/categorias")}
              >
                <List className="h-5 w-5" />
                <span className="sr-only">Categorias</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Categorias</TooltipContent>
          </Tooltip>



          */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/carteira"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive("/dashboard/carteira")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveIcon("/dashboard/carteira")}
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
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="size-8 animate-spin text-slate-400" />
        </ClerkLoading>
        {/*
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
        */}
      </nav>
    </aside>
  );
}
