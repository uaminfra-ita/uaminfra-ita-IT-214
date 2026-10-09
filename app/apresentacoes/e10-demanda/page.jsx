import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';
import resources from '@/data/resources.json';
import '../e06-espaco-aereo/e06.css';
import '../e07-tipologias-vertiportos/e07.css';
import '../e08-operacao-vertiportos/e08.css';
import './e10.css';

const presentation = presentations.find((item) => item.slug === 'e10-demanda');
const allResources = Object.values(resources).flat();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const steps = ['Conceito', 'Dados', 'Tarefas', 'Entrega'];
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
function Link({ href }) {
  return <a href={href} target="_blank" rel="noreferrer">{href.replace('https://', '')}</a>;
}
function ReadingList({ ids }) {
  return <div className="air-downloads"><div>{ids.map((id) => { const resource = allResources.find((item) => item.id === id); return <a key={id} href={basePath + resource.assetPath} download><strong>{resource.title}</strong><span>{resource.authors[0]} • {resource.year}</span><b>Baixar PDF ↓</b></a>; })}</div><a className="air-library-link" href={basePath + '/biblioteca/'} target="_blank" rel="noreferrer">Abrir a Biblioteca da disciplina ↗</a></div>;
}

const DRIVE = 'https://drive.google.com/drive/folders/1Mq0V4J42QSDrmY3FzG3HNICuxYlI08s5';
// Viagens aéreas por mês em 2017, em milhões (soma de quantidadeviagem da matriz aérea).
const meses = [['jan', 7.31], ['fev', 5.33], ['mar', 5.74], ['abr', 5.8], ['mai', 6.12], ['jun', 5.83], ['jul', 7.13], ['ago', 6.12], ['set', 5.94], ['out', 6.1], ['nov', 5.85], ['dez', 7.25]];
// Exemplo didático da curva de Lorenz: cinco pares com 10, 20, 30, 140 e 800 viagens.
const lorenz = [[0, 0], [20, 1], [40, 3], [60, 6], [80, 20], [100, 100]];

function DriveLink({ label = 'Abrir a pasta de dados no Drive' }) {
  return <a className="dem-drive" href={DRIVE} target="_blank" rel="noreferrer"><b>{label} ↗</b><span>drive.google.com/drive/folders/1Mq0V4J42QSDrmY3FzG3HNICuxYlI08s5</span></a>;
}
function Flow({ items }) {
  return <div className="dem-flow">{items.map(([title, text], index) => <article key={title}><i>{index + 1}</i><h3>{title}</h3><p>{text}</p></article>)}</div>;
}
function Hero({ items }) {
  return <div className="dem-hero">{items.map(([value, label]) => <article key={label}><b>{value}</b><span>{label}</span></article>)}</div>;
}
function MonthBars() {
  const w = 760, h = 420, left = 56, bottom = 46, top = 26, max = 8;
  const bw = (w - left - 10) / meses.length;
  const y = (v) => top + (h - top - bottom) * (1 - v / max);
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Viagens aéreas por mês em 2017, em milhões" className="dem-chart">
    {[0, 2, 4, 6, 8].map((v) => <g key={v}><line x1={left} x2={w - 10} y1={y(v)} y2={y(v)} className="dem-grid"/><text x={left - 10} y={y(v) + 6} textAnchor="end" className="dem-axis">{v}</text></g>)}
    {meses.map(([mes, v], i) => <g key={mes}><rect x={left + i * bw + 5} y={y(v)} width={bw - 10} height={y(0) - y(v)} rx="4" className="dem-bar"><title>{`${mes}: ${String(v).replace('.', ',')} milhões`}</title></rect><text x={left + i * bw + bw / 2} y={h - 18} textAnchor="middle" className="dem-axis">{mes}</text>{v > 7 && <text x={left + i * bw + bw / 2} y={y(v) - 8} textAnchor="middle" className="dem-label">{String(v).replace('.', ',')}</text>}</g>)}
  </svg>;
}
function LorenzChart() {
  const s = 420, pad = 54;
  const x = (v) => pad + (s - pad - 14) * v / 100, y = (v) => s - pad - (s - pad - 14) * v / 100;
  return <svg viewBox={`0 0 ${s} ${s}`} role="img" aria-label="Curva de Lorenz de um exemplo com cinco pares" className="dem-chart">
    {[0, 50, 100].map((v) => <g key={v}><line x1={x(0)} x2={x(100)} y1={y(v)} y2={y(v)} className="dem-grid"/><text x={x(0) - 8} y={y(v) + 6} textAnchor="end" className="dem-axis">{v}%</text><text x={x(v)} y={s - 26} textAnchor="middle" className="dem-axis">{v}%</text></g>)}
    <polygon points={lorenz.map(([a, b]) => `${x(a)},${y(b)}`).join(' ') + ` ${x(0)},${y(0)}`} className="dem-area"/>
    <line x1={x(0)} y1={y(0)} x2={x(100)} y2={y(100)} className="dem-equal"/>
    <polyline points={lorenz.map(([a, b]) => `${x(a)},${y(b)}`).join(' ')} className="dem-line"/>
    {lorenz.map(([a, b]) => <circle key={a} cx={x(a)} cy={y(b)} r="5" className="dem-dot"><title>{`${a}% dos pares somam ${b}% das viagens`}</title></circle>)}
    <text x={x(38)} y={y(52)} className="dem-label">Igualdade</text><text x={x(62)} y={y(2) - 30} className="dem-label">Curva de Lorenz</text>
    <text x={x(50)} y={s - 4} textAnchor="middle" className="dem-axis">pares, do menor para o maior</text>
  </svg>;
}

