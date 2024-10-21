import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowLeft,
  ArrowRightLeft,
  Github,
  Home,
  Landmark,
  List,
  Loader2,
  PanelLeft,
  Settings,
  Wallet,
} from "lucide-react";
import { ModeToggle } from "./AlterarModo";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

export function NavbarMobile() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Menu Mobile</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <ArrowLeft className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Página de apresentação</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Visão geral
            </Link>
            <Link
              href="/dashboard/transferencias"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ArrowRightLeft className="h-5 w-5" />
              Transferências
            </Link>
            <Link
              href="/dashboard/contas"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Landmark className="h-5 w-5" />
              Contas
            </Link>
            <Link
              href="/dashboard/categorias"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <List className="h-5 w-5" />
              Categorias
            </Link>
            <Link
              href="/dashboard/carteira"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Wallet className="h-5 w-5" />
              Carteira
            </Link>
            {/*
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Configurações
            </Link>
            */}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Botões ao lado do menu, visíveis apenas no mobile */}
      <div className="ml-auto flex space-x-4 sm:hidden">
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="size-8 animate-spin text-slate-400" />
        </ClerkLoading>
      </div>
    </header>
  );
}
