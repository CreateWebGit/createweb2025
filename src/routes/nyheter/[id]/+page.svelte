<!-- Nyheter/Nyhet -->
<script lang="ts">
    import Header from '$components/layout/Header.svelte'
    import Section from '$components/grid/Section.svelte'
    import Column from '$src/lib/components/grid/Column.svelte'
    import Footer from '$components/layout/Footer.svelte'
    import Seo from '$lib/components/Seo.svelte'
    import { page } from '$app/state'
</script>

<Seo
    title="Nyhet | CreateWeb"
    description="Detaljsida för nyheter och uppdateringar från CreateWeb."
    path={page.url.pathname}
    keywords={['nyheter', 'createweb']}
    noindex={true}
/>
<Header/>
<Section style="height: calc(100vh - 4rem + 1px);" lines="XXXXX">
    <Column span={12}>
        <h1>nyheter / nyhet</h1>
    </Column>
</Section>
<Footer/>
