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

export default function E08PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="air-deck vert-deck ops-deck">
    <Slide kicker="IT-214 · Mobilidade Aérea Urbana" title="Vertiportos II: operação, capacidade e recarga" notes="Roteiro sugerido para os 180 min: até 80 min de exposição e discussão, 10 min de intervalo e 90 min para as apresentações do CP2. Distribuir o tempo de apresentação e devolutiva entre os participantes." className="air-title-slide">
      <div className="vt-cover"><div><p className="air-lead">Do arranjo físico ao atendimento de aeronaves e passageiros.</p><p>Primeira parte: componentes, vento, simulação, capacidade e recarga.</p><p>Segunda parte: apresentações da revisão da literatura — Seminário Artigo 2 (CP2).</p><div className="air-cover-meta">E08 · 22/09/2026<br/>Equipe docente IT-214</div></div><Media assetId="e08-beta-duke-field" caption="Aeronave elétrica ALIA, da BETA Technologies, em Duke Field (EUA), 2023." fit="cover"/></div>
    </Slide>

    <Slide kicker="Elementos" step={0} title="Pad, gate e stand" source="Fonte: Preis e Hornung (2022), apêndice A; Guerreiro et al. (2020); Ahn e Hwang (2022), fig. 23." notes="Pergunta à turma: qual desses elementos existe num heliponto comum? Em geral, só o pad. Na figura: 1 pouso, 2 táxi até o gate, 3 turnaround, 4 táxi até o pad, 5 decolagem.">
      <div className="vt-split"><Media assetId="e08-ahn-processo" caption="1 pouso · 2 táxi · 3 turnaround no gate · 4 táxi · 5 decolagem."/><Points items={[
        ['Pad', 'Área de pouso e decolagem (TLOF e FATO), vista na E07. Depois de cada operação há um intervalo de segurança antes da próxima.'],
        ['Gate', 'Posição junto ao terminal, onde os passageiros embarcam e desembarcam. Pode ter recarga.'],
        ['Stand', 'Posição de estacionamento fora do terminal, para recarga, troca de bateria e manutenção.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Elementos" step={0} title="Deslocamento entre pad e gate" source="Fonte: Preis e Hornung (2022), tab. 3; FAA (2024), EB 105A, seção 3." notes="Slide ilustrativo. As velocidades são estimativas de especialistas, não medições de operação real. O EB 105A (2024), usado nesta aula, não apresenta critérios próprios de pista de táxi para vertiportos.">
      <div className="vt-split vt-split-even"><Media assetId="e08-joby-edwards" caption="eVTOL da Joby parado em pista de táxi na Base Aérea de Edwards." fit="cover"/><Points items={[
        ['Rebocada', 'Um veículo leva a aeronave pelo pátio (cerca de 2,6 m/s). É preciso acoplar e desacoplar o dispositivo.'],
        ['Rodando com os próprios motores', 'Exige trem de pouso com rodas (cerca de 2,2 m/s).'],
        ['Pairando', 'É o modo mais rápido (cerca de 3,3 m/s), mas pede posições do tamanho da FATO e espalha downwash pelo pátio.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Arranjo" step={1} title="Arranjos: linear, satélite e pier" source="Fonte: Ahn e Hwang (2022), figs. 9, 11 e 13, com critérios da minuta do FAA EB 105 (2022), anterior ao EB 105A." notes="Os três exemplos usam a aeronave Hyundai S-A1. Perguntar à turma qual arranjo cabe melhor em um terreno estreito, como uma faixa ao lado de uma avenida.">
      <div className="ops-trio">
        <div><Media assetId="e08-ahn-linear" caption="Linear"/><p>Pads e gates em linha. Operação simples; bom para terrenos estreitos e longos.</p></div>
        <div><Media assetId="e08-ahn-satelite" caption="Satélite"/><p>Gates em volta de um pad. Adequado a terrenos quadrados ou circulares.</p></div>
        <div><Media assetId="e08-ahn-pier" caption="Pier"/><p>Forma intermediária: separa pads e gates e permite aproximações em várias direções.</p></div>
      </div>
    </Slide>

    <Slide className="ops-case" kicker="Arranjo · aplicação no SBSJ" step={1} title="Do sítio ao arranjo operacional" source="Fonte: Sandbox SBSJ, Fase I, vol. I, cap. 1, e vol. III, T4, fig. 4.4 (equipe do projeto, 2026). Figuras de uso didático autorizado; estudo preliminar." notes="As figuras mostram o aproveitamento da área de teste de motores. O arranjo é preliminar: a geometria deve ser conferida com a aeronave de referência, o modo de táxi, a recarga e o acesso de emergência. As cotas da figura são hipóteses de projeto, não dimensões certificadas.">
      <div className="vt-col vt-col-gap"><div className="vt-split vt-split-even ops-case-pair"><Media assetId="e08-sbsj-sitio" caption="Inserção do vertiporto junto à infraestrutura aeroportuária existente."/><Media assetId="e08-sbsj-arranjo" caption="Uma FATO, uma pista de táxi e três estandes; cotas preliminares."/></div>
      <p className="vt-conclusion">O arranjo precisa compatibilizar circulação, separação entre aeronaves, recarga e acesso de emergência.</p></div>
    </Slide>

    <Slide kicker="Arranjo" step={1} title="Conectividade entre pads e vagas" source="Fonte: Zelinski (2020), NASA, figs. 2, 3 e 5 e seção V." notes="Os três arranjos da NASA têm quatro TLOFs e cinco vagas por TLOF, com separação de 200 pés (61 m) entre FATOs. Lados: 489 pés (149 m), 414 pés (126 m) e 405 pés (123 m).">
      <div className="vt-col"><div className="ops-trio ops-trio-square">
        <div><Media assetId="e08-zelinski-perimetro" caption="Perímetro: 149 m de lado"/></div>
        <div><Media assetId="e08-zelinski-central" caption="Central: 126 m de lado"/></div>
        <div><Media assetId="e08-zelinski-desconectado" caption="Desconectado: 123 m de lado"/></div>
      </div>
      <p className="vt-conclusion">No estudo, o arranjo central reduz o percurso de táxi; o desconectado ocupa menos área, mas cada vaga atende apenas um pad.</p></div>
    </Slide>

    <Slide className="ops-case" kicker="Arranjo · vento e disponibilidade" step={1} title="Vento e disponibilidade operacional" source="Fonte: Zelinski (2020), fig. 9; Sandbox SBSJ, Fase I, vol. I, fig. 2.3 e cap. 2 (equipe do projeto, 2026; resultados preliminares)." notes="A rosa resume a frequência e a intensidade dos ventos históricos, não escolhe sozinha a trajetória. Também entram obstáculos, espaço aéreo, limites da aeronave, teto e visibilidade. Zelinski usa restrições de vento próprias do estudo; elas não são limites universais para eVTOL. A análise sazonal e por horário será retomada na E12.">
      <div className="vt-split vt-split-wide"><Media assetId="e08-sbsj-rosa-ventos" caption="Rosa dos ventos do SBSJ (2015–2025), com o eixo da pista 16/34 sobreposto."/><div className="vt-col vt-col-gap"><Points items={[
        ['Como ler', 'A direção indica de onde o vento vem; o comprimento dos setores representa sua frequência, e as cores distinguem intensidades.'],
        ['Efeito no projeto', 'O vento pode restringir direções de chegada e saída. Conexões entre pads e vagas ajudam a manter alternativas de operação.'],
        ['Disponibilidade', 'Cruzar vento, teto e visibilidade com os horários de demanda. A distribuição anual pode esconder restrições em certos períodos do dia.'],
      ]}/><p className="vt-note"><a href={basePath + assets.find((item) => item.id === 'e08-zelinski-vento').assetPath} target="_blank" rel="noreferrer">Consulta: uso de um pad conforme o vento — Zelinski (2020), fig. 9 ↗</a></p></div></div>
    </Slide>

    <Slide className="ops-case" kicker="Arranjo · simulação" step={1} title="Dispersão de pousos e margens de projeto" source="Fonte: Sandbox SBSJ, Fase I, vol. III, T4, fig. 4.7 (equipe do projeto, 2026). Figura de uso didático autorizado; resultados preliminares." notes="A figura compara os pontos finais de um procedimento simulado com as áreas de referência. O modelo usa uma aeronave substituta e não reproduz todos os fenômenos próximos ao solo. Interpretar a distribuição como apoio à análise, sem concluir conformidade ou segurança operacional de um eVTOL certificado.">
      <div className="vt-split ops-split-media-wide"><Media assetId="e08-sbsj-dispersao" caption="Pontos finais simulados em relação às áreas de TLOF e FATO adotadas no estudo."/><Points items={[
        ['Centro e dispersão', 'A maior parte dos pontos se concentra perto do alvo. Os desvios menos frequentes também precisam entrar na análise.'],
        ['Margem geométrica', 'Comparar a distribuição com os limites da área e com as dimensões da aeronave, não apenas com o ponto de toque.'],
        ['Limite da simulação', 'O resultado depende do modelo, do vento e do procedimento. Ensaios de campo são necessários para validar as hipóteses.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Capacidade" step={2} title="Capacidade, operação realizada e gargalos" source="Fonte: Guerreiro et al. (2020), seção III.A e conclusão; Preis (2023)." notes="Throughput pode ser traduzido como vazão: o que de fato passou pelo vertiporto. Na simulação de Guerreiro et al., o resultado ficou de 16% a 22% abaixo da capacidade analítica. Preis (2023) também compara a área necessária por passageiro por hora; consultar a referência para as diferenças entre aeronaves.">
      <div className="vt-col vt-col-gap"><Table head={['Conceito', 'Pergunta que responde']} rows={[
        ['Capacidade', 'Quantas operações cabem no período, dadas as hipóteses do modelo?'],
        ['Throughput (vazão)', 'Quantas operações foram efetivamente atendidas?'],
        ['Gargalo', 'Qual recurso limita primeiro: pad, vaga, recarga ou processamento de passageiros?'],
      ]}/><p className="vt-conclusion">Ter espaço disponível não garante atendimento: tempos de ocupação e programação também limitam a operação.</p></div>
    </Slide>

    <Slide kicker="Capacidade" step={2} title="Estimativa de capacidade: pads e vagas" source="Fonte: Guerreiro et al. (2020), NASA, equações 1 a 3 e fig. 6." notes="O modelo ignora o arranjo físico e a recarga (tempo de recarga igual a zero na simulação). Serve para uma primeira estimativa do número de pads e de vagas. O fator 2 aparece porque cada aeronave que ocupa uma vaga gera um pouso e uma decolagem.">
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

    <Slide kicker="Capacidade" step={2} title="Exemplo de dimensionamento: dois pads" source="Fonte: cálculo com o modelo de Guerreiro et al. (2020); resultados do artigo na seção IV." notes="Fazer a conta no quadro. Dois pads é o caso do DXV, visto na E07. O resultado do artigo mostra que a conta simples superestima o que se observa na simulação.">
      <div className="vt-col"><div className="vt-calc"><article><h3>O que os pads suportam</h3><p>N<sub>p</sub> = 2; t<sub>pouso</sub> = t<sub>dec</sub> = 60 s; t<sub>jan</sub> = 1 h</p><p>C<sub>pads</sub> = 2 × 2 × 3.600 ÷ 120</p><p>= <b>120 operações/h</b></p></article><article><h3>Vagas para não travar</h3><p>t<sub>solo</sub> = 15 min = 900 s</p><p>N<sub>v</sub> = N<sub>p</sub> × t<sub>solo</sub> ÷ (t<sub>pouso</sub> + t<sub>dec</sub>)</p><p>= 2 × 900 ÷ 120 = <b>15 vagas</b></p></article><article><h3>Com só 6 vagas</h3><p>C<sub>solo</sub> = 6 × 3.600 ÷ 900 = 24</p><p>C = mín(2 × 24; 120)</p><p>= <b>48 operações/h</b></p></article></div>
      <p className="vt-conclusion">Com 6 vagas, o limite é 48 operações/h: 40% da capacidade dos pads, nas hipóteses deste modelo.</p></div>
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

    <Slide kicker="Recarga" step={3} title="Infraestrutura de recarga" source="Fonte: NREL (2023), sumário executivo e seção 1; FAA (2024), EB 105A, seção 5.0." notes="O NREL consultou seis fabricantes; parte deles não forneceu dados. A foto mostra o protótipo A250 da BETA ligado ao carregador Charge Cube.">
      <div className="vt-split vt-split-wide"><Media assetId="e08-beta-recarga" caption="Protótipo A250 da BETA Technologies em recarga." fit="cover"/><Points items={[
        ['Potência', 'Pico de recarga em corrente contínua de 300 kW a 1 MW, segundo os fabricantes consultados pelo NREL.'],
        ['Planejamento', 'O estudo recomenda prever expansão da potência: ampliar a conexão à rede elétrica pode exigir mais tempo que instalar novos carregadores.'],
        ['Compatibilidade', 'Conectores, potência aceita e gestão térmica dependem da aeronave. O levantamento do NREL retrata os fabricantes consultados em 2023.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Recarga" step={3} title="Estimativa do tempo de recarga" source="Fonte: cálculo com valores de Preis e Hornung (2022), tab. 3; NREL (2023), p. 56; Nagrare e Lieb (2026), seção 6.3." notes="Cálculo simplificado com potência constante. O NREL lembra que, na prática, a potência cai a partir de 80% de carga, por isso a recarga parcial é comum.">
      <div className="vt-col"><div className="vt-calc"><article><h3>Energia</h3><p>Bateria de 133 kWh, de 20% a 80%</p><p>0,6 × 133 = 79,8 kWh</p><p>Com 7,17% de perda: 79,8 ÷ 0,9283 = <b>86,0 kWh</b></p></article><article><h3>Tempo</h3><p>Potência de 311 kW</p><p>86,0 ÷ 311 = 0,277 h</p><p>= <b>16,6 min</b></p></article><article><h3>Comparação</h3><p>Troca de bateria: <b>5,8 min</b></p><p>Tempo no gate (Ahn e Hwang): <b>5 min</b></p></article></div>
      <p className="vt-conclusion">Neste exemplo, a recarga idealizada dura 16,6 min. O tempo real também depende da curva de potência, da temperatura e das esperas.</p></div>
    </Slide>

    <Slide className="ops-case" kicker="Passageiros · integração da operação" step={4} title="Sincronização da aeronave e dos passageiros" source="Fonte: Mendonca et al. (2022); Preis e Hornung (2022); Sandbox SBSJ, Fase I, vol. III, T3 (equipe do projeto, 2026; simulação exploratória)." notes="A simulação do SBSJ articula disponibilidade da aeronave, recarga, transferência terrestre e conexão. Os tempos adotados são premissas do modelo, não medições nem mínimos regulatórios. O objetivo aqui é reconhecer dependências e gargalos, sem extrapolar resultados de um cenário para qualquer vertiporto.">
      <div className="vt-col vt-col-gap"><p className="ops-lead">O embarque depende de dois fluxos prontos no mesmo instante.</p><Table head={['Fluxo da aeronave', 'Fluxo dos passageiros']} rows={[
        ['Pouso e táxi', 'Chegada ao terminal ou conexão'],
        ['Preparação e recarga', 'Processamento, bagagem e briefing'],
        ['Liberação para embarque', 'Transferência até a aeronave'],
      ]}/><Points items={[
        ['Lição da simulação', 'Recarga, espera pelo grupo e transferência de bagagem podem consumir a folga da conexão, mesmo quando as filas são pequenas.'],
        ['O que acompanhar', 'Tempo total, atrasos, margem para conexão e ocupação dos recursos — além da quantidade de passageiros atendidos.'],
      ]}/></div>
    </Slide>

    <Slide kicker="Intervalo" title="Intervalo de 10 minutos" notes="Na volta, começam as apresentações do Seminário Artigo 2." className="air-title-slide vt-break-slide">
      <div/>
    </Slide>

    <Slide kicker="Seminário Artigo 2 · CP2" title="CP2: apresentação da revisão da literatura" source="Fonte: Plano de ensino IT-214 (2026/2), seção 3." notes="Apresentação individual, com devolutiva na sequência, conforme o plano de ensino. Manter este slide na tela durante as apresentações.">
      <div className="vt-split vt-split-even"><div className="vt-col vt-col-gap"><h3 className="ops-subtitle">Conteúdo mínimo esperado</h3><ol className="ops-list"><li>Estratégia de busca</li><li>Bases usadas</li><li>Matriz de artigos</li><li>Classificação da literatura</li><li>Estado da arte</li><li>Lacuna consolidada</li><li>Posicionamento do artigo</li></ol></div>
        <div className="vt-col vt-col-gap"><blockquote className="ops-quote"><p>“O aluno consegue mostrar o que já foi feito, o que falta e por que sua pergunta é relevante.”</p><cite>Critério pedagógico do CP2</cite></blockquote>
        <p className="vt-note">Apresentação individual, com devolutiva na sequência. O CP1 (25/08) definiu a lacuna inicial; o CP2 mostra se ela se sustenta diante da literatura.</p></div></div>
    </Slide>

    <Slide kicker="Próximos passos" title="Entregas e próximos encontros" notes="Lembrar que a devolutiva do CP2 é dada na sequência das apresentações.">
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
