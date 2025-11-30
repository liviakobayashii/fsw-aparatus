"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR as dateFnsPtBR } from "date-fns/locale";
import { BarbershopService, Barbershop } from "../generated/prisma/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface BookingSheetProps {
  service: BarbershopService;
  barbershop: Barbershop;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Gerar horários das 09:00 às 18:00 com intervalo de 30 minutos
const generateTimeSlots = (): string[] => {
  const timeSlots: string[] = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 18 && minute > 0) break; // Parar em 18:00
      timeSlots.push(
        `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      );
    }
  }
  return timeSlots;
};

export default function BookingSheet({
  service,
  barbershop,
  open,
  onOpenChange,
}: BookingSheetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

  const timeSlots = generateTimeSlots();

  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(priceInCents / 100);
  };

  const formatDate = (date: Date) => {
    return format(date, "dd 'de' MMMM", { locale: dateFnsPtBR });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined); // Reset horário quando mudar a data
  };

  const handleConfirm = () => {
    // TODO: Implementar lógica de confirmação da reserva
    console.log("Reserva confirmada:", {
      service: service.name,
      barbershop: barbershop.name,
      date: selectedDate,
      time: selectedTime,
    });
    // Reset estados ao fechar
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset estados ao fechar o sheet
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="flex flex-col p-0 gap-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="text-left font-bold">Fazer Reserva</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          {/* Calendário */}
          <div className="bg-muted/50 rounded-lg p-4 w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="w-full"
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full",
                table: "w-full",
                week: "w-full",
              }}
            />
          </div>

          {/* Seleção de Horários */}
          {selectedDate && (
            <div className="mt-6">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className={
                      selectedTime === time
                        ? "bg-primary text-primary-foreground rounded-full"
                        : "rounded-full"
                    }
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Resumo da Reserva */}
          {selectedDate && selectedTime && (
            <div className="mt-6">
              <Separator className="mb-4" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-foreground font-semibold">{service.name}</h3>
                  <span className="text-foreground font-semibold">
                    {formatPrice(service.priceInCents)}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data</span>
                    <span className="text-foreground">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horário</span>
                    <span className="text-foreground">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Barbearia</span>
                    <span className="text-foreground">{barbershop.name}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botão Confirmar */}
        <div className="mt-auto pt-6 border-t px-6 pb-6">
          <Button
            className="w-full bg-primary text-primary-foreground rounded-lg h-12"
            disabled={!selectedDate || !selectedTime}
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

