<script lang="ts">
	let today = new Date();
	let selectedDate = $state(new Date());
	let slots = $state<{ start: string; end: string }[]>([]);
	let loadingSlots = $state(false);
	let selectedSlot = $state<{ start: string; end: string } | null>(null);
	let name = $state("");
	let email = $state("");
	let bookingState = $state<"idle" | "loading" | "success" | "error">("idle");
	let errorMessage = $state("");

	function formatDate(d: Date) {
		return d.toLocaleDateString("sv-SE", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	function formatTime(iso: string) {
		return new Date(iso).toLocaleTimeString("sv-SE", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	async function loadSlotsForDate(date: Date) {
		loadingSlots = true;
		selectedSlot = null;
		slots = [];

		const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD

		const res = await fetch(`/api/slots?date=${dateStr}`);
		if (!res.ok) {
			loadingSlots = false;
			return;
		}

		const data = await res.json();
		slots = data.slots;
		loadingSlots = false;
	}

	function onDateClick(offset: number) {
		const d = new Date(today);
		d.setDate(today.getDate() + offset);
		selectedDate = d;
		loadSlotsForDate(d);
	}

	async function bookSelectedSlot() {
		if (!selectedSlot || !email) {
			return;
		}

		bookingState = "loading";
		errorMessage = "";

		const res = await fetch("/api/book", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				start: selectedSlot.start,
				end: selectedSlot.end,
				name,
				email,
			}),
		});

		if (!res.ok) {
			bookingState = "error";
			errorMessage = "Booking failed. Try again.";
			return;
		}

		bookingState = "success";
	}

	// Load slots for today initially
	$effect(() => {
		loadSlotsForDate(selectedDate);
	});
</script>

<div class="booking">
	<div class="left">
		<h2>Välj datum</h2>
		<!-- super simple date list: today + next 6 days -->
		<ul>
			{#each Array.from({ length: 7 }) as _, i}
				{@const date = new Date(
					today.getFullYear(),
					today.getMonth(),
					today.getDate() + i
				)}
				<li>
					<button
						class:selected={date.toDateString() ===
							selectedDate.toDateString()}
						onclick={() => onDateClick(i)}
					>
						{date.toLocaleDateString("sv-SE", {
							weekday: "short",
							day: "numeric",
							month: "short",
						})}
					</button>
				</li>
			{/each}
		</ul>
	</div>

	<div class="right">
		<h2>{formatDate(selectedDate)}</h2>

		{#if loadingSlots}
			<p>Laddar tider...</p>
		{:else if slots.length === 0}
			<p>Inga lediga tider denna dag.</p>
		{:else}
			<div class="slots">
				{#each slots as slot}
					<button
						class:selected={selectedSlot &&
							selectedSlot.start === slot.start}
						onclick={() => (selectedSlot = slot)}
					>
						{formatTime(slot.start)} – {formatTime(slot.end)}
					</button>
				{/each}
			</div>
		{/if}

		<div class="form">
			<h3>Dina uppgifter</h3>
			<label>
				Namn
				<input bind:value={name} placeholder="Ditt namn (valfritt)" />
			</label>
			<label>
				E-post
				<input
					bind:value={email}
					type="email"
					placeholder="din@epost.se"
				/>
			</label>

			<button
				onclick={bookSelectedSlot}
				disabled={!selectedSlot || !email || bookingState === "loading"}
			>
				{#if bookingState === "loading"}
					Bokar...
				{:else}
					Boka valt möte
				{/if}
			</button>

			{#if bookingState === "success"}
				<p class="success">
					Bokat! Kolla din e-post för kalenderinbjudan.
				</p>
			{/if}
			{#if bookingState === "error"}
				<p class="error">{errorMessage}</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.booking {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 2rem;
		align-items: flex-start;
	}
	.left ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.left button,
	.slots button {
		width: 100%;
		padding: 0.5rem 0.75rem;
		margin-bottom: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		cursor: pointer;
	}
	button.selected {
		border-color: #000;
		font-weight: 600;
	}
	.slots {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
	.form label {
		display: block;
		margin-bottom: 0.75rem;
	}
	.form input {
		width: 100%;
		padding: 0.4rem 0.6rem;
		border-radius: 0.4rem;
		border: 1px solid #ccc;
	}
	.success {
		color: green;
		margin-top: 0.5rem;
	}
	.error {
		color: red;
		margin-top: 0.5rem;
	}

	@media (max-width: 700px) {
		.booking {
			grid-template-columns: 1fr;
		}
	}
</style>
