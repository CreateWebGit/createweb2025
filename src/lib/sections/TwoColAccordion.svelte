<script lang="ts">
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import ColumnAccordion from "$components/ColumnAccordion.svelte";
	import ColumnButton from "../components/ColumnButton.svelte";
	import StripedContainer from "$components/layout/StripedContainer.svelte";
	import { fade } from "svelte/transition";

	import type { AccordionItem } from "$src/lib/models/accordion";
	import FlexContainer from "../components/layout/FlexContainer.svelte";
	import { showBookingForm } from "$lib/stores/layoutStore";

	interface Props {
		accordionItems?: AccordionItem[];
	}

	let { accordionItems }: Props = $props();

	let currentAccordionActive = $state(0);

	let testFunction = (id: number) => {
		currentAccordionActive = id;
	};
</script>

<Section lines="XXX-X" borderBottom class="py-4">
	<Column span={12} class="py-4 py-xs-2 px-xs-1">
		<p class="subheading text-accent text-center">DET HÄR KAN VI</p>
		<h2 class="text-center">Det här hjälper vi <br /> företag att göra</h2>
	</Column>
	<Column span={6} class="pb-xs-4">
		<StripedContainer borderRight={false} class="aspect-ratio-1-1">
			<div class="mockup-container">
				{#if currentAccordionActive === 0}
					<img
						transition:fade
						class="mockup-screen"
						src="/images/first_page/mockups/vscode.png"
						alt="ipad mockup"
					/>
				{:else if currentAccordionActive === 2}
					<img
						transition:fade
						class="mockup-screen"
						src="/images/first_page/mockups/xcode.png"
						alt="ipad mockup"
					/>
				{:else if currentAccordionActive === 1}
					<img
						transition:fade
						class="mockup-screen"
						src="/images/first_page/mockups/google_analytics.png"
						alt="ipad mockup"
					/>
				{/if}
				<img
					class="mockup-image"
					src="/images/first_page/mockups/landscape_ipad_mockup.png"
					alt="ipad mockup"
				/>
			</div>
		</StripedContainer>
	</Column>
	<Column span={6} class="d-flex flex-column justify-center">
		<ColumnAccordion
			onClick={testFunction}
			allowOnlyOneOpen
			width={"100%"}
			borderTop={false}
			borderTopFirst
			items={accordionItems}
		/>
	</Column>
	<Column span={12} class="py-4 pt-xs-4">
		<FlexContainer class="flex-column-xs">
			<ColumnButton
				type="button"
				onClick={() => ($showBookingForm = !$showBookingForm)}
				buttonText="BOKA ETT 20-MIN MÖTE"
			/>
			<ColumnButton
				type="link"
				href="/om-oss"
				buttonText="KONTAKTA OSS"
			/>
		</FlexContainer>
	</Column>
</Section>

<style lang="scss">
	:global(.mockup-container) {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;

		.mockup-image,
		.mockup-screen {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.mockup-screen {
			z-index: 1;
		}

		img {
			width: 85%;
		}
	}
</style>
