<script lang="ts">
	import ArrowRight from "phosphor-svelte/lib/ArrowRight";
	import ArrowUpRight from "phosphor-svelte/lib/ArrowUpRight";

	type ColumnWidth = 1 | 2 | 3 | 4 | "100%";

	interface Props {
		borderTop?: boolean;
		borderBottom?: boolean;
		borderRight?: boolean;
		buttonText?: string;
		customClass?: string;
		onClick?: () => void;
		width?: ColumnWidth;
		type: "link" | "button";
		href?: string;
		linkTarget?: "internal" | "external";
	}

	const DEFAULT_WIDTH_REM = 20.263;

	let {
		borderTop = true,
		borderBottom = true,
		borderRight = false,
		buttonText = "Button",
		onClick,
		type,
		width = 1,
		href,
		customClass,
		linkTarget = "internal",
	}: Props = $props();
</script>

{#if type === "link"}
	<a
		class="cw-column-button {customClass}"
		class:border-top={borderTop}
		class:border-bottom={borderBottom}
		class:border-right={borderRight}
		style={width !== "100%"
			? `width: ${DEFAULT_WIDTH_REM * width}rem`
			: `width: 100%`}
		{href}
		target={linkTarget === "internal" ? "_self" : "_blank"}
	>
		{buttonText}
		{#if linkTarget === "internal"}
			<ArrowRight weight="bold" />
		{:else}
			<ArrowUpRight weight="bold" />
		{/if}
	</a>
{/if}

{#if type === "button"}
	<button
		class="cw-column-button {customClass}"
		class:border-top={borderTop}
		class:border-bottom={borderBottom}
		class:border-right={borderRight}
		style={width !== "100%"
			? `width: ${DEFAULT_WIDTH_REM * width}rem`
			: `width: 100%`}
		onclick={onClick}
	>
		{buttonText}
		{#if linkTarget === "internal"}
			<ArrowRight weight="bold" />
		{:else}
			<ArrowUpRight weight="bold" />
		{/if}
	</button>
{/if}

<style lang="scss">
	.cw-column-button {
		appearance: none;
		background: none;
		border: none;
		height: 4.25rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;

		&:hover {
			background-color: white;
			color: black;
		}

		&.border-top {
			border-top: 1px solid var(--border-color);
		}

		&.border-bottom {
			border-bottom: 1px solid var(--border-color);
		}

		&.border-right {
			border-right: 1px solid var(--border-color);
		}

		@media (max-width: 768px) {
			width: 100% !important;
			border: none !important;
			border-bottom: 1px solid var(--border-color) !important;
			&:first-of-type {
				border-top: 1px solid var(--border-color) !important;
			}
		}
	}
</style>
