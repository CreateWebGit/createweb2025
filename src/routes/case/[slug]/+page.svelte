<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Section from "$components/grid/Section.svelte";
	import Column from "$components/grid/Column.svelte";
	import Footer from "$components/layout/Footer.svelte";
	import { onMount } from "svelte";

	let { data } = $props();

	onMount(() => {
		console.log(data);
	});
</script>

Case/case
<Header />
<Section style="height: calc(100vh - 4rem + 1px);" lines="XXXXX">
	<Column span={12}>
		<h2>{data.post.title}</h2>
	</Column>
</Section>
<Footer />
