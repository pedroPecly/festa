import { submitRsvp } from "@/actions/rsvp";
import {
  ContactSection,
  DetailsSection,
  GiftsSection,
  HeroSection,
  RsvpSection,
  SiteFooter,
  SiteHeader,
} from "@/components";
import { eventData } from "@/data/event";

type PageProps = {
  searchParams?: Promise<{
    sent?: string | string[];
    error?: string | string[];
  }>;
};

const { header, hero, details, rsvp, gifts, contact, footer } = eventData;

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const sentParam = Array.isArray(resolvedSearchParams?.sent)
    ? resolvedSearchParams?.sent[0]
    : resolvedSearchParams?.sent;
  const errorParam = Array.isArray(resolvedSearchParams?.error)
    ? resolvedSearchParams?.error[0]
    : resolvedSearchParams?.error;
  const showSuccess = sentParam === "1";
  const showError = errorParam === "1";
  return (
    <div className="min-h-screen bg-[#f6f2ec] text-[#1b1a17]">
      <div className="relative">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(185,141,95,0.35),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-[-120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(101,78,55,0.25),transparent_70%)] blur-2xl" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.55),transparent_60%)]" />

        <div className="relative">
          <SiteHeader
            badge={header.badge}
            label={header.label}
            name={header.name}
            navLinks={header.navLinks}
          />

          <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20">
            <HeroSection
              eyebrow={hero.eyebrow}
              title={hero.title}
              subtitle={hero.subtitle}
              highlights={hero.highlights}
            />
            <DetailsSection
              eyebrow={details.eyebrow}
              title={details.title}
              description={details.description}
              start={details.start}
              location={details.location}
            />
            <RsvpSection
              eyebrow={rsvp.eyebrow}
              title={rsvp.title}
              description={rsvp.description}
              formAction={submitRsvp}
              showSuccess={showSuccess}
              showError={showError}
            />
            <GiftsSection
              eyebrow={gifts.eyebrow}
              title={gifts.title}
              description={gifts.description}
              items={gifts.items}
            />
            <ContactSection
              eyebrow={contact.eyebrow}
              title={contact.title}
              description={contact.description}
              phone={contact.phone}
              email={contact.email}
            />
          </main>

          <SiteFooter text={footer.text} />
        </div>
      </div>
    </div>
  );
}
