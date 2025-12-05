<script lang="ts">
	import Section from "$src/lib/components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";
	import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";
	import ColumnAccordion from "$src/lib/components/ColumnAccordion.svelte";
	import StripedContainer from "$src/lib/components/layout/StripedContainer.svelte";
	import ColumnButton from "$src/lib/components/ColumnButton.svelte";

	//types
	import type { AccordionItem } from "$lib/models/accordion";

	interface Props {
		title?: string;
		description?: string;
		accordionItems?: AccordionItem[];
		children?: () => any;
	}

	let { title, description, accordionItems, children }: Props = $props();
</script>

<Section lines={"XXXXX"} sectionLayoutClass="cw-border-bottom">
	<Column class="d-flex flex-column pt-4 pb-2" span={6}>
		<div>
			<h1 class="subpage-hero-heading ml-1">{@html title}</h1>
			<p class="hero ml-1 mt-2 pr-10">{description}</p>
		</div>
		<ColumnAccordion
			class="mt-7 hide-mobile"
			items={accordionItems}
			allowOnlyOneOpen={true}
			groupName="hero-accordion"
			borderBottom
			borderTop={false}
			borderTopFirst
		/>
	</Column>
	<Column class="pt-3 pb-6" span={6}>
		<StripedContainer class="aspect-ratio-1-1">
			{#if children}
				{@render children()}
			{/if}
		</StripedContainer>
		<FlexContainer class="mt-4 flex-column-xs">
			<ColumnButton
				type="link"
				borderRight={false}
				buttonText="BOKA ETT MÖTE"
			/>
			<ColumnButton type="link" buttonText="BEGÄR EN OFFERT" />
		</FlexContainer>
	</Column>
</Section>
