<script context="module" lang="ts">
	// Export Types

	export type Options = {
		visibleOptions?: number;
		density?: number;
		marginY?: number;
		perspective?: number;
		staticPointerTimer?: number;
		friction?: number;
		overflow?: "hidden" | "visible";
	};

	export type FillParentOn = {
		disable: false;
		height?: undefined;
		width?: undefined;
	};

	export type FillParentOff = {
		disable: true;
		height?: string;
		width?: string;
	};

	export type HoverEffectOff = {
		enable: false;
		unwrap?: undefined;
		stamp?: undefined;
		fixList?: undefined;
		transformSpeed?: undefined;
	};

	export type HoverEffectOn = {
		enable: true;
		unwrap?: number;
		stamp?: boolean;
		fixList?: boolean;
		transformSpeed?: number;
	};

	export type DataOption = { value: number | string; label: string };
</script>

<script lang="ts">
	import { onMount } from "svelte";

	let wheelWindowEl: HTMLDivElement;

	//TODO: add a disabled prop to the options, when an option is disabled you cant select it in the wheel picker, it just scrolls by.

	const defaultData: DataOption[] = [
		{ value: 5, label: "This is" },
		{ value: 10, label: "only a" },
		{ value: 15, label: "placeholder " },
		{ value: 20, label: "you should " },
		{ value: 25, label: "send your" },
		{ value: 30, label: "data" },
		{ value: 35, label: "in the" },
		{ value: 40, label: "'wheelOptions'" },
		{ value: 45, label: "prop and" },
		{ value: 50, label: "configure" },
		{ value: 55, label: "your" },
		{ value: 60, label: "settings" },
		{ value: 70, label: "with the" },
		{ value: 80, label: "following" },
		{ value: 90, label: "props:" },
		{ value: 100, label: "marginY:number" },
		{ value: 120, label: "fillParent:boolean" },
		{ value: 130, label: "visibleOptions:number" },
		{ value: 145, label: "perspective:number" },
		{ value: 160, label: "bearingFriction:number" },
	];

	type Props = {
		classes?: string;
		style?: string;
		data?: DataOption[];
		selectedOption?: DataOption;
		rollOnHover?: HoverEffectOff | HoverEffectOn;
		fillParent?: FillParentOff | FillParentOn;
		options?: Options;
	};

	// Props (Svelte 5 style)
	let {
		classes = "",
		style = "",
		data = defaultData,
		selectedOption = $bindable<DataOption>(data[0]),
		rollOnHover = { enable: false } as HoverEffectOff | HoverEffectOn,
		fillParent = { disable: false } as FillParentOff | FillParentOn,
		options = {},
	}: Props = $props();

	// Local reactive state
	// let selectedOption = $state<DataOption>(selectedOptionInitial);

	// Hover configuration derived from rollOnHover
	let hoverEnabled = $derived(rollOnHover?.enable ?? false);

	let unwrap = $state<number | false>(false);
	let stamp = $state<boolean>(false);
	let fixList = $state<boolean>(false);
	let transformSpeed = $state<number | false>(0.3);

	$effect(() => {
		if (!hoverEnabled) {
			unwrap = false;
			stamp = false;
			fixList = false;
			transformSpeed = false;
		} else {
			unwrap = rollOnHover.unwrap ?? 85;
			stamp = rollOnHover.stamp ?? false;
			fixList = rollOnHover.fixList ?? !stamp;
			transformSpeed = rollOnHover.transformSpeed ?? 0.3;
		}
	});

	// Fill parent props
	let fillParentDisabled = $state<boolean>(fillParent.disable ?? false);
	let height = $state<string | undefined>(fillParent.height);
	let width = $state<string | undefined>(fillParent.width);

	$effect(() => {
		fillParentDisabled = fillParent.disable ?? false;
		height = fillParent.height;
		width = fillParent.width;
	});

	// Options state
	let visibleOptions = $state<number>(7);
	let density = $state<number>(14);
	let marginY = $state<number>(2);
	let perspective = $state<number>(0);
	let staticPointerTimer = $state<number>(200);
	let friction = $state<number>(4);
	let overflow = $state<"hidden" | "visible">(
		hoverEnabled ? "visible" : "hidden"
	);

	// Keep options in sync with prop
	$effect(() => {
		const {
			visibleOptions: vo = 7,
			density: d,
			marginY: my = 2,
			perspective: p = 0,
			staticPointerTimer: spt = 200,
			friction: fr = 4,
			overflow: ov,
		} = options;

		visibleOptions = vo;
		density = d ?? vo * 2;
		marginY = my;
		perspective = p;
		staticPointerTimer = spt;
		friction = fr;
		overflow = hoverEnabled ? "visible" : (ov ?? "hidden");
	});

	// Core state
	let leaningAngle = $state<number[]>([]);
	let wheelStyle = $state<string[]>([]);
	let yOffset = $state<number>(0);
	let mousedown = $state<boolean>(false);
	let touchstart = $state<boolean>(false);
	let touchstartPosition = $state<number>(1);
	let dragPosition = $state<number>(0);
	let prevDisplacement = $state<number>(0);
	let prevOffset = $state<number>(0);
	let yInertia = $state<number>(0);
	let hovering = $state<boolean>(!hoverEnabled);
	let optionToSelect = $state<{ angle: number; index: number }>({
		angle: 1,
		index: 0,
	});

	// Bindings
	let wheelWindowWidth = $state<number>(0);
	let wheelWindowHeight = $state<number>(0);
	let wheelContainerHeight = $state<number>(0);
	let wheelWrapperHeight = $state<number>(0);

	// Derived values
	let longestLabel = $derived(
		data
			.slice()
			.sort((a, b) => (a.label.length > b.label.length ? -1 : 1))[0].label
	);

	let maxAngle = $derived(
		((180 + perspective) / visibleOptions) * (data.length - 1)
	);
	let wrap = $derived(
		!hoverEnabled || dragPosition || hovering ? true : false
	);
	let perspectiveScaleOffset = $derived(
		stamp && wrap
			? 1 / (1 + (density - visibleOptions) / density)
			: hoverEnabled
				? 1
				: Math.max(1, 1 + perspective / 200)
	);
	let lineHeight = $derived(
		Math.min(
			(wheelWindowWidth * 2) /
				(longestLabel.length * Math.max(1, perspectiveScaleOffset)),
			Math.round(
				wheelWindowHeight /
					(stamp
						? data.length
						: Math.min(visibleOptions, data.length))
			) * 0.8
		)
	);
	let maxScroll = $derived(-wheelContainerHeight + lineHeight);

	let pickerDisplacement = $derived(
		Math.max(Math.min(prevDisplacement + yOffset, 0), maxScroll)
	);

	// yOffset depends on dragPosition and touchstartPosition
	$effect(() => {
		if (dragPosition === 0) {
			yOffset = 0;
		} else {
			yOffset = dragPosition - touchstartPosition;
		}
	});

	let scrollPercent = $derived(
		maxScroll === 0 ? 0 : pickerDisplacement / maxScroll
	);
	let rotationDisplacement = $derived(maxAngle * scrollPercent);

	let fillParentStyle = $derived(
		!fillParentDisabled
			? `height: calc(100%); width: ${longestLabel.length * 2}ch`
			: `${height ? `height: ${height}` : ""}; ${width ? `width: ${width}` : ""};`
	);

	let wheelWrapperScale = $derived(
		`transform: scale(${perspectiveScaleOffset})`
	);

	let wheelContainerTop = $derived(
		!hoverEnabled || (fixList && wrap) || (!fixList && !stamp)
			? `calc(50% - ${lineHeight / 2.15}px)`
			: `0%`
	);

	let wheelContainerOffset = $derived(
		hoverEnabled && stamp && wrap
			? -pickerDisplacement * 0.5
			: !hoverEnabled || (!fixList && !stamp) || (wrap && fixList)
				? pickerDisplacement
				: 0
	);

	let wheelContainerTransform = $derived(
		`translateY(${wheelContainerTop}) translateY(${wheelContainerOffset}px);`
	);

	let fontSize = $derived(lineHeight * 0.8);

	// Effects (replacing reactive statements with side effects)
	$effect(() => {
		generateTransforms(rotationDisplacement, wrap);
	});

	$effect(() => {
		// clamp perspective
		perspective = Math.max(-90, Math.min(stamp ? 180 : 90, perspective));
	});

	$effect(() => {
		// clamp visibleOptions
		visibleOptions = Math.max(
			3,
			Math.min(stamp ? 180 : 90, visibleOptions)
		);
	});

	$effect(() => {
		if (!fillParentDisabled) {
			density = visibleOptions * 2;
		}
	});

	$effect(() => {
		if (fillParentDisabled && !height) {
			console.warn(
				"The fillParent prop is disabled but its `height` property is not set, the WheelPicker will automatically fill the parent until the height is set."
			);
		}
	});

	$effect(() => {
		if (typeof unwrap === "number" && unwrap > 99) {
			unwrap = 99;
			console.warn(
				"The `unwrap` property in the `rollOnHover` prop cannot be higher than 99"
			);
		}
	});

	$effect(() => {
		selectedOption = data[optionToSelect.index];
	});

	$effect(() => {
		if (!hoverEnabled) {
			hovering = true;
		}
	});

	// Functions
	function grabWheel(e: TouchEvent | MouseEvent) {
		resetDrag();
		if (e.type === "mousedown") {
			mousedown = true;
			touchstartPosition = (e as MouseEvent).clientY;
		} else if (e.type === "touchstart") {
			touchstart = true;
			touchstartPosition = (e as TouchEvent).changedTouches[0].clientY;
		}
	}

	function releaseWheel(e: TouchEvent | MouseEvent) {
		mousedown = false;
		touchstart = false;
		yInertia = yOffset - prevOffset;
		continueWheelMomentum();
	}

	function dragWheel(e: TouchEvent | MouseEvent) {
		if (!mousedown && !touchstart) return;

		prevOffset = yOffset;

		if (mousedown) {
			dragPosition = (e as MouseEvent).clientY;
		} else if (touchstart) {
			dragPosition = (e as TouchEvent).changedTouches[0].clientY;
		}

		setTimeout(() => {
			prevOffset = yOffset;
		}, staticPointerTimer);
	}

	function generateTransforms(
		displacement: number,
		wrapValue: boolean | number
	) {
		for (let index = 0; index < data.length; index++) {
			leaningAngle[index] =
				index * ((180 + perspective) / visibleOptions) - displacement;
			const currentAngle = wrapValue
				? leaningAngle[index]
				: leaningAngle[index] -
					leaningAngle[index] * ((unwrap as number) / 100);

			if (Math.abs(currentAngle) < Math.abs(optionToSelect.angle)) {
				optionToSelect.index = index;
			}
			if (index === optionToSelect.index) {
				optionToSelect.angle = currentAngle;
			}

			const rotateX = Math.max(Math.min(currentAngle, 90), -90);

			const translateY = wrapValue
				? (rotateX * visibleOptions) / Math.PI
				: 0;
			const absRotation = Math.abs(
				wrapValue ? rotateX : leaningAngle[index]
			);
			const scale = wrapValue
				? (density - visibleOptions) / density +
					((180 - absRotation) / 180) ** 1.4
				: 1;
			const opacity = 0.6 - absRotation / (wrapValue ? 150 : 300);

			wheelStyle[index] =
				`transform: rotateX(${rotateX}deg) translateY(${translateY}%) scale(${scale}); opacity: ${opacity};`;
		}
	}

	function asyncTimeout(ms: number) {
		return new Promise((res) => setTimeout(res, ms));
	}

	async function continueWheelMomentum() {
		if (mousedown || touchstart) return;
		yOffset += yInertia;
		yInertia *= (100 - friction) / 100;
		const absYInertia = Math.abs(yInertia);
		if (
			dragPosition &&
			absYInertia > 0.1 - friction / 100 &&
			pickerDisplacement < 0 &&
			pickerDisplacement > maxScroll
		) {
			await asyncTimeout(8);
			continueWheelMomentum();
		} else {
			centerSelectedOption();
		}
	}

	function resetDrag() {
		touchstartPosition = 0;
		prevDisplacement = Math.max(
			Math.min(prevDisplacement + yOffset, 0),
			maxScroll
		);
		dragPosition = 0;
		prevOffset = 0;
	}

	async function centerSelectedOption() {
		if (mousedown) return;
		yOffset -= (optionToSelect.angle * friction) / 100;
		if (
			Math.abs(optionToSelect.angle) > 0.5 &&
			dragPosition &&
			pickerDisplacement > maxScroll
		) {
			await asyncTimeout(8);
			centerSelectedOption();
		} else {
			resetDrag();
		}
	}

	function handleTouchMove(e: TouchEvent) {
		if (e.cancelable) {
			e.preventDefault();
		}
		e.stopPropagation();
		dragWheel(e);
	}

	onMount(() => {
		if (!wheelWindowEl) return;

		const opts: AddEventListenerOptions = { passive: false };
		wheelWindowEl.addEventListener("touchmove", handleTouchMove, opts);

		return () => {
			wheelWindowEl.removeEventListener(
				"touchmove",
				handleTouchMove,
				opts
			);
		};
	});
