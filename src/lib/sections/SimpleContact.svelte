<script lang="ts">
	import Section from "../components/grid/Section.svelte";
	import Column from "../components/grid/Column.svelte";
	import ColumnButton from "../components/ColumnButton.svelte";

	interface ContactForm {
		name: string;
		email: string;
		message: string;
	}

	let contactForm = $state<ContactForm>({
		name: "",
		email: "",
		message: "",
	});

	let submitting = $state(false);
	let submitted = $state(false);

	async function submitForm() {
		console.log("submitting form");
		submitting = true;

		const res = await fetch(`http://server.createweb.se:3000/api/contact`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(contactForm),
		});

		if (!res.ok) {
			throw new Error(await res.text());
		}

		if (res.ok) {
			submitting = false;
			contactForm = {
				name: "",
				email: "",
				message: "",
			};
		}

		return await res.json();
	}
</script>

<div id="kontakt">
	<Section lines={"XXX-X"} class="py-8">
		<Column span={6}>
			<h2>Kontakta oss</h2>
		</Column>
		<Column span={6}>
			<div class="input-wrapper">
				<input
					disabled={submitting || submitted}
					placeholder="Namn"
					type="text"
					name=""
					bind:value={contactForm.name}
				/>
				<input
					disabled={submitting || submitted}
					placeholder="E-postadress"
					type="text"
					name=""
					bind:value={contactForm.email}
				/>
				<textarea
					disabled={submitting || submitted}
					placeholder="Meddelande"
					bind:value={contactForm.message}
				></textarea>
				<!-- <button onclick={() => submitForm()}>Skicka</button> -->
				<ColumnButton
					type="button"
					onClick={submitForm}
					borderTop={false}
					width={2}
					buttonText="SKICKA"
				></ColumnButton>
			</div>
		</Column>
	</Section>
</div>

<style lang="scss">
	.input-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 1px;

		input[type="text"],
		textarea {
			width: 100%;
			appearance: none;
			resize: none;
			background-color: var(--bg-color);
			border: 1px solid var(--border-color);
			height: 4.25rem;
			font-family: "Inter Display";
			border-left: none;
			border-right: none;
			padding: 0 1rem;
			font-size: 1rem;

			&:focus {
				outline: none;
			}

			&::placeholder {
				color: rgba(255, 255, 255, 0.45);
			}
		}

		input[type="text"] {
			&:last-of-type {
				border-top: none;
			}
		}

		textarea {
			border-top: none;
			height: 8rem;
			line-height: 1.5;
			padding: 0.75rem 1rem;
		}
	}
</style>
