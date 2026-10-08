import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';
import resources from '@/data/resources.json';
import '../e06-espaco-aereo/e06.css';
import '../e07-tipologias-vertiportos/e07.css';
import '../e08-operacao-vertiportos/e08.css';
import './e09.css';

const presentation = presentations.find((item) => item.slug === 'e09-superficies-obstaculos');
const allResources = Object.values(resources).flat();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const steps = ['Conceito', 'Normas', 'Obstáculos', 'Simulação'];
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
function ReadingList({ ids }) {
  return <div className="air-downloads"><div>{ids.map((id) => { const resource = allResources.find((item) => item.id === id); return <a key={id} href={basePath + resource.assetPath} download><strong>{resource.title}</strong><span>{resource.authors[0]} • {resource.year}</span><b>Baixar PDF ↓</b></a>; })}</div><a className="air-library-link" href={basePath + '/biblioteca/'} target="_blank" rel="noreferrer">Abrir a Biblioteca da disciplina ↗</a></div>;
}

export default function E09PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck vert-deck ops-deck sup-deck">
    <Slide kicker="IT-214 · Mobilidade Aérea Urbana" title="Superfícies de proteção de voo e obstáculos" notes="Primeira parte: conceito e normas. Segunda parte, depois do intervalo: simulação no vertiporto experimental do SBSJ. A leitura indicada na aula passada foi a seção 2.6 e a figura 2-5 do FAA EB 105A." className="air-title-slide">
      <div className="vt-cover"><div><p className="air-lead">Do pátio ao espaço aéreo em volta do vertiporto.</p><p>Rampas de aproximação e decolagem, obstáculos e entorno urbano.</p><p>Aplicação no vertiporto experimental do aeroporto de São José dos Campos (SBSJ).</p><div className="air-cover-meta">E09 · 06/10/2026<br/>Equipe docente IT-214</div></div><Media assetId="e09-sbsj-rampa-ica" caption="Rampa de aproximação de heliponto aplicada ao sítio do SBSJ, em estudo." fit="cover"/></div>
    </Slide>

    <Slide kicker="Conceito" step={0} title="Do solo ao espaço aéreo" source="Fonte: FAA (2024), EB 105A, seção 2.6.1; Sandbox SBSJ, Fase I, vol. I, fig. 3.1 (equipe do projeto, 2026). Figura de uso didático autorizado." notes="Pergunta à turma: o que pode ser obstáculo em volta de um heliponto no centro de São Paulo? Deixar aparecer prédios, antenas, gruas e também o relevo. A foto mostra a área de teste de motores do SBSJ, onde fica o vertiporto experimental.">
      <div className="vt-split vt-split-even"><Media assetId="e09-sbsj-sitio" caption="Sítio do vertiporto experimental no SBSJ, ao lado da pista 16/34." fit="cover"/><Points items={[
        ['Na E07', 'TLOF, FATO e área de segurança definem o que precisa estar livre no solo.'],
        ['Hoje', 'O volume de ar que a aeronave atravessa para chegar e sair também precisa estar livre.'],
        ['O que é obstáculo', 'Edifício, antena, torre, linha de transmissão, guindaste, árvore ou o próprio relevo.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Conceito" step={0} title="Rampa, gradiente e superfície" source="Fonte: ICA 11-408 (DECEA, 2020), item 5.1.10; FAA (2024), EB 105A, seção 2.6.1; EASA (2022), PTS-VPT-DSN.D.405." notes="Conta rápida no quadro: arctan(1/8) = 7,1°. A ICA 11-408 dá as duas finalidades das superfícies: segurança (espaço aéreo livre de obstáculos) e regularidade (mínimos operacionais aceitáveis). A EASA lembra que as dimensões dependem do tamanho da aeronave e do gradiente de subida, em especial com falha crítica.">
      <div className="vt-split sup-split-table"><Table head={['Termo', 'O que significa']} rows={[
        ['Superfície limitadora de obstáculos', 'Plano imaginário acima do qual objetos não devem se projetar.'],
        ['Aproximação e decolagem', 'Rampa que parte da área de pouso e sobe na direção da chegada ou da saída.'],
        ['Transição', 'Plano inclinado que protege as laterais da área de pouso e da rampa.'],
        ['Gradiente', 'Quanto a rampa sobe por distância percorrida.'],
      ]}/><Points items={[
        ['Como ler 8:1', 'A cada 8 m na horizontal, a rampa sobe 1 m. É o mesmo que 12,5% ou 7,1°.'],
        ['Teto num ponto', 'Altura da rampa = distância até a origem × gradiente. A 400 m da origem, a rampa 8:1 está a 50 m.'],
        ['Para que serve', 'Limita a altura do que se constrói em volta e mantém espaço livre para a aeronave.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Normas" step={1} title="FAA EB 105A: aproximação e transição" source="Fonte: FAA (2024), EB 105A, seção 2.6.1 e fig. 2-5." notes="É a leitura indicada na aula passada. As superfícies vêm da Parte 77 do regulamento americano, escrita para helipontos e aplicada a vertiportos. Altura final: 1.219 ÷ 8 = 152 m (500 ft). A superfície primária coincide com a FATO.">
      <div className="vt-split vt-split-even"><Media assetId="e09-faa-superficies" caption="Aproximação e decolagem em azul; transição em amarelo."/><Points items={[
        ['Aproximação e decolagem', 'Começa na borda da FATO, com a largura dela, e sobe a 8:1 por 1.219 m (4.000 ft). No fim tem 152 m de largura e 152 m de altura.'],
        ['Transição', 'Sobe a 2:1 a partir das laterais da FATO e da rampa, até 76 m (250 ft) do eixo.'],
        ['Regra', 'As superfícies devem ficar livres de penetrações, salvo se um estudo aeronáutico concluir que o objeto não é perigo.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Normas" step={1} title="Direções de chegada e saída" source="Fonte: FAA (2024), EB 105A, figs. 2-5 (nota 1) e 2-6; EASA (2022), PTS-VPT-DSN.D.405; ICA 11-408 (DECEA, 2020), tab. 5-2." notes="Ligar com a rosa dos ventos do SBSJ, vista na E08. A EASA pede que o conjunto de direções garanta ao menos 95% de utilização do vertiporto. A ICA 11-408 usa os mesmos limites de curva para helipontos, com mudança de direção de no máximo 120°. Pergunta: num terreno cercado de prédios, o que se ganha com a trajetória curva?">
      <div className="vt-split vt-split-even"><Media assetId="e09-faa-curva" caption="Trajetória curva: trecho reto (S) e raio (R)."/><Points items={[
        ['Vento', 'A direção preferencial segue o vento predominante.'],
        ['Duas direções', 'O ideal são duas superfícies opostas (180°). Quando não cabe, FAA e EASA admitem pelo menos 135° entre elas.'],
        ['Curva', 'Para desviar de um obstáculo, a trajetória pode ser curva: R ≥ 270 m e S + R ≥ 575 m, mantendo 1.219 m de comprimento.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Normas" step={1} title="EASA: volume livre de obstáculos" source="Fonte: EASA (2022), PTS-VPT-DSN.D.440 a D.485, tabs. D-3 e D-6 e fig. D-21." notes="O volume vem do procedimento de decolagem e pouso verticais descrito no manual de voo da aeronave. O Tipo 1 é um volume padronizado que o fabricante pode optar por demonstrar. A EASA também prevê a versão omnidirecional, com diâmetro de 2,83D na base e 5D no topo. D é a dimensão da aeronave, vista na E07.">
      <div className="vt-split vt-split-even"><Media assetId="e09-easa-volume-tipo1" caption="Volume de referência Tipo 1; D é a dimensão da aeronave."/><Points items={[
        ['Objetivo', 'Proteger um pouso e uma decolagem verticais, para o vertiporto caber em área adensada e cheia de obstáculos.'],
        ['Forma', <>Paredes verticais na borda da área de segurança até a altura h<sub>1</sub>; dali o volume se abre em funil até h<sub>2</sub>. A rampa só começa no topo.</>],
        ['Volume Tipo 1', <>h<sub>1</sub> = 3 m, h<sub>2</sub> = 30,5 m, topo com 3D de largura e rampa de 12,5%.</>],
      ]}/></div>
    </Slide>

    <Slide kicker="Normas" step={1} title="Brasil: ICA 11-408 e PCA 351-7" source="Fonte: ICA 11-408 (DECEA, 2020), cap. 5, tab. 5-1 e fig. 5-1; PCA 351-7 (DECEA, 2024), arts. 303 a 306 e fig. 5." notes="ICA 11-408, tabela 5-1, operação visual: categoria A com 4,5% e 3.386 m; categoria B com 8% e depois 16%, 1.075 m; categoria C com 12,5% e 1.220 m. Todas chegam a 152 m. Abertura lateral de 10% de dia e 15% à noite; largura externa de 7 ou 10 diâmetros de rotor. PCA 351-7, art. 305: cone até 90 m de altura e 100 m de raio. A ANAC, no Alerta 001/2023, recomenda adaptar o RBAC 155 (helipontos) para a infraestrutura de eVTOL.">
      <div className="vt-col vt-col-gap"><div className="vt-split vt-split-even sup-fill"><Media assetId="e09-ica-pbzph-vfr" caption="ICA 11-408: rampa de heliponto em planta e em perfil."/><Media assetId="e09-pca-area-acesso" caption="PCA 351-7: área de acesso em cone, com setores a cada 60°."/></div>
      <p className="vt-conclusion">A ICA 11-408 define hoje a zona de proteção dos helipontos. A PCA 351-7 é a concepção do DECEA para a UAM, ainda sem dimensões de projeto.</p></div>
    </Slide>

    <Slide kicker="Normas" step={1} title="Comparação entre as referências" source="Fonte: FAA (2024), seção 2.6.1; EASA (2022), tabs. D-3 e D-6; ICA 11-408 (2020), tab. 5-1; PCA 351-7 (2024), art. 305. Quadro elaborado a partir das normas e do Sandbox SBSJ, vol. III, T12." notes="Comprimento da rampa da EASA no Tipo 1: (152 − 30,5) ÷ 0,125 = 972 m. O gradiente de 12,5% é próprio do volume Tipo 1; para outros procedimentos verticais a EASA admite a partir de 4,5%. Na ICA, a categoria C corresponde a helicópteros de classe de performance 2.">
      <div className="vt-col vt-col-gap"><Table className="sup-compare" head={['', 'FAA EB 105A', 'EASA, volume Tipo 1', 'ICA 11-408, categoria C', 'PCA 351-7']} rows={[
        ['Origem', 'Borda da FATO', 'Topo do funil, a 30,5 m', 'Borda da área de segurança', 'Ponto de referência do vertiporto'],
        ['Gradiente', '8:1 (12,5%)', '12,5%', '12,5%', 'Cone com 100 m de raio a 90 m de altura'],
        ['Comprimento', '1.219 m', '972 m', '1.220 m', '—'],
        ['Altura final', '152 m (500 ft)', '152 m (500 ft)', '152 m', '90 m (300 ft)'],
        ['Proteção lateral', 'Transição 2:1 até 76 m do eixo', 'Paredes do funil', 'Abertura de 10% (dia) ou 15% (noite)', 'A própria parede do cone'],
      ]}/>
      <p className="vt-conclusion">As três rampas têm 12,5% e chegam a 152 m. Muda a origem: a borda da área no solo ou o topo de um funil vertical.</p></div>
    </Slide>

    <Slide className="ops-case" kicker="Normas · aplicação no SBSJ" step={1} title="Superfícies aplicadas ao sítio" source="Fonte: Sandbox SBSJ, Fase I, vol. III, T12, figs. 12.9 e 12.11 (equipe do projeto, 2026). Figuras de uso didático autorizado; estudo preliminar." notes="A equipe desenvolveu um simulador de superfícies de proteção de helipontos e vertiportos. Aeronave de referência: eVTOL da Eve, com D = 16 m adotado no estudo. A geometria da PCA 351-7 é uma implementação inicial: o documento não define de forma suficiente a origem e o raio interno do cone.">
      <div className="vt-col vt-col-gap"><div className="vt-split vt-split-even sup-fill"><Media assetId="e09-sbsj-rampa-ica" caption="Rampa de categoria C da ICA 11-408, em perspectiva."/><Media assetId="e09-sbsj-cone-pca" caption="Cone de acesso e área de transição da PCA 351-7."/></div>
      <p className="vt-conclusion">Com as superfícies modeladas em 3D sobre o terreno, é possível comparar normas e testar obstáculos e trajetórias no mesmo ambiente.</p></div>
    </Slide>

    <Slide kicker="Obstáculos" step={2} title="Obstáculos: fontes de dados" source="Fonte: Sandbox SBSJ, Fase I, vol. I, cap. 4 (equipe do projeto, 2026); ICA 11-408 (DECEA, 2020)." notes="No estudo do SBSJ: ROTAER (AMDT 21/26), carta de obstáculos de 29/12/2022, base de objetos projetados no espaço aéreo com 890 registros regionais e modelo digital de terreno. Pergunta: qual dessas fontes muda de um dia para o outro? O NOTAM.">
      <div className="vt-col vt-col-gap"><Table head={['Fonte', 'O que traz']} rows={[
        ['ROTAER', 'Obstáculos permanentes cadastrados no entorno do aeródromo.'],
        ['Carta de obstáculos do aeródromo (AOC)', 'Perfis com a posição e a altura dos obstáculos em relação às rampas.'],
        ['Base de objetos projetados no espaço aéreo (OPEA)', 'Edifícios, torres e antenas, com posição e altitude do topo.'],
        ['NOTAM', 'Obstáculos temporários, como gruas e guindastes de obra.'],
        ['Modelo digital de terreno', 'Relevo do entorno.'],
      ]}/>
      <p className="vt-conclusion">Cada obstáculo entra na análise com três dados: posição, altitude do topo e período em que existe.</p></div>
    </Slide>

    <Slide className="ops-case" kicker="Obstáculos · aplicação no SBSJ" step={2} title="Entorno do aeroporto" source="Fonte: Sandbox SBSJ, Fase I, vol. I, cap. 4, fig. 4.4 (equipe do projeto, 2026). Figura de uso didático autorizado; estudo preliminar." notes="A base regional tem 890 registros de objetos projetados no espaço aéreo. O estudo ainda não cruzou cada registro com as superfícies: ficou como recomendação. Chamar atenção para a mancha urbana em volta do aeroporto.">
      <div className="vt-split ops-split-media-wide"><Media assetId="e09-sbsj-entorno" caption="Obstáculos cadastrados, torres, linhas de transmissão e área urbanizada em volta do SBSJ."/><Points items={[
        ['Como ler', 'Vermelho: obstáculos cadastrados. Azul: torres de comunicação. Amarelo: área urbanizada. Linhas pretas: plano de zona de proteção do aeroporto.'],
        ['O que aparece', 'Os obstáculos se concentram na mancha urbana que envolve o aeroporto.'],
        ['Limite', 'O cruzamento de cada obstáculo com as superfícies ainda é trabalho futuro do estudo.'],
      ]}/></div>
    </Slide>

    <Slide className="ops-case" kicker="Obstáculos · aplicação no SBSJ" step={2} title="Superfícies do próprio aeroporto" source="Fonte: ICA 11-408 (DECEA, 2020), tab. 4-3, código 4; Sandbox SBSJ, Fase I, vol. I, cap. 4, tab. 4.1 e fig. 4.2 (equipe do projeto, 2026). Estudo preliminar." notes="Elevação do aeródromo: 647 m. O SBSJ tem plano de zona de proteção homologado pela Portaria DECEA nº 26/ICA, de 14/07/2015. O estudo estima, de forma preliminar, que os morros a sudeste (795 a 807 m, a cerca de 7 km) passam do teto da superfície horizontal externa (792 m). A confirmação depende de validação com o DECEA; como o aeroporto já opera aproximações publicadas, é provável que esse relevo já esteja tratado.">
      <div className="vt-split sup-split-table"><Media assetId="e09-sbsj-ols-terreno" caption="Superfícies do SBSJ sobre o modelo de terreno; em vermelho, morros a sudeste."/><div className="vt-col vt-col-gap"><Table className="ops-compact" head={['Superfície', 'Geometria', 'Teto sobre o aeródromo']} rows={[
        ['Aproximação, 1ª seção', '2,0% por 3.000 m', '60 m'],
        ['Aproximação, 2ª seção', '2,5% por 3.600 m', '150 m'],
        ['Horizontal interna', 'Raio de 4.000 m', '45 m'],
        ['Cônica', '5,0%', '145 m'],
      ]}/>
      <p className="vt-conclusion">Um vertiporto dentro do aeroporto herda esses limites: edificação de apoio, balizamento e antenas precisam respeitar o plano de proteção do aeroporto.</p></div></div>
    </Slide>

    <Slide kicker="Obstáculos" step={2} title="Exemplo: o obstáculo fura a rampa?" source="Fonte: Sandbox SBSJ, Fase I, vol. I, cap. 4, tabs. 4.1 e 4.2, com dados do ROTAER (equipe do projeto, 2026). Terceiro caso: cálculo com a rampa do FAA EB 105A." notes="Fazer a conta no quadro. Nos dois primeiros casos a rampa começa 60 m antes da cabeceira, na cota de 647 m. A antena passa pela primeira seção inteira (3.000 m a 2%) e por 2.356 m da segunda (2,5%). O terceiro caso é hipotético.">
      <div className="vt-col"><div className="vt-calc"><article><h3>Prédio, pista 16</h3><p>Topo a 681,4 m, a 2.959 m da cabeceira</p><p>Teto = 647 + 0,02 × (2.959 − 60)</p><p>= 705,0 m</p><p>Folga: <b>+23,6 m</b></p></article><article><h3>Antena, pista 34</h3><p>Topo a 755,6 m, a 5.416 m da cabeceira</p><p>Teto = 647 + 60 + 0,025 × 2.356</p><p>= 765,9 m</p><p>Folga: <b>+10,3 m</b></p></article><article><h3>Rampa 8:1 de um vertiporto</h3><p>Prédio de 60 m, a 400 m da FATO</p><p>Teto = 400 ÷ 8</p><p>= 50 m acima da FATO</p><p>Fura a rampa em <b>10 m</b></p></article></div>
      <p className="vt-conclusion">A conta é a mesma em qualquer norma: teto da superfície na posição do obstáculo menos a altitude do topo.</p></div>
    </Slide>

    <Slide kicker="Obstáculos · estudo em Shenzhen" step={2} title="Obstáculos na escolha do local" source="Fonte: Guo et al. (2024), seções 3.3.1 e 3.3.2, algoritmo 1 e fig. 3." notes="É a conta do slide anterior, automatizada para uma cidade inteira. Os candidatos em planta vêm de áreas livres, cobertas por hexágonos de 500 ft, e de coberturas amplas de edifícios, fora das zonas proibidas para drones. A aeronave de referência é o EH216-S, com D = 5,63 m; TLOF, FATO e área de segurança são quadrados de 1D, 2D e 3D. O modelo devolve também as direções de aproximação e saída que ficaram livres. Pergunta: que dado seria necessário para repetir isso em São Paulo ou em São José dos Campos? A altura de cada edificação.">
      <div className="vt-col vt-col-gap"><div className="sup-strip"><Media assetId="e09-guo-avaliacao" caption="Superfícies giradas em torno do local candidato; em vermelho, os prédios que as penetram."/></div>
      <div className="vt-points sup-points-row"><article><h3>Método</h3><p>Em cada local candidato, as superfícies de aproximação e de transição da FAA são giradas sobre o modelo 3D dos prédios da cidade.</p></article><article><h3>Critério</h3><p>O local é aceito se tiver duas direções livres de obstáculos, separadas por pelo menos 135°.</p></article><article><h3>O que sai</h3><p>A lista de locais viáveis e as direções de chegada e saída livres em cada um.</p></article></div></div>
    </Slide>

    <Slide kicker="Obstáculos · estudo em Shenzhen" step={2} title="Do filtro de obstáculos à rede" source="Fonte: Guo et al. (2024), seções 3.1, 3.2, 3.3.2 e 4.2 e fig. 4." notes="Demanda potencial: 46.537 viagens de táxi com mais de 30 min, em um dia. Com 21 vertiportos, 1.954 viagens migram para o eVTOL. O tempo de transferência pesa muito: quando sobe de 5 para 30 min, as viagens caem de 3.504 para 1.410. Demanda e escolha de sítios são os temas da E10 e da E11.">
      <div className="vt-split ops-split-media-wide"><Media assetId="e09-guo-rede" caption="Demanda potencial e locais selecionados em Shenzhen; o tamanho do ponto indica a importância do local."/><Points items={[
        ['Antes da otimização', 'Só entram os locais que passaram no filtro de obstáculos. Sem as áreas de pouca demanda e os pontos vizinhos, restaram 37 candidatos.'],
        ['Resultado', 'O modelo indicou 21 vertiportos. Acima disso, cada local a mais acrescentava menos de 10 viagens.'],
        ['Limite', 'O estudo não considera a capacidade do vertiporto, a frota nem a autonomia da aeronave.'],
      ]}/></div>
    </Slide>

    <Slide className="ops-case" kicker="Obstáculos · aplicação no SBSJ" step={2} title="Entorno urbano e áreas sensíveis" source="Fonte: ICA 11-408 (DECEA, 2020), item 3.9; Sandbox SBSJ, Fase I, vol. I, cap. 4, fig. 4.5, e vol. III, T1 (equipe do projeto, 2026). Figura de uso didático autorizado; estudo preliminar." notes="Exemplo do relatório: um vertiporto na Avenida Paulista, dentro da zona de proteção de Congonhas, teria o gabarito limitado pela aviação, mesmo que o plano diretor permitisse prédios mais altos. Pela ICA 11-408, os municípios impactados pelo plano de zona de proteção declaram ciência. O registro de urubus perto do aterro vem do ROTAER do SBSJ. Pergunta: quem acompanha um prédio novo que passa a furar a rampa de um vertiporto já em operação?">
      <div className="vt-split vt-split-even"><Media assetId="e09-sbsj-areas-sensiveis" caption="Aterro sanitário, pista do SBSJ e procedimentos visuais de chegada propostos."/><Points items={[
        ['Gabarito', 'A zona de proteção limita a altura das construções, mesmo quando o plano diretor permitiria mais. Exige coordenação entre o DECEA e a prefeitura.'],
        ['Áreas sensíveis', 'No SBSJ: refinaria com espaço aéreo proibido, aterro sanitário que atrai urubus e bairros sob as rotas de chegada.'],
        ['Obstáculos que mudam', 'Gruas e prédios novos aparecem depois do projeto. O entorno precisa ser acompanhado durante toda a operação.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Intervalo" title="Intervalo de 10 minutos" notes="Na volta: simulação de chegadas no vertiporto experimental do SBSJ." className="air-title-slide vt-break-slide">
      <div/>
    </Slide>

    <Slide className="ops-case" kicker="Simulação · aplicação no SBSJ" step={3} title="Procedimento de chegada" source="Fonte: Sandbox SBSJ, Fase I, vol. I, cap. 3, fig. 3.10 (equipe do projeto, 2026). Figura de uso didático autorizado; procedimento proposto para estudo, não publicado." notes="Os procedimentos partem dos portões e setores visuais da carta do SBSJ. A operação no vertiporto é separada no tempo do tráfego por instrumentos da pista, sob controle da torre. Na figura, a faixa laranja é a faixa de voo visual da região (2.700 a 3.700 ft). O caso de ensaio tem aproximação final vertical a partir de 150 ft.">
      <div className="vt-split ops-split-media-wide"><Media assetId="e09-sbsj-perfil-chegada" caption="Perfil de um procedimento de chegada proposto para o vertiporto."/><Points items={[
        ['Em rota', 'Voo nivelado a cerca de 1.000 ft acima do terreno, dentro da faixa de voo visual.'],
        ['Descida', 'Degrau para 500 ft e aproximação até o ponto de hover, a 30 ft sobre o vertiporto.'],
        ['Casos simulados', 'Cinco procedimentos propostos e um caso de ensaio, com 1.024 voos cada.'],
      ]}/></div>
    </Slide>

    <Slide className="ops-case" kicker="Simulação · aplicação no SBSJ" step={3} title="Trajetórias simuladas e a rampa" source="Fonte: Sandbox SBSJ, Fase I, vol. III, T12, fig. 12.16 e seção 12.2.2 (equipe do projeto, 2026). Figura de uso didático autorizado; resultados preliminares." notes="Aqui a superfície é usada como envelope da trajetória: conta-se o voo que fica abaixo dela. Simulação de Monte Carlo com o modelo de desempenho do helicóptero H135, usado como substituto do eVTOL, e condições de vento sorteadas da climatologia do SBSJ. Os procedimentos foram desenhados para estudar a dispersão das trajetórias, não para satisfazer as superfícies.">
      <div className="vt-split ops-split-media-wide"><Media assetId="e09-sbsj-trajetorias-faa" caption="Caso de ensaio: 1.024 voos simulados e a rampa 8:1 da FAA, em verde."/><Points items={[
        ['Como ler', 'Cada linha é um voo. Em vermelho, os que ficaram abaixo da rampa em algum ponto.'],
        ['O que aparece', 'A descida simulada tem cerca de 8,5%, mais rasa que os 12,5% da rampa. As trajetórias cruzam a rampa por baixo perto do topo, a 1,2 km.'],
        ['Como resolver', 'Com 5 m a mais de altitude ao longo do procedimento, os cruzamentos caem para no máximo 0,3% dos voos. Com 10 m, zeram.'],
      ]}/></div>
    </Slide>

    <Slide className="ops-case" kicker="Simulação · aplicação no SBSJ" step={3} title="Comparação entre as superfícies" source="Fonte: Sandbox SBSJ, Fase I, vol. III, T12, fig. 12.14 e tabs. 12.4 e 12.5 (equipe do projeto, 2026). Figura de uso didático autorizado; resultados preliminares." notes="A diferença entre procedimentos vem da altitude com que cada um chega ao topo da rampa: menos de 10 m separam 8% de 73% dos voos. A rampa da EASA aparece mais alta porque começa no topo do funil, a 30,5 m. O funil foi avaliado até a menor altura disponível nos dados; os metros finais até o toque não estão na simulação.">
      <div className="vt-split ops-split-media-wide"><Media assetId="e09-sbsj-violacoes" caption="Parcela dos voos que cruzou cada superfície, nos seis casos simulados."/><Points items={[
        ['Rampas de 12,5%', 'De 8% a 85% dos voos, conforme o procedimento. FAA e ICA 11-408 dão resultados quase iguais.'],
        ['Proteções laterais', 'Transição da FAA: até 4,4%. Funil da EASA: nenhum voo. Cone da PCA 351-7: até 4,2%.'],
        ['Leitura', 'O resultado descreve o procedimento desenhado, não um defeito das normas. O ajuste está no perfil vertical da chegada.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Simulação" step={3} title="Rampa no solo ou funil vertical" source="Fonte: EASA (2022), PTS-VPT-DSN.D.440; Sandbox SBSJ, Fase I, vol. III, T12, seções 12.3 e 12.4 (equipe do projeto, 2026; resultados preliminares)." notes="Fechar a aula com a escolha de projeto. O relatório ressalva que os modelos disponíveis são de helicóptero e que as conclusões precisam ser confrontadas com operações instrumentadas na Fase II. Um plano básico de zona de proteção de vertiporto ainda não existe no Brasil.">
      <div className="vt-col vt-col-gap"><Table className="sup-compare" head={['', 'Rampa desde a borda da área', 'Funil vertical com rampa no topo']} rows={[
        ['Entorno', 'Limita construções ao longo de mais de 1 km em cada direção', 'Libera o entorno próximo: obstáculos podem ficar mais perto'],
        ['Aeronave', 'Chegada inclinada, como a de helicóptero', 'Trecho vertical mais longo, com mais consumo de energia'],
        ['Para onde foi pensado', 'Helipontos e vertiportos com corredor de aproximação livre', 'Áreas adensadas e cheias de obstáculos'],
      ]}/>
      <p className="vt-conclusion">O estudo recomenda que ANAC e DECEA avaliem as superfícies por categoria e por tipo de operação do eVTOL, medindo antes o efeito do voo vertical sobre o alcance.</p></div>
    </Slide>

    <Slide kicker="Próximos passos" title="Próximos encontros" notes="Esta aula não tem entregável.">
      <div className="vt-next"><article><b>13/10 · E10</b><p>Demanda: origem e destino, renda, polos geradores e valor do tempo.</p></article><article><b>20/10 · E11</b><p>Escolha e localização de sítios.</p></article><article><b>27/10 · CP3</b><p>Meteorologia e disponibilidade operacional. Seminário Artigo 3: metodologia, dados, estudo de caso e resultados preliminares.</p></article></div>
    </Slide>

    <Slide kicker="Referências" title="Referências" notes="Lista para consulta.">
      <ul className="vt-refs vt-refs-large">{presentation.references.map((reference) => <li key={reference.shortTitle}>{reference.citation}{reference.url && <> <a href={reference.url} target="_blank" rel="noreferrer">{reference.url.replace('https://', '')}</a></>}</li>)}<li>Equipe do Sandbox Regulatório de Vertiportos (SBSJ). Relatório técnico da Fase I, vols. I e III. ITA/ANAC, 2026. Relatório não publicado; resultados preliminares.</li></ul>
    </Slide>

    <Slide kicker="Materiais" title="Documentos para download" notes="Todos os documentos estão na Biblioteca da disciplina.">
      <ReadingList ids={['faa-2024-eb-105a-vertiport-design', 'easa-2022-vertiport-design-pts', 'decea-2024-conops-uam-nacional', 'it214-2026-2-plano-ensino']}/>
    </Slide>
  </PresentationDeck>;
}
