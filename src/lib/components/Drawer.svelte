<!--
    //emil 13:57 10-12-2025: "helt sjukt trött på vaul och tailwind. skriver min egna komponent"
	//emil 14:35 10-12-2025: "jag skrev min egna skitkomponent"

	/*
        används som följande:
        
        ------------------------------
        PROPS:
            * open
                ganska självklar så att säga, den är bindable, så bör bindas till en prop i parent
            * height
                baserat på viewport. 1 / 100. i.e. 100vh = 1, 80vh = 0.8
            * snapPoints
                okej. nu blir det lite komplicerat. snapPointsen byggs beroende på höjden av skiten.
                för att lättast demonstrera; om vi sätter height = 1 (alltså 100vh), och snapPoints [0.2, 0.5, 1]
                så kommer den att snapa vid 20vh, 50vh, och till sist 100vh. snapPointsen är byggt med resizeObserver, 
                som håller koll på om sheet elementet har ändrats sig. skit snabb!
            * closeOnOverlay
                anger om den ska stängas om du trycker utan för skiten
            * overlayOpacity
                en basic liten style för overlay opaciteten.
            * ignoreContentDrag
                false by default, när den sätts till true så drar man inte i själva skiten när man drar i innehållet

        ------------------------------
        STYLING:
        - se drawer.scss

        * .drawer-root
            detta är själva rooten för skiten, där den helt enkelt sitter.
        * .drawer-root[data-active="true"]
            här kan vi hålla reda på om skiten är uppe
        * .overlay
            styr overlayen läggs som ett absolut element under skiten
        * .sheet 
            själva skiten, rör helst inte
        * .sheet.dragging
            sätt transition till 0 när man drar i den, så det inte blir någon fördröjning vid drag
        * .content
            styling för sjävla contentet, där @render sker. 
        
    */

	TODO: prop för att inte stänga helt
-->

