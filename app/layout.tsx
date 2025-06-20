import type { Metadata } from "next";
import { Lexend, Nunito_Sans } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const nunitosans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventudo - Um evento para tudo",
  description: "Garanta seus ingressos para os eventos mais esperados do ano com os melhores preços!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body
        className={`${lexend.variable} ${nunitosans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
