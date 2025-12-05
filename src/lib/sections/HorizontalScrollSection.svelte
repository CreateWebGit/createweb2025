<script lang="ts">
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import StripedContainer from "../components/layout/StripedContainer.svelte";
	import { lightMode } from "$stores/themeStore";

	type StickyTab = {
		id: string;
		label: string;
		leftHtml: string;
		rightHtml?: string;
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
	let progress = $state(0);

	let wrapperEl: HTMLDivElement | null = null;

	let steps = $derived(tabs.length);
	let activeTab = $derived(
		steps === 0 ? null : tabs[Math.min(activeIndex, steps - 1)]
	);

	$effect(() => {
		if (!wrapperEl || steps === 0) return;

		const onScroll = () => {
			const rect = wrapperEl!.getBoundingClientRect();
			const vh = window.innerHeight;

			const maxOffset = vh * (steps - 1);
			const rawOffset = -rect.top;
			const clampedOffset = Math.min(Math.max(rawOffset, 0), maxOffset);

			const p = maxOffset === 0 ? 0 : clampedOffset / maxOffset;
			progress = p;

			const seg = 1 / steps;
			const rawIndex = Math.floor(p / seg);
			activeIndex = Math.min(steps - 1, rawIndex);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();

		const observer = new IntersectionObserver(
			([entry]) => {
				console.log("is intersecting");
				const isLight = entry.intersectionRatio >= 0.25;
				lightMode.set(isLight);
				document.documentElement.classList.toggle(
					"light-mode",
					isLight
				);
			},
			{ threshold: [0, 0.25, 1] }
		);

		observer.observe(wrapperEl);

		return () => {
			window.removeEventListener("scroll", onScroll);
			observer.disconnect();
		};
	});

	const scrollToTab = (index: number) => {
		if (!wrapperEl || steps === 0) return;

		const rect = wrapperEl.getBoundingClientRect();
		const vh = window.innerHeight;

		const maxOffset = vh * (steps - 1);
		const seg = 1 / steps;

		const pCenter = (index + 0.5) * seg;
		const targetOffset = pCenter * maxOffset;

		const wrapperTopAbs = window.scrollY + rect.top;
		const targetScroll = wrapperTopAbs + targetOffset;

		window.scrollTo({ top: targetScroll, behavior: "smooth" });
	};
</script>

<!--outer scroll area-->
<div
	bind:this={wrapperEl}
	class="sticky-scroll-wrapper"
	style={`height: calc(100vh * ${tabs.length});`}
>
	<Section
		lines="XXXXX"
		sectionLayoutClass="sticky-layout"
		borderBottom={true}
	>
		<Column span={12} class="py-8">
			{#if subheading}
				<p class="subheading text-accent text-center">{subheading}</p>
			{/if}
			{#if heading}
				<h2 class="text-center">{heading}</h2>
			{/if}
		</Column>

		<!--left column-->
		<Column span={6} class="py-2">
			{#if activeTab}
				{@html activeTab.leftHtml}
			{/if}
		</Column>

		<!--right column-->
		<Column span={6}>
			<StripedContainer>
				{#if activeTab?.rightHtml}
					{@html activeTab.rightHtml}
				{/if}
			</StripedContainer>
		</Column>

		<!--tab buttons & progress-->
		<Column class="sticky-tabs" span={12}>
			<div class="progress">
				<div
					class="progress-bar"
					style={`transform: scaleX(${progress});`}
				></div>
			</div>

			<div class="tab-button-container">
				{#each tabs as tab, i}
					<button
						onclick={() => scrollToTab(i)}
						class="tab-button"
						class:active={i === activeIndex}
					>
						{tab.label}
						<div class="indicator-container">
							<div class="indicator"></div>
							<div class="indicator-blur"></div>
						</div>
					</button>
				{/each}
			</div>
		</Column>
	</Section>
</div>

<style lang="scss">
	/* Outer scroll area */
	:global(.sticky-scroll-wrapper) {
		position: relative;
	}

	/* Sticky section */
	:global(.section-layout.sticky-layout) {
		position: sticky;
		top: 0;
		height: 100vh;
	}

	:global(.sticky-tabs) {
		.tab-button-container {
			display: flex;
			background: var(--bg-color);

			.tab-button {
				all: unset;
				width: 100%;
				height: 4rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-weight: 600;
				text-transform: uppercase;
				border-top: 1px solid var(--border-color);
				border-bottom: 1px solid var(--border-color);
				color: light-dark(#ababab, #909090);
				gap: 0.25rem;
				cursor: pointer;
				transition: background-color 0.1s ease;
				border-right: 1px solid var(--border-color);

				&:first-of-type {
					border-left: 1px solid var(--border-color);
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
					background-color: light-dark(#bebebe35, #31313135);
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
			}
		}
	}

	.progress {
		height: 2px;
		border-radius: 999px;
		overflow: hidden;

		.progress-bar {
			height: 100%;
			transform-origin: left center;
			background: var(--accent-color);
		}
	}
</style>
