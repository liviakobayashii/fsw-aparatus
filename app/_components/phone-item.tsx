"use client";

import { Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface PhoneItemProps {
  phone: string;
}

export default function PhoneItem({ phone }: PhoneItemProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      toast.success("Telefone copiado para a área de transferência!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Erro ao copiar telefone");
    }
  };

  return (
    <div className="bg-card flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Phone className="text-muted-foreground size-4" />
        <span className="text-foreground">{phone}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="text-foreground"
      >
        Copiar
      </Button>
    </div>
  );
}
