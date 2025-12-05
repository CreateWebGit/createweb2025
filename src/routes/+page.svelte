<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Section from "$components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";
	import Footer from "$components/layout/Footer.svelte";
	import Breadcrumbs from "$components/Breadcrumbs.svelte";
	import HeroComputer from "$src/lib/components/HeroComputer.svelte";
	import Case from "$src/lib/sections/Case.svelte";
	import FAQ from "$src/lib/sections/FAQ.svelte";
	import TwoColAccordion from "$lib/sections/TwoColAccordion.svelte";
	import SectionDivider from "$components/layout/SectionDivider.svelte";
	import ColumnButton from "$src/lib/components/ColumnButton.svelte";

	import type { AccordionItem } from "$src/lib/models/accordion";

	//accordion content config
	const accordionItems: AccordionItem[] = [
		{
			title: "Vad erbjuder ni för typ av webbutveckling?",
			content:
				"<p>Vi arbetar med allt från kompletta webbplatser och skräddarsydda system till löpande optimering, UI/UX och teknisk rådgivning.</p>",
			open: true,
		},
		{
			title: "Hur fungerar det att anlita er som konsult?",
			content:
				"<p>Vi jobbar agilt, transparent och kan ansluta i både korta och långa uppdrag – antingen som förstärkning eller ansvarig utvecklare.</p>",
		},
		{
			title: "Vilka tekniker jobbar ni med?",
			content:
				"<p>Vi är specialiserade på moderna JavaScript-ramverk som React, Next.js och Node.js – men jobbar även brett i övriga webbstackar.</p>",
		},
		{
			title: "Vad kostar era tjänster?",
			content:
				"<p>Priset varierar beroende på omfattning och typ av projekt – kontakta oss för en offert eller timarvode.</p>",
		},
		{
			title: "Arbetar ni med företag i hela Sverige?",
			content:
				"<p>Ja, tack vare digitala verktyg kan vi arbeta med kunder oavsett ort.</p>",
		},
		{
			title: "Erbjuder ni support och vidareutveckling efter leverans?",
			content:
				"<p>Ja, vi erbjuder löpande support, förbättringar, och teknisk drift om så önskas.</p>",
		},
	];

	//what we do accordion items
	const whatWeDoItems: AccordionItem[] = [
		{
			title: "Webbutveckling",
			content:
				"<p>Förbättra organisk synlighet genom sökordsoptimering, kvalitetsinnehåll, teknisk prestanda och auktoritativa länkar.</p>",
			open: true,
		},
		{
			title: "Marknadsföring",
			content:
				"<p>Betald synlighet via sökannonser; relevanta sökord, optimerade landningssidor och budhantering.</p>",
		},
		{
			title: "Underhåll & Support",
			content:
				"<p>Bygg varumärke och öka konverteringar genom målgruppsanpassat innehåll, annonser och engagemang.</p>",
		},
	];

	let imageUrl = "/images/first_page/ScreenVS.svg";
</script>

<Header />
<Section sectionLayoutClass="cw-section-hero" class="pt-4" lines="XXXXX">
	<Column span={6} class="pt-4 d-flex flex-column justify-between">
		<div>
			<h1 class="pl-1 lowercase">
				Vi skapar <span class="highlight">oförglömliga</span> digitala upplevelser
			</h1>
			<p class="pl-1 hero mt-2">
				Vi är en Stockholm-baserad digitalbyrå mer flera år <br /> av
				erfarenhet av att skapa banbrytande applikationer <br /> och webbplatser.
			</p>
		</div>
		<div class="mb-6">
			<ColumnButton type="link" buttonText="BOKA ETT 20-MIN MÖTE" />
			<ColumnButton
				type="link"
				borderTop={false}
				buttonText="SE VÅRA TJÄNSTER"
			/>
		</div>
	</Column>
	<Column span={6}>
		<HeroComputer />
	</Column>
	<video src="/videos/cw_shadergradient_video.mp4" autoplay muted loop
	></video>
</Section>
<SectionDivider borderTop borderBottom></SectionDivider>
<TwoColAccordion accordionItems={whatWeDoItems} />
<Case />
<SectionDivider borderTop borderBottom></SectionDivider>
<FAQ {accordionItems} {imageUrl} />
<Footer />
