<script lang="ts">
	import DatePicker from "$src/lib/components/calendar/DatePicker.svelte";
	import Pulse from "$src/lib/components/Pulse.svelte";
	import WheelPicker from "$src/lib/components/WheelPicker.svelte";
	import Booking from "$src/lib/components/calendar/Booking.svelte";

	let data = [
		{ value: 1, label: "Option 1" },
		{ value: 2, label: "Option 2" },
		{ value: 3, label: "Option 3" },
	];
</script>

<!-- <DatePicker /> -->
<!-- <WheelPicker style="height: 200px; width: 100%" /> -->
<!-- <Pulse></Pulse> -->
<Booking />
