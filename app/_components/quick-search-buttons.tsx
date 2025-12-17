import { Eye, Footprints, Scissors, Sparkles, User, Waves } from "lucide-react";
import Link from "next/link";

const QuickSearchButtons = () => {
    const quickSearchButtonsStyle = "cursor-pointer border-border bg-card flex shrink-0 items-center justify-center gap-3 rounded-full border px-4 py-2.5 transition-colors hover:bg-accent hover:border-primary md:px-5 md:py-3";

    return (
        <div className="flex gap-3 overflow-x-auto md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
            <Link
                href="/barbershops?search=cabelo"
                className={quickSearchButtonsStyle}
            >
                <Scissors className="size-4 md:size-5" />
                <span className="text-card-foreground text-sm font-medium">Cabelo</span>
            </Link>

            <Link
                href="/barbershops?search=barba"
                className={quickSearchButtonsStyle}
            >
                <User className="size-4 md:size-5" />
                <span className="text-card-foreground text-sm font-medium">Barba</span>
            </Link>

            <Link
                href="/barbershops?search=acabamento"
                className={quickSearchButtonsStyle}
            >
                <Sparkles className="size-4 md:size-5" />
                <span className="text-card-foreground text-sm font-medium">
                    Acabamento
                </span>
            </Link>

            <Link
                href="/barbershops?search=sobrancelha"
                className={quickSearchButtonsStyle}
            >
                <Eye className="size-4 md:size-5" />
                <span className="text-card-foreground text-sm font-medium">
                    Sobrancelha
                </span>
            </Link>

            <Link
                href="/barbershops?search=pézinho"
                className={quickSearchButtonsStyle}
            >
                <Footprints className="size-4 md:size-5" />
                <span className="text-card-foreground text-sm font-medium">
                    Pézinho
                </span>
            </Link>

            <Link
                href="/barbershops?search=progressiva"
                className={quickSearchButtonsStyle}
            >
                <Waves className="size-4 md:size-5" />
                <span className="text-card-foreground text-sm font-medium">
                    Progressiva
                </span>
            </Link>
        </div>
    );
};

export default QuickSearchButtons;