import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IT-214 - Mobilidade Aérea Urbana',
  description:
    'Portal da Disciplina IT-214 - Mobilidade Aérea Urbana. Instituto Tecnológico de Aeronáutica (ITA).',
  keywords:
    'ITA, Aeronáutica, Mobilidade Aérea Urbana, UAM, Disciplina, Ensino',
  authors: [
    { name: 'Prof. Dr. Marcelo Xavier Guterres' },
    { name: 'MSc. Gabriela Oliveira de Souza' },
    { name: 'Rodrigo Mollo Furlan' },
  ],
  openGraph: {
    title: 'IT-214 - Mobilidade Aérea Urbana',
    description:
      'Portal da Disciplina IT-214 - Mobilidade Aérea Urbana do Instituto Tecnológico de Aeronáutica.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
