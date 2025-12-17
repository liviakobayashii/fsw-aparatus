"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon, MessageCircleIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SidebarMenu from "./sidebar-menu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-between bg-white py-6">
      <div className="flex w-full items-center justify-between px-5 py-4">
        <Link href="/">
          <Image src="/logo.svg" alt="Aparatus" width={100} height={26.09} className="md:w-[120px]" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Início
          </Link>
          <Link href="/bookings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Agendamentos
          </Link>
          <Link href="/barbershops?search=cabelo" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Serviços
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild className="md:hidden">
            <Link href="/chat">
              <MessageCircleIcon />
            </Link>
          </Button>

          <Button variant="default" asChild className="hidden md:flex gap-2">
            <Link href="/chat">
              <MessageCircleIcon className="size-4" />
              <span>Agendar com IA</span>
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[370px] p-0">
              <SheetHeader className="border-b px-5 py-6 text-left">
                <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
              </SheetHeader>
              <SidebarMenu />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="hidden md:flex">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[370px] p-0">
              <SheetHeader className="border-b px-5 py-6 text-left">
                <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
              </SheetHeader>
              <SidebarMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;