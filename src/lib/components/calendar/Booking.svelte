<script lang="ts">
	import DatumTid from "./steps/DatumTid.svelte";
	import CaseDescription from "./steps/CaseDescription.svelte";
	import Kontaktuppgifter from "./steps/Kontaktuppgifter.svelte";
	import Sammanfattning from "./steps/Sammanfattning.svelte";

	import Check from "phosphor-svelte/lib/Check";
	import X from "phosphor-svelte/lib/X";
	import Minus from "phosphor-svelte/lib/Minus";

	import { showBookingForm } from "$lib/stores/layoutStore";

	// import { Drawer } from "vaul-svelte";
	import Drawer from "$lib/components/Drawer.svelte";

	import WheelPicker from "../WheelPicker.svelte";

	import {
		SERVICE_QUESTIONS,
		type ServiceId,
	} from "$lib/models/serviceQuestions";

	import type { BookingData } from "$lib/models/booking";

	type StepInstance = {
		canProceed: () => boolean;
		canGoToNextSub?: () => boolean;
		nextSub?: () => void;
		prevSub?: () => boolean;
		allRequiredAnswered?: () => boolean;
		getSubProgress?: () => { current: number; total: number };
	};

	let booking = $state<BookingData>({
		selectedDate: "",
		selectedTime: {
			start: "",
			end: "",
		},
		caseDescription: {
			service: "",
			serviceSpecificAnswers: {},
		},
		contactDetails: {
			first_name: "",
			last_name: "",
			company: "",
			phone: "",
			email: "",
			website: "",
		},
	});

	function updateBooking(patch: Partial<BookingData>) {
		Object.assign(booking, patch);
	}

	const steps = [
		{
			id: 0,
			title: "Datum & Tid",
			component: DatumTid,
		},
		{
			id: 1,
			title: "Fallbeskrivning",
			component: CaseDescription,
		},
		{
			id: 2,
			title: "Kontaktuppgifter",
			component: Kontaktuppgifter,
		},
		{
			id: 3,
			title: "Sammanfattning",
			component: Sammanfattning,
		},
	];

	let currentStep = $state(0);
	let currentStepInstance = $state<StepInstance | null>(null);
	let CurrentStepComponent = $derived(steps[currentStep].component);
	let completedSteps = $state<Set<number>>(new Set());

	const isFirst = $derived(currentStep === 0);
	const isLast = $derived(currentStep === steps.length - 1);

	let isDesktop = $state(false);

	$effect(() => {
		const media = window.matchMedia("(min-width: 768px)");

		const update = () => {
			isDesktop = media.matches;
		};

		update(); // initial value

		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	});

	function getStepSubProgress(stepId: number) {
		if (stepId !== 1) return null;

		if (currentStep === stepId) {
			const progress = currentStepInstance?.getSubProgress?.();
			if (progress) return progress;
		}

		if (completedSteps.has(stepId)) {
			const svc = booking.caseDescription.service as ServiceId;
			const total = Math.max(
				1 + (SERVICE_QUESTIONS[svc]?.length ?? 0),
				1
			);
			return { current: total, total };
		}

		return null;
	}

	function getStepSubSegments(stepId: number) {
		const progress = getStepSubProgress(stepId);
		if (!progress || progress.total <= 0) return null;

		return Array.from({ length: progress.total }, (_, idx) => {
			const done = completedSteps.has(stepId) || idx < progress.current;
			const active = !done && idx === progress.current;
			return { done, active };
		});
	}

	function markStepCompleted(stepId: number) {
		const next = new Set(completedSteps);
		next.add(stepId);
		completedSteps = next;
	}

	function goPrev() {
		const movedBack = currentStepInstance?.prevSub?.() ?? false;
		if (movedBack) return;

		if (!isFirst) currentStep--;
	}

	function goNext() {
		console.log($state.snapshot(booking));
		const canProceed = currentStepInstance?.canProceed?.() ?? true;
		if (!canProceed) {
			const canAdvanceSub =
				currentStepInstance?.canGoToNextSub?.() ?? false;
			if (canAdvanceSub && currentStepInstance?.nextSub) {
				currentStepInstance.nextSub();
				return;
			}

			console.log("inte färdig i steget");
			return;
		}

		markStepCompleted(currentStep);
		if (!isLast) currentStep++;
		else submit();
	}

	function formatTime(iso: string) {
		return new Date(iso).toLocaleTimeString("sv-SE", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	async function submit() {
		console.log("boka mötet");
		const res = await fetch(`http://localhost:3000/api/bokningar`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...booking,
				selectedTime: {
					start: formatTime(booking.selectedTime.start),
					end: formatTime(booking.selectedTime.end),
				},
			}),
			// credentials: 'include'
		});

		if (!res.ok) {
			throw new Error(await res.text());
		}

		return await res.json();
	}

	let drawerOpen = $state(false);

	function canJumpTo(stepId: number) {
		// You can always jump backwards or to already completed steps
		if (stepId <= currentStep) return true;
		if (completedSteps.has(stepId)) return true;

		// Optional: allow jumping to the immediate next step only
		// if (stepId === currentStep + 1) return true;

		return false;
	}

	function goToStep(stepId: number) {
		if (!canJumpTo(stepId)) return;

		// If you're on step 1 and using substeps, optionally reset substep state here
		currentStep = stepId;
	}
