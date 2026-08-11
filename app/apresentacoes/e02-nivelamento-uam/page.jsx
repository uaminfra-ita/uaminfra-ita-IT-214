import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import presentationAssets from '@/data/presentation-assets.json';

const presentation = presentations.find((item) => item.slug === 'e02-nivelamento-uam');
const assets = new Map(presentationAssets.map((asset) => [asset.id, asset]));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = {
  title: presentation.title,
  description: presentation.subtitle,
};

function Slide({ kicker, title, source, notes, children, className = '' }) {
  return (
    <section className={className}>
      {kicker && <div className="slide-kicker">{kicker}</div>}
      {title && <h2 className="slide-title">{title}</h2>}
      {children}
      {source && <p className="slide-source">{source}</p>}
      {notes && <aside className="notes">{notes}</aside>}
    </section>
  );
}

function MediaFigure({ assetId, className = '', fit = 'cover', priority = false }) {
  const asset = assets.get(assetId);

  if (!asset) return null;

  return (
    <figure className={`slide-media ${className}`}>
      <div className="slide-media-frame">
        <Image
          src={`${basePath}${asset.assetPath}`}
          alt={asset.alt}
          fill
          priority={priority}
          sizes="(max-width: 800px) 92vw, 62vw"
          className={fit === 'contain' ? 'object-contain' : 'object-cover'}
        />
      </div>
      <figcaption>{asset.creditLine}</figcaption>
    </figure>
  );
}

function RouteGraphic() {
  const nodes = [['cidade', 65, 175], ['vertiporto', 265, 105], ['voo', 470, 75], ['destino', 690, 145]];
  return (
    <svg viewBox="0 0 760 235" className="mt-8 w-full" role="img" aria-label="Jornada aérea conectando cidade, vertiporto, voo e destino">
      <defs><linearGradient id="route-e02" x1="0" x2="1"><stop stopColor="#22d3ee" /><stop offset="1" stopColor="#34d399" /></linearGradient></defs>
      <path d="M65 175 C165 40 215 170 265 105 S385 30 470 75 S600 205 690 145" fill="none" stroke="url(#route-e02)" strokeWidth="8" strokeDasharray="17 14" />
      {nodes.map(([label, x, y]) => <g key={label}><circle cx={x} cy={y} r="19" fill="#071426" stroke="#67e8f9" strokeWidth="4" /><text x={x} y={y + 43} textAnchor="middle" fontSize="16" fontWeight="800" fill="#cbd5e1">{label}</text></g>)}
    </svg>
  );
}

function Cards({ items, columns = 'grid-cols-2' }) {
  return <div className={`mt-8 grid ${columns} gap-4`}>{items.map(([title, body]) => <div className="slide-card" key={title}><strong>{title}</strong><p>{body}</p></div>)}</div>;
}

