<script lang="ts">
	import Section from "$src/lib/components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";
</script>

<Section lines="X---X">
	<Column borderBottom span={3}></Column>
	<Column borderBottom borderLeft borderRight span={6} class="py-4 py-xs-2">
		<p class="subheading text-center text-accent">våran stack</p>
		<h2 class="text-center">Stacksnack</h2>
	</Column>
	<Column borderBottom span={3}></Column>

	<Column span={4} class="stack-column py-8 py-xs-2">
		<p class="subheading text-center text-accent">Frontend</p>
		<div class="stack-icon-container"></div>

		<h3 class="text-center">Svelte</h3>
		<p class="text-center">
			Vi använder Svelte för att skapa snabba, responsiva och lättviktiga
			gränssnitt. Det ger oss ren kod, snabb utveckling och en
			användarupplevelse som känns direkt från första interaktionen.
		</p>
	</Column>
	<Column span={4} class="stack-column py-8 py-xs-2">
		<p class="subheading text-center text-accent">Backend</p>
		<div class="stack-icon-container"></div>

		<h3 class="text-center">Node + MongoDB</h3>
		<p class="text-center">
			Node och MongoDB ger en snabb, flexibel och skalbar backend. Vi
			bygger API:er som tål tryck, är enkla att vidareutveckla och
			fungerar perfekt tillsammans med moderna frontend-lösningar.
		</p>
	</Column>
	<Column span={4} class="stack-column py-8 py-xs-2">
		<p class="subheading text-center text-accent">CMS</p>
		<div class="stack-icon-container"></div>

		<h3 class="text-center">PayloadCMS</h3>
		<p class="text-center">
			Payload ger full kontroll och flexibilitet. Vi skräddarsyr struktur,
			data och adminmiljö så att ni enkelt kan hantera innehåll utan
			begränsningar &mdash; ett CMS som växer med verksamheten.
		</p>
	</Column>
</Section>

<style lang="scss">
	:global(.stack-column) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;

		h3 {
			margin-top: 2rem;
		}

		p {
			width: 90%;
		}

		.stack-icon-container {
			height: 8rem;
			width: 8rem;
			border: 1px solid var(--border-color);
			background-color: #16202f;
		}
	}
</style>
