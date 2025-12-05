<script lang="ts">
	import MacBook from "$src/lib/components/MacBook.svelte";
	import Section from "$src/lib/components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";

	import Phone from "../components/Phone.svelte";

	let activeIframe: string = $state("https://wackoskinn.se");

	const setIframeFullscreen = () => {
		document.querySelector("#test-iframe")?.classList.add("fullscreen");
	};
</script>

<Section lines={"X---X"} class="py-6 py-xs-2">
	<Column span={12}>
		<p class="subheading text-accent text-center">Ett urval av våra case</p>
		<h2 class="text-center">PROJEKT VI ÄR STOLTA ÖVER</h2>
	</Column>
</Section>

<Section lines={"X---X"} class="pb-6">
	<Column span={12} class="d-flex justify-center mockups-container">
		<div class="hide-mobile">
			<MacBook>
				<div class="mb-container">
					<div class="menu-bar"></div>
					<div class="main-content">
						<div class="browser-container">
							<div class="top-bar-container">
								<div class="traffic-light-container">
									<div class="red"></div>
									<div class="yellow"></div>
									<div
										onclick={() => setIframeFullscreen()}
										class="green"
									></div>
								</div>
								<div class="tab-container">
									<button
										class:active={activeIframe ===
											"https://wackoskinn.se"}
										onclick={() =>
											(activeIframe =
												"https://wackoskinn.se")}
										class="tab">Wacko</button
									>
									<button
										class:active={activeIframe ===
											"https://hiljalogistics.se"}
										onclick={() =>
											(activeIframe =
												"https://hiljalogistics.se")}
										class="tab">Hilja Logistics</button
									>
									<button
										class:active={activeIframe ===
											"https://greenhermitage.se"}
										onclick={() =>
											(activeIframe =
												"https://greenhermitage.se")}
										class="tab">Green Hermitage</button
									>
								</div>
							</div>
							<div class="iframe-container">
								<!-- we need to inject css into the iframes -->
								<iframe
									id="test-iframe"
									src={activeIframe}
									title="nya wacko skinn mode"
									loading="lazy"
								></iframe>
							</div>
						</div>
					</div>
				</div>
			</MacBook>
		</div>
		<div class="phone-container">
			<Phone bind:iframeURL={activeIframe} />
		</div>
	</Column>
</Section>

<style lang="scss">
	:global(.mb-container) {
		background-color: var(--accent-color);
		height: 100%;
		width: 100%;

		.menu-bar {
			background-image: url("/cw-macbook-menu-bar.svg");
			height: 1.5rem;
			width: 100%;
			background-repeat: no-repeat;
			background-size: 100%;
			background-position: center center;
		}

		.main-content {
			height: 100%;
			padding: 0.25rem;
			padding-bottom: 1.75rem;

			.browser-container {
				height: 100%;
				width: 100%;
				background: white;
				border-radius: 0.5rem;
				outline: 0.5px solid #808080;
				display: grid;
				grid-template-rows: 32px 1fr;
				overflow: hidden;

				.top-bar-container {
					background-color: #1f2020;
					display: flex;
					align-items: center;
					height: 100%;
					padding: 0 1rem;
					gap: 1rem;

					.traffic-light-container {
						display: flex;
						height: 100%;
						align-items: center;
						gap: 0.35rem;
						.red,
						.yellow,
						.green {
							height: 0.6rem;
							width: 0.6rem;
							background-color: #ff5f57;
							border-radius: 100%;
						}

						.yellow {
							background-color: #febc2e;
						}

						.green {
							background-color: #28c840;
						}
					}

					:global(.tab-container) {
						height: 100%;
						display: flex;
						border-bottom: 1px solid var(--border-color);

						.tab {
							all: unset;
							height: 85%;
							background-color: #333333;
							display: flex;
							align-items: center;
							width: 8.25rem;
							font-size: 9px;
							font-weight: 500;
							padding: 0 0.75rem;
							margin-top: auto;
							border-right: 1px solid #505050;
							transition: background-color 0.2s ease;

							&:hover {
								background-color: #4c4c4c;
							}

							&.active {
								background-color: #4c4c4c;
							}

							&:first-of-type {
								border-top-left-radius: 0.35rem;
							}

							&:last-of-type {
								border-right: 0;
								border-top-right-radius: 0.35rem;
							}
						}
					}
				}

				.iframe-container {
					height: 100%;
					width: 100%;

					iframe {
						height: 100%;
						width: 100%;
						border: none;
						transition: height 0.2s ease;
					}
				}
			}
		}
	}

	:global(.fullscreen) {
		position: fixed;
		height: 100vh;
		width: 100vw;
		z-index: 10;
		top: 0;
		left: 0;
	}

	:global(.mockups-container) {
		position: relative;
	}

	:global(.phone-container) {
		position: absolute;
		right: -1rem;
		scale: 0.65;
		transform-origin: bottom right;
		z-index: 20;

		@media (max-width: 768px) {
			position: static;
			scale: 0.75;
			transform-origin: top center;
		}
	}
</style>
