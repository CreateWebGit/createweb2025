<script lang="ts">
	//main css entry file
	import "$src/app.scss";
	import { showBookingForm } from "$lib/stores/layoutStore";
	import Booking from "$src/lib/components/calendar/Booking.svelte";

	let { children } = $props();

	$effect(() => {
		//lock document when bookingForm is open
		if (typeof document === "undefined") return;
		if (!$showBookingForm) return;
		const body = document.body;
		const html = document.documentElement;
		if (!body || !html) return;

		const prevBody = body.style.overflow;
		const prevHtml = html.style.overflow;
		body.style.overflow = "hidden";
		html.style.overflow = "hidden";

		return () => {
			body.style.overflow = prevBody;
			html.style.overflow = prevHtml;
		};
	});
</script>

{@render children?.()}
{#if $showBookingForm}
	<Booking />
{/if}
