<script lang="ts">
	import Copy from "phosphor-svelte/lib/Copy";
	import LockSimple from "phosphor-svelte/lib/LockSimple";
	import TextAa from "phosphor-svelte/lib/TextAa";
	import ArrowClockWise from "phosphor-svelte/lib/ArrowClockwise";

	import Pulse from "./Pulse.svelte";

	import { fade } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

	let context = $state("iframe");
	let { iframeURL = $bindable() } = $props();
	let tabs = [
		{
			name: "Wacko - Tidlös elegans i äkta skinn",
			url: "https://wackoskinn.se",
			screenshot: "/images/iphone_mockup/wacko.png",
		},
		{
			name: "Hilja Logistics – Skräddarsydd logistik utan krångel",
			url: "https://hiljalogistics.se",
			screenshot: "/images/iphone_mockup/hilja.png",
		},
		{
			name: "Example Domain",
			url: "https://example.com",
			screenshot: "",
		},
		{
			name: "Createweb",
			url: "https://createweb.se",
			screenshot: "",
		},
	];

	let element: HTMLElement;
	const changeTab = (name: string) => {
		iframeURL = name;
		context = "iframe";
	};

	function slideUp(
		node: HTMLElement,
		{ delay = 0, duration = 250, easing = cubicOut, y = 20 } = {}
	) {
		return {
			delay,
			duration,
			easing,
			css: (t: number) => `
                opacity: ${t};
                transform: translateY(${(1 - t) * y}px);
            `,
		};
	}

	// cleanup
	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.intersectionRatio >= 0.9) {
					context = "tabs";
				}
			},
			{ threshold: 0.9 }
		);

		if (!element) return;
		observer.observe(element);

		return () => {
			//cleanup the observer
			observer.disconnect();
		};
	});
</script>

