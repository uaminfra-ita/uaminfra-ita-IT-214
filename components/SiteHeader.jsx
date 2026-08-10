'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

const navItems = [
  { href: '/', label: 'Início', icon: 'home' },
  { href: '/biblioteca/', label: 'Biblioteca', icon: 'library' },
  { href: '/atividades/', label: 'Atividades', icon: 'calendar' },
  { href: '/area-do-aluno/', label: 'Área do aluno', icon: 'user' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.replace(/\/$/, ''));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/ITA_logo.png`} alt="ITA" width={103} height={44} className="h-11 w-auto" priority />
          <span className="h-8 w-px bg-slate-200" aria-hidden="true" />
          <span>
            <strong className="block text-sm font-black tracking-[.14em] text-ink">IT-214</strong>
            <span className="block text-[.67rem] font-semibold text-slate-500">Mobilidade Aérea Urbana</span>
          </span>
        </Link>

        <button className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-ink lg:hidden" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>

        <nav className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-20 flex-col gap-2 border-b border-slate-200 bg-white p-5 shadow-xl lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`} aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${isActive(item.href) ? 'bg-ink text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'}`} aria-current={isActive(item.href) ? 'page' : undefined}>
              <Icon name={item.icon} className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
