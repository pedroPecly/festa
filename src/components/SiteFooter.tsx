type SiteFooterProps = {
  text: string;
};

export default function SiteFooter({ text }: SiteFooterProps) {
  return (
    <footer className="border-t border-[#e5d9cb] bg-white/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-8 text-center text-xs uppercase tracking-[0.3em] text-[#8a7f74] md:px-10">
        Obrigado por celebrar com a gente
        <span className="text-[10px] tracking-[0.2em]">{text}</span>
        <a
          href="#inicio"
          className="text-[10px] uppercase tracking-[0.3em] text-[#6f655c] transition hover:text-[#1b1a17]"
        >
          Voltar ao topo
        </a>
      </div>
    </footer>
  );
}
