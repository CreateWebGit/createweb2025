<script lang="ts">
    import Section from "$src/lib/components/grid/Section.svelte";
    import Column from "$src/lib/components/grid/Column.svelte";
    import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";
    import ColumnAccordion from "$src/lib/components/ColumnAccordion.svelte";
    import StripedContainer from "$src/lib/components/layout/StripedContainer.svelte";
    import ColumnButton from "$src/lib/components/ColumnButton.svelte";

    //types
    import type { AccordionItem } from '$lib/models/accordion';
    
    const accordionItems: AccordionItem[] = [
        {
            title: 'SEO',
            content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>',
            open: true
        },
        {
            title: 'SEM',
            content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>',
        },
        {
            title: 'Social Media',
            content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>'
        }
    ]
</script>

<Section lines={"XXXXX"}>
    <Column class="d-flex flex-column pt-4 pb-2" span={6}>
        <div>
            <h1 class="subpage-hero-heading ml-1">Vi ser, hör och löser det ni inte ens märkt än</h1>
            <p class="hero ml-1 mt-2">Med kontinuerligt underhåll får ni stabilitet, trygghet och en sajt som faktiskt håller jämna steg med verksamheten. Vi ser till att allt rullar, utan driftstopp, säkerhetsproblem eller plötsliga överraskningar.</p>
        </div>
        <ColumnAccordion class="mt-7" items={accordionItems} allowOnlyOneOpen={true} groupName="webbutveckling-accordion" borderTop={true}/>
    </Column>
    <Column class="pt-3 pb-6" span={6}>
        <StripedContainer class="aspect-ratio-1-1">
        </StripedContainer>
        <FlexContainer class="mt-4">
            <ColumnButton type="link" buttonText="BOKA ETT MÖTE" borderRight/>
            <ColumnButton type="link" buttonText="BEGÄR EN OFFERT"/>
        </FlexContainer>
    </Column>
</Section>