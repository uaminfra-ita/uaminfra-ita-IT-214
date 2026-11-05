import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import assets from '@/data/presentation-assets.json';
import resources from '@/data/resources.json';
import './e13.css';

// Aula convidada de 03/11: os slides originais do palestrante, um por página, sem alteração de formatação.
const presentation = presentations.find((item) => item.slug === 'e13-drones-fotogrametria');
const allResources = Object.values(resources).flat();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const metadata = { title: presentation.title, description: presentation.subtitle };

function Slide({ assetId, label, notes, children }) {
  if (children) return <section className="img-slide img-end">{children}<aside className="notes">{notes}</aside></section>;
  const asset = assets.find((item) => item.id === assetId);
  return <section className="img-slide"><div className="img-frame"><Image src={basePath + asset.assetPath} alt={asset.alt} fill sizes="1440px" style={{ objectFit: 'contain' }} /></div><aside className="notes">{label}</aside></section>;
}
function Downloads({ ids }) {
  return <div className="img-downloads">{ids.map((id, index) => { const resource = allResources.find((item) => item.id === id); return <a key={id} href={basePath + resource.assetPath} download><span>Parte {index + 1}</span><strong>{resource.title.replace(/ — parte \d da aula$/, '')}</strong><b>Baixar PDF ↓</b></a>; })}</div>;
}

