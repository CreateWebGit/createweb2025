<script lang="ts">
	import type { BookingData } from "$lib/models/booking";

	interface Props {
		booking: BookingData;
		updateBooking: (patch: Partial<BookingData>) => void;
	}

	const { booking, updateBooking }: Props = $props();

	let contactDetails = $state(booking.contactDetails);

	$effect(() => {
		updateBooking({ contactDetails });
	});

	export function canProceed() {
		//super simple validation for next step
		return (
			contactDetails.first_name.trim().length > 1 &&
			contactDetails.last_name.trim().length > 1 &&
			contactDetails.email.trim().length > 1 &&
			contactDetails.phone.trim().length > 1
		);
	}
</script>

<div class="content-container">
	<div class="content-description">
		<h4>Lite mer om dig</h4>
		<p class="mt-1">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
			nemo, deleniti quos cupiditate nisi asperiores eligendi at
			praesentium voluptatibus unde.
		</p>
	</div>
	<div class="input-container">
		<div class="d-flex">
			<input
				type="text"
				placeholder="Förnamn"
				bind:value={contactDetails.first_name}
			/>
			<input
				type="text"
				placeholder="Efternamn"
				bind:value={contactDetails.last_name}
			/>
		</div>
		<div class="d-flex">
			<input
				type="text"
				placeholder="E-mail"
				bind:value={contactDetails.email}
			/>
			<input
				type="text"
				placeholder="Telefonnummer"
				bind:value={contactDetails.phone}
			/>
		</div>
		<div class="d-flex">
			<input
				type="text"
				placeholder="Företag"
				bind:value={contactDetails.company}
			/>
			<input
				type="text"
				placeholder="Nuvarande hemsida"
				bind:value={contactDetails.website}
			/>
		</div>
		<p>
			Genom att skicka detta formulär godkänner du att vi lagrar och
			behandlar dina personuppgifter i enlighet med vår <a
				class="link-body"
				href="/integritetspolicy">integritetspolicy</a
			>.
		</p>
	</div>
</div>

<style lang="scss">
	.content-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 4rem;
		margin-top: 3rem;

		@media (max-width: 768px) {
			gap: 0;
			margin-top: 0;

			.content-description {
				margin-top: 1rem;
				p {
					display: none;
				}
			}
		}

		p {
			max-width: 60ch;
		}

		.input-container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding: 1rem;
			width: 50rem;
			margin: 0 auto;

			@media (max-width: 768px) {
				width: 100%;

				.d-flex {
					// flex-direction: column;
				}
			}

			p {
				max-width: unset;
				font-size: 0.75rem;
			}

			.d-flex {
				gap: 1rem;
			}

			input[type="text"] {
				appearance: none;
				border: 1px solid var(--border-color);
				background-color: var(--secondary-container-color);
				font-family: "Inter Display";
				font-size: 0.95rem;
				padding: 0.95rem 0.5rem;
				border-radius: 0;
				width: 100%;
				transition: border-color 0.2s ease;

				&::placeholder {
					color: rgba(255, 255, 255, 0.5);
				}

				&:focus {
					outline: none;
					border-color: 1px solid var(--bw);
				}
			}
		}
	}
</style>
