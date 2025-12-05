<script lang="ts">
	//layout
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import ColumnButton from "../components/ColumnButton.svelte";
	import ColumnAccordion from "../components/ColumnAccordion.svelte";

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
		imageUrl = "/images/cw_approach_develop.webp",
		imageAlt = "lorem ipsum dolor",
		reverse = false,
	}: Props = $props();
</script>

<Section borderBottom lines={"--X--"}>
	<Column span={2}></Column>
	<Column
		class={reverse
			? "order-1 text-column py-8 d-flex justify-between flex-column"
			: "order-0 text-column py-8 d-flex justify-between flex-column"}
		span={4}
		borderLeft
	>
		<div>
			<p class="subheading text-accent">{subheading}</p>
			<h2>{@html heading}</h2>
			<p class="">{@html body}</p>
		</div>

		<div>hej</div>
	</Column>
	<Column
		class="image-column d-flex flex-column justify-end pt-10 pb-6 align-center"
		span={4}
		borderRight
	>
		<div class="image-container">
			<img src={imageUrl} alt={imageAlt} />
			<div class="img-underlay monochrome-striped-background"></div>
		</div>
	</Column>
	<Column span={2}></Column>
</Section>

<style lang="scss">
	:global(.image-column) {
		.image-container {
			width: 100%;
			height: 27.75rem;
			border: 1px solid var(--border-color);
			position: relative;
			// margin-top: 2rem;
			// margin-right: 2rem;

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
