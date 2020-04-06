<template>
  <section class="section start">
    <div class="container start__container">
      <div class="start__text">
        <h1 class="sliding-text start__text-title">
          <span class="sliding-text__char-wrapper"
            v-for="(item, index) in title"
            :key="index"
            @mouseleave="event => charMouseLeave(event, title[index])"
          >
            <span class="sliding-text__char-container">
              {{ item.char }}
              <span class="sliding-text__char-sub sliding-text__char-sub_left">{{ item.char }}</span>
              <span class="sliding-text__char-sub sliding-text__char-sub_right">{{ item.char }}</span>
            </span>
          </span>
        </h1>
        <h2 class="start__text-desc">Front-end Developer</h2>
      </div>
    </div>

    <WebGLBackground class="start__background"/>
    <div class="start__background-overlay"></div>
  </section>
</template>

<script>
import gsap from 'gsap'
import WebGLBackground from '@/components/index/WebGLBackground'

export default {
  layout: 'clear',
  inject: ['updateCursor'],
  components: {WebGLBackground},


  data() {
    return {
      title: this.prepareString('EUGENE DEREVYANKO'),
    }
  },


  mounted() {
    console.log(this.name)
  },


  methods: {
    charMouseEnter(event) {
    },

    charMouseLeave(event, obj) {
      if (obj.animating) return
      const rect = event.target.getBoundingClientRect()
      const direction = Math.abs(event.clientX - rect.right) < Math.abs(event.clientX - rect.left) ? 'right' : 'left'

      obj.animating = true
      let container = event.target.querySelector('.sliding-text__char-container')
      if (direction == 'right') gsap.to(container, {x: '120%', duration: 1, ease: 'power3.inOut', clearProps: 'all', onComplete: () => obj.animating = false})
      if (direction == 'left') gsap.to(container, {x: '-120%', duration: 1, ease: 'power3.inOut', clearProps: 'all', onComplete: () => obj.animating = false})
    },

    prepareString(str) {
      return str.split('').map(char => ({char, animating: false}))
    }
  },
}
</script>

<style lang="scss">
  .start {
    height: 100vh;
    min-height: 600px;
  }

  .start__container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .start__background {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .start__background-overlay {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .7;
  }

  .start__text {
    color: white;
  }

  .start__text-title {
    font-family: 'Playfair Display', serif;
    letter-spacing: .1rem;
  }

  .start__text-desc {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    text-align: center;
  }

  .sliding-text {
    font-size: 3rem;
    * {
      display: inline-block;
    }
  }

  .sliding-text__char-wrapper {
    overflow: hidden;
    position: relative;
    min-width: 1.5rem;
  }

  .sliding-text__char-sub {
    position: absolute;
    top: 0;
    left: 0;
  }

  .sliding-text__char-sub_left {
    transform: translateX(-120%);
  }

  .sliding-text__char-sub_right {
    transform: translateX(120%);
  }
</style>>
