<script lang="ts">
    import { page } from "$app/state";
    const currentPath = $derived(page.url.pathname);
    import CaretRight from "phosphor-svelte/lib/CaretRight";
    import CaretLeft from "phosphor-svelte/lib/CaretLeft";


    type NavItem = {
        title: string;
        url: string;
        sublinks?: NavItem[];
    };

    const links: NavItem[] = [
        {
            title: "hem",
            url: "/",
        },
        {
            title: "tjänster",
            url: "/tjanster",
            sublinks: [
                {
                    title: "webbutveckling",
                    url: "/tjanster/webbutveckling",
                    sublinks: [
                        {
                            title: "frontend",
                            url: "/tjanster/webbutveckling",
                        },
                        {
                            title: "backend",
                            url: "/tjanster/marknadsforing",
                        },
                        {
                            title: "design",
                            url: "/tjanster/underhall-support",
                        },
                    ],
                },
                {
                    title: "marknadsföring",
                    url: "/tjanster/marknadsforing",
                },
                {
                    title: "underhåll & support",
                    url: "/tjanster/underhall-support",
                },
            ],
        },
        {
            title: "case",
            url: "/case",
        },
        {
            title: "nyheter",
            url: "/nyheter",
        },
        {
            title: "om oss",
            url: "/om-oss",
        },
    ];

    // Find the "best" chain of nodes that match the current path
    function findBestChain(items: NavItem[], path: string): NavItem[] {
        let bestChain: NavItem[] = [];

        function walk(nodes: NavItem[], chain: NavItem[]) {
            for (const node of nodes) {
                const isRoot = node.url === "/";
                const isExact = path === node.url;
                const isPrefix =
                    !isRoot &&
                    (path === node.url || path.startsWith(node.url + "/"));

                if (isExact || isPrefix || (isRoot && path === "/")) {
                    const newChain = [...chain, node];

                    if (newChain.length > bestChain.length) {
                        bestChain = newChain;
                    }

                    if (node.sublinks && node.sublinks.length > 0) {
                        walk(node.sublinks, newChain);
                    }
                }
            }
        }

        walk(items, []);
        return bestChain;
    }

    // Local state: stack of visible levels
    let viewStack = $state<NavItem[][]>([links]);
    let viewLevelIndex = $state(0);

    // Parallel array of titles per level (same indices as viewStack)
    let levelTitles = $state<(string | null)[]>(["Meny"]);

    // Sync stack + titles with currentPath (default behavior = follow URL)
    $effect(() => {
        const chain = findBestChain(links, currentPath);

        const stack: NavItem[][] = [links];
        const titles: (string | null)[] = ["Meny"]; // root label

        for (const node of chain) {
            if (node.sublinks && node.sublinks.length > 0) {
                stack.push(node.sublinks);
                titles.push(node.title);
            }
        }

        viewStack = stack;
        levelTitles = titles;
        viewLevelIndex = stack.length - 1;
    });

    const visibleItems = $derived(viewStack[viewLevelIndex] ?? links);
    const currentLevelTitle = $derived(
        levelTitles[viewLevelIndex] ?? "Meny"
    );

    function isActive(item: NavItem, path: string): boolean {
        if (item.url === "/") return path === "/";
        return path === item.url || path.startsWith(item.url + "/");
    }

    function goBack() {
        if (viewLevelIndex > 0) {
            viewLevelIndex = viewLevelIndex - 1;
        }
    }

    function goRoot() {
        viewLevelIndex = 0;
    }

    function openLevel(item: NavItem) {
        if (!item.sublinks || item.sublinks.length === 0) return;

        // Trim stack + titles to current view
        const trimmedStack = viewStack.slice(0, viewLevelIndex + 1);
        const trimmedTitles = levelTitles.slice(0, viewLevelIndex + 1);

        viewStack = [...trimmedStack, item.sublinks];
        levelTitles = [...trimmedTitles, item.title];

        viewLevelIndex = viewStack.length - 1;
    }
</script>

<nav class="slide-menu-container">
    <div class="menu-controls-container">
        <div class="back-button">
            {#if viewLevelIndex > 0}
                <button onclick={goBack}>
                    <p class="subheading text-accent"><CaretLeft/></p>
                </button>
            {/if}
        </div>
        <div class="current-directory">
            <p class="subheading text-white">{currentLevelTitle}</p>
        </div>
        <div></div>
    </div>
    <div class="menu-tabs-container">
        {#each visibleItems as item}
            <div class="link">
                <a href={item.url}>{item.title}</a>
                {#if item.sublinks && item.sublinks.length}
                    <button onclick={() => openLevel(item)}>
                        <CaretRight/>
                    </button>
                {/if}
            </div>
        {/each}
    </div>
</nav>

<style lang="scss">
    .slide-menu-container {
        height: 100vh;
        background: var(--bg-color);
        position: absolute;
        width: 100%;
        top: 4rem;
        left: 0;
        padding: 0 2rem;
        display: grid;
        grid-template-rows: 2.5rem 1fr;

        .menu-controls-container {
            border: 1px solid var(--border-color);
            height: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            align-items: center;
            padding: 0 1rem;

            .back-button button {
                all: unset;
                appearance: none;
                height: 100%;
                display: block;
            }

            .current-directory {
                justify-self: center;
            }
        }

        .menu-tabs-container {
            border: 1px solid var(--border-color);
            border-top: none;
            display: flex;
            flex-direction: column;

            .link {
                height: 4rem;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                padding: 0 1rem;
                font-size: 1.25rem;
                font-weight: 500;
                color: white;
                text-transform: capitalize;
                justify-content: space-between;

                button {
                    all: unset;
                    height: 100%;
                    width: 2rem;
                    display: grid;
                    place-items: center;
                }
            }
        }
    }
</style>