export default function E13PresentationPage() {
  return <PresentationDeck title={presentation.title} width={1600} height={900} className="img-deck">
    <Slide assetId="e13-p1-s001" label="Parte 1 · slide 1 de 102"/>
    <Slide assetId="e13-p1-s002" label="Parte 1 · slide 2 de 102"/>
    <Slide assetId="e13-p1-s003" label="Parte 1 · slide 3 de 102"/>
    <Slide assetId="e13-p1-s004" label="Parte 1 · slide 4 de 102"/>
    <Slide assetId="e13-p1-s005" label="Parte 1 · slide 5 de 102"/>
    <Slide assetId="e13-p1-s006" label="Parte 1 · slide 6 de 102"/>
    <Slide assetId="e13-p1-s007" label="Parte 1 · slide 7 de 102"/>
    <Slide assetId="e13-p1-s008" label="Parte 1 · slide 8 de 102"/>
    <Slide assetId="e13-p1-s009" label="Parte 1 · slide 9 de 102"/>
    <Slide assetId="e13-p1-s010" label="Parte 1 · slide 10 de 102"/>
    <Slide assetId="e13-p1-s011" label="Parte 1 · slide 11 de 102"/>
    <Slide assetId="e13-p1-s012" label="Parte 1 · slide 12 de 102"/>
    <Slide assetId="e13-p1-s013" label="Parte 1 · slide 13 de 102"/>
    <Slide assetId="e13-p1-s014" label="Parte 1 · slide 14 de 102"/>
    <Slide assetId="e13-p1-s015" label="Parte 1 · slide 15 de 102"/>
    <Slide assetId="e13-p1-s016" label="Parte 1 · slide 16 de 102"/>
    <Slide assetId="e13-p1-s017" label="Parte 1 · slide 17 de 102"/>
    <Slide assetId="e13-p1-s018" label="Parte 1 · slide 18 de 102"/>
    <Slide assetId="e13-p1-s019" label="Parte 1 · slide 19 de 102"/>
    <Slide assetId="e13-p1-s020" label="Parte 1 · slide 20 de 102"/>
    <Slide assetId="e13-p1-s021" label="Parte 1 · slide 21 de 102"/>
    <Slide assetId="e13-p1-s022" label="Parte 1 · slide 22 de 102"/>
    <Slide assetId="e13-p1-s023" label="Parte 1 · slide 23 de 102"/>
    <Slide assetId="e13-p1-s024" label="Parte 1 · slide 24 de 102"/>
    <Slide assetId="e13-p1-s025" label="Parte 1 · slide 25 de 102"/>
    <Slide assetId="e13-p1-s026" label="Parte 1 · slide 26 de 102"/>
    <Slide assetId="e13-p1-s027" label="Parte 1 · slide 27 de 102"/>
    <Slide assetId="e13-p1-s028" label="Parte 1 · slide 28 de 102"/>
    <Slide assetId="e13-p1-s029" label="Parte 1 · slide 29 de 102"/>
    <Slide assetId="e13-p1-s030" label="Parte 1 · slide 30 de 102"/>
    <Slide assetId="e13-p1-s031" label="Parte 1 · slide 31 de 102"/>
    <Slide assetId="e13-p1-s032" label="Parte 1 · slide 32 de 102"/>
    <Slide assetId="e13-p1-s033" label="Parte 1 · slide 33 de 102"/>
    <Slide assetId="e13-p1-s034" label="Parte 1 · slide 34 de 102"/>
    <Slide assetId="e13-p1-s035" label="Parte 1 · slide 35 de 102"/>
    <Slide assetId="e13-p1-s036" label="Parte 1 · slide 36 de 102"/>
    <Slide assetId="e13-p1-s037" label="Parte 1 · slide 37 de 102"/>
    <Slide assetId="e13-p1-s038" label="Parte 1 · slide 38 de 102"/>
    <Slide assetId="e13-p1-s039" label="Parte 1 · slide 39 de 102"/>
    <Slide assetId="e13-p1-s040" label="Parte 1 · slide 40 de 102"/>
    <Slide assetId="e13-p1-s041" label="Parte 1 · slide 41 de 102"/>
    <Slide assetId="e13-p1-s042" label="Parte 1 · slide 42 de 102"/>
    <Slide assetId="e13-p1-s043" label="Parte 1 · slide 43 de 102"/>
    <Slide assetId="e13-p1-s044" label="Parte 1 · slide 44 de 102"/>
    <Slide assetId="e13-p1-s045" label="Parte 1 · slide 45 de 102"/>
    <Slide assetId="e13-p1-s046" label="Parte 1 · slide 46 de 102"/>
    <Slide assetId="e13-p1-s047" label="Parte 1 · slide 47 de 102"/>
    <Slide assetId="e13-p1-s048" label="Parte 1 · slide 48 de 102"/>
    <Slide assetId="e13-p1-s049" label="Parte 1 · slide 49 de 102"/>
    <Slide assetId="e13-p1-s050" label="Parte 1 · slide 50 de 102"/>
    <Slide assetId="e13-p1-s051" label="Parte 1 · slide 51 de 102"/>
    <Slide assetId="e13-p1-s052" label="Parte 1 · slide 52 de 102"/>
    <Slide assetId="e13-p1-s053" label="Parte 1 · slide 53 de 102"/>
    <Slide assetId="e13-p1-s054" label="Parte 1 · slide 54 de 102"/>
    <Slide assetId="e13-p1-s055" label="Parte 1 · slide 55 de 102"/>
    <Slide assetId="e13-p1-s056" label="Parte 1 · slide 56 de 102"/>
    <Slide assetId="e13-p1-s057" label="Parte 1 · slide 57 de 102"/>
    <Slide assetId="e13-p1-s058" label="Parte 1 · slide 58 de 102"/>
    <Slide assetId="e13-p1-s059" label="Parte 1 · slide 59 de 102"/>
    <Slide assetId="e13-p1-s060" label="Parte 1 · slide 60 de 102"/>
    <Slide assetId="e13-p1-s061" label="Parte 1 · slide 61 de 102"/>
    <Slide assetId="e13-p1-s062" label="Parte 1 · slide 62 de 102"/>
    <Slide assetId="e13-p1-s063" label="Parte 1 · slide 63 de 102"/>
    <Slide assetId="e13-p1-s064" label="Parte 1 · slide 64 de 102"/>
    <Slide assetId="e13-p1-s065" label="Parte 1 · slide 65 de 102"/>
    <Slide assetId="e13-p1-s066" label="Parte 1 · slide 66 de 102"/>
    <Slide assetId="e13-p1-s067" label="Parte 1 · slide 67 de 102"/>
    <Slide assetId="e13-p1-s068" label="Parte 1 · slide 68 de 102"/>
    <Slide assetId="e13-p1-s069" label="Parte 1 · slide 69 de 102"/>
    <Slide assetId="e13-p1-s070" label="Parte 1 · slide 70 de 102"/>
    <Slide assetId="e13-p1-s071" label="Parte 1 · slide 71 de 102"/>
    <Slide assetId="e13-p1-s072" label="Parte 1 · slide 72 de 102"/>
    <Slide assetId="e13-p1-s073" label="Parte 1 · slide 73 de 102"/>
    <Slide assetId="e13-p1-s074" label="Parte 1 · slide 74 de 102"/>
    <Slide assetId="e13-p1-s075" label="Parte 1 · slide 75 de 102"/>
    <Slide assetId="e13-p1-s076" label="Parte 1 · slide 76 de 102"/>
    <Slide assetId="e13-p1-s077" label="Parte 1 · slide 77 de 102"/>
    <Slide assetId="e13-p1-s078" label="Parte 1 · slide 78 de 102"/>
    <Slide assetId="e13-p1-s079" label="Parte 1 · slide 79 de 102"/>
    <Slide assetId="e13-p1-s080" label="Parte 1 · slide 80 de 102"/>
    <Slide assetId="e13-p1-s081" label="Parte 1 · slide 81 de 102"/>
    <Slide assetId="e13-p1-s082" label="Parte 1 · slide 82 de 102"/>
    <Slide assetId="e13-p1-s083" label="Parte 1 · slide 83 de 102"/>
    <Slide assetId="e13-p1-s084" label="Parte 1 · slide 84 de 102"/>
    <Slide assetId="e13-p1-s085" label="Parte 1 · slide 85 de 102"/>
    <Slide assetId="e13-p1-s086" label="Parte 1 · slide 86 de 102"/>
    <Slide assetId="e13-p1-s087" label="Parte 1 · slide 87 de 102"/>
    <Slide assetId="e13-p1-s088" label="Parte 1 · slide 88 de 102"/>
    <Slide assetId="e13-p1-s089" label="Parte 1 · slide 89 de 102"/>
    <Slide assetId="e13-p1-s090" label="Parte 1 · slide 90 de 102"/>
    <Slide assetId="e13-p1-s091" label="Parte 1 · slide 91 de 102"/>
    <Slide assetId="e13-p1-s092" label="Parte 1 · slide 92 de 102"/>
    <Slide assetId="e13-p1-s093" label="Parte 1 · slide 93 de 102"/>
    <Slide assetId="e13-p1-s094" label="Parte 1 · slide 94 de 102"/>
    <Slide assetId="e13-p1-s095" label="Parte 1 · slide 95 de 102"/>
    <Slide assetId="e13-p1-s096" label="Parte 1 · slide 96 de 102"/>
    <Slide assetId="e13-p1-s097" label="Parte 1 · slide 97 de 102"/>
    <Slide assetId="e13-p1-s098" label="Parte 1 · slide 98 de 102"/>
    <Slide assetId="e13-p1-s099" label="Parte 1 · slide 99 de 102"/>
    <Slide assetId="e13-p1-s100" label="Parte 1 · slide 100 de 102"/>
    <Slide assetId="e13-p1-s101" label="Parte 1 · slide 101 de 102"/>
    <Slide assetId="e13-p1-s102" label="Parte 1 · slide 102 de 102"/>
    <Slide assetId="e13-p2-s001" label="Parte 2 · slide 1 de 51"/>
    <Slide assetId="e13-p2-s002" label="Parte 2 · slide 2 de 51"/>
    <Slide assetId="e13-p2-s003" label="Parte 2 · slide 3 de 51"/>
    <Slide assetId="e13-p2-s004" label="Parte 2 · slide 4 de 51"/>
    <Slide assetId="e13-p2-s005" label="Parte 2 · slide 5 de 51"/>
    <Slide assetId="e13-p2-s006" label="Parte 2 · slide 6 de 51"/>
    <Slide assetId="e13-p2-s007" label="Parte 2 · slide 7 de 51"/>
    <Slide assetId="e13-p2-s008" label="Parte 2 · slide 8 de 51"/>
    <Slide assetId="e13-p2-s009" label="Parte 2 · slide 9 de 51"/>
    <Slide assetId="e13-p2-s010" label="Parte 2 · slide 10 de 51"/>
    <Slide assetId="e13-p2-s011" label="Parte 2 · slide 11 de 51"/>
    <Slide assetId="e13-p2-s012" label="Parte 2 · slide 12 de 51"/>
    <Slide assetId="e13-p2-s013" label="Parte 2 · slide 13 de 51"/>
    <Slide assetId="e13-p2-s014" label="Parte 2 · slide 14 de 51"/>
    <Slide assetId="e13-p2-s015" label="Parte 2 · slide 15 de 51"/>
    <Slide assetId="e13-p2-s016" label="Parte 2 · slide 16 de 51"/>
    <Slide assetId="e13-p2-s017" label="Parte 2 · slide 17 de 51"/>
    <Slide assetId="e13-p2-s018" label="Parte 2 · slide 18 de 51"/>
    <Slide assetId="e13-p2-s019" label="Parte 2 · slide 19 de 51"/>
    <Slide assetId="e13-p2-s020" label="Parte 2 · slide 20 de 51"/>
    <Slide assetId="e13-p2-s021" label="Parte 2 · slide 21 de 51"/>
    <Slide assetId="e13-p2-s022" label="Parte 2 · slide 22 de 51"/>
    <Slide assetId="e13-p2-s023" label="Parte 2 · slide 23 de 51"/>
    <Slide assetId="e13-p2-s024" label="Parte 2 · slide 24 de 51"/>
    <Slide assetId="e13-p2-s025" label="Parte 2 · slide 25 de 51"/>
    <Slide assetId="e13-p2-s026" label="Parte 2 · slide 26 de 51"/>
    <Slide assetId="e13-p2-s027" label="Parte 2 · slide 27 de 51"/>
    <Slide assetId="e13-p2-s028" label="Parte 2 · slide 28 de 51"/>
    <Slide assetId="e13-p2-s029" label="Parte 2 · slide 29 de 51"/>
    <Slide assetId="e13-p2-s030" label="Parte 2 · slide 30 de 51"/>
    <Slide assetId="e13-p2-s031" label="Parte 2 · slide 31 de 51"/>
    <Slide assetId="e13-p2-s032" label="Parte 2 · slide 32 de 51"/>
    <Slide assetId="e13-p2-s033" label="Parte 2 · slide 33 de 51"/>
    <Slide assetId="e13-p2-s034" label="Parte 2 · slide 34 de 51"/>
    <Slide assetId="e13-p2-s035" label="Parte 2 · slide 35 de 51"/>
    <Slide assetId="e13-p2-s036" label="Parte 2 · slide 36 de 51"/>
    <Slide assetId="e13-p2-s037" label="Parte 2 · slide 37 de 51"/>
    <Slide assetId="e13-p2-s038" label="Parte 2 · slide 38 de 51"/>
    <Slide assetId="e13-p2-s039" label="Parte 2 · slide 39 de 51"/>
    <Slide assetId="e13-p2-s040" label="Parte 2 · slide 40 de 51"/>
    <Slide assetId="e13-p2-s041" label="Parte 2 · slide 41 de 51"/>
    <Slide assetId="e13-p2-s042" label="Parte 2 · slide 42 de 51"/>
    <Slide assetId="e13-p2-s043" label="Parte 2 · slide 43 de 51"/>
    <Slide assetId="e13-p2-s044" label="Parte 2 · slide 44 de 51"/>
    <Slide assetId="e13-p2-s045" label="Parte 2 · slide 45 de 51"/>
    <Slide assetId="e13-p2-s046" label="Parte 2 · slide 46 de 51"/>
    <Slide assetId="e13-p2-s047" label="Parte 2 · slide 47 de 51"/>
    <Slide assetId="e13-p2-s048" label="Parte 2 · slide 48 de 51"/>
    <Slide assetId="e13-p2-s049" label="Parte 2 · slide 49 de 51"/>
    <Slide assetId="e13-p2-s050" label="Parte 2 · slide 50 de 51"/>
    <Slide assetId="e13-p2-s051" label="Parte 2 · slide 51 de 51"/>
    <Slide notes="Os PDFs também estão na Biblioteca da disciplina."><div><p className="img-kicker">IT-214 · Aula convidada de 03/11/2026</p><h2>Materiais da aula</h2><p className="img-lead">Eng. Harley Angelo de Moraes · Polícia Federal e CENSIPAM</p><Downloads ids={presentation.resourceIds}/></div></Slide>
  </PresentationDeck>;
}
