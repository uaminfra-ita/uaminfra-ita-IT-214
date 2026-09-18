import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';
import resources from '@/data/resources.json';
import '../e06-espaco-aereo/e06.css';
import '../e07-tipologias-vertiportos/e07.css';
import './e08.css';

const presentation = presentations.find((item) => item.slug === 'e08-operacao-vertiportos');
const allResources = Object.values(resources).flat();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const steps = ['Elementos', 'Arranjo', 'Capacidade', 'Recarga', 'Passageiros'];
export const metadata = { title: presentation.title, description: presentation.subtitle };

function Trail({ current }) {
  return <span className="ops-trail">{steps.map((name, index) => <span key={name} className={index === current ? 'ops-trail-on' : index < current ? 'ops-trail-done' : ''}>{index + 1}. {name}</span>)}</span>;
}
function Slide({ kicker, title, step, bridge, source, notes, children, className = '' }) {
  return <section className={'air-slide ' + className}><header><div className="air-kicker">{kicker}<span className="ops-kicker-right">{step !== undefined && <Trail current={step}/>}</span></div><h2>{title}</h2></header><div className="air-body">{children}</div>{bridge && <p className="ops-bridge">→ {bridge}</p>}{source && <footer>{source}</footer>}<aside className="notes">{notes}</aside></section>;
}
function Media({ assetId, caption, fit = 'contain' }) {
  const asset = assets.find((item) => item.id === assetId);
  return <figure className={'air-media vt-media vt-fit-' + fit}><a href={basePath + asset.assetPath} target="_blank" rel="noreferrer" aria-label={`Abrir imagem: ${asset.title}`}><Image src={basePath + asset.assetPath} alt={asset.alt} fill sizes="60vw" priority style={{ objectFit: fit }} /></a><figcaption>{caption && <b>{caption}</b>}<span>{asset.creditLine}</span></figcaption></figure>;
}
function Points({ items }) {
  return <div className="vt-points">{items.map(([label, text]) => <article key={label}><h3>{label}</h3><p>{text}</p></article>)}</div>;
}
function Table({ head, rows, className = '' }) {
  return <table className={'vt-table ' + className}><thead><tr>{head.map((cell) => <th key={cell}>{cell}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table>;
}
function ReadingList({ ids }) {
  return <div className="air-downloads"><div>{ids.map((id) => { const resource = allResources.find((item) => item.id === id); return <a key={id} href={basePath + resource.assetPath} download><strong>{resource.title}</strong><span>{resource.authors[0]} • {resource.year}</span><b>Baixar PDF ↓</b></a>; })}</div><a className="air-library-link" href={basePath + '/biblioteca/'} target="_blank" rel="noreferrer">Abrir a Biblioteca da disciplina ↗</a></div>;
}

function heatColor(value) {
  const t = Math.min(1, Math.max(0, (value - 40) / 50));
  const mix = (a, b) => Math.round(a + (b - a) * t);
  return { background: `rgb(${mix(230, 11)}, ${mix(244, 52)}, ${mix(248, 80)})`, color: t > 0.55 ? '#fff' : '#0b3450' };
}
function HeatGrid({ title, cols, rows, values }) {
  return <div className="ops-heat"><h3>{title}</h3><div className="ops-heat-grid" style={{ gridTemplateColumns: `110px repeat(${cols.length}, 1fr)` }}><span/>{cols.map((col) => <b key={col}>{col}</b>)}{rows.map((row, rowIndex) => [<i key={row}>{row}</i>, ...values[rowIndex].map((value, index) => <span key={row + index} style={heatColor(value)}>{value.toFixed(1).replace('.', ',')}</span>)])}</div></div>;
}
function Timeline({ start, end, segments }) {
  return <div className="ops-timeline"><span className="ops-tl-end">{start}</span><div className="ops-tl-bar">{segments.map(([label, minutes], index) => <div key={label} className={'ops-tl-seg ops-tl-' + index} style={{ flexGrow: minutes }}><b>{minutes} min</b><span>{label}</span></div>)}</div><span className="ops-tl-end">{end}</span></div>;
}
function Phases({ items }) {
  return <div className="ops-phases"><h3>Resposta a emergência com baterias</h3><ol>{items.map(([title, text]) => <li key={title}><strong>{title}</strong><p>{text}</p></li>)}</ol></div>;
}

const planning = [
  ['vt-flow-viab', 'Viabilidade', 'nível estratégico', 'Vale a pena construir?', ['Demanda e matriz O–D', 'Seleção de sítio', 'Acessibilidade e intermodalidade', 'Viabilidade econômico-financeira', 'Aceitação social, segurança percebida e privacidade', 'Marco regulatório']],
  ['vt-flow-proj', 'Projeto', 'nível tático', 'Como construir?', ['Tipologias de vertiporto', 'Geometria', 'Superfícies de aproximação e decolagem', 'Topografia urbana', 'Infraestrutura de energia', 'Segurança contra incêndio']],
  ['vt-flow-integ', 'Integração', 'nível operacional', 'Como integrar a operação à cidade?', ['Ruído', 'Poluição visual', 'Meio ambiente', 'Uso do solo e zoneamento', 'Integração multimodal e acessibilidade', 'Espaço aéreo urbano']],
];
const flowState = { 'Tipologias de vertiporto': 'vt-flow-done', Geometria: 'vt-flow-on', 'Infraestrutura de energia': 'vt-flow-on' };

export default function E08PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck vert-deck ops-deck">
    <Slide kicker="IT-214 · Mobilidade Aérea Urbana" title="Vertiportos II: operação, capacidade e recarga" notes="Apresentar as duas partes do encontro: a aula sobre operação de vertiportos e, depois do intervalo, as apresentações do Seminário Artigo 2 (CP2)." className="air-title-slide">
      <div className="vt-cover"><div><p className="air-lead">Pads, gates e stands, arranjos, capacidade, turnaround e recarga</p><p>Depois do intervalo: Seminário Artigo 2 (CP2), com as apresentações da revisão da literatura.</p><div className="air-cover-meta">E08 · 22/09/2026<br/>Equipe docente IT-214</div></div><Media assetId="e08-beta-duke-field" caption="Aeronave elétrica ALIA, da BETA Technologies, em Duke Field (EUA), 2023." fit="cover"/></div>
    </Slide>

    <Slide kicker="O problema" title="Quantos passageiros um vertiporto atende?" source="Fonte: Skyports (2025); Ahn e Hwang (2022), tabs. 5 e 6; NREL (2023), tab. 12 e p. 56; Brunelli, Ditta e Postorino (2023)." notes="Perguntar à turma o que limita a capacidade antes de mostrar a conclusão. Os três números vêm de métodos diferentes e não devem ser comparados diretamente: capacidade anunciada, modelo analítico e simulação.">
      <div className="vt-col"><div className="ops-numbers">
        <article><b>~466</b><span>passageiros por dia</span><p><strong>DXV, Dubai:</strong> capacidade anunciada pela Skyports, de 170 mil passageiros e 42 mil movimentos por ano, com 2 áreas de pouso e decolagem.</p><small>Conta: 170.000 ÷ 365 ≈ 466; 42.000 ÷ 365 ≈ 115 movimentos por dia.</small></article>
        <article><b>80</b><span>passageiros por hora</span><p><strong>1 pad e 4 gates:</strong> modelo de Ahn e Hwang, com aeronave de 4 passageiros e 5 min de turnaround no gate.</p><small>Conta: em 15 min cabem 5 decolagens × 4 passageiros = 20; em 1 h, 80.</small></article>
        <article><b>~1.400</b><span>passageiros por dia</span><p><strong>Rede simulada pelo NREL:</strong> 8 vertiportos em Nova Jersey e Nova York, com 34 aeronaves e 16 carregadores no total.</p><small>Acima desse valor, a espera dos passageiros cresce rapidamente.</small></article>
      </div>
      <p className="vt-conclusion">Nos três casos, o resultado depende de quantos pads e gates existem, de quanto tempo a aeronave fica no solo e da recarga.</p></div>
    </Slide>

    <Slide kicker="Retomada" title="Da geometria da área de pouso ao vertiporto inteiro" bridge="Hoje seguimos o caminho da aeronave: elementos, arranjo, capacidade, recarga e passageiros." source="Fonte: SIGMA-City (2026), Produto 3, fig. 2.1, e apresentação do Produto III." notes="Na E07 vimos tipologias e a geometria da área de pouso (TLOF, FATO e área de segurança). Hoje a geometria se amplia para o vertiporto inteiro, com arranjo e capacidade, e entra a infraestrutura de energia. Segurança contra incêndio volta na E14.">
      <div className="vt-col"><div className="vt-flow">{planning.map(([className, name, level, question, items]) => <div key={name} className={'vt-flow-col ' + className}><header><strong>{name}</strong><span>{level}</span></header><p className="vt-flow-question">{question}</p><ul>{items.map((item) => <li key={item} className={flowState[item] || ''}>{item}</li>)}</ul></div>)}</div>
      <p className="vt-note ops-legend"><span className="ops-key ops-key-done"/>visto na E07 <span className="ops-key ops-key-on"/>tema desta aula (a geometria continua da E07, agora com o arranjo completo)</p></div>
    </Slide>

    <Slide kicker="Elementos" step={0} title="Pad, gate e stand: onde a aeronave para" source="Fonte: Preis e Hornung (2022), apêndice A; Guerreiro et al. (2020); Ahn e Hwang (2022), fig. 23." notes="Pergunta à turma: qual desses elementos existe num heliponto comum? Em geral, só o pad. Na figura: 1 pouso, 2 táxi até o gate, 3 turnaround, 4 táxi até o pad, 5 decolagem.">
      <div className="vt-split"><Media assetId="e08-ahn-processo" caption="1 pouso · 2 táxi · 3 turnaround no gate · 4 táxi · 5 decolagem."/><Points items={[
        ['Pad', 'Área de pouso e decolagem (TLOF e FATO), vista na E07. Depois de cada operação há um intervalo de segurança antes da próxima.'],
        ['Gate', 'Posição junto ao terminal, onde os passageiros embarcam e desembarcam. Pode ter recarga.'],
        ['Stand', 'Posição de estacionamento fora do terminal, para recarga, troca de bateria e manutenção.'],
      ]}/></div>
    </Slide>
    <Slide className="ops-case" kicker="Elementos · caso do SBSJ" step={0} title="No SBSJ, o vertiporto aproveita a área de teste de motores" source="Fonte: Sandbox Regulatório de Vertiportos (SBSJ), relatório técnico da Fase I, vol. I, cap. 1, e vol. III, T2 (equipe do projeto, 2026; resultados preliminares)." notes="Caso da equipe: quando o sítio já é pavimentado e a operação é visual, o vertiporto se resume a sinalização e biruta.">
      <div className="vt-split vt-split-wide"><Media assetId="e08-sbsj-sitio" caption="Planta do sítio no SBSJ: FATO, pista de táxi, estandes e rampa de proteção, ao lado da pista 16/34."/><Points items={[
        ['Autorização', 'A ANAC autorizou o sandbox no SBSJ apenas para operações visuais (VFR).'],
        ['Pavimento existente', 'A área de teste de motores já é pavimentada; a capacidade de suporte parece compatível com eVTOL, mas ainda depende da confirmação do PCR.'],
        ['O que foi implantado', 'Sinalização horizontal da FATO, da pista de táxi e dos estandes e uma nova biruta a cerca de 110 m da FATO; a existente fica a mais de 1.000 m.'],
        ['Fase II', 'Operações reais instrumentadas para medir desvios de trajetória, ruído, downwash e outwash.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Elementos" step={0} title="Entre o pad e o gate, a aeronave taxia" bridge="O modo de táxi define a largura das pistas e a distância entre pads e gates. O próximo passo é organizar tudo no terreno." source="Fonte: Preis e Hornung (2022), tab. 3; FAA (2024), EB 105A, seção 3." notes="Slide ilustrativo. As velocidades são estimativas de especialistas, não medições de operação real. A FAA ainda não publicou critérios próprios de pista de táxi para vertiportos.">
      <div className="vt-split vt-split-even"><Media assetId="e08-joby-edwards" caption="eVTOL da Joby parado em pista de táxi na Base Aérea de Edwards." fit="cover"/><Points items={[
        ['Rebocada', 'Um veículo leva a aeronave pelo pátio (cerca de 2,6 m/s). É preciso acoplar e desacoplar o dispositivo.'],
        ['Rodando com os próprios motores', 'Exige trem de pouso com rodas (cerca de 2,2 m/s).'],
        ['Pairando', 'É o modo mais rápido (cerca de 3,3 m/s), mas pede posições do tamanho da FATO e espalha downwash pelo pátio.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Arranjo" step={1} title="Três formas de organizar pads e gates" source="Fonte: Ahn e Hwang (2022), figs. 9, 11 e 13, com critérios da minuta do FAA EB 105 (2022), anterior ao EB 105A." notes="Os três exemplos usam a aeronave Hyundai S-A1. Perguntar à turma qual arranjo cabe melhor em um terreno estreito, como uma faixa ao lado de uma avenida.">
      <div className="ops-trio">
        <div><Media assetId="e08-ahn-linear" caption="Linear"/><p>Pads e gates em linha. Operação simples; bom para terrenos estreitos e longos.</p></div>
        <div><Media assetId="e08-ahn-satelite" caption="Satélite"/><p>Gates em volta de um pad. Adequado a terrenos quadrados ou circulares.</p></div>
        <div><Media assetId="e08-ahn-pier" caption="Pier"/><p>Forma intermediária: separa pads e gates e permite aproximações em várias direções.</p></div>
      </div>
    </Slide>
    <Slide className="ops-case" kicker="Arranjo · caso do SBSJ" step={1} title="O arranjo do SBSJ: uma FATO, uma pista de táxi e três estandes" source="Fonte: Sandbox Regulatório de Vertiportos (SBSJ), relatório técnico da Fase I, vol. III, T4, fig. 4.4 e tabs. 4.3 a 4.5 (equipe do projeto, 2026; resultados preliminares)." notes="Hipótese de projeto D = RD = 16 m: dimensão pública da aeronave de referência (15,24 m) acrescida de 5%, enquanto não há valores certificados. É o arranjo linear visto no slide anterior. Recarga, acesso de emergência e propagação térmica entre os estandes ainda precisam ser verificados.">
      <div className="vt-split ops-split-media"><Media assetId="e08-sbsj-arranjo" caption="Cotas preliminares (m). Os estandes herdam o espaçamento de 18 m das marcações do pátio de teste de motores."/>
        <div className="vt-col vt-col-gap"><Table className="ops-compact" head={['Elemento, com D = 16 m', 'FAA EB 105A', 'EASA PTS']} rows={[
          ['TLOF', '16,00 m', '13,28 m'],
          ['FATO', '32,00 m', '24,00 m'],
          ['Área de segurança', '40,00 m', '32,00 m'],
          ['Estande', '24,96 m (folga de 0,28D)', '19,20 m (1,2D); 32,00 m com área de giro'],
          ['Rota de táxi', 'sem critério próprio', '24,00 m no solo; 32,00 m em voo baixo'],
        ]}/>
        <p className="vt-conclusion">32 m se repete: FATO da FAA, área de segurança da EASA, rota em voo baixo e estande com área de giro.</p></div></div>
    </Slide>

    <Slide kicker="Arranjo" step={1} title="Com quatro pads, o desenho das pistas muda a área" source="Fonte: Zelinski (2020), NASA, figs. 2, 3 e 5 e seção V." notes="Os três arranjos da NASA têm quatro TLOFs e cinco vagas por TLOF, com separação de 200 pés (61 m) entre FATOs. Lados: 489 pés (149 m), 414 pés (126 m) e 405 pés (123 m).">
      <div className="vt-col"><div className="ops-trio ops-trio-square">
        <div><Media assetId="e08-zelinski-perimetro" caption="Perímetro: 149 m de lado"/></div>
        <div><Media assetId="e08-zelinski-central" caption="Central: 126 m de lado"/></div>
        <div><Media assetId="e08-zelinski-desconectado" caption="Desconectado: 123 m de lado"/></div>
      </div>
      <div className="vt-cards vt-cards-3 ops-cards-low"><article><p>O <b>desconectado</b> coloca mais vagas na menor área, mas cada vaga só serve a um pad.</p></article><article><p>O <b>central</b> tem táxi mais curto e ocupa menos área que o perímetro, com a mesma capacidade.</p></article><article><p>Com os tempos adotados, <b>cinco vagas por pad</b> pareceram suficientes.</p></article></div></div>
    </Slide>

    <Slide kicker="Arranjo" step={1} title="O vento decide quais pads podem ser usados" bridge="Por isso, pistas que ligam todos os pads deixam o vertiporto menos vulnerável ao vento." source="Fonte: Zelinski (2020), NASA, fig. 9, equações 1 e 2, seção III e tab. II." notes="Ligar com a E12 (meteorologia e disponibilidade operacional). As restrições vieram de entrevistas com especialistas em operação de helipontos.">
      <div className="vt-split vt-split-even"><Media assetId="e08-zelinski-vento" caption="Uso de um pad conforme a direção e a velocidade do vento."/><Points items={[
        ['Sem vento de cauda', 'Evita que a aeronave entre no próprio downwash e perca sustentação.'],
        ['Vento de través até 15 kt', 'Acima disso, a aproximação ou a decolagem naquela direção fica fechada.'],
        ['Exemplo do estudo', 'Com vento de 20 kt na direção 0°, o pad A deixa de aceitar pousos e só pode ser usado para decolagens.'],
        ['Efeito no arranjo', 'Quando alguns pads ficam restritos, o arranjo desconectado cai para metade e depois para zero operações; perímetro e central continuam operando.'],
      ]}/></div>
    </Slide>
    <Slide className="ops-case" kicker="Arranjo · caso do SBSJ" step={1} title="A rosa dos ventos diz de onde chegar e para onde sair" bridge="Sem pista para seguir, é a rosa dos ventos que orienta a entrada e a saída da FATO." source="Fonte: Sandbox Regulatório de Vertiportos (SBSJ), relatório técnico da Fase I, vol. I, fig. 2.3 e seções 2.4, 2.7 e 2.12 (equipe do projeto, 2026; resultados preliminares)." notes="Na rosa, o ângulo é a direção de onde o vento sopra e o raio é a frequência. Perguntar à turma de que lado colocariam a chegada e a saída num vertiporto nesse sítio.">
      <div className="vt-split vt-split-wide"><Media assetId="e08-sbsj-rosa-ventos" caption="Rosa dos ventos anual com o eixo verdadeiro da pista 16/34 sobreposto; 90.724 boletins METAR de 2015 a 2025."/><div className="vt-col vt-col-gap"><Points items={[
        ['Dois setores, não um', 'À tarde o vento vem de sul/sudeste; de madrugada, de nordeste e leste.'],
        ['A tarde é a fase mais intensa', 'Média de 3 a 6 kt e calmaria em 1,3%; das 3h às 6h a calmaria chega a 27,2% e o vento perde direção definida.'],
        ['Projeção no eixo da pista', 'O vento da tarde faz cerca de 35° com o rumo 135°/315°: 82% dele vira componente de proa e 57%, de través. Acima de 15 kt de través, só 0,17% do ano.'],
      ]}/></div></div>
    </Slide>

    <Slide className="ops-case" kicker="Arranjo · caso do SBSJ" step={1} title="Além do vento, teto e visibilidade decidem quando operar" source="Fonte: Sandbox Regulatório de Vertiportos (SBSJ), relatório técnico da Fase I, vol. I, cap. 2, tab. 2.11 e seções 2.4 a 2.10 (equipe do projeto, 2026; resultados preliminares)." notes="As categorias meteorológicas foram definidas pelo estudo e não são limites certificados da aeronave. O teto baixo, e não a visibilidade, é o que mais restringe no SBSJ.">
      <div className="vt-split vt-split-even"><HeatGrid title="Condição visual (CAVOK + VFR) por horário e estação, em %" cols={['Verão', 'Outono', 'Inverno', 'Primavera']} rows={['0h–3h', '3h–6h', '6h–9h', '9h–12h', '12h–15h', '15h–18h', '18h–21h', '21h–24h']} values={[
        [69.8, 73.2, 75.9, 64.1],
        [61.6, 57.3, 59.5, 55.7],
        [53.3, 45.6, 46.1, 48.3],
        [69.1, 59.8, 59.5, 62.5],
        [81.9, 84.5, 81.9, 77.6],
        [78.3, 87.3, 88.3, 79.6],
        [73.2, 83.0, 86.5, 75.8],
        [75.3, 79.1, 83.9, 70.3],
      ]}/><Points items={[
        ['Base', '90.724 boletins METAR do SBSJ, de 2015 a 2025; condição visual em 70,7% do tempo.'],
        ['Pior horário', 'Das 6h às 9h, 46% a 53% de condição visual em todas as estações — justamente o pico de deslocamento da manhã.'],
        ['Padrões', 'Nevoeiro em 11,3% dos boletins das 6h às 9h no inverno; trovoada em 28,3% dos boletins das 15h às 18h no verão.'],
      ]}/></div>
    </Slide>

    <Slide className="ops-case" kicker="Arranjo · caso do SBSJ" step={1} title="Onde a aeronave toca? 6.144 pousos simulados no SBSJ" bridge="A geometria define a margem; o número de pads e gates define quantas aeronaves passam. Como estimar esse número?" source="Fonte: Sandbox Regulatório de Vertiportos (SBSJ), relatório técnico da Fase I, vol. III, T4, tabs. 4.6 e 4.7 e fig. 4.7 (equipe do projeto, 2026; resultados preliminares)." notes="Seis procedimentos VFR, cada um com 1.024 simulações (32 estratos de estação e horário × 32 réplicas), no BlueSky com o modelo de helicóptero EC35 do BADA-H. O modelo não reproduz efeito solo, anel de vórtice nem falhas de propulsão distribuída.">
      <div className="vt-split ops-split-media-wide"><Media assetId="e08-sbsj-dispersao" caption="Pontos finais de um dos procedimentos (Whiskey Colinas) frente à TLOF e à FATO da FAA e da EASA."/>
        <div className="vt-col vt-col-gap"><Table className="ops-compact" head={['Resultado (6 procedimentos)', 'EASA', 'FAA']} rows={[
          ['Trem de pouso fora da TLOF', '0,59%', '0,36%'],
          ['Aeronave (15,24 m) fora da FATO', '0,55%', '0,36%'],
          ['P99 do pior procedimento: 14,68 m na TLOF', 'excede 13,28 m', 'cabe em 16 m'],
          ['P99 do pior procedimento: 25,26 m na FATO', 'excede 24 m', 'cabe em 32 m'],
        ]}/>
        <p className="vt-conclusion">O núcleo dos pousos ocupa 6,6% a 11,8% da TLOF da EASA, mas a cauda passa dos limites da EASA; a FAA dá mais margem.</p></div></div>
    </Slide>

    <Slide kicker="Capacidade" step={2} title="Capacidade e throughput não são a mesma coisa" source="Fonte: Guerreiro et al. (2020), seção III.A e conclusão; Preis (2023)." notes="Throughput pode ser traduzido como vazão: o que de fato passou pelo vertiporto.">
      <div className="vt-split vt-split-even"><Points items={[
        ['Capacidade', 'Quantas operações o vertiporto comporta num período, dadas certas hipóteses.'],
        ['Throughput', 'Quantas operações de fato aconteceram no período.'],
        ['Limitado por pads ou por vagas', 'O recurso que se esgota primeiro define a capacidade do vertiporto.'],
        ['Programação por ordem de chegada', 'Deixa intervalos curtos demais para usar: na simulação da NASA, o throughput ficou 16% a 22% abaixo da capacidade.'],
      ]}/><div className="vt-col vt-col-gap"><div className="ops-calc"><h3>Outro indicador: área por passageiro por hora</h3><p>VoloCity (cenário de referência): <b>188 m²</b></p><p>CityAirbus, 7,92 m de diâmetro: <b>46,3 m²</b></p><p>Archer Maker, 12,2 m de diâmetro: <b>221 m²</b></p></div><p className="vt-note">Preis (2023): aeronaves menores ocupam menos área por passageiro transportado.</p></div></div>
    </Slide>
    <Slide className="ops-case" kicker="Capacidade · caso do SBSJ" step={2} title="O porte do vertiporto se mede em movimentos por dia" source="Fonte: Sandbox Regulatório de Vertiportos (SBSJ), relatório técnico da Fase I, vol. III, T9, tabs. 9.1, 9.4 e 9.7 (equipe do projeto, 2026; resultados preliminares)." notes="Proposta preliminar de categorização para subsidiar a ANAC. Localização em aeródromo e função de manutenção prevalecem sobre o volume de movimentos.">
      <div className="vt-col vt-col-gap"><Table className="ops-compact" head={['Categoria proposta', 'Movimentos por dia', 'FATOs', 'Zona de alerta de outwash', 'Carga rápida']} rows={[
        ['Vertihub', 'mais de 50', 'mais de 1', 'sim', 'desejável'],
        ['Vertiporto urbano', '20 a 50', 'mais de 1', 'sim', 'desejável'],
        ['Vertiporto aeroportuário', 'mais de 20', 'mais de 1', 'sim', 'desejável'],
        ['Vertibase (manutenção)', 'variável', 'mais de 1', 'sim', 'não'],
        ['Vertistop elevado', 'menos de 20', '1', 'sim', 'desejável'],
        ['Vertistop no solo', 'menos de 20', '1', 'desejável', 'desejável'],
        ['Vertistop remoto', 'menos de 10', '1', 'desejável', 'não'],
      ]}/>
      <div className="vt-cards vt-cards-2 ops-cards-low"><article><h3>Segunda FATO</h3><p>Com mais movimento, uma FATO ou área livre para pouso de contingência: com pouca bateria, a aeronave pode não conseguir arremeter.</p></article><article><h3>Carga rápida</h3><p>90% ou mais em menos de 30 min, partindo de 10%. É questão de demanda, não de regulação.</p></article></div></div>
    </Slide>

    <Slide kicker="Capacidade" step={2} title="Um modelo simples: pads ou vagas, quem limita?" source="Fonte: Guerreiro et al. (2020), NASA, equações 1 a 3 e fig. 6." notes="O modelo ignora o arranjo físico e a recarga (tempo de recarga igual a zero na simulação). Serve para uma primeira estimativa do número de pads e de vagas. O fator 2 aparece porque cada aeronave que ocupa uma vaga gera um pouso e uma decolagem.">
      <div className="vt-split ops-split-model"><div className="vt-col ops-model"><p className="ops-lead">A capacidade é o menor valor entre o que os pads e o que as vagas conseguem atender.</p><div className="ops-eq"><p>C<sub>pads</sub> = 2 · N<sub>p</sub> · t<sub>jan</sub> / (t<sub>pouso</sub> + t<sub>dec</sub>)</p><p>C<sub>solo</sub> = N<sub>v</sub> · t<sub>jan</sub> / t<sub>solo</sub></p><p>C = mín(2 · C<sub>solo</sub>; C<sub>pads</sub>)</p></div>
        <Table className="ops-compact ops-vars" head={['Símbolo', 'Significado']} rows={[
          ['C', 'Capacidade do vertiporto, em pousos e decolagens'],
          [<>C<sub>pads</sub>; C<sub>solo</sub></>, 'Operações que os pads suportam; aeronaves que as vagas recebem'],
          [<>N<sub>p</sub>; N<sub>v</sub></>, 'Número de pads; número de vagas (gates e stands)'],
          [<>t<sub>pouso</sub>; t<sub>dec</sub></>, 'Tempo que um pouso ou uma decolagem ocupa o pad (60 s)'],
          [<>t<sub>solo</sub></>, 'Tempo entre o pouso e a decolagem da mesma aeronave (2 a 15 min)'],
          [<>t<sub>jan</sub></>, 'Janela de tempo analisada (15 min ou 1 h)'],
        ]}/></div>
        <Media assetId="e08-guerreiro-capacidade" caption="Capacidade por 15 min: cresce com as vagas até o limite dos pads."/></div>
    </Slide>

    <Slide kicker="Capacidade" step={2} title="Exemplo: quantas vagas para dois pads?" bridge={<>O tempo em solo (t<sub>solo</sub>) é o turnaround. Do que ele é feito?</>} source="Fonte: cálculo com o modelo de Guerreiro et al. (2020); resultados do artigo na seção IV." notes="Fazer a conta no quadro. Dois pads é o caso do DXV, visto na E07. O resultado do artigo mostra que a conta simples superestima o que se observa na simulação.">
      <div className="vt-col"><div className="vt-calc"><article><h3>O que os pads suportam</h3><p>N<sub>p</sub> = 2; t<sub>pouso</sub> = t<sub>dec</sub> = 60 s; t<sub>jan</sub> = 1 h</p><p>C<sub>pads</sub> = 2 × 2 × 3.600 ÷ 120</p><p>= <b>120 operações/h</b></p></article><article><h3>Vagas para não travar</h3><p>t<sub>solo</sub> = 15 min = 900 s</p><p>N<sub>v</sub> = N<sub>p</sub> × t<sub>solo</sub> ÷ (t<sub>pouso</sub> + t<sub>dec</sub>)</p><p>= 2 × 900 ÷ 120 = <b>15 vagas</b></p></article><article><h3>Com só 6 vagas</h3><p>C<sub>solo</sub> = 6 × 3.600 ÷ 900 = 24</p><p>C = mín(2 × 24; 120)</p><p>= <b>48 operações/h</b></p></article></div>
      <p className="vt-conclusion">Com 6 vagas, o vertiporto usa só 40% do que os pads permitem. No artigo, um vertiporto com 6 pads e 38 vagas tinha capacidade de 76 operações por 15 min, e a simulação observou em média 63,9.</p></div>
    </Slide>

    <Slide kicker="Capacidade" step={2} title="O que acontece enquanto a aeronave está no solo" source="Fonte: Nagrare e Lieb (2026), fig. 2 e seção 6.3; Ahn e Hwang (2022), tab. 5." notes="O turnaround mínimo de 10 min de Nagrare e Lieb soma, em cada sentido, 2 min de pouso ou decolagem, 30 s de motor, 90 s de embarque ou desembarque e 1 min de táxi. Sem recarga.">
      <div className="vt-col"><div className="ops-journey"><Media assetId="e08-nagrare-jornada" caption="Pouso, táxi, desembarque, recarga ou estacionamento, programação, embarque, táxi e decolagem."/></div>
      <div className="vt-split vt-split-even ops-row"><Table className="ops-compact" head={['Etapa (Ahn e Hwang)', 'Tempo']} rows={[
        ['Pouso', '60 s'], ['Táxi até o gate', '15 s'], ['Turnaround no gate', '300 s'], ['Táxi até o pad', '15 s'], ['Decolagem', '60 s'],
      ]}/><Points items={[
        ['Total sem espera', '450 s, ou 7,5 min, dos quais 2 min no pad.'],
        ['Turnaround ideal (Nagrare e Lieb)', '10 min, sem recarga.'],
        ['Com recarga e pads ocupados', 'Na simulação de Nagrare e Lieb, parte das aeronaves ficou mais de 30 min no vertiporto.'],
      ]}/></div></div>
    </Slide>
    <Slide className="ops-case" kicker="Capacidade · caso do SBSJ" step={2} title="No simulador, o pouso acontece 50 min antes da partida" source="Fonte: Sandbox Regulatório de Vertiportos (SBSJ), relatório técnico da Fase I, vol. III, T3, cenário 01 (equipe do projeto, 2026; resultados preliminares)." notes="Tempos e probabilidades são premissas do simulador, não medições; a Fase II vai calibrar com dados de campo. Cenário: conexão de voo nacional para eVTOL no SBSJ, 2 voos de 4 lugares, 1 vertipad, van que cruza a pista em uso.">
      <div className="vt-col vt-col-gap"><Timeline start="Pouso" end="Partida" segments={[['Resfriamento da bateria', 10], ['Recarga', 30], ['Margem', 10]]}/>
      <p className="vt-note">Sem embarque durante a recarga.</p>
      <div className="vt-split vt-split-even"><Points items={[
        ['Porta ao embarque', '77,8 min em média; a maior espera é a formação do grupo para o briefing (13,2 min), não uma fila.'],
        ['Recarga de 30 para 40 min', '+12 min na jornada e atraso de 5,5 para 14,7 min: o maior efeito entre os testados.'],
        ['Pista menos disponível', 'Com 50% em vez de 82% de chance de pista livre, as viagens com espera sobem de 18,6% para 50,4%, mas a jornada cresce só 82 s.'],
      ]}/><div className="vt-col vt-col-gap"><p className="vt-conclusion">No solo, o tempo do eVTOL é dominado pela bateria: resfriar e recarregar.</p></div></div></div>
    </Slide>

    <Slide kicker="Capacidade" step={2} title="Quanto dura cada etapa, segundo especialistas" source="Fonte: Preis e Hornung (2022), tab. 3 e apêndice D. Base: número de especialistas / número de valores da literatura." notes="Estimativas de 17 especialistas entrevistados entre outubro de 2020 e julho de 2021, combinadas com 47 valores da literatura. Ainda não há dados de operação real de vertiportos; os valores servem para modelos e devem ser citados como estimativas.">
      <Table className="vt-table-full ops-compact ops-times" head={['Etapa, na ordem do percurso', 'Valor', 'Base']} rows={[
        ['Aproximação até entrar no espaço sobre o pad', '46,3 s', '6 / 2'],
        ['Pairado final até tocar o solo', '22,9 s', '5 / 5'],
        ['Intervalo até a próxima operação no pad', '30,0 s', '3 / 3'],
        ['Desembarque', '65,8 s', '4 / 4'],
        ['Caminhada entre terminal e aeronave (até a porta do pátio + até a aeronave)', '31,9 s + 19,7 s', '3 / 0 · 5 / 0'],
        ['Embarque', '73,0 s', '4 / 5'],
        ['Pairado inicial na decolagem', '13,5 s', '5 / 5'],
        ['Saída do espaço sobre o pad', '28,7 s', '6 / 1'],
        ['Potência de recarga', '311 kW', '4 / 7'],
        ['Troca de bateria', '349 s', '2 / 5'],
      ]}/>
    </Slide>

    <Slide kicker="Capacidade" step={2} title="Onde surgem os gargalos" bridge="A recarga ficou de fora dos modelos simples, mas pesa no turnaround. É o próximo tema." source="Fonte: Preis e Hornung (2022), resumo e fig. 6; Guerreiro et al. (2020); NREL (2023), p. 56." notes="O gráfico mostra o atraso médio dos passageiros quando o tempo de aproximação e decolagem varia. Perto do limite, pequenos aumentos no tempo de pad produzem grandes atrasos.">
      <div className="vt-split vt-split-even"><Media assetId="e08-preis-atraso" caption="Atraso médio dos passageiros (min) × tempo de aproximação e decolagem (min)."/><Points items={[
        ['Pad', 'As operações no pad foram as que mais afetaram o atraso dos passageiros.'],
        ['Limiar', 'Pads e gates têm um limite a partir do qual o atraso cresce de forma exponencial.'],
        ['Programação', 'A ordem de chegada deixa lacunas nos horários de pads e vagas.'],
        ['Recarga', 'No estudo do NREL, com demanda muito alta, a espera dos passageiros cresce de forma exponencial.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Recarga" step={3} title="A recarga faz parte do turnaround" source="Fonte: NREL (2023), sumário executivo e seção 1; FAA (2024), EB 105A, seção 5.0." notes="O NREL consultou seis fabricantes; parte deles não forneceu dados. A foto mostra o protótipo A250 da BETA ligado ao carregador Charge Cube.">
      <div className="vt-split vt-split-wide"><Media assetId="e08-beta-recarga" caption="Protótipo A250 da BETA Technologies em recarga." fit="cover"/><Points items={[
        ['Potência', 'Pico de recarga em corrente contínua de 300 kW a 1 MW, segundo os fabricantes consultados pelo NREL.'],
        ['Recomendação', 'Planejar carregadores de 1 MW ou mais, porque a ampliação da rede elétrica é lenta.'],
        ['Aeronaves', 'Cabem em cerca de 15 × 15 m e gastam 5% ou mais da energia na decolagem.'],
        ['Padrões', 'Ainda não há consenso sobre conectores; nenhum fabricante consultado considera troca de bateria.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Recarga" step={3} title="Exemplo: quanto tempo leva a recarga?" source="Fonte: cálculo com valores de Preis e Hornung (2022), tab. 3; NREL (2023), p. 56; Nagrare e Lieb (2026), seção 6.3." notes="Cálculo simplificado com potência constante. O NREL lembra que, na prática, a potência cai a partir de 80% de carga, por isso a recarga parcial é comum.">
      <div className="vt-col"><div className="vt-calc"><article><h3>Energia</h3><p>Bateria de 133 kWh, de 20% a 80%</p><p>0,6 × 133 = 79,8 kWh</p><p>Com 7,17% de perda: 79,8 ÷ 0,9283 = <b>86,0 kWh</b></p></article><article><h3>Tempo</h3><p>Potência de 311 kW</p><p>86,0 ÷ 311 = 0,277 h</p><p>= <b>16,6 min</b></p></article><article><h3>Comparação</h3><p>Troca de bateria: <b>5,8 min</b></p><p>Turnaround sem recarga (Ahn e Hwang): <b>5 min</b></p></article></div>
      <p className="vt-conclusion">Recarregar de 20% a 80% leva mais de três vezes o turnaround sem recarga. Com carregadores de 100 kW, uma aeronave da simulação de Nagrare e Lieb levou 50 min para recarregar e acumulou 76 min de atraso.</p></div>
    </Slide>

    <Slide kicker="Recarga" step={3} title="Quantos carregadores e quanta energia?" source="Fonte: NREL (2023), tab. 12, seções 3.2 e 3.3 e sumário executivo." notes="Rede simulada: aeroportos de Atlantic City (ACY) e Teterboro (TEB), Hard Rock Hotel & Casino (HRHC), helipontos HHI, TSS e PEG e dois centros médicos. ACY, HRHC, HHI e TEB tinham 7 aeronaves e 3 carregadores cada.">
      <div className="vt-col"><Table className="vt-table-full" head={['Cenário do NREL', 'Carregadores', 'Pico de potência em ACY', 'Energia em ACY']} rows={[
        ['Restrito', '3 nos sítios principais (até 900 kW por sítio)', '900 kW', '33 MWh/dia'],
        ['Irrestrito', 'Sem limite', '13,3 MW', '34 MWh/dia'],
      ]}/>
      <div className="vt-cards vt-cards-3 ops-cards-low"><article><h3>Demanda</h3><p>Cerca de 1.400 passageiros por dia na rede inteira foi considerado um caso razoável.</p></article><article><h3>Rede elétrica</h3><p>A recarga causou subtensão e sobrecarga em linhas e transformadores: é preciso reforçar a rede ou instalar armazenamento.</p></article><article><h3>Custo</h3><p>A tarifa de demanda pesa na conta; painéis solares com baterias estacionárias reduziram custos.</p></article></div></div>
    </Slide>

    <Slide className="ops-case" kicker="Recarga · caso do SBSJ" step={3} title="Segurança da recarga e resposta a emergências" bridge="Com a aeronave pronta para voar, falta o outro lado do vertiporto: passageiros e carga." source="Fonte: FAA (2024), EB 105A, seções 3.1 e 5.1; Sandbox Regulatório de Vertiportos (SBSJ), relatório técnico da Fase I, vol. III, T8 e T9 (equipe do projeto, 2026; resultados preliminares)." notes="O incêndio de bateria de lítio só é extinto quando a temperatura do eletrólito cai; por isso o resfriamento é a prioridade. O tema volta na E14.">
      <div className="vt-split vt-split-even"><Points items={[
        ['Critérios da FAA', 'Baterias armazenadas longe de TLOF, FATO e área de segurança; afastamento maior entre posições pelo risco de propagação térmica; energia de emergência (NFPA 418, 855, 70 e 110).'],
        ['Vertistop elevado', 'Avaliar se a laje e as vigas resistem a um incêndio de longa duração e dimensionar o tanque de água.'],
        ['Lacunas', 'Ainda faltam procedimentos padronizados de carga e métodos eficazes para suprimir avalanche térmica.'],
      ]}/><Phases items={[
        ['Evacuação e salvamento', 'Alerta, identificação do modelo da aeronave e da severidade; cuidado com eletrocussão.'],
        ['Contenção e supressão', 'Isolar a área e reduzir a temperatura do eletrólito para evitar avalanche térmica.'],
        ['Descarte seguro', 'Monitorar o risco de reignição e decidir quando levar a aeronave para quarentena.'],
      ]}/></div>
    </Slide>

    <Slide className="ops-case" kicker="Passageiros · caso do SBSJ" step={4} title="Passageiros: o que o simulador do SBSJ mostrou" bridge="Elementos, arranjo, tempos em solo, recarga e passageiros definem juntos a capacidade e o projeto do vertiporto." source="Fonte: Sandbox Regulatório de Vertiportos (SBSJ), relatório técnico da Fase I, vol. III, T3, cenários 01 a 04 e recomendações (equipe do projeto, 2026; resultados preliminares)." notes="Quatro cenários: conexão de voo nacional para eVTOL, acesso terrestre a vertiporto remoto, conexão entre voos eVTOL e eVTOL alimentador de voo convencional. Cada um simula 8 passageiros e 2 voos; os resultados não são tempos mínimos regulatórios.">
      <div className="vt-cards vt-cards-grid">
        <article><h3>Reinspeção</h3><p>Quem já foi inspecionado pode seguir direto se ficar em área restrita, sem contato com fluxos não inspecionados — isso depende de reconhecimento da ANAC.</p></article>
        <article><h3>Raio-X</h3><p>Dobrar a fração de passageiros dispensados não mudou o tempo total: a fila do raio-X era 0,3% da jornada.</p></article>
        <article><h3>Van em grupo</h3><p>A van espera todos: no eVTOL alimentador, o embarque lento na van acrescentou 7,4 min até o terminal e foi o que mais reduziu a folga.</p></article>
        <article><h3>Conexão entre eVTOLs</h3><p>76,8 min em média; com restituição de bagagem mais lenta, +10,3 min e perda de conexão de 1,0% para 16,6%.</p></article>
        <article><h3>Vertipad</h3><p>A recarga mais lenta elevou a ocupação do vertipad de 48,5% para 65,2%, com efeito provavelmente concentrado no segundo voo.</p></article>
        <article><h3>Taxa × folga</h3><p>99,9% de atendimento pode esconder perda de margem: acompanhar o percentil 95, a menor folga, as filas e a ocupação.</p></article>
      </div>
    </Slide>

    <Slide kicker="Intervalo" title="Intervalo de 10 minutos" notes="Na volta, começam as apresentações do Seminário Artigo 2." className="air-title-slide vt-break-slide">
      <div/>
    </Slide>

    <Slide kicker="Seminário Artigo 2 · CP2" title="Checkpoint 2: revisão da literatura completa" source="Fonte: Plano de ensino IT-214 (2026/2), seção 3." notes="Apresentação individual, com devolutiva na sequência, conforme o plano de ensino. Manter este slide na tela durante as apresentações.">
      <div className="vt-split vt-split-even"><div className="vt-col vt-col-gap"><h3 className="ops-subtitle">Conteúdo mínimo esperado</h3><ol className="ops-list"><li>Estratégia de busca</li><li>Bases usadas</li><li>Matriz de artigos</li><li>Classificação da literatura</li><li>Estado da arte</li><li>Lacuna consolidada</li><li>Posicionamento do artigo</li></ol></div>
        <div className="vt-col vt-col-gap"><blockquote className="ops-quote"><p>“O aluno consegue mostrar o que já foi feito, o que falta e por que sua pergunta é relevante.”</p><cite>Critério pedagógico do CP2</cite></blockquote>
        <p className="vt-note">Apresentação individual, com devolutiva na sequência. O CP1 (25/08) definiu a lacuna inicial; o CP2 mostra se ela se sustenta diante da literatura.</p></div></div>
    </Slide>

    <Slide kicker="Próximos passos" title="Próximos passos" notes="Lembrar que a devolutiva do CP2 é dada na sequência das apresentações.">
      <div className="vt-next"><article><b>Hoje</b><p>Apresentações do CP2. Material na pasta de atividades do Drive: slides, matriz de artigos e revisão da literatura.</p></article><article><b>29/09</b><p>Semana de recuperação, sem aula regular.</p></article><article><b>06/10 · E09</b><p>Superfícies de proteção de voo e obstáculos. Leitura: FAA EB 105A, seção 2.6 e fig. 2-5.</p></article><article><b>27/10 · CP3</b><p>Seminário Artigo 3: metodologia, dados, estudo de caso e resultados preliminares.</p></article></div>
    </Slide>

    <Slide kicker="Referências" title="Referências" notes="Lista para consulta.">
      <ul className="vt-refs">{presentation.references.map((reference) => <li key={reference.shortTitle}>{reference.citation}{reference.url && <> <a href={reference.url} target="_blank" rel="noreferrer">{reference.url.replace('https://', '')}</a></>}</li>)}<li>Equipe do Sandbox Regulatório de Vertiportos (SBSJ). Relatório técnico da Fase I, vols. I e III. ITA/ANAC, 2026. Relatório não publicado; resultados preliminares.</li></ul>
    </Slide>

    <Slide kicker="Materiais" title="Documentos para download" notes="Todos os documentos estão na Biblioteca da disciplina.">
      <ReadingList ids={['faa-2024-eb-105a-vertiport-design', 'easa-2022-vertiport-design-pts', 'nrel-2023-vertiport-electrical', 'sigmacity-produto3', 'it214-2026-2-plano-ensino']}/>
    </Slide>
  </PresentationDeck>;
}
