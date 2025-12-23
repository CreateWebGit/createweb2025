<script lang="ts">
	let isAfter = $state(false);
	import { fade } from "svelte/transition";
</script>

<div class="hero-computer-v2">
	<div class="checkbox-container">
		<p class="marker" class:text-white={!isAfter}>Före</p>
		<input type="checkbox" bind:checked={isAfter} />
		<p class="marker" class:text-white={isAfter}>Efter</p>
	</div>
	<div class="mockup">
		<img
			src="/images/macbook_mockup/macbook_mockup_cutout.png"
			alt="webbutveckling"
		/>
	</div>
	<div class="screen">
		<div class="screen-inner">
			{#if !isAfter}
				<img
					transition:fade
					src="/images/first_page/wacko_old_screenshot.png"
					alt="wacko old screenshot"
				/>
			{/if}
			{#if isAfter}
				<iframe
					transition:fade
					src="https://wackoskinn.se"
					width="100%"
					height="100%"
					style="zoom: 0.5"
					title="wacko"
				></iframe>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.hero-computer-v2 {
		position: relative;
		aspect-ratio: 842 / 620;
		width: 50rem;
		right: 8.5rem;

		.checkbox-container {
			position: absolute;
			bottom: 5rem;
			right: -0.5rem;
			z-index: 200;
			display: flex;
			align-items: center;
			padding: 2rem;
			gap: 0.5rem;

			@media (max-width: 768px) {
				bottom: unset;
				top: calc(100% + 4rem);
				right: -1rem;
			}

			p {
				transform: rotate(-5deg);
				font-size: 1.25rem;
			}

			input[type="checkbox"] {
				appearance: none;
				height: 2rem;
				width: 4rem;
				background: rgb(31, 31, 31);
				border-radius: 2rem;
				cursor: pointer;
				position: relative;
				box-shadow: 2px -2px 15px -1px rgba(0, 0, 0, 0.5) inset;

				&:focus {
					outline: none;
				}

				&::before {
					position: absolute;
					height: 100%;
					width: 50%;
					background-color: var(--accent-color);
					border: none;
					content: "";
					left: 0;
					border-radius: 100%;
					transition: left 0.33s ease;
					outline: 3.5px solid rgb(31, 31, 31);
					outline-offset: -3px;
				}

				&:checked {
					&::before {
						left: 50%;
					}
				}
			}
		}

		@media (max-width: 768px) {
			transform: scale(0.6);
			transform-origin: top center;
			// right: calc(100% - 10rem);
			margin: 0 auto;
			right: 12rem;
			height: 22.1875rem;
		}

		.mockup {
			position: relative;
			z-index: 3;
			pointer-events: none;

			img {
				height: 100%;
				width: 100%;
				object-fit: contain;
			}
		}

		.screen {
			aspect-ratio: 426 / 419;
			width: 25.625rem;
			max-height: 23.125rem;

			position: absolute;
			top: 2.5rem;
			right: 5.75rem;
			z-index: 2;

			overflow: hidden;
			background: white;
			transform: skewY(-8deg) skewX(-1deg);
		}

		.screen-inner {
			height: 100%;
			overflow-y: auto;
			transform-origin: top right;

			img {
				width: 100%;
			}
		}

		@keyframes anim {
			0% {
				translate: 0 0;
			}

			25% {
				translate: 0 -2rem;
			}

			50% {
				translate: 0 0;
			}

			75% {
				translate: 0 -2rem;
			}

			100% {
				translate: 0 0;
			}
		}

		@keyframes anim2 {
			0% {
				translate: 0 0;
			}

			50% {
				translate: 0 -20rem;
			}

			100% {
				translate: 0 0;
			}
		}
	}

	:global {
		//safari specific fixes, remove them ASAP
		.is-safari .hero-computer-v2 {
			width: 44.5rem;

			.screen {
				width: 23rem;
				right: 5.15rem;
				top: 2.25rem;
			}
		}
	}
</style>
