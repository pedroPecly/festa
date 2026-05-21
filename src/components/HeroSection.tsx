type HighlightItem = {
  label: string;
  value: string;
  description: string;
};

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  highlights: HighlightItem[];
};

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  highlights,
}: HeroSectionProps) {
  return (
    <section id="inicio" className="scroll-mt-24">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[#8a7f74]">
          {eyebrow}
        </p>
        <h1 className="mt-6 font-display text-4xl leading-tight md:text-6xl motion-safe:animate-[fade-up_0.8s_ease-out]">
          {title}
        </h1>
        <p className="mt-6 text-lg text-[#4f463f] md:text-xl">{subtitle}</p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-[#e5d9cb] bg-white/80 p-5 shadow-[var(--shadow)]"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
              {item.label}
            </p>
            <p className="mt-3 text-lg">{item.value}</p>
            <p className="text-sm text-[#6f655c]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
