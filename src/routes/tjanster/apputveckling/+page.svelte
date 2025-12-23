<!-- Tjänster/Apputveckling -->
<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Section from "$components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";
	import Footer from "$components/layout/Footer.svelte";
	import LightTabbedSection from "$src/lib/sections/LightTabbedSection.svelte";
	import HeroComputerv2 from "$src/lib/components/HeroComputerv2.svelte";

	//horizontal scroll section content config
	const lightScrollTabs = [
		{
			id: 0,
			label: "Overview",
			leftHtml: "<h2>Override stuff</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: 1,
			label: "Test 2",
			leftHtml: "<h2>Hello 2</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: 2,
			label: "Test 3",
			leftHtml: "<h2>Hello 3</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: 3,
			label: "Test 4",
			leftHtml: "<h2>Hello 4</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
	];
</script>

<!-- 
<Header />
<Section style="height: 100vh" lines="XXXXX">
	<Column span={12}>
	</Column>
</Section>
<Footer /> -->

<!-- <LightTabbedSection tabs={lightScrollTabs} /> -->

<HeroComputerv2 />
