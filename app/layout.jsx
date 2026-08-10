import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: {
    default: 'IT-214 · Mobilidade Aérea Urbana',
    template: '%s · IT-214',
  },
  description:
    'Portal acadêmico da disciplina IT-214 — Mobilidade Aérea Urbana, do Instituto Tecnológico de Aeronáutica.',
  keywords: ['ITA', 'IT-214', 'UAM', 'Mobilidade Aérea Urbana', 'Vertiportos'],
  authors: [{ name: 'Equipe IT-214' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <a className="skip-link" href="#conteudo-principal">
          Ir para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo-principal">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
