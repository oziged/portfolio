<template>
  <div ref="cursor" :class="{cursor: true, hidden: cursorFullIsHidden}">
    <div class="cursor__point-container">
      <div :class="{cursor__point: true, cursor__point_red: cursorPointRed}" ref="cursor-point">
    </div>
    </div>
    <div class="cursor__circle-container">
      <div :class="{'cursor__circle': true, 'cursor__circle_small': cursor_circle_small, hidden: cursorCircleIsHidden}" ref="cursor-circle"></div>
      <div :class="{'pulse__circle': true, pulsing}" ref="pulse-circle"></div>
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
      cursor_circle_small: false,
      cursorCircleIsHidden: false,
      cursorFullIsHidden: false,
      cursorPointRed: false
    }
  },


  mounted() {
    this.enableListeners()
  },

  watch: {
    '$route.path': function() {
      if (gsap.getProperty(this.$refs['cursor-circle'], 'scale') == 0) gsap.to(this.$refs['cursor-circle'], {scale: 1, clearProps: 'all', ease: 'power3.inOut'})
    }
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
        gsap.set('.cursor__point-container', {x: this.clientX, y: this.clientY})
        gsap.set('.cursor__circle-container', {x: this.delayedX-15, y: this.delayedY-15})
        if (Math.abs(this.clientX-this.delayedX) < .001 && Math.abs(this.clientY-this.delayedY < .001)) this.disableInterval()
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

    enableCircle() {
      this.cursorCircleIsHidden = false
    },

    disableCircle() {
      this.cursorCircleIsHidden = true
    },

    enableFullCursor() {
      this.cursorFullIsHidden = false
    },

    disableFullCursor() {
      this.cursorFullIsHidden = true
    },

    scalePoint() {
      gsap.to(this.$refs['cursor-point'], {scale: 2})
    },

    unScalePoint() {
      gsap.to(this.$refs['cursor-point'], {scale: 1})
    },

    enableRedEffect() {
      this.cursorPointRed = true
    },

    disableRedEffect() {
      this.cursorPointRed = false
    },

    createSinglePulse() {
      gsap.set(this.$refs['pulse-circle'], {animation: 'freeze'})
      gsap.fromTo(this.$refs['pulse-circle'], {scale: 0, opacity: 1}, {scale: 2.5, opacity: 0, duration: 1.5, ease: 'power3.out', clearProps: 'all'})
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
    transition: .3s;
    .cursor__point-container {
      position: absolute;
      left: 0;
      top: 0;
      will-change: transform;
    }
    .cursor__point {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: white;
      transform: translate(-50%, -50%);
      transition: .3s;
      &_red {
        background-color: #ff4e26c9;
        transform: translate(-50%, -50%) scale(3);
      }
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
