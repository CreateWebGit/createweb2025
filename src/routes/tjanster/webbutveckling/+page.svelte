<!-- Tjänster/Webbutveckling -->
<script lang="ts">
	//grid
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";

	//layout
	import Header from "$components/layout/Header.svelte";
	import Footer from "$components/layout/Footer.svelte";
	import SectionDivider from "$src/lib/components/layout/SectionDivider.svelte";
	import Offerings from "./sections/Offerings.svelte";
	import Case from "$lib/sections/Case.svelte";
	import LightTabbedSection from "$src/lib/sections/LightTabbedSection.svelte";
	import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";

	//sections
	// import Hero from './sections/Hero.svelte';
	// import StackThree from './sections/StackThree.svelte';
	// import Offerings from './sections/Offerings.svelte';
	// import Approach from './sections/Approach.svelte';
	// import Case from '$src/lib/sections/Case.svelte';
	import FAQ from "$src/lib/sections/FAQ.svelte";

	import Hero from "$lib/sections/Hero.svelte";
	import ThreeColumn from "$src/lib/sections/ThreeColumn.svelte";

	//types
	import type { AccordionItem } from "$src/lib/models/accordion";

	const heroAccordionItems: AccordionItem[] = [
		{
			title: "Frontend",
			content:
				"<p>Vi bygger snabba, moderna gränssnitt som känns direkt och skapar en friktionsfri upplevelse.</p>",
			open: true,
		},
		{
			title: "Backend",
			content:
				"<p>Stabil, skalbar backend som hanterar logik, data och trafik utan att tappa fart.</p>",
		},
		{
			title: "Prestanda",
			content:
				"<p>Vi optimerar varje millisekund för snabbare laddning, bättre SEO och nöjdare användare.</p>",
		},
	];

	const lightTabs = [
		{
			id: 0,
			label: "Planera",
			leftHtml:
				"<h3>Planera – Grunden för framgång</h3><p class='pt-1'>Varje framgångsrikt projekt börjar med en solid strategi. Vi sätter oss ner med dig för att förstå ditt företag, dina mål och din målgrupp. <br/><br/> Genom brainstorming, research och konkurrensanalys skapar vi en tydlig plan för din digitala närvaro. Här definierar vi projektets omfattning, funktioner och tekniska krav. Allt för att säkerställa att vi bygger något som verkligen gör skillnad.</p>",
			rightHtml:
				"<div class='light-tabbed-section-image-container'><img src='/images/cw_generic_developers.png'/ alt=''></div>",
		},
		{
			id: 1,
			label: "Skissa",
			leftHtml:
				"<h3>Skissa – Från idé till design</h3><p class='pt-1'>När planen är på plats börjar vi visualisera din lösning. Vi skapar wireframes och designskisser som visar hur din webbplats eller digitala produkt kommer att se ut och fungera. <br/><br/> Här fokuserar vi på användarupplevelse, varumärkesidentitet och konverteringsoptimering. Vi arbetar tätt med dig för att finslipa detaljerna och säkerställa att designen inte bara är estetiskt tilltalande, utan också strategiskt genomtänkt.</p>",
			rightHtml:
				"<div class='light-tabbed-section-image-container'><img src='/images/cw_generic_developers.png'/ alt=''></div>",
		},
		{
			id: 2,
			label: "Utveckla",
			leftHtml:
				"<h3>Utveckla – Bygga, med precision</h3><p class='pt-1'>Med designen godkänd tar våra utvecklare över och förvandlar skisserna till en fullt fungerande webbplats eller applikation. Vi använder moderna teknologier och best practices för att skapa en snabb, säker och skalbar lösning. <br/><br/> Under hela utvecklingsfasen testar vi kontinuerligt för att garantera att allt fungerar felfritt på olika enheter och webbläsare.</p>",
			rightHtml:
				"<div class='light-tabbed-section-image-container'><img src='/images/cw_generic_developers.png'/ alt=''></div>",
		},
		{
			id: 3,
			label: "Leverera",
			leftHtml:
				"<h3>Leverera – Lansering och vidareutveckling</h3><p class='pt-1'>När allt är testat och kvalitetssäkrat är det dags att lansera. Vi hanterar allt från hosting och säkerhet till SEO-optimering och prestandajusteringar för att ge din webbplats bästa möjliga start. <br/> <br/>Men vi nöjer oss inte där – vi erbjuder även support, uppdateringar och vidareutveckling så att din digitala närvaro kan växa och anpassas efter dina framtida behov.</p>",
			rightHtml:
				"<div class='light-tabbed-section-image-container'><img src='/images/cw_generic_developers.png'/ alt=''></div>",
		},
	];

	//accordion content config
	const faqAccordionItems: AccordionItem[] = [
		{
			title: "Vad menas egentligen med webbutveckling?",
			content:
				"<p>Webbutveckling handlar om att bygga och vidareutveckla webbplatser och webbaserade applikationer som är snabba, säkra och enkla att använda. Det kan röra sig om allt från informationssidor till mer avancerade system med inloggning, formulär, integrationer och databaser.</p>",
			open: true,
		},
		{
			title: "Bygger ni webbplatser från färdiga mallar eller skräddarsytt?",
			content:
				"<p>Vi arbetar främst med skräddarsydd webbutveckling där lösningen anpassas efter verksamhetens behov. I vissa fall kan färdiga komponenter användas som grund, men strukturen och funktionaliteten byggs alltid med långsiktig hållbarhet i fokus.</p>",
		},
		{
			title: "Vilka tekniker arbetar ni med?",
			content:
				"<p>Vi arbetar med moderna webbtekniker som React, Next.js, TypeScript och headless-lösningar. Val av teknik baseras alltid på projektets krav – inte trender – för att säkerställa stabilitet, prestanda och framtida flexibilitet.</p>",
		},
		{
			title: "Hur lång tid tar det att bygga en webbplats?",
			content:
				"<p>Tidsåtgången beror på projektets omfattning och komplexitet. En enklare webbplats kan ta några veckor medan mer avancerade lösningar kräver längre utvecklingstid. Efter ett första samtal kan vi ge en tydlig uppskattning.</p>",
		},
		{
			title: "Hjälper ni till med struktur, innehåll och användarflöden?",
			content:
				"<p>Ja. Vi hjälper gärna till att strukturera innehåll, användarflöden och navigation så att webbplatsen blir logisk och lätt att använda. Fokus ligger på användarupplevelse och tydlig kommunikation – både för besökare och sökmotorer.</p>",
		},
		{
			title: "Vad kostar webbutveckling?",
			content:
				"<p>Priset beror på projektets omfattning, funktionalitet och tidsåtgång. Vi arbetar transparent och ger alltid en tydlig offert eller uppskattning innan projektstart.</p>",
		},
		{
			title: "Hur går ett samarbete till?",
			content:
				"<p>Ett samarbete inleds oftast med ett förutsättningslöst samtal där vi går igenom behov, mål och förväntningar. Därefter föreslår vi en teknisk lösning och ett upplägg som passar just er verksamhet.</p>",
		},
	];
</script>

<Header />

<Hero
	title={`Vi bygger en webb du vill komma <span class="highlight">tillbaka</span> till.`}
	description="Från första klicket till sista raden kod – vi utvecklar hemsidor och webbappar som känns lika bra som de ser ut. Snabba, snygga och skräddarsydda."
	accordionItems={heroAccordionItems}
>
	<FlexContainer class="h-100 w-100 align-center justify-center">
		<div class="hero-image-container">
			<img
				src="/images/tjanster/webbutveckling/webdev.jpg"
				alt="webbutveckling"
			/>
		</div>
	</FlexContainer>
</Hero>
<SectionDivider borderBottom borderTop />
<Offerings />
<ThreeColumn />
<SectionDivider borderTop borderBottom></SectionDivider>
<LightTabbedSection
	subheading="hur vi jobbar"
	heading="Våran approach"
	tabs={lightTabs}
/>
<Case hasBorderBottom />
<FAQ
	accordionItems={faqAccordionItems}
	title="Frågor vi ofta får om webbutveckling"
/>

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
</style>
