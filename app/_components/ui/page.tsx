export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto space-y-6 p-5">
      {children}
    </div>
  );
}

import Link from "next/link";

export function PageSectionTitle({
  children,
  href,
  linkText
}: {
  children: React.ReactNode;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-foreground text-xs font-semibold -tracking-widest uppercase md:text-sm">
        {children}
      </h2>
      {href && linkText && (
        <Link
          href={href}
          className="text-primary text-xs font-semibold uppercase hover:underline md:text-sm"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}

export function PageSection({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3 md:space-y-4">{children}</div>;
}

export function PageSectionScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}
