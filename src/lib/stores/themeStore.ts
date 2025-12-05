import { writable } from "svelte/store";

//checks if html tag has a light-mode class on it
export const lightMode = writable(false);
