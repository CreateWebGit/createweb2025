<script lang="ts">
    import Section from "$src/lib/components/grid/Section.svelte";
    import Column from "$src/lib/components/grid/Column.svelte";
    import SubgridContainer from "$src/lib/components/layout/SubgridContainer.svelte";
</script>

<Section> 
    <Column start={2} end={12} class="pt-4 pb-2">
        <p class="subheading text-center text-accent">Sit amet consectur</p>
        <h2 class="text-center">Lorem ipsum dolor</h2>
    </Column>
    <Column start={2} end={12} class="pt-2 pb-4">
        <SubgridContainer class="gap-4">
            <Column span={6}>
                
            </Column>
            <Column span={6} class="d-flex flex-column gap-4">
                <div>
                    <h4>Exklusiva hemsidor</h4>
                    <p class="mt-1">Sed consectetur diam sit amet blandit porta. Cras eleifend ante eget mauris volutpat tincidunt. Suspendisse Vitae purus et nunc interdum convallis in iaculis augue. Morbi porta hendrerit quam</p>
                </div>
                <div>
                    <h4>WEBBAPPAR & SYSTEM</h4>
                    <p class="mt-1">Sed consectetur diam sit amet blandit porta. Cras eleifend ante eget mauris volutpat tincidunt. Suspendisse Vitae purus et nunc interdum convallis in iaculis augue. Morbi porta hendrerit quam</p>
                </div>
                <div>
                    <h4>E-HANDELSLÖSNINGAR</h4>
                    <p class="mt-1">Sed consectetur diam sit amet blandit porta. Cras eleifend ante eget mauris volutpat tincidunt. Suspendisse Vitae purus et nunc interdum convallis in iaculis augue. Morbi porta hendrerit quam</p>
                </div>
            </Column>
        </SubgridContainer>
    </Column>
</Section>