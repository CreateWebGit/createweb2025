<div class="hero-computer-screen">
    <div class="image-container">
        <!-- asdasdasd -->
         <!-- <iframe src="https://wackoskinn.se" width="100%" height="100%" frameborder="none"></iframe>    -->
    </div>
</div>

<style>
.hero-computer-screen {
    position: absolute;
    z-index: 1;
    top: 13.375rem;
    left: 8.8125rem;
    width: 30.6875rem;
    height: 23.375rem;
    perspective: 62.5rem;
    perspective-origin: 50% 50%;

    .image-container {
        /* background: url('/images/cw_approach_develop.webp'); */
        background-size: cover;
        height: 100%;
        width: 100%;
        transform: scale3d(1, 1, 1) rotateX(11deg) rotateY(331deg) rotateZ(3deg) translate3d(0px, 0px, 0px) skew(1deg, 0deg);
        clip-path: polygon(50% 0%, 100% 0, 100% 43%, 100% 77%, 100% 100%, 32% 100%, 4% 100%, 0% 43%, 0 0);
        background: var(--accent-color);
    }
}
</style>