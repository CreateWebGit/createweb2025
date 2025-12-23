<!-- Om oss -->
<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Section from "$src/lib/components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";
	import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";
	import ColumnAccordion from "$src/lib/components/ColumnAccordion.svelte";
	import StripedContainer from "$src/lib/components/layout/StripedContainer.svelte";
	import SubgridContainer from "$src/lib/components/layout/SubgridContainer.svelte";
	import ColumnButton from "$src/lib/components/ColumnButton.svelte";
	import Footer from "$components/layout/Footer.svelte";
	import SectionDivider from "$src/lib/components/layout/SectionDivider.svelte";
	import CenteredText from "$src/lib/sections/CenteredText.svelte";
	import SimpleContact from "$src/lib/sections/SimpleContact.svelte";
	import { showBookingForm } from "$lib/stores/layoutStore";

	let CenteredTextContent = {
		title: "Vår filosofi",
		body: "<p>Digital utveckling ska kännas trygg. Du ska veta vad som byggs, varför det byggs och hur det kan utvecklas vidare. Med transparens, teknisk kompetens och ett lugnt arbetssätt hjälper vi dig att ta rätt digitala beslut.</p>",
	};
</script>

<Header />

<Section lines={"XXXXX"}>
	<Column class="d-flex flex-column pt-4 pb-2 pt-xs-2" span={6}>
		<div>
			<h1 class="subpage-hero-heading ml-1 pb-xs-2">
				Vi bygger webb som faktiskt <span class="highlight"
					>används</span
				>
			</h1>
			<p class="hero ml-1 mt-2 pr-4 pb-xs-4 hide-mobile hide-mobile">
				Vi skapar digitala lösningar som är byggda för att hålla – både
				tekniskt och affärsmässigt. Vår utgångspunkt är enkel: en
				webbplats eller applikation ska inte bara se bra ut, den ska
				fungera problemfritt, vara lätt att vidareutveckla och bidra
				till verkliga resultat.
			</p>
			<p class="hero ml-1 mt-2 pr-4 hide-mobile">
				Med gedigen erfarenhet inom modern webbutveckling hjälper vi
				företag och organisationer att omsätta idéer till stabila,
				användarvänliga och framtidssäkra digitala produkter. Oavsett om
				det handlar om en ny webbplats, en skräddarsydd webbaserad
				applikation eller vidareutveckling av ett befintligt system,
				arbetar vi alltid med kvalitet, struktur och långsiktighet i
				fokus.
			</p>
		</div>
	</Column>
	<Column class="pt-3 pb-6" span={6}>
		<StripedContainer class="aspect-ratio-1-1">
			<FlexContainer class="h-100 w-100 align-center justify-center">
				<div class="hero-image-container">
					<img
						src="/images/om-oss/om-oss-hero.jpg"
						alt="vårat team hard at work"
					/>
				</div>
			</FlexContainer>
		</StripedContainer>
		<p class="hero ml-1 mt-2 pr-10 hide-desktop">
			Vi skapar digitala lösningar som är byggda för att hålla – både
			tekniskt och affärsmässigt. Vår utgångspunkt är enkel: en webbplats
			eller applikation ska inte bara se bra ut, den ska fungera
			problemfritt, vara lätt att vidareutveckla och bidra till verkliga
			resultat.
		</p>
		<p class="hero ml-1 mt-2 pr-10 hide-desktop">
			Med gedigen erfarenhet inom modern webbutveckling hjälper vi företag
			och organisationer att omsätta idéer till stabila, användarvänliga
			och framtidssäkra digitala produkter. Oavsett om det handlar om en
			ny webbplats, en skräddarsydd webbaserad applikation eller
			vidareutveckling av ett befintligt system, arbetar vi alltid med
			kvalitet, struktur och långsiktighet i fokus.
		</p>
		<FlexContainer class="mt-4 flex-column-xs">
			<ColumnButton
				type="button"
				borderRight={false}
				buttonText="BOKA ETT MÖTE"
				onClick={() => ($showBookingForm = !$showBookingForm)}
			/>
			<ColumnButton
				type="link"
				href="../om-oss"
				buttonText="KONTAKTA OSS"
			/>
		</FlexContainer>
	</Column>
</Section>

<SectionDivider borderTop borderBottom />

<!-- vårt arbetssätt -->
<Section lines={"XXXXX"} class="py-4 py-xs-2" borderBottom>
	<Column span={6}>
		<SubgridContainer>
			<Column class="py-1 px-1 py-xs-1 px-xs-1" span={{ lg: 6, xs: 6 }}>
				<div class="image-container">
					<img src="/images/om-oss/cw_team_kaj.webp" alt="kaj" />
				</div>
				<h4 class="pt-1">Kaj Olason</h4>
				<p class="subheading">
					<a class="link-monospace" href="mailto:kaj@createweb.se"
						>kaj@createweb.se</a
					>
				</p>
			</Column>
			<Column class="py-1 px-1 py-xs-1 px-xs-1" span={{ lg: 6, xs: 6 }}>
				<div class="image-container">
					<img src="/images/om-oss/cw_team_emil.webp" alt="kaj" />
				</div>
				<h4 class="pt-1">Emil Avara</h4>
				<p class="subheading">
					<a class="link-monospace" href="mailto:emil@createweb.se"
						>emil@createweb.se</a
					>
				</p>
			</Column>
		</SubgridContainer>
	</Column>
	<Column span={6} class="px-1 px-xs-1 py-xs-1 pl-2 pt-4">
		<h2 class="mb-1">Vårt arbetssätt</h2>
		<p>
			Vi tror på tydlighet, dialog och genomtänkta lösningar. Varje
			uppdrag inleds med att förstå verksamheten, behoven och målen bakom
			projektet. Därefter tar vi fram en lösning som är tekniskt hållbar,
			skalbar och anpassad efter verklig användning.
		</p>

		<p class="mt-2">
			Vi arbetar med moderna ramverk och tekniker, men låter aldrig
			tekniken styra för teknikens skull. Val av lösning grundas alltid i
			vad som är mest ändamålsenligt för projektet – idag och imorgon.
		</p>
	</Column>
</Section>
<CenteredText content={CenteredTextContent} />

<SectionDivider borderTop borderBottom />
<SimpleContact />

<Footer />

<style lang="scss">
	:global(.hero-image-container) {
		height: 100%;
		width: 100%;
		// border: 1px solid var(--border-color);
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

	.image-container {
		aspect-ratio: 306 / 384;

		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
			border: 1px solid var(--border-color);
		}
	}
</style>
