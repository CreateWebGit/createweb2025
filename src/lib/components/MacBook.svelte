<script lang="ts">
    interface Props {
        children?: () => any
    }

    let { children }: Props = $props()
</script>

<div class="macbook">
    <div class="screen">
        <div class="content">
            {#if children}
                {@render children()}
            {/if}
        </div>
    </div>
    <div class="body">
    </div>
</div>

<style lang="scss">
    .macbook {
        display: flex;
        flex-direction: column;
        align-items: center;

        .screen {
            display: grid;
            height: 50.6875rem;
            width: 73.5625rem;
            background: url('/images/macbook_mockup/screen.svg') no-repeat center / 100%;
            padding: 0.75rem 0.75rem 2rem 0.75rem;
            border-top-left-radius: 2.5rem;
            border-top-right-radius: 2.5rem;
            position: relative;
            z-index: 2;
            overflow: hidden;

            .content {
                position: relative;
                z-index: 1;
                border-top-left-radius: 2rem;
                border-top-right-radius: 2rem;
                overflow: hidden;
            }
        }

        .body {
            background: url('/images/macbook_mockup/body.svg') no-repeat center / 100%;
            width: 87.875rem;
            height: 2.125rem;
            // img {
                
            // }
        }
    }
</style>