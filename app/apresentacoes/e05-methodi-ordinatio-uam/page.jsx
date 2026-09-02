import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';

const presentation = presentations.find((item) => item.slug === 'e05-methodi-ordinatio-uam');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = {
  title: presentation.title,
  description: presentation.subtitle,
};

function Slide({ kicker, title, source, notes, children, className = '' }) {
  return (
    <section className={`e05-slide ${className}`}>
      {kicker && <div className="slide-kicker">{kicker}</div>}
      {title && <h2 className="slide-title">{title}</h2>}
      {children}
      {source && <p className="slide-source">{source}</p>}
      {notes && <aside className="notes">{notes}</aside>}
    </section>
  );
}

function ResourceLink({ href, children, primary = false, download = false }) {
  return (
    <a className={`e05-link ${primary ? 'primary' : ''}`} href={href} target="_blank" rel="noreferrer" download={download}>
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}

export default function E05PresentationPage() {
  const lectureUrl = `${basePath}/resources/discipline/ita-utfpr-methodi-ordinatio-2-2026.pdf`;
  const spreadsheetUrl = `${basePath}/templates/spreadsheets/rankin-methodi-ordinatio-v8.5.xlsm`;
  const activityUrl = `${basePath}/resources/discipline/atividade-methodi-uam.pdf`;
  const studentAreaUrl = `${basePath}/area-do-aluno/`;

  return (
    <PresentationDeck title={presentation.title}>
      <Slide className="e05-cover !text-white" notes="Apresente a aula como um percurso completo: definir, buscar, filtrar, ordenar, ler e analisar. Mostre que os três arquivos da aula estão disponíveis no próprio documento.">
        <div className="slide-kicker !text-amber-300">IT-214 · E05 · 01 de setembro de 2026</div>
        <div className="e05-cover-grid">
          <div>
            <h1>Methodi <span>Ordinatio 2.0</span></h1>
            <p>Da intenção de pesquisa ao portfólio bibliográfico ordenado e analisado criticamente.</p>
            <div className="e05-links"><ResourceLink href={lectureUrl} primary>Apresentação original</ResourceLink><ResourceLink href={spreadsheetUrl} download>Planilha RankIn</ResourceLink><ResourceLink href={activityUrl}>Orientação da atividade</ResourceLink></div>
          </div>
          <div className="e05-cover-mark" aria-label="Nove etapas conectadas da Methodi Ordinatio"><strong>9</strong><span>etapas</span><small>uma trilha rastreável</small></div>
        </div>
      </Slide>

      <Slide kicker="Destino da aula" title="Um portfólio priorizado, reproduzível e criticamente analisado" notes="Destaque que o ranking organiza a prioridade de leitura. Ele não mede sozinho a qualidade metodológica nem responde à pergunta de pesquisa.">
        <div className="e05-outcome">
          <div><span>01</span><strong>Buscar</strong><p>uma única base científica</p></div>
          <div><span>02</span><strong>Filtrar</strong><p>critérios e contagens rastreáveis</p></div>
          <div><span>03</span><strong>Ordenar</strong><p>InOrdinatio com RankIn</p></div>
          <div><span>04</span><strong>Analisar</strong><p>métodos, resultados e lacunas</p></div>
        </div>
        <blockquote className="e05-callout">O ranking orienta a priorização; a leitura crítica sustenta a pesquisa.</blockquote>
      </Slide>

      <Slide kicker="Regra central" title="Escolha uma base científica e mantenha-a do teste ao portfólio" notes="A base pode ser Scopus, Web of Science, ScienceDirect, IEEE Xplore ou outra pertinente e acessível. A escolha precisa ser justificada.">
        <div className="e05-one-base">
          <div><span>BASE ÚNICA</span><strong>Pesquisa preliminar</strong><b>→</b><strong>Pesquisa definitiva</strong><b>→</b><strong>Portfólio</strong></div>
          <aside><strong>Fontes auxiliares não acrescentam artigos</strong><p>Google Scholar pode apoiar a coleta de citações e a localização do texto integral. Registre sempre fonte e data de consulta.</p></aside>
        </div>
      </Slide>

      <Slide kicker="Visão do método" title="As nove etapas formam uma cadeia de decisões documentadas" source="Pagani, Kovaleski e Resende (2015); Pagani et al. (2022)." notes="Percorra a sequência sem aprofundar ainda. Reforce que cada etapa precisa deixar evidência no relatório ou na planilha.">
        <ol className="e05-nine-steps">
          {[
            ['1', 'Intenção'], ['2', 'Busca preliminar'], ['3', 'Sintaxe final'],
            ['4', 'Busca definitiva'], ['5', 'Filtragem'], ['6', 'Variáveis'],
            ['7', 'RankIn'], ['8', 'Download'], ['9', 'Leitura'],
          ].map(([number, label]) => <li key={number}><span>{number}</span><strong>{label}</strong></li>)}
        </ol>
      </Slide>

      <Slide kicker="Etapa 1" title="Transforme o tema individual em intenção, eixos e pergunta norteadora" notes="Peça que cada estudante use o tema já proposto para o artigo. A intenção de pesquisa não é ainda o problema completo do artigo.">
        <div className="e05-intention">
          <div><span>TEMA</span><strong>recorte específico de UAM/AAM</strong></div><b>→</b>
          <div><span>2–4 EIXOS</span><strong>conceitos centrais</strong></div><b>→</b>
          <div><span>VOCABULÁRIO</span><strong>sinônimos, traduções e radicais</strong></div><b>→</b>
          <div><span>PERGUNTA</span><strong>o que a busca precisa esclarecer?</strong></div>
        </div>
      </Slide>

      <Slide kicker="Etapas 2–4" title="Teste, compare e registre a sintaxe exatamente como foi executada" notes="Exija pelo menos três combinações preliminares. O menor número de resultados não é necessariamente a melhor estratégia.">
        <div className="e05-search-cycle">
          <div><span>PRELIMINAR</span><strong>≥ 3 combinações</strong><p>AND · OR · NOT · aspas · parênteses · truncamentos</p></div>
          <div><span>DECISÃO</span><strong>pertinência, não apenas volume</strong><p>campos, idioma, tipo documental e período justificado</p></div>
          <div><span>DEFINITIVA</span><strong>mesma base</strong><p>data, filtros, total bruto e exportação dos metadados</p></div>
        </div>
      </Slide>

      <Slide kicker="Etapa 5" title="Toda exclusão precisa de motivo e contagem verificável" notes="A filtragem deve permitir que outra pessoa reconstrua o caminho entre o resultado bruto e o portfólio final.">
        <div className="e05-filter">
          <div><span>Resultado bruto</span><strong>N</strong></div>
          <b>−</b><div><span>Duplicatas</span><strong>n₁</strong></div>
          <b>−</b><div><span>Tipo não elegível</span><strong>n₂</strong></div>
          <b>−</b><div><span>Fora do tema</span><strong>n₃</strong></div>
          <b>=</b><div className="final"><span>Portfólio filtrado</span><strong>10–20</strong></div>
        </div>
        <p className="e05-small-rule">Não exclua um artigo apenas porque o texto integral não foi localizado imediatamente.</p>
      </Slide>

      <Slide kicker="Etapas 6–7" title="Colete as variáveis antes de processar a planilha RankIn" source="Pagani et al. (2022), Methodi Ordinatio 2.0 e RankIn." notes="Mostre as fontes de cada variável. A data de consulta das citações e a fonte da métrica do periódico devem permanecer registradas.">
        <div className="e05-variables">
          <div><span>ANO</span><strong>publicação</strong></div>
          <div><span>CITAÇÕES</span><strong>quantidade + data</strong></div>
          <div><span>PERIÓDICO</span><strong>título e ISSN</strong></div>
          <div><span>MÉTRICA</span><strong>valor + fonte</strong></div>
          <div><span>DOI</span><strong>conferido</strong></div>
        </div>
        <div className="e05-equation"><span>variáveis verificadas</span><b>→</b><strong>InOrdinatio</strong><b>→</b><span>ranking decrescente</span></div>
      </Slide>

      <Slide kicker="Parâmetros da RankIn" title="Δ, λ e Ω expressam prioridades — por isso precisam de justificativa" notes="Cada parâmetro varia de zero a dez. Compare dois cenários para observar como a escolha altera a ordem do portfólio.">
        <div className="e05-parameters">
          <div><span>Δ</span><strong>Métrica do periódico</strong><p>quanto ela pesa na priorização?</p></div>
          <div><span>λ</span><strong>Idade do artigo</strong><p>quanto a atualidade importa?</p></div>
          <div><span>Ω</span><strong>Média anual de citações</strong><p>quanto a influência acumulada pesa?</p></div>
        </div>
        <p className="e05-parameter-rule">Escala 0–10 · registre o valor · explique a coerência com sua pergunta.</p>
      </Slide>

      <Slide kicker="Etapas 8–9" title="Leia o portfólio com uma matriz comum e procure padrões" notes="Faça primeiro uma leitura dinâmica de três ou quatro artigos. Depois leia o portfólio selecionado ou, no mínimo, os dez primeiros do ranking.">
        <div className="e05-reading-grid">
          {['objetivo e problema', 'setor e contexto', 'método e amostra', 'solução e resultados', 'limitações', 'trabalhos futuros'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
        </div>
        <div className="e05-synthesis"><strong>Síntese final</strong><span>convergências</span><span>divergências</span><span>≥ 3 lacunas</span><span>1 nova pergunta</span></div>
      </Slide>

      <Slide kicker="Produto final" title="Entregue o relatório e a planilha como um conjunto verificável" notes="O portfólio preferencial tem entre dez e vinte artigos. Quantidades fora dessa faixa precisam de justificativa metodológica.">
        <div className="e05-deliverables">
          <div><span>01</span><strong>Relatório</strong><p>4–6 páginas, sem anexos<br />PDF ou Word</p></div>
          <div><span>02</span><strong>Planilha RankIn</strong><p>buscas, filtros, variáveis, parâmetros e ranking</p></div>
          <div><span>03</span><strong>Portfólio</strong><p>10–20 artigos preferencialmente<br />análise de pelo menos 10</p></div>
        </div>
        <div className="e05-links centered"><ResourceLink href={activityUrl} primary>Abrir orientação completa</ResourceLink><ResourceLink href={spreadsheetUrl} download>Baixar RankIn v8.5</ResourceLink></div>
      </Slide>

      <Slide kicker="Avaliação · 10 pontos" title="O processo rastreável vale tanto quanto o ranking final" notes="Apresente a distribuição de pontos. Filtragem e aplicação da RankIn concentram 3,5 pontos, mas todas as etapas devem aparecer.">
        <div className="e05-score-grid">
          {[
            ['1,0', 'Intenção'], ['1,0', 'Busca preliminar'], ['1,0', 'Sintaxe'], ['1,0', 'Busca definitiva'],
            ['1,5', 'Filtragem'], ['1,0', 'Variáveis'], ['2,0', 'RankIn'], ['0,5', 'Download'],
            ['0,5', 'Leitura'], ['0,5', 'Organização'],
          ].map(([score, label]) => <div key={label}><strong>{score}</strong><span>{label}</span></div>)}
        </div>
      </Slide>

      <Slide kicker="Entrega pelo Drive" title="Prazo: 15 de setembro de 2026, às 23h59" notes="A atividade está aberta na Área do Aluno. Oriente o envio na pasta individual de atividades com o prefixo E05 no nome dos arquivos.">
        <div className="e05-deadline">
          <div><span>15 SET</span><strong>23:59</strong><small>America/Sao_Paulo</small></div>
          <ol>
            <li><b>1</b><span>Confira o checklist da orientação.</span></li>
            <li><b>2</b><span>Nomeie os arquivos começando por <strong>E05</strong>.</span></li>
            <li><b>3</b><span>Envie relatório e planilha na pasta individual.</span></li>
          </ol>
        </div>
        <div className="e05-links centered"><ResourceLink href={studentAreaUrl} primary>Abrir Área do Aluno</ResourceLink><ResourceLink href={activityUrl}>Revisar checklist</ResourceLink></div>
      </Slide>

      <Slide kicker="Referências e materiais" title="Tudo o que você precisa para iniciar está reunido aqui" notes="Encerre abrindo os três arquivos. Reforce as duas referências obrigatórias quando a metodologia for descrita no relatório.">
        <div className="e05-resource-list">
          <div><strong>Apresentação da aula</strong><p>Pagani (2026) · sequência das nove etapas</p><ResourceLink href={lectureUrl}>Ler PDF</ResourceLink></div>
          <div><strong>Orientação completa</strong><p>Rodrigues (2026) · quadros, critérios e checklist</p><ResourceLink href={activityUrl}>Ler atividade</ResourceLink></div>
          <div><strong>Planilha RankIn v8.5</strong><p>arquivo XLSM preservado com macros</p><ResourceLink href={spreadsheetUrl} download>Baixar planilha</ResourceLink></div>
        </div>
        <div className="e05-citations">
          <a href="https://doi.org/10.1007/s11192-015-1744-x" target="_blank" rel="noreferrer">Pagani, Kovaleski e Resende (2015) ↗</a>
          <a href="https://doi.org/10.1007/s11135-022-01562-y" target="_blank" rel="noreferrer">Pagani et al. (2022) ↗</a>
        </div>
      </Slide>
    </PresentationDeck>
  );
}
