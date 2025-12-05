<script lang="ts"> 
    interface Props {
        direction?: 'row' | 'column',
        gap?: number,
        children?: () => any,
        class?: string
    }

    let { direction = 'row', gap = 0, children, class: className }: Props = $props();
</script>

<div class="cw-flex-container d-flex {direction === 'row' ? 'flex-row' : ''} {direction === 'column' ? 'flex-column' : ''} {`gap-` + gap} {className}">
    {#if children}
        {@render children()}
    {/if}
</div>