import { prisma } from "@/lib/prisma";
import BarbershopItem from "../../_components/barbershop-item";
import QuickSearchButtons from "../../_components/quick-search-buttons";
import SearchInput from "../../_components/search-input";
import { PageContainer } from "../../_components/ui/page";

const BarbershopsPage = async ({ searchParams }: PageProps<"/barbershops">) => {
    const { search } = await searchParams;
    const barbershops = search
        ? await prisma.barbershop.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search as string,
                            mode: "insensitive",
                        },
                    },
                    {
                        services: {
                            some: {
                                name: {
                                    contains: search as string,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                ],
            },
            orderBy: {
                name: "asc",
            },
        })
        : [];

    return (
        <main className="min-h-screen">
            <PageContainer>
                <SearchInput />

                <QuickSearchButtons />

                {search && (
                    <div className="mt-6">
                        <h2 className="text-muted-foreground mb-4 text-sm font-semibold uppercase md:text-base">
                            Resultados para &quot;{search}&quot;
                        </h2>

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
                    </div>
                )}
            </PageContainer>
        </main>
    );
};

export default BarbershopsPage;