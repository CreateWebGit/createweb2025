<script lang="ts">
	import Section from "$src/lib/components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";
	import SubgridContainer from "$src/lib/components/layout/SubgridContainer.svelte";
</script>

<Section lines="X---X" borderBottom>
	<Column
		start={{ lg: 3, xs: 1 }}
		end={{ lg: 11, xs: 13 }}
		class="pt-4 pb-2 pt-xs-2 pb-xs-1"
	>
		<p class="subheading text-center text-accent">Webb som gör jobbet</p>
		<h2 class="text-center">
			Snabb, modern och <br /> skräddarsydd webbutveckling
		</h2>
	</Column>
	<Column start={{ lg: 2, xs: 1 }} end={{ lg: 12, xs: 13 }} class="pt-2 pb-4">
		<SubgridContainer class="gap-0 px-xs-1 py-xs-1 pb-xs-2">
			<Column
				span={6}
				class="d-flex flex-column justify-center aspect-ratio-1-1"
			>
				<img
					src="/images/cw_orange_pattern.svg"
					height="75%"
					alt="asd"
				/>
			</Column>
			<Column span={6} class="d-flex flex-column justify-center gap-4">
				<div>
					<h4>Exklusiva hemsidor</h4>
					<p class="mt-1">
						Vi designar och utvecklar skräddarsydda hemsidor som
						kombinerar prestanda, estetik och användarvänlighet.
						Varje projekt formas efter varumärket, målgruppen och
						affärsmålen för att skapa en digital upplevelse som
						känns unik, modern och konverterande.
					</p>
				</div>
				<div>
					<h4>WEBBAPPAR & SYSTEM</h4>
					<p class="mt-1">
						Vi bygger avancerade webbappar och interna system som
						förenklar processer, automatiserar arbete och skapar nya
						möjligheter. Med skalbar arkitektur, smart
						funktionalitet och en sömlös användarupplevelse får ni
						en lösning som växer i takt med verksamheten.
					</p>
				</div>
				<div>
					<h4>E-HANDELSLÖSNINGAR</h4>
					<p class="mt-1">
						Vi utvecklar flexibla och högpresterande
						e-handelslösningar som gör det enkelt att sälja, hantera
						produkter och driva affärer online. Från design till
						checkout optimerar vi varje steg för bättre
						konvertering, trygghet och köpupplevelse.
					</p>
				</div>
			</Column>
		</SubgridContainer>
	</Column>
</Section>