export default function E10PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck vert-deck ops-deck dem-deck">
    <Slide kicker="IT-214 · Mobilidade Aérea Urbana" title="Demanda: a matriz origem-destino do Brasil" notes="Material para estudo dirigido: não há aula presencial em 13/10. A apresentação percorre as cinco tarefas da atividade, na ordem em que devem ser feitas. O mapa da capa mostra as 60 ligações aéreas com mais viagens em 2017." className="air-title-slide">
      <div className="vt-cover"><div><p className="air-lead">Do registro de celular ao mapa de onde a aviação pode crescer.</p><p>Sem aula presencial em 13/10: este material é o roteiro da atividade.</p><p>Entrega, individual ou em dupla, até 20/10.</p><div className="air-cover-meta">E10 · 13/10/2026<br/>Equipe docente IT-214</div></div><Media assetId="e10-od-rotas" caption="As 60 ligações aéreas com mais viagens no Brasil em 2017."/></div>
    </Slide>

    <Slide kicker="Conceito" step={0} title="Por que começar pela demanda" source="Fonte: SIGMA-City (2026), Produto 3, cap. 3 e seção 3.1." notes="A demanda é o primeiro bloco do pilar de viabilidade, visto na E07. O número de pads, vagas e carregadores da E08 depende dela.">
      <div className="vt-col vt-col-gap"><Flow items={[
        ['Quantas viagens existem?', 'Define o porte: pads, vagas, recarga e terminal.'],
        ['Entre quais origens e destinos?', 'Define a rede: onde ficam os pontos de pouso e as rotas.'],
        ['Com qual disposição a pagar?', 'Define a tarifa e a viabilidade econômica.'],
      ]}/>
      <p className="vt-conclusion">Antes de desenhar a FATO, é preciso saber se existe quem use o serviço.</p></div>
    </Slide>

    <Slide kicker="Conceito" step={0} title="O que os estudos mostram" source="Fonte: SIGMA-City (2026), Produto 3, seção 3.1 e tab. 3.1, que revisa Garrow et al. (2021), Long et al. (2023), Haan et al. (2021) e Rimjha et al. (2021)." notes="Haan et al. usaram dados de telefonia celular para localizar os deslocamentos nas 40 maiores áreas metropolitanas dos EUA: é o mesmo tipo de dado da atividade.">
      <Points items={[
        ['Escolha entre modos', 'A demanda de UAM é tratada como escolha modal: o passageiro compara tempo e custo com o carro ou o táxi, e a renda define quem pode pagar.'],
        ['Dados de celular', 'Haan et al. (2021) localizaram os deslocamentos com dados de telefonia móvel e renda do censo.'],
        ['Acesso e espera', 'A demanda estimada cai muito quando o vertiporto fica longe ou a espera para embarcar aumenta.'],
        ['Concentração', 'A demanda se concentra em poucas cidades e em poucos pontos de alto fluxo.'],
      ]}/>
    </Slide>

    <Slide kicker="Dados" step={1} title="A matriz OD por telefonia móvel" source="Fonte: SAC/MInfra e LabTrans/UFSC, Matriz OD por telefonia móvel, ano-base 2017; README da pasta de dados." notes="A metodologia foi apresentada no webinar da SAC/MInfra, UFSC e UnB em 11/08/2020 e está no portal Hórus do LabTrans. Só há viagens entre municípios diferentes: deslocamentos dentro de um município não aparecem.">
      <div className="vt-col vt-col-gap"><Flow items={[
        ['Registros de celular', 'Uma operadora, ao longo de 2017.'],
        ['Anonimização', 'Sem identificar pessoas; dados agregados.'],
        ['Viagens', 'De um município para outro, por mês e por modo.'],
        ['Expansão', 'Da amostra da operadora para o total do país.'],
      ]}/>
      <Hero items={[['74,5 milhões', 'viagens aéreas'], ['1,8 bilhão', 'viagens não aéreas'], ['126', 'aeroportos'], ['5.570', 'municípios']]}/></div>
    </Slide>

    <Slide kicker="Dados" step={1} title="O que é uma matriz origem-destino" source="Fonte: figura da equipe docente com Matriz_OD_aerea.csv (SAC/MInfra e LabTrans/UFSC, 2017)." notes="Cada quadrado é um par: a linha é o estado de origem e a coluna, o de destino. A cor está em escala logarítmica. As linhas brancas separam as regiões: Norte, Nordeste, Centro-Oeste, Sudeste e Sul. Pergunta: que linhas e colunas são mais escuras? Na atividade, a matriz vai além dos estados: o aéreo vem por município e o não aéreo, por UTP.">
      <div className="vt-split vt-split-even"><Media assetId="e10-od-matriz-uf" caption="Viagens aéreas de 2017 entre estados. Quanto mais escuro, mais viagens."/><Points items={[
        ['Linha', 'Onde a viagem começa.'],
        ['Coluna', 'Onde a viagem termina.'],
        ['Célula', 'Quantas viagens foram feitas daquela origem para aquele destino.'],
        ['Na atividade', 'A mesma ideia, mas com municípios, UTPs e aeroportos, mês a mês.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Dados" step={1} title="Os arquivos da atividade" source="Fonte: README da pasta E11_MatrizOD_2017, no Drive da turma." notes="Ler o README antes de começar. Os arquivos grandes não abrem bem no Excel; usar Python ou R. As coordenadas dos municípios não estão na pasta: o README indica o pacote geobr.">
      <div className="vt-col vt-col-gap"><DriveLink/><Table className="dem-table" head={['Arquivo', 'Conteúdo', 'Linhas']} rows={[
        ['Matriz_OD_aerea.csv', 'Matriz aérea, separada por ponto e vírgula', '607 mil'],
        ['Matriz_OD_NÃO_AÉREA.xlsb', 'Matriz não aérea, de UTP para UTP', '727 mil'],
        ['Lista de municipios e UTPs.xlsx', 'Municípios com código do IBGE, UF e UTP', '5.570'],
        ['Lista de aeroportos.xlsx', 'Aeroportos com código ICAO, coordenadas, UF, região e UTP', '126'],
        ['README.md', 'Dicionário das colunas e orientações: leia primeiro', '—'],
      ]}/></div>
    </Slide>

    <Slide kicker="Dados" step={1} title="Como ler uma linha da matriz" source="Fonte: primeira linha de Matriz_OD_aerea.csv; significado das colunas conforme o README." notes="Ler a linha em voz alta: em janeiro de 2017, 37 viagens saíram de Alta Floresta d'Oeste, embarcaram em Ji-Paraná (SBJI) e desembarcaram em Cuiabá (SBCY). As conexões não aparecem. O id do município é interno: para chegar ao código do IBGE, cruzar com a lista de municípios. A coluna tag diz como o valor foi estimado.">
      <div className="vt-col vt-col-gap"><div className="dem-chain"><article><span>municipioorigem</span><b>Alta Floresta D’Oeste</b></article><article><span>aerodromoembarque</span><b>SBJI</b></article><article><span>aerodromodesembarque</span><b>SBCY</b></article><article><span>municipiodestino</span><b>Cuiabá</b></article></div>
      <Hero items={[['1', 'mes: janeiro de 2017'], ['37', 'quantidadeviagem: viagens no mês'], ['1', 'tag: como o valor foi estimado']]}/>
      <p className="vt-conclusion">Em janeiro de 2017, 37 viagens saíram de Alta Floresta d’Oeste, embarcaram em Ji-Paraná e desembarcaram em Cuiabá.</p></div>
    </Slide>

    <Slide kicker="Dados" step={1} title="Abrindo os dados" source="Fonte: exemplo da equipe docente; orientações do README." notes="O exemplo usa Python com pandas. Quem preferir R pode usar readr e readxlsb. O resultado da última linha é o gráfico do slide de estatísticas da tarefa 3. O script entregue precisa reproduzir os números e as figuras do PDF.">
      <div className="vt-split vt-split-even"><pre className="dem-code">{`import pandas as pd

aereo = pd.read_csv("Matriz_OD_aerea.csv", sep=";")

# matriz não aérea (pip install pyxlsb)
terra = pd.read_excel("Matriz_OD_NÃO_AÉREA.xlsb",
                      sheet_name="OD_20200307_TERRESTRE",
                      engine="pyxlsb")

# viagens aéreas por mês
aereo.groupby("mes")["quantidadeviagem"].sum()`}</pre><Points items={[
        ['Ferramenta', 'Python ou R. Os arquivos grandes não abrem bem no Excel.'],
        ['Chaves', 'Ligue as matrizes às listas pelo id do município, pelo id da UTP e pelo código ICAO.'],
        ['Cuidado', 'Há municípios fora de UTP (UTP nula ou 0). Decida como tratar e diga no texto.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Tarefas" step={2} title="As cinco tarefas" source="Fonte: Atividade E11 — Matriz OD por telefonia móvel, IT-214 (2026)." notes="A atividade chama este encontro de E11 no enunciado; no portal ele é o E10. O nome do arquivo de entrega segue o enunciado. As tarefas 3 e 5 pesam mais porque exigem escolha e interpretação.">
      <div className="dem-road"><article><i>1</i><h3>Conceitos</h3><p>Quatro perguntas, antes de calcular.</p><b>15%</b></article><article><i>2</i><h3>Panorama</h3><p>Viagens por modo, região e estado; Lorenz e Gini.</p><b>15%</b></article><article><i>3</i><h3>Recorte</h3><p>Um estado, uma região ou uma cidade.</p><b>25%</b></article><article><i>4</i><h3>Aeroporto</h3><p>Um critério de potencial, aplicado aos dados.</p><b>20%</b></article><article><i>5</i><h3>UAM e AAM</h3><p>Onde há mais chance de AAM, com mapa.</p><b>25%</b></article></div>
    </Slide>

    <Slide kicker="Tarefa 1 · 15%" step={2} title="Conceitos" source="Fonte: Atividade E11, tarefa 1; README da pasta de dados." notes="Responder com as próprias palavras e com referência. Onde procurar: (a) e (b) no README e no portal Hórus; (c) no próximo slide e em livros de estatística; (d) nas aulas E02 e E03 e no ConOps da FAA.">
      <div className="vt-cards vt-cards-grid dem-cards-4"><article><h3>(a) Matriz origem-destino</h3><p>O que é e como pode ser estimada com dados de telefonia móvel.</p></article><article><h3>(b) UTP e tag</h3><p>O que é uma UTP e o que a coluna tag indica sobre cada valor.</p></article><article><h3>(c) Lorenz e Gini</h3><p>O que são e o que medem quando aplicados a uma matriz OD.</p></article><article><h3>(d) UAM e AAM</h3><p>Qual a diferença entre mobilidade aérea urbana e mobilidade aérea avançada.</p></article></div>
    </Slide>

    <Slide kicker="Tarefa 2 · 15%" step={2} title="Curva de Lorenz e Gini: um exemplo" source="Fonte: exemplo didático da equipe docente, com valores inventados." notes="Ordenar os pares do menor para o maior, acumular as viagens e traçar. O Gini é a área entre a reta e a curva, dividida pela área sob a reta. Conta do exemplo: 1 − 0,2 × (0,01 + 0,04 + 0,09 + 0,26 + 1,20) = 0,68. Perto de 0, as viagens se distribuem por igual; perto de 1, poucos pares concentram quase tudo.">
      <div className="vt-split vt-split-even"><figure className="dem-figure"><LorenzChart/><figcaption>Cinco pares OD com 10, 20, 30, 140 e 800 viagens.</figcaption></figure><div className="vt-col vt-col-gap"><Points items={[
        ['Como montar', 'Ordene os pares do menor para o maior e acumule as viagens.'],
        ['Como ler', 'No exemplo, 80% dos pares somam 20% das viagens: um único par concentra 80%.'],
      ]}/><Hero items={[['0,68', 'Gini do exemplo'], ['0', 'tudo igual'], ['1', 'tudo num par só']]}/></div></div>
    </Slide>

    <Slide kicker="Tarefa 2 · 15%" step={2} title="Panorama do país" source="Fonte: Atividade E11, tarefa 2; README da pasta de dados." notes="No não aéreo só há UTP, então a região e o estado vêm da UF da UTP. Definir se a viagem conta para a origem, para o destino ou para os dois, e dizer no texto. Para a curva de Lorenz, somar os doze meses de cada par.">
      <div className="vt-col vt-col-gap"><Flow items={[
        ['Some por estado', 'quantidadeviagem por UF, no aéreo e no não aéreo.'],
        ['Agrupe por região', 'Use a região da lista de aeroportos ou do IBGE.'],
        ['Trace a Lorenz', 'Some os doze meses de cada par, ordene e acumule.'],
        ['Calcule o Gini', 'E diga o que ele mostra sobre a concentração.'],
      ]}/>
      <p className="vt-conclusion">Compare o aéreo com o não aéreo: a concentração é a mesma?</p></div>
    </Slide>

    <Slide kicker="Tarefa 3 · 25%" step={2} title="Recorte: as principais rotas" source="Fonte: Atividade E11, tarefa 3; figura da equipe docente com Matriz_OD_aerea.csv (SAC/MInfra e LabTrans/UFSC, 2017)." notes="O mapa mostra o país inteiro, só no aéreo, como exemplo de figura. No recorte, o aluno deve mostrar também as rotas terrestres, que estão na matriz não aérea, por UTP. O recorte pode ser o do artigo de cada um. Justificar as escolhas vale nota.">
      <div className="vt-split vt-split-even"><Media assetId="e10-od-rotas" caption="Exemplo de figura: as 60 ligações aéreas com mais viagens em 2017; a espessura indica o volume."/><Points items={[
        ['Escolha', 'Um estado, uma região ou uma cidade. Diga por que escolheu.'],
        ['Rotas aéreas', 'De onde saem e para onde vão as viagens do seu recorte, e por quais aeroportos.'],
        ['Rotas terrestres', 'O mesmo com a matriz não aérea, entre UTPs.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Tarefa 3 · 25%" step={2} title="Recorte: as estatísticas" source="Fonte: Atividade E11, tarefa 3; gráfico calculado pela equipe docente com Matriz_OD_aerea.csv (SAC/MInfra e LabTrans/UFSC, 2017)." notes="O gráfico é um exemplo para o país inteiro: janeiro, julho e dezembro passam de 7 milhões de viagens. No recorte do aluno o padrão pode ser outro. As distâncias saem das coordenadas dos aeroportos ou das sedes municipais.">
      <div className="vt-split vt-split-even"><figure className="dem-figure"><MonthBars/><figcaption>Exemplo de estatística: viagens aéreas por mês no Brasil em 2017, em milhões.</figcaption></figure><Points items={[
        ['Destinos', 'Para onde vai a maior parte das viagens do recorte.'],
        ['Distâncias', 'Quão longe as pessoas viajam por ar e por terra.'],
        ['Aeroportos e meses', 'Quais aeroportos são usados e em que meses há pico.'],
        ['Justifique', 'Explique por que cada estatística importa para o seu recorte.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Tarefa 4 · 20%" step={2} title="Potencial para aeroporto" source="Fonte: Atividade E11, tarefa 4; figura da equipe docente com Matriz_OD_aerea.csv e a lista de aeroportos (SAC/MInfra e LabTrans/UFSC, 2017)." notes="Não há resposta única. Exemplos de indicador: viagens não aéreas longas que saem de uma UTP sem aeroporto; viagens aéreas de um município que embarcam em aeroporto de outra UTP. O que se avalia é a clareza do critério e a coerência entre critério, dado e resultado. No mapa, cada círculo é um dos aeroportos da matriz; a área do círculo é o total de embarques.">
      <div className="vt-split vt-split-even"><Media assetId="e10-od-aeroportos" caption="Embarques por aeroporto em 2017. Onde não há círculo, não há aeroporto na matriz."/><ol className="dem-steps dem-steps-narrow">
        <li><b>Critério</b><span>Um indicador e um limite. Por exemplo: muitas viagens longas por terra saindo de onde não há aeroporto.</span></li>
        <li><b>Aplicação</b><span>Calcule o indicador para todas as UTPs ou municípios.</span></li>
        <li><b>Resultado</b><span>Uma lista ordenada ou um mapa dos lugares que passam no critério.</span></li>
        <li><b>Limites</b><span>O que o critério deixa de fora.</span></li>
      </ol></div>
    </Slide>

    <Slide kicker="Tarefa 5 · 25%" step={2} title="UAM e AAM" source="Fonte: Atividade E11, tarefa 5; figura da equipe docente com a lista de aeroportos (SAC/MInfra e LabTrans/UFSC, 2017). Os raios são exemplos, não o alcance de uma aeronave." notes="O alcance e a capacidade devem vir de fonte citada (fabricante, certificação ou artigo). Distância entre dois pontos: fórmula de haversine, d = 2R·arcsen(√a), com a = sen²(Δφ/2) + cos φ1·cos φ2·sen²(Δλ/2) e R = 6.371 km. As coordenadas dos aeroportos estão na lista; as dos municípios vêm do IBGE, pelo pacote geobr. A última pergunta pede que o aluno perceba sozinho o que uma matriz entre municípios consegue e não consegue mostrar.">
      <div className="vt-split vt-split-even"><Media assetId="e10-od-raios" caption="Exemplo: aeroportos a 100, 200 e 300 km de Congonhas (SBSP)."/><div className="vt-col vt-col-gap"><ol className="dem-steps dem-steps-narrow">
        <li><b>Pesquise</b><span>Alcance e capacidade dos eVTOL em desenvolvimento, com a fonte.</span></li>
        <li><b>Meça</b><span>A distância entre os pares de cidades.</span></li>
        <li><b>Filtre</b><span>Os pares dentro do alcance e com muitas viagens.</span></li>
        <li><b>Mapeie</b><span>Onde há mais chance de AAM no Brasil.</span></li>
      </ol><p className="vt-conclusion">Pergunta final: o que esta matriz consegue e o que não consegue dizer sobre a UAM?</p></div></div>
    </Slide>

    <Slide kicker="Entrega" step={3} title="Entrega e avaliação" source="Fonte: Atividade E11 — Matriz OD por telefonia móvel, IT-214 (2026)." notes="Individual ou em dupla. O script precisa rodar e reproduzir os números e as figuras do PDF.">
      <div className="vt-col vt-col-gap"><Hero items={[['20/10', 'terça-feira, até 23h59'], ['4 a 6', 'páginas, em PDF'], ['1', 'script que reproduz tudo'], ['1 ou 2', 'pessoas por trabalho']]}/>
      <Table className="dem-table" head={['O que entregar', 'Detalhe']} rows={[
        ['PDF', 'Respostas, tabelas e figuras. Nome: E11_Sobrenome.pdf; em dupla, E11_Sobrenome1_Sobrenome2.pdf'],
        ['Script', '.py, .R ou .ipynb que reproduza os números e as figuras'],
        ['Onde', 'Na pasta da turma no Drive'],
      ]}/><DriveLink label="Pasta de dados da atividade"/></div>
    </Slide>

    <Slide kicker="Próximos passos" title="Próximos encontros" notes="A equipe confirma pelo grupo da disciplina qualquer mudança de calendário.">
      <div className="vt-next"><article><b>13/10</b><p>Sem aula presencial. Estudo deste material e início da atividade.</p></article><article><b>Até 20/10</b><p>Entrega da atividade da matriz OD.</p></article><article><b>27/10 · CP3</b><p>Seminário Artigo 3: metodologia, dados, estudo de caso e resultados preliminares.</p></article></div>
    </Slide>

    <Slide kicker="Referências" title="Referências" notes="Lista para consulta.">
      <ul className="vt-refs vt-refs-large">{presentation.references.map((reference) => <li key={reference.shortTitle}>{reference.citation}{reference.url && <> <a href={reference.url} target="_blank" rel="noreferrer">{reference.url.replace('https://', '')}</a></>}</li>)}</ul>
    </Slide>

    <Slide kicker="Materiais" title="Documentos para download" notes="O enunciado da atividade e as referências estão na Biblioteca da disciplina. Os dados ficam na pasta do Drive.">
      <div className="vt-col vt-col-gap"><DriveLink/><div className="dem-fill"><ReadingList ids={['it214-2026-atividade-matriz-od', 'sigmacity-produto3', 'garrow-2021-uam-review', 'it214-2026-2-plano-ensino']}/></div></div>
    </Slide>
  </PresentationDeck>;
}
