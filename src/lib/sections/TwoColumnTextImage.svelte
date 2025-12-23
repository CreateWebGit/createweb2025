<script lang="ts">
	//layout
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import ColumnButton from "../components/ColumnButton.svelte";

	interface Props {
		heading?: string;
		subheading?: string;
		body?: string;
		imageUrl?: string;
		imageAlt?: string;
		reverse?: boolean;
	}

	let {
		heading = "Lorem ipsum dolor sit amet <br/> consectetur adipisicing",
		subheading = "Sit amet consectur",
		body = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque consequatur illum vel ullam architecto odio nam labore dolor. Doloribus, fuga!",
		imageUrl = "/images/cw_generic_developers.png",
		imageAlt = "lorem ipsum dolor",
		reverse = false,
	}: Props = $props();
</script>

<Section borderBottom lines={"X---X"}>
	<Column
		class="text-column py-8 py-xs-4 d-flex justify-between flex-column"
		span={5}
		borderRight
	>
		<div>
			<p class="subheading pl-1 pl-xs-1 text-accent">{subheading}</p>
			<h2 class="pl-1 pl-xs-1">{@html heading}</h2>
			<p
				class="pl-1 pr-1 mt-2 pl-xs-1 pb-xs-2 pb-2"
				style="white-space: pre-line"
			>
				{@html body}
			</p>
		</div>

		<div>
			<ColumnButton
				type="link"
				buttonText="BOKA ETT 20-MIN MÖTE"
				width={"100%"}
				borderBottom={false}
			></ColumnButton>
			<ColumnButton
				type="link"
				buttonText="BEGÄR EN OFFERT"
				width={"100%"}
			></ColumnButton>
		</div>
	</Column>
	<Column
		class="image-column d-flex flex-column justify-end pt-10 pb-6 pb-xs-0 align-center"
		span={7}
	>
		<div class="image-container">
			<img src={imageUrl} alt={imageAlt} />
			<div class="img-underlay monochrome-striped-background"></div>
		</div>
	</Column>
</Section>

<style lang="scss">
	:global(.image-column) {
		.image-container {
			width: 40.5rem;
			height: 27.75rem;
			border: 1px solid var(--border-color);
			position: relative;
			margin-top: 2rem;
			margin-right: 2rem;

			@media (max-width: 768px) {
				width: 100%;
				height: 100%;
				aspect-ratio: 1 / 1;
			}

			img {
				height: 100%;
				width: 100%;
				object-fit: cover;
				position: relative;
				z-index: 0;
			}

			.img-underlay {
				position: absolute;
				height: 20.8125rem;
				width: 20.8125rem;
				top: -2rem;
				right: -2rem;
				z-index: -1;
			}
		}
	}
</style>
