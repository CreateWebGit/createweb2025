<script lang="ts">
    import HeroComputerScreen from "./HeroComputerScreen.svelte";
</script>

<div class="hero-computer-container">
    <img class="computer-overlay" src="/images/cw_computer.png"/>
    <HeroComputerScreen/>
</div>

<style lang="scss">
    .hero-computer-container {
        position: relative;
        height: 100%;
        bottom: -2.05rem;

        .computer-overlay {
            position: absolute;
            bottom: 0;
            left: -7rem;
            width: 52.6875rem;
            height: 38.75rem;
            pointer-events: none;
            z-index: 2;
        }
    }
</style>