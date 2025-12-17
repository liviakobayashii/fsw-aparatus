import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
    PageContainer,
    PageSection,
    PageSectionTitle,
} from "../../_components/ui/page";
import BookingItem from "../../_components/booking-item";

const BookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/");
    }

    const bookings = await prisma.booking.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            service: true,
            barbershop: true,
        },
        orderBy: {
            date: "desc",
        },
    });

    const now = new Date();

    const confirmedBookings = bookings.filter(
        (booking) => !booking.cancelled && new Date(booking.date) >= now,
    );

    const finishedBookings = bookings.filter(
        (booking) => booking.cancelled || new Date(booking.date) < now,
    );

    return (
        <main className="flex min-h-screen flex-col">
            <div className="flex-1">
                <PageContainer>
                    <h1 className="text-foreground text-xl font-bold md:text-2xl lg:text-3xl">
                        Agendamentos
                    </h1>

                    {confirmedBookings.length > 0 && (
                        <PageSection>
                            <PageSectionTitle>Confirmados</PageSectionTitle>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {confirmedBookings.map((booking) => (
                                    <BookingItem key={booking.id} booking={booking} />
                                ))}
                            </div>
                        </PageSection>
                    )}

                    {finishedBookings.length > 0 && (
                        <PageSection>
                            <PageSectionTitle>Finalizados</PageSectionTitle>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {finishedBookings.map((booking) => (
                                    <BookingItem key={booking.id} booking={booking} />
                                ))}
                            </div>
                        </PageSection>
                    )}

                    {bookings.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground text-center text-sm md:text-base">
                                Você ainda não tem agendamentos.
                            </p>
                        </div>
                    )}
                </PageContainer>
            </div>
        </main>
    );
};

export default BookingsPage;