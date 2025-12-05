<script lang="ts">
	import CaretRight from "phosphor-svelte/lib/CaretRight";
	import Plus from "phosphor-svelte/lib/Plus";

	import { slide } from "svelte/transition";
	import type { AccordionItem } from "$src/lib/models/accordion";

	type ColumnWidth = 1 | 2 | 3 | 4 | "100%";

	interface Props {
		items?: AccordionItem[];
		borderTop?: boolean;
		borderBottom?: boolean;
		class?: string;
		width?: ColumnWidth;
		groupName?: string;
		onClick?: (index: number) => void;
		allowOnlyOneOpen?: boolean;
		type?: "default" | "big";
		icon?: "chevron" | "plus";
		borderTopFirst?: boolean;
		borderBottomLast?: boolean;
	}

	const DEFAULT_WIDTH_REM = 20.263;

	let {
		items = [],
		borderTop = true,
		borderBottom = true,
		onClick,
		width = 1,
		class: customClass,
		groupName,
		allowOnlyOneOpen = false,
		type = "default",
		icon = "chevron",
		borderTopFirst,
		borderBottomLast,
	}: Props = $props();

	const buildInitialState = (
		list: AccordionItem[],
		singleOpen: boolean
	): boolean[] => {
		const base = list.map((item) => Boolean(item?.open));
		if (!singleOpen) return base;
		const firstOpen = base.findIndex(Boolean);
		if (firstOpen === -1) return base;
		return base.map((_, idx) => idx === firstOpen);
	};

	const enforceSingleOpen = (states: boolean[]): boolean[] => {
		const firstOpen = states.findIndex(Boolean);
		if (firstOpen === -1) {
			return states.map(() => false);
		}
		return states.map((_, idx) => idx === firstOpen);
	};

	let openStates: boolean[] = $state(
		buildInitialState(items, allowOnlyOneOpen)
	);
	let lastItems: AccordionItem[] | undefined = items;
	let lastAllowOnlyOne = allowOnlyOneOpen;

	$effect(() => {
		if (items !== lastItems) {
			lastItems = items;
			openStates = buildInitialState(items, allowOnlyOneOpen);
		}
	});

	$effect(() => {
		if (allowOnlyOneOpen !== lastAllowOnlyOne) {
			lastAllowOnlyOne = allowOnlyOneOpen;
			openStates = allowOnlyOneOpen
				? enforceSingleOpen(openStates)
				: [...openStates];
		}
	});

	const toggleItem = (index: number): void => {
		if (allowOnlyOneOpen) {
			const willOpen = !openStates[index];
			openStates = openStates.map((_, idx) =>
				idx === index ? willOpen : false
			);
		} else {
			openStates = openStates.map((state, idx) =>
				idx === index ? !state : state
			);
		}

		onClick?.(index);
	};

	const getContentId = (index: number): string =>
		`${groupName ?? "accordion"}-content-${index}`;
</script>

<div class={`cw-accordion-wrapper ${customClass}`}>
	{#if items.length}
		{#each items as accordion, i}
			<div
				class={`cw-accordion-container`}
				class:open={openStates[i]}
				class:border-top={borderTop}
				class:border-bottom={borderBottom}
				class:border-top-first={borderTopFirst}
				class:border-bottom-last={borderBottomLast}
				class:big={type === "big"}
				style={width !== "100%"
					? `width: ${DEFAULT_WIDTH_REM * width}rem`
					: `width: 100%`}
			>
				<button
					type="button"
					class="cw-accordion-title-container"
					aria-expanded={openStates[i]}
					aria-controls={getContentId(i)}
					onclick={() => toggleItem(i)}
				>
					<div class="cw-accordion-title">{accordion.title}</div>
					<div
						class="cw-accordion-caret {icon === 'chevron'
							? 'chevron'
							: 'plus'}"
					>
						{#if icon === "chevron"}
							<CaretRight />
						{:else}
							<Plus
								weight={"light"}
								color="var(--accent-color)"
								size={20}
							/>
						{/if}
					</div>
				</button>
				{#if openStates[i]}
					<div
						class="cw-accordion-content"
						id={getContentId(i)}
						transition:slide
					>
						{@html accordion.content ?? ""}
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.cw-accordion-wrapper {
		width: 100%;
	}
	.cw-accordion-container {
		display: flex;
		flex-direction: column;
		border-top: 1px solid transparent;
		border-bottom: 1px solid transparent;

		&.border-top {
			border-top-color: var(--border-color);
		}

		&.border-bottom {
			border-bottom-color: var(--border-color);
		}

		&.border-top-first {
			&:first-of-type {
				border-top-color: var(--border-color);
			}
		}

		&.border-bottom-last {
			&:last-of-type {
				border-bottom-color: var(--border-color);
			}
		}

		.cw-accordion-title-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			padding: 1.5rem 1rem;
			background: transparent;
			border: none;
			cursor: pointer;
			font: inherit;
			text-align: left;
			color: inherit;
			width: 100%;

			&:focus-visible {
				outline: 2px solid currentColor;
				outline-offset: 2px;
			}

			.cw-accordion-title {
				font-size: 1rem;
				font-weight: 600;

				@media (max-width: 768px) {
					font-size: 14px;
				}
			}

			.cw-accordion-caret {
				transition: transform 0.2s ease;
				display: flex;
			}
		}

		&.open .cw-accordion-caret {
			&.chevron {
				transform: rotate(90deg);
			}

			&.plus {
				transform: rotate(135deg);
			}
		}

		.cw-accordion-content {
			padding: 0 1rem 1.5rem;
		}

		&.big {
			.cw-accordion-title {
				font-size: 1.5rem;
				text-transform: uppercase;
				font-weight: 800;

				@media (max-width: 768px) {
					font-size: 14px;
				}
			}

			svg {
				fill: red;
			}
		}
	}
</style>
