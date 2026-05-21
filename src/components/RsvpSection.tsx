type RsvpSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  formAction: (formData: FormData) => void | Promise<void>;
  showSuccess: boolean;
  showError: boolean;
};

export default function RsvpSection({
  eyebrow,
  title,
  description,
  formAction,
  showSuccess,
  showError,
}: RsvpSectionProps) {
  return (
    <section id="rsvp" className="scroll-mt-24">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[#8a7f74]">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">{title}</h2>
          <p className="mt-4 text-base text-[#4f463f]">{description}</p>
        </div>
        <div className="rounded-3xl border border-[#e5d9cb] bg-white/80 p-6 shadow-[var(--shadow)]">
          {showSuccess && (
            <div className="rounded-2xl border border-[#d9c9b4] bg-[#f6f2ec] p-4 text-sm text-[#4f463f]">
              Confirmacao enviada com sucesso. Obrigado por confirmar!
            </div>
          )}
          {showError && (
            <div className="rounded-2xl border border-[#d9c9b4] bg-[#f6f2ec] p-4 text-sm text-[#4f463f]">
              Nao foi possivel enviar agora. Tente novamente em alguns instantes.
            </div>
          )}
          <form className="grid gap-4" action={formAction}>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                Nome completo
              </label>
              <input
                name="name"
                type="text"
                placeholder="Seu nome"
                className="mt-2 w-full rounded-xl border border-[#d9c9b4] bg-white/90 px-4 py-3 text-sm text-[#1b1a17] placeholder:text-[#9b8f83] focus:border-[#b98d5f] focus:outline-none focus:ring-2 focus:ring-[#ead6bf]"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="voce@email.com"
                className="mt-2 w-full rounded-xl border border-[#d9c9b4] bg-white/90 px-4 py-3 text-sm text-[#1b1a17] placeholder:text-[#9b8f83] focus:border-[#b98d5f] focus:outline-none focus:ring-2 focus:ring-[#ead6bf]"
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                  WhatsApp
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="mt-2 w-full rounded-xl border border-[#d9c9b4] bg-white/90 px-4 py-3 text-sm text-[#1b1a17] placeholder:text-[#9b8f83] focus:border-[#b98d5f] focus:outline-none focus:ring-2 focus:ring-[#ead6bf]"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                  Numero de convidados
                </label>
                <input
                  name="guests"
                  type="number"
                  min={1}
                  defaultValue={1}
                  placeholder="1"
                  className="mt-2 w-full rounded-xl border border-[#d9c9b4] bg-white/90 px-4 py-3 text-sm text-[#1b1a17] placeholder:text-[#9b8f83] focus:border-[#b98d5f] focus:outline-none focus:ring-2 focus:ring-[#ead6bf]"
                  required
                />
              </div>
            </div>
            <fieldset className="grid gap-3">
              <legend className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                Presenca confirmada?
              </legend>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-[#4f463f]">
                  <input
                    type="radio"
                    name="attendance"
                    value="sim"
                    className="h-4 w-4"
                    defaultChecked
                  />
                  Sim, estarei la
                </label>
                <label className="flex items-center gap-2 text-sm text-[#4f463f]">
                  <input
                    type="radio"
                    name="attendance"
                    value="nao"
                    className="h-4 w-4"
                  />
                  Nao poderei ir
                </label>
              </div>
            </fieldset>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-[#8a7f74]">
                Mensagem
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Alguma observacao especial?"
                className="mt-2 w-full rounded-xl border border-[#d9c9b4] bg-white/90 px-4 py-3 text-sm text-[#1b1a17] placeholder:text-[#9b8f83] focus:border-[#b98d5f] focus:outline-none focus:ring-2 focus:ring-[#ead6bf]"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#1b1a17] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#f6f2ec] transition hover:bg-[#2e2a24]"
            >
              Enviar confirmacao
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
