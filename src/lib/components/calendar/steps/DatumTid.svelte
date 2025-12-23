<script lang="ts">
	import DatePicker from "../DatePicker.svelte";
	import type { BookingData } from "$lib/models/booking";
	import WheelPicker from "../../WheelPicker.svelte";
	import type { DataOption } from "../../WheelPicker.svelte";

	interface Props {
		booking: BookingData;
		updateBooking: (patch: Partial<BookingData>) => void;
	}

	const { booking, updateBooking }: Props = $props();

	let date = $state(booking.selectedDate);
	let time = $state(booking.selectedTime);

	let loadingSlots = $state(false);
	let selectedSlot = $state<{ start: string; end: string } | null>(null);
	let slots = $state<{ start: string; end: string }[]>([]);

	//sync changes up to parent
	$effect(() => {
		updateBooking({ selectedDate: date, selectedTime: time });
	});

	$effect(() => {
		const y = String(year.value);
		const m = String(month.value).padStart(2, "0");
		const d = String(day.value).padStart(2, "0");
		date = `${y}-${m}-${d}`;
		loadSlotsForDate(date);
	});

	function changeSelectedDate(selectedDate: Date) {
		date = formatDate(selectedDate);
		loadSlotsForDate(date);
	}

	function formatDate(d: Date) {
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, "0");
		const day = String(d.getDate()).padStart(2, "0");
		return `${y}-${m}-${day}`;
	}

	function formatTime(iso: string) {
		return new Date(iso).toLocaleTimeString("sv-SE", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	async function loadSlotsForDate(date: string) {
		loadingSlots = true;
		selectedSlot = null;
		slots = [];

		const res = await fetch(`/api/slots?date=${date}`);
		if (!res.ok) {
			loadingSlots = false;
			return;
		}

		const data = await res.json();
		slots = data.slots;
		loadingSlots = false;
	}

	const dayOptions: DataOption[] = [
		{ value: 1, label: "01" },
		{ value: 2, label: "02" },
		{ value: 3, label: "03" },
		{ value: 4, label: "04" },
		{ value: 5, label: "05" },
		{ value: 6, label: "06" },
		{ value: 7, label: "07" },
		{ value: 8, label: "08" },
		{ value: 9, label: "09" },
		{ value: 10, label: "10" },
		{ value: 11, label: "11" },
		{ value: 12, label: "12" },
		{ value: 13, label: "13" },
		{ value: 14, label: "14" },
		{ value: 15, label: "15" },
		{ value: 16, label: "16" },
		{ value: 17, label: "17" },
		{ value: 18, label: "18" },
		{ value: 19, label: "19" },
		{ value: 20, label: "20" },
		{ value: 21, label: "21" },
		{ value: 22, label: "22" },
		{ value: 23, label: "23" },
		{ value: 24, label: "24" },
		{ value: 25, label: "25" },
		{ value: 26, label: "26" },
		{ value: 27, label: "27" },
		{ value: 28, label: "28" },
		{ value: 29, label: "29" },
		{ value: 30, label: "30" },
		{ value: 31, label: "31" },
	];

	const monthOptions: DataOption[] = [
		{ value: 1, label: "Januari" },
		{ value: 2, label: "Februari" },
		{ value: 3, label: "Mars" },
		{ value: 4, label: "April" },
		{ value: 5, label: "Maj" },
		{ value: 6, label: "Juni" },
		{ value: 7, label: "Juli" },
		{ value: 8, label: "Augusti" },
		{ value: 9, label: "September" },
		{ value: 10, label: "Oktober" },
		{ value: 11, label: "November" },
		{ value: 12, label: "December" },
	];

	const yearOptions: DataOption[] = [
		{ value: 2025, label: "2025" },
		{ value: 2026, label: "2026" },
	];

	let year = $state<DataOption>(yearOptions[0]);
	let month = $state<DataOption>(monthOptions[0]);
	let day = $state<DataOption>(dayOptions[0]);

	export function canProceed() {
		return !!date && !!time.start;
	}
</script>

<div class="date-time-container">
	<DatePicker {changeSelectedDate} />

	{#if loadingSlots}
		<div class="slots no-dates">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2.625rem"
				height="2.625rem"
				stroke="var(--accent-color)"
				viewBox="0 0 24 24"
				><g
					><circle
						cx="12"
						cy="12"
						r="9.5"
						fill="none"
						stroke-width="2"
						stroke-linecap="round"
						><animate
							attributeName="stroke-dasharray"
							dur="1.5s"
							calcMode="spline"
							values="0 150;42 150;42 150;42 150"
							keyTimes="0;0.475;0.95;1"
							keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
							repeatCount="indefinite"
						/><animate
							attributeName="stroke-dashoffset"
							dur="1.5s"
							calcMode="spline"
							values="0;-16;-59;-59"
							keyTimes="0;0.475;0.95;1"
							keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
							repeatCount="indefinite"
						/></circle
					><animateTransform
						attributeName="transform"
						type="rotate"
						dur="2s"
						values="0 12 12;360 12 12"
						repeatCount="indefinite"
					/></g
				></svg
			>
		</div>
	{:else if slots.length === 0}
		<div class="slots no-dates">Inga lediga tider denna dag.</div>
	{:else}
		<div class="slots">
			{#each slots as slot}
				<button
					class:selected={booking.selectedTime &&
						booking.selectedTime.start === slot.start}
					onclick={() => (time = slot)}
				>
					{formatTime(slot.start)} – {formatTime(slot.end)}
				</button>
			{/each}
		</div>
	{/if}
</div>

<div class="date-time-wheel-container hide-desktop">
	<div class="wheels" style="width: 100%">
		<WheelPicker
			data={yearOptions}
			style="width: 100%; height: 10rem; font-size: 1rem;"
			bind:selectedOption={year}
		/>
		<WheelPicker
			data={monthOptions}
			options={{ density: 2 }}
			style="width: 100%; height: 10rem; font-size: 1rem;"
			bind:selectedOption={month}
		/>
		<WheelPicker
			data={dayOptions}
			style="width: 100%; height: 10rem; font-size: 1rem;"
			bind:selectedOption={day}
		/>
	</div>

	{#if loadingSlots}
		<div class="slots no-dates">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2.625rem"
				height="2.625rem"
				stroke="var(--accent-color)"
				viewBox="0 0 24 24"
				><g
					><circle
						cx="12"
						cy="12"
						r="9.5"
						fill="none"
						stroke-width="2"
						stroke-linecap="round"
						><animate
							attributeName="stroke-dasharray"
							dur="1.5s"
							calcMode="spline"
							values="0 150;42 150;42 150;42 150"
							keyTimes="0;0.475;0.95;1"
							keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
							repeatCount="indefinite"
						/><animate
							attributeName="stroke-dashoffset"
							dur="1.5s"
							calcMode="spline"
							values="0;-16;-59;-59"
							keyTimes="0;0.475;0.95;1"
							keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
							repeatCount="indefinite"
						/></circle
					><animateTransform
						attributeName="transform"
						type="rotate"
						dur="2s"
						values="0 12 12;360 12 12"
						repeatCount="indefinite"
					/></g
				></svg
			>
		</div>
	{:else if slots.length === 0}
		<div class="slots no-dates">Inga lediga tider denna dag.</div>
	{:else}
		<div class="slots">
			{#each slots as slot}
				<button
					class:selected={booking.selectedTime &&
						booking.selectedTime.start === slot.start}
					onclick={() => (time = slot)}
				>
					{formatTime(slot.start)} – {formatTime(slot.end)}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.date-time-container {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;

		@media (max-width: 768px) {
			display: none;
		}

		.slots {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			padding: 1rem;
			align-items: flex-start;
			align-content: flex-start;

			&.no-dates {
				grid-template-columns: 1fr;
				display: grid;
				place-items: center;
			}

			button {
				appearance: none;
				border: none;
				background-color: transparent;
				border: 1px solid var(--border-color);
				cursor: pointer;
				// height: 4rem;
				padding: 1rem;

				&:hover {
					background-color: var(--primary-container-color);
				}

				&.selected {
					border: 1px solid var(--accent-color);
				}
			}
		}
	}

	.date-time-wheel-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		.wheels {
			display: flex;
		}

		.slots {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			padding: 1rem;
			max-height: 20rem;
			overflow-y: scroll;
			margin-top: 1rem;
			flex-direction: column;

			&.no-dates {
				grid-template-columns: 1fr;
				place-items: center;
			}

			button {
				appearance: none;
				color: white;
				border: none;
				background-color: transparent;
				border: 1px solid var(--border-color);
				cursor: pointer;
				padding: 1rem 1.5rem;

				&:hover {
					background-color: var(--primary-container-color);
				}

				&.selected {
					border: 1px solid var(--accent-color);
				}
			}
		}
	}
</style>
