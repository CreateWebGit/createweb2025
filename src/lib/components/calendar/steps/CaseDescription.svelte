<script lang="ts">
	import {
		SERVICE_QUESTIONS,
		type ServiceId,
		type ServiceQuestion,
	} from "$lib/models/serviceQuestions";

	import type { BookingData } from "$lib/models/booking";

	import Browsers from "phosphor-svelte/lib/Browsers";
	import ChartLine from "phosphor-svelte/lib/ChartLine";
	import Wrench from "phosphor-svelte/lib/Wrench";
	import StripedContainer from "../../layout/StripedContainer.svelte";

	const { booking, updateBooking } = $props<{
		booking: BookingData;
		updateBooking: (patch: Partial<BookingData>) => void;
	}>();

	// index 0 = välj tjänst, 1..N = frågor
	let subStep = $state(0);

	const activeService = $derived(booking.caseDescription.service || "");
	const questions = $derived<ServiceQuestion[]>(
		!activeService
			? []
			: (SERVICE_QUESTIONS[activeService as ServiceId] ?? [])
	);

	const totalSubSteps = $derived(1 + questions.length); // 0 = tjänst
	const isFirstSub = $derived(subStep === 0);
	const isLastSub = $derived(subStep === totalSubSteps - 1);

	const currentQuestion = $derived<ServiceQuestion | null>(
		subStep === 0 ? null : (questions[subStep - 1] ?? null)
	);

	function setService(service: ServiceId | "") {
		const newCaseDescription = {
			...booking.caseDescription,
			service,
		};

		updateBooking({
			caseDescription: newCaseDescription,
		});

		// if (service) {
		// 	subStep = 1;
		// } else {
		// 	subStep = 0;
		// }
	}

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

	function setAnswer(key: string, value: string) {
		const svc = booking.caseDescription.service as ServiceId;
		if (!svc) return;

		const currentAnswers =
			booking.caseDescription.serviceSpecificAnswers ?? {};
		const svcAnswers = currentAnswers[svc] ?? {};

		const newServiceSpecificAnswers: Partial<
			Record<ServiceId, Record<string, string>>
		> = {
			...currentAnswers,
			[svc]: {
				...svcAnswers,
				[key]: value,
			},
		};

		const newCaseDescription = {
			...booking.caseDescription,
			serviceSpecificAnswers: newServiceSpecificAnswers,
		};

		updateBooking({
			caseDescription: newCaseDescription,
		});
	}

	function getAnswer(key: string): string {
		const svc = booking.caseDescription.service as ServiceId;
		if (!svc) return "";

		const allAnswers = booking.caseDescription.serviceSpecificAnswers ?? {};
		const bucket = allAnswers[svc] ?? {};

		return bucket[key] ?? "";
	}

	function allRequiredAnswered(): boolean {
		//returnar true om vi har svarat på alla frågor
		const svc = booking.caseDescription.service as ServiceId;
		if (!svc) return false;
		const qs = SERVICE_QUESTIONS[svc] ?? [];

		return qs.every((q) => {
			if (!q.required) return true;
			const v = getAnswer(q.id).trim();
			return v.length > 0;
		});
	}

	export function canGoToNextSub(): boolean {
		// 0: måste ha valt tjänst
		if (subStep === 0) {
			return !!booking.caseDescription.service;
		}

		// 1..N: kolla aktuell fråga
		if (!currentQuestion) return false;

		if (!currentQuestion.required) return true;

		const v = getAnswer(currentQuestion.id).trim();
		if (!v) return false;

		// extra specialfall om du vill kräva "other"-fält etc kan läggas här
		return true;
	}

	export function nextSub() {
		if (!canGoToNextSub()) return;
		if (!isLastSub) {
			subStep++;
		}
	}

	export function prevSub(): boolean {
		if (!isFirstSub) {
			subStep--;
			return true;
		}

		return false;
	}

	export function getSubProgress() {
		return { current: subStep, total: totalSubSteps };
	}

	// används av övergripande wizard för att gå till nästa huvudsteg
	export function canProceed() {
		return !!booking.caseDescription.service && allRequiredAnswered();
	}

	let services = [
		{
			value: "webdev",
			label: "Webbutveckling",
			icon: Browsers,
		},
		{
			value: "marketing",
			label: "Marknadsföring",
			icon: ChartLine,
		},
		{
			value: "support",
			label: "Underhåll & Support",
			icon: Wrench,
		},
	];

	// let activeIcon = $derived()
</script>

