<script lang="ts">
	import DatePicker from "$src/lib/components/calendar/DatePicker.svelte";
	import { WheelPicker } from "svelte-wheel-picker";
	import Pulse from "$src/lib/components/Pulse.svelte";

	let data = [
		{ value: 1, label: "Option 1" },
		{ value: 2, label: "Option 2" },
		{ value: 3, label: "Option 3" },
	];
</script>

<!-- <DatePicker /> -->
<WheelPicker {data} />
<Pulse></Pulse>
