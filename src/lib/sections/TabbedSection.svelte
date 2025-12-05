<script lang="ts">
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";

	import { disableHeaderHide } from "$lib/stores/layoutStore";

	type Item = {
		id: string;
		title: string;
		ingress: string;
		contentHtml: string;
	};

	type Group = {
		id: string;
		label: string; // e.g. "SEO", "SEM"
		items: Item[];
	};

	interface Props {
		groups: Group[];
		type: "single" | "double";
		reverse?: boolean;
	}

	let { groups, type, reverse }: Props = $props();
	let activeGroupId = $state(groups[0]?.id ?? "");
	let activeItemId = $state(groups[0]?.items[0]?.id ?? "");
	let activeGroup = $derived<Group | null>(
		!groups.length
			? null
			: type === "single"
				? groups[0]
				: (groups.find((g: Group) => g.id === activeGroupId) ??
					groups[0])
	);
	let activeItem = $derived<Item | null>(
		!activeGroup || !activeGroup.items.length
			? null
			: (activeGroup.items.find((i: Item) => i.id === activeItemId) ??
					activeGroup.items[0])
	);

	//entire section is bound to this variable, for intersectionObserver
	let element: HTMLElement;

	//when the active group or type changes, ensure the active item is valid
	$effect(() => {
		if (!activeGroup) return;

		if (!activeGroup.items.length) {
			activeItemId = "";
			return;
		}

		const exists = activeGroup.items.some(
			(i: Item) => i.id === activeItemId
		);

		if (!exists) {
			activeItemId = activeGroup.items[0].id;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.intersectionRatio >= 0.2) {
					$disableHeaderHide = true;
				} else {
					$disableHeaderHide = false;
				}
			},
			{ threshold: [0.2, 0.8] }
		);

		//kolla ifall elementet finns?
		if (!element) return;

		//börja observer elementet
		observer.observe(element);

		return () => {
			//sluta observera när vi dismountar
			observer.disconnect();
		};
	});
</script>

<div bind:this={element}>
	<Section lines="X---X" borderBottom={true}>
		<Column
			class={reverse ? "order-1" : "order-0"}
			span={5}
			borderRight={!reverse}
			borderLeft={reverse}
		>
			<!-- Group buttons only in "double" mode -->
			{#if type === "double" && groups.length > 1}
				<div
					class="double-tab-buttons d-flex"
					class:cw-border-left={reverse}
					class:intersecting={$disableHeaderHide}
				>
					{#each groups as group}
						<button
							class="group-button"
							class:active={activeGroup?.id === group.id}
							onclick={() => (activeGroupId = group.id)}
						>
							{group.label}
						</button>
					{/each}
				</div>
			{/if}

			<div class="d-flex flex-column justify-center h-100 hide-mobile">
				{#if activeGroup}
					{#each activeGroup.items as item}
						<button
							class="item-button"
							class:active={activeItemId === item.id}
							onclick={() => (activeItemId = item.id)}
						>
							<p class="title bold text-white">{item.title}</p>
							<p class="ingress">{item.ingress}</p>
						</button>
					{/each}
				{/if}
			</div>
		</Column>

		<Column class="py-2 px-2 tabbed-section-content" span={7}>
			{#if activeItem}
				{@html activeItem.contentHtml}
			{/if}
		</Column>
	</Section>
</div>

<style lang="scss">
	.group-button {
		all: unset;
		font-family: "JetBrains Mono";
		font-size: 0.6875rem;
		width: 50%;
		text-align: center;
		border-bottom: 1px solid var(--border-color);
		cursor: pointer;
		padding: 0.75rem 0;
		transition: border-color 0.2s ease;

		&.active {
			color: var(--accent-color);
			border-color: var(--accent-color);
		}
	}

	.item-button {
		all: unset;
		padding: 1rem;
		border-left: 1px solid var(--border-color);
		transition: border-color 0.2s ease;
		cursor: pointer;

		.title,
		.ingress {
			opacity: 0.5;
			transition: opacity 0.2s ease;
		}

		&.active {
			border-left: 1px solid white;

			.title,
			.ingress {
				opacity: 1;
			}
		}
	}

	:global(.double-tab-buttons) {
		@media (max-width: 768px) {
			position: fixed;
			top: 2.5rem;
			left: 0;
			width: 100%;
			background-color: var(--bg-color);
			z-index: 99;
			border-top: 1px solid var(--border-color);
			transform: translateY(-2.5rem);
			transition: transform 0.2s ease;

			&.intersecting {
				transform: translateY(0);
			}
		}
	}

	:global(.tabbed-section-content) {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1rem;

		:global(.image-container) {
			background-color: rgba(255, 255, 255, 0.15);
			border: 1px solid var(--border-color);
			height: 24.375rem;
			width: 100%;

			@media (max-width: 768px) {
				height: 10rem;
				margin-top: 2rem;
			}

			img {
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
	}
</style>
