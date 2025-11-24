import Image from "next/image";
import { BarbershopService } from "../generated/prisma/client";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

export default function ServiceItem({ service }: ServiceItemProps) {
  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(priceInCents / 100);
  };

  return (
    <div className="bg-card flex gap-2 overflow-hidden rounded-lg border p-4">
      <div className="relative h-[110px] w-[110px] shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-foreground font-semibold">{service.name}</h3>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-foreground font-semibold">
            {formatPrice(service.priceInCents)}
          </span>
          <Button
            variant="default"
            size="sm"
            type="button"
            className="bg-primary text-primary-foreground rounded-[999px]"
          >
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
}
