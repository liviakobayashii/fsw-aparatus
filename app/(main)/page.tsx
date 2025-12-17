import Image from "next/image";
import SearchInput from "../_components/search-input";
import banner from "../../public/banner.png";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "../_components/barbershop-item";
import {
    PageContainer,
    PageSection,
    PageSectionScroller,
    PageSectionTitle,
} from "../_components/ui/page";
import QuickSearchButtons from "../_components/quick-search-buttons";

const Home = async () => {
    const recommendedBarbershops = await prisma.barbershop.findMany({
        orderBy: {
            name: "asc",
        },
    });
    const popularBarbershops = await prisma.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    });
    return (
        <PageContainer>
            <SearchInput />

            <QuickSearchButtons />

            <Image
                src={banner}
                alt="Agende agora!"
                sizes="100vw"
                className="h-auto w-full md:rounded-xl lg:h-[500px] lg:w-full lg:object-cover"
            />

            <PageSection>
                <PageSectionTitle href="/barbershops/recommended" linkText="Ver todos">
                    Recomendados
                </PageSectionTitle>
                <PageSectionScroller>
                    {recommendedBarbershops.slice(0, 4).map((barbershop) => (
                        <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                    ))}
                </PageSectionScroller>
            </PageSection>

            <PageSection>
                <PageSectionTitle href="/barbershops/popular" linkText="Ver todos">
                    Populares
                </PageSectionTitle>
                <PageSectionScroller>
                    {popularBarbershops.slice(0, 4).map((barbershop) => (
                        <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                    ))}
                </PageSectionScroller>
            </PageSection>
        </PageContainer>
    );
};

export default Home;
