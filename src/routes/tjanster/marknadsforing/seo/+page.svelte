<!-- Tjänster/Marknadsföring/SEO -->
<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import Footer from "$components/layout/Footer.svelte";

	import Hero from "$lib/sections/Hero.svelte";
	import TabbedSection from "$lib/sections/TabbedSection.svelte";
	import CenteredText from "$lib/sections/CenteredText.svelte";
	import HorizontalTabbedSection from "$lib/sections/HorizontalTabbedSection.svelte";
	import FAQ from "$lib/sections/FAQ.svelte";
	import SectionDivider from "$components/layout/SectionDivider.svelte";
	import Seo from "$lib/components/Seo.svelte";
	import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";

	import type { AccordionItem } from "$src/lib/models/accordion";

	const heroAccordionItems: AccordionItem[] = [
		{
			title: "Teknisk SEO",
			content:
				"<p>Vi bygger en stabil teknisk grund med snabb laddtid, tydlig struktur och korrekt indexering.</p>",
			open: true,
		},
		{
			title: "Innehållsstrategi",
			content:
				"<p>Vi matchar innehåll mot sökintention så att rätt målgrupp hittar er när behovet är som störst.</p>",
		},
		{
			title: "Löpande förbättring",
			content:
				"<p>SEO är ett långsiktigt arbete där vi följer data, optimerar kontinuerligt och skalar det som fungerar.</p>",
		},
	];

	const seoTabs = [
		{
			id: "grund",
			label: "SEO-GRUND",
			title: "Grunden som gör att Google förstår er webbplats",
			items: [
				{
					id: "crawl",
					title: "Teknisk struktur och indexering",
					ingress: "Säkerställ att viktiga sidor faktiskt kan ranka",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_seo_1.png" alt="Teknisk SEO och indexering"/>
						</div>
						<p>
							Vi går igenom sajtstruktur, interna länkar, metadata, schema markup och tekniska hinder.
							Målet är att sökmotorer enkelt ska kunna crawla, förstå och prioritera rätt innehåll.
							En stark teknisk bas gör att resten av SEO-arbetet faktiskt får effekt.
						</p>
					`,
				},
				{
					id: "keyword",
					title: "Sökordsanalys med affärsfokus",
					ingress: "Prioritera ord som driver relevanta affärer",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_seo_2.png" alt="Sökordsanalys för SEO"/>
						</div>
						<p>
							Vi kartlägger hur era kunder faktiskt söker och grupperar sökord efter intention, konkurrens
							och affärsvärde. Därefter bygger vi en tydlig sidstruktur så att varje viktig sökfråga får ett
							tydligt svar på rätt landningssida.
						</p>
					`,
				},
				{
					id: "content",
					title: "Innehåll som svarar på rätt frågor",
					ingress: "Skapa innehåll som rankar och konverterar",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_seo_3.png" alt="Innehållsoptimering för SEO"/>
						</div>
						<p>
							Vi optimerar innehåll med fokus på tydlighet, expertis och relevans. Rubriker, struktur,
							copy och CTA justeras för att både möta sökintention och hjälpa besökaren vidare i köpresan.
							Resultatet blir mer kvalificerad trafik och bättre konvertering.
						</p>
					`,
				},
			],
		},
		{
			id: "tillvaxt",
			label: "TILLVÄXT",
			title: "SEO som förbättras månad för månad",
			items: [
				{
					id: "authority",
					title: "Bygg auktoritet i er nisch",
					ingress: "Stärk trovärdighet med rätt innehåll och länksignaler",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_seo_1.png" alt="Auktoritet inom SEO"/>
						</div>
						<p>
							Vi arbetar med topical authority genom ämneskluster, internlänkning och kvalitativa
							signaler som visar varför ni är relevanta i er nisch. Med en tydlig expertposition blir det
							lättare att ranka bredare och mer konkurrensutsatta sökord över tid.
						</p>
					`,
				},
				{
					id: "local",
					title: "Lokal SEO för geografiska sökningar",
					ingress: "Syns när kunder söker i ert område",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_seo_2.png" alt="Lokal SEO och Google-sökningar"/>
						</div>
						<p>
							För verksamheter med lokal närvaro optimerar vi mot lokala sökningar med korrekt struktur,
							relevanta landningssidor och tydliga signaler kring tjänster och geografi. Det gör att ni
							hittas oftare av kunder som är redo att agera här och nu.
						</p>
					`,
				},
				{
					id: "analysis",
					title: "Mätning, uppföljning och prioritering",
					ingress: "Datadrivna beslut istället för gissningar",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_seo_3.png" alt="SEO-analys och uppföljning"/>
						</div>
						<p>
							Vi följer ranking, trafik, beteende och konverteringar för att förstå vad som faktiskt ger
							resultat. Med tydliga prioriteringar i varje sprint lägger vi tiden där den ger mest effekt,
							så att SEO blir en mätbar tillväxtkanal och inte ett sidoprojekt.
						</p>
					`,
				},
			],
		},
	];

	const centeredTextContent = {
		title: "Varför investera i SEO?",
		body: `
			<p>SEO hjälper er bli hittade av personer som redan söker efter det ni erbjuder. Istället för att jaga uppmärksamhet bygger ni en stabil kanal där rätt trafik kommer in kontinuerligt.</p>
			<p class="mt-1">När teknik, innehåll och strategi samverkar blir SEO en långsiktig tillgång som stärker både varumärke, konvertering och lönsamhet över tid.</p>
		`,
	};

	const seoExecutionTabs = [
		{
			label: "Analys & målbild",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Analys & målbild</h4>
					<p class="mt-1 pr-2">
						Vi börjar med nulägesanalys av teknik, innehåll, sökord och konkurrenter.
						Därefter sätter vi en tydlig målbild och bryter ner arbetet i prioriterade insatser.
						Ni får ett SEO-upplägg som är realistiskt, mätbart och kopplat till affären.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/se_seo_1.png" loading="lazy" alt="Analys och målbild"/>
					</div>
				</div>
			`,
		},
		{
			label: "Implementering",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Implementering</h4>
					<p class="mt-1 pr-2">
						Vi genomför tekniska förbättringar, optimerar befintliga sidor och utvecklar nytt innehåll
						som möter viktiga sökintentioner. Arbetet sker strukturerat så att varje förändring går att
						följa upp mot tydliga KPI:er.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/se_seo_2.png" loading="lazy" alt="SEO-implementering"/>
					</div>
				</div>
			`,
		},
		{
			label: "Uppföljning & skalning",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Uppföljning & skalning</h4>
					<p class="mt-1 pr-2">
						SEO blir starkt när arbetet är kontinuerligt. Vi följer resultat, identifierar nya möjligheter
						och förstärker de delar som driver mest värde. På så sätt får ni en kanal som växer över tid,
						inte bara tillfälliga toppar.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/se_seo_3.png" loading="lazy" alt="Uppföljning och skalning av SEO"/>
					</div>
				</div>
			`,
		},
	];

	const accordionItems: AccordionItem[] = [
		{
			title: "Hur lång tid tar det innan SEO ger resultat?",
			content:
				"<p>SEO är en långsiktig investering. Mindre förbättringar kan synas tidigt, men tydligare effekt brukar komma när teknik, innehåll och auktoritet byggts upp över tid.</p>",
			open: true,
		},
		{
			title: "Behöver vi skapa mycket nytt innehåll?",
			content:
				"<p>Inte alltid. Ofta finns stor potential i att strukturera om, förtydliga och optimera befintligt innehåll. Vid behov tar vi fram nytt material utifrån prioriterade sökintentioner.</p>",
		},
		{
			title: "Kan ni hjälpa oss med både teknik och innehåll?",
			content:
				"<p>Ja. Vi arbetar med hela SEO-flödet: teknisk grund, sökordsstrategi, innehållsoptimering och uppföljning. Det gör att insatserna hänger ihop och ger bättre effekt.</p>",
		},
		{
			title: "Hur vet vi att SEO-arbetet fungerar?",
			content:
				"<p>Vi följer upp relevanta nyckeltal som organisk trafik, ranking, synlighet och konverteringar. Ni får tydlig återkoppling på vad som gjorts, vad som fungerar och vad som prioriteras härnäst.</p>",
		},
		{
			title: "Passar SEO alla företag?",
			content:
				"<p>I de flesta fall, ja. Om era kunder söker information, produkter eller tjänster online finns nästan alltid möjlighet att skapa affärsvärde med en smart SEO-strategi.</p>",
		},
	];
</script>

<Seo
	title="SEO-tjänster | CreateWeb"
	description="Datadriven SEO med teknisk optimering, innehållsstrategi och löpande uppföljning för bättre synlighet, mer relevant trafik och fler affärer."
	path="/tjanster/marknadsforing/seo"
	image="/images/tjanster/marknadsforing/hero_image.png"
	keywords={[
		"seo tjänster",
		"sökmotoroptimering",
		"teknisk seo",
		"innehållsstrategi",
		"createweb",
	]}
/>

<Header />

<Hero
	title={`SEO som gör att ni hittas av rätt kunder, vid <span class="highlight">rätt tillfälle</span>.`}
	description="Vi hjälper er ta plats i sökresultaten med en SEO-strategi som bygger på teknik, innehåll och löpande förbättring. Mindre gissningar. Mer synlighet som håller över tid."
	accordionItems={heroAccordionItems}
>
	<FlexContainer class="h-100 w-100 align-center justify-center">
		<div class="hero-image-container">
			<img
				src="/images/tjanster/marknadsforing/hero_image.png"
				alt="SEO-analys och digital marknadsföring"
			/>
		</div>
	</FlexContainer>
</Hero>

<SectionDivider borderTop borderBottom></SectionDivider>

<Section lines="XX-XX" borderBottom>
	<Column span={3}></Column>
	<Column span={6} class="py-2 py-xs-2">
		<p class="subheading text-accent text-center">SEO-STRATEGI</p>
		<h2 class="text-center px-2">
			Ett långsiktigt SEO-arbete som stärker både trafik och affär
		</h2>
	</Column>
	<Column span={3}></Column>
</Section>

<TabbedSection type="double" groups={seoTabs} />
<CenteredText content={centeredTextContent} />
<SectionDivider borderTop borderBottom />

<HorizontalTabbedSection
	heading={`Från analys till resultat <br class="hide-mobile"/> i tre tydliga steg`}
	subheading="så jobbar vi med seo"
	tabs={seoExecutionTabs}
/>

<FAQ
	{accordionItems}
	imageUrl="/images/tjanster/marknadsforing/faq_image.png"
	title="Frågor vi ofta får om SEO"
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
