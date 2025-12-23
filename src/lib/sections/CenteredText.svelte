<script lang="ts">
	import Section from "$src/lib/components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";

	import ColumnButton from "$src/lib/components/ColumnButton.svelte";
	import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";
	import { showBookingForm } from "$lib/stores/layoutStore";

	interface Props {
		content: {
			title: string;
			body: string;
		};
	}

	let { content }: Props = $props();
</script>

<Section lines={"XX-XX"} class="py-4 py-xs-4">
	<Column span={3}></Column>
	<Column span={6}>
		<div class="px-1 px-xs-1">
			<h3 class="mb-2">{content.title}</h3>
			<div>
				{@html content.body}
			</div>
		</div>

		<FlexContainer class="mt-2 flex-column-xs">
			<ColumnButton
				width={1}
				borderRight
				buttonText="BOKA ETT 20 MIN MÖTE"
				type="button"
				onClick={() => ($showBookingForm = !$showBookingForm)}
			/>
			<ColumnButton width={1} buttonText="BEGÄR EN OFFERT" type="link" />
		</FlexContainer>
	</Column>
	<Column span={3}></Column>
</Section>
