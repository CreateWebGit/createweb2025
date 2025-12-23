<script lang="ts">
	import Section from "$src/lib/components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";
	import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";
	import ColumnAccordion from "$src/lib/components/ColumnAccordion.svelte";
	import StripedContainer from "$src/lib/components/layout/StripedContainer.svelte";
	import ColumnButton from "$src/lib/components/ColumnButton.svelte";

	import { showBookingForm } from "$lib/stores/layoutStore";

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

<Section lines={"XXXXX"}>
	<Column class="d-flex flex-column pt-4 pb-2 pt-xs-2" span={6}>
		<div>
			<h1 class="subpage-hero-heading ml-1 pb-xs-2">{@html title}</h1>
			<p class="hero ml-1 mt-2 pr-10 pb-xs-4 hide-mobile">
				{description}
			</p>
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
		<p class="hero ml-1 mt-2 pr-10 pb-xs-2 hide-desktop">{description}</p>
		<FlexContainer class="mt-4 flex-column-xs">
			<ColumnButton
				type="button"
				borderRight={false}
				buttonText="BOKA ETT MÖTE"
				onClick={() => ($showBookingForm = !$showBookingForm)}
			/>
			<ColumnButton
				type="link"
				href="../om-oss"
				buttonText="KONTAKTA OSS"
			/>
		</FlexContainer>
	</Column>
</Section>
