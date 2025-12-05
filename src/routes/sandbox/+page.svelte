<script lang="ts">
	import Header from "$src/lib/components/layout/Header.svelte";
	import TabbedSection from "$src/lib/sections/TabbedSection.svelte";
	import HorizontalTabbedSection from "$src/lib/sections/HorizontalTabbedSection.svelte";
	import HorizontalScrollSection from "$src/lib/sections/HorizontalScrollSection.svelte";
	import FAQ from "$src/lib/sections/FAQ.svelte";
	import Case from "$src/lib/sections/Case.svelte";

	import HorizontalScrollSectionAlt from "$src/lib/sections/HorizontalScrollSectionAlt.svelte";

	import type { AccordionItem } from "$src/lib/models/accordion";
	import Section from "$src/lib/components/grid/Section.svelte";
	import TwoColumnTextImage from "$src/lib/sections/TwoColumnTextImage.svelte";
	import TwoColumnTextImage2 from "$src/lib/sections/TwoColumnTextImage2.svelte";
	import BigAccordion from "$src/lib/sections/BigAccordion.svelte";

	import SectionDivider from '$components/layout/SectionDivider.svelte'

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

	//horizontal scroll section content config
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

	//double tabbed section
	const doubleTabbedSectionConfig = [
		{
			id: "seo",
			label: "SEO",
			items: [
				{
					id: "what",
					title: "Vad är organisk SEO?",
					ingress: "Lorem ipsum dolor sit amet.",
					contentHtml: `
                        <h2>seo what</h2>
                        <p>Här kan du lägga längre förklarande text om vad SEO är.</p>
                    `,
				},
				{
					id: "why",
					title: "Varför är organisk SEO viktigt?",
					ingress: "Lorem ipsum dolor sit amet.",
					contentHtml: `
                        <h2>seo why</h2>
                        <p>Varför SEO spelar roll för synlighet, trafik och leads.</p>
                    `,
				},
				{
					id: "how",
					title: "Vad ingår i ett bra SEO-arbete?",
					ingress: "Lorem ipsum dolor sit amet.",
					contentHtml: `
                        <h2>seo how</h2>
                        <p>Teknik, innehåll, länkar, analys – hela paketet.</p>
                    `,
				},
			],
		},
		{
			id: "sem",
			label: "SEM",
			items: [
				{
					id: "what",
					title: "Vad är SEM?",
					ingress: "Lorem ipsum dolor sit amet.",
					contentHtml: `
                        <h2>sem what</h2>
                        <p>Förklara sökannonser, auktionsmodellen och hur SEM skiljer sig från SEO.</p>
                    `,
				},
				{
					id: "why",
					title: "Varför är SEM viktigt?",
					ingress: "Lorem ipsum dolor sit amet.",
					contentHtml: `
                        <h2>sem why</h2>
                        <p>Snabb synlighet, kontroll över budget och mätbarhet.</p>
                    `,
				},
				{
					id: "how",
					title: "Vad ingår i ett bra SEM-arbete?",
					ingress: "Lorem ipsum dolor sit amet.",
					contentHtml: `
                        <h2>sem how</h2>
                        <p>Budstrategier, annonscopy, landningssidor, A/B-testning etc.</p>
                    `,
				},
			],
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
					title: "Vad är organisk SEO?",
					ingress: "Lorem ipsum dolor sit amet.",
					contentHtml: `<h2>seo what (single)</h2>`,
				},
				{
					id: "why",
					title: "Varför är organisk SEO viktigt?",
					ingress: "Lorem ipsum dolor sit amet.",
					contentHtml: `<h2>seo why (single)</h2>`,
				},
			],
		},
	];
</script>

<!-- SectionDivider.svelte -->
<Section class="mt-5">
	<p class="subheading force-lowercase">SectionDivider.svelte</p>
</Section>
<SectionDivider/>

<!-- HorizontalScrollSectionAlt.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase">HorizontalScrollSectionAlt.svelte</p>
</Section>
<HorizontalScrollSectionAlt
	heading="heheeh"
	subheading="hehe"
	tabs={horizontalScrollTabsAlt}
></HorizontalScrollSectionAlt>

<!-- BigAccordion.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase">BigAccordion.svelte</p>
</Section>
<BigAccordion heading="Hejhej" subheading="hehehehe" items={accordionItems} />

<!-- TabbedSection.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase cw-col-12">
		TabbedSection.svelte [type = single] – reversed
	</p>
</Section>
<TabbedSection reverse type="single" groups={singleTabbedSectionConfig} />

<!-- TabbedSection.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase cw-col-12">
		TabbedSection.svelte [type = double]
	</p>
</Section>
<TabbedSection type="double" groups={doubleTabbedSectionConfig} />

<!-- HorizontalTabbedSection.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase">HorizontalTabbedSection.svelte</p>
</Section>
<HorizontalTabbedSection
	heading="Test test"
	subheading="Test test"
	tabs={tabContent}
/>

<!-- TwoColumnTextImage.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase">TwoColumnTextImage.svelte</p>
</Section>
<TwoColumnTextImage />

<!-- TwoColumnTextImage2.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase">TwoColumnTextImage2.svelte</p>
</Section>
<TwoColumnTextImage2 reverse />

<!-- FAQ.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase">FAQ.svelte</p>
</Section>
<FAQ {accordionItems} />

<!-- Case.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase">Case.svelte</p>
</Section>
<Case />

<!-- HorizontalScrollSection.svelte -->
<Section class="mt-5" borderBottom>
	<p class="subheading force-lowercase">HorizontalScrollSection.svelte</p>
</Section>
<HorizontalScrollSection
	heading="Test test"
	subheading="Testi testi test"
	tabs={horizontalScrollTabs}
/>
