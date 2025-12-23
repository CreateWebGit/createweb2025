<!-- Tjänster/Markandsföring -->
<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import Footer from "$components/layout/Footer.svelte";

	import Hero from "$lib/sections/Hero.svelte";
	import TabbedSection from "$lib/sections/TabbedSection.svelte";
	import CenteredText from "$lib/sections/CenteredText.svelte";
	import HorizontalTabbedSection from "$lib/sections/HorizontalTabbedSection.svelte";
	import HorizontalScrollSection from "$lib/sections/HorizontalScrollSection.svelte";
	import FAQ from "$lib/sections/FAQ.svelte";
	import SectionDivider from "$components/layout/SectionDivider.svelte";

	//types
	import type { AccordionItem } from "$src/lib/models/accordion";
	import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";

	//content
	const heroAccordionItems: AccordionItem[] = [
		{
			title: "SEO",
			content:
				"<p>Förbättra organisk synlighet genom sökordsoptimering, kvalitetsinnehåll, teknisk prestanda och auktoritativa länkar.</p>",
			open: true,
		},
		{
			title: "SEM",
			content:
				"<p>Betald synlighet via sökannonser; relevanta sökord, optimerade landningssidor och budhantering.</p>",
		},
		{
			title: "Social Media",
			content:
				"<p>Bygg varumärke och öka konverteringar genom målgruppsanpassat innehåll, annonser och engagemang.</p>",
		},
	];

	const seoTabs = [
		{
			id: "seo",
			label: "SEO",
			title: "SEO som bygger trovärdighet, synlighet och stabil trafik",
			items: [
				{
					id: "what",
					title: "Vad är organisk SEO?",
					ingress: "Ranka naturligt i sökmotorerna",
					contentHtml: `
					    <div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_seo_1.png" alt="se seo 1"/>
						</div>
                        <p>
                            Organisk SEO handlar om att förbättra din webbplats så att den rankar naturligt i sökmotorerna. Utan betalda annonser. Det bygger på teknik, innehåll och struktur som hjälper Google att förstå vem du är, vad du erbjuder och varför just du är mest relevant för användaren. Resultatet blir långsiktig synlighet och stabil trafik.
                        </p>
                    `,
				},
				{
					id: "why",
					title: "Varför är organisk SEO viktigt?",
					ingress: "Investera i bestående resultat",
					contentHtml: `
					    <div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_seo_2.png" alt="se seo 2"/>
						</div>
                        <p>
                            Medan annonser ger snabb synlighet, ger organisk SEO bestående resultat. Det stärker varumärket, ökar trovärdigheten och leder till fler besökare över tid, helt utan att du behöver betala per klick. För företag är det en av de mest kostnadseffektiva investeringarna eftersom man bygger ett fundament som fortsätter arbeta dygnet runt.
                        </p>
                    `,
				},
				{
					id: "how",
					title: "Vad ingår i ett bra SEO-arbete?",
					ingress: "Optimering + innehåll + analys",
					contentHtml: `
					    <div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_seo_3.png" alt="se seo 3"/>
						</div>
                        <p>
                            Ett modernt SEO-arbete kombinerar teknisk optimering (prestanda, struktur, schema markup), strategiskt innehåll (artiklar, landningssidor, guider) och kontinuerlig analys (sökord, konkurrenter, beteendedata). Tillsammans skapar det en webbplats som är snabb, relevant och enkel för både användare och sökmotorer att förstå.
                        </p>
                    `,
				},
			],
		},
		{
			id: "sem",
			label: "SEM",
			title: "SEM som driver trafik, fångar intention och skapar resultat",
			items: [
				{
					id: "what",
					title: "Vad är SEM?",
					ingress: "Nå kunder snabbt med annonsering",
					contentHtml: `
					    <div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_sem_1.png" alt="se sem 1"/>
						</div>
                        <p>
                            SEM (Search Engine Marketing) innebär att du annonserar via sökmotorer <br/> främst Google Ads — för att snabbt nå kunder som aktivt söker efter dina tjänster. Genom att buda på specifika sökord visas dina annonser högst upp i sökresultatet, vilket ger omedelbar synlighet och mätbara resultat.
                        </p>
                    `,
				},
				{
					id: "why",
					title: "Varför är SEM viktigt?",
					ingress: "Snabb och kontrollerbar trafik",
					contentHtml: `
					    <div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_sem_2.png" alt="se sem 2"/>
						</div>
                        <p>
                            SEM ger snabb och kontrollerbar trafik. Du kan styra allt: budget, målgrupper, tider och geografiska områden. Det är ett effektivt sätt att testa nya erbjudanden, driva kampanjer eller fylla på försäljningen när du behöver mer synlighet direkt. Perfekt som komplement till ett långsiktigt SEO-arbete.
                        </p>
                    `,
				},
				{
					id: "how",
					title: "Vad ingår i ett bra SEM-arbete?",
					ingress:
						"Relevanta sökord, optimerade annonser, löpande analys",
					contentHtml: `
					    <div class="se-marketing-image-container">
							<img src="/images/tjanster/marknadsforing/se_sem_3.png" alt="se sem 3"/>
						</div>
                        <p>
                            Ett framgångsrikt SEM-arbete kräver relevanta sökord, välskrivna annonstexter, optimerade landningssidor och löpande analys. Genom att justera bud, annonstyper och målgrupper maximerar man både klickfrekvens och konverteringar — och säkerställer att varje spenderad krona ger tydlig effekt.
                        </p>
                    `,
				},
			],
		},
	];

	const centeredTextContent = {
		title: "SEO vs SEM - vad är skillnaden?",
		body: `
            <p>SEO bygger långsiktig synlighet genom att optimera din webbplats så att du rankar naturligt i sökresultaten. SEM ger snabb effekt genom betalda annonser som visas högst upp när användaren söker efter ditt erbjudande.</p>
            <p class="mt-1">Tillsammans skapar de en komplett strategi: SEO lägger grunden för stabil organisk trafik medan SEM ger direkt räckvidd när du behöver resultat snabbt.</p>
        `,
	};

	const socialMediaTabs = [
		{
			label: "Innehåll",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Innehåll</h4>
					<p class="mt-1 pr-2">
						Innehåll är grunden för all synlighet – utan relevant material försvinner man i bruset.
						Vi skapar genomtänkt, engagerande content som stärker varumärket, bygger relationer och driver
						fler att stanna, läsa och agera.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/social_innehall.png" loading="lazy" alt="Innehåll"/>
					</div>
				</div>
			`,
		},
		{
			label: "Strategi",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Strategi</h4>
					<p class="mt-1 pr-2">
						Utan en tydlig strategi blir sociala medier lätt spretigt och ineffektivt.
						Vi sätter mål, definierar tonalitet och väljer format som gör ert innehåll konsekvent,
						igenkännbart och relevant för rätt målgrupper – varje vecka.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/social_strategi.png" loading="lazy" alt="Strategi"/>
					</div>
				</div>
			`,
		},
		{
			label: "Publicering & Analys",
			content: `
				<div class="cw-col-6 cw-col-xs-12 pt-4">
					<h4>Publicering & Analys</h4>
					<p class="mt-1 pr-2">
						Timing och insikter avgör hur bra innehåll faktiskt presterar.
						Vi schemalägger och publicerar era inlägg, följer resultaten och visar vad som fungerar.
						Med kontinuerlig analys förbättras räckvidd, engagemang och affärer över tid.
					</p>
				</div>
				<div class="cw-col-6 cw-col-xs-12 right-column">
					<div class="image-container-horizontal-scroll-alt">
						<img src="/images/tjanster/marknadsforing/social_publicering_analys.png" loading="lazy" alt="Publicering och analys"/>
					</div>
				</div>
			`,
		},
	];

	const horizontalScrollTabs = [
		{
			id: "1",
			label: "Behovsanalys",
			leftHtml: "<h2>Hello</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: "2",
			label: "Strategi",
			leftHtml: "<h2>Hello</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: "3",
			label: "Effektmätning",
			leftHtml: "<h2>Hello</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: "4",
			label: "Action",
			leftHtml: "<h2>Hello</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: "5",
			label: "Underhåll",
			leftHtml: "<h2>Hello</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
	];

	//accordion content config
	const accordionItems: AccordionItem[] = [
		{
			title: "Vad menas med digital marknadsföring?",
			content:
				"<p>Digital marknadsföring omfattar alla marknadsföringsinsatser som sker via digitala kanaler, såsom webbplatser, sökmotorer, sociala medier och annonsering online. Syftet är att nå rätt målgrupp, vid rätt tillfälle, med relevant innehåll.</p>",
			open: true,
		},
		{
			title: "Vilken typ av marknadsföring passar bäst för mitt företag?",
			content:
				"<p>Det beror på målgrupp, bransch, konkurrens och affärsmål. Vissa verksamheter gynnas av långsiktig synlighet via innehåll och SEO, medan andra behöver snabbare resultat genom annonsering. Ofta är en kombination mest effektiv.</p>",
		},

		{
			title: "Vad är skillnaden mellan SEO och betald annonsering?",
			content:
				"<p>SEO handlar om att långsiktigt förbättra synligheten i sökresultat genom innehåll, struktur och teknik. Betald annonsering ger snabbare exponering men kräver löpande budget. Båda har sin plats och fungerar ofta bäst tillsammans.</p>",
		},
		{
			title: "Hur lång tid tar det innan man ser resultat?",
			content:
				"<p>Tidsramen varierar beroende på metod. Annonsering kan ge effekt direkt, medan SEO och innehållsbaserad marknadsföring ofta är långsiktiga investeringar där resultat byggs upp över tid.</p>",
		},
		{
			title: "Hjälper ni till med innehåll och budskap?",
			content:
				"<p>Ja. Vi hjälper till att formulera tydliga budskap som är anpassade efter målgrupp och kanal. Fokus ligger på att kommunicera värde på ett begripligt och trovärdigt sätt – inte på tomma marknadsföringsfraser.</p>",
		},
		{
			title: "Hur mäter ni om marknadsföringen fungerar?",
			content:
				"<p>Vi utgår från tydliga mål och följer upp relevanta nyckeltal, såsom trafik, engagemang, konverteringar eller förfrågningar. Det gör det lättare att se vad som fungerar och vad som kan förbättras.</p>",
		},
		{
			title: "Är marknadsföring något man gör tillfälligt eller löpande?",
			content:
				"<p>Marknadsföring fungerar bäst som en kontinuerlig process. Beteenden, konkurrens och kanaler förändras över tid, vilket gör det viktigt att arbeta långsiktigt och anpassa insatser efter nya förutsättningar.</p>",
		},
		{
			title: "Vad kostar digital marknadsföring?",
			content:
				"<p>Kostnaden beror på omfattning, kanaler och ambitionsnivå. Vi arbetar transparent och anpassar alltid upplägget efter verksamhetens behov och budget.</p>",
		},
		{
			title: "Hur ser ett samarbete ut?",
			content:
				"<p>Ett samarbete inleds vanligtvis med ett samtal där vi går igenom nuläge, mål och förväntningar. Därefter föreslår vi ett upplägg som är realistiskt, tydligt och anpassat efter verksamheten.</p>",
		},
	];
</script>

<Header />

<Hero
	title={`Analys, strategi, och action. Vi ger dig en <span class="highlight">komplett</span> marknadsföring.`}
	description="Vi bygger en marknadsföringsplan som är realistisk, mätbar och gör att ni faktiskt tar er till toppen. Mindre gissningar. Mer kunskap."
	accordionItems={heroAccordionItems}
>
	<FlexContainer class="h-100 w-100 align-center justify-center">
		<div class="hero-image-container">
			<img
				src="/images/tjanster/marknadsforing/hero_image.png"
				alt="Man som håller en surfplatta med en futuristisk 3D-overlay"
			/>
		</div>
	</FlexContainer>
</Hero>
<SectionDivider borderTop borderBottom></SectionDivider>

<Section lines="XX-XX" borderBottom>
	<Column span={3}></Column>
	<Column span={6} class="py-2 py-xs-2">
		<p class="subheading text-accent text-center">SÖKMOTORER</p>
		<h2 class="text-center px-2">
			Smartare sökstrategi för långsiktig tillväxt
		</h2>
	</Column>
	<Column span={3}></Column>
</Section>

<TabbedSection type="double" groups={seoTabs} />
<CenteredText content={centeredTextContent} />
<SectionDivider borderTop borderBottom />
<HorizontalTabbedSection
	heading={`en strategisk del av din <br class="hide-mobile"/> digitala närvaro`}
	subheading="sociala medier"
	tabs={socialMediaTabs}
/>

<!-- <HorizontalScrollSection
	heading="Test test"
	subheading="Testi testi test"
	tabs={horizontalScrollTabs}
/> -->

<FAQ
	{accordionItems}
	imageUrl="/images/tjanster/marknadsforing/faq_image.png"
	title="Frågor vi ofta får om marknadsföring"
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
