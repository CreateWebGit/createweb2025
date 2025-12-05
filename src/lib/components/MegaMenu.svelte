<script lang="ts">
	import Section from "./grid/Section.svelte";
	import Column from "./grid/Column.svelte";
	import { onMount } from "svelte";
	import Plus from "phosphor-svelte/lib/Plus";

	import { page } from "$app/stores";
	import { megaMenuOpen } from "../stores/layoutStore";
	import { lightMode } from "../stores/themeStore";

	let links = [
		{
			title: "Webbutveckling",
			url: "/tjanster/webbutveckling",
			text: "Vi hjälper dig skapa en snabb och modern webbplats som stärker ditt varumärke, levererar en smidig upplevelse och driver fler affärer online.",
		},
		{
			title: "Marknadsföring",
			url: "/tjanster/marknadsforing",
			text: "Vi hjälper dig nå rätt målgrupp med smart, datadriven marknadsföring som ökar synligheten, bygger förtroende och ger verkliga resultat.",
		},
		{
			title: "Underhåll & Support",
			url: "/tjanster/underhall-support",
			text: "Vi hjälper dig hålla din webbplats säker, uppdaterad och stabil genom löpande underhåll, proaktiv support och kontinuerliga förbättringar.",
		},
	];

	let activeLink: string | null = $state("/tjanster/webbutveckling");

	onMount(() => {
		const currentRoute = $page.route.id ?? "";
		activeLink = currentRoute.includes("/tjanster/")
			? currentRoute
			: "/tjanster/webbutveckling";
		$megaMenuOpen = false;
	});
</script>

<div class="mega-menu">
	<Section sectionLayoutClass="height-100" borderTop borderBottom>
		<Column class="quote-col" span={4} borderLeft borderRight>
			<!-- {activeLink} -->
			<div class="bottom-left-cap">
				<Plus color="var(--accent-color)" />
			</div>
		</Column>
		<Column class="link-col px-1 py-2" span={4}>
			<p class="subheading text-accent mb-1">Våra tjänster</p>
			{#each links as link}
				<a
					class:active={activeLink === link.url}
					onmouseenter={() => (activeLink = link.url)}
					href={link.url}>{link.title}</a
				>
			{/each}
		</Column>
		<Column class="text-col px-1 py-2" span={4} borderRight>
			{#each links as link}
				{#if activeLink === link.url}
					<div class="text-container">
						<p class="subheading text-accent mb-1">{link.title}</p>
						<p>{link.text}</p>
					</div>
				{/if}
			{/each}

			<div class="bottom-right-cap">
				<Plus color="var(--accent-color)" />
			</div>
		</Column>
	</Section>
</div>
