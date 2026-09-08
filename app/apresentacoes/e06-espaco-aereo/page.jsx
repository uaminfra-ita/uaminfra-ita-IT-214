import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';
import resources from '@/data/resources.json';
import './e06.css';

const presentation = presentations.find((item) => item.slug === 'e06-espaco-aereo');
const allResources = Object.values(resources).flat();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const metadata = { title: presentation.title, description: presentation.subtitle };

function Media({ assetId }) {
  const asset = assets.find((item) => item.id === assetId);
  return <figure className="air-media"><a href={basePath + asset.assetPath} target="_blank" rel="noreferrer" aria-label={`Abrir figura: ${asset.title}`}><Image src={basePath + asset.assetPath} alt={asset.alt} fill sizes="65vw" style={{ objectFit: 'contain' }} /></a><figcaption className="sr-only">{asset.creditLine}</figcaption></figure>;
}
function Slide({ kicker, title, source, minutes, notes, children, className = '' }) {
  return <section className={'air-slide ' + className}><header><div className="air-kicker">{kicker}</div><h2>{title}</h2></header><div className="air-body">{children}</div><aside className="notes">{`Tempo previsto: ${minutes} minutos. ${notes} Fonte: ${source}`}</aside></section>;
}
function ReadingList({ ids }) {
  return <div className="air-downloads"><div>{ids.map((id) => { const resource = allResources.find((item) => item.id === id); return <a key={id} href={basePath + resource.assetPath} download><strong>{resource.title}</strong><span>{resource.authors[0]} • {resource.year}</span><b>Baixar PDF ↓</b></a>; })}</div><a className="air-library-link" href={basePath + '/biblioteca/espaco-aereo/'} target="_blank" rel="noreferrer">Abrir todos os materiais e créditos ↗</a></div>;
}
function AirspaceDiagram() {
  return <figure className="air-structure"><svg viewBox="0 0 760 550" role="img" aria-label="Organização conceitual do espaço aéreo, sem escala">
    <rect x="15" y="15" width="730" height="485" rx="14" fill="#e8f2f8" stroke="#71899e" strokeWidth="3" strokeDasharray="10 7"/><text x="40" y="59" fontSize="25" fontWeight="800" fill="#0b3450">FIR • Região de Informação de Voo</text>
    <rect x="60" y="95" width="640" height="120" rx="10" fill="#bce7ef" stroke="#0e7490" strokeWidth="3"/><text x="380" y="145" textAnchor="middle" fontSize="30" fontWeight="800" fill="#0b3450">CTA</text><text x="380" y="181" textAnchor="middle" fontSize="22">Área de Controle</text>
    <path d="M105 245H660V342H540V390H225V342H105Z" fill="#b4d4e8" stroke="#256287" strokeWidth="3"/><text x="380" y="292" textAnchor="middle" fontSize="30" fontWeight="800" fill="#0b3450">TMA</text><text x="380" y="325" textAnchor="middle" fontSize="22">Área de Controle Terminal</text>
    <rect x="270" y="362" width="225" height="119" fill="#67c7d4" stroke="#0e7490" strokeWidth="3"/><text x="382" y="403" textAnchor="middle" fontSize="28" fontWeight="800" fill="#0b3450">CTR</text><text x="382" y="435" textAnchor="middle" fontSize="21">Zona de Controle</text>
    <path d="M307 480V457Q382 412 458 457V480Z" fill="#fff" stroke="#385469" strokeWidth="2"/><text x="383" y="465" textAnchor="middle" fontSize="14" fontWeight="800">ATZ • Zona de Tráfego de Aeródromo</text><path d="M15 482H745" stroke="#8f7653" strokeWidth="6"/><text x="382" y="536" textAnchor="middle" fontSize="22" fill="#526579">Esquema conceitual • sem escala</text>
  </svg></figure>;
}

