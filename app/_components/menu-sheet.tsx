"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Calendar, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const categories = [
  "Cabelo",
  "Barba",
  "Acabamento",
  "Sombrancelha",
  "Massagem",
  "Hidratação",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function MenuSheet() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  if (!session) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <SheetHeader className="flex flex-row items-center justify-between border-b px-5 py-4">
          <SheetTitle className="text-foreground font-semibold">Menu</SheetTitle>
          <SheetClose />
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6">
          {/* Seção de Perfil */}
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={session.user.image || undefined} />
              <AvatarFallback className="bg-muted text-foreground">
                {getInitials(session.user.name || "")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-foreground font-semibold">
                {session.user.name}
              </p>
              <p className="text-muted-foreground text-sm">
                {session.user.email}
              </p>
            </div>
          </div>

          {/* Links de Navegação */}
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleNavigation("/")}
            >
              <Home className="size-5" />
              <span>Início</span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleNavigation("/bookings")}
            >
              <Calendar className="size-5" />
              <span>Agendamentos</span>
            </Button>
          </div>

          <Separator />

          {/* Lista de Categorias */}
          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  // Não faz nada por enquanto
                }}
              >
                {category}
              </Button>
            ))}
          </div>

          <Separator />

          {/* Botão de Logout */}
          <Button
            variant="ghost"
            className="justify-start"
            onClick={handleLogout}
          >
            <LogOut className="size-5" />
            <span>Sair da conta</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

