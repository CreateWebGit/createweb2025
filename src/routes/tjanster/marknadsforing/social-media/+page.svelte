<!-- Tjänster/Marknadsföring/Social Media -->
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
			title: "Innehållsstrategi",
			content:
				"<p>Vi skapar innehåll som speglar varumärket och bygger förtroende hos rätt målgrupp.</p>",
			open: true,
		},
		{
			title: "Paid Social",
			content:
				"<p>Vi använder annonsering i sociala kanaler för att öka räckvidd, leads och försäljning.</p>",
		},
		{
			title: "Analys & förbättring",
			content:
				"<p>Vi följer data löpande och förbättrar innehåll, format och kampanjer månad för månad.</p>",
		},
	];

	const socialServiceTabs = [
		{
			label: "Innehållsstrategi",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Innehållsstrategi</h4>
					<p class="mt-1 pr-2">
						Vi tar fram en innehållsplan med tydlig tonalitet, återkommande format och teman
						som är relevanta för målgruppen. Målet är att skapa en konsekvent närvaro som både
						bygger varumärke och driver handling.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/social_innehall.png" loading="lazy" alt="Innehållsstrategi i sociala medier"/>
					</div>
				</div>
			`,
		},
		{
			label: "Paid Social",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Paid Social</h4>
					<p class="mt-1 pr-2">
						Vi planerar och driver annonser i sociala kanaler med tydliga mål för räckvidd,
						engagemang eller konvertering. Genom löpande test av budskap, format och målgrupper
						får ni mer resultat från varje annonskrona.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/social_strategi.png" loading="lazy" alt="Paid Social och målgruppsannonsering"/>
					</div>
				</div>
			`,
		},
		{
			label: "Publicering & analys",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Publicering & analys</h4>
					<p class="mt-1 pr-2">
						Vi publicerar enligt plan, följer upp nyckeltal och justerar arbetet utifrån vad som fungerar.
						Ni får tydlig insyn i vilka innehållstyper som driver bäst effekt och hur nästa period ska prioriteras.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/social_publicering_analys.png" loading="lazy" alt="Publicering och analys i sociala medier"/>
					</div>
				</div>
			`,
		},
	];

	const socialTabs = [
		{
			id: "organisk",
			label: "ORGANISK NÄRVARO",
			title: "Bygg relationer och varumärke med relevant innehåll",
			items: [
				{
					id: "plan",
					title: "Planera innehåll med syfte",
					ingress: "Varje post ska ha en tydlig roll i helheten",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/social_innehall.png" alt="Planering av innehåll i sociala medier"/>
						</div>
						<p>
							Vi bygger en innehållsstruktur där varje format fyller en funktion: utbilda, inspirera,
							bevisa eller konvertera. Det gör närvaron mer konsekvent och lättare att utveckla över tid.
						</p>
					`,
				},
				{
					id: "tone",
					title: "Tonalitet och visuell riktning",
					ingress: "Skapa igenkänning i varje kanal",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/social_strategi.png" alt="Tonalitet och visuell strategi"/>
						</div>
						<p>
							Vi definierar tonalitet, visuella principer och innehållsmallar så att kommunikationen
							känns enhetlig. Resultatet blir starkare varumärkesigenkänning och tydligare positionering.
						</p>
					`,
				},
				{
					id: "engagement",
					title: "Engagemang som bygger förtroende",
					ingress: "Skapa dialog istället för envägskommunikation",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/social_publicering_analys.png" alt="Engagemang och community i sociala medier"/>
						</div>
						<p>
							Vi identifierar innehåll som skapar interaktion och bygger en närvaro som känns relevant
							och mänsklig. Det stärker relationen till målgruppen och förbättrar effekten i hela funneln.
						</p>
					`,
				},
			],
		},
		{
			id: "annonsering",
			label: "ANNONSERING",
			title: "Skala räckvidd och konvertering med datadriven Paid Social",
			items: [
				{
					id: "targeting",
					title: "Målgrupper och segmentering",
					ingress: "Nå rätt personer i rätt fas",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/social_strategi.png" alt="Målgrupper i paid social"/>
						</div>
						<p>
							Vi sätter upp målgrupper baserat på beteende, intressen och köpsignaler för att öka relevansen
							i varje annonsvisning och minska onödig spend.
						</p>
					`,
				},
				{
					id: "creative",
					title: "Kreativ testning",
					ingress: "Optimera budskap, format och erbjudande",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/social_innehall.png" alt="Kreativ testning för paid social"/>
						</div>
						<p>
							Vi testar kreativa koncept iterativt för att hitta vad som ger bäst resultat mot era mål.
							Testerna gör att kampanjerna förbättras systematiskt istället för slumpmässigt.
						</p>
					`,
				},
				{
					id: "roi",
					title: "Rapportering och skalning",
					ingress: "Skala det som faktiskt levererar",
					contentHtml: `
						<div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/social_publicering_analys.png" alt="Rapportering och skalning av sociala annonser"/>
						</div>
						<p>
							Vi följer upp resultat mot KPI:er och fördelar budget där avkastningen är starkast.
							På så sätt skapar vi ett arbetssätt som både är transparent och skalbart.
						</p>
					`,
				},
			],
		},
	];

	const centeredTextContent = {
		title: "Varför sociala medier som kanal?",
		body: `
			<p>Sociala medier är en av de starkaste kanalerna för att bygga relationer, skapa förtroende och hålla varumärket top of mind mellan köpbeslut.</p>
			<p class="mt-1">När innehåll, annonsering och analys kopplas ihop blir social media en mätbar kanal som stärker både varumärke och affär.</p>
		`,
	};

	const accordionItems: AccordionItem[] = [
		{
			title: "Vilka plattformar ska vi satsa på?",
			content:
				"<p>Det beror på målgrupp, erbjudande och mål. Vi hjälper er prioritera kanaler där sannolikheten för affärseffekt är högst, istället för att försöka vara överallt samtidigt.</p>",
			open: true,
		},
		{
			title: "Behöver vi annonsera eller räcker organiskt innehåll?",
			content:
				"<p>Organiskt innehåll bygger relation över tid, medan annonsering skapar snabbare räckvidd och konvertering. Ofta ger kombinationen bäst resultat.</p>",
		},
		{
			title: "Kan ni hjälpa till med både strategi och produktion?",
			content:
				"<p>Ja. Vi kan stötta med strategi, innehållsplan, copy, kampanjuppsättning, publicering och uppföljning i ett sammanhängande upplägg.</p>",
		},
		{
			title: "Hur mäter ni resultat i sociala medier?",
			content:
				"<p>Vi följer KPI:er utifrån era mål, exempelvis räckvidd, engagemang, leads, konverteringar och kostnad per resultat. Fokus ligger på verklig affärsnytta.</p>",
		},
		{
			title: "Hur ofta behöver vi publicera?",
			content:
				"<p>Frekvensen beror på kanal och målbild. Viktigast är konsekvens och kvalitet. Vi tar fram en publiceringstakt som är hållbar och effektiv för er verksamhet.</p>",
		},
	];
