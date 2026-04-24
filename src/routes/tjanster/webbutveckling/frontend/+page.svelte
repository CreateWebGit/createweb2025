<!-- Tjänster/Webbutveckling/Frontend -->
<script lang="ts">
    import Header from '$components/layout/Header.svelte'
    import Section from '$components/grid/Section.svelte'
    import Column from '$components/grid/Column.svelte'
    import Footer from '$components/layout/Footer.svelte'
    import Seo from '$lib/components/Seo.svelte'
</script>

<Seo
    title="Frontendutveckling | CreateWeb"
    description="Frontend inom CreateWebs webbutvecklingstjänster."
    path="/tjanster/webbutveckling/frontend"
    noindex={true}
/>
<Header/>
<Section style="height: calc(100vh - 4rem + 1px);" lines="XXXXX">
    <Column span={12}>
        <h1>frontend :)</h1>
    </Column>
</Section>
<Footer/>
