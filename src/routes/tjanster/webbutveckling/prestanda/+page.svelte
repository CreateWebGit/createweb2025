<!-- Tjänster/Webbutveckling/Prestanda -->
<script lang="ts">
    import Header from '$components/layout/Header.svelte'
    import Section from '$components/grid/Section.svelte'
    import Column from '$src/lib/components/grid/Column.svelte'
    import Footer from '$components/layout/Footer.svelte'
    import Seo from '$lib/components/Seo.svelte'
</script>

<Seo
    title="Prestandaoptimering | CreateWeb"
    description="Prestanda inom CreateWebs webbutvecklingstjänster."
    path="/tjanster/webbutveckling/prestanda"
    noindex={true}
/>
<Header/>
<Section style="height: calc(100vh - 4rem + 1px);" lines="XXXXX">
    <Column span={12}>
        <h1>prestanda :)</h1>
    </Column>
</Section>
<Footer/>
