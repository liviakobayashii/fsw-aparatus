import { prisma } from "@/lib/prisma";
import BarbershopItem from "@/app/_components/barbershop-item";
import { PageContainer, PageSection, PageSectionTitle } from "@/app/_components/ui/page";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const PopularBarbershopsPage = async () => {
    const barbershops = await prisma.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    });

    return (
        <main className="min-h-screen">
            <PageContainer>
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="text-foreground hover:text-primary transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-foreground text-lg font-semibold uppercase md:text-xl">
                        Barbearias Populares
                    </h1>
                </div>

                <PageSection>
                    <PageSectionTitle>
                        {barbershops.length} {barbershops.length === 1 ? 'Barbearia Encontrada' : 'Barbearias Encontradas'}
                    </PageSectionTitle>

                    {barbershops.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {barbershops.map((barbershop) => (
                                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-12">
                            Nenhuma barbearia encontrada.
                        </p>
                    )}
                </PageSection>
            </PageContainer>
        </main>
    );
};

export default PopularBarbershopsPage;
