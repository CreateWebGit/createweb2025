<script lang="ts">
    import Section from '$components/grid/Section.svelte'
    import Column from '$components/grid/Column.svelte'

    interface Props {
        size?: number;
        striped?: boolean;
        borderTop?: boolean;
        borderBottom?: boolean;
    }

    let { size = 2, striped = true, borderTop, borderBottom }: Props = $props()
</script>

<Section sectionLayoutClass={(
        (borderBottom ? 'cw-border-bottom' : '') +
        (borderTop ? ' cw-border-top' : '')
    ).trim()}>
    <Column span={12} borderLeft borderRight class="py-{size} py-xs-{size} {striped ? 'monochrome-striped-background' : ''}"></Column>
</Section>