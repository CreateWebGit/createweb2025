<!-- Tjänster/Konsultation -->
<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Footer from "$components/layout/Footer.svelte";
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";

	import Hero from "$lib/sections/Hero.svelte";
	import BigAccordion from "$src/lib/sections/BigAccordion.svelte";
	import HorizontalScrollSection from "$src/lib/sections/HorizontalScrollSection.svelte";
	import HorizontalTabbedSection from "$src/lib/sections/HorizontalTabbedSection.svelte";
	import TabbedSection from "$src/lib/sections/TabbedSection.svelte";

	import type { AccordionItem } from "$src/lib/models/accordion";

	const ReadmoreAccordionItems: AccordionItem[] = [
		{
			title: "Frontend",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
			open: true,
		},
		{
			title: "Backend",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
		{
			title: "Prestanda",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
	];

	//accordion content config
	const accordionItems: AccordionItem[] = [
		{
			title: "Lorem ipsum",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
			open: true,
		},
		{
			title: "Dolor sit amet",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
		{
			title: "Amet blandit porta",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
		{
			title: "Dolor sit amet",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
		{
			title: "Lorem ipsum",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
		{
			title: "Amet blandit porta",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
		{
			title: "Dolor sit amet",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
		{
			title: "Lorem ipsum",
			content:
				"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>",
		},
	];

	//horizontal scroll section content config
	const horizontalScrollTabs = [
		{
			id: "1",
			label: "Overview",
			leftHtml: "<h2>Hello</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: "2",
			label: "Test 2",
			leftHtml: "<h2>Hello</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: "3",
			label: "Test 3",
			leftHtml: "<h2>Hello</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: "4",
			label: "Test 4",
			leftHtml: "<h2>Hello</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
	];

	//single tabbed section
	const singleTabbedSectionConfig = [
		{
			id: "seo",
			label: "SEO",
			items: [
				{
					id: "what",
					title: "Start ups",
					ingress: "",
					contentHtml: `<h2>seo what (single)</h2>`,
				},
				{
					id: "why",
					title: "Hjälp organisation",
					ingress: "Lorem ipsum dolor sit amet.",
					contentHtml: `<h2>seo why (single)</h2>`,
				},
			],
		},
	];

	//horizontal tabbed section content config
	const tabContent = [
		{
			label: "tab 1",
			content: `<h3>hehehe tab 1</h3><p>hejsan hejsan</p>`,
		},
		{
			label: "tab 2",
			content: `<h3>hehehe tab 2</h3><p>hejsan hejsan</p>`,
		},
		{
			label: "tab 3",
			content: `<h3>hehehe tab 3</h3><p>hejsan hejsan</p>`,
		},
	];
</script>

<Header />
<Hero
	title={`Erfaren <span class="highlight">förstärkning</span> till ert team – snabbt, tryggt och flexibelt.`}
	description="Ni får tillgång till erfarna utvecklare och designers som går in i ert team, tar ansvar från dag ett och levererar utan handhållning. Flexibla avtal, tydlig kostnad och inga överraskningar."
	accordionItems={ReadmoreAccordionItems}
/>

<BigAccordion
	heading="SÅHÄR JOBBAR VI"
	subheading="SÅ HÄR ARBETAR VI TILLSAMMANS"
	items={accordionItems}
/>

<HorizontalScrollSection
	heading="Test test"
	subheading="Testi testi test"
	tabs={horizontalScrollTabs}
/>
<Section lines="XX-XX" class="mt-5" borderBottom borderTop>
	<Column span={3}></Column>
	<Column span={6} class="py-2">
		<p class="subheading text-accent text-center">haha</p>
		<h2 class="text-center">tidigare uppdrag <br /> & erfarenhet</h2>
	</Column>
	<Column span={3} class="monochrome-striped-background"></Column>
</Section>
<TabbedSection type="single" groups={singleTabbedSectionConfig} reverse />
<HorizontalTabbedSection
	heading="SÅHÄR JOBBAR VI"
	subheading="SÅ HÄR ARBETAR VI TILLSAMMANS"
	tabs={tabContent}
/>
<Footer />