export default function E06PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck">
    <Slide kicker="IT-214 • Introdução" title="Espaço aéreo e Mobilidade Aérea Urbana" minutes={5} source="ICA 100-37; FAA 2023." notes="Pergunte se um eVTOL pode simplesmente seguir a reta entre dois pontos. Explique que o céu já possui organização, regras, serviços e usuários." className="air-title-slide">
      <div className="air-cover"><div><p className="air-lead">Como inserir novos voos urbanos no espaço aéreo que já existe?</p><p>Conceitos básicos • integração • corredores dedicados</p><div className="air-cover-meta">IT-214 • 08/09/2026<br/>Aula introdutória</div></div><Media assetId="faa-2023-uam-corridor-concept" /></div>
    </Slide>
    <Slide kicker="Roteiro" title="Três ideias para orientar a aula" minutes={5} source="Síntese didática." notes="Apresente o percurso e avise que o entregável será uma tabela comparativa simples.">
      <div className="air-comparison"><article><h3>O espaço já é organizado</h3><p>Existem volumes, regras, rotas, aeroportos e serviços.</p></article><article><h3>A UAM é um novo usuário</h3><p>Ela precisa conviver com operações que já acontecem.</p></article><article><h3>Há escolhas de integração</h3><p>Um corredor dedicado é uma alternativa, não uma resposta universal.</p></article></div>
    </Slide>
    <Slide kicker="01 • Conceito básico" title="Espaço aéreo é mais do que uma área no mapa" minutes={6} source="ICA 100-37; ICA 100-12." notes="Construa a definição com a turma. Não aprofunde a classificação neste momento.">
      <div className="air-bands"><article><h3>Volume</h3><p>Tem limites horizontais e verticais.</p></article><article><h3>Regras</h3><p>Orientam como o voo pode ser conduzido.</p></article><article><h3>Serviços</h3><p>Apoiam controle, informação e segurança.</p></article><article><h3>Usuários</h3><p>Aviões, helicópteros, drones e futuros eVTOL.</p></article></div>
    </Slide>
    <Slide kicker="01 • Organização" title="Alguns volumes que aparecem perto das cidades" minutes={8} source="ICA 100-37, arts. 18–20." notes="Defina as siglas conforme aparecem. O desenho é conceitual e não representa dimensões reais.">
      <div className="air-evidence"><AirspaceDiagram/><div className="air-reading"><article><h3>Região maior</h3><p>A Região de Informação de Voo (FIR) pode conter espaços controlados e não controlados.</p></article><article><h3>Perto dos aeroportos</h3><p>A Área de Controle Terminal (TMA) e a Zona de Controle (CTR) organizam chegadas e saídas.</p></article><article><h3>Limites reais</h3><p>Forma, altura e procedimentos são publicados em documentos aeronáuticos.</p></article></div></div>
    </Slide>
    <Slide kicker="01 • Serviços" title="Controlado não significa céu vazio" minutes={8} source="ICA 100-37, art. 21." notes="Diferencie controle de exclusividade. Mesmo fora do espaço controlado continuam existindo regras e responsabilidades.">
      <div className="air-comparison"><article><h3>Espaço controlado</h3><p>O Serviço de Controle de Tráfego Aéreo (ATC) atende os voos previstos para cada classe.</p></article><article><h3>Espaço não controlado</h3><p>Não há separação ATC, mas há regras, responsabilidades e possíveis restrições.</p></article><article><h3>Para a UAM</h3><p>É preciso entender onde o voo entra, sai e encontra outros usuários.</p></article></div>
    </Slide>
    <Slide kicker="01 • Regras de voo" title="VFR e IFR dizem como o voo é conduzido" minutes={8} source="ICA 100-12; ICA 100-37." notes="VFR não significa ausência de controle; IFR não significa apenas mau tempo.">
      <div className="air-comparison"><article><h3>VFR</h3><p><b>Regras de Voo Visual:</b> condução baseada em referências visuais e condições previstas.</p></article><article><h3>IFR</h3><p><b>Regras de Voo por Instrumentos:</b> condução baseada em instrumentos e procedimentos.</p></article><article><h3>Ponto central</h3><p>Ser elétrico ou de decolagem vertical não cria, por si só, uma regra de voo.</p></article></div>
    </Slide>
    <Slide kicker="01 • Exemplo local" title="São Paulo já tem operações e estruturas em uso" minutes={8} source="SIGMA-Sky Produto 2, figura 2.3." notes="Use o estudo apenas como exemplo local. Mostre que a UAM não entra num espaço vazio.">
      <div className="air-evidence"><Media assetId="sigma-ctr"/><div className="air-reading"><article><h3>Aeroportos</h3><p>Chegadas e saídas ocupam volumes e seguem procedimentos.</p></article><article><h3>Helicópteros</h3><p>Já existem operações urbanas que precisam ser consideradas.</p></article><article><h3>Novo fluxo</h3><p>A UAM deve se integrar sem tratar a cidade como espaço livre.</p></article></div></div>
    </Slide>
    <Slide kicker="01 • Rotas existentes" title="REH e REA ajudam a organizar voos visuais" minutes={8} source="SIGMA-Sky Produto 2, figura 4.3." notes="Defina as duas siglas. Uma rota melhora a previsibilidade, mas não remove todas as interações.">
      <div className="air-evidence"><Media assetId="sigma-rede6"/><div className="air-reading"><article><h3>REH</h3><p><b>Rota Especial de Helicópteros:</b> organiza a circulação visual de helicópteros.</p></article><article><h3>REA</h3><p><b>Rota Especial de Aeronaves:</b> orienta outros voos visuais.</p></article><article><h3>Lição</h3><p>Rotas precisam considerar acessos, cruzamentos e capacidade.</p></article></div></div>
    </Slide>
    <Slide kicker="02 • Novo usuário" title="O que a UAM acrescenta ao sistema?" minutes={8} source="FAA 2023; DECEA 2024." notes="Defina UAM e eVTOL. A novidade inclui aeronave, frequência de voo e novos pontos de pouso.">
      <div className="air-bands"><article><h3>UAM</h3><p><b>Mobilidade Aérea Urbana:</b> transporte aéreo de pessoas ou cargas em áreas urbanas.</p></article><article><h3>eVTOL</h3><p><b>Aeronave elétrica de decolagem e pouso vertical:</b> um veículo associado à UAM.</p></article><article><h3>Mais movimentos locais</h3><p>Voos curtos podem concentrar chegadas, saídas e cruzamentos.</p></article><article><h3>Vertiportos</h3><p>Conectam voo e solo e podem limitar a capacidade da rede.</p></article></div>
    </Slide>
    <Slide kicker="02 • Integração" title="Quatro perguntas bastam para começar" minutes={8} source="Síntese dos CONOPS." notes="Aplique as perguntas a um voo simples entre dois bairros.">
      <div className="air-bands"><article><h3>Espaço</h3><p>Por onde a aeronave pode passar?</p></article><article><h3>Acesso</h3><p>Quais aeronaves e condições são aceitas?</p></article><article><h3>Coordenação</h3><p>Quem conhece e ajusta a intenção de voo?</p></article><article><h3>Contingência</h3><p>O que ocorre se a rota ou o destino fechar?</p></article></div>
    </Slide>
    <Slide kicker="02 • Conceito" title="O que é um corredor dedicado à UAM?" minutes={8} source="FAA UAM ConOps 2.0, seção 4.4." notes="Dedicado não significa isolado de toda a aviação. Mostre direção, entradas e saídas.">
      <div className="air-evidence"><Media assetId="faa-2023-uam-corridor-concept"/><div className="air-reading"><article><h3>Volume definido</h3><p>Organiza um fluxo entre acessos e vertiportos.</p></article><article><h3>Acesso condicionado</h3><p>Pode exigir desempenho, equipamentos e procedimentos comuns.</p></article><article><h3>Interfaces permanecem</h3><p>Entradas, saídas e cruzamentos ainda exigem coordenação.</p></article></div></div>
    </Slide>
    <Slide kicker="02 • Alternativas" title="Usar corredor dedicado ou compartilhar o espaço?" minutes={8} source="SIGMA-Sky Produto 2, figuras 5.5(a) e 5.7(a)." notes="Apresente as opções sem escolher uma vencedora. A decisão depende do contexto.">
      <div className="air-research"><div className="air-pair"><div><h3>Sem corredor dedicado</h3><Media assetId="sigma-compartilhada"/></div><div><h3>Com corredor dedicado</h3><Media assetId="sigma-dedicada2d"/></div></div><div className="air-three"><article><h3>Compartilhar</h3><p>Aproveita o espaço existente, mas mistura diferentes fluxos.</p></article><article><h3>Dedicar</h3><p>Aumenta a previsibilidade, mas reserva espaço e cria acessos.</p></article><article><h3>Escolher</h3><p>Depende do local, da demanda e dos critérios usados.</p></article></div></div>
    </Slide>
    <Slide kicker="Intervalo" title="Pausa de 10 minutos" minutes={10} source="Planejamento didático." notes="Na volta, peça uma definição simples de corredor dedicado.">
      <div className="air-comparison"><article><h3>Já vimos</h3><p>O espaço atual e a entrada da UAM.</p></article><article><h3>Questão</h3><p>Um corredor simplifica a operação ou muda o local dos problemas?</p></article><article><h3>Na volta</h3><p>Compararemos as alternativas e construiremos a tabela.</p></article></div>
    </Slide>
    <Slide kicker="03 • Concepções operacionais" title="Uma Concepção Operacional (CONOPS) descreve como uma operação pode funcionar" minutes={8} source="FAA 2023; DECEA 2024; CORUS-XUAM 2023." notes="CONOPS não é norma pronta nem prova de implantação.">
      <div className="air-bands"><article><h3>CONOPS</h3><p><b>Concepção Operacional:</b> explica como pessoas, sistemas e procedimentos atuariam juntos.</p></article><article><h3>O que responde?</h3><p>Quem faz o quê, com qual informação e em qual ambiente.</p></article><article><h3>O que não é?</h3><p>Não substitui regulamento, certificação ou avaliação de segurança.</p></article><article><h3>Por que comparar?</h3><p>Revela escolhas diferentes e questões ainda abertas.</p></article></div>
    </Slide>
    <Slide kicker="03 • Brasil" title="A proposta brasileira integra a UAM ao sistema existente" minutes={8} source="DECEA, PCA 351-7, figura 1." notes="Defina DECEA, SISCEAB e UTM sem aprofundar os modelos de provedores.">
      <div className="air-evidence"><Media assetId="decea-ambientes"/><div className="air-reading"><article><h3>DECEA</h3><p><b>Departamento de Controle do Espaço Aéreo:</b> órgão central brasileiro.</p></article><article><h3>SISCEAB</h3><p><b>Sistema de Controle do Espaço Aéreo Brasileiro:</b> integra controle e defesa aérea.</p></article><article><h3>UTM</h3><p><b>Gerenciamento de Tráfego de Aeronaves Não Tripuladas:</b> possui interfaces com a UAM.</p></article></div></div>
    </Slide>
    <Slide kicker="03 • Visões internacionais" title="Estados Unidos e Europa estudam integração gradual" minutes={7} source="FAA 2023; CORUS-XUAM 2023." notes="Mantenha duas mensagens simples: corredores cooperativos e serviços digitais integrados.">
      <div className="air-comparison"><article><h3>Estados Unidos</h3><p>A <b>Federal Aviation Administration (FAA)</b> descreve evolução gradual e corredores cooperativos.</p></article><article><h3>Europa</h3><p>O projeto <b>Concept of Operations for European UTM Systems — Extension for UAM (CORUS-XUAM)</b> integra serviços digitais e aeronaves não tripuladas.</p></article><article><h3>Ponto comum</h3><p>Informação compartilhada e coordenação com a operação existente.</p></article></div>
    </Slide>
    <Slide kicker="03 • Comparação guiada" title="Vantagens e desvantagens aparecem em pares" minutes={7} source="Síntese didática baseada nos CONOPS." notes="Prepare a turma para o entregável. Toda vantagem pode trazer um custo.">
      <div className="air-table-wrap"><table><thead><tr><th>Escolha</th><th>Possível vantagem</th><th>Possível desvantagem</th></tr></thead><tbody><tr><td>Com corredor dedicado</td><td>Fluxos previsíveis e requisitos comuns.</td><td>Menor flexibilidade e concentração nos acessos.</td></tr><tr><td>Sem corredor dedicado</td><td>Rotas flexíveis e menor reserva permanente.</td><td>Mais encontros e maior necessidade de coordenação.</td></tr></tbody></table></div>
    </Slide>
    <Slide kicker="04 • Entregável" title="Complete uma tabela comparativa" minutes={7} source="Atividade E06." notes="O produto é uma tabela curta, individual ou em dupla, com frases próprias.">
      <div className="air-task"><div className="air-task-callout"><strong>Produto da aula</strong><p>Uma tabela com vantagens e desvantagens de usar e de não usar corredores dedicados à Mobilidade Aérea Urbana (UAM).</p></div><div className="air-three"><article><h3>Formato</h3><p>Quatro critérios e quatro colunas comparativas.</p></article><article><h3>Base</h3><p>Use os slides e a discussão em sala.</p></article><article><h3>Objetivo</h3><p>Mostrar benefícios e limitações de cada opção.</p></article></div></div>
    </Slide>
    <Slide kicker="04 • Modelo" title="Tabela para preencher" minutes={25} source="Atividade E06." notes="Dê quinze minutos para preencher e dez para comparar em duplas.">
      <div className="air-table-wrap"><table className="air-deliverable"><thead><tr><th>Critério</th><th>Com corredor: vantagem</th><th>Com corredor: desvantagem</th><th>Sem corredor: vantagem</th><th>Sem corredor: desvantagem</th></tr></thead><tbody><tr><td>Segurança e previsibilidade</td><td>Preencher</td><td>Preencher</td><td>Preencher</td><td>Preencher</td></tr><tr><td>Capacidade</td><td>Preencher</td><td>Preencher</td><td>Preencher</td><td>Preencher</td></tr><tr><td>Flexibilidade de rota</td><td>Preencher</td><td>Preencher</td><td>Preencher</td><td>Preencher</td></tr><tr><td>Implantação e coordenação</td><td>Preencher</td><td>Preencher</td><td>Preencher</td><td>Preencher</td></tr></tbody></table></div>
    </Slide>
    <Slide kicker="04 • Discussão" title="Compare sem procurar uma solução única" minutes={12} source="Discussão orientada E06." notes="Cada dupla compartilha um ponto. Corrija duas ideias: corredor não elimina conflitos; ausência de corredor não significa ausência de regras.">
      <div className="air-bands"><article><h3>Qual vantagem apareceu mais?</h3><p>Ela vale em qualquer nível de demanda?</p></article><article><h3>Qual desvantagem é mais crítica?</h3><p>Pode ser reduzida por procedimento ou tecnologia?</p></article><article><h3>O contexto muda a escolha?</h3><p>Compare centro urbano, aeroporto e região menos congestionada.</p></article><article><h3>Conclusão</h3><p>Corredores são uma ferramenta cuja utilidade depende do problema.</p></article></div>
    </Slide>
    <Slide kicker="Síntese" title="Cinco ideias para levar da aula" minutes={5} source="Síntese E06." notes="Retome a pergunta inicial: o eVTOL integra-se a um sistema de espaço, regras e serviços.">
      <div className="air-summary"><p><b>1.</b> O espaço aéreo já possui usuários, volumes e regras.</p><p><b>2.</b> UAM significa Mobilidade Aérea Urbana.</p><p><b>3.</b> Integrar exige espaço, acesso, coordenação e contingência.</p><p><b>4.</b> Corredores aumentam previsibilidade, mas também criam limitações.</p><p><b>5.</b> A escolha depende do contexto.</p></div>
    </Slide>
    <Slide kicker="Materiais" title="Leituras para consulta e download" minutes={3} source="Biblioteca E06." notes="As normas, CONOPS e Produtos SIGMA-Sky continuam disponíveis como consulta complementar.">
      <ReadingList ids={['decea-2024-ica10012','decea-2025-ica10037','faa-2023-uam-conops-2','decea-2024-conops-uam-nacional','corus-2023-conops4','sigmasky-produto1','sigmasky-produto2']}/>
    </Slide>
  </PresentationDeck>;
}
