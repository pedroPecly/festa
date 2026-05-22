import type { NavLink } from "@/data/event";
import { eventData } from "@/data/event";
import { SiteFooter, SiteHeader } from "@/components";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import GuestsTable from "./guests-table";
import type { GuestRow } from "./types";
import ViewTransitionLink from "@/components/ViewTransitionLink";

export const revalidate = 0;

type GuestsResult = {
  guests: GuestRow[];
  totalGuests: number;
  errorMessage?: string;
};

const { header, footer } = eventData;

const guestsNavLinks: NavLink[] = header.navLinks.map((link) => {
  if (link.href === "#inicio") {
    return { ...link, href: "/" };
  }
  return {
    ...link,
    href: link.href.startsWith("#") ? `/${link.href}` : link.href,
  };
});

async function getConfirmedGuests(): Promise<GuestsResult> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("rsvps")
      .select("id,name,guests,message,created_at")
      .eq("attendance", "sim")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("RSVP list failed", error);
      return {
        guests: [],
        totalGuests: 0,
        errorMessage: "Nao foi possivel carregar a lista agora.",
      };
    }

    const guests = (data ?? []).filter((item) => (item.guests ?? 0) > 0);
    const totalGuests = guests.reduce(
      (sum, item) => sum + (item.guests ?? 0),
      0
    );

    return {
      guests,
      totalGuests,
    };
  } catch (error) {
    console.error("RSVP list failed", error);
    return {
      guests: [],
      totalGuests: 0,
      errorMessage: "Nao foi possivel carregar a lista agora.",
    };
  }
}

export default async function ConvidadosPage() {
  const { guests, totalGuests, errorMessage } = await getConfirmedGuests();
  const confirmedCount = guests.length;

  return (
    <div id="top" className="min-h-screen bg-[#f6f2ec] text-[#1b1a17]">
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(185,141,95,0.35),transparent_70%)] blur-3xl" />
          <div className="absolute -bottom-40 right-[-120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(101,78,55,0.25),transparent_70%)] blur-2xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.55),transparent_60%)]" />
        </div>

        <SiteHeader
          badge={header.badge}
          label={header.label}
          name={header.name}
          navLinks={guestsNavLinks}
          ctaHref="/#rsvp"
        />

        <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-6 md:px-10 md:pb-28 md:pt-12">
          <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#8a7f74]">
                Lista de convidados
              </p>
              <h1 className="mt-4 font-display text-3xl md:text-4xl">
                Convidados presentes
              </h1>
              <p className="mt-4 text-base text-[#4f463f]">
                Acompanhe as confirmacoes recebidas e o total de convidados
                esperados.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ViewTransitionLink
                  href="/#rsvp"
                  className="inline-flex rounded-full border border-[#d9c9b4] bg-[#1b1a17] px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#f6f2ec] transition hover:bg-[#2e2a24]"
                >
                  Nova confirmacao
                </ViewTransitionLink>
                <ViewTransitionLink
                  href="/"
                  className="inline-flex rounded-full border border-[#d9c9b4] bg-white/80 px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#1b1a17] transition hover:bg-white"
                >
                  Voltar ao site
                </ViewTransitionLink>
              </div>
            </div>
            <div className="rounded-3xl border border-[#e5d9cb] bg-white/80 p-6 shadow-[var(--shadow)]">
              <p className="text-xs uppercase tracking-[0.4em] text-[#8a7f74]">
                Resumo
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e5d9cb] bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                    Confirmacoes
                  </p>
                  <p className="mt-2 font-display text-2xl">
                    {confirmedCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e5d9cb] bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                    Total de convidados
                  </p>
                  <p className="mt-2 font-display text-2xl">
                    {totalGuests}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                Atualizado automaticamente
              </p>
            </div>
          </section>

          <GuestsTable guests={guests} errorMessage={errorMessage} />
        </main>

        <SiteFooter text={footer.text} topHref="#top" />
      </div>
    </div>
  );
}
