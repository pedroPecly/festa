type ContactSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  phone: string;
  email: string;
};

export default function ContactSection({
  eyebrow,
  title,
  description,
  phone,
  email,
}: ContactSectionProps) {
  return (
    <section id="contato" className="scroll-mt-24">
      <div className="rounded-3xl border border-[#e5d9cb] bg-[#1b1a17] p-8 text-[#f6f2ec] md:p-12">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#e6d2bd]">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">{title}</h2>
            <p className="mt-4 text-base text-[#e6d2bd]">{description}</p>
          </div>
          <div className="space-y-4 text-sm text-[#e6d2bd]">
            <div className="rounded-2xl border border-[#3a3128] bg-[#231f1a] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#c9b6a2]">
                WhatsApp
              </p>
              <p className="mt-2">{phone}</p>
            </div>
            <div className="rounded-2xl border border-[#3a3128] bg-[#231f1a] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#c9b6a2]">
                Email
              </p>
              <p className="mt-2">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
