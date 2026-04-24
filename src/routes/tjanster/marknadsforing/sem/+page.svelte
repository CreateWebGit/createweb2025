<!-- Tjänster/Marknadsföring/SEM -->
<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import Footer from "$components/layout/Footer.svelte";

	import Hero from "$lib/sections/Hero.svelte";
	import TabbedSection from "$lib/sections/TabbedSection.svelte";
	import HorizontalTabbedSection from "$lib/sections/HorizontalTabbedSection.svelte";
	import TwoColumnTextImage from "$lib/sections/TwoColumnTextImage.svelte";
	import FAQ from "$lib/sections/FAQ.svelte";
	import SectionDivider from "$components/layout/SectionDivider.svelte";
	import Seo from "$lib/components/Seo.svelte";
	import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";

	import type { AccordionItem } from "$src/lib/models/accordion";

	const heroAccordionItems: AccordionItem[] = [
		{
			title: "Google Ads",
			content:
				"<p>Vi bygger annonsering som fångar köpintention i exakt rätt ögonblick.</p>",
			open: true,
		},
		{
			title: "Landningssidor",
			content:
				"<p>Vi matchar annonsbudskap med landningssidor som konverterar bättre.</p>",
		},
		{
			title: "Optimering",
			content:
				"<p>Vi förbättrar kampanjer löpande med data, test och tydliga prioriteringar.</p>",
		},
	];

	const semTabs = [
		{
			id: "setup",
			label: "UPPSÄTTNING",
			title: "SEM från strategi till skarp kampanjstruktur",
			items: [
				{
					id: "intent",
					title: "Sökintention och kontostruktur",
					ingress: "Bygg kampanjer utifrån vad kunder faktiskt söker",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_sem_1.png" alt="Sökintention och SEM-strategi"/>
						</div>
						<p>
							Vi analyserar sökbeteenden, konkurrens och affärsmål för att skapa en kampanjstruktur
							som är enkel att styra och skala. Med rätt segmentering från start blir det lättare att
							optimera budget, budskap och resultat över tid.
						</p>
					`,
				},
				{
					id: "ads",
					title: "Annonstexter som driver klick",
					ingress: "Tydliga budskap med rätt erbjudande",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_sem_2.png" alt="Annonstexter för Google Ads"/>
						</div>
						<p>
							Vi skriver annonstexter som möter användarens behov direkt och lyfter ert verkliga värde.
							Relevans mellan sökord, annons och landningssida förbättrar både kvalitetsresultat och
							klickkostnad, vilket ger bättre effekt på varje spenderad krona.
						</p>
					`,
				},
				{
					id: "tracking",
					title: "Spårning och mätbara mål",
					ingress: "Se vad som faktiskt leder till affär",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_sem_3.png" alt="Konverteringsspårning i SEM"/>
						</div>
						<p>
							Vi sätter upp konverteringsspårning så att ni kan skilja trafik från resultat.
							Med korrekt mätning går det att optimera mot faktiska affärsmål och undvika beslut baserade
							på ytliga siffror som klick eller visningar.
						</p>
					`,
				},
			],
		},
		{
			id: "scale",
			label: "SKALNING",
			title: "Kontinuerlig SEM-optimering för bättre ROI",
			items: [
				{
					id: "budget",
					title: "Smart budgetfördelning",
					ingress: "Flytta investeringar dit resultatet är starkast",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_sem_1.png" alt="Budgetoptimering inom SEM"/>
						</div>
						<p>
							Vi analyserar prestation på kampanj-, annonsgrupp- och sökordsnivå för att fördela budget
							mer effektivt. Fokus ligger på lönsam tillväxt, inte högst möjlig spend.
						</p>
					`,
				},
				{
					id: "testing",
					title: "A/B-test av budskap och landningssidor",
					ingress: "Små förbättringar som ökar konvertering över tid",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_sem_2.png" alt="A/B-testning i SEM"/>
						</div>
						<p>
							Vi testar rubriker, erbjudanden, CTA och landningssidans upplägg för att förstå vad som
							driver flest kvalitativa leads eller köp. Testerna dokumenteras och omsätts i tydliga nästa steg.
						</p>
					`,
				},
				{
					id: "improvement",
					title: "Löpande uppföljning och förbättring",
					ingress: "Datadrivet arbetssätt månad för månad",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_sem_3.png" alt="Löpande SEM-optimering"/>
						</div>
						<p>
							Vi följer upp KPI:er, justerar budstrategier och skalar vinnande segment. Med ett
							kontinuerligt förbättringsarbete blir SEM en stabil motor för tillväxt istället för en
							kortvarig kampanjinsats.
						</p>
					`,
				},
			],
		},
	];

	const semExecutionTabs = [
		{
			label: "Research & plan",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Research & plan</h4>
					<p class="mt-1 pr-2">
						Vi analyserar nuläge, konkurrens, sökbeteende och affärsmål.
						Utifrån det definierar vi kanalstrategi, budgetfördelning och KPI:er för uppföljning.
						Ni får en tydlig plan med fokus på lönsam trafik.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/se_sem_1.png" loading="lazy" alt="SEM research och planering"/>
					</div>
				</div>
			`,
		},
		{
			label: "Lansering",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Lansering</h4>
					<p class="mt-1 pr-2">
						Vi bygger och lanserar kampanjer med rätt struktur, budskap och spårning.
						Första perioden används för datainsamling och snabba justeringar så att kampanjerna
						snabbt når stabil nivå.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/se_sem_2.png" loading="lazy" alt="Lansering av SEM-kampanjer"/>
					</div>
				</div>
			`,
		},
		{
			label: "Optimering",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Optimering</h4>
					<p class="mt-1 pr-2">
						Vi arbetar iterativt med sökord, annonser, budstrategier och landningssidor.
						Genom kontinuerlig förbättring pressar vi kostnad per konvertering och skalar
						det som ger bäst affärseffekt.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/se_sem_3.png" loading="lazy" alt="Optimering av SEM"/>
					</div>
				</div>
			`,
		},
	];

	const accordionItems: AccordionItem[] = [
		{
			title: "Hur snabbt kan vi se resultat från SEM?",
			content:
				"<p>SEM kan ge synlighet direkt efter lansering. Stabil och lönsam prestation byggs dock genom löpande optimering under de första veckorna och månaderna.</p>",
			open: true,
		},
		{
			title: "Hur stor budget behöver vi?",
			content:
				"<p>Det beror på bransch, konkurrens och mål. Vi rekommenderar en realistisk startbudget, följer utfallet noga och skalar först när data visar tydlig effekt.</p>",
		},
		{
			title: "Kan ni arbeta med befintligt Google Ads-konto?",
			content:
				"<p>Ja. Vi kan både ta över och förbättra befintliga konton eller bygga upp en ny struktur från grunden beroende på nuläget.</p>",
		},
		{
			title: "Hur mäter ni om annonseringen fungerar?",
			content:
				"<p>Vi följer nyckeltal som konverteringar, kostnad per konvertering, ROAS och kvalitet i inkommande leads. Fokus ligger på faktisk affärseffekt, inte bara klick.</p>",
		},
		{
			title: "Passar SEM tillsammans med SEO?",
			content:
				"<p>Ja. SEM ger snabb räckvidd medan SEO bygger långsiktig synlighet. Tillsammans får ni både kortsiktig och långsiktig effekt i sökkanalen.</p>",
		},
	];
</script>

<Seo
	title="SEM-tjänster | CreateWeb"
	description="Resultatdriven SEM med strategi, kampanjuppsättning och löpande optimering för fler konverteringar och bättre avkastning på annonsbudgeten."
	path="/tjanster/marknadsforing/sem"
	image="/images/tjanster/marknadsforing/se_sem_1.png"
	keywords={[
		"sem tjänster",
		"google ads",
		"sökannonsering",
		"paid search",
		"createweb",
	]}
/>

<Header />

<Hero
	title={`SEM som fångar köpintention och driver mätbara <span class="highlight">resultat</span>.`}
	description="Vi skapar sökannonsering som når rätt personer när de är redo att agera. Med tydlig strategi, smart uppsättning och löpande optimering får ni mer effekt per investerad krona."
	accordionItems={heroAccordionItems}
>
	<FlexContainer class="h-100 w-100 align-center justify-center">
		<div class="hero-image-container">
			<img
				src="/images/tjanster/marknadsforing/se_sem_1.png"
				alt="SEM och datadriven sökannonsering"
			/>
		</div>
	</FlexContainer>
</Hero>

<SectionDivider borderTop borderBottom />

<TwoColumnTextImage
	subheading={"när sem passar bäst"}
	heading={"Snabb synlighet där <br/> köpintentionen redan finns"}
	body={`SEM passar när ni behöver synas direkt i konkurrensutsatta sökresultat eller vill driva trafik till ett specifikt erbjudande utan väntetid.

	Rätt uppsatt blir kanalen fullt mätbar, vilket gör det enkelt att styra budget efter faktisk affärseffekt istället för magkänsla.`}
	imageUrl="/images/tjanster/marknadsforing/se_sem_2.png"
	imageAlt="SEM-strategi och annonsering"
/>

<HorizontalTabbedSection
	heading={`En tydlig process från setup <br class="hide-mobile"/> till skalbar tillväxt`}
	subheading="så jobbar vi med sem"
	tabs={semExecutionTabs}
/>

<SectionDivider borderBottom />

<Section lines="XX-XX" borderBottom>
	<Column span={3}></Column>
	<Column span={6} class="py-2 py-xs-2">
		<p class="subheading text-accent text-center">SEM-FÖRDJUPNING</p>
		<h2 class="text-center px-2">
			Kampanjer som kombinerar precision, tempo och lönsamhet
		</h2>
	</Column>
	<Column span={3}></Column>
</Section>

<TabbedSection type="double" groups={semTabs} />

<FAQ
	{accordionItems}
	imageUrl="/images/tjanster/marknadsforing/faq_image.png"
	title="Frågor vi ofta får om SEM"
/>

<Footer />

<style lang="scss">
	:global(.hero-image-container) {
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: 2;

		@media (max-width: 768px) {
			height: 100%;
			width: 100%;
			position: relative;
			border: none;
		}

		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}
</style>
