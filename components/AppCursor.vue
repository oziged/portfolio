<template>
  <div class="cursor">
    <div class="cursor__point">
    </div>
    <div class="cursor__circle-container">
      <div :class="{'cursor__circle': true, 'cursor__circle_small': cursor_circle_small}"></div>
      <div :class="{'pulse__circle': true, pulsing}" ref="pulse__circle"></div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  data() {
    return {
      listeners: [],
      interval: null,
      clientX: 0,
      clientY: 0,
      delayedX: 0,
      delayedY: 0,
      pulsing: false,
      cursor_circle_small: false
    }
  },


  mounted() {
    this.enableListeners()
  },


  methods: {
    enableListeners() {
      this.listeners.push(document.addEventListener('mousemove', e => {
        if (!this.interval) this.enableInterval()
        this.clientX = e.clientX
        this.clientY = e.clientY
      }))

      this.listeners.push(document.addEventListener('mousedown', () => this.cursor_circle_small = true))
      this.listeners.push(document.addEventListener('mouseup', () => this.cursor_circle_small = false))
      this.listeners.push(document.addEventListener('click', () => this.createSinglePulse()))
    },

    enableInterval() {
      this.interval = setInterval(() => {
        this.delayedX += (this.clientX-this.delayedX)/10
        this.delayedY += (this.clientY-this.delayedY)/10
        gsap.set('.cursor__point', {x: this.clientX-2.5, y: this.clientY-2.5})
        gsap.set('.cursor__circle-container', {x: this.delayedX-15, y: this.delayedY-15})
        if (Math.abs(this.clientX-this.delayedX) < .1 && Math.abs(this.clientY-this.delayedY < .001)) this.disableInterval()
      }, 10)
    },

    disableInterval() {
      clearInterval(this.interval)
      this.interval = null
    },

    enablePulse() {
      this.pulsing = true
    },

    disablePulse() {
      this.pulsing = false
    },

    createSinglePulse() {
      gsap.set(this.$refs['pulse__circle'], {animation: 'freeze'})
      gsap.fromTo(this.$refs['pulse__circle'], {scale: 0, opacity: 1}, {scale: 2.5, opacity: 0, duration: 1.5, ease: 'power3.out', clearProps: 'all'})
    }
  },
}
</script>

<style lang="scss">
  .cursor {
    pointer-events: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    mix-blend-mode: difference;
    .cursor__point {
      position: absolute;
      left: 0;
      top: 0;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: white;
      will-change: transform;
    }
    .cursor__circle-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 30px;
      height: 30px;
      will-change: transform;
      .cursor__circle {
        width: 100%;
        height: 100%;
        border: 1.5px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        transition: .3s ease-out;
        transition-delay: .05s;
      }
      .cursor__circle_small {
        transform: scale(.7);
      }
      .pulse__circle {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        transform: scale(0);
        background-color: rgba(255, 255, 255, 0.363);
      }
      .pulsing {
        animation: pulse-animation 1.5s infinite;
      }
    }
  }

  // animations

  @keyframes pulse-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }
</style>
