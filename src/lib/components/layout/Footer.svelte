<script lang="ts">
	import Section from "../grid/Section.svelte";
	import Column from "../grid/Column.svelte";

	import ColumnButton from "../ColumnButton.svelte";
	import StrokedLogo from "../StrokedLogo.svelte";

	import SectionDivider from "./SectionDivider.svelte";
	import { showBookingForm } from "$lib/stores/layoutStore";

	let visible = $state(false);

	let el: HTMLElement;

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.intersectionRatio >= 0.5) {
					visible = true;
				} else {
					visible = false;
				}
			},
			{ threshold: 0.5 }
		);

		if (!el) return;

		observer.observe(el);

		return () => {
			observer.disconnect();
		};
	});
</script>

<SectionDivider borderTop borderBottom></SectionDivider>
<footer bind:this={el}>
	<Section lines="XXXXX">
		<Column class="cw-grid top-container" span={12}>
			<Column class="column" span={3}>
				<img src="/images/cw_logo.svg" alt="cw-logo" />
				<p class="pt-2 pt-xs-1">
					Här på Createweb fokuserar vi på konvertering. Bryt dig loss
					och ta ditt varumärke till nästa nivå.
				</p>
			</Column>
			<Column class="column links" span={3}>
				<p class="subheading text-accent">Tjänster</p>
				<ul>
					<li>
						<a class="link-body" href="tjanster/webbutveckling"
							>Webbutveckling</a
						>
					</li>
					<li>
						<a class="link-body" href="tjanster/marknadsforing"
							>Marknadsföring</a
						>
					</li>
					<li>
						<a class="link-body" href="tjanster/underhall-support"
							>Underhåll & Support</a
						>
					</li>
				</ul>
			</Column>
			<Column class="column links" span={3}>
				<p class="subheading text-accent">Företag</p>
				<ul>
					<li>
						<a class="link-body" href="/case">Case</a>
					</li>
					<li>
						<a class="link-body" href="/om-oss">Om oss</a>
					</li>
					<li>
						<a class="link-body" href="/om-oss">Kontakt</a>
					</li>
				</ul>
			</Column>
			<Column class="column links" span={3}>
				<p class="subheading text-accent">Createweb</p>
				<ul>
					<li>
						<p>Aspvägen 28A</p>
					</li>
					<li>
						<p>191 41 Sollentuna</p>
					</li>
					<li>
						<a class="link-body" href="telto:0762208273"
							>076 220-82 73</a
						>
					</li>
				</ul>
				<div class="button-container">
					<ColumnButton
						buttonText="BOKA ETT 20-MIN MÖTE"
						type="button"
						onClick={() => ($showBookingForm = !$showBookingForm)}
					/>
				</div>
			</Column>
		</Column>
		<!--
		<Column span={12} class="stroked-logo-container">
			<StrokedLogo {visible} />
		</Column>
		-->
		<Column
			span={12}
			class="bottom-container monochrome-striped-background"
			borderTop
			borderLeft
			borderRight
			borderBottom
		></Column>
		<Column
			span={12}
			borderRight
			borderLeft
			class="bottom-container cw-grid"
		>
			<Column
				span={{ lg: 6, xs: 6 }}
				class="d-flex align-center pl-1 pl-xs-1"
			>
				<p class="subheading">&copy; Createweb 2025</p>
			</Column>
			<Column
				span={{ lg: 6, xs: 6 }}
				class="d-flex align-center justify-end pr-1 pr-xs-1"
			>
				<p class="subheading email">
					<a class="link-monospace" href="/integritetspolicy"
						>Integritetspolicy</a
					>
				</p>
			</Column>
		</Column>
	</Section>
</footer>
