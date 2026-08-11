import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';

const presentation = presentations.find((item) => item.slug === 'e02-nivelamento-uam');

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

function MobilityComparison() {
  return (
    <svg viewBox="0 0 780 390" className="w-full" role="img" aria-label="Comparação conceitual entre deslocamento terrestre e mobilidade integrada">
      <rect x="35" y="45" width="710" height="120" rx="24" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      <path d="M90 110 C190 40 265 180 380 105 S585 40 690 110" fill="none" stroke="#94a3b8" strokeWidth="8" strokeDasharray="12 10" />
      <text x="70" y="78" fill="#475569" fontSize="18" fontWeight="800">rede terrestre</text>
      <rect x="35" y="220" width="710" height="120" rx="24" fill="#ecfeff" stroke="#0891b2" strokeWidth="3" />
      <path d="M90 285 H245 L360 250 485 285 H690" fill="none" stroke="#0891b2" strokeWidth="8" />
      <circle cx="245" cy="285" r="13" fill="#071426" /><circle cx="485" cy="285" r="13" fill="#071426" />
      <text x="70" y="255" fill="#155e75" fontSize="18" fontWeight="800">jornada multimodal</text>
      <text x="365" y="315" textAnchor="middle" fill="#155e75" fontSize="15" fontWeight="700">acesso + voo + conexão</text>
    </svg>
  );
}

function SystemMap() {
  const nodes = [['Aeronave', 380, 45], ['Energia', 620, 155], ['Cidade', 620, 360], ['Usuário', 380, 455], ['Operação', 140, 360], ['Espaço aéreo', 140, 155]];
  return (
    <svg viewBox="0 0 760 500" className="w-full" role="img" aria-label="UAM como sistema de sistemas interdependentes">
      <circle cx="380" cy="250" r="178" fill="none" stroke="#bae6fd" strokeWidth="3" strokeDasharray="9 10" />
      <circle cx="380" cy="250" r="86" fill="#071426" />
      <text x="380" y="245" textAnchor="middle" fill="#67e8f9" fontSize="32" fontWeight="900">UAM</text>
      <text x="380" y="278" textAnchor="middle" fill="#cbd5e1" fontSize="16">interfaces</text>
      {nodes.map(([label, x, y]) => <g key={label}><line x1="380" y1="250" x2={x} y2={y} stroke="#94a3b8" strokeWidth="2" /><circle cx={x} cy={y} r="49" fill="#ecfeff" stroke="#0891b2" strokeWidth="3" /><text x={x} y={y + 6} textAnchor="middle" fill="#164e63" fontSize="16" fontWeight="800">{label}</text></g>)}
    </svg>
  );
}

