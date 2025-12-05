<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { get } from "svelte/store";
	import { lightMode } from "$src/lib/stores/themeStore";
	import {
		megaMenuOpen,
		disableHeaderHide,
	} from "$src/lib/stores/layoutStore";
	import MegaMenu from "../MegaMenu.svelte";
	import SlideMenu from "$components/SlideMenu.svelte";

	import Breadcrumbs from "$components/Breadcrumbs.svelte";
	let header: HTMLElement;

	let slideMenuOpen = $state(false);

	$effect(() => {
		if ($megaMenuOpen) {
			document.body.classList.add("megamenu-open");
		} else {
			document.body.classList.remove("megamenu-open");
		}

		if (slideMenuOpen) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.removeAttribute("style");
		}
	});

	function isActive(href: string): boolean {
		const path = get(page).url.pathname;

		const normalize = (s: string) => {
			const n = s.replace(/\/+$/, "");
			return n === "" ? "/" : n;
		};

		const current = normalize(path);
		const target = normalize(href);

		if (target === "/") return current === "/";

		//active if exact match OR inside a subtree, like /tjanster
		return current === target || current.startsWith(target + "/");
	}

	const hasBreadcrumbs =
		isActive("/tjanster") || isActive("/case") || isActive("/nyheter");

	onMount(() => {
		slideMenuOpen = false;

		let prevScrollpos = 0;

		function handleHeaderScroll() {
			const currentScrollPos = window.scrollY;

			//if disableHeaderHide is true, add the `scrolled` class
			if ($disableHeaderHide) {
				header?.classList.add("scrolled");
			} else if (prevScrollpos <= currentScrollPos) {
				header?.classList.add("scrolled");
			} else {
				header?.classList.remove("scrolled");
			}

			prevScrollpos = currentScrollPos;
		}

		window.addEventListener("scroll", handleHeaderScroll);
	});
</script>

<header bind:this={header} class:has-breadcrumbs={hasBreadcrumbs}>
	<div class="header-container">
		<div class="logo-container">
			{#if !$lightMode}
				<img src="/images/cw_logo.svg" alt="createweb logotyp dark" />
			{:else}
				<img
					src="/images/cw_logo_light.svg"
					alt="createweb logotyp light"
				/>
			{/if}
		</div>
		<nav>
			<ul>
				<li>
					<a
						href="/"
						class:active={isActive("/")}
						class="link-navigation">Hem</a
					>
				</li>
				<li
					onmouseenter={() => ($megaMenuOpen = true)}
					onmouseleave={() => ($megaMenuOpen = false)}
					class="services-link"
				>
					<div
						class:active={isActive("/tjanster")}
						class="mega-menu-dropdown-link link-navigation"
					>
						Tjänster
					</div>
					<MegaMenu />
				</li>
				<li>
					<a
						href="/case"
						class:active={isActive("/case")}
						class="link-navigation">Case</a
					>
				</li>
				<li>
					<a
						href="/nyheter"
						class:active={isActive("/nyheter")}
						class="link-navigation">Nyheter</a
					>
				</li>
				<li>
					<a
						href="/om-oss"
						class:active={isActive("/om-oss")}
						class="link-navigation">Om oss</a
					>
				</li>
			</ul>
		</nav>
		<div class="button-container">
			<a class="cw-button--primary small" href="">Begär en offert</a>
		</div>
		<button
			onclick={() => (slideMenuOpen = !slideMenuOpen)}
			class="hamburger-container"
		>
			<div class="subheading text-accent">
				{#if !slideMenuOpen}
					Meny
				{:else}
					Stäng
				{/if}
			</div>
		</button>
	</div>
	<div class="breadcrumbs-container">
		<Breadcrumbs></Breadcrumbs>
	</div>
	{#if slideMenuOpen}
		<SlideMenu />
	{/if}
</header>
