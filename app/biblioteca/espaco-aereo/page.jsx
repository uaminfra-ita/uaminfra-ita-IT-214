import PageHero from '@/components/PageHero';
import ResourceSection from '@/components/ResourceSection';
import resources from '@/data/resources.json';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';

export const metadata = { title: 'Materiais da aula — Espaço aéreo' };
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const deck = presentations.find(item => item.slug === 'e06-espaco-aereo');
const allResources = Object.values(resources).flat();
const selected = deck.resourceIds.map(id => allResources.find(item => item.id === id));
const norms = selected.filter(item => ['decea-2024-ica10012', 'decea-2025-ica10037'].includes(item.id));
const concepts = selected.filter(item => ['faa-2023-uam-conops-2', 'decea-2024-conops-uam-nacional', 'corus-2023-conops4'].includes(item.id));
const research = selected.filter(item => ['lee-2022-dcb-vertiports', 'seuken-2022-market-design', 'nasa-2022-digital-flight', 'nasa-2021-provider-services-uam'].includes(item.id));
const cases = selected.filter(item => item.id.startsWith('sigmasky-'));
const figures = assets.filter(item => item.presentationSlug === deck.slug || item.additionalUses?.some(use => use.presentationSlug === deck.slug));

export default function AirspaceMaterialsPage() {
  return <>
    <PageHero title="Espaço aéreo • materiais da aula" description="Normas, conceitos operacionais, pesquisas e estudo de caso usados na E06. Todos os documentos abaixo podem ser lidos ou baixados diretamente.">
      <a className="inline-flex items-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-900" href={basePath + '/apresentacoes/e06-espaco-aereo/'}>Abrir apresentação</a>
    </PageHero>
    <div className="section-shell">
      <nav aria-label="Materiais por tema" className="mb-10 flex flex-wrap gap-3">
        {[['normas', 'Normas'], ['conops', 'CONOPS'], ['pesquisas', 'Pesquisas'], ['caso', 'Estudo de caso'], ['creditos', 'Créditos das figuras']].map(([id, label]) => <a className="button-dark" href={'#' + id} key={id}>{label}</a>)}
      </nav>
      <ResourceSection id="normas" label="01" title="Estrutura e serviços atuais" description="Regras do Ar e Serviços de Tráfego Aéreo. As versões e alterações estão identificadas em cada documento." resources={norms} />
      <ResourceSection id="conops" label="02" title="Conceitos de integração UAM" description="Propostas brasileira, norte-americana e europeia para comparar espaço, serviços e responsabilidades." resources={concepts} />
      <ResourceSection id="pesquisas" label="03" title="Coordenação, capacidade e acesso" description="Artigos e relatórios que fundamentam a discussão de planejamento, cooperação e distribuição de recursos." resources={research} />
      <ResourceSection id="caso" label="04" title="Aplicação na RMSP" description="Os Produtos 1 e 2 do SIGMA-Sky apoiam a localização das fontes e a análise do caso de São Paulo." resources={cases} />
      <section id="creditos" className="scroll-mt-28 border-t border-slate-200 py-12">
        <h2 className="text-2xl font-black text-ink">Créditos das figuras</h2>
        <p className="mt-3 text-slate-600">Autoria e localização das figuras utilizadas nos slides. Os documentos completos estão disponíveis acima.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {figures.map(asset => {
            const use = asset.additionalUses?.find(item => item.presentationSlug === deck.slug);
            const numbers = asset.presentationSlug === deck.slug ? asset.slideNumbers : use.slideNumbers;
            const resource = allResources.find(item => item.id === (asset.resourceId || asset.sourceDocumentId)) || selected.find(item => item.publisherUrl === asset.sourceUrl);
            return <article className="surface-card" key={asset.id}>
              <h3 className="text-lg font-black text-ink">{asset.title}</h3>
              <p className="mt-2 text-sm text-cyan-800">Slides {numbers.join(', ')} • {asset.creditLine}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{asset.license || asset.usageBasis}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a className="font-bold text-cyan-800" href={basePath + asset.assetPath} download>Baixar figura</a>
                {resource && <a className="font-bold text-cyan-800" href={basePath + resource.assetPath} target="_blank" rel="noreferrer">Abrir documento-fonte</a>}
              </div>
            </article>;
          })}
        </div>
        <p className="mt-6 text-sm leading-6 text-slate-600">O esquema de FIR, CTA, TMA, CTR e ATZ é uma ilustração didática original da equipe IT-214, baseada na ICA 100-37. Não possui escala nem limites operacionais. Os demais quadros e exemplos textuais são sínteses didáticas; fontes específicas constam nas notas do professor.</p>
      </section>
    </div>
  </>;
}
