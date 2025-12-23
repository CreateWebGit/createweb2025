<script lang="ts">
	import { onMount } from "svelte";

	export type SelectOption = {
		value: string;
		label: string;
	};

	const { value, options, placeholder, onChange } = $props<{
		value: string;
		options: SelectOption[];
		placeholder?: string;
		onChange: (val: string) => void;
	}>();

	let open = $state(false);
	let root: HTMLDivElement | null = null;

	function toggle() {
		open = !open;
	}

	function choose(val: string) {
		onChange(val);
		open = false;
	}

	function onClickOutside(e: MouseEvent) {
		if (!root?.contains(e.target as Node)) {
			open = false;
		}
	}

	onMount(() => {
		document.addEventListener("click", onClickOutside);
		return () => document.removeEventListener("click", onClickOutside);
	});

	const selectedLabel = $derived(
		options.find((o: SelectOption) => o.value === value)?.label ??
			placeholder ??
			"Välj…"
	);
</script>

<div class="select-root" bind:this={root}>
	<button class="select-trigger" type="button" onclick={toggle}>
		<span class:placeholder={!value}>{selectedLabel}</span>

		<svg class:rotated={open} width="14" height="14" viewBox="0 0 24 24">
			<path fill="currentColor" d="M7 10l5 5 5-5z" />
		</svg>
	</button>

	{#if open}
		<ul class="dropdown">
			{#each options as opt}
				<li
					class:selected={opt.value === value}
					onclick={() => choose(opt.value)}
				>
					{opt.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.select-root {
		position: relative;
		width: 100%;
		font-size: 0.95rem;

		* {
			color: black;
		}
	}

	.select-trigger {
		width: 100%;
		padding: 0.6rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid #d0d0d0;
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		transition: border-color 0.15s ease;
	}

	.select-trigger:hover {
		border-color: #b0b0b0;
	}

	.select-trigger svg {
		transition: transform 0.15s ease;
		opacity: 0.7;
	}

	.select-trigger svg.rotated {
		transform: rotate(180deg);
	}

	.placeholder {
		opacity: 0.5;
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		width: 100%;
		background-color: white;
		border: 1px solid #d0d0d0;
		border-radius: 0.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		padding: 0.3rem 0;
		z-index: 20;
		max-height: 260px;
		overflow-y: auto;
		animation: fadeIn 0.12s ease-out;
	}

	.dropdown li {
		padding: 0.6rem 1rem;
		cursor: pointer;
		transition: background-color 0.12s ease;
	}

	.dropdown li:hover {
		background: #f3f3f3;
	}

	.dropdown li.selected {
		background: #e8efff;
		font-weight: 600;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
