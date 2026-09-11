import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';
import resources from '@/data/resources.json';
import '../e06-espaco-aereo/e06.css';
import './e07.css';

const presentation = presentations.find((item) => item.slug === 'e07-tipologias-vertiportos');
const allResources = Object.values(resources).flat();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const pressStart = presentation.references.findIndex((reference) => reference.shortTitle === 'Joby Aviation (2023)');
export const metadata = { title: presentation.title, description: presentation.subtitle };

function Slide({ kicker, title, source, notes, children, className = '' }) {
  return <section className={'air-slide ' + className}><header><div className="air-kicker">{kicker}</div><h2>{title}</h2></header><div className="air-body">{children}</div>{source && <footer>{source}</footer>}<aside className="notes">{notes}</aside></section>;
}
function Media({ assetId, caption, fit = 'contain' }) {
  const asset = assets.find((item) => item.id === assetId);
  return <figure className={'air-media vt-media vt-fit-' + fit}><a href={basePath + asset.assetPath} target="_blank" rel="noreferrer" aria-label={`Abrir imagem: ${asset.title}`}><Image src={basePath + asset.assetPath} alt={asset.alt} fill sizes="60vw" priority style={{ objectFit: fit }} /></a><figcaption>{caption && <b>{caption}</b>}<span>{asset.creditLine}</span></figcaption></figure>;
}
function Points({ items }) {
  return <div className="vt-points">{items.map(([label, text]) => <article key={label}><h3>{label}</h3><p>{text}</p></article>)}</div>;
}
function Circle({ letter, label, note, highlight = false }) {
  return <div className={'vt-circle' + (highlight ? ' vt-circle-on' : '')}><b>{letter}</b><div><strong>{label}</strong>{note && <span>{note}</span>}</div></div>;
}
function ReadingList({ ids }) {
  return <div className="air-downloads"><div>{ids.map((id) => { const resource = allResources.find((item) => item.id === id); return <a key={id} href={basePath + resource.assetPath} download><strong>{resource.title}</strong><span>{resource.authors[0]} • {resource.year}</span><b>Baixar PDF ↓</b></a>; })}</div><a className="air-library-link" href={basePath + '/biblioteca/'} target="_blank" rel="noreferrer">Abrir a Biblioteca da disciplina ↗</a></div>;
}

const typologies = [
  ['1', 'Heliponto elevado adaptado', 'Cobertura de edifício alto'],
  ['2', 'Heliponto em solo adaptado', 'Terreno natural ou píer'],
  ['3', 'Estrutura existente', 'Laje extensa e baixa: shopping, garagem, pavilhão'],
  ['4', 'Aeródromo', 'Dentro ou ao lado de aeroporto em operação'],
  ['5', 'Implantação nova', 'Sítio projetado para eVTOL'],
];
const planning = [
  ['vt-flow-viab', 'Viabilidade', 'nível estratégico', 'Vale a pena construir?', ['Demanda e matriz O–D', 'Seleção de sítio', 'Acessibilidade e intermodalidade', 'Viabilidade econômico-financeira', 'Aceitação social, segurança percebida e privacidade', 'Marco regulatório']],
  ['vt-flow-proj', 'Projeto', 'nível tático', 'Como construir?', ['Tipologias de vertiporto', 'Geometria', 'Superfícies de aproximação e decolagem', 'Topografia urbana', 'Infraestrutura de energia', 'Segurança contra incêndio']],
  ['vt-flow-integ', 'Integração', 'nível operacional', 'Como integrar a operação à cidade?', ['Ruído', 'Poluição visual', 'Meio ambiente', 'Uso do solo e zoneamento', 'Integração multimodal e acessibilidade', 'Espaço aéreo urbano']],
];
const heliports = [
  ['SDEL', 'Edifício Spazio JK', 'Elevado', '21 × 21'], ['SDKY', 'Hospital das Clínicas', 'Elevado', '21 × 21'],
  ['SDMT', 'Bradesco Av. Paulista', 'Elevado', '21 × 21'], ['SDSX', 'ITM Expo', 'Elevado', '24 × 24'],
  ['SDVR', 'Pátio Victor Malzoni', 'Elevado', '30 × 30'], ['SIBH', 'Helicidade', 'Elevado', '24 × 24'],
  ['SJXK', 'Eldorado', 'Elevado', '24 × 24'], ['SSXK', 'Kartódromo Ayrton Senna', 'Solo', '24 × 24'],
  ['SSYH', 'Hospital Autódromo', 'Solo', '19,5 × 19,5'], ['SIAV', 'Helipark (Carapicuíba)', 'Elevado', '25,7 × 25,7'],
  ['SSUB', 'HBR (Osasco)', 'Elevado', '24 × 24'], ['SWAB', 'Bradesco Previdência (Barueri)', 'Elevado', '24 × 24'],
];