<div class="substep-content">
	{#if subStep === 0}
		<div class="substep-content-container">
			<div class="substep-description">
				<h4>Vilken typ av tjänst gäller det?</h4>
				<p class="mt-1">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Excepturi nemo, deleniti quos cupiditate nisi asperiores
					eligendi at praesentium voluptatibus unde.
				</p>
			</div>
			<div class="substep-answer-card-container">
				{#each services as service}
					{@const Icon = service.icon}
					<button
						onclick={() => setService(service.value as ServiceId)}
						class="substep-answer-card"
						class:selected={activeService === service.value}
					>
						{#if isDesktop}
							<Icon
								size={"3rem"}
								weight="duotone"
								color="var(--accent-color)"
							/>
						{:else}
							<Icon
								size={"1.5rem"}
								weight="duotone"
								color="var(--accent-color)"
							/>
						{/if}
						<p>{service.label}</p>
					</button>
				{/each}
			</div>
		</div>
	{:else if currentQuestion}
		{#if currentQuestion.type === "textarea"}
			<div class="substep-content-container">
				<div class="substep-description">
					<h4>{currentQuestion.question}</h4>
					<p class="mt-1">
						{currentQuestion.description}
					</p>
				</div>
				<StripedContainer>
					<textarea
						value={getAnswer(currentQuestion.id)}
						oninput={(e) =>
							setAnswer(
								currentQuestion.id,
								e.currentTarget.value
							)}
						placeholder="Ordet är ditt..."
					></textarea>
				</StripedContainer>
			</div>
		{:else if currentQuestion.type === "select"}
			<div class="substep-content-container">
				<div class="substep-description">
					<h4>{currentQuestion.question}</h4>
					<p class="mt-1">
						{currentQuestion.description}
					</p>
				</div>
				<div class="substep-answer-card-container">
					{#each currentQuestion.options as opt}
						{@const Icon = opt.icon}
						<button
							onclick={() =>
								setAnswer(currentQuestion.id, opt.value)}
							class="substep-answer-card"
							class:selected={getAnswer(currentQuestion.id) ===
								opt.value}
						>
							{#if isDesktop}
								<Icon
									size={"3rem"}
									weight="duotone"
									color="var(--accent-color)"
								/>
							{:else}
								<Icon
									size={"1.5rem"}
									weight="duotone"
									color="var(--accent-color)"
								/>
							{/if}
							<p>{opt.value}</p>
						</button>
					{/each}
				</div>
				{#if currentQuestion.id === "status" && getAnswer(currentQuestion.id) === "Ja"}
					<input
						type="text"
						placeholder="Länk till befintlig sida"
						value={getAnswer(`${currentQuestion.id}_other`)}
						oninput={(e) =>
							setAnswer(
								`${currentQuestion.id}_other`,
								e.currentTarget.value
							)}
					/>
				{/if}
			</div>
		{:else}
			<!-- text -->

			{#if currentQuestion.id === "inspo"}
				<div class="substep-content-container">
					<div class="substep-description">
						<h4>{currentQuestion.question}</h4>
						<p class="mt-1">
							{currentQuestion.description}
						</p>
					</div>
					<input
						type="text"
						placeholder="Klistra in dom här"
						value={getAnswer(currentQuestion.id)}
						oninput={(e) =>
							setAnswer(
								currentQuestion.id,
								e.currentTarget.value
							)}
					/>
				</div>
			{/if}
		{/if}
	{:else}
		<p>Ingen fråga att visa.</p>
	{/if}
</div>

<style>
	.substep-content {
		height: 100%;

		.substep-content-container {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: 4rem;
			margin-top: 3rem;
			padding: 1rem;

			@media (max-width: 768px) {
				gap: 0;
				margin-top: 0;

				.substep-description {
					margin-bottom: 1rem;
					p {
						display: none;
					}
				}
			}

			p {
				max-width: 60ch;
			}

			textarea {
				appearance: none;
				background-color: transparent;
				text-align: left;
				height: 15rem;
				width: 40rem;
				border: none;
				resize: none;
				font-family: "Inter Display";
				font-size: 1rem;
				padding: 1rem;
				line-height: 1.5;

				@media (max-width: 768px) {
					width: 85vw;
				}

				&:focus {
					outline: none;
				}
			}

			.substep-answer-card-container {
				display: flex;
				gap: 1rem;
				flex-wrap: wrap;
				justify-content: center;
				width: 75%;

				@media (max-width: 768px) {
					display: grid;
					grid-template-columns: 1fr 1fr;
					width: 100%;
				}

				.substep-answer-card {
					appearance: none;
					height: 7.5rem;
					width: 12rem;
					border: 1px solid var(--border-color);
					background-color: var(--secondary-container-color);
					display: flex;
					flex-direction: column;
					align-items: center;
					cursor: pointer;
					padding: 1rem 0;
					justify-content: space-between;

					@media (max-width: 768px) {
						width: 100%;
						flex-direction: row;
						justify-content: flex-start;
						padding: 1rem;
						gap: 1rem;
						height: fit-content;
					}

					p {
						color: white;
						font-size: 0.85rem;
						font-weight: 600;
					}

					&.selected {
						border-color: white;
					}

					&:hover {
						border-color: white;
					}
				}
			}

			input[type="text"] {
				appearance: none;
				border: 1px solid var(--border-color);
				background-color: var(--secondary-container-color);
				font-family: "Inter Display";
				font-size: 0.85rem;
				padding: 0.75rem 0.5rem;
				border-radius: 0;
				width: 25rem;

				@media (max-width: 768px) {
					width: 100%;
				}

				&:focus {
					outline: none;
				}
			}
		}
	}
</style>
