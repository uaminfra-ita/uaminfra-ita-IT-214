import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';
import resources from '@/data/resources.json';
import '../e06-espaco-aereo/e06.css';
import '../e07-tipologias-vertiportos/e07.css';
import '../e08-operacao-vertiportos/e08.css';
import '../e10-demanda/e10.css';
import './e11.css';

const presentation = presentations.find((item) => item.slug === 'e11-selecao-sitios');
const allResources = Object.values(resources).flat();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const steps = ['Contexto', 'Método', 'Primeira rodada', 'Análise do sítio'];
export const metadata = { title: presentation.title, description: presentation.subtitle };

function Trail({ current }) {
  return <span className="ops-trail">{steps.map((name, index) => <span key={name} className={index === current ? 'ops-trail-on' : index < current ? 'ops-trail-done' : ''}>{index + 1}. {name}</span>)}</span>;
}
function Slide({ kicker, title, step, source, notes, children, className = '' }) {
  return <section className={'air-slide ' + className}><header><div className="air-kicker">{kicker}<span className="ops-kicker-right">{step !== undefined && <Trail current={step}/>}</span></div><h2>{title}</h2></header><div className="air-body">{children}</div>{source && <footer>{source}</footer>}<aside className="notes">{notes}</aside></section>;
}
function Media({ assetId, caption, fit = 'contain' }) {
  const asset = assets.find((item) => item.id === assetId);
  return <figure className={'air-media vt-media vt-fit-' + fit}><a href={basePath + asset.assetPath} target="_blank" rel="noreferrer" aria-label={`Abrir imagem: ${asset.title}`}><Image src={basePath + asset.assetPath} alt={asset.alt} fill sizes="60vw" priority style={{ objectFit: fit }} /></a><figcaption>{caption && <b>{caption}</b>}<span>{asset.creditLine}</span></figcaption></figure>;
}
function Points({ items }) {
  return <div className="vt-points">{items.map(([label, text]) => <article key={label}><h3>{label}</h3><p>{text}</p></article>)}</div>;
}
function Table({ head, rows, className = '' }) {
  return <table className={'vt-table ' + className}><thead><tr>{head.map((cell, index) => <th key={index}>{cell}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table>;
}
function Steps({ items }) {
  return <ol className="dem-steps dem-steps-narrow">{items.map(([title, text]) => <li key={title}><b>{title}</b><span>{text}</span></li>)}</ol>;
}
function Hero({ items, className = '' }) {
  return <div className={'dem-hero ' + className}>{items.map(([value, label]) => <article key={label}><b>{value}</b><span>{label}</span></article>)}</div>;
}
function ReadingList({ ids }) {
  return <div className="air-downloads"><div>{ids.map((id) => { const resource = allResources.find((item) => item.id === id); return <a key={id} href={basePath + resource.assetPath} download><strong>{resource.title}</strong><span>{resource.authors[0]} • {resource.year}</span><b>Baixar PDF ↓</b></a>; })}</div><a className="air-library-link" href={basePath + '/biblioteca/'} target="_blank" rel="noreferrer">Abrir a Biblioteca da disciplina ↗</a></div>;
}

const MESA = 'https://www.gov.br/portos-e-aeroportos/pt-br/assuntos/transporte-aereo/minframanuallivro0607.pdf';
// Ranking geral do PMAJ, Produto 03, seção 3.3.2: posição, nota final, sítio e grupo que o indicou.
// V1 a V9 são os sítios numerados pelo grupo Vermelho; "mesmo" marca a área indicada também pelo outro grupo.
const ranking = [
  [1, 9.53, 'VP GV', 'roxo'], [2, 9.50, 'VP Arboville', 'roxo'], [3, 9.36, 'V7', 'vermelho'], [4, 9.19, 'V6', 'vermelho'],
  [5, 9.16, 'VP Crystal', 'roxo', 'A'], [6, 9.02, 'V8', 'vermelho'], [7, 9.01, 'VP Rodoviária', 'roxo', 'B'], [8, 8.95, 'VP Mário Covas', 'roxo'],
  [9, 8.82, 'V4', 'vermelho', 'A'], [10, 8.74, 'VP Lucas Nogueira', 'roxo'], [11, 8.44, 'V2', 'vermelho', 'B'], [12, 8.27, 'VP Lapalva', 'roxo'],
  [13, 8.27, 'VP Mirante do Vale', 'roxo'], [14, 7.50, 'VP Liberdade', 'roxo', 'C'], [15, 7.46, 'V5', 'vermelho', 'C'], [16, 7.25, 'VP Recanto dos Pássaros', 'roxo'],
  [17, 7.20, 'VP Villa Branca', 'roxo'], [18, 6.94, 'V1', 'vermelho'], [19, 6.50, 'VP Cristo', 'roxo'], [20, 6.25, 'V9', 'vermelho'],
];
// Exemplo didático de AHP com três critérios, na escala ímpar do Produto 03 (tab. 2.3); pesos pelo método da normalização.
const criterios = ['Segurança', 'Infraestrutura', 'Ruído'];
const matriz = [['1', '3', '5'], ['1/3', '1', '3'], ['1/5', '1/3', '1']];
const pesos = [0.633, 0.260, 0.106];
const decimal = (value, digits = 2) => value.toFixed(digits).replace('.', ',');

function RankChart() {
  const w = 760, row = 27.5, top = 34, left = 268, right = 70, min = 6, max = 10;
  const h = top + ranking.length * row + 12;
  const x = (v) => left + (w - left - right) * (v - min) / (max - min);
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Nota final dos 20 sítios da primeira rodada, do maior para o menor" className="dem-chart sit-rank">
    {[6, 7, 8, 9, 10].map((v) => <g key={v}><line x1={x(v)} x2={x(v)} y1={top - 8} y2={h - 8} className="dem-grid"/><text x={x(v)} y={20} textAnchor="middle" className="dem-axis">{v}</text></g>)}
    {ranking.map(([pos, nota, nome, grupo, mesmo], i) => { const y = top + i * row + row / 2; return <g key={pos}>
      <text x={14} y={y + 5} className="sit-rank-pos">{pos}</text>
      <text x={44} y={y + 5} className="sit-rank-name">{nome}{mesmo && <tspan className="sit-rank-tag"> ({mesmo})</tspan>}</text>
      <line x1={x(min)} x2={x(nota)} y1={y} y2={y} className="sit-rank-stem"/>
      <circle cx={x(nota)} cy={y} r="8" className={'sit-rank-dot sit-' + grupo}><title>{`${pos}º ${nome}: ${decimal(nota)}`}</title></circle>
      <text x={x(nota) + 14} y={y + 5} className="sit-rank-value">{decimal(nota)}</text>
    </g>; })}
  </svg>;
}
function SitePlan() {
  const s = 8, o = 20, side = 65 * s;
  const sq = (m, cls) => <rect x={o + (side - m * s) / 2} y={o + (side - m * s) / 2} width={m * s} height={m * s} className={cls}/>;
  const dim = (m, y, label) => { const x0 = o + (side - m * s) / 2, x1 = x0 + m * s; return <g className="sit-dim"><line x1={x0} x2={x1} y1={y} y2={y}/><line x1={x0} x2={x0} y1={y - 10} y2={y + 10}/><line x1={x1} x2={x1} y1={y - 10} y2={y + 10}/><text x={(x0 + x1) / 2} y={y - 10} textAnchor="middle">{label}</text></g>; };
  return <svg viewBox={`0 0 ${side + 2 * o} ${side + o + 150}`} role="img" aria-label="Planta do sítio mínimo: FATO de 30 m, área de segurança até 45 m e rampa lateral até 65 m de lado" className="sit-plan">
    {sq(65, 'sit-plan-ramp')}{sq(45, 'sit-plan-safety')}{sq(30, 'sit-plan-fato')}
    <text x={o + side / 2} y={o + side / 2 + 13} textAnchor="middle" className="sit-plan-label-in">FATO</text>
    <text x={o + side / 2} y={o + 52} textAnchor="middle" className="sit-plan-label">rampa lateral a 45°, até 10 m</text>
    <text x={o + side / 2} y={o + 10 * s + 40} textAnchor="middle" className="sit-plan-label">área de segurança</text>
    {dim(30, o + side + 44, '30 m = 2 CD')}{dim(45, o + side + 92, '45 m')}{dim(65, o + side + 140, '65 m')}
  </svg>;
}

export default function E11PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck vert-deck ops-deck dem-deck sit-deck">
    <Slide kicker="IT-214 · Mobilidade Aérea Urbana" title="Seleção de sítio: o caso de Jacareí" className="air-title-slide" notes="A aula segue o Plano de Mobilidade Aérea de Jacareí (PMAJ), feito pelo ITA com a Prefeitura de Jacareí em 2024 e 2025. Os arquivos circulam como PlanMob. O mapa da capa mostra os 20 sítios da primeira rodada, coloridos pela nota final.">
      <div className="vt-cover"><div><p className="air-lead">Como um plano municipal escolheu onde instalar vertiportos.</p><p>Critérios, AHP, ranking e restrições do plano feito pelo ITA com a Prefeitura de Jacareí.</p><div className="air-cover-meta">E11 · 20/10/2026<br/>Equipe docente IT-214</div></div><Media assetId="e11-sitios-nota" caption="Os 20 sítios da primeira rodada do PMAJ, pela nota final."/></div>
    </Slide>

    <Slide kicker="Contexto" step={0} title="Onde pousar em Jacareí?" source="Fonte: PMAJ, Produto 05, fig. 4.3 e seções 4.2 e 4.3 (ITA e Prefeitura de Jacareí, 2025), com dados do IBGE (2010)." notes="A legenda vai de 0 a 11 hab/ha (mais claro) até 48 a 62 hab/ha (mais escuro). As áreas mais densas ficam nas regiões Central, Sul e Leste. O plano diz que a região Central tem a maior demanda potencial, mas pouco espaço e mais impacto sonoro. Deixar a turma responder antes de seguir.">
      <div className="vt-split vt-split-even"><Media assetId="e11-pmaj-densidade" caption="Densidade populacional de Jacareí, em habitantes por hectare."/><div className="vt-col vt-col-gap"><Points items={[
        ['Onde há gente', 'O centro concentra moradores, comércio e viagens: é onde está a demanda.'],
        ['Onde há problema', 'É também onde falta área livre e onde o ruído incomoda mais gente.'],
        ['O que já vimos', 'Superfícies de proteção na E09 e demanda na E10. Agora, as duas entram na escolha do lugar.'],
      ]}/><p className="vt-conclusion">Os senhores colocariam o vertiporto no centro ou na borda da cidade?</p></div></div>
    </Slide>

    <Slide kicker="Contexto" step={0} title="Jacareí" source="Fonte: PMAJ, Produto 05, seções 4.1 a 4.3 e fig. 4.2 (ITA e Prefeitura de Jacareí, 2025), com dados do IBGE." notes="População estimada pelo IBGE para 2024; IDH-M calculado com dados de 2021. A distância de 24 km até o SBSJ é a informada no plano. As oito regiões administrativas são as da Lei Municipal nº 5.867/2014, de uso e ocupação do solo. Rodovias: Dutra (BR-116), Ayrton Senna e Carvalho Pinto (SP-070), Dom Pedro I (SP-065), SP-066 e SP-077.">
      <div className="vt-split vt-split-even"><Media assetId="e11-pmaj-regioes" caption="As oito regiões administrativas do município."/><div className="vt-col vt-col-gap"><Hero className="sit-hero-grid" items={[['249.968', 'habitantes em 2024'], ['464 km²', 'de área'], ['24 km', 'até o aeroporto de São José dos Campos (SBSJ)'], ['0,777', 'IDH-M, elevado']]}/>
      <p className="vt-conclusion">Entre São Paulo e Rio, cortada pela Dutra e pela Carvalho Pinto, com indústria a leste e a oeste.</p></div></div>
    </Slide>

    <Slide kicker="Contexto" step={0} title="O plano de mobilidade aérea" source="Fonte: PMAJ, Produtos 01 a 05 (ITA e Prefeitura de Jacareí, 2024–2025)." notes="Coordenação do Prof. Marcelo Xavier Guterres. A Secretaria de Mobilidade Urbana (SEMOB) participou de todas as etapas. Os relatórios são técnicos e não estão na Biblioteca da disciplina. A aula usa sobretudo o Produto 03 (método e primeira rodada) e o Produto 05 (plano final).">
      <div className="dem-road sit-road"><article><i>01</i><h3>Plano de trabalho</h3><p>Equipe, dados da pesquisa origem-destino e cronograma.</p></article><article><i>02</i><h3>Fundamentos</h3><p>Modelagem de transportes, UAM e revisão de leis e normas, em três volumes.</p></article><article className="sit-road-on"><i>03</i><h3>Seleção de sítios</h3><p>Critérios, AHP com a Prefeitura e ranking dos sítios.</p><b>base desta aula</b></article><article><i>04</i><h3>Diagnóstico</h3><p>Análise SWOT, bases de dados e painel da matriz origem-destino.</p></article><article className="sit-road-on"><i>05</i><h3>Plano final</h3><p>Áreas de exclusão, sítios em estudo, ruído, corredores e licenças.</p><b>base desta aula</b></article></div>
    </Slide>

    <Slide kicker="Método" step={1} title="Da MESA ao vertiporto" source="Fonte: SAC/MInfra (2021), Manual de Apoio à Prospecção de Sítios Aeroportuários Regionais; Alves et al. (2020); PMAJ, Produto 03, cap. 1 e 2." notes="A MESA, Metodologia de Escolha de Sítios Aeroportuários, foi desenvolvida pela SAC com o ITA para aeroportos regionais e publicada pela Portaria nº 837/2021. O artigo de Alves et al. (2020) descreve o método; entre os autores estão os professores Guterres e Peres, da disciplina. No PMAJ, os critérios foram ajustados para eVTOL e drones, e os técnicos da Prefeitura passaram por um seminário em 14/08/2024 antes de indicar as áreas.">
      <div className="vt-split vt-split-narrow"><Media assetId="e11-mesa-manual" caption="Manual da SAC, aprovado pela Portaria nº 837/2021."/><div className="vt-col vt-col-gap"><Steps items={[
        ['Revisão', 'Critérios de escolha de sítio na literatura.'],
        ['Sistematização', 'Separar critérios eliminatórios e critérios de pontuação.'],
        ['Eliminação', 'Limites que excluem as áreas inviáveis.'],
        ['Pontuação', 'Ordenar as áreas restantes com AHP e SIG.'],
      ]}/><p className="vt-conclusion">No PMAJ, a MESA foi adaptada para vertiportos, e quem indicou as áreas foram os técnicos da Prefeitura.</p><a className="sit-link" href={MESA} target="_blank" rel="noreferrer"><b>Abrir o manual da MESA ↗</b><span>gov.br/portos-e-aeroportos</span></a></div></div>
    </Slide>

    <Slide kicker="Método" step={1} title="Quanto espaço o sítio precisa" source="Fonte: PMAJ, Produto 03, seção 2.1, fig. 2.2 e 2.3 e tab. 2.1, com base no Alerta ANAC nº 001/2023, no RBAC 155, na FAA (EB 105A) e na EASA (PTS-VPT-DSN)." notes="CD é a envergadura da aeronave crítica. A ANAC recomenda, por enquanto, seguir os requisitos de helipontos do RBAC 155 com as adaptações necessárias. Conta: FATO de 2 × 15 = 30 m; área de segurança de 0,5 × 15 = 7,5 m de cada lado, total de 45 m; rampa lateral de 45° até 10 m de altura, mais 10 m de cada lado, total de 65 m. Na E07, o mesmo raciocínio mostrou que o heliponto do HC não comporta a aeronave de referência.">
      <div className="vt-split vt-split-even"><figure className="dem-figure"><SitePlan/></figure><div className="vt-col vt-col-gap"><Hero items={[['15 m', 'envergadura (CD) adotada'], ['65 × 65 m', 'área livre mínima']]}/><Table className="dem-table" head={['Componente', 'EASA', 'FAA']} rows={[
        ['FATO', '1,5 CD', '2 CD'],
        ['TLOF', '0,83 CD', '1 CD'],
        ['Área de segurança', '0,25 CD', '0,5 CD'],
      ]}/><p className="vt-conclusion">O PMAJ usou os valores da FAA, os mais exigentes.</p></div></div>
    </Slide>

    <Slide kicker="Método" step={1} title="Oito critérios" source="Fonte: PMAJ, Produto 03, tab. 2.2; critérios detalhados no Produto 02, vols. II e III." notes="Os critérios vieram da revisão de literatura, de CONOPs e das leis municipais, federais e aeronáuticas. A lista foi apresentada na conferência da Air Transport Research Society de 2024, em Lisboa (Souza et al., 2024). Os limites de ruído são os do plano de zoneamento de ruído de helipontos.">
      <div className="sit-criteria"><article><h3>Infraestrutura disponível</h3><p>Rede elétrica, vias, água, esgoto, drenagem e iluminação já no local.</p></article><article><h3>Ruído</h3><p>55 dB(A) de dia e 50 dB(A) à noite; até 75 dB a 100 m da FATO e 65 dB entre 100 e 300 m.</p></article><article><h3>Acessibilidade</h3><p>Servido por outros modos de transporte, vias e estacionamento.</p></article><article><h3>Privacidade</h3><p>Pouso e decolagem longe de terceiros, sem proibição de operar no local.</p></article><article><h3>Eficiência</h3><p>Aproveita o sistema viário e fica perto dos polos geradores de viagens.</p></article><article><h3>Horas de operação</h3><p>Horário de funcionamento e áreas de acesso restrito ou controlado.</p></article><article><h3>Impacto ambiental</h3><p>Equilíbrio ambiental e preservação.</p></article><article><h3>Segurança</h3><p>Segurança dos cidadãos, uso do solo do Plano Diretor e menos conflito entre pedestres e veículos.</p></article></div>
    </Slide>

    <Slide kicker="Método" step={1} title="Quem indicou os sítios" source="Fonte: PMAJ, Produto 03, seção 2.3 e fig. 2.4 (ITA e Prefeitura de Jacareí, 2025)." notes="A atividade foi feita on-line em 26/08/2024. As áreas foram desenhadas como polígonos no Google Maps, com as notas registradas na descrição de cada ponto. Os grupos receberam os nomes Roxo e Vermelho; a equipe do ITA não indicou áreas, mas participou dos julgamentos do AHP.">
      <div className="vt-split vt-split-even"><Media assetId="e11-pmaj-macrozonas" caption="As quatro macrozonas urbanas, uma cor para cada."/><div className="vt-col vt-col-gap"><Steps items={[
        ['Grupos', 'Seis técnicos da SEMOB, em dois grupos de três: Roxo e Vermelho.'],
        ['Indicação', 'Pelo menos três áreas em cada macrozona, sobre imagem de satélite.'],
        ['Notas', 'De 1 (não atende) a 10 (atende plenamente) em cada critério, por consenso.'],
        ['Revisão', 'Os grupos comparam as áreas e ajustam as notas.'],
      ]}/><Hero items={[['20', 'sítios indicados'], ['8', 'critérios por sítio']]}/></div></div>
    </Slide>

    <Slide kicker="Método" step={1} title="AHP: comparar dois a dois" source="Fonte: exemplo didático da equipe docente com o método do PMAJ, Produto 03, seção 2.4 e tab. 2.3 e 2.4; Saaty (2008)." notes="Conta do exemplo. Soma das colunas: 1,53; 4,33; 9. Cada célula é dividida pela soma da sua coluna, e a média de cada linha é o peso: 0,63; 0,26; 0,11. λmax = 3,039; CI = (3,039 − 3)/2 = 0,019; RI = 0,58 para três critérios; CR = 0,033. No PMAJ, com oito critérios, cada especialista julgou 28 pares numa planilha, e o RI é 1,41.">
      <div className="vt-split vt-split-even"><div className="vt-col vt-col-gap"><table className="sit-matrix"><thead><tr><th></th>{criterios.map((name) => <th key={name}>{name}</th>)}<th>Peso</th></tr></thead><tbody>{criterios.map((name, row) => <tr key={name}><th>{name}</th>{matriz[row].map((cell, col) => <td key={col} className={row === col ? 'sit-diag' : ''}>{cell}</td>)}<td className="sit-weight"><i style={{ width: `${pesos[row] * 100}%` }}/><b>{decimal(pesos[row])}</b></td></tr>)}</tbody></table>
        <p className="sit-scale"><b>Escala:</b> 1 igual · 3 moderadamente · 5 mais · 7 fortemente · 9 extremamente mais importante. Quando é menos importante, o inverso: 1/3, 1/5…</p></div>
      <div className="vt-col vt-col-gap"><Steps items={[
        ['Compare', 'Segurança é moderadamente mais importante que infraestrutura: 3. A célula oposta recebe 1/3.'],
        ['Normalize', 'Divida cada célula pela soma da sua coluna.'],
        ['Pese', 'A média de cada linha é o peso do critério.'],
        ['Confira', 'Razão de consistência CR = CI / RI abaixo de 10%.'],
      ]}/><Hero items={[['0,63', 'peso da segurança'], ['3,3%', 'CR do exemplo']]}/></div></div>
    </Slide>

    <Slide kicker="Método" step={1} title="Os pesos dos especialistas" source="Fonte: PMAJ, Produto 03, fig. 3.2 e seções 3.1 e 3.2 (ITA e Prefeitura de Jacareí, 2025)." notes="Os valores citados foram lidos no gráfico; o relatório não traz a tabela de pesos. O peso médio de cada grupo é a média aritmética dos vetores de prioridade dos especialistas do grupo. Pergunta: por que técnicos de uma prefeitura dariam menos peso à eficiência que pesquisadores?">
      <div className="vt-split vt-split-wide"><Media assetId="e11-pmaj-pesos" caption="Peso médio de cada critério nos três grupos: ITA, Roxo e Vermelho."/><Points items={[
        ['Dez especialistas', 'Os técnicos da SEMOB e a equipe do ITA, em três grupos.'],
        ['Segurança primeiro', 'É o critério de maior peso nos três grupos.'],
        ['Depois', 'Infraestrutura disponível vem logo atrás; o grupo Vermelho deu mais peso à acessibilidade.'],
        ['Divergência', 'A eficiência pesa cerca de 0,2 para o ITA e 0,1 ou menos para os grupos da Prefeitura.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Método" step={1} title="A nota de cada sítio" source="Fonte: exemplo didático da equipe docente, com notas inventadas e os pesos do slide anterior; PMAJ, Produto 03, seção 2.5, eq. 2.7." notes="Conta do sítio A: 0,633 × 6 + 0,260 × 9 + 0,106 × 4 = 6,57. Sítio B: 0,633 × 9 + 0,260 × 5 + 0,106 × 8 = 7,85. No PMAJ, cada sítio recebe uma nota com os pesos de cada grupo (ITA, Roxo e Vermelho), e a nota final é a média das três.">
      <div className="vt-col vt-col-gap"><div className="ops-eq sit-eq"><p>S = Σ w<sub>k</sub> × C<sub>k</sub></p><span>nota do sítio = soma, em todos os critérios, do peso do critério vezes a nota do sítio nesse critério</span></div>
      <Table className="dem-table sit-score" head={['Critério', 'Peso', 'Sítio A, no centro', 'Sítio B, na borda']} rows={[
        ['Segurança', '0,63', '6', '9'],
        ['Infraestrutura', '0,26', '9', '5'],
        ['Ruído', '0,11', '4', '8'],
        ['Nota', '', '6,57', '7,85'],
      ]}/><p className="vt-conclusion">Com estes pesos, a área da borda vence, mesmo com menos infraestrutura. Mudam os pesos, muda o vencedor.</p></div>
    </Slide>

    <Slide kicker="Primeira rodada" step={2} title="Ranking dos 20 sítios" source="Fonte: figuras da equipe docente com a tabela do ranking geral do PMAJ, Produto 03, seção 3.3.2; mapa com dados © colaboradores do OpenStreetMap." notes="Os sete primeiros ficam entre 9,0 e 9,5: diferença pequena para decidir sozinha. As letras marcam a mesma área indicada pelos dois grupos: (A) VP Crystal e V4, (B) VP Rodoviária e V2, (C) VP Liberdade e V5, a menos de 25 m uma da outra. O mesmo lugar recebeu notas diferentes, porque cada grupo deu as suas notas por critério. Roxo em roxo, Vermelho em vermelho.">
      <div className="vt-split vt-split-even"><figure className="dem-figure"><RankChart/><figcaption>Nota final, de 6 a 10. Letras iguais: mesma área, indicada pelos dois grupos.</figcaption></figure><Media assetId="e11-sitios-nota" caption="Os mesmos 20 sítios no mapa, pela nota final."/></div>
    </Slide>

    <Slide kicker="Primeira rodada" step={2} title="Onde estão as viagens" source="Fonte: PMAJ, Produto 03, fig. 3.5 e 3.7 e seção 3.4, com a matriz origem-destino de Jacareí; mapa-base © colaboradores do OpenStreetMap e CARTO." notes="É a etapa P6 do método: sobrepor os sítios aos mapas da matriz origem-destino do município, na hora-pico. O primeiro mapa mostra a atração de viagens em transporte individual por zona; o segundo, o número de empregos. Mesma ideia da E10, agora dentro da cidade.">
      <div className="vt-col vt-col-gap"><div className="vt-split vt-split-even ops-case-pair"><Media assetId="e11-pmaj-atracao" caption="Viagens atraídas por zona, em transporte individual."/><Media assetId="e11-pmaj-empregos" caption="Empregos por zona."/></div>
      <p className="vt-conclusion">A maioria dos sítios fica nas zonas com mais viagens e empregos: o centro e os eixos viários.</p></div>
    </Slide>

    <Slide kicker="Intervalo" title="Intervalo de 10 minutos" className="air-title-slide" notes="Retomar com o filtro que transforma a lista de sítios numa rede."><div/></Slide>

    <Slide kicker="Primeira rodada" step={2} title="Da lista à rede" source="Fonte: figura da equipe docente com o critério e a tabela do PMAJ, Produto 03, cap. 4; mapa com dados © colaboradores do OpenStreetMap." notes="Refazendo o filtro com as coordenadas da tabela, sobram os sítios 1, 2, 6, 13, 16 e 20. O tempo de carro entre os sítios foi estimado com o OSRM. Na matriz origem-destino, o fluxo mais intenso para São José dos Campos sai da microrregião do sítio 13. O fator de 0,5% vem da literatura citada no relatório e serve só para uma primeira ordem de grandeza.">
      <div className="vt-split vt-split-even"><Media assetId="e11-rede-4km" caption="Sítios mantidos e raio de 4 km em volta de cada um."/><Points items={[
        ['Filtro de 4 km', 'Sai o sítio que tem outro, de nota maior, a menos de 4 km. Sobram seis.'],
        ['Área livre', 'Os seis têm hoje um quadrado livre de obstáculos de pelo menos 65 m × 65 m.'],
        ['Fluxos', 'Viagens na hora-pico entre as microrregiões dos sítios, São José dos Campos e o Vale do Paraíba.'],
        ['Quanto vai para o ar', 'Incerto. Estudos iniciais usam fatores fixos da ordem de 0,5% das viagens.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Análise do sítio" step={3} title="Exclusão primeiro" source="Fonte: PMAJ, Produto 05, cap. 8 e fig. 8.5 (ITA e Prefeitura de Jacareí, 2025); Mladenović et al. (2024)." notes="A primeira rodada partiu do julgamento dos técnicos. O plano final acrescentou camadas de SIG que eliminam áreas antes de pontuar. A superfície horizontal externa do SBSJ, a 145 m, cobre a parte leste do município, onde fica o centro: é a mesma família de superfícies vista na E09. O CITYAM, na Biblioteca, propõe o mesmo para drones na Europa: restrições primeiro, depois a soma ponderada no QGIS.">
      <div className="vt-split vt-split-even"><div className="vt-col vt-col-gap"><Steps items={[
        ['Ambiente', 'Cursos d’água, APPs, áreas de conservação e relevo muito acidentado.'],
        ['Infraestrutura', 'Rodovias e linhas de transmissão, que limitam a altura e o uso do solo.'],
        ['Espaço aéreo', 'Superfícies de proteção do SBSJ e rotas especiais de aviões e helicópteros.'],
        ['Sítios', 'Procura-se o vertiporto só no que sobra do mapa.'],
      ]}/><p className="vt-conclusion">Mesma lógica do CITYAM (2024): restrições primeiro, critérios ponderados depois.</p></div><Media assetId="e11-pmaj-sbsj" caption="Superfície horizontal externa do SBSJ (H = 145 m) sobre Jacareí."/></div>
    </Slide>

    <Slide kicker="Análise do sítio" step={3} title="Áreas de exclusão e área viável" source="Fonte: PMAJ, Produto 05, seção 8.4 e fig. 8.6 e 8.7 (ITA e Prefeitura de Jacareí, 2025)." notes="No primeiro mapa, o vermelho junta todas as camadas de exclusão. No segundo, a área viável do VP Rodoviária: o círculo de 100 m de raio delimita a zona de segurança, e os fixos marcam onde a aeronave entra e sai. Ligar com a E08: a posição dos fixos depende do vento e dos obstáculos.">
      <div className="vt-col vt-col-gap"><div className="vt-split vt-split-even ops-case-pair"><Media assetId="e11-pmaj-exclusao" caption="Áreas de exclusão, em vermelho, no centro de Jacareí."/><Media assetId="e11-pmaj-area-viavel" caption="Área viável: raio de 100 m e fixos de chegada e saída."/></div>
      <p className="vt-conclusion">O sítio deixa de ser um ponto no mapa: vira uma área com raio de segurança e direções de chegada e saída.</p></div>
    </Slide>

    <Slide kicker="Análise do sítio" step={3} title="Quatro vertiportos em estudo" source="Fonte: PMAJ, Produto 05, cap. 13 e fig. 13.1; posições do ranking geral do Produto 03, seção 3.3.2 (ITA e Prefeitura de Jacareí, 2025)." notes="Os quatro nomes já estavam na lista da primeira rodada. O plano final diz que foram escolhidos com base nos critérios do cap. 8 (exclusões, infraestrutura e espaço aéreo) e lembra que a primeira rodada era preliminar. Deixar a turma levantar hipóteses: integração com o terminal rodoviário, área disponível, proximidade de São José dos Campos, exclusões que derrubaram sítios do topo.">
      <div className="vt-split vt-split-even"><Media assetId="e11-pmaj-quatro-vp" caption="Os quatro vertiportos, com torres, rodovias, cursos d’água e APPs."/><div className="vt-col vt-col-gap"><Table className="dem-table" head={['Vertiporto', 'Onde', '1ª rodada']} rows={[
        ['VP Rodoviária', 'Terminal rodoviário intermunicipal', '7º · 9,01'],
        ['VP Mário Covas', 'Av. Gov. Mário Covas, entre o centro e o norte', '8º · 8,95'],
        ['VP Liberdade', 'Jardim Liberdade, região central', '14º · 7,50'],
        ['VP Villa Branca', 'Villa Branca, divisa com São José dos Campos', '17º · 7,20'],
      ]}/><p className="vt-conclusion">Por que o plano final estudou sítios que não lideravam o ranking?</p></div></div>
    </Slide>

    <Slide kicker="Análise do sítio" step={3} title="Rampa de 12,5% sobre o relevo" source="Fonte: PMAJ, Produto 05, seção 13.1 e fig. 13.4 e 13.5 (ITA e Prefeitura de Jacareí, 2025)." notes="Rampa de 12,5% até 152 m de altura: 1.220 m × 0,125 = 152 m, a mesma da FAA vista na E09. No mapa, a escala de cor da superfície vai de 0 a 152 m. No perfil, a linha vermelha é a superfície e a verde, o relevo ao longo de um corredor: se a verde cruzar a vermelha, há obstáculo natural. O VP Liberdade fica em área densa, mas fora das zonas de exclusão.">
      <div className="vt-split vt-split-even"><Media assetId="e11-pmaj-rampa-liberdade" caption="VP Liberdade: superfície de aproximação e decolagem, raio de 1.220 m."/><div className="vt-col vt-col-gap"><div className="sit-fill"><Media assetId="e11-pmaj-perfil-liberdade" caption="Perfil de um corredor: superfície em vermelho, relevo em verde."/></div><Points items={[
        ['Rampa', '12,5% até 152 m de altura, num raio de 1.220 m.'],
        ['Teste', 'O relevo precisa ficar abaixo da superfície em todo o corredor.'],
      ]}/></div></div>
    </Slide>

    <Slide kicker="Análise do sítio" step={3} title="Ruído: curvas de 75 e 65 dB" source="Fonte: PMAJ, Produto 05, seção 13.5 e fig. 13.15 e 13.16 (ITA e Prefeitura de Jacareí, 2025), por analogia com o RBAC 161 da ANAC." notes="Sem norma de ruído para vertiporto, o plano usou a de helipontos: curva de 75 dB com 100 m de raio e de 65 dB com 300 m, a partir do centro do vertiporto. Pedir à turma que compare o que fica dentro das curvas: lotes residenciais em rosa, escolas e postos de saúde. Ruído volta com mais detalhe na E14, em 10/11.">
      <div className="vt-col vt-col-gap"><div className="vt-split vt-split-even ops-case-pair"><Media assetId="e11-pmaj-ruido-liberdade" caption="VP Liberdade: curvas de 75 dB (100 m) e 65 dB (300 m)."/><Media assetId="e11-pmaj-ruido-rodoviaria" caption="VP Rodoviária: as mesmas curvas."/></div>
      <p className="vt-conclusion">Mesmas curvas, vizinhanças diferentes: o que fica dentro de cada círculo?</p></div>
    </Slide>

    <Slide kicker="Análise do sítio" step={3} title="Corredores e espaço aéreo" source="Fonte: PMAJ, Produto 05, cap. 12 e fig. 14.1; Produto 03, cap. 4, com cartas do DECEA (ITA e Prefeitura de Jacareí, 2025)." notes="Ligar com a E06. CTR é a zona de controle do aeródromo; FIR, a região de informação de voo. Na classe D, todo voo precisa de autorização e contato com o controle; na classe G, não. O desvio pelo rio aumenta a distância até Aparecida de 87 km para 100 km, mas segue o rio, que serve de referência visual para a navegação.">
      <div className="vt-split vt-split-even"><Media assetId="e11-pmaj-corredores" caption="Proposta de corredores urbanos entre os quatro vertiportos."/><Points items={[
        ['CTR São José', 'Jacareí fica na ponta sudoeste da zona de controle do SBSJ, classe D, até 5.500 ft: todo voo depende do controle.'],
        ['Classe G ao lado', 'A FIR Curitiba, não controlada, fica perto: os voos vão alternar os dois regimes.'],
        ['Corredor visual', 'Há uma rota especial de aviões entre o norte de Jacareí e Aparecida, de 3.500 a 5.500 ft.'],
        ['Rota pelo rio', 'Até Aparecida, pelo Paraíba: 100 km, contra 87 km em linha reta.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Análise do sítio" step={3} title="O sítio na lei da cidade" source="Fonte: PMAJ, Produto 03, cap. 5, e Produto 05, seções 4.5 e 6.2 e cap. 7 (ITA e Prefeitura de Jacareí, 2025); Lei nº 10.257/2001 (Estatuto da Cidade)." notes="Plano Diretor de Jacareí: Lei Complementar nº 49/2003. Uso e ocupação do solo: Lei nº 5.867/2014, que já exige RIT de novos empreendimentos. RIT regulamentado pelo Decreto nº 972/2020. O plano propõe incluir a UAM nesses instrumentos, em vez de criar outros.">
      <div className="vt-col vt-col-gap"><div className="sit-law"><article><b>Plano Diretor e uso do solo</b><p>Reservar áreas para vertiportos e definir onde podem ficar.</p></article><article><b>RIT</b><p>Relatório de Impacto de Trânsito: acesso de carro, táxi e aplicativo, estacionamento, ônibus e pedestres.</p></article><article><b>EIV</b><p>Estudo de Impacto de Vizinhança: ruído, paisagem, valor dos imóveis, segurança e audiência pública.</p></article></div>
      <p className="vt-conclusion">O vertiporto vira um polo gerador de viagens, e o licenciamento municipal precisa tratá-lo assim.</p></div>
    </Slide>

    <Slide kicker="Próximos passos" title="Próximos encontros" notes="A equipe confirma pelo grupo da disciplina qualquer mudança de calendário.">
      <div className="vt-next sit-next"><article><b>20/10, até 23h59</b><p>Entrega da atividade da matriz origem-destino.</p></article><article><b>27/10 · CP3</b><p>Entrega do Artigo 3, com metodologia e resultados preliminares.</p></article><article><b>03/11</b><p>Aula do Dr. Harley: processamento de imagens obtidas por drones e aplicações práticas.</p></article><article><b>10/11</b><p>Ruído aeronáutico e aceitação social.</p></article><article><b>17/11</b><p>Entrega do artigo final e aula sobre submissão, com o Prof. Rodrigo.</p></article><article><b>24/11 · CP4</b><p>Apresentação final.</p></article></div>
    </Slide>

    <Slide kicker="Referências" title="Referências" notes="Os relatórios do PMAJ são técnicos e não estão na Biblioteca da disciplina.">
      <ul className="vt-refs vt-refs-large">{presentation.references.map((reference) => <li key={reference.shortTitle}>{reference.citation}{reference.url && <> <a href={reference.url} target="_blank" rel="noreferrer">{reference.url.replace('https://', '')}</a></>}</li>)}
        <li>Guterres, M. X. (coord.). Plano de Mobilidade Aérea de Jacareí — Produto 03: seleção de sítios vertiportuários, primeira rodada. São José dos Campos: ITA; Jacareí: Prefeitura Municipal, 2025. Relatório técnico.</li>
        <li>Guterres, M. X. (coord.). Plano de Mobilidade Aérea de Jacareí — Produto 05: plano municipal de mobilidade urbana aérea. São José dos Campos: ITA; Jacareí: Prefeitura Municipal, 2025. Relatório técnico.</li>
      </ul>
    </Slide>

    <Slide kicker="Materiais" title="Documentos para download" notes="O manual da MESA está no portal do Ministério de Portos e Aeroportos. Os relatórios do PMAJ não são distribuídos.">
      <div className="vt-col vt-col-gap"><a className="sit-link" href={MESA} target="_blank" rel="noreferrer"><b>Manual da MESA, SAC/MInfra ↗</b><span>gov.br/portos-e-aeroportos</span></a><div className="dem-fill"><ReadingList ids={['cityam-2024-geospatial-lls', 'faa-2024-eb-105a-vertiport-design', 'easa-2022-vertiport-design-pts', 'it214-2026-2-plano-ensino']}/></div></div>
    </Slide>
  </PresentationDeck>;
}
