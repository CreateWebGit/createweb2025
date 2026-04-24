<!-- Tjänster -->
<script lang="ts">
    import Header from '$components/layout/Header.svelte'
    import Section from '$components/grid/Section.svelte'
    import Column from '$components/grid/Column.svelte'
    import Footer from '$components/layout/Footer.svelte'
    import Seo from '$lib/components/Seo.svelte'
</script>

<Seo
    title="Tjänster | CreateWeb"
    description="Översikt av CreateWebs tjänster inom webbutveckling, marknadsföring, konsultation och underhåll."
    path="/tjanster"
    keywords={['tjänster', 'webbutveckling', 'marknadsföring', 'createweb']}
    noindex={true}
/>
<Header/>
<Section style="height: calc(100vh - 4rem + 1px);" lines="XXXXX">
    <Column span={12}>
        <h1>Webbutveckling</h1>
    </Column>
</Section>
<Footer/>
