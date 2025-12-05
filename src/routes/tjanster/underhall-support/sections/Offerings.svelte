<script lang="ts">
    import Section from "$components/grid/Section.svelte";
    import Column from "$components/grid/Column.svelte";
	import StripedContainer from "$components/layout/StripedContainer.svelte";
    import { lightMode } from "$stores/themeStore";

    type TabId = "tab-1" | "tab-2" | "tab-3" | "tab-4" | "tab-5" | "tab-6";

    const tabs: { id: TabId; label: string }[] = [
        { id: "tab-1", label: "tab 1" },
        { id: "tab-2", label: "tab 2" },
        { id: "tab-3", label: "tab 3" },
        { id: "tab-4", label: "tab 4" },
        { id: "tab-5", label: "tab 5" },
        { id: "tab-6", label: "tab 6" },
    ];

    let activeIndex = $state(0);
    let progress = $state(0); // 0–1

    let wrapperEl: HTMLDivElement | null = null;
    const steps = tabs.length;

    const activeTab = $derived(tabs[activeIndex]);

    //TODO: eventually remove the useEffect, yours truly hates them. doable now.
    $effect(() => {
        if (!wrapperEl) return;

        const html = document.documentElement;

        const onScroll = () => {
            const rect = wrapperEl!.getBoundingClientRect();
            const vh = window.innerHeight;

            const maxOffset = vh * (steps - 1);
            const rawOffset = -rect.top;
            const clampedOffset = Math.min(Math.max(rawOffset, 0), maxOffset);

            //each tab owns a fraction of p (0 -> 1)
            const p = maxOffset === 0 ? 0 : clampedOffset / maxOffset;
            progress = p;

            const segmentSize = 1 / steps;
            const rawIndex = Math.floor(p / segmentSize);
            const step = Math.min(steps - 1, rawIndex);

            activeIndex = step;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); //init immidietly

        //clean up onscroll and observer
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    });

    const scrollToTab = (index: number) => {
        //TODO: refactor this overengineered abomination
        if (!wrapperEl) return;

        const rect = wrapperEl.getBoundingClientRect();
        const vh = window.innerHeight;

        //since each tab owns a fraction of p (0 -> 1)
        //we pick a "p" inside that segment, convert it back to a scroll offset, and scroll there.

        const steps = tabs.length;
        const maxOffset = vh * (steps - 1);

        //same segmentation as in the effect: 0..1 split in "steps" pieces
        const segmentSize = 1 / steps;

        //choose the CENTER of the segment for this tab
        const pCenter = (index + 0.5) * segmentSize;

        const targetOffset = pCenter * maxOffset;

        //absolute top of the wrapper in page coordinates
        const wrapperTopAbs = window.scrollY + rect.top;
        const targetScroll = wrapperTopAbs + targetOffset;

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth"
        });
    }
</script>

<!-- scroll space wrapper, 100vh * amount of tabs -->
<div bind:this={wrapperEl} class="sticky-scroll-wrapper" style={`height: calc(100vh * ${tabs.length});`}>
    <Section lines="XXXXX" sectionLayoutClass="sticky-layout" borderBottom={true}>
        <Column span={12} class="py-8">
            <p class="subheading text-accent text-center">SÅ HÄR JOBBAR VI</p>
            <h2 class="text-center">DIGITAL MARKNADSFÖRING</h2>
        </Column>

        <Column class="sticky-tabs" span={12}>
            <div class="progress">
                <div class="progress-bar" style={`transform: scaleX(${progress});`}></div>
            </div>
            <div class="tab-button-container">
                {#each tabs as tab, i}
                    <button onclick={() => scrollToTab(i)} class="tab-button" class:active={i === activeIndex}>
                        {tab.label}
                        <div class="indicator-container">
                            <div class="indicator"></div>
                            <div class="indicator-blur"></div>
                        </div>
                    </button>
                {/each}
            </div>
        </Column>
    </Section>
</div>

<style lang="scss">
//the outer scroll area – how far you have to scroll for all X amount of tabs
:global(.sticky-scroll-wrapper) {
    position: relative;
}

//make THIS instance of section sticky + 100vh
:global(.section-layout.sticky-layout) {
    position: sticky;
    top: 0;
    height: 100vh;
}

:global(.sticky-tabs) {
    .tab-button-container {
        display: flex;
        
        .tab-button {
            all: unset;
            width: 100%;
            height: 4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            text-transform: uppercase;
            border-top: 1px solid var(--border-color);
            border-bottom: 1px solid var(--border-color);
            color: light-dark(#ababab, #909090);
            gap: 0.25rem;
            cursor: pointer;
            transition: background-color 0.1s ease;


            .indicator-container {
                position: relative;

                .indicator {
                    height: 0.1875rem;
                    border-radius: 0.1875rem;
                    width: 1.25rem;
                    background-color: var(--border-color);
                    transition: background-color 0.1s ease;
                }

                .indicator-blur {
                    height: 0.1875rem;
                    border-radius: 0.1875rem;
                    width: 1rem;
                    background: var(--border-color);
                    filter: blur(2px);
                    position: absolute;
                    top: 1px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    opacity: 0.75;
                    display: none;
                }
            }

            &.active {
                color: var(--bw);
                background-color: light-dark(#bebebe35, #31313135);
                box-shadow: inset 0 .4375rem .6875rem -.3125rem light-dark(#fff,transparent),inset 0 -.1875rem .3125rem 0 light-dark(rgba(178,178,178,.25),transparent);

                .indicator, .indicator-blur {
                    background: var(--accent-color);
                    display: block;
                }
            }
        }
    }
}

.progress {
    height: 2px;
    border-radius: 999px;
    overflow: hidden;

    .progress-bar {
        height: 100%;
        transform-origin: left center;
        background: var(--accent-color);
    }
}
</style>