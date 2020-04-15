<template>
  <div class="text-ticker"  @mousemove="global ? '' : tickerMouseMove($event)" ref="ticker">
    <h1 class="text-ticker__content" ref="ticker-content">&nbsp;{{ formattedText }}</h1>
  </div>
</template>

<script>
import gsap from 'gsap'
import { vueWindowSizeMixin } from 'vue-window-size'

export default {
  mixins: [vueWindowSizeMixin],

  props: {
    text: {
      type: String,
      default: ''
    },

    maxTimeScale: {
      type: Number,
      default: 1
    },

    minTimeScale: {
      type: Number,
      default: .3
    },

    global: {
      type: Boolean,
      default: false
    },

    direction: {
      type: String,
      default: 'right'
    }
  },


  data() {
    return {
      tickerWidth: 0,
      tween: null
    }
  },


  computed: {
    formattedText() {
      return '- ' + this.text + ' - ' + this.text
    },

    scaleFactor() {
      let width = this.global ? this.windowWidth : this.tickerWidth
      return width / (this.maxTimeScale - this.minTimeScale)
    }
  },


  mounted() {
    this.tween = gsap.fromTo(this.$refs['ticker-content'], {xPercent: this.direction == 'right' ? -50 : 0}, {xPercent: this.direction == 'right' ? 0 : -50, repeat: -1, duration: 20, ease: 'linear'})
    this.updateTickerWidth()
    if (this.global) document.addEventListener('mousemove', this.tickerMouseMove)
  },


  watch: {
    windowWidth() {
      this.updateTickerWidth()
    }
  },


  methods: {
    tickerMouseMove(event) {
      let offsetX = this.global ? event.clientX : event.clientX - this.$refs.ticker.getBoundingClientRect().left
      this.tween.timeScale(this.minTimeScale + offsetX / this.scaleFactor)
    },

    updateTickerWidth() {
      this.tickerWidth = this.$refs.ticker.clientWidth
    }
  },
}
</script>

<style lang="scss">
  .text-ticker {
    padding: 0 20px;
    white-space: nowrap;
    font-size: 3rem;
    line-height: 3rem;
    &__content {
      display: inline-block;
      -webkit-text-stroke: 1px #979797;
      color: transparent;
    }
  }
</style>
