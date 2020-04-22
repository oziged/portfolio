<template>
  <section
    class="works"
    @mousewheel="worksMouseWheel"
    @mousemove="worksMouseMove"
    @touchstart="worksTouchStart"
    @touchend="worksTouchEnd"
  >
    <div class="container works__container">
      <a
        class="works__slider-image"
        @mouseenter="sliderImageMouseEnter"
        @mouseleave="sliderImageMouseLeave"
        :href="projects[currentSlide].url"
        target="_blank"
      >
        <client-only>
          <vue-displacement-slideshow
            :images="imagesArray"
            :displacement="require('@/assets/images/displacement.png')"
            :intensity="0.2"
            :speedIn="1.4"
            :speedOut="1.4"
            ease="expo.out"
            @loaded="sliderOnload"
            ref="slideshow"
          />
        </client-only>

        <div class="works__slider-title">
          <span
            class="works__slider-title-word"
            v-for="(word, index) in projects[currentSlide].name"
            :key="index"
            ref="title-words"
          >
            <span class="works__slider-title-char" v-for="(char, index) in word" :key="index" ref="title-chars">{{char}}</span>
          </span>
        </div>

        <div class="works__slider-desc">
          <span
            class="works__slider-desc-word"
            v-for="(word, index) in projects[currentSlide].desc"
            :key="index"
          >
            <span class="works__slider-desc-char" v-for="(char, index) in word" :key="index" ref="desc-chars">{{char}}</span>
          </span>
        </div>
      </a>

      <slider-line-nav
        class="works__slider-nav"
        ref="slider-nav"
        :length=projects.length
        :currentIndex="currentSlide"
        @slideChange="index => changeSlide('goto', index)"
      />

      <a
        class="works__discover"
        @mouseenter="discoverMouseEnter"
        @mouseleave="discoverMouseLeave"
        :href="projects[currentSlide].url"
        target="_blank"
      >
        <span class="works__discover-char" v-for="(char, index) in 'Discover'.split('')" :key="index">{{ char }}</span>
      </a>
    </div>
  </section>
</template>

<script>
import gsap from 'gsap'
import VueDisplacementSlideshow from "vue-displacement-slideshow";
import SliderLineNav from '@/components/works/SliderLineNav'
import { vueWindowSizeMixin } from 'vue-window-size'

