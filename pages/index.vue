<template>
  <section class="section start" @mousedown="animatePageLeave" @mouseup="animatePageEnter">
    <div class="container start__container">
      <div class="start__text">
        <h1 class="sliding-text start__text-title">
          <span class="sliding-text__char-wrapper"
            v-for="(item, index) in title"
            :key="index"
            @mouseleave="charMouseLeave($event, title[index])"
          >
            <span class="sliding-text__char-container" ref="char-container">
              {{ item.char }}
              <span class="sliding-text__char-sub sliding-text__char-sub_left">{{ item.char }}</span>
              <span class="sliding-text__char-sub sliding-text__char-sub_right">{{ item.char }}</span>
            </span>
          </span>
        </h1>
        <h2 class="start__text-desc">Front - end Developer</h2>
      </div>
    </div>

    <h4 class="start__bottom-text">
      <span
        class="start__bottom-text-char"
        v-for="(item, index) in bottomText" :key="index"
      >
        {{ item.char }}
      </span>
    </h4>

    <WebGLBackground class="start__bg" :uTimeScale="bgSpeed"/>
    <div class="bg-overlay"></div>
    <div class="fr-overlay"></div>
  </section>
</template>

<script>
import gsap from 'gsap'
import WebGLBackground from '@/components/index/WebGLBackground'

export default {
  inject: ['updateCursor'],
  components: {WebGLBackground},


  data() {
    return {
      title: this.prepareString('EUGENE DEREVYANKO'),
      bottomText: this.prepareString('click & hold'),
      bgSpeed: 1, // speed scale of webGL background
      startAnimateIsLoaded: false,
      anim: {
        bottomText: {
          TL: gsap.timeline({paused: true, defaults: {ease: 'power1.inOut'}})
        },
        leave: {
          duration: 2,
          TL: null
        }
      }
    }
  },


  mounted() {
    this.fillTimelines()

    setInterval(() => {
      this.anim.bottomText.TL.play(0)
    }, 3000);

    this.anim.leave.TL.progress(1)
    this.anim.leave.TL.reverse()
    this.startAnimateIsLoaded = true
  },


  beforeRouteLeave (to, from, next) {
    if (to.params.instantly) next()
    else {
      this.anim.leave.TL.play()
      setTimeout(() => {
        next()
      }, this.anim.leave.duration * 1000);
    }
  },


  methods: {
    charMouseLeave(event, obj) {
      if (obj.animating) return
      const rect = event.target.getBoundingClientRect()
      const direction = Math.abs(event.clientX - rect.right) < Math.abs(event.clientX - rect.left) ? 'right' : 'left'

      obj.animating = true
      let container = event.target.querySelector('.sliding-text__char-container')
      gsap.to(container, {x: direction == 'right' ? '120%' : '-120%', duration: 1, ease: 'power3.inOut', clearProps: 'all', onComplete: () => obj.animating = false})
    },

    prepareString(str) {
      return str.split('').map(char => ({char, animating: false}))
    },

    animatePageEnter() {
      this.anim.leave.TL.reverse()
    },

    animatePageLeave() {
      this.anim.leave.TL.play()
    },

    fillTimelines() {
      this.anim.leave.TL = gsap.timeline(
        {
          paused: true,
          defaults: {duration: this.anim.leave.duration, ease: 'power3.inOut'},
          onComplete: () => {
            if (this.startAnimateIsLoaded) {
              this.$router.push({name: 'works', params: {instantly: true}})
            }},
        })

      this.anim.bottomText.TL
        .to('.start__bottom-text-char', {y: -5, duration: .5, stagger: .025})
        .to('.start__bottom-text-char', {y: 0, duration: .5, stagger: .025}, .5)

      this.anim.leave.TL
        .set('.cursor__circle', {clearProps: 'transition'}, 0)
        .set('.cursor__circle', {transition: 0}, .3)
        .to(this, {bgSpeed: 100}, 0)
        .to('.start__text-title', {letterSpacing: '.3rem'}, 0)
        .to('.start__text-desc', {letterSpacing: '.2rem'}, 0)
        .to('.start__bottom-text', {letterSpacing: '.3rem'}, 0)
        .to('.cursor__circle', {scale: 0 }, 0)
        .to('.bg-overlay', {opacity: 1}, 0)
        .to('.fr-overlay', {opacity: 1}, 0)
        .set('.cursor__circle', {transition: 0}, 2)
        .set('.cursor__circle', {clearProps: 'transition'}, 2)
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

  .start__bg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .bg-overlay, .fr-overlay {
    position: fixed;
    pointer-events: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
  }

  .bg-overlay {
    z-index: -1;
    opacity: .8;
  }

  .fr-overlay {
    z-index: 1;
    opacity: 0;
  }

  .start__text {
    color: white;
  }

  .start__text-title {
    font-family: 'Playfair Display', serif;
    letter-spacing: .1rem;
    font-size: 3rem;
  }

  .start__text-desc {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    text-align: center;
  }

  .start__bottom-text {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    color: white;
    transform: translateX(-50%);
  }

  .start__bottom-text-char {
    min-width: .5rem;
    display: inline-block;
    text-align: center;
  }

  .sliding-text {
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
