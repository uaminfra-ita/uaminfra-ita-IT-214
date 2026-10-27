import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';
import '../e06-espaco-aereo/e06.css';
import '../e07-tipologias-vertiportos/e07.css';
import '../e08-operacao-vertiportos/e08.css';
import '../e10-demanda/e10.css';
import './e12.css';

// Conteúdo da apresentação do Prof. Marcelo Saraiva Peres (E13_meteorologia_2026-10-27_aula_v3.pptx), no formato das apresentações do portal.
const presentation = presentations.find((item) => item.slug === 'e12-meteorologia');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const steps = ['Fontes de dados', 'Temperatura', 'Vento', 'VMC e IMC', 'Neblina'];
export const metadata = { title: presentation.title, description: presentation.subtitle };

function Trail({ current }) {
  return <span className="ops-trail">{steps.map((name, index) => <span key={name} className={index === current ? 'ops-trail-on' : index < current ? 'ops-trail-done' : ''}>{index + 1}. {name}</span>)}</span>;
}
function Slide({ kicker, title, subtitle, step, source, notes, children, className = '' }) {
  return <section className={'air-slide ' + className}><header><div className="air-kicker">{kicker}<span className="ops-kicker-right">{step !== undefined && !className.includes('air-title-slide') && <Trail current={step}/>}</span></div><h2>{title}</h2>{subtitle && <p className="met-subtitle">{subtitle}</p>}</header><div className="air-body">{children}</div>{source && <footer>{source}</footer>}<aside className="notes">{notes}</aside></section>;
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
  return <ol className="dem-steps met-steps">{items.map(([title, text]) => <li key={title}><b>{title}</b><span>{text}</span></li>)}</ol>;
}
function Hero({ items, className = '' }) {
  return <div className={'dem-hero ' + className}>{items.map(([value, label]) => <article key={label}><b>{value}</b><span>{label}</span></article>)}</div>;
}