<div bind:this={element} class="mobile">
	<div class="screen">
		<div class="status-bar">
			<div class="time">09:41</div>
		</div>
		<div class="main-container">
			{#if context === "iframe"}
				<iframe
					out:fade={{ duration: 180 }}
					in:slideUp={{ delay: 180, duration: 250, y: 40 }}
					src={iframeURL}
					frameborder="0"
					title="iframe preview"
					loading="lazy"
				></iframe>
			{:else}
				<div
					out:fade={{ duration: 180 }}
					in:slideUp={{ delay: 180, duration: 250, y: 40 }}
					class="tabs-container"
				>
					<h3>Case</h3>
					<div class="tab-case-wrapper">
						{#each tabs as tab}
							<div
								onclick={() => changeTab(tab.url)}
								class="tab-case-container"
							>
								<div class="tab-case-screenshot">
									<img
										src={tab.screenshot}
										alt={tab.name + "screenshot"}
									/>
								</div>
								<div class="tab-title">{tab.name}</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
		<div class="bottom-bar">
			<div class="search-bar">
				<TextAa color="#101010" />
				<div class="center">
					<LockSimple weight="fill" color="#909090" />
					<a href={iframeURL} target="_blank"
						>{iframeURL.replace("https://", "")}</a
					>
				</div>
				<ArrowClockWise color="#101010" />
			</div>
			<button
				onclick={() => {
					// context = 'tabs';
					if (context === "iframe") {
						context = "tabs";
						// iframeURL = 'Search or enter address'
					} else {
						context = "iframe";
					}
				}}
				class="tab-button"
			>
				{#if context === "iframe"}
					<Copy color={"#077aff"} size={32} />
				{/if}
				{#if context === "tabs"}
					<p>Klar</p>
				{/if}

				<!-- <div class="pulse">
					<Pulse />
				</div> -->
			</button>
			<div class="home-bar"></div>
		</div>
	</div>
	<div class="frame">
		<img src="/images/iphone-15-pro.png" alt="mockup" />
	</div>
</div>

<style lang="scss">
	:root {
		--width: 27rem;
	}
	.mobile {
		position: relative;
		aspect-ratio: 432 / 886;
		width: var(--width);
		/* transform: scale(0.75); */
		/* transform-origin: top left; */

		.screen {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			aspect-ratio: 393 / 852;
			width: calc(var(--width) - 2.4375rem);
			overflow: hidden;
			background: white;
			display: grid;
			grid-template-rows: 4rem 1fr 5.25rem;
			border-radius: 1.125rem;

			.status-bar {
				border-bottom: 1px solid #e3e3e3;
				display: flex;
				color: black;
				font-size: 1rem;
				font-weight: 500;
				align-items: center;
				padding: 0 3rem;
				background-image: url("/images/iphone_mockup/status-bar.svg");
				background-size: 100%;
				background-position: center center;
			}

			.main-container {
				overflow: hidden;

				iframe {
					height: 100%;
					user-select: none;
					width: 100%;
				}

				.tabs-container {
					height: 100%;
					width: 100%;
					color: black;
					padding: 1rem;
					display: flex;
					flex-direction: column;
					gap: 0.5rem;

					.tab-case-wrapper {
						display: grid;
						grid-template-columns: 1fr 1fr;
						gap: 1rem;
						row-gap: 1.5rem;
						// flex-wrap: wrap;

						.tab-case-container {
							// width: 100%;
							cursor: pointer;
							transition: transform 0.2s ease;

							&:hover {
								transform: translateY(-0.25rem);
							}

							.tab-case-screenshot {
								height: 16rem;
								box-shadow: 0px 0px 1.718rem rgba(0, 0, 0, 0.15);
								border-radius: 1rem;
								overflow: hidden;

								img {
									height: 100%;
									width: 100%;
									object-fit: cover;
									object-position: top center;
								}
							}

							.tab-title {
								font-size: 0.85rem;
								font-weight: 500;
								margin-top: 0.35rem;
								margin-left: 0.25rem;
								text-overflow: ellipsis;
								max-width: 18ch;
								overflow: hidden;
								white-space: nowrap;
							}
						}
					}

					h3 {
						text-transform: none;
						font-weight: 600;
					}
				}
			}

			.bottom-bar {
				border-top: 1px solid #e3e3e3;
				display: flex;
				align-items: center;
				padding: 0 1.5rem;
				padding-bottom: 1rem;
				gap: 0.75rem;
				position: relative;

				.search-bar {
					width: 100%;
					height: 2.5625rem;
					background: rgba(255, 255, 255, 0.7);
					box-shadow: 0px 0px 1.718rem rgba(0, 0, 0, 0.15);
					border-radius: 0.6872rem;
					// display: flex;
					// justify-content: space-between;
					display: grid;
					grid-template-columns: auto 1fr auto;
					color: black;
					align-items: center;
					padding: 0 0.75rem;
					user-select: none;

					.center {
						display: flex;
						align-items: center;
						gap: 0.25rem;
						justify-self: center;
						cursor: pointer;
					}
				}

				.tab-button {
					all: unset;
					cursor: pointer;
					transition: transform 0.1s ease;
					position: relative;
					// animation: shake 0.7s infinite;

					p {
						color: #077aff;
						font-size: 18px;
						font-weight: 500;
					}

					.pulse {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}

					&:hover {
						// transform: translateY(-0.15rem);
						transform: scale(0.9);
					}
				}

				.home-bar {
					width: 148px;
					height: 5px;
					background-color: black;
					border-radius: 5px;
					position: absolute;
					bottom: 8px;
					left: 0;
					right: 0;
					margin: auto;
				}
			}
		}

		.frame {
			position: absolute;
			top: 0;
			left: 0;
			aspect-ratio: 432 / 886;
			width: var(--width);
			pointer-events: none;

			img {
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(1px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-2px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(2px, 0, 0);
		}

		61% {
			transform: translate3d(0, 0, 0);
		}
	}
</style>
