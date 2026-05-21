type GiftsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

export default function GiftsSection({
  eyebrow,
  title,
  description,
  items,
}: GiftsSectionProps) {
  return (
    <section id="presentes" className="scroll-mt-24">
      <div className="rounded-3xl border border-[#e5d9cb] bg-white/80 p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#8a7f74]">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">{title}</h2>
          </div>
          <div className="space-y-4 text-base text-[#4f463f]">
            <p>{description}</p>
            <ul className="grid gap-3 text-sm text-[#6f655c]">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#b98d5f]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