// Notas do apresentador, como no arquivo original.
const notes = {
  "1": "Apresentar o tema: meteorologia aeronáutica aplicada ao sítio de um vertiporto. Quatro assuntos: temperatura de referência, vento, VMC e IMC, neblina. A aula é prática: cada bloco tem um passo a passo que todos repetem no notebook ou na planilha. (2 min)",
  "2": "Cada linha é um número que o aluno calcula para o aeródromo do seu artigo, com o limite e a norma de onde ele vem. Os limites de través e de cauda são de aeródromo e de avião; para eVTOL ainda não há limite público. Quem não programa usa a planilha. (3 min)",
  "3": "Dois painéis. O que o estudo fez: 90.724 METAR de SBSJ (2015 a 2025), vento por Weibull, VMC pelas categorias da FAA, temperatura de referência de 29,95 °C e VMC em 70,7% do tempo. O que fazemos hoje: o mesmo raciocínio com dados abertos do Mesonet, o critério da ICA 100-12 e quatro aeródromos. (2 min)",
  "4": "Primeiro bloco: de onde vêm os dados e como cada campo do METAR vira coluna. (20 min no total, com o download ao vivo)",
  "5": "Fazer ao vivo. Escolher a rede, filtrar as estações, marcar os campos (temperatura, ponto de orvalho, vento, rajada, visibilidade, nuvens, tempo presente, altímetro e o METAR bruto). O limite é de 1.000 estações-ano por pedido. O mesmo pedido em uma linha está no notebook, função baixar_mesonet. Os 10 anos do SBMT têm 8,5 MB e baixaram em menos de um minuto no teste de 21/10. (5 min)",
  "6": "Este é um dia real de nevoeiro em SBSJ: das 08h30 às 12h UTC (05h30 às 9h local) a visibilidade fica em 200 m com VV002. Mostrar que a hora vem em UTC e que, antes das 08h30, não há boletim porque o aeródromo está fechado. Quem esquecer as unidades calcula visibilidade de 6 metros. (3 min)",
  "7": "Ler o boletim grupo a grupo com a turma. Pontos que mais confundem: a direção do vento é verdadeira; T igual a Td (14/14) é ar saturado; BKN e OVC formam teto, FEW e SCT não. Pedir que encontrem a mesma linha no CSV do notebook (célula do dia 2023-08-02). (4 min)",
  "8": "A altura vem em centenas de pés: BKN003 é 5 a 7 oitavos a 300 ft; no Mesonet, skyc1 = BKN e skyl1 = 300. NSC (sem nuvens significativas) também não forma teto. No SBMT, 2016 a 2025: BKN em 27.971 camadas, OVC em 5.174, VV em 19. Exemplo: SCT a 1.500 ft e BKN a 3.000 ft dá teto de 3.000 ft, porque SCT não conta. (3 min)",
  "9": "A coluna wxcodes traz os códigos separados por espaço, por exemplo \"+TSRA FG\". O notebook marca neblina quando aparece FG sem letra antes, o que exclui BCFG, MIFG, PRFG e VCFG. (2 min)",
  "10": "Fazer a consulta ao vivo. O METAR é observação; o TAF é previsão, com validade de 18 UTC do dia 21 a 24 UTC do dia 22. Leitura do TAF de SBGR: entre 08 e 10 UTC do dia 22, chuvisco (DZ), névoa (BR) e teto de 600 ft (BKN006). No METAR de SBSP, 120V210 é a variação da direção do vento. (4 min)",
  "11": "Vertiporto raramente fica num aeródromo com METAR. Usamos o METAR do aeródromo mais próximo para a estatística (teto, visibilidade, vento) e declaramos a representatividade como limitação. A REDEMET é a fonte oficial do boletim do dia. (2 min)",
  "12": "Segundo bloco: calcular a temperatura de referência e discutir se ela serve para vertiporto. (15 min)",
  "13": "Pedir à turma a definição antes de mostrar. RBAC 154: média das máximas diárias do mês mais quente, sendo o mês mais quente o de maior temperatura média, ao longo de alguns anos. Doc 9157: fórmula antiga, T1 + (T2 − T1)/3, que soma à média diária um terço da diferença para a média das máximas; mostra que a definição mudou. (3 min)",
  "14": "Fazer a sequência no notebook com o SBMT. A coluna tmpc é a temperatura do METAR em °C. O dia precisa de boletins suficientes e de um boletim à tarde, senão a máxima sai baixa. O mês mais quente é o de maior média, não o de maior máxima. (4 min)",
  "15": "Ler o gráfico em dois passos. Primeiro as barras: a temperatura média de cada mês, nos 10 anos juntos; a maior é fevereiro (24,1 °C), por pouco à frente de janeiro (24,0). Depois a linha: a média das máximas diárias; em fevereiro, 28,3 °C. Essa é a leitura B. A leitura A, no slide seguinte, repete a escolha ano a ano. (3 min)",
  "16": "Em cada ano: achar o mês de maior temperatura média e tirar a média das máximas diárias desse mês. Fevereiro foi o mais quente em 4 anos, janeiro em 3, março em 2 e dezembro em 1. A média dos 10 valores dá 29,5 °C, acima dos 28,3 °C da leitura B, porque aqui não há compensação entre anos quentes e frios. O aluno deve dizer qual leitura usou. (3 min)",
  "17": "O gráfico mostra, por hora do dia, quanto a potência de pairado sobe em relação ao nível do mar padrão, com o mesmo peso e o mesmo rotor: P/P0 = √(ρ0/ρ). No SBMT, com 29,5 °C, ρ = 1,070 kg/m³ e a potência sobe 7%. No verão, às 14 h, +7%; no inverno, de manhã, +4%. (3 min)",
  "18": "Discussão de 5 minutos. A analogia: no aeroporto a temperatura alta alonga a pista; no vertiporto ela reduz a massa máxima de decolagem ou a margem de potência, e esquenta a bateria durante a recarga rápida. Não afirmar o que as normas de vertiporto dizem sem conferir; a pergunta fica como tarefa. (5 min)",
  "19": "Terceiro bloco: rosa dos ventos e a conta de proa, través e cauda. (15 min)",
  "20": "A rosa mostra de onde vem o vento, em graus verdadeiros, e com que força. A calmaria é a fração das horas com 00000KT; no notebook, vento_kt == 0. Ela fica no centro da rosa, sem direção. A linha laranja é o eixo da pista. (3 min)",
  "21": "A designação da pista vem do rumo magnético dividido por 10 e arredondado. No SBMT, 122,2° vira 12. Para fazer a conta do vento, vento e pista precisam estar no mesmo norte: ou tudo verdadeiro (METAR + rumo verdadeiro das cabeceiras), ou tudo magnético. O ângulo θ sai igual nos dois casos. (3 min)",
  "22": "Proa e cauda estão ao longo do eixo; través é perpendicular. Limites de través do RBAC 154: 20, 13 ou 10 kt, conforme o comprimento básico de pista. Cauda: até 5 kt, rajadas incluídas, na escolha da pista em uso (Doc 4444, 7.2). Fator de utilização: % do tempo com través abaixo do limite, no mínimo 95%. (3 min)",
  "23": "O vento não depende da cabeceira: é um só. O que muda é para onde a aeronave vai. Pousando para 147° (17R), a componente de 8,3 kt vem de frente; pousando para 327° (35L), a mesma componente vem de trás. O través de 3,5 kt é igual nas duas, só muda o lado. A conta pode ser feita em graus verdadeiros ou magnéticos, desde que vento e pista usem o mesmo norte. (3 min)",
  "24": "Fazer a conta no notebook para a pista do SBMT (rumo verdadeiro 100,3°). VRB é vento variável fraco: o Mesonet traz sknt, mas não drct, e a hora entra sem través nem cauda. A rajada (gust) não entra na conta. (4 min)",
  "25": "Través acima de 10 kt aparece em menos de 2% das horas nos quatro; acima de 15 kt, quase nunca. A última coluna supõe que só uma cabeceira é usada: no SBMT, só a 30 daria cauda acima de 5 kt em 32,6% das horas. (3 min)",
  "26": "As quatro rosas, com o eixo da pista em laranja: SBMT de leste, SBGR de nordeste e leste, SBSP e SBSJ de sul e sudeste. Com uma só trajetória, ela deve ficar contra o vento dominante; no SBMT, só a cabeceira 30 daria cauda acima de 5 kt em 33% das horas. (3 min)",
  "27": "Quarto bloco: classificar cada boletim e montar o mapa de disponibilidade. (15 min)",
  "28": "A classificação da aula usa a primeira linha: teto de 1.500 ft e visibilidade de 5 km. Basta um dos dois abaixo do mínimo para ser IMC. Teto é a base da camada mais baixa com BKN, OVC ou VV. (3 min)",
  "29": "Quatro categorias, da melhor para a pior: VFR, MVFR, IFR e LIFR. Vale a pior das duas condições, teto ou visibilidade. VFR na FAA exige teto acima de 3.000 ft; por isso um teto de 2.000 ft é MVFR na FAA e VMC pela ICA 100-12. (3 min)",
  "30": "Teto: base da camada mais baixa com BKN, OVC ou VV. VMC: teto ≥ 1.500 ft e visibilidade ≥ 5 km; CAVOK é VMC. IMC: qualquer um dos dois abaixo. Horas sem boletim ficam fora: o SBMT fecha das 23 às 6 h. (3 min)",
  "31": "O teto não vem pronto no Mesonet: sai das camadas de nuvem. Hora sem visibilidade informada fica fora da conta. No mapa, horas com boletim em menos de 30% dos dias (aeródromo fechado) não aparecem. (4 min)",
  "32": "O mapa mostra o % de horas em VMC por hora e mês. A pior janela é às 6 h, de junho a outubro: 55% a 64%. No total, 85% das horas em VMC; 11% são IMC só pelo teto e 1% só pela visibilidade. O teto baixo da manhã é o que limita. (3 min)",
  "33": "Os dados são os mesmos; muda só o critério. Pela ICA 100-12, SBSJ fica entre 74% e 87% de VMC; pelo VFR da FAA, entre 54% e 62%; o estudo de referência deu 70,7%. O artigo precisa dizer qual critério usou. (3 min)",
  "34": "Quinto bloco: onde e quando há nevoeiro, e quanto acerta uma regra simples. (12 min)",
  "35": "Conferência do exemplo 16/14: e(16) = 18,2 hPa, e(14) = 16,0 hPa, UR = 16,0 / 18,2 = 88%. Regra prática: cada 1 °C de diferença tira cerca de 5 a 6 pontos de umidade perto da saturação. O ponto de orvalho quase não muda durante a noite; quem cai é a temperatura. (3 min)",
  "36": "Este é o nevoeiro de radiação, o mais comum em Guarulhos e São José dos Campos no inverno. A tarde estava seca (T − Td de 12 °C), mas o céu limpo e o vento quase calmo deixaram a temperatura cair até o ponto de orvalho por volta das 22 h. Primeiro veio a névoa úmida (BR), depois o nevoeiro (FG), que só dissipou depois das 9 h, com o sol. É por isso que a regra de previsão olha T − Td e vento na véspera. (3 min)",
  "37": "A coluna wxcodes traz o tempo presente do METAR como texto, por exemplo \"FG\" ou \"+TSRA FG\". O notebook procura FG sem letra antes. (3 min)",
  "38": "Começar em sala: cada um escolhe o aeródromo e baixa o METAR no Mesonet. Entram na entrega a temperatura de referência, o vento de través, o vento de cauda e VMC/IMC. Prazo: 3 de novembro, às 23h59. (resto do tempo)",
};

