import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import RouteScrollReset from "@/components/RouteScrollReset";

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "25 do Pedro | Confirmacao de Presenca",
  description:
    "Evento de aniversario para confirmar presenca, ver detalhes e programacao.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${bodyFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f6f2ec] text-[#1b1a17]">
        <RouteScrollReset />
        {children}
      </body>
    </html>
  );
}
