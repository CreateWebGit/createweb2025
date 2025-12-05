<!-- Tjänster/Webbutveckling -->
<script lang="ts">
    //grid
    import Section from '$components/grid/Section.svelte'
    import Column from '$components/grid/Column.svelte'
    
    //layout
    import Header from '$components/layout/Header.svelte'
    import Footer from '$components/layout/Footer.svelte'

    //sections
    // import Hero from './sections/Hero.svelte';
    // import StackThree from './sections/StackThree.svelte';
    // import Offerings from './sections/Offerings.svelte';
    // import Approach from './sections/Approach.svelte';
    // import Case from '$src/lib/sections/Case.svelte';
    // import FAQ from '$src/lib/sections/FAQ.svelte';

    import Hero from '$lib/sections/Hero.svelte'

    //types
    import type { AccordionItem } from '$src/lib/models/accordion';

    const accordionItems: AccordionItem[] = [
        {
            title: 'Frontend',
            content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>',
            open: true
        },
        {
            title: 'Backend',
            content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>',
        },
        {
            title: 'Prestanda',
            content: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aut? Lorem ipsum dolor sit.</p>'
        },
    ]
</script>

<Header/>

<Hero
    title={`Vi bygger en webb du vill komma <span class="highlight">tillbaka</span> till.`}
    description="Från första klicket till sista raden kod – vi utvecklar hemsidor och webbappar som känns lika bra som de ser ut. Snabba, snygga och skräddarsydda."
    {accordionItems}
/>
<Footer/>