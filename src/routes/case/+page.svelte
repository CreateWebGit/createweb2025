<!-- Case -->
<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import Footer from "$components/layout/Footer.svelte";
	import Case from "$src/lib/sections/Case.svelte";
	import Seo from "$lib/components/Seo.svelte";
</script>

<Seo
	title="Case | CreateWeb"
	description="Utforska utvalda case och projekt från CreateWeb inom webbutveckling, digital strategi och långsiktiga resultat."
	path="/case"
	keywords={["case webbutveckling", "digitala projekt", "createweb"]}
/>
<Header />
<!-- <Section style="height: calc(100vh - 4rem + 1px);" lines="XXXXX">
    <Column span={12}>
        <h1>Case</h1>
    </Column>
</Section> -->
<Case />
<Footer />
