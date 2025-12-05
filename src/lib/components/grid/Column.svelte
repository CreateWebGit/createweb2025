<script lang="ts">
    type BP = 'xs' | 'lg';
    type ResponsiveValue = number | Partial<Record<BP, number>>;

    interface Props {
        children?: any;
        span?: ResponsiveValue;
        start?: ResponsiveValue;
        end?: ResponsiveValue;
        class?: string;
        style?: string;
        borderLeft?: boolean;
        borderRight?: boolean;
        borderTop?: boolean;
        borderBottom?: boolean;
    }

    let { children, span, start, end, class: className, style, borderLeft, borderTop, borderBottom, borderRight }: Props = $props();

    function normalizeSpan(value?: ResponsiveValue): Partial<Record<BP, number>> {
        if (typeof value === 'number') return { xs: 12, lg: value };
        if (typeof value === 'object' && value !== null) {
            return { xs: value.xs ?? 12, lg: value.lg };
        }
        return { xs: 12 };
    }

    function classesFor(prefix: string, value?: ResponsiveValue) {
        if (value == null) return '';
        if (typeof value === 'number') {
            return `${prefix}-xs-12 ${prefix}-${value}`;
        }
        return [
            value.lg != null ? `${prefix}-${value.lg}` : '',
            value.xs != null ? `${prefix}-xs-${value.xs}` : ''
        ]
        .filter(Boolean)
        .join(' ');
    }

    const normalizedSpan = normalizeSpan(span);

    const columnClasses = [
        classesFor('cw-col', normalizedSpan),
        classesFor('cw-cs', start),
        classesFor('cw-ce', end),
        className
    ].filter(Boolean).join(' ');
</script>

<div class={columnClasses} {style} class:border-right={borderRight} class:border-left={borderLeft} class:border-top={borderTop} class:border-bottom={borderBottom}>
    {@render children?.()}
</div>