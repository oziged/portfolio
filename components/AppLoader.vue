<template>
  <div class="app-loader">
    <span class="app-loader__text">DRVNK</span>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  methods: {
    async revealAnim() {
      await gsap.to('.app-loader', {scale: 200, autoAlpha: 0, duration: 2.5, ease: 'power3.inOut'})
    }
  },
}
</script>

<style lang="scss">
  .app-loader {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;

    &__text {
      font-size: 10rem;
      font-family: 'Merriweather', serif;
    }
  }
</style>