export default function E07PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck vert-deck">
    <Slide kicker="IT-214 · Mobilidade Aérea Urbana" title="Vertiportos I: componentes e tipologias" notes="Apresentar o tema da aula: o que é um vertiporto, como se dimensiona a área de pouso e decolagem e as cinco tipologias de implantação." className="air-title-slide">
      <div className="vt-cover"><div><p className="air-lead">Componentes, dimensões mínimas e cinco tipologias de implantação</p><p>Normas da FAA e da EASA, literatura recente e casos em São Paulo, Nova York, Paris, Roma e Dubai.</p><div className="air-cover-meta">E07 · 15/09/2026<br/>Equipe docente IT-214</div></div><Media assetId="e07-voloport-singapura" caption="VoloPort, protótipo de terminal da Volocopter e da Skyports em Singapura (2019)." fit="cover"/></div>
    </Slide>

    <Slide kicker="O problema" title="Onde pousar?" source="Fonte: SIGMA-City (2026), apresentação do Produto III." notes="Abrir com as perguntas do SIGMA-City. Hoje o eVTOL tem aeroportos e helipontos à disposição; o vertiporto ainda está em definição.">
      <div className="vt-problem"><div className="vt-circles"><Circle letter="A" label="Aeroporto"/><Circle letter="H" label="Heliponto"/><Circle letter="V" label="Vertiporto" highlight/></div>
        <div className="vt-cards vt-cards-2"><article><h3>Sítio</h3><p>Sob quais critérios o sítio é escolhido?</p></article><article><h3>Projeto</h3><p>Quais critérios orientam a elaboração do projeto?</p></article></div>
        <p className="vt-conclusion">A literatura converge para o diagnóstico de que a infraestrutura de solo tende a ser o fator limitante da escala da mobilidade aérea urbana.</p></div>
    </Slide>

    <Slide kicker="Parte 1 · Conceitos" title="O que é um heliponto" source="Fonte: Brasil (1986), Código Brasileiro de Aeronáutica, arts. 27 e 31; EASA (2022); ANAC (2023, p. 22)." notes="Perguntar à turma a diferença entre heliponto e heliporto antes de mostrar as definições. A foto mostra o heliponto do Hospital Sírio-Libanês, em São Paulo.">
      <div className="vt-split"><Media assetId="e07-heliponto-sirio-libanes" caption="Heliponto do Hospital Sírio-Libanês, em São Paulo." fit="cover"/><Points items={[
        ['Aeródromo', '“Toda área destinada a pouso, decolagem e movimentação de aeronaves” (CBA, art. 27).'],
        ['Heliponto', 'Aeródromo “destinado exclusivamente a helicópteros” (CBA, art. 31). Pela ICAO e pela EASA, pode ficar em terra ou sobre uma estrutura.'],
        ['Heliporto', 'Heliponto público, com instalações para embarque e desembarque de pessoas e cargas (CBA, art. 31).'],
        ['No Brasil', 'Todos os helipontos cadastrados na ANAC são de uso privativo, com uma única exceção.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Parte 1 · Conceitos" title="Heliponto e vertiporto: existe convergência de conceito?" source="Fonte: SIGMA-City (2026), apresentação do Produto III; FAA (2025); EASA (2022); ANAC (2023, p. 22); DECEA (2024)." notes="Mesma pergunta do SIGMA-City. Deixar a turma responder às três perguntas antes de comentar a posição de cada órgão.">
      <div className="vt-concept"><div className="vt-concept-top"><div className="vt-circles vt-circles-small"><Circle letter="H" label="Heliponto"/><Circle letter="V" label="Vertiporto" highlight/></div><blockquote><p>Vertiporto: “área em terra, na água ou sobre uma estrutura, usada ou destinada ao pouso, à decolagem, ao táxi, ao estacionamento e à guarda de aeronaves powered-lift”.</p><cite>Definição legal adotada pela FAA (Lei de Reautorização da FAA, 2024, seção 951), tradução livre</cite></blockquote></div>
        <div className="vt-cards vt-cards-3"><article><h3>Equipara-se ao aeródromo?</h3><p>EASA: sim. Para fins regulatórios, o vertiporto é classificado como aeródromo.</p></article><article><h3>Evolução do heliponto?</h3><p>FAA: o vertiporto é um tipo de heliponto; o EB 105A complementa a norma de helipontos.</p></article><article><h3>Nova infraestrutura?</h3><p>ANAC: adaptar rapidamente os helipontos “já se mostrou inadequado”; serão necessários novos locais.</p></article></div>
        <p className="vt-conclusion">Existem divergências entre as definições dos principais órgãos aeronáuticos sobre o que é, efetivamente, um vertiporto. No Brasil, o DECEA usa “vertiporto” para todos os casos.</p></div>
    </Slide>

    <Slide kicker="Parte 1 · Conceitos" title="Vertihub, vertiporto e vertistop" source="Fonte: FAA (2022) e EASA, apud Schweiger e Preis (2022); ANAC (2023, p. 23)." notes="Separar porte (vertihub, vertiporto, vertistop) de tipologia (onde e sobre o que se constrói), que é o tema da Parte 4.">
      <div className="vt-col"><div className="vt-cards vt-cards-3"><article><h3>Vertihub</h3><p>Maior porte: várias áreas de pouso, recarga, manutenção e serviços ao passageiro.</p></article><article><h3>Vertiporto</h3><p>Várias áreas de pouso, recarga e terminal. A EASA compara a um terminal de ônibus.</p></article><article><h3>Vertistop</h3><p>Só embarque e desembarque, sem recarga, manutenção ou guarda de aeronaves. Equivale a um ponto de ônibus.</p></article></div>
        <p className="vt-conclusion vt-conclusion-light">A ANAC sugere vertistops nos centros urbanos, sem recarga, e vertiportos com recarga e manutenção inicialmente mais afastados.</p></div>
    </Slide>

    <Slide kicker="Parte 1 · Conceitos" title="Viabilidade, projeto e integração" source="Fonte: SIGMA-City (2026), Produto 3, fig. 2.1, e apresentação do Produto III." notes="Esta aula trata dos dois primeiros itens do nível de projeto: tipologias e geometria. Os demais itens voltam nas próximas aulas: superfícies (E09), demanda (E10), escolha de sítios (E11), ruído (E13), energia e incêndio (E14).">
      <div className="vt-flow">{planning.map(([className, name, level, question, items]) => <div key={name} className={'vt-flow-col ' + className}><header><strong>{name}</strong><span>{level}</span></header><p className="vt-flow-question">{question}</p><ul>{items.map((item) => <li key={item} className={item === 'Tipologias de vertiporto' || item === 'Geometria' ? 'vt-flow-on' : ''}>{item}</li>)}</ul></div>)}</div>
    </Slide>

    <Slide kicker="Parte 1 · Conceitos" title="Componentes: lado ar e lado terra" source="Fonte: Schweiger e Preis (2022), fig. 6; FAA (2024); NREL (2023)." notes="A imagem é um estudo do projeto HorizonUAM, do DLR, para um vertiporto no aeroporto de Hamburgo. Perguntar à turma quais elementos um heliponto comum não tem.">
      <div className="vt-split vt-split-wide"><Media assetId="e07-dlr-horizonuam-componentes" caption="Vertiporto proposto no aeroporto de Hamburgo (projeto HorizonUAM)."/><Points items={[
        ['Lado ar', 'TLOF, FATO, área de segurança, pistas de táxi, posições de estacionamento (stands) e área de proteção.'],
        ['Lado terra', 'Terminal de passageiros, embarque e desembarque, acesso de veículos e estacionamento.'],
        ['Sistemas', 'Recarga, combate a incêndio, iluminação, biruta, comunicação e controle de acesso.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Parte 2 · Geometria" title="A aeronave de projeto define as dimensões" source="Fonte: FAA (2024), EB 105A, fig. 1-1 e tab. 1-1." notes="O vertiporto é dimensionado para a maior aeronave prevista (design VTOL aircraft). Na foto, o Joby S4 na Base Aérea de Edwards, em 2023.">
      <div className="vt-three-col"><Media assetId="e07-faa-dimensao-controle" caption="D e RD em planta."/><Points items={[
        ['D — dimensão de controle', 'Diâmetro do menor círculo que envolve a aeronave em planta, com os rotores girando.'],
        ['RD — diâmetro de rotor', 'Maior distância entre as pontas dos rotores.'],
        ['Aeronave de referência (FAA)', 'D ≤ 15,2 m; PMD ≤ 5.670 kg; piloto a bordo; operação em condições visuais (VMC).'],
      ]}/><Media assetId="e07-joby-s4" caption="Joby S4: seis rotores inclináveis." fit="cover"/></div>
    </Slide>

    <Slide kicker="Parte 2 · Geometria" title="Que áreas são estas?" source="Fonte: FAA (2024), EB 105A, fig. 2-1, com a legenda removida." notes="Pergunta direta à turma: quem sabe o nome e a função de cada área? Ouvir as respostas e seguir para o próximo slide, que traz a legenda e as definições.">
      <div className="vt-split"><Media assetId="e07-faa-tlof-fato-sem-legenda"/><div className="vt-prompt vt-prompt-side"><ul className="vt-questions-list"><li>Onde a aeronave toca a superfície?</li><li>Onde termina a aproximação e começa a decolagem?</li><li>Para que serve a faixa externa?</li></ul><p className="vt-muted">As cotas 1 RD, 2 RD e 2,5 D são as dimensões mínimas da FAA.</p></div></div>
    </Slide>

    <Slide kicker="Parte 2 · Geometria" title="TLOF, FATO e área de segurança" source="Fonte: FAA (2024), EB 105A, seções 2.2 a 2.4 e tab. 2-1; EASA (2022), PTS-VPT-DSN." notes="A FAA usa RD para TLOF e FATO e D para a área de segurança; a EASA usa D. A FAA observa que o fator 0,83 D, usado para helicópteros, não se aplica diretamente a eVTOL.">
      <div className="vt-split vt-split-narrow"><Media assetId="e07-faa-tlof-fato"/><div className="vt-stack">
        <dl className="vt-defs"><dt>TLOF</dt><dd>Área de toque e de elevação inicial. Superfície resistente onde a aeronave toca e decola; na FAA, suporta carga dinâmica de 150% do PMD.</dd><dt>FATO</dt><dd>Área de aproximação final e de decolagem. Onde termina a aproximação e começa a decolagem.</dd><dt>Área de segurança</dt><dd>Faixa livre de obstáculos em volta da FATO, para o caso de desvio da aeronave.</dd></dl>
        <table className="vt-table"><thead><tr><th>Dimensão mínima</th><th>FAA (2024)</th><th>EASA (2022)</th></tr></thead><tbody><tr><td>TLOF</td><td>1 RD</td><td>0,83 D</td></tr><tr><td>FATO</td><td>2 RD</td><td>1,5 D</td></tr><tr><td>Área de segurança</td><td>2,5 D no total</td><td>3 m ou 0,25 D além da FATO (o maior)</td></tr></tbody></table>
      </div></div>
    </Slide>

    <Slide kicker="Parte 2 · Geometria" title="Exemplo: a aeronave de referência cabe no heliponto do HC?" source="Fonte: FAA (2024), tab. 1-1 e 2-1; EASA (2022); SIGMA-City (2026), Produto 3, tab. 6.3." notes="Fazer a conta no quadro. A dimensão do SDKY é a do cadastro usado no Produto 3. A verificação é preliminar: não considera superfícies de aproximação e decolagem nem obstáculos, que serão vistos na E09.">
      <div className="vt-col"><div className="vt-calc"><article><h3>Dados</h3><p><b>D = 15,2 m</b> (aeronave de referência da FAA)</p><p><b>SDKY</b>, Hospital das Clínicas: heliponto elevado de <b>21 × 21 m</b></p></article><article><h3>FAA</h3><p>Área de segurança: 2,5 × 15,2 = <b>38,0 m</b></p><p>Maior D que cabe em 21 m: 21 ÷ 2,5 = <b>8,4 m</b></p></article><article><h3>EASA</h3><p>FATO: 1,5 × 15,2 = 22,8 m</p><p>Faixa: máx.(3 m; 3,8 m) = 3,8 m</p><p>Total: 22,8 + 2 × 3,8 = <b>30,4 m</b></p><p>Maior D que cabe em 21 m: <b>10,0 m</b></p></article></div>
      <p className="vt-conclusion">Com 21 × 21 m, o heliponto não comporta a aeronave de referência por nenhum dos dois critérios. Nem a FATO da EASA (22,8 m) cabe.</p></div>
    </Slide>

    <Slide kicker="SIGMA-City · RMSP" title="E os outros helipontos da RMSP?" source="Fonte: SIGMA-City (2026), Produto 3, cap. 6, e apresentação do Produto III; FAA (2024); EASA (2022)." notes="Os 12 helipontos vieram do SIGMA-Sky: dez elevados e dois no solo. A verificação usa as dimensões cadastradas e não considera superfícies nem obstáculos.">
      <div className="vt-split vt-split-even"><div className="vt-col vt-col-gap">
        <div className="vt-why"><h3>Por que helipontos?</h3><Circle letter="A" label="Aeroporto" note="sandbox regulatório"/><Circle letter="V" label="Vertiporto" note="ainda não existe"/><Circle letter="H" label="Heliponto" note="infraestrutura vasta" highlight/></div>
        <p className="vt-conclusion">Nenhum dos 12 comporta a aeronave de referência (D = 15,2 m). O maior, SDVR (30 × 30 m), fica 0,4 m abaixo do que a EASA exige (30,4 m).</p>
        <p className="vt-note">No estudo de caso, a FAA se mostrou mais restritiva que a EASA, porque exige maior área. Downwash e outwash podem exigir margens adicionais.</p></div>
        <table className="vt-table vt-heliports"><thead><tr><th>Código</th><th>Local</th><th>Tipo</th><th>Dimensões (m)</th></tr></thead><tbody>{heliports.map(([code, place, kind, size]) => <tr key={code}><td>{code}</td><td>{place}</td><td>{kind}</td><td>{size}</td></tr>)}</tbody></table></div>
    </Slide>

    <Slide kicker="Parte 3 · Normas" title="Quando um vertiporto é elevado" source="Fonte: FAA (2024), EB 105A, definição 9, seções 2.2 e 7.3 e fig. 4-7; EASA (2022); SIGMA-City (2026), seção 4.1." notes="O critério de altura é regulatório: a mesma plataforma pode mudar de categoria conforme a norma. Mostrar na figura a rede de proteção e a iluminação da TLOF.">
      <div className="vt-split"><Media assetId="e07-faa-elevado"/><Points items={[
        ['FAA', 'Elevado quando TLOF e FATO estão a 0,8 m (30 pol.) ou mais acima da superfície ao redor.'],
        ['EASA', 'Elevado quando a estrutura em terra tem 3 m ou mais.'],
        ['Consequência', 'Uma plataforma a 1,5 m é elevada para a FAA e de superfície para a EASA.'],
        ['Exigências do elevado', 'Capacidade estrutural, rede de proteção na borda, controle do downwash, turbulência gerada pelo edifício, combate a incêndio e rota de evacuação.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Parte 3 · Normas" title="Como cada autoridade classifica a implantação" source="Fonte: SIGMA-City (2026), Produto 3, tab. 4.1; FAA (2024); EASA (2022); DECEA (2024), PCA 351-7, art. 3º; ANAC (2023)." notes="Nenhuma norma separa uma cobertura de torre de uma laje extensa e baixa. Essa lacuna motivou as cinco tipologias do Produto 3.">
      <table className="vt-table vt-table-full"><thead><tr><th>Autoridade</th><th>Classificação</th><th>Critério</th><th>Observação</th></tr></thead><tbody>
        <tr><td>FAA (EUA)</td><td>Solo, estrutura elevada ou cobertura</td><td>Elevado a partir de 0,8 m</td><td>Vertiporto em aeroporto tratado à parte (cap. 6 e apêndice A)</td></tr>
        <tr><td>EASA (UE)</td><td>Superfície ou elevado</td><td>Elevado a partir de 3 m</td><td>A distinção foi eliminada em vários requisitos</td></tr>
        <tr><td>DECEA</td><td>Nenhuma</td><td>—</td><td>“O termo vertiporto será aplicado em todos os casos”</td></tr>
        <tr><td>ANAC</td><td>Nenhuma</td><td>—</td><td>Considera inadequada a simples adaptação de helipontos existentes</td></tr>
      </tbody></table>
    </Slide>

    <Slide kicker="Parte 3 · Literatura" title="O que dizem as revisões recentes" source="Números de Di Mascio et al. e de Rohrmeier et al. conforme SIGMA-City (2026), seção 4.1.2. Referências completas no slide 30." notes="Os três primeiros trabalhos são de acesso aberto e podem ser usados na atividade.">
      <div className="vt-lit">
        <article><b>Schweiger e Preis (2022)</b><p>Revisão de 49 artigos (2016–2021). “Vertiporto” virou o termo predominante; custo, segurança, regulação, clima e ruído ainda são pouco estudados.</p></article>
        <article><b>Di Mascio, Del Serrone e Moretti (2025)</b><p>Revisão PRISMA de 84 documentos. Vertiportos em cobertura enfrentam acesso restrito e turbulência; no solo, integram-se melhor a outros modos, mas disputam espaço urbano.</p></article>
        <article><b>Li (2023)</b><p>No sul da Califórnia, helipontos e edifícios-garagem são abundantes, mas restrições de ruído, de escolas e do espaço aéreo reduzem muito as opções.</p></article>
        <article><b>Brunelli, Ditta e Postorino (2023)</b><p>A localização pesa mais que o número de vertiportos; o número de áreas de pouso, o de gates e o clima afetam muito a capacidade.</p></article>
        <article><b>Rohrmeier, Wei e Ison (2026)</b><p>Triagem por segurança, acesso e equidade: 1.392 de 234.693 lotes aprovados em São Francisco, 43 de 459.282 em San José e 3 de 51.836 em Livermore.</p></article>
        <article><b>Zelinski (2020); Vascik e Hansman (2019)</b><p>O arranjo das áreas de pouso e dos stands limita a capacidade do vertiporto. Tema da E08.</p></article>
      </div>
    </Slide>

    <Slide kicker="Parte 3 · Literatura" title="Estudos sobre São Paulo" source="Referências completas no slide 30." notes="São Paulo tem uma das maiores frotas de helicópteros do mundo e muitos helipontos, por isso os estudos partem do reaproveitamento. Guardar o contraste com a posição da ANAC.">
      <div className="vt-split vt-split-text"><div className="vt-lit vt-lit-single">
        <article><b>O’Reilly et al. (2025)</b><p>Com dados da ANAC e do DECEA, concluem que os helipontos da cidade têm capacidade para operar eVTOL, substituindo ou complementando helicópteros.</p></article>
        <article><b>Ribeiro et al. (2023)</b><p>Helipontos e aeródromos como vertiportos de acesso aos aeroportos: economia de 18,5 a 63 minutos, mas podem ser necessários vertiportos novos.</p></article>
        <article><b>Rodrigues et al. (2026)</b><p>Simulação da troca de helicópteros por eVTOL e das emissões evitadas.</p></article>
        <article><b>SIGMA-City (2026)</b><p>Doze helipontos da RMSP analisados quanto a superfícies de proteção, obstáculos e ruído; proposta das cinco tipologias.</p></article>
        <article><b>Freitas, Costa e Bandeira (2026)</b><p>Mapeamento de 31 estudos sobre localização de vertiportos; predominam modelos de otimização.</p></article>
      </div><Media assetId="e07-eve-prototipo" caption="Protótipo da Eve (Embraer) em voo, março de 2026." fit="cover"/></div>
    </Slide>

    <Slide kicker="Parte 4 · Tipologias" title="Cinco tipologias de implantação" source="Fonte: SIGMA-City (2026), Produto 3, seção 4.1.3, e apresentação do Produto III; ilustração: FAA, Advanced Air Mobility Infrastructure." notes="Ler as cinco rapidamente; cada uma será detalhada com um caso real. A classificação combina o sítio e a estrutura de suporte, porque a divisão entre solo e elevado não basta para o projeto.">
      <div className="vt-split vt-split-even"><Media assetId="e07-faa-locais-vertiportos" caption="Locais possíveis para vertiportos e vertistops, segundo a FAA."/><div className="vt-col vt-col-gap"><ol className="vt-typelist">{typologies.map(([number, name, site]) => <li key={number}><b>{number}</b><div><h3>{name}</h3><p>{site}</p></div></li>)}</ol>
        <p className="vt-note">Origem: o DECEA recomendou ao SIGMA-City estudar quatro casos (vertiporto novo, prédio existente, laje de shopping ou imóvel baixo e aeroporto). O Produto 3 acrescentou o heliponto em solo.</p></div></div>
    </Slide>

    <Slide kicker="Tipologia 1" title="Heliponto elevado adaptado" source="Fonte: SIGMA-City (2026), seção 4.1.3 e tab. 6.3; FAA (2024), seção 2.2; NREL (2023)." notes="Chamar atenção para as árvores, as antenas e o edifício vizinho: obstáculos e turbulência. Recarga em cobertura exige potência elétrica e proteção contra incêndio de baterias.">
      <div className="vt-split vt-split-wide"><Media assetId="e07-heliponto-prefeitura-sp" caption="Helicóptero decola da cobertura da Prefeitura de São Paulo, 2012." fit="cover"/><Points items={[
        ['Sítio', 'Cobertura de edifício alto já registrada como heliponto.'],
        ['A favor', 'Localização central e ambiente aeronáutico já existente.'],
        ['Pontos críticos', 'Área limitada (SDKY: 21 × 21 m), carga estrutural, borda, downwash, acesso por elevador, evacuação e recarga na cobertura.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Intervalo" title="Intervalo de 10 minutos" notes="Na volta, começar pela pergunta sobre converter o heliponto ou construir outro vertiporto." className="air-title-slide vt-break-slide">
      <div/>
    </Slide>

    <Slide kicker="Tipologia 1 · pergunta à turma" title="Converter o heliponto ou construir outro vertiporto?" source="Fonte: ANAC (2023), Advanced Air Mobility: panorama e perspectivas 2023, p. 22." notes="Pedir um argumento de cada lado. Só então revelar a posição da ANAC (avançar com a seta).">
      <div className="vt-vote"><article><b>A</b><h3>Converter</h3><p>Mantém a localização e a estrutura existentes, com prazo menor.</p></article><article><b>B</b><h3>Construir outro</h3><p>Área dimensionada para a aeronave de projeto, para a recarga e para o fluxo de passageiros.</p></article>
        <aside className="fragment"><h3>Posição da ANAC (2023)</h3><p>“Havia uma ideia, em 2020-21, de que se poderia rapidamente adaptar heliportos e helipontos, mas isso já se mostrou inadequado.” Os helipontos estão onde o ruído não incomoda, e a AAM pretende operar perto das pessoas. E todos os helipontos cadastrados na ANAC são de uso privativo, com uma única exceção.</p></aside></div>
    </Slide>

    <Slide kicker="Tipologia 2" title="Heliponto em solo adaptado" source="Fonte: Joby Aviation (2023); FAA (2024), EB 105A, definição 8; SIGMA-City (2026)." notes="A FAA define uma área de cautela de downwash e outwash onde o escoamento pode passar de 55,5 km/h. Por causa da campanha da Joby, o SIGMA-City aplicou a Nova York a mesma metodologia usada na RMSP. Em São Paulo, o SSYH é um heliponto hospitalar em solo.">
      <div className="vt-split vt-split-wide"><Media assetId="e07-downtown-manhattan-heliport" caption="Downtown Manhattan Heliport, em um píer do East River." fit="cover"/><Points items={[
        ['Caso', 'Primeiro voo de eVTOL em Nova York, em 12/11/2023 (Joby). Na ocasião, a prefeitura anunciou a intenção de eletrificar o heliponto.'],
        ['A favor', 'Acesso de passageiros, socorro e manutenção mais simples; espaço para recarga.'],
        ['Pontos críticos', 'Disputa por terreno, downwash sobre pessoas e veículos, separação de fluxos e ruído no entorno.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Tipologia 3" title="Estrutura existente: lajes extensas e baixas" source="Fonte: SIGMA-City (2026), seção 4.1.3; Li (2023); AIN (2021)." notes="Hospitais ilustram bem a classe: o SDKY (HC) está sobre laje e é elevado; o SSYH está em solo. A EASA dá aos hospitais marcação própria (cruz branca sob o V vermelho), mas não uma tipologia própria.">
      <div className="vt-split vt-split-wide"><Media assetId="e07-portland-heliponto-garagem" caption="Portland: heliponto na cobertura de um edifício-garagem de 1989, fechado em 2025." fit="cover"/><Points items={[
        ['Sítio', 'Cobertura de shopping, edifício-garagem, pavilhão ou complexo hospitalar.'],
        ['Por que separar', 'As normas tratam o caso como elevado, mas a laje extensa se aproxima de um sítio em solo: mais área e vários acessos.'],
        ['Casos', 'Eldorado (SJXK) e ITM Expo (SDSX, 24 × 24 m), em São Paulo; acordo Archer–REEF (2021) para coberturas de garagens nos EUA.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Tipologia 4" title="Vertiporto em aeródromo" source="Fonte: FAA (2024), EB 105A, cap. 6 e apêndice A (A.3.1), fig. A-1." notes="A esteira de turbulência dos aviões obriga a separação entre a FATO e as pistas. Quanto mais perto da pista, maior o impacto nas duas operações.">
      <div className="vt-split vt-split-narrow"><Media assetId="e07-faa-aeroporto-cenarios" caption="(a) ao lado da pista; (b) entre pistas paralelas; (c) além da cabeceira."/><Points items={[
        ['Sítio', 'Dentro de um aeródromo em operação ou ao lado dele.'],
        ['A favor', 'Ambiente aeronáutico, serviços de apoio, controle de tráfego aéreo e conexão com voos regionais e internacionais.'],
        ['Pontos críticos', 'Coordenação com o ATC, separação por esteira de turbulência, cruzamento de pistas de táxi e distância até os destinos urbanos.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Tipologia 4 · Casos" title="Vertiportos de teste em aeroportos" source="Fonte: Volocopter (2022a; 2022b); Band (2025); OVALE (2026); CNN Brasil (2026)." notes="Os dois vertiportos europeus foram montados para testes. Perguntar o que eles têm em comum com a figura do slide 7.">
      <div className="vt-col"><div className="vt-pair"><Media assetId="e07-pontoise-terminal" caption="Pontoise-Cormeilles (Paris), nov. 2022: terminal de 115 m² do Groupe ADP e da Skyports." fit="cover"/><Media assetId="e07-fiumicino-vertiporto" caption="Fiumicino (Roma), out. 2022: cerca de 5.500 m², FATO, pátio, hangar de 20 × 20 m e recarga." fit="cover"/></div>
      <p className="vt-conclusion vt-conclusion-small">No Brasil: vertiporto experimental no aeroporto de São José dos Campos, no sandbox regulatório da ANAC, com testes previstos para 2027. Campo de Marte (SP) e Jacarepaguá (RJ) foram anunciados em 2026 como polos da UrbanV com a Pax Aeroportos.</p></div>
    </Slide>

    <Slide kicker="Tipologia 5" title="Implantação nova" source="Fonte: FAA, Advanced Air Mobility Infrastructure (ilustração); FAA (2023); Skyports (2025); Aviation A2Z (2026)." notes="Perguntar: o DXV é tipologia 4 ou 5? Ele fica ao lado do aeroporto, mas foi construído do zero. As classes se sobrepõem, e é preciso justificar a escolha.">
      <div className="vt-split"><Media assetId="e07-faa-vertiporto-novo" caption="Vertiporto projetado para eVTOL: área de pouso e decolagem, pátio, embarque, recarga, terminal e cerca."/><Points items={[
        ['Sítio', 'Projetado para eVTOL: áreas de pouso, pátio, recarga e terminal dimensionados desde o início.'],
        ['Recomendação', 'A FAA (2023) orienta planejar vertiportos novos para vários operadores e integrados a outros modos.'],
        ['Caso: DXV (Dubai)', 'Ao lado do aeroporto DXB: 3.100 m², 4 pavimentos, 2 áreas de pouso e decolagem, capacidade anual de 42 mil movimentos e 170 mil passageiros; certificado em julho de 2026.'],
        ['Pontos críticos', 'Terreno, licenciamento, custo inicial e demanda incerta.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Parte 4 · Comparação" title="Critérios para comparar as tipologias" source="Fonte: FAA (2024); EASA (2022); NREL (2023); SIGMA-City (2026)." notes="Estes critérios ajudam a preencher a tabela da atividade.">
      <div className="vt-cards vt-cards-grid">
        <article><h3>Área</h3><p>O sítio comporta TLOF, FATO e área de segurança para o D de projeto?</p></article>
        <article><h3>Estrutura</h3><p>Suporta a carga dinâmica (150% do PMD, na FAA) e os equipamentos de recarga?</p></article>
        <article><h3>Acesso terrestre</h3><p>Como chegam passageiros, socorro e manutenção?</p></article>
        <article><h3>Espaço aéreo</h3><p>Há trajetórias de aproximação livres? Com quais tráfegos o vertiporto convive?</p></article>
        <article><h3>Vizinhança</h3><p>Ruído, downwash e aceitação de quem mora ou trabalha ao lado.</p></article>
        <article><h3>Energia</h3><p>Há potência elétrica disponível para recarga rápida?</p></article>
      </div>
    </Slide>

    <Slide kicker="Atividade" title="Atividade individual (E07)" notes="A tabela é feita depois da aula. Explicar o que é componente crítico com um exemplo: no heliponto elevado adaptado, costuma ser a área de segurança ou a estrutura da cobertura.">
      <div className="vt-task"><div className="air-task-callout"><strong>Entrega</strong><p>PDF individual de até 2 páginas, na pasta de atividades do Drive, até 21/09 às 23h59. Cite pelo menos duas referências da aula.</p></div>
        <div className="vt-cards vt-cards-2"><article><h3>O que fazer</h3><p>Monte a tabela das cinco tipologias com a vantagem principal, o desafio principal e o componente crítico de cada uma. O modelo está no próximo slide.</p></article><article><h3>Componente crítico</h3><p>É o elemento do vertiporto que mais limita ou encarece a implantação naquela tipologia: por exemplo, a área de segurança, a estrutura da laje, o acesso de passageiros, a recarga elétrica ou a coordenação com o tráfego do aeroporto.</p></article></div></div>
    </Slide>

    <Slide kicker="Atividade" title="Modelo da tabela" notes="Cada célula deve ter uma ou duas frases. Na coluna de componente crítico, pedir que o aluno justifique a escolha.">
      <div className="vt-col"><table className="vt-table vt-table-full vt-fill"><thead><tr><th>Tipologia</th><th>Vantagem principal</th><th>Desafio principal</th><th>Componente crítico</th></tr></thead><tbody>{typologies.map(([number, name]) => <tr key={number}><td>{number}. {name}</td><td>—</td><td>—</td><td>—</td></tr>)}</tbody></table>
      <p className="vt-note">Componente crítico: o elemento do vertiporto que mais limita ou encarece a implantação naquela tipologia.</p></div>
    </Slide>

    <Slide kicker="Próximos passos" title="Próximos passos" notes="Lembrar os prazos e o formato do CP2.">
      <div className="vt-next"><article><b>Hoje, 23h59</b><p>Entrega da E05: relatório da Methodi Ordinatio e planilha RankIn.</p></article><article><b>21/09, 23h59</b><p>Entrega individual da E07: tabela das cinco tipologias.</p></article><article><b>22/09 · E08</b><p>Vertiportos II: arranjo, capacidade, recarga e turnaround. Seminário Artigo 2 (CP2): revisão completa, matriz de artigos e lacuna consolidada.</p></article><article><b>Leitura para a E08</b><p>Zelinski (2020); Vascik e Hansman (2019); Preis (2021); NREL (2023).</p></article></div>
    </Slide>

    <Slide kicker="Referências" title="Referências: normas e artigos" notes="Lista para consulta.">
      <ul className="vt-refs">{presentation.references.slice(0, pressStart).map((reference) => <li key={reference.shortTitle}>{reference.citation}{reference.url && <> <a href={reference.url} target="_blank" rel="noreferrer">{reference.url.replace('https://', '')}</a></>}</li>)}</ul>
    </Slide>

    <Slide kicker="Referências" title="Referências: casos e imprensa" notes="Lista para consulta.">
      <ul className="vt-refs vt-refs-large">{presentation.references.slice(pressStart).map((reference) => <li key={reference.shortTitle}>{reference.citation} <a href={reference.url} target="_blank" rel="noreferrer">{reference.url.replace('https://', '').replace('www.', '')}</a></li>)}</ul>
    </Slide>

    <Slide kicker="Materiais" title="Documentos para download" notes="Todos os documentos estão na Biblioteca da disciplina.">
      <ReadingList ids={['faa-2024-eb-105a-vertiport-design', 'easa-2022-vertiport-design-pts', 'anac-2023-aam-panorama', 'sigmacity-produto3', 'faa-2023-aam-implementation-plan', 'nrel-2023-vertiport-electrical']}/>
    </Slide>
  </PresentationDeck>;
}
