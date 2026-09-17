import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
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
// Conteúdo de trabalhos internos da equipe (não publicados): fica em .private/, fora do Git,
// e só entra no build local. Builds do GitHub Pages nunca o carregam.
const internalDir = path.join(process.cwd(), '.private', 'aulas', 'e08-interno');
const internal = loadInternal();
export const metadata = { title: presentation.title, description: presentation.subtitle };

function loadInternal() {
  if (process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true') return null;
  const file = path.join(internalDir, 'conteudo.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
}
function internalImage(name) {
  const type = name.endsWith('.png') ? 'png' : 'jpeg';
  return `data:image/${type};base64,${fs.readFileSync(path.join(internalDir, name)).toString('base64')}`;
}

function Trail({ current }) {
  return <span className="ops-trail">{steps.map((name, index) => <span key={name} className={index === current ? 'ops-trail-on' : index < current ? 'ops-trail-done' : ''}>{index + 1}. {name}</span>)}</span>;
}
function Slide({ kicker, title, step, bridge, source, notes, children, className = '', anchor, isInternal = false }) {
  if (anchor && internal?.slides.some((item) => item.at === anchor && item.replaces)) return null;
  return <section className={'air-slide ' + className + (isInternal ? ' ops-internal' : '')} {...(isInternal ? { 'data-uso-interno': 'true' } : {})}><header><div className="air-kicker">{kicker}<span className="ops-kicker-right">{isInternal && <span className="ops-badge">Uso interno · não publicado</span>}{step !== undefined && <Trail current={step}/>}</span></div><h2>{title}</h2></header><div className="air-body">{children}</div>{bridge && <p className="ops-bridge">→ {bridge}</p>}{source && <footer>{source}</footer>}<aside className="notes">{notes}</aside></section>;
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

function InternalMedia({ name, caption, fit = 'contain' }) {
  return <figure className={'air-media vt-media vt-fit-' + fit}><div className="ops-frame"><Image src={internalImage(name)} alt={caption} fill sizes="60vw" unoptimized style={{ objectFit: fit }} /></div><figcaption><b>{caption}</b><span>Trabalho da equipe · não publicado</span></figcaption></figure>;
}
function heatColor(value) {
  const t = Math.min(1, Math.max(0, (value - 40) / 50));
  const mix = (a, b) => Math.round(a + (b - a) * t);
  return { background: `rgb(${mix(230, 11)}, ${mix(244, 52)}, ${mix(248, 80)})`, color: t > 0.55 ? '#fff' : '#0b3450' };
}
function InternalBody({ item }) {
  const conclusion = item.conclusion && <p className="vt-conclusion">{item.conclusion}</p>;
  const note = item.note && <p className="vt-note">{item.note}</p>;
  if (item.layout === 'media-points') return <div className="vt-split vt-split-wide"><InternalMedia name={item.image} caption={item.caption} fit={item.imageFit}/><div className="vt-col vt-col-gap"><Points items={item.points}/>{conclusion}</div></div>;
  if (item.layout === 'media-table') return <div className={'vt-split ' + (item.wide ? 'ops-split-media-wide' : 'ops-split-media')}><InternalMedia name={item.image} caption={item.caption}/><div className="vt-col vt-col-gap"><Table className="ops-compact" head={item.table.head} rows={item.table.rows}/>{note}{conclusion}</div></div>;
  if (item.layout === 'meteo') return <div className="vt-split vt-split-even"><div className="ops-heat"><h3>{item.grid.title}</h3><div className="ops-heat-grid" style={{ gridTemplateColumns: `110px repeat(${item.grid.cols.length}, 1fr)` }}><span/>{item.grid.cols.map((col) => <b key={col}>{col}</b>)}{item.grid.rows.map((row, r) => [<i key={row}>{row}</i>, ...item.grid.values[r].map((value, c) => <span key={row + c} style={heatColor(value)}>{value.toFixed(1).replace('.', ',')}</span>)])}</div></div><Points items={item.points}/></div>;
  if (item.layout === 'table-cards') return <div className="vt-col vt-col-gap"><Table className="ops-compact" head={item.table.head} rows={item.table.rows}/><div className="vt-cards vt-cards-2 ops-cards-low">{item.cards.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div>;
  if (item.layout === 'timeline') {
    const total = item.timeline.segments.reduce((sum, [, minutes]) => sum + minutes, 0);
    return <div className="vt-col vt-col-gap"><div className="ops-timeline"><span className="ops-tl-end">{item.timeline.start}</span><div className="ops-tl-bar">{item.timeline.segments.map(([label, minutes], index) => <div key={label} className={'ops-tl-seg ops-tl-' + index} style={{ flexGrow: minutes / total }}><b>{minutes} min</b><span>{label}</span></div>)}</div><span className="ops-tl-end">{item.timeline.end}</span></div><p className="vt-note">{item.timeline.note}</p><div className="vt-split vt-split-even"><Points items={item.points}/><div className="vt-col vt-col-gap">{conclusion}</div></div></div>;
  }
  if (item.layout === 'phases') return <div className="vt-split vt-split-even"><Points items={item.points}/><div className="ops-phases"><h3>Resposta a emergência com baterias</h3><ol>{item.phases.map(([title, text]) => <li key={title}><strong>{title}</strong><p>{text}</p></li>)}</ol></div></div>;
  return <div className="vt-cards vt-cards-grid">{item.cards.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>;
}
function Internal({ at }) {
  if (!internal) return null;
  return <>{internal.slides.filter((item) => item.at === at).map((item) => createElement(Slide, { key: item.title, kicker: item.kicker, title: item.title, step: item.step, bridge: item.bridge, source: item.source, notes: item.notes, isInternal: true }, <InternalBody item={item}/>))}</>;
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
    <Internal at="apos-elementos"/>

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
    <Internal at="apos-arranjos"/>

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
    <Internal at="apos-vento"/>

    <Slide anchor="arranjo-gimpo" kicker="Arranjo" step={1} title="Gimpo: o mesmo terreno pela FAA e pela EASA" bridge="Mais pads e gates no mesmo terreno significam mais passageiros. Como estimar esse número?" source="Fonte: Ahn e Hwang (2022), figs. 17a e 18a e tabs. 7 e 8, com critérios da minuta do FAA EB 105 e da EASA (2022)." notes="Aeronave de projeto: Hyundai S-A1, 15 × 10,7 m; D = 18,4 m (diagonal). O artigo considera 4 passageiros por aeronave e converte a capacidade de 15 minutos para uma hora. As figuras mostram o arranjo linear; a tabela, o melhor arranjo encontrado para cada norma.">
      <div className="vt-split ops-split-cases"><div className="ops-pair-tight"><Media assetId="e08-ahn-gimpo-faa" caption="Arranjo linear, FAA: área de segurança de 55,2 m e 2 pads."/><Media assetId="e08-ahn-gimpo-easa" caption="Arranjo linear, EASA: área de segurança de 32,2 m e 3 pads."/></div>
        <div className="vt-col vt-col-gap"><Table head={['Melhor arranjo no mesmo terreno', 'Pads', 'Gates', 'Passageiros/h']} rows={[
          ['FAA: pier', '2', '12', '192'],
          ['EASA: satélite', '4', '18', '256'],
        ]}/>
        <p className="vt-conclusion">Com a área de segurança menor da EASA, o mesmo estacionamento atendeu 33% mais passageiros por hora.</p></div></div>
    </Slide>
    <Internal at="arranjo-gimpo"/>

    <Slide kicker="Capacidade" step={2} title="Capacidade e throughput não são a mesma coisa" source="Fonte: Guerreiro et al. (2020), seção III.A e conclusão; Preis (2023)." notes="Throughput pode ser traduzido como vazão: o que de fato passou pelo vertiporto.">
      <div className="vt-split vt-split-even"><Points items={[
        ['Capacidade', 'Quantas operações o vertiporto comporta num período, dadas certas hipóteses.'],
        ['Throughput', 'Quantas operações de fato aconteceram no período.'],
        ['Limitado por pads ou por vagas', 'O recurso que se esgota primeiro define a capacidade do vertiporto.'],
        ['Programação por ordem de chegada', 'Deixa intervalos curtos demais para usar: na simulação da NASA, o throughput ficou 16% a 22% abaixo da capacidade.'],
      ]}/><div className="vt-col vt-col-gap"><div className="ops-calc"><h3>Outro indicador: área por passageiro por hora</h3><p>VoloCity (cenário de referência): <b>188 m²</b></p><p>CityAirbus, 7,92 m de diâmetro: <b>46,3 m²</b></p><p>Archer Maker, 12,2 m de diâmetro: <b>221 m²</b></p></div><p className="vt-note">Preis (2023): aeronaves menores ocupam menos área por passageiro transportado.</p></div></div>
    </Slide>
    <Internal at="apos-capacidade"/>

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
    <Internal at="apos-turnaround"/>

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

    <Slide anchor="recarga-seguranca" kicker="Recarga" step={3} title="Segurança da recarga" bridge="Com a aeronave pronta para voar, falta o outro lado do vertiporto: passageiros e carga." source="Fonte: FAA (2024), EB 105A, seções 3.1, 5.0 e 5.1." notes="O tema volta na E14 (energia, recarga e combate a incêndio).">
      <div className="vt-split vt-split-even"><Points items={[
        ['Armazenamento de baterias', 'Longe de TLOF, FATO e área de segurança e fora das superfícies de aproximação e decolagem.'],
        ['Propagação térmica', 'O risco de uma bateria em chamas atingir aeronaves vizinhas pode exigir maior afastamento entre posições.'],
        ['Continuidade', 'Sistemas de energia de emergência e de reserva para não interromper a operação.'],
      ]}/><Table head={['Norma citada pela FAA', 'Assunto']} rows={[
        ['NFPA 418', 'Helipontos e vertiportos'],
        ['NFPA 855', 'Armazenamento estacionário de energia'],
        ['NFPA 70, art. 625', 'Sistemas de recarga de veículos elétricos'],
        ['NFPA 110', 'Energia de emergência e de reserva'],
        ['IEEE 519', 'Harmônicos na rede elétrica'],
      ]}/></div>
    </Slide>
    <Internal at="recarga-seguranca"/>

    <Slide anchor="passageiros" kicker="Passageiros" step={4} title="Passageiros e carga no mesmo vertiporto" bridge="Elementos, arranjo, tempos em solo, recarga e passageiros definem juntos a capacidade e o projeto do vertiporto." source="Fonte: Mendonca et al. (2022), NASA, seções sobre entorno, demanda, segurança e automação; NREL (2023), p. 25; E07." notes="Mendonca et al. reuniram mais de 450 considerações de especialistas dos grupos de trabalho de AAM da NASA.">
      <div className="vt-cards vt-cards-grid">
        <article><h3>Acesso terrestre</h3><p>Entradas e saídas que evitem filas e se liguem a pedestres e a outros modos.</p></article>
        <article><h3>Tempo do passageiro</h3><p>No cenário do NREL em Atlantic City, o passageiro chega 1 a 2 h antes do voo no aeroporto e sai 5 a 25 min após o pouso.</p></article>
        <article><h3>Terminal</h3><p>O terminal de teste de Pontoise, visto na E07, tinha 115 m².</p></article>
        <article><h3>Carga</h3><p>Vertiportos perto de centros de distribuição, portos e aeroportos; pontos de retirada nos bairros podem ser compartilhados com passageiros.</p></article>
        <article><h3>Segurança patrimonial</h3><p>Triagem de passageiros e de carga, prevenção de roubo e acesso restrito às áreas operacionais.</p></article>
        <article><h3>Automação</h3><p>Reserva, emissão de bilhete, check-in e triagem, com monitoramento das falhas.</p></article>
      </div>
    </Slide>
    <Internal at="passageiros"/>

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
      <ul className="vt-refs">{presentation.references.map((reference) => <li key={reference.shortTitle}>{reference.citation}{reference.url && <> <a href={reference.url} target="_blank" rel="noreferrer">{reference.url.replace('https://', '')}</a></>}</li>)}{internal && <li className="ops-internal-ref">{internal.referencia}</li>}</ul>
    </Slide>

    <Slide kicker="Materiais" title="Documentos para download" notes="Todos os documentos estão na Biblioteca da disciplina.">
      <ReadingList ids={['faa-2024-eb-105a-vertiport-design', 'easa-2022-vertiport-design-pts', 'nrel-2023-vertiport-electrical', 'sigmacity-produto3', 'it214-2026-2-plano-ensino']}/>
    </Slide>
  </PresentationDeck>;
}
