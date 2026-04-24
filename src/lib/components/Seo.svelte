<script lang="ts">
	import { page } from '$app/state';

	type SeoProps = {
		title: string;
		description: string;
		path: string;
		image?: string;
		keywords?: string[];
		noindex?: boolean;
	};

	let {
		title,
		description,
		path,
		image = '/images/og-image.jpg',
		keywords = [],
		noindex = false
	}: SeoProps = $props();

	const canonicalUrl = $derived(new URL(path, page.url.origin).href);
	const ogImageUrl = $derived(new URL(image, page.url.origin).href);
	const robots = $derived(noindex ? 'noindex, nofollow' : 'index, follow');
	const keywordsContent = $derived(keywords.join(', '));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description}>
	<meta name="robots" content={robots}>
	{#if keywordsContent}
		<meta name="keywords" content={keywordsContent}>
	{/if}
	<link rel="canonical" href={canonicalUrl}>

	<meta property="og:type" content="website">
	<meta property="og:locale" content="sv_SE">
	<meta property="og:site_name" content="CreateWeb">
	<meta property="og:title" content={title}>
	<meta property="og:description" content={description}>
	<meta property="og:url" content={canonicalUrl}>
	<meta property="og:image" content={ogImageUrl}>
	<meta property="og:image:alt" content={title}>

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content={title}>
	<meta name="twitter:description" content={description}>
	<meta name="twitter:image" content={ogImageUrl}>
</svelte:head>
