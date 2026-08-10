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

function RouteLine() {
  return (
    <svg viewBox="0 0 760 250" className="mt-8 w-full" role="img" aria-label="Rota conectando cidade, vertiporto, aeronave e espaço aéreo">
      <defs><linearGradient id="route" x1="0" x2="1"><stop stopColor="#0891b2" /><stop offset="1" stopColor="#2dd4bf" /></linearGradient></defs>
      <path d="M55 182 C180 25 315 235 430 90 S650 35 710 135" fill="none" stroke="url(#route)" strokeWidth="8" strokeDasharray="16 15" />
      {[[55,182],[235,125],[430,90],[590,78],[710,135]].map(([x,y], index) => <g key={x}><circle cx={x} cy={y} r="20" fill="#071426" /><circle cx={x} cy={y} r="7" fill="#67e8f9" /><text x={x} y={y + 48} textAnchor="middle" fontSize="17" fontWeight="800" fill="#334155">{['cidade','acesso','vertiporto','voo','destino'][index]}</text></g>)}
    </svg>
  );
}

function SystemOrbit() {
  const nodes = [
    ['Aeronave', 380, 62], ['Energia', 590, 142], ['Cidade', 620, 345], ['Usuário', 380, 430],
    ['Operação', 140, 345], ['Espaço aéreo', 170, 142],
  ];
  return (
    <svg viewBox="0 0 760 500" className="w-full" role="img" aria-label="UAM como sistema de sistemas">
      <circle cx="380" cy="250" r="175" fill="none" stroke="#bae6fd" strokeWidth="3" strokeDasharray="9 10" />
      <circle cx="380" cy="250" r="92" fill="#071426" />
      <text x="380" y="240" textAnchor="middle" fill="#67e8f9" fontSize="30" fontWeight="900">UAM</text>
      <text x="380" y="275" textAnchor="middle" fill="#cbd5e1" fontSize="18">sistema de sistemas</text>
      {nodes.map(([label,x,y]) => <g key={label}><line x1="380" y1="250" x2={x} y2={y} stroke="#94a3b8" strokeWidth="2" /><circle cx={x} cy={y} r="50" fill="#ecfeff" stroke="#0891b2" strokeWidth="3" /><text x={x} y={y + 6} textAnchor="middle" fill="#164e63" fontSize="17" fontWeight="800">{label}</text></g>)}
    </svg>
  );
}

function LayerDiagram() {
  return (
    <svg viewBox="0 0 780 420" className="w-full" role="img" aria-label="Camadas conceituais de operações aéreas urbanas">
      <defs><linearGradient id="sky" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#e0f2fe" /><stop offset="1" stopColor="#f8fafc" /></linearGradient></defs>
      <rect width="780" height="420" rx="24" fill="url(#sky)" />
      <path d="M0 350 100 310 170 340 260 270 350 330 470 250 570 315 680 260 780 300V420H0Z" fill="#0f2948" />
      {[90,180,270].map((y, index) => <g key={y}><line x1="45" x2="735" y1={y} y2={y} stroke={index === 0 ? '#0369a1' : '#0891b2'} strokeWidth="2" strokeDasharray="12 10" /><text x="55" y={y - 12} fill="#0e7490" fontSize="18" fontWeight="800">{['ATM integrado','transição e coordenação','UTM / U-space'][index]}</text></g>)}
      <path d="M160 280 C300 180 440 250 620 115" fill="none" stroke="#2dd4bf" strokeWidth="7" strokeDasharray="14 10" />
      <circle cx="160" cy="280" r="11" fill="#071426" /><circle cx="620" cy="115" r="11" fill="#071426" />
    </svg>
  );
}

const cards = (items) => (
  <div className="slide-grid">
    {items.map(([title, body]) => <div className="slide-card" key={title}><strong>{title}</strong><p>{body}</p></div>)}
  </div>
);

