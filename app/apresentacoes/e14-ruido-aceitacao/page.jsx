import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';
import resources from '@/data/resources.json';
import '../e06-espaco-aereo/e06.css';
import '../e07-tipologias-vertiportos/e07.css';
import '../e08-operacao-vertiportos/e08.css';
import '../e10-demanda/e10.css';
import './e14.css';

const presentation = presentations.find((item) => item.slug === 'e14-ruido-aceitacao');
const allResources = Object.values(resources).flat();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const steps = ['Por que importa', 'Fundamentos', 'A fonte', 'Modelagem 3D', 'Resultados'];
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
  return <table className={'vt-table dem-table ' + className}><thead><tr>{head.map((cell, index) => <th key={index}>{cell}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table>;
}
function Steps({ items }) {
  return <ol className="dem-steps rui-steps">{items.map(([title, text]) => <li key={title}><b>{title}</b><span>{text}</span></li>)}</ol>;
}
function Hero({ items, className = '' }) {
  return <div className={'dem-hero ' + className}>{items.map(([value, label]) => <article key={label}><b>{value}</b><span>{label}</span></article>)}</div>;
}
function Cards({ items, className = '' }) {
  return <div className={'rui-cards ' + className}>{items.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>;
}
function ReadingList({ ids }) {
  return <div className="air-downloads"><div>{ids.map((id) => { const resource = allResources.find((item) => item.id === id); return <a key={id} href={basePath + resource.assetPath} download><strong>{resource.title}</strong><span>{resource.authors[0]} • {resource.year}</span><b>Baixar PDF ↓</b></a>; })}</div><a className="air-library-link" href={basePath + '/biblioteca/'} target="_blank" rel="noreferrer">Abrir a Biblioteca da disciplina ↗</a></div>;
}
const decimal = (value, digits = 1) => value.toFixed(digits).replace('.', ',');

// Ponderação A nas bandas de oitava do estudo (Vieira, 2026, fig. 2.2, a partir de FHWA, 2018, e Hendriks et al., 2013).
const ponderacaoA = [['63', -26.2], ['125', -16.1], ['250', -8.6], ['500', -3.2], ['1k', 0], ['2k', 1.2], ['4k', 1.0], ['8k', -1.1]];
function AWeightChart() {
  const w = 720, h = 420, left = 64, right = 20, top = 30, bottom = 56, min = -30, max = 5;
  const bw = (w - left - right) / ponderacaoA.length;
  const y = (v) => top + (h - top - bottom) * (max - v) / (max - min);
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Ponderação A por banda de oitava, de −26,2 dB em 63 Hz a +1,2 dB em 2 kHz" className="dem-chart rui-chart">
    {[-30, -20, -10, 0].map((v) => <g key={v}><line x1={left} x2={w - right} y1={y(v)} y2={y(v)} className={v === 0 ? 'rui-zero' : 'dem-grid'}/><text x={left - 10} y={y(v) + 5} textAnchor="end" className="dem-axis">{v}</text></g>)}
    {ponderacaoA.map(([band, v], i) => { const x = left + i * bw + 8; const y0 = y(0), y1 = y(v); return <g key={band}>
      <rect x={x} y={Math.min(y0, y1)} width={bw - 16} height={Math.max(2, Math.abs(y1 - y0))} rx="3" className={v < 0 ? 'rui-bar-neg' : 'rui-bar-pos'}><title>{`${band} Hz: ${decimal(v)} dB`}</title></rect>
      <text x={x + (bw - 16) / 2} y={v < 0 ? y1 + 20 : y1 - 8} textAnchor="middle" className="dem-label">{v > 0 ? '+' : ''}{decimal(v)}</text>
      <text x={x + (bw - 16) / 2} y={h - 26} textAnchor="middle" className="dem-axis">{band}</text>
    </g>; })}
    <text x={left + (w - left - right) / 2} y={h - 4} textAnchor="middle" className="dem-axis">banda de oitava (Hz)</text>
    <text x={16} y={top + (h - top - bottom) / 2} transform={`rotate(-90 16 ${top + (h - top - bottom) / 2})`} textAnchor="middle" className="dem-axis">correção (dB)</text>
  </svg>;
}
// Acréscimo no nível equivalente ao multiplicar por k o número de passagens: 10 log10 k (Vieira, 2026, eq. 2.3).
function OpsChart() {
  const w = 720, h = 420, left = 64, right = 24, top = 24, bottom = 56;
  const x = (k) => left + (w - left - right) * Math.log10(k) / 2;
  const y = (v) => top + (h - top - bottom) * (1 - v / 20);
  const curve = Array.from({ length: 101 }, (_, i) => 10 ** (i / 50)).map((k) => `${x(k)},${y(10 * Math.log10(k))}`).join(' ');
  const marks = [[2, 'dobro: +3 dB'], [10, '10 vezes: +10 dB'], [25.2, '25,2 vezes: +14 dB']];
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Acréscimo de nível em função do fator sobre o número de voos: 3 dB no dobro, 10 dB em dez vezes e 14 dB em 25,2 vezes" className="dem-chart rui-chart">
    {[0, 5, 10, 15, 20].map((v) => <g key={v}><line x1={left} x2={w - right} y1={y(v)} y2={y(v)} className="dem-grid"/><text x={left - 10} y={y(v) + 5} textAnchor="end" className="dem-axis">+{v}</text></g>)}
    {[1, 2, 5, 10, 20, 50, 100].map((k) => <text key={k} x={x(k)} y={h - 28} textAnchor="middle" className="dem-axis">{k}×</text>)}
    <polyline points={curve} className="dem-line"/>
    {marks.map(([k, label]) => { const v = 10 * Math.log10(k); return <g key={k}><line x1={x(k)} x2={x(k)} y1={y(0)} y2={y(v)} className="rui-guide"/><circle cx={x(k)} cy={y(v)} r="7" className="dem-dot"/><text x={x(k) - 10} y={y(v) - 14} textAnchor="end" className="dem-label">{label}</text></g>; })}
    <text x={left + (w - left - right) / 2} y={h - 4} textAnchor="middle" className="dem-axis">fator sobre o número de voos (escala logarítmica)</text>
    <text x={16} y={top + (h - top - bottom) / 2} transform={`rotate(-90 16 ${top + (h - top - bottom) / 2})`} textAnchor="middle" className="dem-axis">acréscimo no nível (dB)</text>
  </svg>;
}
// Altura da FATO e área de solo com LAeq ≥ 65 dB(A) do OPPAV nos nove sítios com MDS (SIGMA-City, 2026, Produto 3, tab. 6.17).
// O último par é o deslocamento do rótulo em relação ao ponto, para que os nomes não se sobreponham.
const sitios = [['SSYH', 0, 8.22, 14, -10], ['SIBH', 16.8, 4.18, 14, -10], ['SSXK', 24.6, 0.22, 14, -10], ['SDSX', 27.1, 2.14, 14, -10], ['SDKY', 46.0, 1.13, 14, -10], ['SDMT', 77.3, 0.36, 14, 22], ['SDVR', 85.1, 1.56, -14, -14], ['SDEL', 94.4, 1.54, 14, 24], ['SJXK', 144.3, 0.20, -14, -14]];
function FatoChart() {
  const w = 720, h = 440, left = 64, right = 24, top = 24, bottom = 60;
  const x = (v) => left + (w - left - right) * v / 150;
  const y = (v) => top + (h - top - bottom) * (1 - v / 9);
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Área de solo exposta a 65 dB(A) ou mais em função da altura da FATO, nos nove sítios de São Paulo, para o OPPAV" className="dem-chart rui-chart">
    {[0, 3, 6, 9].map((v) => <g key={v}><line x1={left} x2={w - right} y1={y(v)} y2={y(v)} className="dem-grid"/><text x={left - 10} y={y(v) + 5} textAnchor="end" className="dem-axis">{v}</text></g>)}
    {[0, 50, 100, 150].map((v) => <text key={v} x={x(v)} y={h - 32} textAnchor="middle" className="dem-axis">{v}</text>)}
    {sitios.map(([icao, fato, a65, dx, dy]) => <g key={icao}><circle cx={x(fato)} cy={y(a65)} r="9" className="rui-dot"><title>{`${icao}: FATO a ${decimal(fato)} m, A65 de ${decimal(a65, 2)} ha`}</title></circle><text x={x(fato) + dx} y={y(a65) + dy} textAnchor={dx < 0 ? 'end' : 'start'} className="dem-label">{icao} · {decimal(a65, 2)}</text></g>)}
    <text x={left + (w - left - right) / 2} y={h - 6} textAnchor="middle" className="dem-axis">altura da FATO acima do terreno (m)</text>
    <text x={16} y={top + (h - top - bottom) / 2} transform={`rotate(-90 16 ${top + (h - top - bottom) / 2})`} textAnchor="middle" className="dem-axis">A65 de solo (ha)</text>
  </svg>;
}

export default function E14PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck vert-deck ops-deck dem-deck rui-deck">
    <Slide kicker="IT-214 · Mobilidade Aérea Urbana" title="Ruído aeronáutico e aceitação social" className="air-title-slide" notes="A aula vai do efeito do ruído nas pessoas até o cálculo do campo sonoro sobre a cidade em 3D. Os resultados vêm de três trabalhos da equipe: a dissertação de mestrado sobre a troca de helicópteros por eVTOL em São Paulo, a tarefa de ruído do Sandbox Regulatório de Vertiportos em São José dos Campos e o Produto 3 do SIGMA-City. A imagem da capa é o campo de LAeq de um eVTOL multirrotor pairando sobre o heliponto elevado da Av. Paulista.">
      <div className="vt-cover"><div><p className="air-lead">Por que o ruído decide onde e quanto o eVTOL pode voar, e como calculamos o som sobre a cidade em 3D.</p><p>Saúde, métricas, fonte, propagação e resultados de São Paulo e de São José dos Campos.</p><div className="air-cover-meta">E14 · 10/11/2026<br/>Gabriel Luiz Goulart Rufino Vieira<br/>Equipe docente IT-214</div></div><Media assetId="e14-g-sdmt-oppav" caption="eVTOL pairando sobre o heliponto elevado da Av. Paulista (SDMT): nível em solo, lajes e fachadas."/></div>
    </Slide>

    <Slide kicker="Por que importa" step={0} title="O ruído decide a aceitação" source="Fonte: Vieira (2026), seção 2.1 e fig. 3.2, adaptada de Carvalho et al. (2026); Garrow, German e Leonard (2021); Long et al. (2023); Zhao et al. (2026)." notes="Garrow, German e Leonard (2021) e Long et al. (2023) põem o ruído entre os fatores de adoção, ao lado de demanda, custo, segurança e privacidade. Zhao et al. (2026): o mesmo nível pode ser julgado pior quando vem de um serviço novo, mais frequente e sobre áreas antes não sobrevoadas. Na figura, a rede proposta para São Paulo no projeto SIGMA-Sky: vertiportos em rosa, aeroportos em vermelho, helipontos em amarelo e rotas ligadas às Rotas Especiais de Helicópteros em laranja. A cidade já tem a malha vertical; a pergunta é o que muda quando o eVTOL entra nela. Abrir com a pergunta à turma antes de mostrar os números.">
      <div className="vt-split vt-split-even"><Media assetId="e14-d-rede" caption="Rede de rotas UAM proposta para São Paulo, apoiada nas rotas de helicóptero."/><div className="vt-col vt-col-gap"><Points items={[
        ['Barreira de adoção', 'O ruído está entre os fatores que decidem a adoção da UAM.'],
        ['Tolerância menor', 'Serviço novo e frequente é julgado com mais rigor.'],
      ]}/><Hero items={[['185', 'helipontos na capital'], ['285', 'em 39 municípios']]}/><p className="vt-conclusion">Os senhores já foram acordados por um helicóptero?</p></div></div>
    </Slide>

    <Slide kicker="Por que importa" step={0} title="O que o ruído faz com as pessoas" source="Fonte: WHO (2018); União Europeia (2020), Diretiva 2020/367; Stansfeld et al. (2005); Clark et al. (2021); conforme Vieira (2026), seção 2.5." notes="A OMS publica valores recomendados de exposição média, por fonte. Para aeronaves, 45 dB(A) em Lden e 40 dB(A) em Lnight: acima deles, a diretriz associa a exposição a efeitos adversos à saúde e ao sono. O estudo RANCH (Stansfeld et al., 2005) e a meta-análise de Clark et al. (2021) associam o ruído de aeronaves na escola a pior compreensão de leitura das crianças. Os estudos foram feitos junto a Heathrow, Schiphol e Barajas. A Diretiva (UE) 2020/367 tem curva própria de pessoas altamente incomodadas para aeronaves. Por isso escolas e unidades de saúde são contadas à parte dos moradores.">
      <div className="vt-col vt-col-gap"><Cards className="rui-cards-4" items={[
        ['Incômodo', 'Cresce com o nível sonoro.'],
        ['Sono', 'O ruído noturno pesa mais.'],
        ['Saúde', 'Efeitos adversos acima dos limites da OMS.'],
        ['Aprendizagem', 'Crianças leem pior perto de aeroportos.'],
      ]}/><Hero items={[['45 dB(A)', 'Lden: limite da OMS para aeronaves'], ['40 dB(A)', 'Lnight: limite para a noite']]}/></div>
    </Slide>

    <Slide kicker="Por que importa" step={0} title="Mesmo decibel, outro incômodo" source="Fonte: Boucher et al. (2023); Zhao et al. (2026); Sandbox SBSJ, Fase I, vol. III, T10, seção 10.1.6 (equipe do projeto, 2026); conforme Vieira (2026), seções 1.1 e 2.5." notes="Boucher et al. (2023) testaram sons de UAM com a mesma sonoridade: tonalidade e rugosidade explicaram o incômodo. A psicoacústica ainda não tem métrica consolidada para substituir os indicadores de energia num estudo territorial, por isso os estudos desta aula trabalham em decibéis e declaram isso como limitação. No helicóptero dominam as componentes periódicas; no eVTOL, o equilíbrio entre tons e banda larga depende do projeto dos rotores. LAeq, SEL e A65 medem energia: medir incômodo exige espectros finos e estudos com moradores expostos. Pergunta para a turma: quem recebe o ruído é quem usa o serviço?">
      <div className="vt-col vt-col-gap"><Cards className="rui-cards-3" items={[
        ['Qualidade sonora', 'Tons, agudeza e impulsividade incomodam mais.'],
        ['Helicóptero e eVTOL', 'Mesmo nível, assinaturas diferentes.'],
        ['Limite do dB', 'Mede energia, não incômodo.'],
      ]}/><p className="vt-conclusion">Quem recebe o ruído é quem usa o serviço?</p></div>
    </Slide>

    <Slide kicker="Por que importa" step={0} title="O ruído nas normas" source="Fonte: ANAC, RBAC 36 e RBAC 161, Emenda 04 (2024); ABNT NBR 10151:2019; União Europeia (2002); WHO (2018); conforme Vieira (2026) e Sandbox SBSJ, Fase I, vol. III, T10, seção 10.2.5." notes="RBAC 161: todo aeródromo civil precisa de plano de zoneamento de ruído. O plano específico, com cinco curvas de 85 a 65 dB DNL, é exigido acima de 7.000 movimentos anuais na média de três anos; abaixo disso vale o plano básico, de geometria fixa. Para helipontos, o plano básico tem curvas de 75 dB a 100 m e 65 dB a 300 m do centro. A NBR 10151 recomenda a ISO 9613 para cálculos até haver norma brasileira, mas deixa fora do seu escopo o ruído de transporte, inclusive o aeroviário; o limite diurno para área mista predominantemente residencial é 55 dB(A). A Diretiva 2002/49/CE avalia a 4 m de altura e conta pessoas por faixa de nível.">
      <div className="vt-col vt-col-gap"><Table className="rui-table" head={['Instrumento', 'O que diz']} rows={[
        ['RBAC 36', 'Certificação de ruído da aeronave'],
        ['RBAC 161', 'Zoneamento: 75 dB a 100 m e 65 dB a 300 m do heliponto'],
        ['NBR 10151', 'Medição em áreas habitadas, em LAeq'],
        ['Diretiva 2002/49/CE', 'Mapas em Lden e Lnight'],
        ['OMS (2018)', 'Lden 45 e Lnight 40 dB(A)'],
      ]}/><p className="vt-conclusion">Nenhum deles foi escrito para eVTOL na cidade.</p></div>
    </Slide>

    <Slide kicker="Fundamentos" step={1} title="Decibel é soma de energia" source="Fonte: Vieira (2026), seções 2.3 e 2.5; Sandbox SBSJ, Fase I, vol. III, T10, seção 10.1.5 (equipe do projeto, 2026)." notes="Contas: 10 log10 2 = 3,0 dB; 20 log10 2 = 6,0 dB; 10 log10 10 = 10 dB. Duas fontes de 60 dB somam 10 log10 (10^6 + 10^6) = 63 dB. A divergência de uma fonte pontual, no CNOSSOS-EU, é 20 log10 d + 11. Perguntar à turma quanto dá 60 + 60 antes de mostrar.">
      <div className="vt-col vt-col-gap"><div className="ops-eq rui-eq"><p>L = 10 log<sub>10</sub>(p² / p<sub>0</sub>²)</p><p>L<sub>total</sub> = 10 log<sub>10</sub> Σ 10<sup>L<sub>i</sub>/10</sup></p></div>
      <Hero items={[['+3 dB', 'o dobro de voos'], ['−6 dB', 'o dobro da distância'], ['+10 dB', 'dez vezes mais voos']]}/>
      <p className="vt-conclusion">60 dB + 60 dB = 63 dB, e não 120 dB.</p></div>
    </Slide>

    <Slide kicker="Fundamentos" step={1} title="Frequência e ponderação A" source="Fonte: Vieira (2026), seção 2.3 e fig. 2.2, com base em FHWA (2018) e Hendriks et al. (2013); Sandbox SBSJ, Fase I, vol. III, T10, tab. 10.5 (equipe do projeto, 2026)." notes="O modelo calcula banda a banda porque absorção do ar, efeito de solo, difração e barreiras variam com a frequência. A ponderação A aproxima a resposta do ouvido e reduz o peso dos graves. No rotor, a energia se concentra justamente em 63 e 125 Hz, nos tons de passagem das pás: no Sandbox, o nível de potência da subida é 133,0 dB em 63 Hz e 103,5 dB em 4 kHz. A ponderação A tira 26,2 dB em 63 Hz e quase nada perto de 1 kHz. O dB(A) serve à leitura normativa; o dado por banda guarda a física da fonte.">
      <div className="vt-split vt-split-even"><figure className="dem-figure"><AWeightChart/><figcaption>Correção da ponderação A por banda de oitava.</figcaption></figure><Points items={[
        ['Por banda', 'O cálculo vai de 63 Hz a 8 kHz.'],
        ['Ponderação A', 'Imita o ouvido: corta os graves.'],
        ['No rotor', 'A energia está justamente nos graves.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Fundamentos" step={1} title="Do evento ao dia" source="Fonte: Vieira (2026), seções 2.5 e 3.9.3 e eq. 2.3; ANAC, RBAC 161 (2024); União Europeia (2002); Cebrián Gómez e Banitsas (2026)." notes="O SEL junta numa única cifra o nível e a duração da passagem. O nível do dia é a soma em energia dos SEL de todas as passagens, dividida pela duração do período. O DNL é o descritor do zoneamento brasileiro; o Lden, o da Diretiva europeia e da OMS. As contagens N60, N65 e N70 dizem quantas vezes o morador é sobrevoado, o que a média de energia esconde. Fórmula: LAeq,T = 10 log10 [(t0/T) Σ 10^(LAE,j/10)], com t0 = 1 s; o SEL é referido a 1 s; o DNL soma 10 dB das 22 h às 7 h.">
      <div className="vt-col vt-col-gap"><Table className="rui-table" head={['Métrica', 'O que mede']} rows={[
        ['LAmax', 'O pico de uma passagem'],
        ['SEL', 'A energia de uma passagem'],
        ['LAeq', 'A média de um período'],
        ['DNL', '24 h, noite com +10 dB (RBAC 161)'],
        ['Lden', '24 h, entardecer +5 dB e noite +10 dB'],
        ['N65', 'Sobrevoos acima de 65 dB(A)'],
      ]}/><p className="vt-conclusion">A média não diz quantas vezes o morador é sobrevoado.</p></div>
    </Slide>

    <Slide kicker="Fundamentos" step={1} title="Quantos voos cabem no ganho" source="Fonte: Vieira (2026), seções 1.1, 2.5 e 4.2.5; gráfico da equipe docente com 10 log10 k." notes="Multiplicar por k o número de passagens, mantido o nível de cada uma, soma 10 log10 k ao nível equivalente. Uma aeronave 10 dB mais silenciosa por operação perde a vantagem quando as operações ficam dez vezes mais numerosas; uma de 3 dB, quando apenas dobram. Na dissertação, com a fonte e as rotas de São Paulo, a frota eVTOL volta à contagem de moradores expostos do helicóptero com 25,2 vezes o seu número de voos: 10 log10 25,2 = 14 dB.">
      <div className="vt-split vt-split-even"><figure className="dem-figure"><OpsChart/><figcaption>Acréscimo no nível ao multiplicar o número de voos.</figcaption></figure><div className="vt-col vt-col-gap"><Points items={[
        ['A regra', 'O nível do dia cresce com o logaritmo do número de voos.'],
        ['10 dB a menos', 'Se perdem com dez vezes mais operações.'],
        ['3 dB a menos', 'Se perdem com o dobro.'],
      ]}/><p className="vt-conclusion">O ganho de cada voo só vale junto com o número de voos.</p></div></div>
    </Slide>

    <Slide kicker="A fonte" step={2} title="De onde vem o ruído do rotor" source="Fonte: Vieira (2026), seção 2.2, com Rizzi et al. (2024), Kusyumov et al. (2019), Zhao et al. (2026) e Combey et al. (2026); Sandbox SBSJ, Fase I, vol. III, T10, fig. 10.2 (Silva et al., 2018)." notes="O NASA RVLT Lift+Cruise é o veículo conceitual usado como fonte no Sandbox e na dissertação: oito rotores só para sustentação, um propulsor de cruzeiro na cauda e asa fixa que sustenta o voo de translado, com os rotores parados em cruzeiro. A mesma aeronave não emite igual em subida, cruzeiro, transição e descida: o estado de voo precisa acompanhar cada trecho da trajetória. Tons: espessura e carregamento das pás, na frequência de passagem e nos harmônicos. Banda larga: domina a curta distância à frente do quadrirrotor (Rizzi et al., 2024). Impulsivo: interação pá-vórtice (BVI) e ruído impulsivo de alta velocidade. A interação muda com a configuração: multirrotor, rotor basculante, lift+cruise.">
      <div className="vt-split vt-split-narrow"><Media assetId="e14-s-rvlt" caption="NASA RVLT Lift+Cruise: oito rotores de sustentação, propulsor na cauda e asa fixa."/><Points items={[
        ['Tons', 'Passagem das pás: graves e periódicos.'],
        ['Banda larga', 'Ruído próprio do rotor, agudo.'],
        ['Impulsivo', 'Típico do helicóptero: interação pá-vórtice.'],
        ['Interação', 'Entre rotores, asa e duto.'],
      ]}/></div>
    </Slide>

    <Slide kicker="A fonte" step={2} title="Hemisfério de ruído" source="Fonte: Vieira (2026), seções 2.2 e 3.4 a 3.6 e fig. 3.3; Sandbox SBSJ, Fase I, vol. III, T10, seção 10.1.3 (equipe do projeto, 2026); Rizzi et al. (2024); Diez, Olsen e Meliveo (2023)." notes="A conversão segue a ISO 3744: LW = Lp médio + 10 log10 (S), com S = 2πr² do hemisfério. Para r = 152,4 m, 10 log10 (145.932) = 51,6 dB. Usar a esfera inteira inflaria o resultado em 3 dB. Na figura, a diretividade do eVTOL em pairado, no horizonte: os graves (63 a 250 Hz) variam 11,6 a 15,3 dB em volta da aeronave; os agudos, cerca de 1 a 2 dB. A base NASA tem 361 pontos num hemisfério de 152,4 m; a NORAH2, grade de 19 × 19 direções a 60 m. O estado de voo é definido por velocidade e ângulo de trajetória.">
      <div className="vt-split vt-split-even"><Media assetId="e14-d-diretividade" caption="Diretividade do eVTOL em pairado, no horizonte, por banda de oitava."/><Points items={[
        ['O que é', 'Nível por direção e banda, a cada estado de voo.'],
        ['eVTOL', 'NASA RVLT: predição numérica.'],
        ['Helicóptero', 'NORAH2 (EASA): ensaio em voo.'],
        ['Para o modelo', 'Potência = pressão média + 51,6 dB.'],
      ]}/></div>
    </Slide>

    <Slide kicker="A fonte · aplicação no SBSJ" step={2} title="A fase de voo muda o mapa" source="Fonte: Sandbox SBSJ, Fase I, vol. III, T10, tab. 10.4 e 10.6 e fig. 10.6 (equipe do projeto, 2026). Figura de uso didático autorizado; estudo preliminar." notes="Isófonas com a fonte a 60 m, sobre o relevo e as edificações da área-piloto do SBSJ. Subida e descida projetam no solo níveis 11 a 12 dB(A) acima do pairado e área A65 quase quatro vezes maior, porque a diretividade dessas fases joga os graves para baixo. O cruzeiro tem A65 nulo: uma fonte sem diretividade não mostraria isso. Tabela 10.6, fonte a 60 m: máximo no solo de 71,2 (pairado), 82,2 (subida), 65,0 (cruzeiro) e 82,8 dB(A) (descida); A65 de 16.412, 61.233, 0 e 63.086 m². Potência LWA: 112,7, 119,5, 109,0 e 119,7 dB(A).">
      <div className="vt-col vt-col-gap"><div className="vt-split vt-split-even rui-pair"><Media assetId="e14-s-isofonas-pairado" caption="Pairado, fonte a 60 m."/><Media assetId="e14-s-isofonas-subida" caption="Subida, fonte a 60 m."/></div>
      <p className="vt-conclusion">Subida e descida: 11 dB(A) a mais no solo e área A65 quase 4 vezes maior que no pairado.</p></div>
    </Slide>

    <Slide kicker="Intervalo" title="Intervalo de 10 minutos" className="air-title-slide" notes="Na volta: como o som sai da aeronave e chega a cada pessoa da cidade."><div/></Slide>

    <Slide kicker="Modelagem 3D" step={3} title="Da fonte ao receptor" source="Fonte: Sandbox SBSJ, Fase I, vol. III, T10, eq. 10.5 e seções 10.1.1 e 10.1.5 (equipe do projeto, 2026); Vieira (2026), seções 2.3 e 3.7; Yunus et al. (2023); União Europeia (2015), Diretiva 2015/996." notes="O CNOSSOS-EU é o método comum obrigatório nos mapas estratégicos de ruído da União Europeia desde 2018. Ele foi escrito para fontes rodoviárias, ferroviárias e industriais perto do solo; aplicá-lo a aeronave em voo é analogia de engenharia, declarada nos dois estudos. Yunus et al. (2023) mostraram que os prédios elevam em até 5 dB o nível no solo por reflexões e criam sombra atrás de si. Números: divergência 20 log10 d + 11; absorção do ar de cerca de 4 dB/km em 1 kHz e mais de 100 dB/km em 8 kHz, a 25 °C e 70%; solo com G de 0 (asfalto, concreto) a 1 (gramado).">
      <div className="vt-col vt-col-gap"><div className="ops-eq rui-eq"><p>L<sub>p</sub> = L<sub>W</sub> + D<sub>c</sub> − (A<sub>div</sub> + A<sub>atm</sub> + A<sub>solo</sub> + A<sub>dif</sub> + A<sub>refl</sub>)</p><span>potência + diretividade − atenuações, em cada banda</span></div>
      <Cards className="rui-cards-5" items={[
        ['Distância', 'Dobrou, −6 dB.'],
        ['Ar', 'Absorve mais os agudos.'],
        ['Solo', 'Duro reflete; grama absorve.'],
        ['Difração', 'Prédios fazem sombra.'],
        ['Reflexão', 'Fachadas somam até 5 dB.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Modelagem 3D" step={3} title="A cadeia de cálculo" source="Fonte: Vieira (2026), seção 3.2 e fig. 3.1; Sandbox SBSJ, Fase I, vol. III, T10, seção 10.1.1 (equipe do projeto, 2026); Bocher et al. (2019)." notes="O NoiseModelling calcula só a atenuação entre cada trecho de trajetória e cada receptor, nas oito bandas, já com a diretividade: é a matriz de atenuação. A potência da aeronave, o horário e a frota entram depois, na composição. Por isso dá para trocar helicóptero por eVTOL, ou mudar o horário dos voos, sem rodar a propagação de novo. A ONERA usa o mesmo programa para drones e VTOL no projeto MUSE, do SESAR.">
      <div className="vt-split vt-split-narrow"><Media assetId="e14-d-fluxo" caption="Das entradas aos indicadores, com o NoiseModelling no centro."/><Points items={[
        ['NoiseModelling', 'Software livre, método CNOSSOS-EU.'],
        ['Atenuação uma vez', 'De cada trecho a cada receptor.'],
        ['Recombinar', 'Troca de frota ou horário sem propagar de novo.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Modelagem 3D" step={3} title="A cidade em 3D" source="Fonte: Vieira (2026), seção 3.3.2 e tab. 3.4; Sandbox SBSJ, Fase I, vol. III, T10, seção 10.1.5 e fig. 10.5 (equipe do projeto, 2026)." notes="Em São Paulo, o terreno e as edificações vêm do levantamento a laser de 2020 do GeoSampa, em nuvem de pontos classificada. A edificação entra como bloco de altura única; as faixas de altura evitam que uma quadra contígua vire um polígono só. No SBSJ, a área-piloto tem relevo de 575 a 681 m e 140 edificações do OpenStreetMap; a malha de 49.344 receptores contorna os prédios e acompanha o terreno. Faixas de altura: 2, 5, 9, 15, 25, 40, 60 e 90 m, com altura pela mediana; saem polígonos com menos de 30 m² ou 2 m. Vegetação com G = 1; o resto, duro, com G = 0.">
      <div className="vt-split vt-split-even"><Media assetId="e14-s-malha" caption="SBSJ: malha de receptores sobre o terreno e as edificações."/><div className="vt-col vt-col-gap"><Steps items={[
        ['Laser', 'Nuvem de pontos do GeoSampa, grade de 1 m.'],
        ['Prédios', 'Blocos por faixa de altura.'],
        ['Solo', 'Grama absorve; o resto reflete.'],
      ]}/><Hero items={[['1.087.848', 'prédios em São Paulo'], ['49.344', 'receptores no SBSJ']]}/></div></div>
    </Slide>

    <Slide kicker="Modelagem 3D" step={3} title="Receptores no solo, no telhado e na fachada" source="Fonte: SIGMA-City (2026), Produto 3, seção 5.1.2 e fig. 5.9; Vieira (2026), seção 3.3.4; União Europeia (2002); ABNT NBR 10151:2019." notes="A malha sobe com a cidade sobre o modelo digital de superfície de 0,5 m. Solo a 4 m, altura da Diretiva 2002/49/CE e mínima da NBR 10151 para monitoramento de longa duração. Telhado a 1,5 m sobre a laje. Fachada a 0,1 m da parede, um receptor a cada 3 m de altura, em campo incidente, para não contar a reflexão da própria fachada. A área A65 é medida só no solo; nunca somar solo, telhado e fachada.">
      <div className="vt-split vt-split-wide"><Media assetId="e14-g-malha3d" caption="Receptores de solo (vermelho), telhado (verde) e fachada (azul) subindo pelos prédios."/><div className="vt-col vt-col-gap"><Steps items={[
        ['Solo', 'A 4 m do terreno.'],
        ['Telhado', 'A 1,5 m sobre cada laje.'],
        ['Fachada', 'A 0,1 m da parede, a cada 3 m de altura.'],
      ]}/><p className="vt-conclusion">Mapa só de solo subestima o impacto.</p></div></div>
    </Slide>

    <Slide kicker="Modelagem 3D" step={3} title="A fonte em movimento" source="Fonte: Vieira (2026), seções 2.4, 3.3.4 e 3.8 e tab. 3.5 e 3.8." notes="Como a fonte em linha é descrita por potência por metro, a potência da aeronave é dividida pela velocidade: o tempo que ela gasta em cada parte da rota entra no cálculo. Por isso o trecho lento perto do vertiporto pesa mais. No cenário C1, a grade parte de 200 m e é refinada para 100 m a até 1 km de um trecho e 50 m a até 300 m, com detalhe de 10 m junto a cinco vertiportos e anéis a 50, 100, 150, 200, 300, 400 e 500 m em 36 azimutes. Dos 80.051 receptores do C1, 52.914 têm nível calculado. Os trechos são cortados onde mudam a fase e a velocidade; a contagem é por pavimento, acima de 45 dB(A).">
      <div className="vt-col vt-col-gap"><Steps items={[
        ['Trechos', 'Cada voo vira trechos de cerca de 3 km.'],
        ['Fonte em linha', 'Mais devagar, mais energia no trecho.'],
        ['Estado de voo', 'Cada trecho tem seu espectro e diretividade.'],
        ['Soma do dia', 'Lden por receptor e moradores expostos.'],
      ]}/><Hero items={[['80.051', 'receptores em São Paulo'], ['4 km', 'alcance por trecho']]}/></div>
    </Slide>

    <Slide kicker="Resultados · SIGMA-City" step={4} title="Três vistas do mesmo campo" source="Fonte: SIGMA-City (2026), Produto 3, seção 5.1.3 e fig. 5.10 (OPPAV no vertiporto de FATO elevada do Pátio Victor Malzoni, SDVR)." notes="A planta de solo responde onde, no chão, o nível passa dos limiares; a isófona sai recortada pelas quadras porque a sombra é calculada. A vista 3D de topo localiza as lajes mais expostas. A perspectiva mostra quem, em altura, recebe o pico. As três reaparecem nos nove sítios do Produto 3.">
      <div className="vt-col vt-col-gap"><div className="rui-trio"><Media assetId="e14-g-sdvr-2d" caption="Planta 2D de solo."/><Media assetId="e14-g-sdvr-topo" caption="Vista 3D de topo."/><Media assetId="e14-g-sdvr-3d" caption="Perspectiva 3D."/></div>
      <p className="vt-conclusion">Chão, lajes ou pessoas em altura: cada vista responde a uma pergunta.</p></div>
    </Slide>

    <Slide kicker="Resultados · SIGMA-City" step={4} title="No vertiporto elevado, o pico está em altura" source="Fonte: SIGMA-City (2026), Produto 3, seção 5.1.3, tab. 5.8 e fig. 6.7. Nível máximo LAeq, fonte 10 m acima da FATO do Pátio Victor Malzoni (SDVR)." notes="Exemplo trabalhado do Produto 3: FATO a 85,1 m sobre o terreno, fonte 10 m acima dela, três aeronaves pela mesma cadeia. A figura é o helicóptero leve R44. No solo, o R44 chega a 92 dB(A) e os dois eVTOL ficam perto de 75; nas lajes e fachadas, os três passam de 90 dB(A). A exposição crítica de um vertiporto elevado está em altura, não na calçada. Tabela 5.8, nível máximo LAeq: OPPAV 75,4 / 92,8 / 90,6 dB(A) (solo, telhado, fachada), R44 92,0 / 111,4 / 108,0 e NASA em subida 73,2 / 95,4 / 91,7. A65 de solo: 1,56, 17,69 (truncada) e 0,70 ha.">
      <div className="vt-split vt-split-even"><Media assetId="e14-g-sdvr-r44" caption="Helicóptero R44 no mesmo vertiporto: a mancha vermelha toma lajes e fachadas."/><div className="vt-col vt-col-gap"><Table className="rui-table" head={['dB(A)', 'Solo', 'Telhado', 'Fachada']} rows={[
        ['OPPAV', '75', '93', '91'],
        ['R44', '92', '111', '108'],
        ['NASA, subida', '73', '95', '92'],
      ]}/><p className="vt-conclusion">Em lajes e fachadas, todas passam de 90 dB(A).</p></div></div>
    </Slide>

    <Slide kicker="Resultados · SIGMA-City" step={4} title="Quanto mais alta a FATO, menor a área no solo" source="Fonte: gráfico da equipe docente com a tab. 6.17 do SIGMA-City (2026), Produto 3. Fonte estática a 10 m acima da FATO." notes="Nos nove sítios da capital com modelo digital de superfície, a área de solo com LAeq de 65 dB(A) ou mais do OPPAV vai de 8,22 ha no Autódromo, com a FATO no solo, a 0,20 ha no Eldorado, com a FATO a 144,3 m: cerca de 40 vezes. A densidade compete: o Kartódromo, com FATO a 24,6 m, tem só 0,22 ha. A área menor no solo não diz nada sobre lajes e fachadas, como mostrou o slide anterior.">
      <div className="vt-split vt-split-even"><figure className="dem-figure"><FatoChart/><figcaption>OPPAV: área de solo com LAeq ≥ 65 dB(A) nos nove sítios de São Paulo.</figcaption></figure><Points items={[
        ['Tendência', '8,22 ha com FATO no solo; 0,20 ha a 144 m.'],
        ['Exceção', 'Entorno denso também faz sombra.'],
        ['Cuidado', 'Menos área no solo, mais nível em altura.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Resultados · aplicação no SBSJ" step={4} title="O footprint do vertiporto" source="Fonte: Sandbox SBSJ, Fase I, vol. III, T10, seção 10.2.3, fig. 10.8 e tab. 10.7 (equipe do projeto, 2026). Figura de uso didático autorizado; estudo preliminar." notes="Foram 135 cenários: três fases (pairado, subida e descida), cinco alturas de fonte (2, 5, 10, 30 e 50 m) e nove orientações da aeronave. No vertiporto, o rumo de chegada e de saída muda a cada operação, com o vento e o procedimento; por isso a varredura de rumos. Os círculos de 100 e 300 m são as curvas de 75 e 65 dB do plano básico de helipontos do RBAC 161. O rumo muda a forma do contorno, não o lugar: o centro se desloca até 41 m.">
      <div className="vt-split vt-split-wide"><Media assetId="e14-s-footprint" caption="Pairado e descida com a fonte a 30 m, com os círculos de 100 e 300 m do RBAC 161."/><div className="vt-col vt-col-gap"><Table className="rui-table rui-table-compact" head={['Fase', '65 dB(A)', '75 dB(A)']} rows={[
        ['Pairado', '99–100 m', '0–10 m'],
        ['Subida', '180–189 m', '63–69 m'],
        ['Descida', '182–189 m', '64–71 m'],
      ]}/><Points items={[
        ['65 dB(A)', 'Sempre dentro do círculo de 300 m.'],
        ['75 dB(A)', 'Sempre dentro de 100 m.'],
      ]}/></div></div>
    </Slide>

    <Slide kicker="Resultados · aplicação no SBSJ" step={4} title="Do evento ao DNL" source="Fonte: Sandbox SBSJ, Fase I, vol. III, T10, seção 10.2.6, eq. 10.6 e 10.7 e fig. 10.9 (equipe do projeto, 2026). Cenário operacional declarado, não previsão de demanda." notes="Cenário: 60 movimentos por dia, 54 de dia e 6 à noite, metade pousos e metade decolagens, distribuídos pelos procedimentos VFR de chegada propostos no Volume I (40% WHISKEY Direto, 30% WHISKEY Colinas e 30% ECHO Refinaria Sul). Cada movimento tem 15 s de pairado e 20 s de subida ou descida, com a fonte a 30 m. O SEL fica em cerca de 95 dB(A) nos eventos de subida e descida e 89 dB(A) no pairado, com incerteza de ±2,5 dB pelas classes de 5 dB.">
      <div className="vt-split vt-split-even"><Media assetId="e14-s-dnl" caption="Campo de DNL com 60 movimentos por dia; contorno azul: 65 dB DNL."/><div className="vt-col vt-col-gap"><Hero className="rui-hero-2" items={[['67,3 dB', 'DNL máximo'], ['32 m', 'raio de 65 dB DNL'], ['300 m', 'círculo do plano básico'], ['+3 dB', 'a cada dobro de voos']]}/><p className="vt-conclusion">Evento alto, mas curto: o DNL dilui nas 24 horas.</p></div></div>
    </Slide>

    <Slide kicker="Resultados · São Paulo" step={4} title="Trocar o helicóptero pelo eVTOL" source="Fonte: Vieira (2026), seção 4.2.1, tab. 4.2 e fig. 4.1. Cenário C1 do SIGMA-Sky: dia simulado de demanda alta, com o percentil 95 dos movimentos de cada hora." notes="Frota convencional: os 129 voos atuais de helicóptero. Substituta: os mesmos 129 voos feitos por eVTOL. Mista: os 129 de helicóptero mais 175 voos novos de eVTOL. Frota eVTOL: os 304 voos por eVTOL. A diferença mediana entre convencional e substituta é de 16,6 dB. A redução depende de o helicóptero sair das rotas: somar a demanda nova ao tráfego atual aumenta a exposição. Números exatos, moradores com Lden de 45 dB(A) ou mais: 883.874 (convencional), 898.718 (mista, +1,7%), 96.592 (eVTOL, −89,1%) e 48.760 (substituta, −94,5%).">
      <div className="vt-split vt-split-even"><Media assetId="e14-d-lden-frotas" caption="Lden no cenário C1 com as quatro frotas."/><div className="vt-col vt-col-gap"><Table className="rui-table" head={['Frota', 'Voos', 'Expostos']} rows={[
        ['Helicóptero', '129', '884 mil'],
        ['Mista', '304', '899 mil'],
        ['eVTOL', '304', '97 mil'],
        ['Substituta', '129', '49 mil'],
      ]}/><Hero items={[['−94%', 'na troca de aeronave'], ['−16,6 dB', 'diferença mediana']]}/></div></div>
    </Slide>

    <Slide kicker="Resultados · São Paulo" step={4} title="Quantos voos até perder o ganho" source="Fonte: Vieira (2026), seção 4.2.5, fig. 4.4 e tab. 5.1." notes="O fator de equivalência supõe que os voos adicionais repitam os atuais. No ponto de igualdade, de um terço a 38% dos moradores expostos pela frota convencional receberiam nível mais alto: a contagem empata, mas as pessoas não são as mesmas. Igualar a contagem não indica número admissível de operações nem capacidade.">
      <div className="vt-col vt-col-gap"><div className="met-fill rui-fill"><Media assetId="e14-d-equivalencia" caption="Moradores expostos em função do fator k sobre os voos de eVTOL."/></div>
      <Hero items={[['25,2×', 'frota eVTOL, cenário C1'], ['15,5×', 'cenário C2, corredor dedicado'], ['58,6×', 'frota substituta, C1'], ['28,9×', 'rede otimizada']]}/></div>
    </Slide>

    <Slide kicker="Resultados · São Paulo" step={4} title="Perto dos vertiportos" source="Fonte: Vieira (2026), seção 4.3.1, fig. 4.6, tab. 5.1 e seção 5.3." notes="A figura mostra o nível dia-noite em torno de três helipontos do C1, com os círculos de 100 e 300 m do plano básico do RBAC 161. No SDMT, heliponto elevado da Paulista, só 11 dos 68 voos estão no tráfego atual e quase não há voos de passagem: trocar a aeronave quase não muda a exposição local. O cálculo não representa o pairado nem o pouso e a decolagem verticais: o entorno imediato dos vertiportos é a parte menos segura do resultado. Em 4 de 5 vertiportos do C1, quase toda a energia a até 1 km vem dos próprios voos; no quinto, 17%. No SDMT, a frota eVTOL mantém 100,6% dos moradores expostos a até 1 km. A diferença varia vários decibéis entre azimutes.">
      <div className="vt-split vt-split-narrow"><Media assetId="e14-d-helipontos" caption="Nível dia-noite em torno de três helipontos, por frota."/><Points items={[
        ['Energia local', 'Em 4 de 5 vertiportos, vem dos próprios voos.'],
        ['SDMT', 'Na Paulista, trocar a aeronave quase não muda.'],
        ['Direção', 'O ganho varia com o azimute.'],
        ['Limite', 'Pairado e pouso vertical fora do modelo.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Gestão" step={4} title="Como reduzir o ruído" source="Fonte: Vieira (2026), tab. 5.1 e seção 5.2; Sandbox SBSJ, Fase I, vol. III, T10, seções 10.2.4 e 10.2.5 e tab. 10.8 (equipe do projeto, 2026); SIGMA-City (2026), Produto 3, seção 6.6." notes="Cada alavanca vem de um resultado da aula. A tabela de compatibilidade do RBAC 161 associa cada faixa de DNL a usos do solo: residências, escolas e hospitais são compatíveis abaixo de 65 dB; acima disso, a norma restringe o uso ou exige redução de nível de ruído na edificação. A demanda nova somada ao tráfego atual aumenta a exposição em 1,7%; a exposição que sobra na troca vem dos trechos lentos, a cerca de 50 kt. Pergunta para a turma: qual dessas alavancas o operador controla e qual depende da prefeitura?">
      <Cards className="rui-cards-6" items={[
        ['Trocar, não somar', 'Tirar o helicóptero das rotas.'],
        ['Procedimentos', 'Subida e descida longe de usos sensíveis.'],
        ['Altura da FATO', 'Menos solo, mais lajes e fachadas.'],
        ['Velocidade', 'Evitar trechos lentos sobre casas.'],
        ['Horário', 'A noite vale +10 dB.'],
        ['Uso do solo', 'Proteger escolas e hospitais.'],
      ]}/>
    </Slide>

    <Slide kicker="Gestão · aplicação no SBSJ" step={4} title="Medir para validar" source="Fonte: Sandbox SBSJ, Fase I, vol. III, T10, seção 10.3 e tab. 10.9 (equipe do projeto, 2026). Proposta para a fase de medições." notes="As normas de medição (IEC 61672 e NBR 10151) dizem como medir, não onde pôr os sensores para verificar uma aeronave. A campanha coreana do OPPAV usou 80 microfones sincronizados em quatro linhas para reconstruir o hemisfério da aeronave. O Sandbox propõe uma rede esparsa: cada ponto testa um mecanismo da previsão, para ajustar separadamente a fonte, a diretividade e a propagação.">
      <div className="vt-col vt-col-gap"><Table className="rui-table" head={['Sensor', 'Onde fica', 'O que testa']} rows={[
        ['S1', 'Sob o pairado', 'Nível máximo'],
        ['S2 e S3', 'No eixo e no través', 'Diretividade'],
        ['S4', 'No contorno de 65 dB(A)', 'Área A65'],
        ['S5', 'Atrás de um prédio', 'Sombra acústica'],
        ['S6', 'No alto do relevo', 'Terreno'],
        ['S7', 'Longe da operação', 'Ruído de fundo'],
      ]}/></div>
    </Slide>

    <Slide kicker="Gestão" step={4} title="O que os modelos ainda não dizem" source="Fonte: Vieira (2026), seções 3.13 e 5.3; Sandbox SBSJ, Fase I, vol. III, T10, seções 10.1.1 e 10.2.5 (equipe do projeto, 2026)." notes="Fechar com a crítica: os estudos sustentam a ordem de grandeza da diferença entre frotas e o caminho do evento ao zoneamento, não o nível de um receptor isolado. Pergunta para a turma, ligando ao artigo de cada um: que dado faltaria para usar esse resultado no licenciamento de um vertiporto do seu estudo de caso? Detalhe: eVTOL por predição de veículo conceitual e helicóptero por ensaio em voo, então não dá para dizer qual emite menos; tonalidade e impulsividade ficam de fora; o CNOSSOS-EU foi escrito para fontes perto do solo; sem medição, o nível absoluto não é previsão; o RBAC 161 não tem dispositivo para vertiportos nem operações distribuídas.">
      <div className="vt-col vt-col-gap"><Cards className="rui-cards-5" items={[
        ['Fonte', 'Predição contra ensaio em voo.'],
        ['Percepção', 'Só decibéis.'],
        ['Método', 'Feito para fontes no solo.'],
        ['Campo', 'Falta medição.'],
        ['Norma', 'Sem regra para vertiporto.'],
      ]}/><p className="vt-conclusion">Que dado falta para licenciar o vertiporto do seu artigo?</p></div>
    </Slide>

    <Slide kicker="Próximos passos" title="Próximos encontros" notes="A equipe confirma pelo grupo da disciplina qualquer mudança de calendário.">
      <div className="vt-next rui-next"><article><b>17/11</b><p>Entrega do artigo final e aula sobre submissão, com o Prof. Rodrigo.</p></article><article><b>24/11 · CP4</b><p>Apresentação final.</p></article><article><b>01/12 e 08/12</b><p>Exames finais, sem aula regular.</p></article></div>
    </Slide>

    <Slide kicker="Referências" title="Referências" notes="A dissertação e os relatórios do Sandbox não estão na Biblioteca da disciplina.">
      <ul className="vt-refs vt-refs-large rui-refs">{presentation.references.map((reference) => <li key={reference.shortTitle}>{reference.citation}{reference.url && <> <a href={reference.url} target="_blank" rel="noreferrer">{reference.url.replace('https://', '')}</a></>}</li>)}
        <li>Vieira, G. L. G. R. Gestão do planejamento urbano orientado pelos impactos sonoros das operações de mobilidade aérea urbana. Dissertação (Mestrado em Engenharia de Infraestrutura Aeronáutica) — Instituto Tecnológico de Aeronáutica, São José dos Campos, 2026.</li>
        <li>Equipe do Sandbox Regulatório de Vertiportos (SBSJ). Relatório técnico da Fase I, vol. III, cap. 10, T10 — Ruído aeronáutico. ITA; VertiMob, 2026. Não publicado.</li>
        <li>ANAC. RBAC 161, Emenda 04: Planos de Zoneamento de Ruído de Aeródromos. Brasília, 2024. ABNT. NBR 10151:2019: Acústica — medição e avaliação de níveis de pressão sonora em áreas habitadas.</li>
      </ul>
    </Slide>

    <Slide kicker="Materiais" title="Documentos para download" notes="O Produto 3 do SIGMA-City traz a metodologia de ruído completa, seção 5.1, e os nove sítios de São Paulo, cap. 6.">
      <div className="vt-col vt-col-gap"><div className="rui-links"><a className="rui-link" href="https://www.who.int/europe/publications/i/item/9789289053563" target="_blank" rel="noreferrer"><b>Diretriz de ruído da OMS (2018) ↗</b><span>who.int</span></a><a className="rui-link" href="https://noisemodelling.readthedocs.io" target="_blank" rel="noreferrer"><b>Documentação do NoiseModelling ↗</b><span>noisemodelling.readthedocs.io</span></a></div><div className="dem-fill"><ReadingList ids={['sigmacity-produto3', 'garrow-2021-uam-review', 'it214-2026-2-plano-ensino']}/></div></div>
    </Slide>
  </PresentationDeck>;
}