<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	type Props = {
		open?: boolean;
		snapPoints?: number[];
		closeOnOverlay?: boolean;
		overlayOpacity?: number;
		ignoreContentDrag?: boolean;
		height?: number;
	};

	let {
		open = $bindable(true),
		snapPoints = [0.35, 0.65, 1],
		closeOnOverlay = true,
		overlayOpacity = 0.45,
		ignoreContentDrag = false,
		height = 0.96,
	}: Props = $props();

	function clamp01(value: number) {
		return Math.min(1, Math.max(0, value));
	}

	function normalize(points: number[]) {
		const cleaned = [...points, 1]
			.map((n) => clamp01(Number.isFinite(n) ? n : 0))
			.sort((a, b) => a - b);

		return Array.from(new Set(cleaned));
	}

	const normalizedSnaps = $derived.by<number[]>(() => {
		const snaps = normalize(snapPoints);
		return snaps.length ? snaps : [1];
	});
	let activeSnapIndex = $state(-1);
	let translateY = $state(10000);
	let dragging = $state(false);
	let sheetHeight = $state(0);
	let viewportHeight = $state(0);
	let contentEl: HTMLDivElement | null = null;
	const targetHeight = $derived.by<number>(() => {
		if (viewportHeight) return viewportHeight * clamp01(height ?? 1);
		return sheetHeight;
	});
	const sheetHeightStyle = $derived(
		targetHeight ? `${targetHeight}px` : "96dvh"
	);
	const contentHeightStyle = $derived(
		targetHeight
			? `${Math.max(0, targetHeight - 48)}px`
			: "calc(96dvh - 48px)"
	);

	let sheetEl: HTMLDivElement | null = null;

	let startY = 0;
	let startTranslate = 0;
	let lastY = 0;
	let lastTime = 0;

	$effect(() => {
		const maxIndex = normalizedSnaps.length - 1;
		if (activeSnapIndex === -1 || activeSnapIndex > maxIndex) {
			activeSnapIndex = maxIndex;
		}
	});

	// $effect(() => {
	// 	if (typeof document === "undefined") return;
	// 	if (!open) return;
	// 	const body = document.body;
	// 	const html = document.documentElement;
	// 	if (!body || !html) return;

	// 	const prevBody = body.style.overflow;
	// 	const prevHtml = html.style.overflow;
	// 	body.style.overflow = "hidden";
	// 	html.style.overflow = "hidden";

	// 	return () => {
	// 		body.style.overflow = prevBody;
	// 		html.style.overflow = prevHtml;
	// 	};
	// });

	function measure() {
		if (!sheetEl) return;
		const height = sheetEl.getBoundingClientRect().height;
		if (height !== sheetHeight) {
			sheetHeight = height;
			if (!open && translateY === 10000) {
				translateY = sheetHeight + 48;
			}
		}

		if (typeof window !== "undefined") {
			const nextVh = window.innerHeight;
			if (nextVh !== viewportHeight) {
				viewportHeight = nextVh;
			}
		}
	}

	let resizeObserver: ResizeObserver | null = null;

	onMount(() => {
		measure();

		const onResize = () => measure();
		window.addEventListener("resize", onResize, { passive: true });

		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(() => measure());
			if (sheetEl) resizeObserver.observe(sheetEl);
		}

		return () => {
			window.removeEventListener("resize", onResize);
			resizeObserver?.disconnect();
		};
	});

	onDestroy(() => {
		resizeObserver?.disconnect();
	});

	$effect(() => {
		if (dragging) return;
		const base = targetHeight || sheetHeight;
		if (!base) return;

		if (!open) {
			translateY = base + 48;
			return;
		}

		const snap = normalizedSnaps[activeSnapIndex] ?? 1;
		const visible = base * snap;
		translateY = Math.max(0, base - visible);
	});

	function onPointerDown(event: PointerEvent) {
		if (!open) return;
		const target = event.target as Node | null;
		if (ignoreContentDrag && target && contentEl?.contains(target)) {
			return;
		}
		dragging = true;
		startY = event.clientY;
		startTranslate = translateY;
		lastY = event.clientY;
		lastTime = event.timeStamp;

		sheetEl?.setPointerCapture(event.pointerId);
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging) return;
		const delta = event.clientY - startY;
		const maxOffset = (targetHeight || sheetHeight) + 48;
		translateY = Math.max(0, Math.min(maxOffset, startTranslate + delta));

		lastY = event.clientY;
		lastTime = event.timeStamp;
	}

	function onPointerUp(event: PointerEvent) {
		if (!dragging) return;
		dragging = false;

		if (sheetEl?.hasPointerCapture?.(event.pointerId)) {
			sheetEl.releasePointerCapture(event.pointerId);
		}

		const base = targetHeight || sheetHeight;
		if (!base) return;

		const dt = Math.max(1, event.timeStamp - lastTime);
		const dy = event.clientY - lastY;
		const velocity = dy / dt; // px per ms

		const visibleRatio = clamp01(1 - translateY / base);

		if (velocity > 1 || (velocity > 0.55 && translateY > base * 0.45)) {
			open = false;
			return;
		}

		if (visibleRatio < 0.08) {
			open = false;
			return;
		}

		let closestIndex = activeSnapIndex;
		let smallestDiff = Infinity;

		for (let i = 0; i < normalizedSnaps.length; i++) {
			const diff = Math.abs(normalizedSnaps[i] - visibleRatio);
			if (diff < smallestDiff) {
				smallestDiff = diff;
				closestIndex = i;
			}
		}

		activeSnapIndex = closestIndex;
	}

	function close() {
		open = false;
	}
</script>

<div
	class="drawer-root hide-desktop"
	data-active={open || dragging}
	aria-hidden={!open}
>
	<div
		class="overlay"
		data-open={open}
		style={`--overlay-opacity:${overlayOpacity};`}
		onclick={closeOnOverlay ? close : undefined}
	/>
	<div
		class={`sheet ${dragging ? "dragging" : ""}`}
		bind:this={sheetEl}
		style={`transform: translate3d(0, ${translateY}px, 0); max-height: ${sheetHeightStyle}; height: ${sheetHeightStyle}; --content-max-height: ${contentHeightStyle};`}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
	>
		<div class="handle">
			<div class="handle-bar" />
		</div>
		<div class="content" bind:this={contentEl}>
			<slot />
		</div>
	</div>
</div>

<style>
</style>
