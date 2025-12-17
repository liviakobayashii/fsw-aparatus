import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import PhoneItem from "@/app/_components/phone-item";
import { ServiceItem } from "@/app/_components/service-item";

const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: { id },
    include: { services: true },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full lg:container lg:mx-auto lg:px-5 lg:px-0 lg:py-10 lg:gap-10">
      <div className="flex flex-col w-full gap-6 lg:flex-row lg:items-center lg:gap-10">
        <div className="relative w-full h-[260px] sm:h-[300px] lg:w-1/3 lg:h-auto lg:aspect-square lg:rounded-2xl lg:overflow-hidden">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-0 left-0 lg:left-5 flex w-full items-baseline gap-[91px] px-5 lg:px-0 pt-6">
            <Button
              size="icon"
              variant="secondary"
              className="overflow-clip rounded-full"
              asChild
            >
              <Link href="/">
                <ChevronLeft className="size-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-2/3 gap-4 px-5 lg:px-0">
          <p className="text-foreground text-2xl font-bold">{barbershop.name}</p>
          <p className="text-foreground text-sm">{barbershop.description}</p>
        </div>
      </div>

      <div className="px-0 py-6 lg:hidden">
        <Separator />
      </div>

      <div className="flex w-full flex-col items-start gap-3 px-5 lg:px-0 py-0 lg:py-8">
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-foreground text-xs font-bold uppercase">
            SERVIÇOS
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={{ ...service, barbershop }} />
          ))}
        </div>
      </div>

      <div className="px-0 py-6 lg:hidden">
        <Separator />
      </div>

      <div className="flex w-full flex-col items-start gap-3 px-5 lg:px-0 py-0">
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-foreground text-xs font-bold uppercase">
            CONTATO
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;

