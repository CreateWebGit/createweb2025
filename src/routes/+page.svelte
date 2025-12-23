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
	import { showBookingForm } from "$lib/stores/layoutStore";

	import type { AccordionItem } from "$src/lib/models/accordion";
	import { onMount } from "svelte";
	import HeroComputerv2 from "$src/lib/components/HeroComputerv2.svelte";

	//faq
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
				"<p class='mb-1'>Vi hjälper dig skapa en snabb och modern webbplats som stärker ditt varumärke, levererar en smidig upplevelse och driver fler affärer online.</p> <a class='link-body' href='/tjanster/webbutveckling'>Se vad vi kan hjälpa till med -></a>",
			open: true,
		},
		{
			title: "Marknadsföring",
			content:
				"<p class='mb-1'>Vi hjälper dig nå rätt målgrupp med smart, datadriven marknadsföring som ökar synligheten, bygger förtroende och ger verkliga resultat.</p> <a class='link-body' href='/tjanster/marknadsforing'>Se hur vi kan hjälpa er -></a>",
		},
		{
			title: "Underhåll & Support",
			content:
				"<p class='mb-1'>Vi hjälper dig hålla din webbplats säker, uppdaterad och stabil genom löpande underhåll, proaktiv support och kontinuerliga förbättringar.</p> <a class='link-body' href='/tjanster/underhall-support'>Läs mer -></a>",
		},
	];

	let imageUrl = "/images/first_page/ScreenVS.svg";
</script>

<Header />
<Section sectionLayoutClass="cw-section-hero" class="pt-4" lines="XXXXX">
	<Column span={6} class="pt-4 d-flex flex-column justify-between">
		<div>
			<h1 class="pl-1 lowercase px-xs-1 py-xs-1">
				Vi skapar <span class="highlight">oförglömliga</span> digitala upplevelser
			</h1>
			<p class="pl-1 hero mt-2 hide-mobile">
				Vi är en Stockholm-baserad digitalbyrå mer flera år <br /> av
				erfarenhet av att skapa banbrytande applikationer <br /> och webbplatser.
			</p>
		</div>
		<div class="mb-6 hide-mobile">
			<ColumnButton
				type="button"
				buttonText="BOKA ETT 20-MIN MÖTE"
				onClick={() => ($showBookingForm = !$showBookingForm)}
			/>
			<ColumnButton
				type="link"
				href="om-oss"
				borderTop={false}
				buttonText="KONTAKTA OSS"
			/>
		</div>
	</Column>
	<Column span={6} class="d-flex flex-column justify-end pb-5">
		<HeroComputerv2 />
		<p class="pl-1 px-xs-1 hero mt-2 hide-desktop">
			Vi är en Stockholm-baserad digitalbyrå mer flera år <br /> av
			erfarenhet av att skapa banbrytande applikationer <br /> och webbplatser.
		</p>
		<div class="pt-xs-4 hide-desktop">
			<ColumnButton
				type="button"
				buttonText="BOKA ETT 20-MIN MÖTE"
				onClick={() => ($showBookingForm = !$showBookingForm)}
			/>
			<ColumnButton
				type="link"
				href="om-oss"
				borderTop={false}
				buttonText="KONTAKTA OSS"
			/>
		</div>
	</Column>
	<video
		src="/videos/cw_shadergradient_video.mp4"
		autoplay
		muted
		loop
		playsinline
	></video>
</Section>
<SectionDivider borderTop borderBottom></SectionDivider>
<TwoColAccordion accordionItems={whatWeDoItems} />
<Case />
<SectionDivider borderTop borderBottom></SectionDivider>
<FAQ {accordionItems} {imageUrl} />
<Footer />