</script>

<div
	class={`wheelWindow ${classes}`}
	role="button"
	tabindex="0"
	bind:this={wheelWindowEl}
	style={`
        ${fillParentStyle};
        padding: ${marginY}% 0px;
        font-size: ${fontSize}px;
        line-height: ${lineHeight}px;
        overflow: ${overflow};
        ${style};
    `}
	onmousedown={(event) => {
		event.preventDefault();
		event.stopPropagation();
		grabWheel(event);
	}}
	ontouchstart={(event) => {
		event.stopPropagation();
		grabWheel(event as TouchEvent);
	}}
	onmouseup={(event) => {
		event.preventDefault();
		event.stopPropagation();
		releaseWheel(event);
	}}
	ontouchend={(event) => {
		event.stopPropagation();
		releaseWheel(event as TouchEvent);
	}}
	onmousemove={(event) => {
		event.preventDefault();
		event.stopPropagation();
		dragWheel(event);
	}}
	onmouseenter={() => {
		if (rollOnHover.enable) hovering = true;
	}}
	onmouseleave={() => {
		if (rollOnHover.enable && !mousedown && !touchstart) hovering = false;
	}}
	bind:clientHeight={wheelWindowHeight}
	bind:clientWidth={wheelWindowWidth}
>
	<div
		class="wheelWrapper"
		style={`
            ${wheelWrapperScale};
            ${
				hoverEnabled && stamp
					? `transition: transform ${transformSpeed}s ease-in-out`
					: ""
			};
            transform-origin: ${hoverEnabled && stamp ? "top" : "center"};
        `}
		bind:clientHeight={wheelWrapperHeight}
	>
		<div
			class="wheelContainer"
			bind:clientHeight={wheelContainerHeight}
			style={`
                transform: ${wheelContainerTransform};
                height: ${Math.max(wheelWrapperHeight, lineHeight * data.length)}px;
                ${
					!dragPosition
						? `transition: transform ${transformSpeed}s ease-in-out`
						: ""
				};
            `}
		>
			{#each data as option, i (i)}
				<span
					class="wheelOption"
					style={`
                        ${wheelStyle[i]};
                        ${i === optionToSelect.index ? "opacity: 1" : ""};
                        ${
							(hoverEnabled && !dragPosition) || !dragPosition
								? `transition: transform ${transformSpeed}s ease-in-out, opacity ${transformSpeed}s ease-in-out`
								: ""
						}
                    `}
				>
					{option.label}
				</span>
			{/each}
		</div>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.options {
		display: flex;
		flex-direction: column;
	}
	.wheelWindow {
		min-height: 4rem;
		height: 100%;
		width: 100%;
		cursor: grab;
		font-family:
			Arial,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			"Open Sans",
			"Helvetica Neue",
			sans-serif;
	}

	.wheelWrapper {
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
	}

	.wheelContainer {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	span {
		white-space: nowrap;
		vertical-align: middle;
	}
</style>