</script>

{#if !isDesktop}
	<Drawer
		bind:open={$showBookingForm}
		snapPoints={[0.3, 0.6, 1]}
		height={0.9}
		overlayOpacity={0.5}
		closeOnOverlay={true}
		ignoreContentDrag
	>
		<div class="booking-form">
			<div class="header">
				<div class="menu-bar">
					<h4>Boka ett möte</h4>
					<!-- <p>Steg: 1 / 4</p> -->
				</div>
			</div>
			<div class="steps">
				{#each steps as step (step.id)}
					{@const StepComponent = step.component}
					{@const isActive = step.id === currentStep}
					{@const isLocked = !canJumpTo(step.id)}

					<div
						class="step-accordion"
						class:active={isActive}
						class:locked={isLocked}
					>
						<button
							type="button"
							class="step-header"
							disabled={isLocked}
							onclick={() => goToStep(step.id)}
						>
							<span class="step-number">
								{#if completedSteps.has(step.id)}
									<Check weight="bold" />
								{:else}
									{step.id + 1}
								{/if}
							</span>

							<span class="step-title">{step.title}</span>
						</button>

						{#if isActive}
							<div class="step-body">
								<StepComponent
									{booking}
									{updateBooking}
									bind:this={currentStepInstance}
								/>
							</div>
						{/if}
					</div>
				{/each}
			</div>
			<div class="footer d-flex">
				<button
					class="cw-button--primary full-width"
					onclick={() => goNext()}>Nästa</button
				>
			</div>
		</div>
	</Drawer>
{/if}

<!--the mobile and desktop CurrentStepComponent cannot be in the dom at the same time!, this needs to be unloaded-->
{#if isDesktop}
	<div class="booking-form-overlay hide-mobile">
		<div class="booking-form">
			<div class="header">
				<div class="menu-bar">
					<div></div>
					<h4>Boka ett möte</h4>
					<div class="button-container">
						<button class="action-button"
							><Minus weight={"bold"} /></button
						>
						<button
							class="action-button"
							onclick={() => ($showBookingForm = false)}
							><X weight={"bold"} /></button
						>
					</div>
				</div>
				<div class="progress-container">
					{#each steps as step}
						<div
							class="number"
							class:done={completedSteps.has(step.id)}
							class:active={currentStep === step.id}
						>
							{#if completedSteps.has(step.id)}
								<Check weight={"bold"} />
							{:else}
								{step.id + 1}
							{/if}
							<p class="title subheading">{step.title}</p>
						</div>
						{#if step.id != steps.length - 1}
							{#if getStepSubSegments(step.id)}
								<div class="progress-line-segments">
									{#each getStepSubSegments(step.id) as seg, idx (idx)}
										<div
											class="progress-line-container"
											class:active={seg.active}
											class:done={seg.done}
										>
											<div class="progress"></div>
										</div>
									{/each}
								</div>
							{:else}
								<div
									class:active={currentStep === step.id}
									class:done={completedSteps.has(step.id)}
									class="progress-line-container"
								>
									<div class="progress"></div>
								</div>
							{/if}
						{/if}
					{/each}
				</div>
			</div>
			<div class="steps">
				<CurrentStepComponent
					{booking}
					{updateBooking}
					bind:this={currentStepInstance}
				/>
			</div>
			<div
				class="footer monochrome-striped-background d-flex align-center justify-between"
			>
				<!-- TODO: keep state when going to previous -->
				<button class="cw-button--secondary" onclick={() => goPrev()}
					>föregående</button
				>
				<button class="cw-button--primary" onclick={() => goNext()}
					>{#if currentStep === 3}
						Boka
					{:else}
						Nästa
					{/if}</button
				>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.booking-form-overlay {
		position: fixed;
		inset: 0;
		height: 100vh;
		width: 100%;
		display: grid;
		place-items: center;
		z-index: 101;
		background-color: #0d1624c9;
		backdrop-filter: blur(4px);
	}

	.booking-form {
		background-color: var(--bg-color);
		border: 1px solid var(--border-color);
		height: 45rem;
		width: 65rem;
		display: grid;
		grid-template-rows: auto 1fr 4rem;
		box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.4);

		@media (max-width: 768px) {
			height: 100%;
			width: 100%;
			box-shadow: none;
			border: none;
			grid-template-rows: auto 1fr auto;
		}

		.header {
			border-bottom: 1px solid var(--border-color);
			background-color: var(--primary-container-color);

			@media (max-width: 768px) {
				background: none;
				border: none;
			}

			.menu-bar {
				border-bottom: 1px var(--border-color) solid;
				padding: 1rem;
				display: grid;
				grid-template-columns: repeat(3, 1fr);

				h4 {
					justify-self: center;
				}

				.button-container {
					display: flex;
					gap: 0.25rem;
					justify-self: flex-end;

					.action-button {
						appearance: none;
						all: unset;
						height: 1.5rem;
						width: 1.5rem;
						border: 1px solid var(--border-color);
						background-color: var(--primary-container-color);
						display: grid;
						place-items: center;
						cursor: pointer;

						&:hover {
							background-color: var(--accent-color);
						}
					}
				}

				@media (max-width: 768px) {
					grid-template-columns: 1fr;
					padding: 0;
					border: none;

					h4 {
						justify-self: flex-start;
					}

					p {
						justify-self: flex-end;
					}
				}
			}

			.progress-container {
				display: flex;
				align-items: center;
				padding: 1rem 5rem;
				gap: 0.25rem;
				margin-bottom: 1.5rem;

				@media (max-width: 768px) {
					// padding: 0 2rem;
					padding: 0;
					overflow-x: scroll;
					margin-bottom: 3rem;
					height: 5rem;
					padding-left: calc(50vw - 1rem);
					margin-left: -1rem;
					margin-right: -1rem;
					scroll-snap-type: x mandatory;

					&::-webkit-scrollbar {
						display: none;
					}
				}

				.number {
					height: 2rem;
					width: 2rem;
					background-color: var(--secondary-container-color);
					display: grid;
					place-items: center;
					// border-radius: 100%;
					border: 1px solid var(--border-color);
					// flex: 1 0 2rem;
					position: relative;
					font-weight: 500;
					scroll-snap-align: center;
					font-family: "JetBrains Mono";

					@media (max-width: 768px) {
						flex: 1 0 2rem;
					}

					.title {
						position: absolute;
						bottom: -1.5rem;
						white-space: nowrap;
					}

					&.active {
						background-color: var(--accent-color);

						.title {
							color: white;
						}
					}

					&.done {
						background-color: var(--accent-color);
					}
				}

				.progress-line-container {
					height: 0.125rem;
					width: 100%;
					transition: background-color 0.2s ease;
					background-color: var(--border-color);
					flex: 1 1 0;

					@media (max-width: 768px) {
						flex: 0 0 100%;
					}

					.progress {
						height: 100%;
						width: 0%;
						background-color: var(--accent-color);
						transition: width 0.2s ease;
					}

					&.active {
						.progress {
							// width: 50%;
						}
					}

					&.done {
						.progress {
							width: 100%;
						}
					}
				}

				.progress-line-segments {
					display: flex;
					gap: 0.125rem;
					flex: 1 1 0;
				}
			}
		}

		.steps {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			// padding: 1rem;
			max-height: 43rem;
			overflow-y: scroll;
		}

		.step-accordion {
			border: 1px solid var(--border-color);
			background: var(--bg-color);

			&.active {
				flex: 0 1 100%;
			}
		}

		.step-header {
			all: unset;
			width: 100%;
			display: flex;
			align-items: center;
			gap: 0.75rem;
			// padding: 0.75rem 1rem;
			cursor: pointer;
			border-bottom: 1px solid transparent;

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}

		.step-accordion.active .step-header {
			border-bottom-color: var(--border-color);
			background: var(--primary-container-color);
		}

		.step-number {
			height: 2rem;
			width: 2rem;
			display: grid;
			place-items: center;
			border: 1px solid var(--border-color);
			background: var(--secondary-container-color);
			font-family: "JetBrains Mono";
		}

		.step-body {
			height: 100%;
		}

		.footer {
			border-top: 1px solid var(--border-color);
			padding: 0 1rem;

			@media (max-width: 768px) {
				margin-left: -1rem;
				margin-right: -1rem;
				padding: 1rem;
				gap: 1rem;
			}
		}
	}

	.test {
	}
</style>
