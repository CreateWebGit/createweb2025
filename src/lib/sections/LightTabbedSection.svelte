<script lang="ts">
	import Section from "../components/grid/Section.svelte";
	import Column from "../components/grid/Column.svelte";
	import StripedContainer from "../components/layout/StripedContainer.svelte";
	import ColumnButton from "../components/ColumnButton.svelte";
	import { lightMode } from "$stores/themeStore";
	import { showBookingForm } from "$lib/stores/layoutStore";

	//types
	type StickyTab = {
		id: number;
		label: string;
		leftHtml: string;
		rightHtml?: string;
	};

	interface Props {
		subheading?: string;
		heading?: string;
		tabs?: StickyTab[];
	}

	const defaultTabs = [
		{
			id: 0,
			label: "Overview",
			leftHtml: "<h2>Hello 1</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: 1,
			label: "Test 2",
			leftHtml: "<h2>Hello 2</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: 2,
			label: "Test 3",
			leftHtml: "<h2>Hello 3</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
		{
			id: 3,
			label: "Test 4",
			leftHtml: "<h2>Hello 4</h2><p>World.</p>",
			rightHtml: "<h2>Right column here.</h2>",
		},
	];

	//props
	let {
		subheading = "Ändra mig",
		heading = "Ändra mig",
		tabs = defaultTabs,
	}: Props = $props();

	//state
	let activeIndex = $state(0);
	let steps = $derived(tabs.length);
	let activeTab = $derived(
		steps === 0 ? null : tabs[Math.min(activeIndex, steps - 1)]
	);

	let bottomTabsVisible = $state(false);

	let wrapperEl: HTMLDivElement | null = null;

	$effect(() => {
		if (!wrapperEl || steps === 0) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				console.log("is intersecting");
				const isLight = entry.intersectionRatio >= 0.25;
				lightMode.set(isLight);
				bottomTabsVisible = isLight;
				document.documentElement.classList.toggle(
					"light-mode",
					isLight
				);
			},
			{ threshold: [0, 0.25, 1] }
		);

		observer.observe(wrapperEl);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div bind:this={wrapperEl}>
	<Section lines="XXXXX" borderBottom>
		<Column span={12} class="py-4 py-xs-2">
			<p class="subheading text-accent text-center">{subheading}</p>
			<h2 class="text-center">{heading}</h2>
		</Column>
		<Column
			class="d-flex flex-column pl-1 pr-4 pt-8 px-xs-1 pb-xs-2"
			span={6}
		>
			{#if activeTab}
				{@html activeTab.leftHtml}
			{/if}
		</Column>
		<Column span={6} class="pb-xs-4">
			<StripedContainer class="aspect-ratio-1-1">
				{#if activeTab}
					{@html activeTab.rightHtml}
				{/if}
			</StripedContainer>
		</Column>
		<Column class="d-flex pt-4 pb-2 pb-xs-2 hide-mobile" span={12}>
			{#each tabs as tab}
				<button
					class="tab-button"
					onclick={() => (activeIndex = tab.id)}
					class:active={activeIndex === tab.id}
				>
					{tab.label}
					<div class="indicator-container">
						<div class="indicator"></div>
						<div class="indicator-blur"></div>
					</div>
				</button>
			{/each}
		</Column>

		{#if bottomTabsVisible}
			<div class="tab-button-container-xs">
				{#each tabs as tab}
					<button
						class="tab-button"
						onclick={() => (activeIndex = tab.id)}
						class:active={activeIndex === tab.id}
					>
						{tab.label}
						<div class="indicator-container">
							<div class="indicator"></div>
							<div class="indicator-blur"></div>
						</div>
					</button>
				{/each}
			</div>
		{/if}
		<!--
		<Column span={3} />
		<Column span={6} class="d-flex pt-2 pb-4">
			<ColumnButton
				type="button"
				buttonText="BOKA ETT 20-MIN MÖTE"
				linkTarget="external"
				onClick={() => ($showBookingForm = !$showBookingForm)}
			/>
			<ColumnButton
				type="link"
				href="../om-oss"
				buttonText="KONTAKTA OSS"
			/>
		</Column>
		<Column span={3} />
		-->
	</Section>
</div>

<style lang="scss">
	.tab-button {
		all: unset;
		appearance: none;
		height: 4rem;
		width: 100%;
		border: none; //reset border first
		border-top: 1px solid var(--border-color);
		border-bottom: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
		padding: 0;
		background-color: var(--bg-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		gap: 0.25rem;
		color: light-dark(#ababab, #909090);
		text-transform: uppercase;
		cursor: pointer;

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
			background-color: light-dark(#e3e3e3, #31313135);
			box-shadow:
				inset 0 0.4375rem 0.6875rem -0.3125rem
					light-dark(#fff, transparent),
				inset 0 -0.1875rem 0.3125rem 0
					light-dark(rgba(178, 178, 178, 0.25), transparent);

			.indicator,
			.indicator-blur {
				background: var(--accent-color);
				display: block;
			}
		}

		&:last-of-type {
			border-right: 1px solid var(--border-color);
		}
	}

	.tab-button-container-xs {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		z-index: 150;
	}
</style>
