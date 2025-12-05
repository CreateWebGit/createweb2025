<!-- Tjänster/Underhåll & Support -->
<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Footer from "$components/layout/Footer.svelte";
	import Section from "$src/lib/components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";

	import Hero from "$lib/sections/Hero.svelte";
	import HorizontalScrollSectionAlt from "$src/lib/sections/HorizontalScrollSectionAlt.svelte";
	import SectionDivider from "$src/lib/components/layout/SectionDivider.svelte";
	import TwoColumnTextImage from "$src/lib/sections/TwoColumnTextImage.svelte";
	import TabbedSection from "$src/lib/sections/TabbedSection.svelte";

	//types
	import type { AccordionItem } from "$src/lib/models/accordion";

	//content
	const heroAccordionItems: AccordionItem[] = [
		{
			title: "24/7",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
			open: true,
		},
		{
			title: "Hosting",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
		{
			title: "Vidareutveckling",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
	];

	const horizontalScrollTabsAlt = [
		{
			id: "1",
			label: "Säkerhetsuppdateringar",
			content: "<h2>Hello 1</h2><p>World.</p>",
		},
		{
			id: "2",
			label: "Prestandaoptimeringar",
			content: "<h2>Hello 2</h2><p>World.</p>",
		},
		{
			id: "3",
			label: "Övervakning",
			content: "<h2>Hello 3</h2><p>World.</p>",
		},
		{
			id: "4",
			label: "Löpande förbättringar",
			content: "<h2>Hello 4</h2><p>World.</p>",
		},
		{
			id: "5",
			label: "Backup & Restore",
			content: "<h2>Hello 5</h2><p>World.</p>",
		},
		{
			id: "6",
			label: "Support",
			content: "<h2>Hello 6</h2><p>World.</p>",
		},
	];

	const whyUsTabs = [
		{
			id: "seo",
			label: "SEO",
			items: [
				{
					id: "support",
					title: "Snabb support",
					ingress: "Ranka naturligt i sökmotorerna",
					contentHtml: `
					    <div class="image-container">
						</div>
                        <p>
                            Organisk SEO handlar om att förbättra din webbplats så att den rankar naturligt i sökmotorerna. Utan betalda annonser. Det bygger på teknik, innehåll och struktur som hjälper Google att förstå vem du är, vad du erbjuder och varför just du är mest relevant för användaren. Resultatet blir långsiktig synlighet och stabil trafik.
                        </p>
                    `,
				},
				{
					id: "övervakning",
					title: "Proaktiv övervakning",
					ingress: "Investera i bestående resultat",
					contentHtml: `
					    <div class="image-container">
						</div>
                        <p>
                            Medan annonser ger snabb synlighet, ger organisk SEO bestående resultat. Det stärker varumärket, ökar trovärdigheten och leder till fler besökare över tid, helt utan att du behöver betala per klick. För företag är det en av de mest kostnadseffektiva investeringarna eftersom man bygger ett fundament som fortsätter arbeta dygnet runt.
                        </p>
                    `,
				},
				{
					id: "senior",
					title: "Senior kompetens",
					ingress: "Optimering + innehåll + analys",
					contentHtml: `
					    <div class="image-container">
						</div>
                        <p>
                            Ett modernt SEO-arbete kombinerar teknisk optimering (prestanda, struktur, schema markup), strategiskt innehåll (artiklar, landningssidor, guider) och kontinuerlig analys (sökord, konkurrenter, beteendedata). Tillsammans skapar det en webbplats som är snabb, relevant och enkel för både användare och sökmotorer att förstå.
                        </p>
                    `,
				},
				{
					id: "tech",
					title: "Modern tech-stack",
					ingress: "Optimering + innehåll + analys",
					contentHtml: `
					    <div class="image-container">
						</div>
                        <p>
                            Ett modernt SEO-arbete kombinerar teknisk optimering (prestanda, struktur, schema markup), strategiskt innehåll (artiklar, landningssidor, guider) och kontinuerlig analys (sökord, konkurrenter, beteendedata). Tillsammans skapar det en webbplats som är snabb, relevant och enkel för både användare och sökmotorer att förstå.
                        </p>
                    `,
				},
				{
					id: "stability",
					title: "Trygghet & stabilitet",
					ingress: "Optimering + innehåll + analys",
					contentHtml: `
					    <div class="image-container">
						</div>
                        <p>
                            Ett modernt SEO-arbete kombinerar teknisk optimering (prestanda, struktur, schema markup), strategiskt innehåll (artiklar, landningssidor, guider) och kontinuerlig analys (sökord, konkurrenter, beteendedata). Tillsammans skapar det en webbplats som är snabb, relevant och enkel för både användare och sökmotorer att förstå.
                        </p>
                    `,
				},
			],
		},
	];
</script>

<Header />
<Hero
	title={`Vi ser, hör och <span class="highlight">löser</span> det ni inte ens märkt än.`}
	description="Med kontinuerligt underhåll får ni stabilitet, trygghet och en sajt som faktiskt håller jämna steg med verksamheten. Vi ser till att allt rullar, utan driftstopp, säkerhetsproblem eller plötsliga överraskningar."
	accordionItems={heroAccordionItems}
/>
<SectionDivider borderBottom />
<HorizontalScrollSectionAlt
	subheading="vad vi erbjuder"
	heading="vi håller koll på allt"
	tabs={horizontalScrollTabsAlt}
></HorizontalScrollSectionAlt>
<TwoColumnTextImage
	heading={'En webbplats är aldrig "klar". <br/> Den ska fungera, och utvecklas.'}
	subheading={"Varför underhåll spelar roll"}
	body={`De flesta företag låter webbplatsen samla damm tills något går sönder.
	Det är som att först serva bilen när motorn redan brinner.

	Med kontinuerligt underhåll får ni stabilitet, trygghet och en sajt som faktiskt håller jämna steg med verksamheten. Vi ser till att allt rullar, utan driftstopp, säkerhetsproblem eller plötsliga överraskningar.`}
	imageUrl="/images/cw_generic_developers.png"
/>

<SectionDivider borderBottom />
<Section lines="XX-XX" borderBottom>
	<Column span={3}></Column>
	<Column span={6} class="py-2">
		<p class="subheading text-accent text-center">varför välja oss</p>
		<h2 class="text-center px-1">
			Engagemang som större byråer glömt bort
		</h2>
	</Column>
	<Column span={3}></Column>
</Section>
<TabbedSection type={"single"} groups={whyUsTabs} reverse />
<Footer />