function AirspaceLayers() {
  return (
    <svg viewBox="0 0 780 400" className="w-full" role="img" aria-label="Integração conceitual entre ATM, UTM e U-space">
      <rect width="780" height="400" rx="28" fill="#f8fafc" />
      {[90, 195, 300].map((y, index) => <g key={y}><rect x="45" y={y - 35} width="690" height="70" rx="20" fill={['#dbeafe', '#cffafe', '#d1fae5'][index]} /><text x="75" y={y + 7} fill={['#1e3a8a', '#155e75', '#065f46'][index]} fontSize="22" fontWeight="900">{['ATM · sistema aéreo consolidado', 'Interface · coordenação e transição', 'UTM / U-space · serviços digitais'][index]}</text></g>)}
      <path d="M600 330 C500 255 630 205 520 150 S490 80 620 65" fill="none" stroke="#0891b2" strokeWidth="7" strokeDasharray="13 10" />
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

      <Slide kicker="Abertura · 01" title="Uma pergunta antes das siglas" notes="Reserve cinco minutos. Peça respostas curtas e organize-as em veículo, infraestrutura, operação, espaço aéreo, cidade e pessoas.">
        <p className="slide-quote mt-12 max-w-5xl">Se a aeronave estiver certificada amanhã, o serviço de mobilidade estará pronto?</p>
        <div className="mt-12 flex flex-wrap gap-3">{['veículo', 'energia', 'vertiporto', 'operação', 'espaço aéreo', 'cidade', 'usuário', 'regulação'].map((item) => <span className="slide-pill" key={item}>{item}</span>)}</div>
        <aside className="notes">Objetivos: distinguir o vocabulário, reconhecer a UAM como sistema de sistemas, relacionar seus subsistemas e identificar oportunidades e limites.</aside>
      </Slide>

      <Slide kicker="Motivação · 02" title="O problema não é apenas ir mais rápido" source="Síntese original a partir de Guterres (2026), Mobilidade Aérea Urbana, Preâmbulo." notes="Use a comparação para deslocar a discussão de velocidade máxima para tempo porta a porta, confiabilidade e acesso.">
        <div className="slide-split mt-5 grid grid-cols-[1.15fr_.85fr] items-center gap-8"><MobilityComparison /><div><span className="slide-big-number">porta a porta</span><p className="mt-5 !text-lg !font-bold !text-slate-700">A UAM só cria valor quando reduz o custo total da jornada e se integra à rede urbana.</p></div></div>
      </Slide>

      <Slide kicker="História · 03" title="Uma ambição antiga, habilitadores novos" source="Cohen, Shaheen & Farrar (2021), DOI 10.1109/TITS.2021.3082767." notes="Helicópteros já ofereceram conexões urbanas. A novidade atual é a convergência entre eletrificação, automação, conectividade e novos modelos operacionais.">
        <div className="mt-10 grid grid-cols-5 gap-3">
          {[['1910s', 'imaginação'], ['1950s', 'helicópteros'], ['2010s', 'on demand'], ['entrada', 'corredores'], ['escala', 'rede integrada']].map(([time, label]) => <div className="slide-card text-center" key={time}><span className="slide-big-number !text-3xl">{time}</span><strong className="mt-4">{label}</strong></div>)}
        </div>
        <p className="slide-quote mt-10">Voar é necessário. Sustentar custo, escala e legitimidade é decisivo.</p>
      </Slide>

      <Slide kicker="Vocabulário · 04" title="Cada sigla observa uma parte do sistema" source="Pak et al. (2024); FAA UAM ConOps 2.0 (2023); Guterres (2026)." notes="As definições variam entre instituições. Em trabalhos acadêmicos, declare sempre fonte, território e tipo de operação.">
        <Cards items={[
          ['AAM', 'Guarda-chuva amplo: operações urbanas, regionais, rurais, carga e emergência.'],
          ['UAM', 'Recorte urbano e suburbano integrado ao sistema de mobilidade.'],
          ['eVTOL', 'Tecnologia de aeronave elétrica com pouso e decolagem vertical.'],
          ['UTM / ATM', 'Serviços e regras que organizam operações e espaço aéreo.'],
        ]} />
        <div className="mt-7 flex justify-center gap-3">{['IAM', 'U-space', 'vertiporto', 'ConOps'].map((term) => <span className="slide-pill" key={term}>{term}</span>)}</div>
      </Slide>

      <Slide kicker="Casos de uso · 05" title="UAM não é sinônimo de táxi aéreo" source="FAA UAM ConOps 2.0 (2023); Guterres (2026), capítulo AAM." notes="Cada missão muda prioridade, cabine, infraestrutura, certificação, preço e tempo de resposta.">
        <Cards columns="grid-cols-3" items={[
          ['Passageiros', 'Aeroporto, urbano, suburbano e regional.'],
          ['Carga', 'Logística crítica e última milha.'],
          ['Emergência', 'Saúde, resgate e resposta rápida.'],
          ['Serviço público', 'Inspeção, monitoramento e segurança.'],
          ['Conectividade', 'Áreas pouco servidas pela aviação.'],
          ['Multimodalidade', 'Uma etapa de uma jornada mais ampla.'],
        ]} />
      </Slide>

      <Slide kicker="Aeronaves · 06" title="Uma taxonomia para não misturar decisões" source="Diagrama original baseado na estrutura didática de Guterres (2026), capítulo AAM." notes="Mostre que energia, controle, propulsão e aplicação são eixos diferentes. Não se pode concluir a missão apenas pela aparência da aeronave.">
        <div className="mt-9 grid grid-cols-4 gap-4">
          {[
            ['Energia', ['elétrico', 'híbrido', 'hidrogênio']],
            ['Controle', ['pilotado', 'autônomo', 'híbrido']],
            ['Propulsão', ['multirrotor', 'lift + cruise', 'vetorado']],
            ['Aplicação', ['passageiro', 'carga', 'emergência']],
          ].map(([title, tags]) => <div className="slide-card" key={title}><strong>{title}</strong><div className="mt-5 flex flex-wrap gap-2">{tags.map((tag) => <span className="slide-pill" key={tag}>{tag}</span>)}</div></div>)}
        </div>
      </Slide>

      <Slide kicker="Aeronaves · 07" title="Arquiteturas fazem trocas — não milagres" source="Garrow, German & Leonard (2021); Pak et al. (2024)." notes="Não eleja uma arquitetura vencedora. Compare eficiência de cruzeiro, redundância, transição, ruído, manutenção e certificação.">
        <div className="mt-9 grid grid-cols-3 gap-5">
          {[
            ['Multirrotor', 'controle direto', 'alcance e cruzeiro'],
            ['Lift + cruise', 'funções separadas', 'massa e arrasto'],
            ['Empuxo vetorado', 'eficiência potencial', 'transição complexa'],
          ].map(([title, strength, tradeoff]) => <div className="slide-card" key={title}><div className="mb-5 grid h-24 place-items-center rounded-2xl bg-ink text-4xl text-cyan-300">✦</div><strong>{title}</strong><p className="!text-emerald-700">+ {strength}</p><p className="!text-rose-700">− {tradeoff}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Ecossistema · 08" title="A unidade de análise é o sistema de sistemas" source="Pak et al. (2024); síntese didática original." notes="A falha de uma interface pode inviabilizar o serviço mesmo quando cada componente funciona isoladamente.">
        <div className="slide-split mt-2 grid grid-cols-[1.2fr_.8fr] items-center gap-6"><SystemMap /><p className="slide-quote">Desempenho emerge das interfaces — não apenas dos componentes.</p></div>
      </Slide>

      <Slide kicker="Atores · 09" title="Responsabilidades atravessam instituições" source="Cohen et al. (2021); FAA AAM Implementation Plan (2023)." notes="Destaque que cidade e aviação civil possuem competências distintas e precisam coordenar solo, segurança e operação.">
        <Cards columns="grid-cols-4" items={[
          ['Reguladores', 'aeronave, operação e espaço aéreo'],
          ['Cidades', 'uso do solo, acesso e impacto local'],
          ['Indústria', 'veículo, energia e infraestrutura'],
          ['Operadores', 'rede, frota, preço e serviço'],
          ['ATM / UTM', 'capacidade, informação e separação'],
          ['Comunidades', 'aceitação, ruído e equidade'],
          ['Energia / telecom', 'potência, dados e resiliência'],
          ['Pesquisa', 'evidências, cenários e métricas'],
        ]} />
      </Slide>

      <Slide kicker="Infraestrutura · 10" title="Vertiporto é três infraestruturas em uma" source="NREL/FAA, Vertiport Electrical Infrastructure Study (2023), DOI 10.2172/2203520; Pak et al. (2024)." notes="Introduza o vertiporto como infraestrutura aeronáutica, nó urbano e carga elétrica. Energia afeta turnaround, capacidade e localização.">
        <div className="mt-10 grid grid-cols-3 gap-6">
          {[
            ['Aeronáutica', 'pouso, decolagem, pátio, proteção e segurança'],
            ['Urbana', 'terminal, acesso terrestre, vizinhança e uso do solo'],
            ['Elétrica', 'recarga, simultaneidade, rede, armazenamento e contingência'],
          ].map(([title, body], index) => <div className="slide-card text-center" key={title}><span className="slide-big-number">0{index + 1}</span><strong className="mt-5 !text-xl">{title}</strong><p className="!mt-3">{body}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Operação · 11" title="O voo é apenas um elo da jornada" notes="Peça à turma para identificar onde surgem filas, incerteza, falhas de informação e risco de perder conexão.">
        <div className="slide-flow mt-12 flex items-center gap-2">
          {['Reserva', 'Acesso', 'Embarque', 'Voo', 'Desembarque', 'Conexão'].map((item, index) => <div className="contents" key={item}><div className="slide-card flex-1 !p-4 text-center"><strong>{item}</strong></div>{index < 5 && <span className="text-2xl font-black text-cyan-700">→</span>}</div>)}
        </div>
        <p className="slide-quote mt-12">Confiabilidade porta a porta pode valer mais que velocidade máxima.</p>
      </Slide>

      <Slide kicker="Espaço aéreo · 12" title="UTM não substitui ATM" source="FAA UAM ConOps 2.0 (2023); Pak et al. (2024)." notes="As camadas são conceituais, não altitudes normativas. A mensagem é coordenação entre serviços, ambientes e responsabilidades.">
        <div className="slide-split mt-6 grid grid-cols-[1.2fr_.8fr] items-center gap-8"><AirspaceLayers /><div><p className="slide-quote">Integração exige regras para prioridade, informação e contingência.</p><div className="mt-6 flex flex-wrap gap-2">{['identificação', 'autorização', 'capacidade', 'coordenação'].map((term) => <span className="slide-pill" key={term}>{term}</span>)}</div></div></div>
      </Slide>

      <Slide kicker="ConOps · 13" title="A implementação evolui por níveis de integração" source="FAA UAM ConOps 2.0 e AAM Implementation Plan, versão 1.0 (2023)." notes="Trate a evolução como construção de capacidade, não como previsão automática. Operações iniciais usam procedimentos e infraestrutura existentes antes de maior automação e escala.">
        <div className="mt-10 grid grid-cols-4 gap-4">
          {[
            ['1', 'operações iniciais', 'procedimentos existentes'],
            ['2', 'corredores e locais', 'coordenação dedicada'],
            ['3', 'maior densidade', 'serviços digitais'],
            ['4', 'rede integrada', 'automação e escala'],
          ].map(([number, title, body]) => <div className="slide-card" key={number}><span className="slide-big-number">{number}</span><strong className="mt-4">{title}</strong><p>{body}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Território · 14" title="Localização é uma decisão multicritério" source="Mladenović, Niemi, Saif & Honkavaara (2024), CITYAM Project." notes="O relatório CITYAM trata locais de pouso e lançamento de drones urbanos. Use-o como exemplo de processo transparente, não como norma de vertiportos de passageiros.">
        <div className="slide-split mt-8 grid grid-cols-[.9fr_1.1fr] items-center gap-8">
          <div className="relative mx-auto grid h-80 w-80 place-items-center rounded-full border-[22px] border-cyan-100 bg-white"><strong className="text-center text-2xl text-ink">local<br />adequado</strong>{[['segurança', '-top-5 left-24'], ['demanda', 'top-24 -right-14'], ['energia', 'bottom-4 -right-8'], ['ambiente', '-bottom-8 left-24'], ['acesso', 'top-24 -left-12']].map(([label, position]) => <span className={`slide-pill absolute ${position}`} key={label}>{label}</span>)}</div>
          <div><p className="slide-quote">Critérios explícitos tornam escolhas comparáveis, auditáveis e discutíveis.</p><p className="mt-7 !text-base !text-slate-600">GIS e análise multicritério apoiam a decisão; não substituem governança, dados confiáveis ou validação local.</p></div>
        </div>
      </Slide>

      <Slide kicker="Síntese crítica · 15" title="Toda promessa depende de condições" source="Cohen et al. (2021); Garrow et al. (2021); Pak et al. (2024)." notes="Evite marketing e rejeição automática. Pergunte qual hipótese precisa ser verdadeira para cada benefício.">
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="slide-card !border-emerald-200 !bg-emerald-50"><span className="slide-pill !bg-emerald-200 !text-emerald-900">Potencial</span><ul><li>tempo em pares origem–destino específicos</li><li>novas conexões e serviços críticos</li><li>emissão local reduzida</li><li>integração regional e urbana</li></ul></div>
          <div className="slide-card !border-amber-200 !bg-amber-50"><span className="slide-pill !bg-amber-200 !text-amber-900">Condições</span><ul><li>segurança e alta confiabilidade</li><li>energia e infraestrutura disponíveis</li><li>preço e ocupação compatíveis</li><li>aceitação, equidade e baixo impacto</li></ul></div>
        </div>
      </Slide>

      <Slide kicker="Discussão e E02 · 16" title="Da linguagem comum ao glossário" notes="Reserve dez minutos. Primeiro escolha a interface mais crítica; depois traduza a discussão em termos relacionados no glossário.">
        <p className="slide-quote mt-8">Qual interface é mais crítica para iniciar UAM no Brasil — e por quê?</p>
        <div className="mt-7 flex flex-wrap gap-2">{['aeronave ↔ certificação', 'vertiporto ↔ cidade', 'UTM ↔ ATM', 'energia ↔ operação', 'usuário ↔ preço'].map((term) => <span className="slide-pill" key={term}>{term}</span>)}</div>
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="grid grid-cols-[.65fr_1.4fr_1fr] bg-ink px-6 py-4 text-sm font-black text-white"><span>Termo</span><span>Definição operacional</span><span>Relação</span></div>
          {[['UAM', 'recorte urbano do sistema de mobilidade aérea', 'AAM, cidade'], ['eVTOL', 'tecnologia de aeronave elétrica VTOL', 'energia, vertiporto'], ['UTM', 'serviços digitais para organizar operações', 'ATM, autorização']].map((row) => <div className="grid grid-cols-[.65fr_1.4fr_1fr] border-t border-slate-100 px-6 py-4 text-sm text-slate-600" key={row[0]}>{row.map((cell, index) => <span className={index === 0 ? 'font-black text-ink' : ''} key={cell}>{cell}</span>)}</div>)}
        </div>
      </Slide>

      <Slide kicker="Referências · 17" title="Fontes para continuar" notes="Encerre retomando três ideias: UAM é mobilidade, eVTOL é tecnologia e desempenho depende das interfaces. Os artigos estão na Biblioteca; os documentos técnicos são referenciados por suas fontes oficiais.">
        <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
          {presentation.references.map((reference) => <div className="slide-card !p-4" key={reference.url}><strong>{reference.shortTitle}</strong><p>{reference.citation}</p></div>)}
        </div>
        <p className="slide-quote mt-6">UAM é mobilidade. eVTOL é tecnologia. Interfaces transformam componentes em serviço.</p>
      </Slide>
    </PresentationDeck>
  );
}
