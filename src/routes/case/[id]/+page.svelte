<!-- Case/case -->
<script lang="ts">
    import Header from '$components/Header.svelte'
    import Section from '$components/Section.svelte'
    import Column from '$components/Column.svelte'
    import Footer from '$components/Footer.svelte'
</script>

<Header/>
<Section style="height: calc(100vh - 4rem + 1px);" lines="XXXXX">
    <Column span={12}>
        <h1>Case</h1>
    </Column>
</Section>
<Footer/>