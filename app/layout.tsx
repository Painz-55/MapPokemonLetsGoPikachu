import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Atlas de Kanto | Pokémon Let's Go, Pikachu!",
  description:
    'Atlas navegável de Kanto com mapas de cidades, NPCs, trocas, encontros, itens e covis lendários.',
  icons: { icon: (process.env.NEXT_PUBLIC_BASE_PATH ?? '') + '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <noscript>
          <p
            style={{ padding: '20px', background: '#ffda57', color: '#173a43' }}
          >
            Ative o JavaScript para usar o mapa interativo, os filtros e os
            guias das cidades.
          </p>
        </noscript>
      </body>
    </html>
  );
}
