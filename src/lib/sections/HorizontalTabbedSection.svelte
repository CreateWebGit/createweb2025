<script lang="ts">
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";

	const { subheading, heading, tabs } = $props<{
		subheading?: string;
		heading?: string;
		tabs: {
			label: string;
			content: string;
		}[];
	}>();

	let activeTab: number = $state(0);

	const setTab = (i: number) => {
		activeTab = i;
	};
</script>

<Section lines={"X---X"} borderBottom={true}>
	<Column span={12} class="py-3 py-xs-2">
		{#if subheading}
			<p class="subheading text-accent text-center">{subheading}</p>
		{/if}
		{#if heading}
			<h2 class="text-center">{@html heading}</h2>
		{/if}
	</Column>

	<Column start={{ lg: 3, xs: 1 }} end={{ lg: 11, xs: 13 }} class="d-flex">
		{#each tabs as tab, i}
			<button
				class="tab-button {activeTab === i ? 'active' : ''}"
				onclick={() => setTab(i)}
			>
				{tab.label}
			</button>
		{/each}
	</Column>

	<Column
		start={{ lg: 3, xs: 1 }}
		end={{ lg: 11, xs: 13 }}
		class="py-4 pb-xs-2"
	>
		{#if tabs[activeTab]}
			<div class="cw-grid py-xs-1 px-xs-1">
				{@html tabs[activeTab].content}
			</div>
		{/if}
	</Column>
</Section>

<style lang="scss">
	.tab-button {
		all: unset;
		width: 100%;
		font-family: "JetBrains Mono";
		font-size: 0.6875rem;
		text-transform: uppercase;
		text-align: center;
		cursor: pointer;
		border-bottom: 1px solid var(--border-color);
		color: var(--body-text-color);
		padding: 0.75rem;
		transition: all 0.2s ease;

		&.active {
			border-color: var(--bw);
			color: var(--bw);
		}
	}
</style>
