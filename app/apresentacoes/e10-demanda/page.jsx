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
const steps = ['Conceito', 'Dados', 'Cálculo', 'Atividade'];
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

export default function E10PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck vert-deck ops-deck dem-deck">
    <Slide kicker="IT-214 · Mobilidade Aérea Urbana" title="Demanda: quantas viagens o vertiporto pode atender" notes="Material para estudo dirigido: não há aula presencial em 13/10. O roteiro leva à atividade individual, com entrega em 20/10." className="air-title-slide">
      <div className="vt-cover"><div><p className="air-lead">Do dado de origem e destino ao número de voos por hora.</p><p>Sem aula presencial em 13/10: este material é o roteiro da atividade.</p><p>Entrega individual até 20/10.</p><div className="air-cover-meta">E10 · 13/10/2026<br/>Equipe docente IT-214</div></div><Media assetId="e09-guo-rede" caption="Demanda potencial e vertiportos selecionados em Shenzhen." fit="cover"/></div>
    </Slide>

    <Slide kicker="Conceito" step={0} title="Por que começar pela demanda" source="Fonte: SIGMA-City (2026), Produto 3, cap. 3 e seção 3.1." notes="A demanda é o primeiro bloco do pilar de viabilidade, visto na E07. O número de pads, vagas e carregadores da E08 depende dela.">
      <div className="vt-col vt-col-gap"><Table className="dem-table" head={['Pergunta', 'O que ela define no projeto']} rows={[
        ['Quantas viagens o vertiporto atenderá?', 'O porte: pads, vagas, recarga e terminal.'],
        ['Entre quais pares de origem e destino?', 'A rede: onde ficam os outros vertiportos e as rotas.'],
        ['Com qual disposição a pagar?', 'A tarifa e, com ela, a viabilidade econômica.'],
      ]}/>
      <p className="vt-conclusion">Antes de desenhar a FATO, é preciso saber se existe quem use o serviço.</p></div>
    </Slide>

    <Slide kicker="Conceito" step={0} title="O que os estudos mostram" source="Fonte: SIGMA-City (2026), Produto 3, seção 3.1 e tab. 3.1, que revisa Garrow et al. (2021), Long et al. (2023), Haan et al. (2021) e Rimjha et al. (2021)." notes="Haan et al. estudaram as 40 maiores áreas metropolitanas dos EUA; Rimjha et al., o norte da Califórnia. Long et al. revisaram 211 publicações e apontam a falta de dados históricos como a limitação mais comum.">
      <Points items={[
        ['Escolha entre modos', 'A demanda de UAM é tratada como escolha modal: o passageiro compara tempo e custo com o carro ou o táxi, e a renda define quem pode pagar.'],
        ['Acesso ao vertiporto', 'Em Haan et al. (2021), a demanda estimada quadruplica quando o tempo de acesso ao vertiporto é retirado do cálculo.'],
        ['Espera', 'Em Rimjha et al. (2021), dez minutos a mais de espera para embarcar cortam a demanda estimada pela metade.'],
        ['Concentração', 'A demanda se concentra em poucas cidades e em poucos vertiportos de alto fluxo.'],
      ]}/>
    </Slide>

    <Slide kicker="Conceito" step={0} title="A viagem completa" source="Fonte: Guo et al. (2024), fig. 1, seções 3.4.3 e 5." notes="No estudo de Shenzhen, os trechos em solo respondem por cerca de 40% do tempo total da viagem. Quando a transferência sobe de 5 para 30 min, as viagens de UAM caem de 3.504 para 1.410.">
      <div className="vt-col vt-col-gap"><div className="dem-strip"><Media assetId="e10-guo-viagem" caption="Uma viagem de UAM tem três trechos: solo, voo e solo."/></div>
      <div className="vt-points dem-points-row"><article><h3>Tempo porta a porta</h3><p>Acesso ao vertiporto + transferência + voo + saída até o destino.</p></article><article><h3>Transferência</h3><p>Tempo entre chegar ao vertiporto e embarcar, e entre pousar e sair. Guo et al. adotam 20 min.</p></article><article><h3>Pouso e decolagem</h3><p>Entram no tempo de voo. Guo et al. somam 10 min por viagem.</p></article></div></div>
    </Slide>

    <Slide kicker="Dados" step={1} title="Do que a demanda é feita" source="Fonte: Guterres (2026), Mobilidade Aérea Urbana, seção 4.6 (material do autor, não publicado); fontes de dados indicadas pela equipe docente." notes="As cinco variáveis vêm do modelo descrito no livro, que as combina em um mapa de densidade de demanda. A coluna da direita aponta onde buscar cada dado no Brasil. RAIS: Relação Anual de Informações Sociais.">
      <Table className="dem-table" head={['Componente', 'O que representa', 'Onde buscar']} rows={[
        ['Demanda pendular', 'Deslocamentos diários entre casa e trabalho', 'Pesquisa origem e destino; empregos por local (RAIS)'],
        ['Polos de transporte', 'Fluxo em aeroportos, estações e terminais', 'Estatísticas da ANAC e dos operadores'],
        ['Turismo e eventos', 'Pontos de interesse e fluxo de visitantes', 'Dados municipais e estaduais de turismo'],
        ['População e renda', 'Onde moram os potenciais usuários', 'Censo 2022 do IBGE, por setor censitário'],
        ['Congestionamento', 'Tempo a mais gasto no sistema viário', 'Tempos de viagem da pesquisa origem e destino'],
      ]}/>
    </Slide>

    <Slide kicker="Dados" step={1} title="Onde encontrar os dados" source="Fonte: endereços conferidos pela equipe docente em outubro de 2026." notes="A Pesquisa Origem e Destino do Metrô cobre a Região Metropolitana de São Paulo e traz o banco de dados e o relatório-síntese de cada edição. Para outras cidades, procurar a pesquisa origem e destino no plano de mobilidade do município ou da região metropolitana. Se não houver, usar população, empregos e renda como aproximação e declarar a limitação.">
      <Table className="dem-table" head={['Dado', 'Fonte', 'Endereço']} rows={[
        ['Matriz origem e destino', 'Pesquisa Origem e Destino do Metrô de São Paulo', <Link key="a" href="https://transparencia.metrosp.com.br/dataset/pesquisa-origem-e-destino"/>],
        ['População e renda', 'Censo 2022, IBGE (SIDRA)', <Link key="b" href="https://sidra.ibge.gov.br/pesquisa/censo-demografico/demografico-2022/inicial"/>],
        ['Indicadores do município', 'IBGE Cidades', <Link key="c" href="https://cidades.ibge.gov.br/"/>],
        ['Empregos por local', 'RAIS, na Base dos Dados', <Link key="d" href="https://basedosdados.org/dataset/br-me-rais"/>],
        ['Vias e pontos de interesse', 'OpenStreetMap', <Link key="e" href="https://www.openstreetmap.org"/>],
      ]}/>
    </Slide>

    <Slide kicker="Cálculo" step={2} title="Roteiro em seis passos" source="Fonte: roteiro da equipe docente, com base em Guo et al. (2024), seções 3.2 a 3.4, e em Guterres (2026), seção 4.6." notes="É uma estimativa de primeira ordem, suficiente para o artigo. Modelos de escolha discreta calibrados com pesquisa de preferência declarada são o passo seguinte e ficam fora desta atividade.">
      <ol className="dem-steps">
        <li><b>Área de captação</b><span>Escolher o sítio e delimitar de onde vêm os passageiros.</span></li>
        <li><b>Matriz origem e destino</b><span>Levantar as viagens que saem da área de captação ou chegam a ela.</span></li>
        <li><b>Viagens candidatas</b><span>Filtrar por modo, duração e renda.</span></li>
        <li><b>Custo generalizado</b><span>Comparar tempo e dinheiro do modo atual com os da UAM.</span></li>
        <li><b>Taxa de captura</b><span>Estimar a parcela das viagens candidatas que migra.</span></li>
        <li><b>Passageiros e voos</b><span>Converter em passageiros por dia e voos na hora de pico.</span></li>
      </ol>
    </Slide>

    <Slide kicker="Cálculo" step={2} title="Passos 1 a 3: da área às viagens candidatas" source="Fonte: Guo et al. (2024), seções 3.1 e 3.2; SIGMA-City (2026), Produto 3, seção 3.1; Guterres (2026), seção 4.7." notes="Guo et al. consideram só passageiros de táxi, por serem os mais afetados pelo congestionamento, e mantêm 46.537 viagens com mais de 30 min em um dia. O Manual de Prospecção de Sítios Aeroportuários, citado no livro, define a área de influência pelo tempo de deslocamento terrestre. Cada filtro adotado pelo aluno precisa de justificativa.">
      <Table className="dem-table" head={['Passo', 'Como fazer', 'Referência']} rows={[
        ['1. Área de captação', 'Marcar as zonas de onde se chega ao sítio em até um tempo de acesso escolhido, por exemplo 15 min.', 'Área de influência por tempo de deslocamento terrestre'],
        ['2. Matriz origem e destino', 'Somar as viagens diárias entre as zonas da área de captação e as zonas de destino.', 'Banco de dados da pesquisa origem e destino'],
        ['3. Viagens candidatas', 'Manter as de modo individual motorizado, longas e de quem pode pagar.', 'Guo et al.: só táxi, com mais de 30 min'],
      ]}/>
    </Slide>

    <Slide kicker="Cálculo" step={2} title="Passo 4: custo generalizado" source="Fonte: Guo et al. (2024), seção 3.4.1 e equações 12 a 14." notes="O valor do tempo, no artigo, é o salário médio anual dividido por 2.080 horas de trabalho. O passageiro migra quando o custo generalizado da UAM é menor que o do modo em solo. Velocidade de cruzeiro adotada no artigo: 130 km/h (EH216-S).">
      <div className="vt-split vt-split-even"><div className="vt-col ops-model"><p className="ops-lead">O passageiro escolhe o modo de menor custo generalizado: dinheiro mais tempo convertido em dinheiro.</p><div className="ops-eq"><p>C = tarifa + v<sub>t</sub> · tempo</p><p>t<sub>UAM</sub> = t<sub>acesso</sub> + t<sub>transf</sub> + t<sub>voo</sub> + t<sub>saída</sub></p><p>migra se C<sub>UAM</sub> &lt; C<sub>solo</sub></p></div></div>
      <Table className="ops-compact ops-vars" head={['Símbolo', 'Significado']} rows={[
        ['C', 'Custo generalizado da viagem, em reais'],
        [<>v<sub>t</sub></>, 'Valor do tempo: renda anual dividida pelas horas trabalhadas no ano'],
        [<>t<sub>acesso</sub>; t<sub>saída</sub></>, 'Trechos em solo até o vertiporto e do vertiporto ao destino'],
        [<>t<sub>transf</sub></>, 'Transferência nos dois vertiportos (20 min em Guo et al.)'],
        [<>t<sub>voo</sub></>, 'Cruzeiro mais pouso e decolagem (10 min em Guo et al.)'],
      ]}/></div>
    </Slide>

    <Slide kicker="Cálculo" step={2} title="Exemplo: até quanto a tarifa pode custar" source="Fonte: cálculo da equipe docente com a formulação de Guo et al. (2024). Valores hipotéticos, apenas para mostrar a conta." notes="Fazer a conta com a turma. Voo: 15 km a 130 km/h dá 7 min; com 10 min de pouso e decolagem, 17 min. Tempo de UAM: 10 + 20 + 17 + 8 = 55 min. Os valores de tarifa, renda e tempos são hipotéticos; na atividade, cada um deve vir de uma fonte.">
      <div className="vt-col"><div className="vt-calc"><article><h3>Viagem de carro</h3><p>70 min e R$ 90</p><p>v<sub>t</sub> = R$ 60/h</p><p>C = 90 + 60 × 70 ÷ 60</p><p>= <b>R$ 160</b></p></article><article><h3>Viagem de UAM</h3><p>Voo de 15 km: 7 + 10 = 17 min</p><p>10 + 20 + 17 + 8 = 55 min</p><p>C = tarifa + 60 × 55 ÷ 60</p><p>= <b>tarifa + R$ 55</b></p></article><article><h3>Tarifa máxima</h3><p>tarifa + 55 &lt; 160</p><p>tarifa &lt; <b>R$ 105</b></p><p>Com transferência de 30 min:</p><p>tarifa &lt; <b>R$ 95</b></p></article></div>
      <p className="vt-conclusion">Cada minuto em solo ou em espera reduz a tarifa que o passageiro aceita pagar.</p></div>
    </Slide>

    <Slide kicker="Cálculo" step={2} title="Passos 5 e 6: de viagens a voos por hora" source="Fonte: cálculo da equipe docente. Valores hipotéticos; a ligação com pads e vagas está na E08." notes="A taxa de captura é a premissa mais frágil: não há dados históricos de UAM. O aluno deve adotar um valor, justificar e testar pelo menos outro. O resultado em voos por hora é a entrada do modelo de capacidade da E08.">
      <div className="vt-col"><div className="vt-calc"><article><h3>Passageiros por dia</h3><p>2.000 viagens candidatas</p><p>Taxa de captura de 5%</p><p>= <b>100 passageiros/dia</b></p></article><article><h3>Hora de pico</h3><p>12% das viagens do dia</p><p>100 × 0,12</p><p>= <b>12 passageiros/h</b></p></article><article><h3>Voos na hora de pico</h3><p>4 assentos, 75% ocupados</p><p>12 ÷ 3</p><p>= <b>4 partidas/h</b></p></article></div>
      <p className="vt-conclusion">O número de partidas por hora é o que dimensiona pads, vagas e recarga do vertiporto.</p></div>
    </Slide>

    <Slide kicker="Cálculo" step={2} title="Limites da estimativa" source="Fonte: SIGMA-City (2026), Produto 3, seção 3.1; Guo et al. (2024), seções 3.1 e 5." notes="No estudo de Shenzhen, com tarifa inicial de 30 yuans e 1 yuan por km, as viagens passam de 6.000; com 50 yuans e 5 yuans por km, caem para cerca de 1.000.">
      <Points items={[
        ['Sem histórico', 'Não há dados de operação de UAM. A taxa de captura é premissa, não medida.'],
        ['Sensível à tarifa e à espera', 'No estudo de Shenzhen, as viagens caem de 3.504 para 1.410 quando a transferência sobe de 5 para 30 min.'],
        ['O que fica de fora', 'Capacidade do vertiporto, tamanho da frota e autonomia da aeronave não entram nesta conta.'],
        ['O que fazer', 'Declarar cada premissa com a fonte e mostrar como o resultado muda quando uma delas varia.'],
      ]}/>
    </Slide>

    <Slide kicker="Atividade" step={3} title="Atividade individual (E10)" notes="A atividade vale para as duas semanas, de 13 a 20/10. O sítio pode ser o do artigo do aluno. Quem não tiver pesquisa origem e destino para a cidade escolhida deve usar população, empregos e renda como aproximação e declarar a limitação.">
      <div className="vt-task"><div className="air-task-callout"><strong>Entrega</strong><p>PDF individual de até 3 páginas e a planilha de cálculo, na pasta de atividades do Drive, até 20/10 às 23h59.</p></div>
        <div className="vt-split vt-split-even"><Points items={[
          ['O que fazer', 'Estimar a demanda de um sítio de vertiporto seguindo os seis passos: da área de captação aos voos na hora de pico.'],
          ['Sítio', 'O do seu artigo ou outro à sua escolha, com a cidade e o endereço indicados.'],
        ]}/><Table className="ops-compact" head={['O que entregar', 'Detalhe']} rows={[
          ['Mapa', 'Sítio e área de captação'],
          ['Tabela de premissas', 'Valor, unidade e fonte de cada uma'],
          ['Resultado', 'Passageiros por dia e partidas na hora de pico'],
          ['Sensibilidade', 'O resultado com outro valor de uma premissa'],
        ]}/></div></div>
    </Slide>

    <Slide kicker="Próximos passos" title="Próximos encontros" notes="A equipe confirma pelo grupo da disciplina qualquer mudança de calendário.">
      <div className="vt-next"><article><b>13/10</b><p>Sem aula presencial. Estudo deste material e início da atividade.</p></article><article><b>Até 20/10</b><p>Entrega da atividade individual de demanda.</p></article><article><b>27/10 · CP3</b><p>Seminário Artigo 3: metodologia, dados, estudo de caso e resultados preliminares.</p></article></div>
    </Slide>

    <Slide kicker="Referências" title="Referências" notes="Lista para consulta.">
      <ul className="vt-refs vt-refs-large">{presentation.references.map((reference) => <li key={reference.shortTitle}>{reference.citation}{reference.url && <> <a href={reference.url} target="_blank" rel="noreferrer">{reference.url.replace('https://', '')}</a></>}</li>)}<li>Guterres, M. X. Mobilidade Aérea Urbana. 1. ed. São José dos Campos, 2026. Material do autor, não publicado.</li></ul>
    </Slide>

    <Slide kicker="Materiais" title="Documentos para download" notes="Todos os documentos estão na Biblioteca da disciplina.">
      <ReadingList ids={['sigmacity-produto3', 'garrow-2021-uam-review', 'it214-2026-2-plano-ensino']}/>
    </Slide>
  </PresentationDeck>;
}
