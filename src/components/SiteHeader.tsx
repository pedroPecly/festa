"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/data/event";
import ViewTransitionLink from "./ViewTransitionLink";

type SiteHeaderProps = {
  badge: string;
  label: string;
  name: string;
  navLinks: NavLink[];
  ctaHref?: string;
};

export default function SiteHeader({
  badge,
  label,
  name,
  navLinks,
  ctaHref = "#rsvp",
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href !== "#inicio") {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleMobileAnchor = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    handleAnchorClick(event, href);
    setMenuOpen(false);
  };

  const mobileCta = ctaHref.startsWith("/") ? (
    <ViewTransitionLink
      href={ctaHref}
      onClick={() => setMenuOpen(false)}
      className="inline-flex w-full items-center justify-center rounded-full border border-[#d9c9b4] bg-[#1b1a17] px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#f6f2ec] transition hover:bg-[#2e2a24]"
    >
      Confirmar
    </ViewTransitionLink>
  ) : (
    <a
      href={ctaHref}
      onClick={() => setMenuOpen(false)}
      className="inline-flex w-full items-center justify-center rounded-full border border-[#d9c9b4] bg-[#1b1a17] px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#f6f2ec] transition hover:bg-[#2e2a24]"
    >
      Confirmar
    </a>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-[#e5d9cb] bg-[#f6f2ec]/90 backdrop-blur relative">
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
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <ViewTransitionLink
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#1b1a17]"
              >
                {link.label}
              </ViewTransitionLink>
            ) : (
              <a
                key={link.href}
                className="transition-colors hover:text-[#1b1a17]"
                href={link.href}
                onClick={(event) => handleAnchorClick(event, link.href)}
              >
                {link.label}
              </a>
            )
          )}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[#d9c9b4] bg-white/80 p-2 text-[#1b1a17] transition hover:bg-white md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="sr-only">{menuOpen ? "Fechar" : "Abrir"}</span>
            <span className="flex h-5 w-5 flex-col items-center justify-center">
              <span
                className={`block h-0.5 w-5 rounded-full bg-[#1b1a17] transition ${
                  menuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`my-1 block h-0.5 w-5 rounded-full bg-[#1b1a17] transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-[#1b1a17] transition ${
                  menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
          {ctaHref.startsWith("/") ? (
            <ViewTransitionLink
              href={ctaHref}
              className="hidden rounded-full border border-[#d9c9b4] bg-[#1b1a17] px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#f6f2ec] transition hover:bg-[#2e2a24] md:inline-flex"
            >
              Confirmar
            </ViewTransitionLink>
          ) : (
            <a
              href={ctaHref}
              className="hidden rounded-full border border-[#d9c9b4] bg-[#1b1a17] px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#f6f2ec] transition hover:bg-[#2e2a24] md:inline-flex"
            >
              Confirmar
            </a>
          )}
        </div>
      </div>
      <div
        id="mobile-nav"
        className={`absolute left-0 right-0 top-full border-b border-[#e5d9cb] bg-[#f6f2ec]/95 backdrop-blur transition md:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 text-xs uppercase tracking-[0.3em] text-[#6f655c]">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <ViewTransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="transition-colors hover:text-[#1b1a17]"
              >
                {link.label}
              </ViewTransitionLink>
            ) : (
              <a
                key={link.href}
                className="transition-colors hover:text-[#1b1a17]"
                href={link.href}
                onClick={(event) => handleMobileAnchor(event, link.href)}
              >
                {link.label}
              </a>
            )
          )}
          <div className="pt-2">{mobileCta}</div>
        </nav>
      </div>
    </header>
  );
}
