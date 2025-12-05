<script lang="ts">
    import Section from "../components/grid/Section.svelte";
    import Column from "../components/grid/Column.svelte";

    import ColumnAccordion from "../components/ColumnAccordion.svelte";

    import type { AccordionItem } from '$lib/models/accordion'

    interface Props {
        heading?: string;
        subheading?: string;
        items: AccordionItem[];
    }

    let { heading = 'Lorem ipsum', subheading = 'Lorem ipsum', items }: Props = $props()
</script>

<Section borderBottom lines={"X---X"}>
    <Column class="py-4" start={3} end={11} borderRight borderLeft>
        <p class="subheading text-accent text-center">{subheading}</p>
        <h2 class="text-center">{heading}</h2>
    </Column>
    <Column start={3} end={11} borderRight borderLeft>
        <ColumnAccordion items={items} type="big" width="100%" allowOnlyOneOpen borderTop={false} icon={"plus"}/>
    </Column>
</Section>