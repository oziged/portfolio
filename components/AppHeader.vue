<template>
  <transition name="fade">
    <header v-if="headerIsVisible && firstMount" class="app-header container">
      <nuxt-link to="/">
        <span class="logo-text">drvnk.</span>
      </nuxt-link>
      <div
        class="burger"
        ref="burger"
        @mouseenter="burgerMouseEnter"
        @mouseleave="burgerMouseLeave"
        @click="toggleMenu"
      >
        <span class="burger__line line-anim"></span>
        <span class="burger__line"></span>
        <span class="burger__line line-anim"></span>
      </div>
    </header>
  </transition>
</template>

<script>
import gsap from 'gsap'

export default {
  inject: ['updateCursor', 'updateMenu'],


  data() {
    return {
      firstMount: false, // needed to simulate transition 'appear' after load
    }
  },


  computed: {
    headerIsVisible() {
      return this.$route.name != 'index'
    }
  },


  watch: {
    '$store.state.global.menuIsOpened': function(next, prev) {
      if (next) {
        gsap.to('.line-anim', {x: '300%', autoAlpha: 0, ease: 'power3.inOut'})
      } else {
        gsap.to('.line-anim', {x: '0', autoAlpha: 1, ease: 'power3.inOut'})
      }
    }
  },


  mounted() {
    this.firstMount = true
  },


  methods: {
    burgerMouseEnter() {
      this.updateCursor('enablePulse')
      gsap.to('.line-anim', {width: 15, ease: 'power3.out', stagger: .1})
    },

    burgerMouseLeave() {
      this.updateCursor('disablePulse')
      gsap.to('.line-anim', {width: 35, ease: 'power3.out', stagger: .1})
    },

    toggleMenu() {
      if (!this.$store.state.global.menuIsOpened) {
        this.$store.commit('global/SET_STATE', {key: 'menuIsOpened', value: true})
      } else {
        this.$store.commit('global/SET_STATE', {key: 'menuIsOpened', value: false})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-header {
    position: fixed;
    z-index: 2000;
    left: 50%;
    top: 0;
    transform: translate(-50%);
    width: 100vw;
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .burger {
    width: 35px;
    height: 25px;
    padding: 10px;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .burger__line {
    height: 3px;
    width: 35px;
    background-color: white;
  }

  .logo-text {
    font-size: 30px;
  }

  @media (max-width: 1800px) {
    .app-header {
      // max-width: 100%;
      // padding: 0 5rem;
    }
  }

  @media (max-width: 800px) {
    .logo-text {
      font-size: 20px;
    }
  }
</style>
