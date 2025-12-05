<script lang="ts">
    import Section from "$src/lib/components/grid/Section.svelte";
    import Column from "$src/lib/components/grid/Column.svelte";
</script>

<Section>
    <Column span={12} class="pt-4 pb-10">
        <p class="subheading text-center text-accent">våran stack</p>
        <h2 class="text-center">Stacksnack</h2>
    </Column>
    <Column span={4} class="stack-column pt-4 pb-10">
        <p class="subheading text-center text-accent">Frontend</p>
        <div class="stack-icon-container"></div>
    
        <h3 class="text-center">Svelte</h3>
        <p class="text-center">Sed consectetur diam sit amet blandit porta. Cras eleifend ante eget mauris volutpat tincidunt. Suspendisse </p>
    </Column>
    <Column span={4} class="stack-column pt-4 pb-10">
        <p class="subheading text-center text-accent">Backend</p>
        <div class="stack-icon-container"></div>

        <h3 class="text-center">Node + MongoDB</h3>
        <p class="text-center">Sed consectetur diam sit amet blandit porta. Cras eleifend ante eget mauris volutpat tincidunt. Suspendisse </p>
    </Column>
    <Column span={4} class="stack-column pt-4 pb-10">
        <p class="subheading text-center text-accent">CMS</p>
        <div class="stack-icon-container"></div>
        
        <h3 class="text-center">PayloadCMS</h3>
        <p class="text-center">Sed consectetur diam sit amet blandit porta. Cras eleifend ante eget mauris volutpat tincidunt. Suspendisse </p>
    </Column>
</Section>

<style lang="scss">
    :global(.stack-column) {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        h3 {
            margin-top: 2rem;
        }

        p {
            width: 80%;
        }

        .stack-icon-container {
            height: 8rem;
            width: 8rem;
            border: 1px solid var(--border-color);
            background-color: #171717;
        }
    }
</style>