export default {
  components: {VueDisplacementSlideshow, SliderLineNav},
  inject: ['updateCursor', 'updateMenu'],
  mixins: [vueWindowSizeMixin],

  data() {
    return {
      currentSlide: 0,
      sliderIsAnimating: true,
      enterTL: null,
      touch: {
        start: {x: 0, y: 0},
        end: {x: 0, y: 0}
      },
      projects: [
        {
          name: ['Travel', 'App'],
          desc: ['Vue.js'],
          img: require('@/assets/images/projects/travel/preview.png'),
          url: 'https://oziged.github.io/projects/vue-app/'
        },
        {
          name: ['Youtube', 'Random'],
          desc: ['Vue.js', ' + ', 'Nuxt', ' + ', 'GSAP'],
          img: require('@/assets/images/projects/yt/preview.png'),
          url: 'https://yt-random.herokuapp.com/'
        },
        {
          name: ['Company', 'Layout'],
          desc: ['JS', ' + ', 'GSAP'],
          img: require('@/assets/images/projects/ninja/preview.png'),
          url: 'http://ninja-layout.herokuapp.com/'
        },
        {
          name: ['Sofa', 'Selector'],
          desc: ['Vue.js', ' + ', 'THREE.js '],
          img: require('@/assets/images/projects/three-js/preview.png'),
          url: 'http://three-js-interier.herokuapp.com/'
        },
        {
          name: ['Simple', 'TodoApp'],
          desc: ['Vue.js'],
          img: require('@/assets/images/projects/todo/preview.png'),
          url: 'http://simple-todo-eu.herokuapp.com/'
        },
      ],
    }
  },


  computed: {
    imagesArray() {
      return this.projects.map(item => item.img)
    }
  },


  async beforeRouteLeave (to, from, next) {
    gsap.to([this.$refs.slideshow.$el, this.$refs['slider-nav'].$el], {autoAlpha: 0})
    this.enterTL.pause()
    await this.leaveAnim()
    next()
  },


  mounted() {
    this.fillTimelines()
  },


  methods: {
    async changeSlide(type, index) {
      if (this.sliderIsAnimating) return
      this.sliderIsAnimating = true
      await this.leaveAnim()
      this.updateCurrentSlide(type, index)
      await this.$nextTick()
      await this.appearAnim()
      this.sliderIsAnimating = false
    },

    updateCurrentSlide(type, index) {
      let limit = this.projects.length-1
      if (type == 'next') {
        if (this.currentSlide == limit) {
          this.currentSlide = 0
          this.$refs.slideshow.goTo(0)
        } else {
          this.currentSlide += 1
          this.$refs.slideshow.next()
        }
      }

      if (type == 'prev') {
        if (this.currentSlide == 0) {
          this.currentSlide = limit
          this.$refs.slideshow.goTo(limit)
        } else {
          this.currentSlide -= 1
          this.$refs.slideshow.previous()
        }
      }

      if (type == 'goto' && index >= 0 && index <= limit) {
        this.currentSlide = index
        this.$refs.slideshow.goTo(index)
      }
    },

    leaveAnim() {
      let leaveSlideTL = gsap.timeline()

      this.$refs['title-words'].forEach(word => {
        leaveSlideTL.add(gsap.to(word.querySelectorAll('.works__slider-title-char'), {y: 40, stagger: .025, ease: 'circ.inOut', duration: .8}), 0)
        leaveSlideTL.add(gsap.to(word.querySelectorAll('.works__slider-title-char'), {autoAlpha: 0, stagger: .01, duration: .5}), 0)
      })

      leaveSlideTL
        .to('.works__discover-char', {autoAlpha: 0, stagger: .025, ease: 'power1.inOut'}, 0)
        .to('.works__slider-desc-char', {autoAlpha: 0, stagger: .025, ease: 'power1.inOut'}, 0)

      return leaveSlideTL
    },

    appearAnim() {
      let appearSlideTL = gsap.timeline()

      this.$refs['title-words'].forEach(word => {
        appearSlideTL.add(gsap.fromTo(word.querySelectorAll('.works__slider-title-char'), {y: 40}, {y: 0, stagger: .025, ease: 'power3.out', duration: 1.2}), 0)
        appearSlideTL.add(gsap.fromTo(word.querySelectorAll('.works__slider-title-char'), {autoAlpha: 0}, {autoAlpha: 1, stagger: .01, duration: .5}), .2)
      })

      appearSlideTL
        .to('.works__discover-char', {autoAlpha: 1, stagger: .025, ease: 'power1.inOut'}, 0)
        .to('.works__slider-desc-char', {autoAlpha: 1, stagger: .025, ease: 'power1.inOut'}, 0)

      return appearSlideTL
    },

    async sliderOnload() {
      await this.enterTL.restart()
      this.sliderIsAnimating = false
    },

    worksMouseWheel(event) {
      if (event.deltaY > 0) this.changeSlide('next')
      else this.changeSlide('prev')
    },

    worksMouseMove(event) {
      gsap.to(
        this.$refs.slideshow.$el,
        {
          rotationY: (event.clientX - this.windowWidth/2)/400,
          rotationX: -(event.clientY - this.windowHeight/2)/200,
          ease: 'power3.out',
          duration: 2
        }
      )
    },

    worksTouchStart(event) {
      event = event.touches[0]
      this.touch.start.x = event.clientX
      this.touch.start.y = event.clientY
    },

    worksTouchEnd(event) {
      event = event.changedTouches[0]
      this.touch.end.x = event.clientX
      this.touch.end.y = event.clientY

      let diffX = this.touch.end.x - this.touch.start.x
      let diffY = this.touch.end.y - this.touch.start.y

      let biggerDiff

      if (Math.abs(diffX) > Math.abs(diffY)) biggerDiff = diffX
      else biggerDiff = diffY

      if (biggerDiff < 20) this.changeSlide('next')
      if (biggerDiff > 20) this.changeSlide('prev')
    },

    sliderImageMouseEnter() {
      this.updateCursor('enableRedEffect')
      this.updateCursor('disableCircle')
    },

    sliderImageMouseLeave() {
      this.updateCursor('disableRedEffect')
      this.updateCursor('enableCircle')
    },

    discoverMouseEnter() {
      this.updateCursor('enablePulse', 'disableCircle')
    },

    discoverMouseLeave() {
      this.updateCursor('disablePulse', 'enableCircle')
    },

    fillTimelines() {
      this.enterTL = gsap.timeline({paused: true})

      this.$refs['title-words'].forEach(word => {
        this.enterTL.from(word.querySelectorAll('.works__slider-title-char'), {y: 60, stagger: .025, ease: 'power2.inOut', duration: 1.5}, 0)
        this.enterTL.to(word.querySelectorAll('.works__slider-title-char'), {autoAlpha: 1, delay: .5, duration: 1.5}, 0)
      })

      this.enterTL.set('.works__slider-nav', {autoAlpha: 1}, 0)
      this.enterTL.from('.slider-nav__item', {x: -30, autoAlpha: 0, stagger: .2, ease: 'power1.inOut', duration: 1.5}, .5)
      this.enterTL.from('.works__slider-image', {x: -100, autoAlpha: 0, duration: 1.5, ease: 'power3.inOut'}, 0)
      this.enterTL.to('.works__discover-char', {autoAlpha: 1, stagger: -.08, ease: 'power1.inOut', duration: 1.5}, 0)
      this.enterTL.to('.works__slider-desc-char', {autoAlpha: 1, stagger: .08, ease: 'power1.inOut', delay: .5, duration: 1.5}, 0)
    }
  }
}
</script>

