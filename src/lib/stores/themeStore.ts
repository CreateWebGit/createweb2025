import { writable } from "svelte/store";

//checks if html tag has a light-mode class on it
export const lightMode = writable(false);

type LightModeSource = symbol | string;

const activeLightModeSources = new Set<LightModeSource>();

function syncLightMode(): void {
	const isLight = activeLightModeSources.size > 0;
	lightMode.set(isLight);

	if (typeof document !== "undefined") {
		document.documentElement.classList.toggle("light-mode", isLight);
	}
}

export function setLightModeSource(
	source: LightModeSource,
	isActive: boolean,
): void {
	if (isActive) {
		activeLightModeSources.add(source);
	} else {
		activeLightModeSources.delete(source);
	}

	syncLightMode();
}
