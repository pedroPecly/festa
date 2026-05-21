import type { NavLink } from "@/data/event";

type SiteHeaderProps = {
  badge: string;
  label: string;
  name: string;
  navLinks: NavLink[];
};

export default function SiteHeader({
  badge,
  label,
  name,
  navLinks,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e5d9cb] bg-[#f6f2ec]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9c9b4] bg-white/80 text-xs font-semibold uppercase tracking-[0.3em] text-[#8f6a46]">
          {badge}
        </span>
        <div className="leading-none">
          <p className="text-xs uppercase tracking-[0.3em] text-[#6f655c]">
            {label}
          </p>
          <p className="font-display text-lg text-[#1b1a17]">{name}</p>
        </div>
      </div>
      <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.3em] text-[#6f655c] md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            className="transition-colors hover:text-[#1b1a17]"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>
        <a
          href="#rsvp"
          className="hidden rounded-full border border-[#d9c9b4] bg-[#1b1a17] px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#f6f2ec] transition hover:bg-[#2e2a24] md:inline-flex"
        >
          Confirmar
        </a>
        <a
          href="#rsvp"
          className="inline-flex rounded-full border border-[#d9c9b4] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#1b1a17] md:hidden"
        >
          RSVP
        </a>
      </div>
    </header>
  );
}
