'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

export default function PresentationDeck({ title, children }) {
  const revealRef = useRef(null);
  const shellRef = useRef(null);
  const deckRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => {
    let active = true;

    async function initialize() {
      try {
        const [{ default: Reveal }, { default: RevealNotes }] = await Promise.all([
          import('reveal.js'),
          import('reveal.js/plugin/notes/notes.esm.js'),
        ]);
        if (!active || !revealRef.current) return;
        const deck = new Reveal(revealRef.current, {
          width: '100%',
          height: '100%',
          margin: 0,
          minScale: 0.2,
          maxScale: 1.5,
          hash: true,
          controls: true,
          controlsLayout: 'edges',
          progress: true,
          slideNumber: 'c/t',
          touch: true,
          keyboard: true,
          overview: true,
          center: false,
          transition: 'fade',
          backgroundTransition: 'fade',
          plugins: [RevealNotes],
        });
        deckRef.current = deck;
        await deck.initialize();
        if (active) setReady(true);
      } catch (initializationError) {
        if (active) setError(initializationError instanceof Error ? initializationError.message : 'Falha desconhecida ao iniciar os slides.');
      }
    }

    initialize();
    return () => {
      active = false;
      setReady(false);
      deckRef.current?.destroy();
      deckRef.current = null;
    };
  }, []);

  async function toggleFullscreen() {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await shellRef.current?.requestFullscreen();
  }

  return (
    <div className="presentation-shell fixed inset-0 z-[80]" ref={shellRef} aria-label={`Apresentação: ${title}`}>
      <div className="presentation-toolbar absolute left-3 right-3 top-3 z-20 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/90 px-4 py-2 text-white shadow-xl backdrop-blur">
        <a className="inline-flex shrink-0 items-center gap-2 text-xs font-black" href={`${basePath}/atividades/`}><Icon name="arrow" className="h-4 w-4 rotate-180" /><span className="hidden sm:inline">Voltar às atividades</span><span className="sm:hidden">Voltar</span></a>
        <span className={`hidden text-xs font-bold md:block ${error ? 'text-red-300' : 'text-slate-300'}`}>{error || (ready ? 'Setas para navegar · S para notas' : 'Preparando apresentação…')}</span>
        <div className="flex gap-2">
          <button className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-black hover:bg-white/10" type="button" onClick={() => deckRef.current?.toggleOverview()}>Visão geral</button>
          <button className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-black hover:bg-white/10" type="button" onClick={toggleFullscreen}>Tela cheia</button>
          <a className="hidden rounded-full bg-cyan-300 px-3 py-1.5 text-xs font-black text-ink hover:bg-cyan-200 sm:inline-flex" href="?print-pdf" target="_blank">Imprimir</a>
        </div>
      </div>
      <div className="reveal" ref={revealRef}>
        <div className="slides">{children}</div>
      </div>
    </div>
  );
}
