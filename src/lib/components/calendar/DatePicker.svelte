<script lang="ts">
	interface Props {
		changeSelectedDate: (selectedDate: Date) => void;
	}

	let { changeSelectedDate }: Props = $props();
	//we store todays date to use as a reference
	const today = new Date();

	//currently picked date
	let selectedDate = $state(new Date());

	//a date pointing to the first day of the visible month (eg. 2025-12-01)
	let currentMonth = $state(
		new Date(today.getFullYear(), today.getMonth(), 1)
	);

	//two-dimensional array, outer array stores the weeks, inner array contains 7 cells (monday through sunday)
	let weeks = $state<(Date | null)[][]>([]);

	let monthLabel = $state("");
	const weekdays = ["mån", "tis", "ons", "tor", "fre", "lör", "sön"];

	function isSameDay(a: Date, b: Date) {
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	function isPastDay(d: Date) {
		const t = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate()
		);
		const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		return day < t;
	}

	function isWeekend(d: Date) {
		const day = d.getDay();
		return day === 0 || day === 6; // Sunday = 0, Saturday = 6
	}

	function formatDate(d: Date) {
		return d.toLocaleDateString("sv-SE", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	$effect(() => {
		monthLabel = currentMonth.toLocaleDateString("sv-SE", {
			month: "long",
			year: "numeric",
		});
	});

	/*
		COMPUTE WEEKS:
		we identify the current month through currentMonth
	*/
	function recomputeWeeks() {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();

		//calculate first of the month selected
		const firstOfMonth = new Date(year, month, 1);

		//calculate, classic 0th day of the next month shenanigans
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		//js getDay returns sunday as the first day of the week, i.e. sunday = 0
		//shuffle index so that monday is the first day of the week, and sunday last.
		const firstDayIndex = (firstOfMonth.getDay() + 6) % 7;

		const cells: (Date | null)[] = [];

		//leading empty cells BEFORE first day
		for (let i = 0; i < firstDayIndex; i++) {
			cells.push(null);
		}

		//all days
		for (let day = 1; day <= daysInMonth; day++) {
			cells.push(new Date(year, month, day));
		}

		//pad to full weeks (multiples of 7)
		while (cells.length % 7 !== 0) {
			cells.push(null);
		}

		/*
		
		//slice week array per 7 days.
		weeks: [
			[null, null, 1st, 2nd, 3rd, 4th, 5th],
			[6th, 7th, 8th, 9th, 10th, 11th, 12th],
		]
		*/

		const w: (Date | null)[][] = [];
		for (let i = 0; i < cells.length; i += 7) {
			w.push(cells.slice(i, i + 7));
		}

		weeks = w;
	}

	//recompute whenever currentMonth changes
	$effect(recomputeWeeks);

	//decrements currentmonth by 1, recomputes weeks
	function goToPrevMonth() {
		currentMonth = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() - 1,
			1
		);
	}

	//increments currentmonth by 1, recomputes weeks
	function goToNextMonth() {
		currentMonth = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() + 1,
			1
		);
	}

	async function selectDate(d: Date) {
		if (isPastDay(d) || isWeekend(d)) return;
		selectedDate = d;
		changeSelectedDate(d);
	}
</script>

<div class="month-picker">
	<div class="month-header">
		<button type="button" onclick={goToPrevMonth}>&lt;</button>
		<p class="month-label subheading text-white">
			{monthLabel}
		</p>
		<button type="button" onclick={goToNextMonth}>&gt;</button>
	</div>

	<div class="weekday-row">
		{#each weekdays as name}
			<div class="weekday">{name}</div>
		{/each}
	</div>

	<div class="weeks">
		{#each weeks as week}
			{#each week as day}
				{#if day === null}
					<div class="day empty monochrome-striped-background"></div>
				{:else}
					{@const d = day as Date}
					{@const past = isPastDay(d)}
					<button
						type="button"
						class:today={isSameDay(d, today)}
						class:selected={isSameDay(d, selectedDate)}
						onclick={() => !past && selectDate(d)}
						disabled={past || isWeekend(d)}
					>
						{d.getDate()}
					</button>
				{/if}
			{/each}
		{/each}
	</div>
</div>

<style lang="scss">
	.month-picker {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		// max-width: 400px;
		width: 100%;
		padding: 1rem;
		height: 100%;
	}

	.month-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.month-header button {
		padding: 0.25rem 0.5rem;
		background: rgba(255, 255, 255, 0);
		border: none;
		cursor: pointer;
	}

	.month-label {
		font-weight: 600;
		text-transform: uppercase;
	}

	.weekday-row {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		font-size: 0.75rem;
		text-align: center;
		color: #777;
		font-family: "JetBrains Mono";
	}

	.weeks {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		height: 100%;
		border-top: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
	}

	.weeks button,
	.weeks .empty {
		width: 100%;
		// aspect-ratio: 1 / 1;
		height: 100%;
		font-size: 0.9rem;
		border-right: 1px solid var(--border-color);
		border-bottom: 1px solid var(--border-color);
	}

	.weeks button {
		border: none;
		background: rgba(255, 255, 255, 0);
		border-right: 1px solid var(--border-color);
		border-bottom: 1px solid var(--border-color);
		cursor: pointer;
		color: var(--accent-color);
	}

	.weeks button.today {
		font-weight: 600;
	}

	.weeks button.selected {
		// background: #000;
		// color: #fff;
		background-color: var(--accent-color);
		color: white;
		font-weight: 600;
	}

	//we use disabled to mark past, and unavailable days, this still needs to be validated server side
	.weeks button:disabled {
		color: rgba(255, 255, 255, 0.25);
		cursor: default;
	}
</style>
