<script lang="ts">
	//main css entry file
	import '$src/app.scss'
	
	let { children } = $props();
</script>

{@render children?.()}