</script>

<Seo
	title="Sociala medier-tjänster | CreateWeb"
	description="Strategisk social media med innehåll, annonsering och löpande analys för att bygga varumärke, öka engagemang och driva konverteringar."
	path="/tjanster/marknadsforing/social-media"
	image="/images/tjanster/marknadsforing/social_strategi.png"
	keywords={[
		"social media",
		"sociala medier marknadsföring",
		"paid social",
		"innehållsstrategi",
		"createweb",
	]}
/>

<Header />

<Hero
	title={`Social media som bygger relation, räckvidd och <span class="highlight">resultat</span>.`}
	description="Vi hjälper er skapa en social närvaro som känns relevant för målgruppen och mätbar för verksamheten. Från innehållsstrategi till annonsering och kontinuerlig optimering."
	accordionItems={heroAccordionItems}
>
	<FlexContainer class="h-100 w-100 align-center justify-center">
		<div class="hero-image-container">
			<img
				src="/images/tjanster/marknadsforing/social_strategi.png"
				alt="Social media-strategi och innehåll"
			/>
		</div>
	</FlexContainer>
</Hero>

<SectionDivider borderTop borderBottom></SectionDivider>

<Section lines="XX-XX" borderBottom>
	<Column span={3}></Column>
	<Column span={6} class="py-2 py-xs-2">
		<p class="subheading text-accent text-center">SOCIAL MEDIA</p>
		<h2 class="text-center px-2">
			Från innehållsplan till löpande optimering
		</h2>
	</Column>
	<Column span={3}></Column>
</Section>

<HorizontalTabbedSection
	heading={`Tre delar som gör social media <br class="hide-mobile"/> till en affärskanal`}
	subheading="så bygger vi ert upplägg"
	tabs={socialServiceTabs}
/>

<SectionDivider borderTop borderBottom />
<TabbedSection type="double" groups={socialTabs} />
<CenteredText content={centeredTextContent} />

<FAQ
	{accordionItems}
	imageUrl="/images/tjanster/marknadsforing/faq_image.png"
	title="Frågor vi ofta får om sociala medier"
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
