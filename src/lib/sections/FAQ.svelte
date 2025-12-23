<script lang="ts">
	import Section from "../components/grid/Section.svelte";
	import Column from "../components/grid/Column.svelte";
	import ColumnButton from "../components/ColumnButton.svelte";
	import FlexContainer from "../components/layout/FlexContainer.svelte";
	import ColumnAccordion from "../components/ColumnAccordion.svelte";
	import { showBookingForm } from "$lib/stores/layoutStore";

	interface Props {
		title?: string;
		description?: string;
		imageUrl?: string;
		accordionItems: AccordionItem[];
	}

	let {
		title = "Frågor vi ofta får",
		description,
		accordionItems,
		imageUrl = "/images/cw_orange_pattern.svg",
	}: Props = $props();

	//types
	import type { AccordionItem } from "$lib/models/accordion";
</script>

<Section lines={"XXX-X"}>
	<Column
		class="pt-4 pt-xs-2 d-flex flex-column justify-between gap-10"
		span={6}
	>
		<div class="pl-1 pl-xs-1">
			<p class="subheading text-accent">FAQ</p>
			<h2>{title}</h2>
			<p class="mt-2 pr-2 pr-xs-1 pb-xs-2">
				Vi vet. Ibland snurrar det till i huvudet när man ska beställa
				en hemsida, starta ett projekt eller bara försöka fatta vad som
				egentligen ingår. Här har vi samlat några av de frågor vi ofta
				får, tillsammans med svar som (förhoppningsvis) gör saker lite
				klarare.
			</p>
		</div>

		<FlexContainer class="hide-mobile mt-5" direction="column">
			<ColumnButton
				type="button"
				onClick={() => ($showBookingForm = !$showBookingForm)}
				buttonText="BOKA ETT 20-MIN MÖTE"
			/>
			<ColumnButton
				type="link"
				href="../om-oss"
				buttonText="KONTAKTA OSS"
				borderTop={false}
			/>
			<div class="image-container aspect-ratio-1-1">
				<img src={imageUrl} alt="faq" />
			</div>
		</FlexContainer>
	</Column>
	<Column span={6} class="d-flex align-center flex-column-xs">
		<ColumnAccordion
			items={accordionItems}
			allowOnlyOneOpen
			width={"100%"}
			borderTop={false}
			type={"big"}
			borderTopFirst={true}
		/>

		<FlexContainer class="hide-desktop pt-xs-4" direction="column">
			<ColumnButton
				type="button"
				buttonText="BOKA ETT 20-MIN MÖTE"
				onClick={() => ($showBookingForm = !$showBookingForm)}
			/>
			<ColumnButton
				type="link"
				href="../om-oss"
				buttonText="KONTAKTA OSS"
				borderTop={false}
			/>
			<div class="image-container aspect-ratio-1-1">
				<img src={imageUrl} alt="faq" />
			</div>
		</FlexContainer>
	</Column>
</Section>

<style lang="scss">
	.image-container {
		width: 50%;

		@media (max-width: 768px) {
			margin: auto;
			border-left: 1px solid var(--border-color);
			border-right: 1px solid var(--border-color);
			width: 75%;
			padding: 2rem;
		}

		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
			border-left: 1px solid var(--border-color);
		}
	}
</style>
