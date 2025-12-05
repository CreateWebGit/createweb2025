<script lang="ts">
	import { page } from "$app/stores";
	import { get } from "svelte/store";

	type Crumb = {
		name: string;
		path: string;
	};

	const labelMap: Record<string, string> = {
		"": "CreateWeb",
		case: "Case",
		tjanster: "Tjänster",
		"om-oss": "Om oss",
		kontakt: "Kontakt",
		markandsforing: "Markandsföring",
		"underhall-support": "Underhåll & Support",
		"social-media": "Social Media",
	};

	function getBreadcrumbs(): Crumb[] {
		const url = get(page).url.pathname.replace(/\/+$/, "");
		const segments = url.split("/").filter(Boolean);

		const crumbs: Crumb[] = [];
		crumbs.push({ name: labelMap[""], path: "/" });

		segments.forEach((seg, i) => {
			const path = "/" + segments.slice(0, i + 1).join("/");
			crumbs.push({
				name: labelMap[seg] || decodeURIComponent(seg),
				path,
			});
		});

		return crumbs;
	}

	const breadcrumbs = getBreadcrumbs();
</script>

<div class="cw-breadcrumbs">
	{#each breadcrumbs as crumb, i}
		{#if i < breadcrumbs.length - 1}
			<a href={crumb.path} class="breadcrumb">{crumb.name}</a>
			<span class="separator">/</span>
		{:else}
			<span class="breadcrumb current">{crumb.name}</span>
		{/if}
	{/each}
</div>

<style lang="scss">
	.cw-breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 500;
		font-size: 0.75rem;
		text-transform: uppercase;
		color: light-dark(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25));
		height: 100%;
		width: 100%;
		padding: 1rem;
		background-color: var(--bg-color);
		border-top: 1px solid var(--border-color);
		// border-bottom: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);

		.breadcrumb {
			text-decoration: none;
			color: inherit;
			transition: color 0.2s ease;
			cursor: pointer;

			&:hover {
				color: var(--bw);
			}

			&.current {
				color: var(--accent-color);
				pointer-events: none;
			}
		}

		.separator {
			color: light-dark(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25));
			user-select: none;
		}
	}
</style>
