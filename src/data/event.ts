export type NavLink = {
  href: string;
  label: string;
};

export type HighlightItem = {
  label: string;
  value: string;
  description: string;
};

export const eventData = {
  header: {
    badge: "25",
    label: "Aniversario",
    name: "Pedro",
    navLinks: [
      { href: "#inicio", label: "Inicio" },
      { href: "#detalhes", label: "Detalhes" },
      { href: "#rsvp", label: "Confirmacao" },
      { href: "#presentes", label: "Presentes" },
      { href: "#contato", label: "Contato" },
    ] satisfies NavLink[],
  },
  hero: {
    eyebrow: "Convite especial",
    title: "25 do Pedro",
    subtitle:
      "Uma noite para celebrar 25 anos ao lado de quem faz parte da historia.",
    highlights: [
      {
        label: "Data",
        value: "23 de maio de 2026",
        description: "20h",
      },
      {
        label: "Local",
        value: "Itaperuna",
        description: "Rua Maria Ortega Arrabal, 291",
      },
    ] satisfies HighlightItem[],
  },
  details: {
    eyebrow: "Detalhes do evento",
    title: "Um encontro para celebrar junto",
    description: "Um encontro leve e acolhedor para celebrar com quem importa.",
    start: {
      label: "Inicio",
      time: "20h",
      description: "Recepcao e boas-vindas",
    },
    location: {
      eyebrow: "Como chegar",
      title: "Rua Maria Ortega Arrabal",
      description:
        "Numero 291, Bairro Aeroporto, Itaperuna. Referencia ao lado do Armazem JRE.",
      notes: [
        "Estacionamento facil na rua e arredores.",
        "Chegue com antecedencia para aproveitar a recepcao.",
      ],
    },
  },
  rsvp: {
    eyebrow: "Confirmacao de presenca",
    title: "Reserve seu lugar na celebracao",
    description: "Preencha os dados abaixo para garantir sua presenca.",
  },
  gifts: {
    eyebrow: "Lista de presentes",
    title: "Sua presenca ja e o presente principal",
    description: "Se quiser trazer algo simbolico:",
    items: [
      "Ovo.",
      "Galinha.",
      "Carro.",
      "Maçaneta",
      "flagelo cosmico",
      "ansiolitico"
    ],
  },
  contact: {
    eyebrow: "Contato",
    title: "Precisa falar com a organizacao?",
    description: "Use o formulario ou fale diretamente pelos canais abaixo.",
    phone: "(22) 99600-3545",
    email: "pedrohpg23@hotmail.com",
  },
  footer: {
    text: "Nos vemos em 23 de maio de 2026",
  },
};
