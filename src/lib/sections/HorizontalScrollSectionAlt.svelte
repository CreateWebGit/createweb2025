<script lang="ts">
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import StripedContainer from "../components/layout/StripedContainer.svelte";
	import CaretRight from "phosphor-svelte/lib/CaretRight";
	import CaretLeft from "phosphor-svelte/lib/CaretLeft";
	import { lightMode } from "$stores/themeStore";

	type StickyTab = {
		id: string;
		label: string;
		content?: string;
	};

	const {
		subheading = "",
		heading = "",
		tabs,
	} = $props<{
		subheading?: string;
		heading?: string;
		tabs: StickyTab[];
	}>();

	let activeIndex = $state(0);
	// let progress = $state(0);

	// let wrapperEl: HTMLDivElement | null = null;
	let tabContainerEl: HTMLDivElement | null = null;

	let steps = $derived(tabs.length);
	let activeTab = $derived(
		steps === 0 ? null : tabs[Math.min(activeIndex, steps - 1)]
	);

	$effect(() => {
		const index = activeIndex;

		if (!tabContainerEl || steps === 0) return;

		const container = tabContainerEl;

		// Grab all tab buttons
		const buttons = Array.from(
			container.querySelectorAll<HTMLButtonElement>(".tab-button")
		);

		const el = buttons[index];
		if (!el) return;

		el.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	});
</script>

<Section lines="X---X" borderBottom={true}>
	<Column span={12} class="py-2 py-xs-2">
		{#if subheading}
			<p class="subheading text-accent text-center">{subheading}</p>
		{/if}
		{#if heading}
			<h2 class="text-center">{heading}</h2>
		{/if}
	</Column>

	<Column
		borderTop
		borderBottom
		class="monochrome-striped-background"
		span={3}
	/>

	<!--tab buttons & progress-->
	<Column class="sticky-tabs" span={6}>
		<div class="tab-button-container" bind:this={tabContainerEl}>
			{#each tabs as tab, i}
				<button
					class="tab-button"
					onclick={() => (activeIndex = i)}
					class:active={activeIndex === i}
				>
					<p class="special">{tab.label}</p>
				</button>
			{/each}
		</div>
	</Column>

	<Column borderTop borderBottom span={3}>
		<div class="horizontal-tabs-caret-container">
			<button
				class="horizontal-tabs-caret-button"
				onclick={() => {
					if (activeIndex != 0) {
						activeIndex--;
					}
				}}
			>
				<CaretLeft />
			</button>
			<button
				class="horizontal-tabs-caret-button"
				onclick={() => {
					if (activeIndex < tabs.length - 1) {
						activeIndex++;
					}
				}}
			>
				<CaretRight />
			</button>
		</div>
	</Column>

	<Column span={12} class="py-2 py-xs-2">
		{#if activeTab}
			{@html activeTab.content}
		{/if}
	</Column>
</Section>

<style lang="scss">
	:global(.sticky-tabs) {
		border: 1px solid var(--border-color);

		.tab-button-container {
			display: flex;
			background: var(--bg-color);
			height: 3.25rem;
			overflow-x: scroll;
			scroll-snap-type: x mandatory;

			&::-webkit-scrollbar {
				height: 0;
				width: 0;
			}

			.tab-button {
				all: unset;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-transform: uppercase;
				gap: 0.25rem;
				cursor: pointer;
				transition: background-color 0.1s ease;
				flex: 0 0 auto;
				padding: 0 1rem;
				white-space: nowrap;
				scroll-snap-align: center;

				p.special {
					opacity: 0.2;
				}

				.indicator-container {
					position: relative;

					.indicator {
						height: 0.1875rem;
						border-radius: 0.1875rem;
						width: 1.25rem;
						background-color: var(--border-color);
						transition: background-color 0.1s ease;
					}

					.indicator-blur {
						height: 0.1875rem;
						border-radius: 0.1875rem;
						width: 1rem;
						background: var(--border-color);
						filter: blur(2px);
						position: absolute;
						top: 1px;
						left: 0;
						right: 0;
						margin: 0 auto;
						opacity: 0.75;
						display: none;
					}
				}

				&.active {
					color: var(--bw);

					p.special {
						opacity: 1;
					}
				}
			}
		}
	}

	:global(.horizontal-tabs-caret-container) {
		display: flex;
		height: 100%;

		.horizontal-tabs-caret-button {
			all: unset;
			appearance: none;
			aspect-ratio: 1 / 1;
			height: 100%;
			display: grid;
			place-items: center;
			border-right: 1px solid var(--border-color);
			cursor: pointer;
			background-color: transparent;
			transition: background-color 0.1s ease;

			&:hover {
				background-color: rgba(255, 255, 255, 0.1);
			}
		}
	}
</style>
