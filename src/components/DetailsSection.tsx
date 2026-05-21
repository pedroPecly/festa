type DetailsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  start: {
    label: string;
    time: string;
    description: string;
  };
  location: {
    eyebrow: string;
    title: string;
    description: string;
    notes: string[];
  };
};

export default function DetailsSection({
  eyebrow,
  title,
  description,
  start,
  location,
}: DetailsSectionProps) {
  return (
    <section id="detalhes" className="scroll-mt-24">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[#8a7f74]">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">{title}</h2>
          <p className="mt-5 text-base text-[#4f463f]">{description}</p>
          <div className="mt-6">
            <div className="rounded-2xl border border-[#e5d9cb] bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                {start.label}
              </p>
              <p className="mt-2 text-lg">{start.time}</p>
              <p className="text-sm text-[#6f655c]">{start.description}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-[#e5d9cb] bg-white/80 p-6 shadow-[var(--shadow)]">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8a7f74]">
            {location.eyebrow}
          </p>
          <h3 className="mt-4 font-display text-2xl">{location.title}</h3>
          <p className="mt-3 text-sm text-[#6f655c]">{location.description}</p>
          <ul className="mt-5 space-y-3 text-sm text-[#4f463f]">
            {location.notes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#b98d5f]" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