<style lang="scss">
  .works {
    height: 100vh;
  }

  .works__container {
    position: relative;
    height: 100%;
  }

  .works__slider-image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 65%;
    perspective: 1000px;
  }

  .works__slider-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(0%, -50%);
    font-size: 7rem;
    font-family: 'Merriweather', serif;
    line-height: 7rem;
    font-weight: 700;
    text-align: center;
  }

  .works__slider-title-word {
    display: flex;
  }

  .works__slider-title-char {
    opacity: 0;
  }

  .works__slider-desc {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-130%);
    font-size: 1.5rem;
  }

  .works__slider-desc-word {
    display: block;
    writing-mode: vertical-lr;
    margin-bottom: 10px;
  }

  .works__slider-desc-char {
    opacity: 0;
  }

  .works__slider-nav {
    opacity: 0;
    position: absolute;
    left: calc((100% - 1720px) / 2);
    top: 50%;
    transform: translateY(-50%);
  }

  .works__discover {
    position: absolute;
    left: 50%;
    bottom: 8.75vh;
    transform: translate(-50%, 50%);
    font-size: 2rem;
    font-family: 'Merriweather', serif;
    font-weight: 300;
    &:before {
      position: absolute;
      content: '';
      left: 0;
      top: 55%;
      width: 0;
      height: 1px;
      background-color: white;
      transition: .5s ease-in-out;
    }
    &:hover:before {
      width: 100%;
    }
  }

  .works__discover-char {
    opacity: 0;
  }

  @media (max-width: 1800px) {
    .works__slider-nav {
      left: 5rem;
    }
  }

  @media (max-width: 1000px) {
    .works__slider-nav {
      display: none;
    }

    .works__slider-image {
      width: 60%;
      height: 50%;
    }

    .works__slider-title {
      transform: translate(-50%, -50%);
    }

    .works__slider-title-word {
      justify-content: center;
    }

    .works__slider-desc {
      display: none;
    }

    .works__discover {
      bottom: 17.5%;
    }
  }

  @media (max-width: 600px) {
    .works__slider-image {
      width: 90%;
      height: 50%;
    }
  }
</style>
