<script lang="ts">
	import { lightMode } from "$src/lib/stores/themeStore";

	interface Props {
		direction?: "row" | "column";
		gap?: number;
		caps?: true;
		class?: string;
		children?: () => any;
		borderLeft?: boolean;
		borderRight?: boolean;
		borderTop?: boolean;
		borderBottom?: boolean;
	}

	let {
		direction = "row",
		gap = 0,
		children,
		caps = true,
		class: customClass,
		borderTop = true,
		borderLeft = true,
		borderBottom = true,
		borderRight = true,
	}: Props = $props();
</script>

<div
	class="cw-flex-container monochrome-striped-background d-flex {direction ===
	'row'
		? 'flex-row'
		: ''} {direction === 'column' ? 'flex-column' : ''} {`gap-` +
		gap} {customClass}"
	class:cw-border-top={borderTop}
	class:cw-border-left={borderLeft}
	class:cw-border-right={borderRight}
	class:cw-border-bottom={borderBottom}
>
	{#if children}
		{@render children()}
	{/if}

	{#if caps}
		<div class="top-left-cap">
			<img
				src={!$lightMode
					? "/striped-container-cap.svg"
					: "/striped-container-cap-light.svg"}
				alt="container cap"
			/>
		</div>
		<div class="top-right-cap">
			<img
				src={!$lightMode
					? "/striped-container-cap.svg"
					: "/striped-container-cap-light.svg"}
				alt="container cap"
			/>
		</div>
		<div class="bottom-left-cap">
			<img
				src={!$lightMode
					? "/striped-container-cap.svg"
					: "/striped-container-cap-light.svg"}
				alt="container cap"
			/>
		</div>
		<div class="bottom-right-cap">
			<img
				src={!$lightMode
					? "/striped-container-cap.svg"
					: "/striped-container-cap-light.svg"}
				alt="container cap"
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.cw-flex-container {
		position: relative;
		background-color: var(--bg-color);

		@media (max-width: 768px) {
			border-left: 0;
			border-right: 0;
		}

		.top-left-cap {
			img {
				height: 1.5625rem;
				width: 1.5625rem;
				position: absolute;
				top: -0.8125rem;
				left: -0.8125rem;
				user-select: none;
				pointer-events: none;
			}
		}

		.top-right-cap {
			img {
				height: 1.5625rem;
				width: 1.5625rem;
				position: absolute;
				top: -0.8125rem;
				right: -0.8125rem;
				rotate: 90deg;
				user-select: none;
				pointer-events: none;
			}
		}

		.bottom-left-cap {
			img {
				height: 1.5625rem;
				width: 1.5625rem;
				position: absolute;
				bottom: -0.8125rem;
				left: -0.8125rem;
				transform: scaleY(-1);
				user-select: none;
				pointer-events: none;
			}
		}

		.bottom-right-cap {
			img {
				height: 1.5625rem;
				width: 1.5625rem;
				position: absolute;
				bottom: -0.8125rem;
				right: -0.8125rem;
				transform: scaleY(-1) rotate(90deg);
				user-select: none;
				pointer-events: none;
			}
		}
	}
</style>