export default function E12PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck vert-deck ops-deck dem-deck met-deck">
    <Slide kicker="IT-214 · Mobilidade Aérea Urbana" title="Meteorologia aeronáutica" className="air-title-slide" notes={notes[1]}>
      <div className="met-cover"><p className="air-lead">Temperatura de referência, vento, VMC e IMC e neblina, com METAR</p><div className="air-cover-meta">Marcelo Saraiva Peres<br/>IT-214 Mobilidade Aérea Urbana  |  ITA  |  27 de outubro de 2026</div></div>
    </Slide>

    <Slide kicker="Introdução" title="Objetivos da aula" notes={notes[2]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Grandeza", "Limite ou critério", "De onde vem"]} rows={[["Temperatura de referência", "média das máximas diárias do mês mais quente", "RBAC 154, 154.107"], ["Vento de través", "10, 13 ou 20 kt, conforme o comprimento básico de pista; fator de utilização ≥ 95%", "RBAC 154, Apêndice G"], ["Vento de cauda", "até 5 kt, rajadas incluídas, na escolha da pista em uso", "ICAO Doc 4444 (PANS-ATM), 7.2"], ["VMC", "teto ≥ 1.500 ft e visibilidade ≥ 5 km", "ICA 100-12, 5.1.3"], ["IMC", "teto < 1.500 ft ou visibilidade < 5 km", "ICA 100-12, 5.1.3"]]}/><p className="met-note">Material: E13_meteorologia.ipynb (Python) ou E13_planilha_SBMT.xlsx (Excel), na pasta da atividade.</p></div>
    </Slide>

    <Slide kicker="Introdução" title="Estudo de referência: SBSJ" notes={notes[3]}>
      <div className="met-panels"><article><h3>O que o estudo fez</h3><p>90.724 METAR de SBSJ (2015 a 2025), vento por Weibull, VMC por categorias da FAA, temperatura de referência de 29,95 °C e VMC em 70,7% do tempo.</p></article><article className="met-panel-on"><h3>O que fazemos hoje</h3><p>O mesmo raciocínio com dados abertos do Mesonet, o critério da ICA 100-12 e quatro aeródromos.</p></article></div>
    </Slide>

    <Slide kicker="Bloco 1" title="Fontes de dados" step={0} className="air-title-slide" notes={notes[4]}>
      <div className="met-cover"><p className="air-lead">Mesonet e REDEMET</p></div>
    </Slide>

    <Slide kicker="Bloco 1 · Fontes de dados" title="Iowa Environmental Mesonet (IEM)" subtitle="METAR de 146 aeródromos brasileiros, aberto" step={0} source="Fonte: Iowa Environmental Mesonet, mesonet.agron.iastate.edu/request/download.phtml?network=BR__ASOS, acesso em 21/10/2026." notes={notes[5]}>
      <div className="vt-split vt-split-wide"><Media assetId="e12-iem-estacoes"/><Points items={[["1. Rede", "Brazil ASOS (BR__ASOS)"], ["2. Estações", "SBMT, SBSP, SBGR, SBSJ"], ["3. Campos e datas", "1/1/2016 a 1/1/2026; a data final fica de fora"], ["4. Formato", "UTC, vírgula, faltante = M"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 1 · Fontes de dados" title="CSV do Mesonet: horário e unidades" step={0} source="Fonte: trecho do CSV do IEM, SBSJ, 15/07/2025, horas em UTC, colunas selecionadas. Horário do aeródromo: AISWEB, SBSJ (DLY 0900-0100)." notes={notes[6]}>
      <div className="vt-split vt-split-wide"><Media assetId="e12-csv-sbsj-nevoeiro"/><Points items={[["vsby", "milhas terrestres (1 mi = 1.609 m): 9999 m vira 6,21"], ["skyl", "pés; VV vem como \"VV \", com espaço"], ["alti", "polegadas de mercúrio"], ["Lacuna", "de 02:30 a 08:30 UTC: SBSJ fechado (desde 2020)"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 1 · Fontes de dados" title="Decodificação do METAR" step={0} source="Fonte: METAR real do SBMT de 02/08/2023 (IEM). Códigos: OMM, Manual on Codes (FM 15 METAR), adotado pelo DECEA." notes={notes[7]}>
      <div className="vt-col vt-col-gap"><p className="met-code">SBMT 021000Z 12004KT 0900 FG BKN003 14/14 Q1024</p><Table className="dem-table met-table " head={["Grupo", "O que diz", "Coluna no Mesonet"]} rows={[["021000Z", "dia 2, 10h UTC (7h local)", "valid"], ["12004KT", "vento de 120° verdadeiros a 4 kt", "drct, sknt (gust se houver G)"], ["0900", "visibilidade de 900 m", "vsby = 0,56 mi"], ["FG", "nevoeiro", "wxcodes"], ["BKN003", "5 a 7 oitavos a 300 ft: é o teto", "skyc1, skyl1"], ["14/14 Q1024", "T e Td em °C; QNH em hPa", "tmpc, dwpc, alti (inHg)"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 1 · Fontes de dados" title="Nuvens no METAR" step={0} source="OMM, Manual on Codes (FM 15 METAR). Teto: camada mais baixa abaixo de 20.000 ft que cobre mais da metade do céu (ICA 100-12)." notes={notes[8]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Código", "Significado", "Cobertura do céu", "Forma teto?"]} rows={[["FEW", "poucas nuvens", "1 a 2 oitavos", "não"], ["SCT", "nuvens esparsas", "3 a 4 oitavos", "não"], ["BKN", "nublado", "5 a 7 oitavos", "sim"], ["OVC", "encoberto", "8 oitavos", "sim"], ["VV", "céu obscurecido; o número é a visibilidade vertical", "sem base visível", "sim"], ["CAVOK", "visibilidade ≥ 10 km, sem nuvem abaixo de 5.000 ft, sem CB nem tempo significativo", "", "não (VMC)"]]}/><p className="vt-conclusion">No Mesonet: skyc1 a skyc4 (código) e skyl1 a skyl4 (base em pés). Teto = menor base com BKN, OVC ou VV.</p></div>
    </Slide>

    <Slide kicker="Bloco 1 · Fontes de dados" title="Tempo presente no METAR" step={0} source="OMM, Manual on Codes (FM 15 METAR), tabela 4678." notes={notes[9]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Código", "Significado", "Na aula"]} rows={[["FG", "nevoeiro: visibilidade abaixo de 1.000 m", "conta como neblina"], ["BR", "névoa úmida: visibilidade de 1.000 a 5.000 m", "contada à parte"], ["BCFG, MIFG, PRFG", "nevoeiro em bancos, baixo ou parcial", "não conta"], ["VCFG", "nevoeiro nas vizinhanças, fora do aeródromo", "não conta"], ["RA, DZ, TS", "chuva, chuvisco, trovoada; − fraca, + forte (+TSRA)", "não usado"]]}/><p className="vt-conclusion">No Mesonet: wxcodes (Present Weather Codes), com os códigos como saem no METAR.</p></div>
    </Slide>

    <Slide kicker="Bloco 1 · Fontes de dados" title="REDEMET: METAR e TAF" step={0} source="Fonte: REDEMET (redemet.decea.mil.br), Produtos > Mensagens, 21/10/2026; textos dos boletins de 21/10/2026." notes={notes[10]}>
      <div className="vt-split vt-split-wide"><Media assetId="e12-redemet-painel"/><Points items={[["METAR", "SBSP 211600Z 17009KT 120V210 9999 SCT023 21/15 Q1023"], ["TAF", "SBGR 211630Z 2118/2224 ... BECMG 2208/2210 4000 DZ BR BKN006"], ["Leitura", "entre 08 e 10 UTC do dia 22, chuvisco, névoa e teto de 600 ft"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 1 · Fontes de dados" title="Comparação das fontes" step={0} notes={notes[11]}>
      <div className="met-compare"><article><i>1</i><h3>Mesonet (IEM)</h3><dl><dt>O QUE TEM</dt><dd>METAR horário desde a década de 1970, em CSV</dd><dt>QUANDO USAR</dt><dd>Série do aeródromo; estatística de teto, visibilidade e vento</dd><dt>ONDE</dt><dd>mesonet.agron.iastate.edu</dd></dl></article><article><i>2</i><h3>REDEMET</h3><dl><dt>O QUE TEM</dt><dd>METAR, TAF, avisos, radar e satélite do dia</dd><dt>QUANDO USAR</dt><dd>Leitura oficial do boletim; API com chave para séries</dd><dt>ONDE</dt><dd>redemet.decea.mil.br</dd></dl></article></div>
    </Slide>

    <Slide kicker="Bloco 2" title="Temperatura de referência" step={1} className="air-title-slide" notes={notes[12]}>
      <div className="met-cover"><p className="air-lead">Do comprimento de pista à potência de pairado</p></div>
    </Slide>

    <Slide kicker="Bloco 2 · Temperatura de referência" title="Temperatura de referência: definição" step={1} source="RBAC 154, Emenda 09 (2026), 154.107(b); ICAO Doc 9157, Parte 1, 4ª ed. (2020), 3.5.4." notes={notes[13]}>
      <Steps items={[["RBAC 154", "média mensal das máximas diárias do mês mais quente (o de maior média mensal), ao longo de alguns anos"], ["Doc 9157", "definição antiga: T1 + (T2 − T1)/3, com T1 a média diária e T2 a média das máximas do mês mais quente"]]}/>
    </Slide>

    <Slide kicker="Bloco 2 · Temperatura de referência" title="Temperatura de referência com o Mesonet" step={1} notes={notes[14]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Passo", "Coluna do Mesonet", "Como"]} rows={[["Hora local", "valid", "valid − 3 h (o Mesonet entrega em UTC)"], ["Limpeza", "tmpc", "só METAR de hora cheia; descartar tmpc fora de −10 a 45 °C"], ["Máxima do dia", "tmpc", "maior tmpc do dia; dia válido com 12 boletins ou mais e um entre 12 e 17 h"], ["Mês mais quente", "tmpc", "mês de maior temperatura média do ano, com 20 dias válidos ou mais"], ["Resultado", "tmpc", "média das máximas diárias desse mês; depois, média dos 10 anos"]]}/><p className="met-note">Notebook: funções ler_metar, maximas_diarias e temperatura_referencia. Planilha: abas do SBMT.</p></div>
    </Slide>

    <Slide kicker="Bloco 2 · Temperatura de referência" title="Temperatura de referência no SBMT" subtitle="De 28,3 a 29,5 °C, conforme a leitura de mês mais quente" step={1} source="Definição: RBAC 154, 154.107(b). Dados: METAR do SBMT (IEM), 2016 a 2025, tmpc; dia válido com 12 boletins e um entre 12 e 17 h; mês com 20 dias válidos." notes={notes[15]}>
      <div className="vt-split vt-split-wide"><Media assetId="e12-tr-sbmt-mensal"/><Points items={[["1. Barras", "mês de maior temperatura média: fevereiro, 24,1 °C"], ["2. Linha", "média das máximas diárias de fevereiro: 28,3 °C (leitura B, 10 anos juntos)"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 2 · Temperatura de referência" title="Leitura A: mês mais quente de cada ano" step={1} source="METAR do SBMT (IEM), 2016 a 2025, tmpc. Mês mais quente: o de maior temperatura média no ano; Máximas: média das máximas diárias desse mês." notes={notes[16]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Ano", "Mês", "Máximas (°C)", "Ano", "Mês", "Máximas (°C)"]} rows={[["2016", "fev", "29,7", "2021", "jan", "29,5"], ["2017", "fev", "29,9", "2022", "mar", "28,4"], ["2018", "mar", "29,3", "2023", "dez", "29,5"], ["2019", "jan", "31,1", "2024", "fev", "28,8"], ["2020", "jan", "28,1", "2025", "fev", "30,4"]]}/><p className="vt-conclusion">Média dos 10 anos: 29,5 °C.</p></div>
    </Slide>

    <Slide kicker="Bloco 2 · Temperatura de referência" title="Temperatura e potência de pairado" subtitle="A 722 m e 29,5 °C, cerca de 7% a mais que na atmosfera padrão ao nível do mar" step={1} notes={notes[17]}>
      <div className="vt-col"><div className="met-fill"><Media assetId="e12-pairado-sbmt-hora"/></div></div>
    </Slide>

    <Slide kicker="Bloco 2 · Temperatura de referência" title="Temperatura de referência no vertiporto" step={1} source="ICAO Doc 9157, Parte 1, 4ª ed. (2020), 3.5.3; EASA PTS-VPT-DSN (2022); FAA EB 105A (2024)." notes={notes[18]}>
      <div className="met-panels met-panels-3"><article><h3>Aeroporto</h3><p>A temperatura de referência corrige o comprimento de pista: + 1% por °C acima da atmosfera padrão (Doc 9157, Parte 1, 3.5.3).</p></article><article className="met-panel-on"><h3>Vertiporto</h3><p>Não há pista. O calor entra no desempenho com um motor inoperante, que dimensiona a FATO, na potência de pairado e no limite térmico da bateria e da recarga.</p></article><article><h3>Para a turma</h3><p>Procurar se a PTS-VPT-DSN (EASA, 2022) e o EB 105A (FAA, 2024) pedem alguma temperatura de projeto.</p></article></div>
    </Slide>

    <Slide kicker="Bloco 3" title="Vento" step={2} className="air-title-slide" notes={notes[19]}>
      <div className="met-cover"><p className="air-lead">Rosa dos ventos, declinação e componentes no eixo da pista</p></div>
    </Slide>

    <Slide kicker="Bloco 3 · Vento" title="Rosa dos ventos do SBMT" subtitle="Predomínio de leste e sudeste; acima de 15 kt em 0,25% das horas" step={2} source="Fonte: METAR do SBMT (IEM), 2016 a 2025, 61.175 horas. Rumo das cabeceiras: coordenadas do AISWEB; declinação: WMM 2025, outubro de 2026." notes={notes[20]}>
      <div className="vt-split"><Media assetId="e12-rosa-sbmt"/><Points items={[["Calmaria", "METAR 00000KT (vento abaixo de 1 kt): 4% das horas"], ["Na conta", "calmaria e vento variável fraco (VRB) entram como horas sem través e sem cauda"], ["Acima de 15 kt", "0,25% das horas; rajada em 1% dos boletins (máx. 52 kt)"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 3 · Vento" title="Declinação magnética" step={2} source="Declinação: NOAA, World Magnetic Model 2025, outubro de 2026. Coordenadas das cabeceiras: AISWEB. Vento do METAR em relação ao norte verdadeiro: Anexo 3 (OACI)." notes={notes[21]}>
      <div className="vt-split"><Media assetId="e12-declinacao-sbmt"/><Points items={[["Definição", "ângulo entre o norte verdadeiro e o magnético; em São Paulo, cerca de 22° a oeste (negativa)"], ["Conta", "RM = RV − declinação; SBMT: 100,3 − (−21,9) = 122,2°, cabeceira 12"], ["No tempo", "a declinação muda com os anos, e a pista pode ser redesignada"], ["Vento", "o METAR dá a direção em graus verdadeiros; a torre e o ATIS, em magnéticos"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 3 · Vento" title="Vento de proa, de través e de cauda" step={2} source="RBAC 154, Emenda 09 (2026), definições (44) e Apêndice G, G.1(a)(4) e G.1(b)(3); ICAO Doc 4444 (PANS-ATM), 7.2." notes={notes[22]}>
      <Table className="dem-table met-table " head={["Componente", "O que é", "Limite de referência"]} rows={[["Proa", "ao longo do eixo, contra o movimento", "favorece decolagem e pouso"], ["Través", "perpendicular ao eixo da pista ou da trajetória", "RBAC 154: 20 kt (comprimento básico ≥ 1.500 m), 13 kt (1.200 a 1.500 m), 10 kt (< 1.200 m)"], ["Cauda", "ao longo do eixo, a favor do movimento", "até 5 kt, rajadas incluídas, para escolher a pista em uso (Doc 4444, 7.2)"], ["Fator de utilização", "% do tempo com través abaixo do limite", "RBAC 154: no mínimo 95%"]]}/>
    </Slide>

    <Slide kicker="Bloco 3 · Vento" title="Um vento, duas cabeceiras" step={2} source="METAR SBSP 211600Z 17009KT (21/10/2026), em graus verdadeiros. Rumo verdadeiro da 17R: 147°; declinação em SBSP: WMM 2025." notes={notes[23]}>
      <div className="vt-split"><Media assetId="e12-vento-aerodromo-sbsp"/><Points items={[["Vento", "é do aeródromo: o METAR dá um só vento, 170° e 9 kt"], ["Cabeceira", "muda o sentido do movimento e, com ele, o sinal da componente ao longo da pista"], ["Mesmo norte", "em magnéticos (declinação de −22°): vento 192°, pista 17R 169°; θ = 23°, igual"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 3 · Vento" title="Vento com o Mesonet" step={2} notes={notes[24]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Passo", "Coluna do Mesonet", "Como"]} rows={[["Direção e força", "drct, sknt", "drct em graus verdadeiros; sknt em nós; calmaria: sknt = 0"], ["Rosa dos ventos", "drct, sknt", "% das horas por setor de 22,5° e faixa de 5 kt"], ["Ângulo", "drct", "θ = drct − rumo verdadeiro da cabeceira (coordenadas no AISWEB)"], ["Componentes", "sknt", "proa = sknt × cos θ; través = sknt × sen θ; proa negativa é cauda"], ["Percentuais", "", "% das horas com través > 10, 13 e 20 kt e com cauda > 5 kt; calmaria e VRB contam como zero"]]}/><p className="met-note">Notebook: funções rosa_dos_ventos, componentes e fator_utilizacao. Fator de utilização = % das horas com través até o limite.</p></div>
    </Slide>

    <Slide kicker="Bloco 3 · Vento" title="Vento de través e de cauda nos quatro aeródromos" step={2} source="Fonte: METAR (IEM), 2016 a 2025. Limites de través e fator de utilização de 95%: RBAC 154, Apêndice G." notes={notes[25]}>
      <Table className="dem-table met-table " head={["Aeródromo", "Pista", "Través > 10 kt", "Través > 15 kt", "Cauda > 5 kt, uma só cabeceira"]} rows={[["SBMT", "12/30", "0,79%", "0,02%", "só a 12: 11,0%; só a 30: 32,6%"], ["SBSP", "17R/35L", "0,38%", "0,02%", "só a 17R: 13,9%; só a 35L: 34,5%"], ["SBGR", "10L/28R", "1,85%", "0,11%", "só a 10L: 5,5%; só a 28R: 18,9%"], ["SBSJ", "16/34", "0,68%", "0,06%", "só a 16: 3,2%; só a 34: 15,5%"]]}/>
    </Slide>

    <Slide kicker="Bloco 3 · Vento" title="Vento de cauda com uma só trajetória" step={2} source="Fonte: METAR (IEM), 2016 a 2025. Linha laranja: eixo da pista principal." notes={notes[26]}>
      <div className="vt-col vt-col-gap"><div className="met-fill"><Media assetId="e12-rosas-4-aerodromos"/></div><p className="vt-conclusion">No SBMT, operar só pela cabeceira 30 daria vento de cauda acima de 5 kt em 33% das horas.</p></div>
    </Slide>

    <Slide kicker="Bloco 4" title="VMC e IMC" step={3} className="air-title-slide" notes={notes[27]}>
      <div className="met-cover"><p className="air-lead">Disponibilidade por hora do dia e mês</p></div>
    </Slide>

    <Slide kicker="Bloco 4 · VMC e IMC" title="VMC e IMC na norma brasileira" step={3} source="ICA 100-12, Regras do Ar (DECEA), 5.1.1, tabela 1 e 5.1.3; Anexo 2, Regras do Ar (OACI)." notes={notes[28]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Condição", "Teto", "Visibilidade", "Norma"]} rows={[["VMC: pouso e decolagem VFR no aeródromo", "≥ 1.500 ft (450 m)", "e ≥ 5 km", "ICA 100-12, 5.1.3"], ["IMC no aeródromo", "< 1.500 ft", "ou < 5 km", "ICA 100-12, 5.1.3"], ["VMC em voo (classes C a E, abaixo do FL100)", "300 m (1.000 ft) da nuvem", "5 km; 1.500 m da nuvem", "ICA 100-12, tabela 1"], ["Referência internacional", "mesmos valores", "mesmos valores", "Anexo 2 (OACI), cap. 4"]]}/><p className="vt-conclusion">VMC e IMC descrevem o tempo; VFR e IFR são as regras de voo.</p></div>
    </Slide>

    <Slide kicker="Bloco 4 · VMC e IMC" title="Categorias de voo da FAA" step={3} source="FAA, Aeronautical Information Manual, 7-1-7. 1 mi = 1,609 km." notes={notes[29]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Categoria", "Significado", "Teto", "Visibilidade"]} rows={[["VFR", "Visual Flight Rules: tempo bom para voo visual", "> 3.000 ft", "e > 5 mi (8 km)"], ["MVFR", "Marginal VFR: voo visual possível, com pouca margem", "1.000 a 3.000 ft", "ou 3 a 5 mi (4,8 a 8 km)"], ["IFR", "Instrument Flight Rules: tempo de voo por instrumentos", "500 a 999 ft", "ou 1 a 3 mi (1,6 a 4,8 km)"], ["LIFR", "Low IFR: teto e visibilidade muito baixos", "< 500 ft", "ou < 1 mi (1,6 km)"]]}/><p className="vt-conclusion">Vale a pior das duas condições. Um teto de 2.000 ft é MVFR na FAA e VMC pela ICA 100-12.</p></div>
    </Slide>

    <Slide kicker="Bloco 4 · VMC e IMC" title="Classificação de cada METAR" step={3} source="Critério: ICA 100-12, 5.1.3 (teto de 450 m, ou 1.500 ft, e visibilidade de 5 km). Teto: base da camada mais baixa abaixo de 20.000 ft que cobre mais da metade do céu (ICA 100-12)." notes={notes[30]}>
      <Steps items={[["Teto", "base da camada BKN, OVC ou VV mais baixa; sem elas, não há teto"], ["VMC", "teto ≥ 1.500 ft e visibilidade ≥ 5 km; CAVOK conta como VMC"], ["IMC", "qualquer um dos dois abaixo do mínimo"], ["Horas sem boletim", "ficam fora da conta: o SBMT fecha das 23 às 6 h"]]}/>
    </Slide>

    <Slide kicker="Bloco 4 · VMC e IMC" title="VMC e IMC com o Mesonet" step={3} notes={notes[31]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Passo", "Coluna do Mesonet", "Como"]} rows={[["Teto", "skyc1 a skyc4, skyl1 a skyl4", "menor skyl entre as camadas com skyc = BKN, OVC ou VV; sem elas, sem teto"], ["Visibilidade", "vsby, metar", "vsby × 1.609 m; 6,21 mi (9999) ou CAVOK no campo metar = 10 km"], ["Classificação", "", "VMC se teto ≥ 1.500 ft e visibilidade ≥ 5.000 m; senão, IMC"], ["Mapa", "valid", "% de VMC por hora local e mês"], ["FAA", "as mesmas", "VFR, MVFR, IFR ou LIFR pelos limites da tabela da FAA"]]}/><p className="met-note">Notebook: funções ler_metar (teto e visibilidade), classificar e categoria_faa.</p></div>
    </Slide>

    <Slide kicker="Bloco 4 · VMC e IMC" title="VMC por hora e mês no SBMT" subtitle="Às 6 h, de junho a outubro, VMC em 55% a 64% das horas" step={3} source="Fonte: METAR do SBMT (IEM), 2016 a 2025; critério ICA 100-12, 5.1.3 (1.500 ft e 5 km). Só horas com boletim em 30% dos dias ou mais." notes={notes[32]}>
      <div className="vt-split vt-split-wide"><Media assetId="e12-vmc-hora-mes-sbmt"/><Hero className="met-hero-col" items={[["85%", "das horas em VMC, 2016 a 2025"], ["11%", "IMC só pelo teto"], ["1%", "IMC só pela visibilidade"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 4 · VMC e IMC" title="Efeito do critério: SBSJ" subtitle="De 62% a 87% das horas em VMC, conforme a norma" step={3} source="Fonte: METAR (IEM), 2016 a 2025. Categorias FAA: Aeronautical Information Manual, 7-1-7." notes={notes[33]}>
      <div className="vt-split vt-split-wide"><Media assetId="e12-vmc-criterios"/><Points items={[["ICA 100-12", "1.500 ft e 5 km: 74% a 87%"], ["FAA, VFR", "acima de 3.000 ft e 5 mi: 54% a 62%"], ["Estudo de referência", "SBSJ, CAVOK + VFR: 70,7% (2015 a 2025)"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 5" title="Neblina" step={4} className="air-title-slide" notes={notes[34]}>
      <div className="met-cover"><p className="air-lead">Temperatura, ponto de orvalho e nevoeiro</p></div>
    </Slide>

    <Slide kicker="Bloco 5 · Neblina" title="Temperatura e ponto de orvalho" step={4} source="Umidade relativa pela fórmula de Magnus: e(t) = 6,112 exp(17,62 t / (243,12 + t)) hPa; UR = e(Td) / e(T)." notes={notes[35]}>
      <Steps items={[["T", "temperatura do ar; no METAR, o primeiro número do grupo T/Td (14/12)"], ["Td", "ponto de orvalho: temperatura até a qual o ar precisa esfriar para o vapor condensar"], ["T − Td", "quanto menor, mais úmido o ar; com T = Td, a umidade é de 100%"], ["Exemplos", "23/11: 47% de umidade; 16/14: 88%; 12/12: 100%"]]}/>
    </Slide>

    <Slide kicker="Bloco 5 · Neblina" title="Uma noite de nevoeiro em SBGR" step={4} source="Fonte: METAR do SBGR (IEM), 19 e 20/07/2024, hora local. FG e BR: OMM, Manual on Codes (FM 15 METAR)." notes={notes[36]}>
      <div className="vt-split vt-split-wide"><Media assetId="e12-neblina-noite-sbgr"/><Points items={[["FG", "nevoeiro: visibilidade abaixo de 1.000 m"], ["BR", "névoa úmida: visibilidade de 1.000 a 5.000 m"], ["Formação", "noite clara e vento fraco: o solo esfria, T cai até Td e o vapor condensa junto ao chão"], ["19 e 20/07/2024", "T de 23 para 12 °C; T = Td às 22 h; FG das 2 às 9 h"]]}/></div>
    </Slide>

    <Slide kicker="Bloco 5 · Neblina" title="Neblina com o Mesonet" step={4} notes={notes[37]}>
      <div className="vt-col vt-col-gap"><Table className="dem-table met-table " head={["Passo", "Coluna do Mesonet", "Como"]} rows={[["Nevoeiro", "wxcodes", "boletim com o código FG; BCFG, MIFG, PRFG e VCFG não contam"], ["Névoa úmida", "wxcodes", "boletim com o código BR"], ["Mapa", "valid, wxcodes", "% dos boletins com FG por hora local e mês"], ["Condição", "tmpc, dwpc, sknt", "mediana de T − Td e do vento nos boletins com FG"], ["Regra", "tmpc, dwpc, sknt", "às 21 h: T − Td e vento abaixo do limiar; confere se houve FG entre 6 e 9 h"]]}/><p className="met-note">Notebook: funções neblina, mapa_hora_mes e regra_neblina.</p></div>
    </Slide>

    <Slide kicker="Entrega" title="Entrega da E13" source="Roteiro: E13_roteiro_meteorologia.pdf. Notebook: E13_meteorologia.ipynb. Planilha: E13_planilha_SBMT.xlsx." notes={notes[38]}>
      <Steps items={[["Escolher", "o aeródromo com METAR"], ["Calcular", "temperatura de referência, vento de través, vento de cauda, VMC, IMC e neblina"], ["Entregar", "PDF + notebook, script ou planilha"], ["Prazo", "03 de novembro de 2026, às 23h59, na pasta da turma no Drive"]]}/>
    </Slide>
  </PresentationDeck>;
}
