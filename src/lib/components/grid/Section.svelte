<script lang="ts">
	interface Props {
		children?: any;
		class?: string;
		style?: string;
		lines?: string; // pattern like "XX-XX", "--X--", etc.
		borderBottom?: boolean;
		borderTop?: boolean;
		sectionLayoutClass?: string;
	}

	let {
		children,
		class: className,
		style,
		lines = "",
		borderBottom,
		borderTop,
		sectionLayoutClass = "",
	}: Props = $props();

	const bgStyle = $derived(() => {
		const positions = ["0%", "25%", "50%", "75%", "100%"];

		const active = lines
			.replace(/\s+/g, "")
			.split("")
			.map((c, i) => (c.toUpperCase() === "X" ? positions[i] : null))
			.filter(Boolean);

		if (!active.length) return "";

		return `
            background-image: ${active.map(() => `linear-gradient(to bottom, var(--border-color), var(--border-color))`).join(", ")};
            background-size: ${active.map(() => `1px 100%`).join(", ")};
            background-position: ${active.map((p) => `${p} 0`).join(", ")};
            background-repeat: no-repeat;
        `;
	});

	const finalStyle = $derived(() => `${style ?? ""}; ${bgStyle()}`);
</script>

<div class={`section-layout ${sectionLayoutClass}`}>
	<section
		class={`cw-grid ${className ?? ""}`}
		class:borderBottom
		class:borderTop
		style={finalStyle()}
	>
		{@render children?.()}
	</section>
</div>

<style lang="scss">
	.section-layout {
		display: grid;
		grid-template-columns: 1fr var(--section-width) 1fr;
		grid-template-areas: "gutter-1 section gutter-2";

		section {
			grid-area: section;

			&.borderTop {
				border-top: 1px solid var(--border-color);
			}

			&.borderBottom {
				border-bottom: 1px solid var(--border-color);
			}

			@media (max-width: 768px) {
				background-image: none !important;
			}
		}
	}
</style>