export default function E02PresentationPage() {
  return (
    <PresentationDeck title={presentation.title}>
      <Slide className="slide-cover !text-white" notes="Apresente a aula como construção de uma linguagem comum. O foco não é decorar siglas: é perceber as relações necessárias para que um serviço exista.">
        <div className="slide-kicker !text-cyan-300">IT-214 · E02 · 11 de agosto de 2026</div>
        <h1 className="mt-8 max-w-5xl !font-black !text-white">Nivelamento <span className="text-cyan-300">UAM, AAM, eVTOL, UTM e ATM</span></h1>
        <p className="mt-7 max-w-3xl !text-xl !leading-8 !text-slate-300">Uma linguagem comum para compreender o sistema — da cidade ao espaço aéreo.</p>
        <RouteGraphic />
      </Slide>

      <Slide kicker="Abertura · 01" title="Uma aeronave certificada não cria sozinha um serviço" source="Material didático: Guterres (2026)." notes="Reserve cinco minutos. Use a imagem para pedir que a turma identifique os elementos necessários além da aeronave.">
        <div className="slide-split mt-5 grid grid-cols-[1.2fr_.8fr] items-center gap-7">
          <MediaFigure assetId="ebook-aam-ecosystem" priority />
          <div>
            <p className="slide-quote">O que ainda precisa funcionar para esta cena existir?</p>
            <div className="mt-6 flex flex-wrap gap-2">{['energia', 'vertiporto', 'operação', 'espaço aéreo', 'cidade', 'usuário'].map((item) => <span className="slide-pill" key={item}>{item}</span>)}</div>
          </div>
        </div>
      </Slide>

      <Slide kicker="Motivação · 02" title="O ganho relevante é porta a porta" source="Guterres (2026), Preâmbulo — representação do Tempo Adicional de Deslocamento." notes="Compare o tempo ideal de 20 minutos ao tempo real de 45. Discuta acesso, espera, voo, conexão e variabilidade, não apenas velocidade máxima.">
        <div className="slide-split mt-5 grid grid-cols-[1.15fr_.85fr] items-center gap-8">
          <MediaFigure assetId="ebook-travel-time-map" fit="contain" />
          <div><span className="slide-big-number">+25 min</span><p className="mt-5 !text-lg !font-bold !text-slate-700">A UAM cria valor quando reduz tempo adicional e incerteza em pares origem–destino específicos.</p></div>
        </div>
      </Slide>

      <Slide kicker="História · 03" title="Uma ambição antiga, habilitadores novos" source="Guterres (2026); Cohen, Shaheen & Farrar (2021); NASA / Rob Lorkiewicz (2025)." notes="Conecte três ideias: voo vertical, armazenamento elétrico e controle de voo. A convergência recente não elimina desafios antigos de custo, segurança e aceitação.">
        <div className="slide-photo-grid mt-6 grid grid-cols-3 gap-4">
          {[
            ['ebook-da-vinci-aerial-screw', 'c. 1490', 'voo vertical'],
            ['ebook-edison-electric-vehicle', '1911', 'armazenamento'],
            ['nasa-raven-flight-test', '2025', 'controle e ensaio'],
          ].map(([assetId, year, label]) => <div className="slide-photo-card" key={assetId}><MediaFigure assetId={assetId} /><div className="slide-photo-label"><strong>{year}</strong><span>{label}</span></div></div>)}
        </div>
        <p className="mt-5 text-center !text-base !font-bold !text-slate-700">Eletrificação + automação + conectividade + novos modelos operacionais</p>
      </Slide>

      <Slide kicker="Vocabulário · 04" title="Cada sigla observa uma parte do sistema" source="Pak et al. (2024); FAA UAM ConOps 2.0 (2023); Guterres (2026)." notes="As definições variam entre instituições. Em trabalhos acadêmicos, declare sempre fonte, território e tipo de operação.">
        <Cards items={[
          ['AAM', 'Guarda-chuva: operações urbanas, regionais, rurais, carga e emergência.'],
          ['UAM', 'Recorte urbano e suburbano integrado ao sistema de mobilidade.'],
          ['eVTOL', 'Tecnologia de aeronave elétrica com pouso e decolagem vertical.'],
          ['UTM / ATM', 'Serviços e regras que organizam operações e espaço aéreo.'],
        ]} />
        <div className="mt-7 flex justify-center gap-3">{['IAM', 'U-space', 'vertiporto', 'ConOps'].map((term) => <span className="slide-pill" key={term}>{term}</span>)}</div>
      </Slide>

      <Slide kicker="Casos de uso · 05" title="UAM não é sinônimo de táxi aéreo" source="Guterres (2026), baseado em Pak et al. (2024), DOI 10.1007/s13272-024-00733-x." notes="Leia a figura da escala local para a intermunicipal. Depois acrescente carga, emergência e serviço público como missões com requisitos próprios.">
        <div className="slide-split mt-6 grid grid-cols-[1.35fr_.65fr] items-center gap-8">
          <MediaFigure assetId="ebook-uam-use-cases" fit="contain" />
          <div className="space-y-3">
            {[['Passageiros', 'tempo e conexão'], ['Carga', 'prazo e capacidade'], ['Emergência', 'resposta e disponibilidade'], ['Serviço público', 'cobertura e missão']].map(([title, body]) => <div className="slide-card !p-4" key={title}><strong>{title}</strong><p>{body}</p></div>)}
          </div>
        </div>
      </Slide>

      <Slide kicker="Aeronaves · 06" title="Taxonomia separa decisões que parecem iguais" source="Guterres (2026), baseado em Arafat & Pan (2024), DOI 10.3390/drones8120702." notes="Percorra os cinco eixos. Energia, controle, propulsão, inteligência e aplicação são decisões relacionadas, mas não equivalentes.">
        <MediaFigure assetId="ebook-aam-taxonomy" className="mt-7 slide-media-wide" fit="contain" />
        <div className="mt-5 flex flex-wrap justify-center gap-2">{['energia', 'controle', 'propulsão', 'sistemas inteligentes', 'aplicação'].map((term) => <span className="slide-pill" key={term}>{term}</span>)}</div>
      </Slide>

      <Slide kicker="Aeronaves · 07" title="Arquiteturas fazem trocas — não milagres" source="Fotos: © Volocopter; NASA / Rob Lorkiewicz; Joby Aviation. Síntese: Garrow et al. (2021) e Pak et al. (2024)." notes="Compare as configurações sem eleger uma vencedora. Destaque eficiência, redundância, transição, ruído, manutenção e certificação.">
        <div className="slide-photo-grid mt-6 grid grid-cols-3 gap-4">
          {[
            ['volocopter-volocity-flight', 'Multirrotor', '+ controle direto', '− alcance e cruzeiro'],
            ['nasa-raven-flight-test', 'Lift + cruise', '+ funções separadas', '− massa e arrasto'],
            ['joby-aircraft-flight', 'Empuxo vetorado', '+ cruzeiro eficiente', '− transição complexa'],
          ].map(([assetId, title, strength, tradeoff]) => <div className="slide-card !p-3" key={title}><MediaFigure assetId={assetId} /><strong className="mt-3">{title}</strong><p className="!text-emerald-700">{strength}</p><p className="!text-rose-700">{tradeoff}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Ecossistema · 08" title="A unidade de análise é o sistema de sistemas" source="Material didático: Guterres (2026); Pak et al. (2024)." notes="Peça à turma para seguir três interfaces na cena: aeronave–vertiporto, vertiporto–cidade e operação–espaço aéreo.">
        <div className="slide-visual-stage mt-5">
          <MediaFigure assetId="ebook-aam-ecosystem" />
          <div className="slide-hotspot slide-hotspot-a">1 · rede urbana</div>
          <div className="slide-hotspot slide-hotspot-b">2 · operações</div>
          <div className="slide-hotspot slide-hotspot-c">3 · interfaces</div>
        </div>
      </Slide>

      <Slide kicker="Atores · 09" title="Seis pilares, responsabilidades distribuídas" source="Guterres (2026), baseado em Australian Association for Unmanned Systems (2021)." notes="Relacione cada pilar aos atores responsáveis. Licença social não é uma licença administrativa: é aceitação pública e legitimidade.">
        <MediaFigure assetId="ebook-aam-strategic-pillars" className="mt-6 slide-media-wide" fit="contain" />
        <div className="mt-4 flex flex-wrap justify-center gap-2">{['reguladores', 'cidades', 'indústria', 'operadores', 'comunidades', 'pesquisa'].map((actor) => <span className="slide-pill" key={actor}>{actor}</span>)}</div>
      </Slide>

      <Slide kicker="Infraestrutura · 10" title="Vertiporto é três infraestruturas em uma" source="NASA Graphics (2022); NREL/FAA, Vertiport Electrical Infrastructure Study (2023), DOI 10.2172/2203520." notes="Introduza o vertiporto como infraestrutura aeronáutica, nó urbano e carga elétrica. Energia afeta turnaround, capacidade e localização.">
        <div className="slide-split mt-5 grid grid-cols-[1.05fr_.95fr] items-center gap-6">
          <MediaFigure assetId="nasa-vertiport-concept" />
          <div className="space-y-3">
            {[['Aeronáutica', 'pouso, pátio, proteção e segurança'], ['Urbana', 'terminal, acesso, vizinhança e solo'], ['Elétrica', 'recarga, rede, armazenamento e contingência']].map(([title, body], index) => <div className="slide-card !p-4" key={title}><span className="mr-3 text-cyan-700">0{index + 1}</span><strong className="inline">{title}</strong><p>{body}</p></div>)}
          </div>
        </div>
      </Slide>

      <Slide kicker="Operação · 11" title="O voo é apenas um elo da jornada" source="Foto: NASA / Robert Lorkiewicz (2022), ensaio High Density Vertiplex." notes="Use o ensaio da NASA para mostrar que coordenação, rerroteamento, gestão de frota e contingência também precisam ser testados.">
        <div className="slide-split mt-5 grid grid-cols-[.9fr_1.1fr] items-center gap-7">
          <div><MediaFigure assetId="nasa-certain-altax-test" /><p className="slide-quote mt-4 !text-xl">Confiabilidade emerge do conjunto.</p></div>
          <div className="slide-flow grid grid-cols-2 gap-3">
            {['Reserva', 'Acesso', 'Embarque', 'Voo', 'Desembarque', 'Conexão'].map((item, index) => <div className="slide-card !p-4" key={item}><span className="text-xs font-black text-cyan-700">0{index + 1}</span><strong className="mt-2">{item}</strong></div>)}
          </div>
        </div>
      </Slide>

      <Slide kicker="Espaço aéreo · 12" title="UTM não substitui ATM" source="Guterres (2026); FAA UAM ConOps 2.0 (2023). Classificação apresentada como estrutura conceitual, não como altitude normativa." notes="A árvore mostra ambientes possíveis. Reforce que a integração precisa definir prioridade, informação, autorização, capacidade e contingência.">
        <div className="slide-split mt-6 grid grid-cols-[1.25fr_.75fr] items-center gap-8">
          <MediaFigure assetId="ebook-aam-airspace" fit="contain" />
          <div><p className="slide-quote">Integração exige coordenação entre serviços e responsabilidades.</p><div className="mt-6 flex flex-wrap gap-2">{['identificação', 'autorização', 'capacidade', 'contingência'].map((term) => <span className="slide-pill" key={term}>{term}</span>)}</div></div>
        </div>
      </Slide>

      <Slide kicker="ConOps · 13" title="A implementação evolui por níveis de integração" source="FAA UAM ConOps 2.0 e Advanced Air Mobility Implementation Plan, Version 1.0 (2023)." notes="Trate a evolução como construção de capacidade, não como previsão automática. Operações iniciais usam procedimentos e infraestrutura existentes.">
        <div className="mt-9 grid grid-cols-4 gap-4">
          {[
            ['1', 'operações iniciais', 'procedimentos existentes'],
            ['2', 'corredores e locais', 'coordenação dedicada'],
            ['3', 'maior densidade', 'serviços digitais'],
            ['4', 'rede integrada', 'automação e escala'],
          ].map(([number, title, body]) => <div className="slide-card" key={number}><span className="slide-big-number">{number}</span><strong className="mt-4">{title}</strong><p>{body}</p></div>)}
        </div>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-full bg-gradient-to-r from-cyan-500 via-sky-600 to-ink" /></div>
      </Slide>

      <Slide kicker="Território · 14" title="Localização é uma decisão multicritério" source="Mladenović, Niemi, Saif & Honkavaara (2024), CITYAM WP 1.4." notes="O relatório CITYAM trata locais de pouso e lançamento de drones urbanos. Use-o como exemplo de processo transparente, não como norma de vertiportos de passageiros.">
        <div className="slide-split mt-7 grid grid-cols-[.9fr_1.1fr] items-center gap-8">
          <div className="relative mx-auto grid h-80 w-80 place-items-center rounded-full border-[22px] border-cyan-100 bg-white"><strong className="text-center text-2xl text-ink">local<br />adequado</strong>{[['segurança', '-top-5 left-24'], ['demanda', 'top-24 -right-14'], ['energia', 'bottom-4 -right-8'], ['ambiente', '-bottom-8 left-24'], ['acesso', 'top-24 -left-12']].map(([label, position]) => <span className={`slide-pill absolute ${position}`} key={label}>{label}</span>)}</div>
          <div><p className="slide-quote">Critérios explícitos tornam escolhas comparáveis e auditáveis.</p><p className="mt-7 !text-base !text-slate-600">GIS e análise multicritério apoiam a decisão; não substituem governança, dados confiáveis ou validação local.</p></div>
        </div>
      </Slide>

      <Slide kicker="Síntese crítica · 15" title="Ruído e segurança precisam de evidência" source="Fotos: NASA (ensaio acústico Moog SureFly, 2022) e NASA / Mark Knopp (ensaio de impacto, 2025)." notes="Use os ensaios reais para converter promessas abstratas em perguntas mensuráveis: quanto ruído, em qual condição, qual tolerância a falha e como validar proteção ao ocupante.">
        <div className="slide-photo-grid mt-5 grid grid-cols-2 gap-5">
          <div className="slide-card !p-3"><MediaFigure assetId="nasa-moog-surefly-noise-test" /><strong className="mt-3">Aceitação depende de acústica mensurada</strong></div>
          <div className="slide-card !p-3"><MediaFigure assetId="nasa-air-taxi-drop-test" /><strong className="mt-3">Segurança depende de ensaio e validação</strong></div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">{['alta confiabilidade', 'energia disponível', 'custo compatível', 'baixo impacto'].map((condition) => <span className="slide-pill" key={condition}>{condition}</span>)}</div>
      </Slide>

      <Slide kicker="Discussão e E02 · 16" title="Da linguagem comum ao glossário" notes="Reserve dez minutos. Primeiro escolha a interface mais crítica; depois traduza a discussão em termos relacionados no glossário.">
        <p className="slide-quote mt-7">Qual interface é mais crítica para iniciar UAM no Brasil — e por quê?</p>
        <div className="mt-6 flex flex-wrap gap-2">{['aeronave ↔ certificação', 'vertiporto ↔ cidade', 'UTM ↔ ATM', 'energia ↔ operação', 'usuário ↔ preço'].map((term) => <span className="slide-pill" key={term}>{term}</span>)}</div>
        <div className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="grid grid-cols-[.65fr_1.4fr_1fr] bg-ink px-6 py-3 text-sm font-black text-white"><span>Termo</span><span>Definição operacional</span><span>Relação</span></div>
          {[['UAM', 'recorte urbano do sistema de mobilidade aérea', 'AAM, cidade'], ['eVTOL', 'tecnologia de aeronave elétrica VTOL', 'energia, vertiporto'], ['UTM', 'serviços digitais para organizar operações', 'ATM, autorização']].map((row) => <div className="grid grid-cols-[.65fr_1.4fr_1fr] border-t border-slate-100 px-6 py-3 text-sm text-slate-600" key={row[0]}>{row.map((cell, index) => <span className={index === 0 ? 'font-black text-ink' : ''} key={cell}>{cell}</span>)}</div>)}
        </div>
      </Slide>

      <Slide kicker="Referências · 17" title="Fontes para continuar" notes="Encerre retomando três ideias: UAM é mobilidade, eVTOL é tecnologia e desempenho depende das interfaces. Todos os artigos e documentos técnicos estão na Biblioteca.">
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          {presentation.references.map((reference) => <div className="slide-card !p-3" key={reference.url}><strong>{reference.shortTitle}</strong><p>{reference.citation}</p></div>)}
        </div>
        <p className="slide-quote mt-5 !text-xl">UAM é mobilidade. eVTOL é tecnologia. Interfaces transformam componentes em serviço.</p>
      </Slide>
    </PresentationDeck>
  );
}
