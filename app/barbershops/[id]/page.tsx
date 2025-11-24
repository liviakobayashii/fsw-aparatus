import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
} from "@/app/_components/ui/page";
import ServiceItem from "@/app/_components/service-item";
import PhoneItem from "@/app/_components/phone-item";
import Footer from "@/app/_components/footer";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BarbershopPage(props: PageProps) {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  });
  if (!barbershop) {
    return notFound();
  }

  return (
    <main>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <Link href="/" className="absolute top-4 left-4 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="bg-background/80 h-10 w-10 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="text-foreground size-4" />
          </Button>
        </Link>
      </div>

      <PageContainer>
        <div className="mt-3 mb-6 flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src={barbershop.imageUrl} />
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1 className="text-foreground text-lg font-bold">
              {barbershop.name}
            </h1>
            <p className="text-muted-foreground text-xs">
              {barbershop.address}
            </p>
          </div>
        </div>

        <Separator className="mb-6" />

        <PageSection>
          <PageSectionTitle>SOBRE NÓS</PageSectionTitle>
          <p className="text-foreground text-sm leading-relaxed">
            {barbershop.description}
          </p>
        </PageSection>

        <PageSection>
          <PageSectionTitle>SERVIÇOS</PageSectionTitle>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {barbershop.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </PageSection>

        <PageSection>
          <PageSectionTitle>CONTATO</PageSectionTitle>
          <div className="flex flex-col gap-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </PageSection>
      </PageContainer>

      <Footer />
    </main>
  );
}
