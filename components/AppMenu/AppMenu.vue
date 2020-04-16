<template>
  <div class="app-menu">
    <div class="app-menu__content-layer">
      <nav class="app-menu__nav-list">
        <nuxt-link
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.path"
          :data-text="item.name"
          class="app-menu__nav-item"
          @mouseenter.native="navItemMouseEnter"
          @mouseleave.native="navItemMouseLeave"
          @click.native="closeMenu"
        >
          {{ item.name }}
          <span class="app-menu__nav-item-subtext">{{ item.name }}</span>
        </nuxt-link>
      </nav>
    </div>
    <div class="app-menu__transition-layer-r"></div>
    <div class="app-menu__transition-layer-l"></div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { vueWindowSizeMixin } from 'vue-window-size'

export default {
  mixins: [vueWindowSizeMixin],
  inject: ['updateCursor'],

  data() {
    return {
      anim: {
        reveal: {
          duration: 1.4,
          TL: null
        }
      },
      navItems: [
        {name: 'home', path: '/'},
        {name: 'works', path: '/works'},
        {name: 'about', path: '/about'}
      ],
      interval: null,
      instantSkewX: 0,
      delayedSkewX: 0,
      listeners: []
    }
  },


  mounted() {
    this.fillTimelines()
    document.addEventListener('mousemove', this.menuMouseMove)
  },


  methods: {
    fillTimelines() {
      const transitionLayers = document.querySelectorAll('.app-menu__transition-layer-r, .app-menu__transition-layer-l')
      this.anim.reveal.TL = gsap.timeline({defaults: {duration: this.anim.reveal.duration}, paused: true})
        .set(transitionLayers, {clearProps: 'all'})
        .set('.app-menu', {autoAlpha: 1})
        .to('.app-menu__transition-layer-r', {y: 0, rotate: 0,  ease: 'power3.inOut'}, 0)
        .to('.app-menu__transition-layer-l', {y: 0, rotate: 0, ease: 'power3.inOut'}, .3)
        .from('.app-menu__content-layer', {autoAlpha: 0, duration: .01})
        .set(transitionLayers, {autoAlpha: 0})
        .from('.app-menu__nav-item', {y: 100, letterSpacing: '15px', autoAlpha: 0, stagger: .2})
    },

    menuMouseMove(event) {
      const skewX = this.windowWidth / 2 - event.clientX
      this.instantSkewX = skewX

      if (this.interval) return

      this.interval = setInterval(() => {
        this.delayedSkewX += (this.instantSkewX-this.delayedSkewX)/20
        gsap.set('.app-menu__nav-item', {skewX: this.delayedSkewX/40})
        if (Math.abs(this.instantSkewX - this.delayedSkewX) < .5) {
          clearInterval(this.interval)
          this.interval = null
        }
      }, 10);
    },

    navItemMouseEnter(event) {
      gsap.to(event.target.querySelector('.app-menu__nav-item-subtext'), {width: '100%', duration: 1, ease: 'power3.inOut'})
      this.updateCursor('enableRedEffect')
      this.updateCursor('disableCircle')
    },

    navItemMouseLeave(event) {
      gsap.to(event.target.querySelector('.app-menu__nav-item-subtext'), {width: '0', duration: 1, ease: 'power3.inOut'})
      this.updateCursor('disableRedEffect')
      this.updateCursor('enableCircle')
    },

    openMenu() {
      this.anim.reveal.TL.timeScale(1).play()
      this.$store.commit('global/SET_STATE', {key: 'menuIsOpened', value: true})
    },

    closeMenu() {
      this.anim.reveal.TL.timeScale(1.5).reverse()
      this.$store.commit('global/SET_STATE', {key: 'menuIsOpened', value: false})
    }
  },
}
</script>

<style lang="scss" scoped>
  .app-menu {
    opacity: 0;
    visibility: hidden;
    position: fixed;
    z-index: 999;
  }

  .app-menu__content-layer {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
  }

  .app-menu__nav-list {
    display: flex;
    font-family: 'Merriweather', serif;
    font-weight: 700;
    text-transform: uppercase;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .app-menu__nav-item {
    position: relative;
    color: transparent;
    font-size: 9rem;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #fff;
    will-change: transform;
  }

  .app-menu__nav-item-subtext {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 9rem;
    color: white;
    width: 0;
    overflow: hidden;
  }

  .app-menu__transition-layer-l, .app-menu__transition-layer-r {
    position: fixed;
    left: -50%;
    top: 0;
    width: 200%;
    height: 100%;
  }

  .app-menu__transition-layer-r {
    background-color: rgb(236, 236, 236);
    transform: translateY(calc(-100% - 3vw)) rotate(3deg);
  }

  .app-menu__transition-layer-l {
    background-color: rgb(0, 0, 0);
    transform: translateY(calc(-100% - 3vw)) rotate(-3deg);
  }
</style>