export default function E02PresentationPage() {
  return (
    <PresentationDeck title={presentation.title}>
      <Slide className="slide-cover !text-white" notes="Abra apresentando a aula como construção de uma linguagem comum. Evite começar pela aeronave: a unidade de análise será o sistema completo.">
        <div className="slide-kicker !text-cyan-300">IT-214 · 11 de agosto de 2026</div>
        <h1 className="mt-8 max-w-5xl !font-black !text-white">Nivelamento <span className="text-cyan-300">UAM, AAM, eVTOL, UTM e ATM</span></h1>
        <p className="mt-8 max-w-3xl !text-xl !leading-8 !text-slate-300">Vocabulário, ecossistema e desafios para analisar a mobilidade aérea urbana como sistema.</p>
        <RouteLine />
      </Slide>

      <Slide kicker="Abertura · 01" title="Onde chegaremos em 90 minutos" notes="Apresente os quatro resultados de aprendizagem e avise que o glossário será o entregável da semana.">
        <div className="mt-8 grid grid-cols-2 gap-4">
          {presentation.objectives.map((objective, index) => <div className="slide-card" key={objective}><span className="slide-pill">0{index + 1}</span><p className="!mt-3 !text-[.92rem] !font-bold !text-slate-700">{objective}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Pergunta de abertura" title="O que precisa funcionar para um voo urbano acontecer todos os dias?" notes="Peça respostas rápidas. Organize no quadro em seis grupos: veículo, energia, infraestrutura, espaço aéreo, usuário/cidade e regulação. Retome a lista no slide 14.">
        <p className="slide-quote mt-12 max-w-5xl">Se a aeronave estiver certificada amanhã, existe um serviço de mobilidade pronto?</p>
        <div className="mt-12 flex flex-wrap gap-3">{['veículo', 'energia', 'vertiporto', 'operação', 'espaço aéreo', 'cidade', 'usuário', 'regulação'].map((item) => <span className="slide-pill" key={item}>{item}</span>)}</div>
      </Slide>

      <Slide kicker="História · 02" title="UAM é uma ambição antiga com habilitadores novos" source="Base: Cohen, Shaheen & Farrar (2021), DOI 10.1109/TITS.2021.3082767." notes="Destaque que helicópteros já ofereceram conexões urbanas. O desafio histórico não foi apenas voar, mas sustentar custo, escala e aceitação.">
        <div className="slide-grid">
          <div><span className="slide-big-number">1910s</span><p className="mt-5 !text-xl !font-bold !text-slate-700">Conceitos de “carro voador” aparecem muito antes da eletrificação distribuída.</p></div>
          <div className="slide-card"><strong>O padrão que se repete</strong><p>Tecnologia gera possibilidade; operação, infraestrutura, economia e legitimidade social determinam permanência.</p></div>
        </div>
      </Slide>

      <Slide kicker="História · 03" title="Seis fases: do imaginário ao ponto a ponto" source="Síntese vetorial original a partir de Cohen, Shaheen & Farrar (2021)." notes="As fases 4 a 6 são cenários de evolução, não uma previsão garantida. Questione a turma sobre quais dependências aumentam em cada fase.">
        <div className="mt-10 grid grid-cols-6 gap-3">
          {[
            ['1','Conceitos','1910–1950'],['2','Helicópteros','1950–1980'],['3','Sob demanda','2010s'],['4','Corredores','entrada'],['5','Hub & spoke','escala'],['6','Ponto a ponto','maturidade'],
          ].map(([n,label,time]) => <div className="slide-card !p-4 text-center" key={n}><span className="slide-big-number !text-4xl">{n}</span><strong className="mt-3">{label}</strong><p>{time}</p></div>)}
        </div>
        <div className="mt-8 h-2 rounded-full bg-gradient-to-r from-slate-300 via-cyan-400 to-emerald-400" />
      </Slide>

      <Slide kicker="História · 04" title="Por que a agenda retorna agora?" source="Cohen et al. (2021); Pak et al. (2024)." notes="Não apresente um único fator causal. A retomada resulta da convergência entre tecnologias, capital, políticas e problemas urbanos.">
        {cards([
          ['Eletrificação', 'Motores distribuídos, eletrônica de potência e baterias ampliam configurações possíveis.'],
          ['Automação', 'Controle de voo, navegação e conectividade reduzem carga e habilitam novas operações.'],
          ['Urbanização', 'Congestionamento, acessibilidade e valor do tempo mantêm a pressão sobre redes urbanas.'],
          ['Ecossistema', 'Fabricantes, operadores, cidades, reguladores e investidores passam a agir simultaneamente.'],
        ])}
      </Slide>

      <Slide kicker="Vocabulário · 05" title="As siglas descrevem recortes diferentes" notes="Avise que não existe uniformidade absoluta entre instituições. O contexto e a definição usada em cada documento precisam ser declarados.">
        <div className="relative mx-auto mt-8 h-[470px] max-w-4xl">
          <div className="absolute inset-x-0 top-0 mx-auto grid h-[450px] w-[820px] place-items-start rounded-[50%] border-4 border-sky-300 bg-sky-50 p-8"><strong className="text-2xl text-sky-900">AAM</strong></div>
          <div className="absolute inset-x-0 top-24 mx-auto grid h-[330px] w-[610px] place-items-start rounded-[50%] border-4 border-cyan-400 bg-cyan-50 p-8"><strong className="text-2xl text-cyan-900">UAM</strong></div>
          <div className="absolute inset-x-0 top-48 mx-auto grid h-[190px] w-[370px] place-items-center rounded-[50%] border-4 border-emerald-400 bg-emerald-50"><strong className="text-2xl text-emerald-900">casos urbanos</strong></div>
        </div>
      </Slide>

      <Slide kicker="Vocabulário · 06" title="UAM, AAM e IAM: defina antes de comparar" source="Pak et al. (2024), DOI 10.1007/s13272-024-00733-x." notes="AAM costuma ser mais amplo que UAM. IAM aparece no vocabulário europeu. Em trabalhos acadêmicos, uma definição operacional evita ambiguidade.">
        {cards([
          ['UAM', 'Mobilidade de passageiros e cargas em ambientes urbanos e suburbanos, integrada ao sistema multimodal.'],
          ['AAM', 'Guarda-chuva mais amplo: inclui conexões regionais, rurais, carga, emergência e outros mercados avançados.'],
          ['IAM', 'Innovative Air Mobility: termo usado especialmente no contexto europeu para novos serviços e tecnologias.'],
          ['Regra acadêmica', 'Declare a definição, a fonte e o recorte territorial/operacional adotado no estudo.'],
        ])}
      </Slide>

      <Slide kicker="Vocabulário · 07" title="UAM não é sinônimo de táxi aéreo" notes="Mostre diversidade de missões. Cada caso altera requisitos de cabine, prioridade, tempo, infraestrutura, certificação e modelo de receita.">
        <div className="mt-9 grid grid-cols-3 gap-4">
          {[
            ['Passageiros','aeroporto, urbano, suburbano'],['Carga','última milha e logística crítica'],['Emergência','saúde, resgate e resposta'],['Serviço público','inspeção e segurança'],['Regional','cidades e áreas pouco conectadas'],['Multimodal','uma etapa dentro da jornada'],
          ].map(([title,body]) => <div className="slide-card" key={title}><strong>{title}</strong><p>{body}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Aeronaves · 08" title="eVTOL descreve propulsão e operação — não o serviço" notes="Diferencie veículo e sistema. Um eVTOL pode servir a missões distintas; UAM também pode incluir outras aeronaves elétricas ou híbridas.">
        <div className="slide-grid">
          <div><span className="slide-big-number">e</span><p className="!font-bold">electric</p><span className="slide-big-number mt-5 block">VTOL</span><p className="!font-bold">vertical take-off and landing</p></div>
          <div className="slide-card"><strong>Evite a equivalência</strong><p className="!text-base">eVTOL = tecnologia de aeronave<br />UAM = arranjo de mobilidade<br />AAM = conjunto ampliado de mercados e operações</p></div>
        </div>
      </Slide>

      <Slide kicker="Aeronaves · 09" title="Arquiteturas trocam eficiência por complexidade" source="Síntese conceitual original a partir de Garrow et al. (2021) e Pak et al. (2024)." notes="Não classifique uma arquitetura como vencedora. Relacione alcance, ruído, transição, redundância, manutenção e certificação.">
        <div className="mt-9 grid grid-cols-3 gap-5">
          {[
            ['Multirrotor','simplicidade relativa','menor eficiência em cruzeiro'],
            ['Lift + cruise','sistemas separados','mais componentes e arrasto'],
            ['Vetorado','boa eficiência potencial','transição e controle complexos'],
          ].map(([title,benefit,cost]) => <div className="slide-card" key={title}><div className="mb-5 flex h-24 items-center justify-center rounded-2xl bg-ink"><span className="text-4xl text-cyan-300">✦</span></div><strong>{title}</strong><p className="!text-emerald-700">+ {benefit}</p><p className="!text-rose-700">– {cost}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Aeronaves · 10" title="Energia conecta o projeto ao território" source="Garrow et al. (2021); Pak et al. (2024)." notes="A bateria não é só um parâmetro da aeronave. Ela afeta tempo de solo, simultaneidade, rede elétrica, custo, degradação e capacidade do vertiporto.">
        <div className="slide-grid">
          <div className="slide-card"><span className="slide-big-number">kWh</span><strong className="mt-4">energia por missão</strong><p>alcance, reserva, temperatura e perfil de voo</p></div>
          <div className="grid gap-4">{[['kW','potência de recarga'],['min','turnaround'],['ciclos','degradação'],['gates','simultaneidade']].map(([n,t]) => <div className="slide-card flex items-center gap-5 !p-4" key={n}><strong className="!text-2xl !text-cyan-700">{n}</strong><p className="!mt-0">{t}</p></div>)}</div>
        </div>
      </Slide>

      <Slide kicker="Ecossistema · 11" title="A unidade de análise é o sistema de sistemas" source="Pak et al. (2024)." notes="Retome as respostas da abertura. A falha de uma interface pode inviabilizar o serviço mesmo que cada subsistema funcione isoladamente.">
        <div className="mt-3 grid grid-cols-[1.15fr_.85fr] items-center gap-6"><SystemOrbit /><p className="slide-quote">Desempenho emerge das interfaces — não apenas dos componentes.</p></div>
      </Slide>

      <Slide kicker="Ecossistema · 12" title="Quem decide o quê?" source="Cohen et al. (2021)." notes="Destaque dependências de governança. Cidade e aviação civil têm competências diferentes e precisam coordenar uso do solo, segurança e operação.">
        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            ['Reguladores','certificação, operação, espaço aéreo'],['Cidades','uso do solo, acesso, impacto local'],['Indústria','veículo, energia, infraestrutura'],['Operadores','rede, frota, preço, experiência'],['Provedores ATM/UTM','capacidade e separação'],['Comunidades','legitimidade e aceitação'],['Energia e telecom','resiliência e conectividade'],['Pesquisa','evidência, métodos e cenários'],
          ].map(([t,b]) => <div className="slide-card !p-4" key={t}><strong>{t}</strong><p>{b}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Operação · 13" title="O passageiro atravessa uma cadeia de decisões" notes="Peça à turma para identificar onde surgem filas, incerteza e risco de perder conexão. O voo é apenas um elo.">
        <div className="mt-10 flex items-center gap-2">
          {['Reserva','Acesso','Check-in','Embarque','Voo','Desembarque','Conexão'].map((item,index) => <div className="contents" key={item}><div className="slide-card flex-1 !p-4 text-center"><strong>{item}</strong></div>{index < 6 && <span className="text-2xl font-black text-cyan-600">→</span>}</div>)}
        </div>
        <p className="slide-quote mt-12">Confiabilidade porta a porta pode valer mais que velocidade máxima.</p>
      </Slide>

      <Slide kicker="Infraestrutura · 14" title="Vertiporto é infraestrutura aeronáutica e nó urbano" source="Pak et al. (2024)." notes="Introduza os termos sem aprofundar norma: TLOF, FATO, área de segurança, pátio, gates, terminal e acesso terrestre.">
        <div className="slide-grid">
          <svg viewBox="0 0 600 420" className="w-full" role="img" aria-label="Diagrama conceitual de um vertiporto">
            <rect x="25" y="25" width="550" height="370" rx="30" fill="#fff" stroke="#cbd5e1" strokeWidth="4" />
            <circle cx="190" cy="205" r="115" fill="#ecfeff" stroke="#0891b2" strokeWidth="5" /><circle cx="190" cy="205" r="65" fill="#cffafe" stroke="#0e7490" strokeWidth="4" /><text x="190" y="215" textAnchor="middle" fontSize="35" fontWeight="900" fill="#164e63">H</text>
            <rect x="355" y="78" width="150" height="80" rx="18" fill="#071426" /><text x="430" y="125" textAnchor="middle" fill="#67e8f9" fontSize="20" fontWeight="800">terminal</text>
            <rect x="355" y="185" width="150" height="55" rx="14" fill="#bae6fd" /><text x="430" y="220" textAnchor="middle" fill="#164e63" fontSize="17" fontWeight="800">gates / pátio</text>
            <path d="M355 300H520" stroke="#2dd4bf" strokeWidth="22" /><text x="435" y="340" textAnchor="middle" fill="#334155" fontSize="17" fontWeight="800">acesso multimodal</text>
          </svg>
          <div className="grid gap-3">{[['Lado ar','proteção, pouso, decolagem e circulação'],['Lado terra','terminal, segurança e acessibilidade'],['Energia','recarga, armazenamento e redundância'],['Cidade','conectividade, ruído e uso do solo']].map(([t,b]) => <div className="slide-card !p-4" key={t}><strong>{t}</strong><p>{b}</p></div>)}</div>
        </div>
      </Slide>

      <Slide kicker="Espaço aéreo · 15" title="ATM administra um sistema tripulado consolidado" notes="ATM inclui mais que controle tático: gestão de fluxo, informação, procedimentos e coordenação. Evite reduzir ATM à torre.">
        {cards([
          ['Objetivo', 'Movimento seguro, ordenado e eficiente no espaço aéreo controlado.'],
          ['Elementos', 'ATS, gestão de fluxo, informação aeronáutica, procedimentos e vigilância.'],
          ['Características', 'Alta criticidade, separação, comunicação e responsabilidades institucionais estabelecidas.'],
          ['Desafio UAM', 'Adicionar densidade e novos perfis sem degradar segurança e capacidade existentes.'],
        ])}
      </Slide>

      <Slide kicker="Espaço aéreo · 16" title="UTM e U-space apoiam operações digitais em escala" source="Pak et al. (2024)." notes="UTM é conceito amplo; U-space é a implementação regulatória europeia de serviços. Ressalte identificação, autorização, informação e gestão estratégica.">
        {cards([
          ['Identificação', 'Quem opera, qual veículo e sob qual autorização.'],
          ['Planejamento', 'Intenção de voo, restrições, capacidade e conflitos estratégicos.'],
          ['Informação', 'Geozonas, tráfego, meteorologia e estado da infraestrutura.'],
          ['Contingência', 'Regras para degradação, perda de enlace e resposta coordenada.'],
        ])}
      </Slide>

      <Slide kicker="Espaço aéreo · 17" title="UTM não substitui ATM: as interfaces precisam ser desenhadas" notes="Mostre as camadas como representação conceitual, não altitude normativa. A mensagem é coordenação entre ambientes, serviços e responsabilidades.">
        <div className="mt-5 grid grid-cols-[1.2fr_.8fr] items-center gap-6"><LayerDiagram /><div><p className="slide-quote">Integração exige regras para transição, prioridade, informação e contingência.</p><div className="mt-6 flex flex-wrap gap-2">{['dados comuns','coordenação','capacidade','responsabilidade'].map((t) => <span className="slide-pill" key={t}>{t}</span>)}</div></div></div>
      </Slide>

      <Slide kicker="Operação · 18" title="Uma missão é uma sequência verificável" notes="Percorra da demanda ao pós-voo. Pergunte em quais etapas dados precisam circular entre organizações.">
        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            ['01','demanda e reserva'],['02','designação de aeronave'],['03','plano e autorização'],['04','solo e embarque'],['05','decolagem e rota'],['06','monitoramento'],['07','pouso e conexão'],['08','recarga e manutenção'],
          ].map(([n,t]) => <div className="slide-card !p-4" key={n}><span className="slide-pill">{n}</span><strong className="mt-4">{t}</strong></div>)}
        </div>
      </Slide>

      <Slide kicker="Desafios · 19" title="A promessa é condicional" source="Cohen et al. (2021); Pak et al. (2024)." notes="Evite marketing ou rejeição automática. Cada benefício depende de hipótese operacional, matriz elétrica, ocupação, localização e comportamento.">
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="slide-card !border-emerald-200 !bg-emerald-50"><span className="slide-pill !bg-emerald-200 !text-emerald-900">Potencial</span><ul><li>economia de tempo em certos pares OD</li><li>novas conexões e serviços críticos</li><li>emissão local reduzida</li><li>inovação e atividade econômica</li></ul></div>
          <div className="slide-card !border-amber-200 !bg-amber-50"><span className="slide-pill !bg-amber-200 !text-amber-900">Condições</span><ul><li>alta confiabilidade e segurança</li><li>energia e infraestrutura disponíveis</li><li>preço e ocupação compatíveis</li><li>aceitação e integração urbana</li></ul></div>
        </div>
      </Slide>

      <Slide kicker="Desafios · 20" title="Barreiras se acoplam e amplificam" source="Cohen et al. (2021); Garrow et al. (2021); Pak et al. (2024)." notes="Use a matriz para mostrar acoplamentos: ruído afeta rotas, localização, aceitação e capacidade; energia afeta frota, solo e custo.">
        <div className="mt-7 grid grid-cols-4 gap-3">
          {['segurança','certificação','ruído','aceitação','equidade','energia','meteorologia','infraestrutura','espaço aéreo','cibersegurança','modelo de negócio','impacto ambiental'].map((item,index) => <div className={`slide-card !p-4 text-center ${index % 3 === 0 ? '!border-cyan-300' : ''}`} key={item}><strong>{item}</strong></div>)}
        </div>
      </Slide>

      <Slide kicker="Pesquisa · 21" title="800 estudos revelam avanço — e lacunas de integração" source="Garrow, German & Leonard (2021), DOI 10.1016/j.trc.2021.103377." notes="Explique que a revisão comparou UAM com veículos elétricos e autônomos. A maturidade não é uniforme entre temas.">
        <div className="slide-grid">
          <div><span className="slide-big-number">≈800</span><p className="mt-4 !text-xl !font-bold !text-slate-700">artigos analisados entre UAM, veículos elétricos e autônomos</p></div>
          <div className="slide-card"><strong>Lacuna central</strong><p className="!text-base">Modelos ainda precisam acoplar adoção, preço, demanda, vertiportos, despacho, espaço aéreo, frota e energia com maior fidelidade.</p></div>
        </div>
      </Slide>

      <Slide kicker="Pesquisa · 22" title="Boas perguntas atravessam interfaces" notes="Conecte com o artigo final da disciplina. Uma pergunta forte explicita sistema, decisão, métrica, cenário e restrições.">
        <div className="mt-9 grid grid-cols-5 gap-3">
          {[
            ['Sistema','qual recorte?'],['Decisão','o que escolher?'],['Métrica','como avaliar?'],['Cenário','onde e quando?'],['Restrição','sob quais limites?'],
          ].map(([t,b],index) => <div className="slide-card text-center" key={t}><span className="slide-big-number !text-3xl">0{index + 1}</span><strong className="mt-4">{t}</strong><p>{b}</p></div>)}
        </div>
        <p className="slide-quote mt-10">Como [decisão] altera [métrica] em [cenário], considerando [restrições]?</p>
      </Slide>

      <Slide kicker="Discussão rápida · 23" title="Qual interface é mais crítica para iniciar UAM no Brasil?" notes="Reserve 7 minutos: dois para escolha individual, três para discussão em pares e dois para coleta de argumentos. Não procure consenso; procure dependências e evidências.">
        <div className="mt-10 grid grid-cols-3 gap-4">{['aeronave ↔ certificação','vertiporto ↔ cidade','UTM ↔ ATM','energia ↔ operação','usuário ↔ preço','serviço ↔ aceitação'].map((item) => <div className="slide-card text-center" key={item}><strong className="!text-lg">{item}</strong></div>)}</div>
        <div className="mt-10 flex items-center justify-center gap-5"><span className="slide-big-number">2</span><p className="!font-bold">minutos para escolher</p><span className="slide-big-number">3</span><p className="!font-bold">minutos em pares</p></div>
      </Slide>

      <Slide kicker="Entregável E02 · 24" title="Construa um glossário que explicite relações" notes="Oriente a entrega: definição curta, fonte, exemplo e relação. Recomende ao menos 12 termos, incluindo as seis siglas centrais.">
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="grid grid-cols-[.7fr_1.4fr_1fr_1fr] bg-ink px-6 py-4 text-sm font-black text-white"><span>Termo</span><span>Definição operacional</span><span>Fonte</span><span>Relaciona-se com</span></div>
          {[
            ['UAM','recorte urbano do sistema de mobilidade aérea','artigo / instituição','AAM, cidade'],['eVTOL','aeronave elétrica com pouso/decolagem vertical','fabricante / literatura','energia, vertiporto'],['UTM','serviços digitais para organizar operações não tripuladas','regulador','ATM, autorização'],
          ].map((row) => <div className="grid grid-cols-[.7fr_1.4fr_1fr_1fr] border-t border-slate-100 px-6 py-4 text-sm text-slate-600" key={row[0]}>{row.map((cell,index) => <span className={index === 0 ? 'font-black text-ink' : ''} key={cell}>{cell}</span>)}</div>)}
        </div>
      </Slide>

      <Slide kicker="Síntese · 25" title="Cinco ideias para levar da aula" notes="Faça a síntese sem introduzir conceitos novos. Convide estudantes a completar cada frase em voz alta.">
        <div className="mt-8 grid grid-cols-5 gap-4">
          {[
            ['01','UAM é mobilidade, não apenas aeronave.'],['02','eVTOL é tecnologia, não modelo de serviço.'],['03','UTM e ATM precisam de interfaces.'],['04','Benefícios dependem da jornada completa.'],['05','Pesquisa forte integra subsistemas e evidências.'],
          ].map(([n,t]) => <div className="slide-card" key={n}><span className="slide-big-number !text-4xl">{n}</span><p className="!mt-5 !font-bold !text-slate-700">{t}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Referências · 26" title="Leituras-base" notes="Encerre mostrando que os PDFs e links DOI estão na Biblioteca do portal. Abra para perguntas e para a construção do glossário.">
        <div className="mt-8 space-y-5">
          <div className="slide-card"><strong>Cohen, A. P.; Shaheen, S. A.; Farrar, E. M. (2021)</strong><p>Urban Air Mobility: History, Ecosystem, Market Potential, and Challenges. IEEE T-ITS. DOI: 10.1109/TITS.2021.3082767.</p></div>
          <div className="slide-card"><strong>Garrow, L. A.; German, B. J.; Leonard, C. E. (2021)</strong><p>Urban air mobility: A comprehensive review and comparative analysis. Transportation Research Part C. DOI: 10.1016/j.trc.2021.103377.</p></div>
          <div className="slide-card"><strong>Pak, H. et al. (2024)</strong><p>Can Urban Air Mobility become reality? CEAS Aeronautical Journal. DOI: 10.1007/s13272-024-00733-x.</p></div>
        </div>
        <p className="slide-quote mt-8">Próximo passo: transformar vocabulário em relações verificáveis.</p>
      </Slide>
    </PresentationDeck>
  );
}
