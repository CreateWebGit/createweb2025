<script lang="ts">
	import type { BookingData } from "$lib/models/booking";
	import {
		SERVICE_QUESTIONS,
		type ServiceId,
		type ServiceQuestion,
	} from "$lib/models/serviceQuestions";

	interface Props {
		booking: BookingData;
		updateBooking: (patch: Partial<BookingData>) => void;
	}

	const { booking, updateBooking }: Props = $props();
	const activeService = $derived(booking.caseDescription.service || "");

	const formatted = new Date(booking.selectedDate).toLocaleDateString(
		"sv-SE",
		{
			weekday: "long",
			month: "long",
			day: "numeric",
		}
	);

	function formatTime(iso: string) {
		return new Date(iso).toLocaleTimeString("sv-SE", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	export function canProceed() {
		return;
	}
</script>

<h4 class="text-center">Ser allt korrekt ut?</h4>

<div class="summary-container">
	<div>
		<p class="subheading text-accent">Mötesdetaljer</p>
		<p>
			Datum: {formatted}
		</p>
		<p>
			Tid: {formatTime(booking.selectedTime.start)} – {formatTime(
				booking.selectedTime.end
			)}
		</p>
		<p>Var: Google Meet</p>
		<p>Med: Createweb</p>
	</div>

	<div>
		<p class="subheading text-accent">Era detaljer</p>
		<p>
			Namn: {booking.contactDetails.first_name}
			{booking.contactDetails.first_name}
		</p>
		<p>
			E-mail: {booking.contactDetails.email}
		</p>
		<p>
			Telefonnummer: {booking.contactDetails.phone}
		</p>
		<p>
			Företag: {booking.contactDetails.company}
		</p>
		<p>
			Hemsida: {booking.contactDetails.website}
		</p>
	</div>

	<div>
		<p class="subheading text-accent">Projekt</p>
		<p>
			Tjänst: {booking.caseDescription.service}
		</p>
		<p>
			Vad som behövs: {booking.caseDescription.serviceSpecificAnswers[
				activeService as ServiceId
			]?.needs || ""}
		</p>
		<p>
			Mål: {booking.caseDescription.serviceSpecificAnswers[
				activeService as ServiceId
			]?.goals || ""}
		</p>
		<p>
			Budget: {booking.caseDescription.serviceSpecificAnswers[
				activeService as ServiceId
			]?.budget || ""}
		</p>
		<p>
			Tidslinje: {booking.caseDescription.serviceSpecificAnswers[
				activeService as ServiceId
			]?.timeline || ""}
		</p>
	</div>

	<div>
		<p class="subheading text-accent">Projektbeskrivning</p>
		<p>
			Beskrivning: {booking.caseDescription.serviceSpecificAnswers[
				activeService as ServiceId
			]?.description || ""}
		</p>
	</div>
</div>

<style lang="scss">
	.summary-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		padding: 1rem;

		div {
			border: 1px solid var(--border-color);
			background-color: var(--primary-container-color);
			padding: 1rem;
		}

		.subheading {
			margin-bottom: 1rem;
		}
	}
</style>
