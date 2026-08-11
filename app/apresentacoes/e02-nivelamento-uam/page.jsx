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

function MediaFigure({ assetId, className = '', frameClassName = '', fit = 'contain', priority = false }) {
  const asset = assets.get(assetId);
  if (!asset) return null;

  return (
    <figure className={`slide-media ${className}`}>
      <div className={`slide-media-frame ${frameClassName}`}>
        <Image
          src={`${basePath}${asset.assetPath}`}
          alt={asset.alt}
          fill
          priority={priority}
          sizes="(max-width: 800px) 94vw, 72vw"
          className={fit === 'cover' ? 'object-cover' : 'object-contain'}
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

function DefinitionRow({ term, children }) {
  return <div className="definition-row"><strong>{term}</strong><p>{children}</p></div>;
}

export default function E02PresentationPage() {
  return (
    <PresentationDeck title={presentation.title}>
      <Slide className="slide-cover !text-white" notes="Apresente o objetivo da aula: estabelecer referências comuns para as discussões do semestre. Avise que a sequência partirá do problema de mobilidade e chegará às interfaces técnicas.">
        <div className="slide-kicker !text-cyan-300">IT-214 · E02 · 11 de agosto de 2026</div>
        <h1 className="mt-8 max-w-5xl !font-black !text-white">Nivelamento <span className="text-cyan-300">UAM, AAM, eVTOL, UTM e ATM</span></h1>
        <p className="mt-7 max-w-3xl !text-xl !leading-8 !text-slate-300">Conceitos básicos para discutir mobilidade aérea urbana ao longo do semestre.</p>
        <RouteGraphic />
      </Slide>

      <Slide kicker="Ponto de partida" title="Antes da aeronave, há um problema de mobilidade" source="Material didático da disciplina: Guterres (2026)." notes="Peça que a turma observe a figura e cite o que precisa estar disponível além da aeronave. Organize as respostas em infraestrutura, operação, regulação e integração urbana.">
        <div className="slide-split mt-5 grid grid-cols-[1.45fr_.55fr] items-center gap-8">
          <MediaFigure assetId="ebook-aam-ecosystem" frameClassName="media-large" priority />
          <div>
            <p className="slide-question">Que condições precisam estar reunidas para uma viagem como esta acontecer?</p>
            <p className="mt-6 !text-base !leading-7 !text-slate-600">A resposta será o fio condutor da aula: aeronave, infraestrutura, operação, espaço aéreo e cidade.</p>
          </div>
        </div>
      </Slide>

      <Slide kicker="A viagem completa" title="O indicador relevante é o tempo porta a porta" source="Guterres (2026), representação do Tempo Adicional de Deslocamento." notes="Compare o tempo direto indicado no mapa com o tempo real da jornada. Mostre que acesso, espera, conexão e variabilidade podem eliminar a vantagem de velocidade do trecho aéreo.">
        <MediaFigure assetId="ebook-travel-time-map" className="mt-5" frameClassName="media-panorama" />
        <div className="slide-takeaway mt-5"><strong>20 min de voo não significam 20 min de viagem.</strong><span>O serviço só cria valor se reduzir o tempo total e sua incerteza.</span></div>
      </Slide>

      <Slide kicker="De onde viemos" title="A ideia é antiga; a combinação tecnológica é recente" source="Guterres (2026); Cohen, Shaheen & Farrar (2021); NASA / Rob Lorkiewicz (2025)." notes="Conecte voo vertical, propulsão elétrica e controle de voo. Evite uma leitura linear da história: são linhas de desenvolvimento que convergem, não uma sucessão direta de protótipos.">
        <div className="history-strip mt-6">
          <div className="history-item history-wide"><MediaFigure assetId="ebook-da-vinci-aerial-screw" frameClassName="media-history" /><p><strong>c. 1490</strong><span>voo vertical</span></p></div>
          <div className="history-item history-portrait"><MediaFigure assetId="ebook-edison-electric-vehicle" frameClassName="media-history" /><p><strong>1911</strong><span>energia elétrica</span></p></div>
          <div className="history-item history-wide"><MediaFigure assetId="nasa-raven-flight-test" frameClassName="media-history" /><p><strong>2025</strong><span>controle e ensaio</span></p></div>
        </div>
        <p className="slide-transition">Essa convergência explica as aeronaves atuais — mas ainda precisamos nomear corretamente cada parte do problema.</p>
      </Slide>

      <Slide kicker="Vocabulário" title="UAM, AAM e eVTOL não são sinônimos" source="Pak et al. (2024); FAA UAM ConOps 2.0 (2023); Guterres (2026)." notes="Destaque a diferença de natureza entre os termos: AAM e UAM delimitam sistemas e operações; eVTOL descreve uma tecnologia de aeronave; UTM e ATM organizam o uso do espaço aéreo.">
        <div className="definition-list mt-7">
          <DefinitionRow term="AAM">Conjunto amplo de novas operações aéreas: urbanas, regionais, rurais, de carga e de emergência.</DefinitionRow>
          <DefinitionRow term="UAM">Recorte urbano e suburbano da AAM, conectado ao sistema de mobilidade da cidade.</DefinitionRow>
          <DefinitionRow term="eVTOL">Aeronave elétrica capaz de decolar e pousar verticalmente; é tecnologia, não o serviço completo.</DefinitionRow>
          <DefinitionRow term="UTM / ATM">Serviços, procedimentos e responsabilidades usados para organizar operações no espaço aéreo.</DefinitionRow>
        </div>
        <p className="slide-transition">Com o vocabulário definido, podemos perguntar quais viagens esse sistema pretende atender.</p>
      </Slide>

      <Slide kicker="Aplicações" title="O táxi aéreo é apenas um dos casos de uso" source="Guterres (2026), baseado em Pak et al. (2024), DOI 10.1007/s13272-024-00733-x." notes="Leia a figura da escala local para a intermunicipal. Em seguida, acrescente carga, emergência e serviço público; cada missão altera requisitos de capacidade, disponibilidade, custo e infraestrutura.">
        <MediaFigure assetId="ebook-uam-use-cases" className="mt-6" frameClassName="media-panorama" />
        <div className="use-case-line mt-5"><span>passageiros</span><span>carga</span><span>emergência</span><span>serviço público</span></div>
        <p className="slide-transition">Missões diferentes exigem desempenhos diferentes — e isso aparece na configuração da aeronave.</p>
      </Slide>

      <Slide kicker="Aeronaves" title="A taxonomia ajuda a separar escolhas de projeto" source="Guterres (2026), baseado em Arafat & Pan (2024), DOI 10.3390/drones8120702." notes="Percorra a figura da esquerda para a direita. Energia, controle, propulsão, sistemas inteligentes e aplicação são escolhas relacionadas, mas não equivalentes.">
        <MediaFigure assetId="ebook-aam-taxonomy" className="mt-7" frameClassName="media-diagram-wide" />
        <p className="slide-transition">Uma dessas escolhas — a arquitetura de propulsão — deixa claros os compromissos de desempenho.</p>
      </Slide>

      <Slide kicker="Arquiteturas eVTOL" title="Não há uma configuração melhor em todos os critérios" source="Fotos: © Volocopter; NASA / Rob Lorkiewicz; Joby Aviation. Síntese: Garrow et al. (2021) e Pak et al. (2024)." notes="Compare as configurações sem escolher uma vencedora. Alcance, eficiência, redundância, transição, ruído, manutenção e certificação devem ser avaliados para a missão proposta.">
        <div className="aircraft-comparison mt-6">
          {[
            ['volocopter-volocity-flight', 'Multirrotor', 'controle direto', 'menor eficiência em cruzeiro'],
            ['nasa-raven-flight-test', 'Lift + cruise', 'funções separadas', 'massa e arrasto adicionais'],
            ['joby-aircraft-flight', 'Empuxo vetorado', 'cruzeiro eficiente', 'transição mais complexa'],
          ].map(([assetId, title, strength, tradeoff]) => <div className="aircraft-item" key={title}><MediaFigure assetId={assetId} frameClassName="media-aircraft" /><h3>{title}</h3><p><b>Favorece:</b> {strength}</p><p><b>Exige atenção:</b> {tradeoff}</p></div>)}
        </div>
        <p className="slide-transition">Mesmo a aeronave mais adequada depende de uma rede de outros componentes.</p>
      </Slide>

      <Slide kicker="Ecossistema" title="A aeronave ocupa apenas uma parte da figura" source="Material didático da disciplina: Guterres (2026); Pak et al. (2024)." notes="Volte à figura do início. Agora peça que a turma acompanhe três interfaces: aeronave–vertiporto, vertiporto–cidade e operação–espaço aéreo.">
        <MediaFigure assetId="ebook-aam-ecosystem" className="mt-5" frameClassName="media-ecosystem" />
        <div className="interface-line mt-4"><span>aeronave ↔ vertiporto</span><span>vertiporto ↔ cidade</span><span>operação ↔ espaço aéreo</span></div>
      </Slide>

      <Slide kicker="Responsabilidades" title="O sistema só avança quando os atores avançam juntos" source="Guterres (2026), baseado em Australian Association for Unmanned Systems (2021)." notes="Relacione os pilares aos atores responsáveis. Explique que licença social não é uma autorização administrativa; é aceitação pública e legitimidade para operar.">
        <MediaFigure assetId="ebook-aam-strategic-pillars" className="mt-5" frameClassName="media-pillars" />
        <p className="slide-caption-strong">Reguladores · cidades · indústria · operadores · comunidades · pesquisa</p>
        <p className="slide-transition">O ponto em que várias dessas responsabilidades se encontram fisicamente é o vertiporto.</p>
      </Slide>

      <Slide kicker="Infraestrutura" title="O vertiporto conecta três redes" source="NASA Graphics (2022); NREL/FAA, Vertiport Electrical Infrastructure Study (2023), DOI 10.2172/2203520." notes="Apresente o vertiporto como infraestrutura aeronáutica, nó de mobilidade urbana e carga relevante para a rede elétrica. Mostre que energia afeta turnaround, capacidade e localização.">
        <div className="slide-split mt-5 grid grid-cols-[1.4fr_.6fr] items-center gap-7">
          <MediaFigure assetId="nasa-vertiport-concept" frameClassName="media-large" />
          <div className="network-list">
            <div><strong>Aeronáutica</strong><span>pouso, pátio, proteção e segurança</span></div>
            <div><strong>Urbana</strong><span>terminal, acesso, vizinhança e uso do solo</span></div>
            <div><strong>Elétrica</strong><span>recarga, rede, armazenamento e contingência</span></div>
          </div>
        </div>
      </Slide>

      <Slide kicker="Operação" title="A viagem começa antes da decolagem" source="Foto: NASA / Robert Lorkiewicz (2022), ensaio High Density Vertiplex." notes="Use o ensaio da NASA para mostrar que coordenação, rerroteamento, gestão de frota e contingência também precisam ser testados. Percorra a jornada completa com a turma.">
        <MediaFigure assetId="nasa-certain-altax-test" className="mt-5" frameClassName="media-operation" />
        <ol className="journey-line mt-5">{['Reserva', 'Acesso', 'Embarque', 'Voo', 'Desembarque', 'Conexão'].map((item) => <li key={item}>{item}</li>)}</ol>
        <p className="slide-transition">Durante o trecho aéreo, essa coordenação precisa conversar com a gestão do espaço aéreo.</p>
      </Slide>

      <Slide kicker="Espaço aéreo" title="UTM e ATM precisam operar de forma coordenada" source="Guterres (2026); FAA UAM ConOps 2.0 (2023). Estrutura conceitual, não altitude normativa." notes="A árvore mostra ambientes possíveis. Reforce que a integração precisa definir prioridade, compartilhamento de informação, autorização, capacidade e contingência. UTM amplia a capacidade de coordenação; não substitui ATM.">
        <MediaFigure assetId="ebook-aam-airspace" className="mt-7" frameClassName="media-airspace" />
        <div className="coordination-line mt-5"><span>identificação</span><span>autorização</span><span>capacidade</span><span>contingência</span></div>
        <p className="slide-transition">Essa integração não começa pronta: ela ganha capacidade em etapas.</p>
      </Slide>

      <Slide kicker="ConOps" title="As operações iniciais usarão muito do que já existe" source="FAA UAM ConOps 2.0 e Advanced Air Mobility Implementation Plan, Version 1.0 (2023)." notes="Trate a sequência como construção de capacidade, não como previsão de datas. Procedimentos existentes sustentam operações iniciais; serviços digitais e automação entram conforme aumentam volume e complexidade.">
        <ol className="maturity-line mt-9">
          <li><span>1</span><strong>Operações iniciais</strong><small>procedimentos existentes</small></li>
          <li><span>2</span><strong>Locais e rotas definidas</strong><small>coordenação dedicada</small></li>
          <li><span>3</span><strong>Maior densidade</strong><small>serviços digitais</small></li>
          <li><span>4</span><strong>Rede integrada</strong><small>automação e escala</small></li>
        </ol>
        <p className="slide-transition">A evolução operacional depende também de decisões locais: onde a infraestrutura pode ser implantada?</p>
      </Slide>

      <Slide kicker="Território" title="Escolher um local é excluir, comparar e validar" source="Mladenović, Niemi, Saif & Honkavaara (2024), CITYAM WP 1.4." notes="O relatório CITYAM trata locais de pouso e lançamento de drones urbanos. Use-o como exemplo de processo transparente, não como norma para vertiportos de passageiros.">
        <div className="site-process mt-8">
          <div><span>1</span><strong>Excluir</strong><p>áreas incompatíveis</p></div>
          <div><span>2</span><strong>Pontuar</strong><p>segurança, acesso, demanda, energia e ambiente</p></div>
          <div><span>3</span><strong>Comparar</strong><p>alternativas e sensibilidades</p></div>
          <div><span>4</span><strong>Validar</strong><p>dados, atores e condições locais</p></div>
        </div>
        <p className="slide-question mt-8 !text-2xl">GIS apoia a decisão; não substitui governança nem verificação em campo.</p>
      </Slide>

      <Slide kicker="O que precisa ser demonstrado" title="Ruído e segurança devem ser medidos, não presumidos" source="Fotos: NASA (ensaio acústico Moog SureFly, 2022) e NASA / Mark Knopp (ensaio de impacto, 2025)." notes="Converta promessas em perguntas mensuráveis: quanto ruído, em qual condição, qual tolerância a falha e como validar a proteção ao ocupante.">
        <div className="evidence-grid mt-5">
          <div><MediaFigure assetId="nasa-moog-surefly-noise-test" frameClassName="media-evidence" /><p><strong>Acústica</strong><span>nível, frequência, repetição e percepção</span></p></div>
          <div><MediaFigure assetId="nasa-air-taxi-drop-test" frameClassName="media-evidence" /><p><strong>Segurança</strong><span>falhas, impacto, contenção e proteção</span></p></div>
        </div>
        <p className="slide-transition">É essa passagem de promessa a evidência que deve orientar as perguntas de pesquisa da disciplina.</p>
      </Slide>

      <Slide kicker="Discussão e entregável E02" title="Fechamos a aula construindo relações entre os termos" notes="Reserve dez minutos. Primeiro discuta qual interface é mais crítica para iniciar UAM no Brasil. Depois transforme as respostas em definições operacionais e relações no glossário.">
        <p className="slide-question mt-6">Qual interface é mais crítica para iniciar UAM no Brasil — e por quê?</p>
        <div className="discussion-options mt-5">{['aeronave ↔ certificação', 'vertiporto ↔ cidade', 'UTM ↔ ATM', 'energia ↔ operação', 'usuário ↔ preço'].map((term) => <span key={term}>{term}</span>)}</div>
        <div className="glossary-table mt-7">
          <div className="glossary-head"><span>Termo</span><span>Definição operacional</span><span>Relações</span></div>
          {[['UAM', 'recorte urbano de um sistema de mobilidade aérea', 'AAM, cidade'], ['eVTOL', 'aeronave elétrica com capacidade VTOL', 'energia, vertiporto'], ['UTM', 'serviços digitais para organizar operações', 'ATM, autorização']].map((row) => <div className="glossary-row" key={row[0]}>{row.map((cell, index) => <span className={index === 0 ? 'font-black text-ink' : ''} key={cell}>{cell}</span>)}</div>)}
        </div>
      </Slide>

      <Slide kicker="Para consulta" title="Referências utilizadas nesta aula" notes="Indique que os três artigos e os quatro documentos técnicos estão disponíveis na Biblioteca. Encerre retomando a sequência: problema de mobilidade, missão, aeronave, ecossistema e evidência.">
        <div className="reference-list mt-6">
          {presentation.references.map((reference) => <div key={reference.url}><strong>{reference.shortTitle}</strong><p>{reference.citation}</p></div>)}
        </div>
        <p className="slide-closing mt-5">Na próxima aula: regulamentação, ConOps e papéis institucionais.</p>
      </Slide>
    </PresentationDeck>
  );
}
