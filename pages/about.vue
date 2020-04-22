<template>
<section class="section about">
  <div class="about__hero" :style="{paddingTop: heroPadding + 'px'}">
    <div class="container about__container">
      <h1
        class="about__hero-title"
        ref="hero-title"
        v-on-appear="() => bottomRevealTween($refs['hero-char'], {stagger: .02, duration: 1.5, ease: 'expo.out'})">
        <span class="about__hero-word" v-for="(word, index) in title" :key="index" ref="hero-word">
          <span
            class="about__hero-char"
            v-for="(char, index) in word"
            :key="index"
            ref="hero-char"
            @mouseenter="charLeaveAnim"
          >
            {{ char }}
          </span>
          <br>
        </span>
      </h1>
    </div>
  </div>

  <div class="about__content">
    <div class="container about__container flex">
      <div class="about__contact-block">
        <contact-block
          ref="contact-block"
          v-on-appear="() => bottomRevealTween($refs['contact-block'].$el)"
        />
      </div>
      <div class="about__story" ref="about-story">
        <p class="about__story-p" ref="about-p-1" v-on-appear="() => bottomRevealTween($refs['about-p-1'], {duration: 1.5, skewY: 2.5})">Hi, how are you?</p>
        <p class="about__story-p" ref="about-p-2" v-on-appear="() => bottomRevealTween($refs['about-p-2'], {duration: 1.5, skewY: 2.5})">
          I am a web developer from Zaporizhia, Ukraine.</p>
        <p class="about__story-p" ref="about-p-3" v-on-appear="() => bottomRevealTween($refs['about-p-3'], {duration: 1.5, skewY: 2.5})">
          I have a year of development experience, during which I participated in the creation of web applications at different stages.</p>
        <p class="about__story-p" ref="about-p-4" v-on-appear="() => bottomRevealTween($refs['about-p-4'], {duration: 1.5, skewY: 2.5})">
          During this time, from the frontend part, I was creating applications based on Vue.js and Nuxt, doing responsive layout with different animations and interactive elements.</p>
        <p class="about__story-p" ref="about-p-5" v-on-appear="() => bottomRevealTween($refs['about-p-5'], {duration: 1.5, skewY: 2.5})">
          From the backend, I was adding new features to the existing application based on Ruby on Rails.</p>
        <p class="about__story-p" ref="about-p-6" v-on-appear="() => bottomRevealTween($refs['about-p-6'], {duration: 1.5, skewY: 2.5})">
          At the moment, my main technologies are HTML/CSS/JS(Vue.js/Nuxt)/RoR, but in the future I would also like to learn React and Node.js.</p>
        <p class="about__story-p" ref="about-p-7" v-on-appear="() => bottomRevealTween($refs['about-p-7'], {duration: 1.5, skewY: 2.5})">
          Also, I really like different animations and if there is any opportunity to work with them, I definitely use it. For animations I use GSAP and THREE.js</p>
        <p class="about__story-p" ref="about-p-7" v-on-appear="() => bottomRevealTween($refs['about-p-7'], {duration: 1.5, skewY: 2.5})">
          Feel free to contact me, I’m open to any proposals or offers. I hope to see you soon.</p>
      </div>
    </div>
  </div>
  <div class="about__tech">
    <text-ticker
      v-for="(item, index) in textTickers"
      :text="item.text"
      :direction="item.direction"
      :global="true"
      :key="index"
    />
  </div>
</section>
</template>

<script>
import gsap from 'gsap'
import ContactBlock from '@/components/about/ContactBlock'
import TextTicker from '@/components/about/TextTicker'
import { vueWindowSizeMixin } from 'vue-window-size'

export default {
  mixins: [vueWindowSizeMixin],

  components: {
    ContactBlock,
    TextTicker
  },


  data() {
    return {
      title: ['Front-end', 'Developer'],
      heroPadding: 0,
      leaveTL: null,
      gsap: {
        heroPreset: {
          stagger: .01,
          y: 100,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out'
        }
      },
      textTickers: [{
        text: 'HTML5 - CSS3 - JAVASCRIPT - VUE.JS - NUXT - GSAP - THREE.JS',
        direction: 'right'
      },
      {
        text: 'RUBY - RUBY ON RAILS - LINUX - GITHUB - WEBPACK - REST API',
        direction: 'left'
      }
      ]
    }
  },


  watch: {
    windowWidth() {
      this.updateHeroPadding()
    },

    windowHeight() {
      this.updateHeroPadding()
    }
  },


  async mounted() {
    this.updateHeroPadding()
    this.fillTimelines()
  },


  async beforeRouteLeave (to, from, next) {
    await this.leaveTL.play(0)
    next()
  },


  methods: {
    fillTimelines() {
      this.leaveTL = gsap.timeline({paused: true})

      this.leaveTL
        .to('.about__hero, .about__contact-block, .about__story, .about__tech', {autoAlpha: 0, y: 100, stagger: .05, ease: 'power3.inOut', duration: 1.5})
    },

    charLeaveAnim(event) {
      gsap.to(event.target, {autoAlpha: 0, duration: .2, ease: 'power3.inOut'})
      gsap.to(event.target, {autoAlpha: 0, duration: .8, delay: .2})
      gsap.to(event.target, {autoAlpha: 1, duration: 1, delay: 1, ease: 'power3.inOut'})
    },

    updateHeroPadding() {
      this.heroPadding = (this.windowHeight - this.$refs['hero-title'].clientHeight) / 2
    },

    bottomRevealTween(target, {...tweenParams}) {
      return gsap.from(target, {y: 50, autoAlpha: 0, ease: 'power3.out', paused: true,  ...tweenParams})
    },
  },
}
</script>

<style lang="scss">
  .about {
  }

  .about__container {
    max-width: 1000px;
    padding: 0;
  }

  .about__hero {
    margin-bottom: 20vh;
    &-char {
      display: inline-block;
      will-change: transform;
    }
  }

  .about__hero-title {
    font-size: 7rem;
    line-height: 7rem;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .about__content {
    font-size: 1.25rem;
    &-container {
      display: flex;
    }
  }

  .about__contact-block {
    width: 50%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .contact-block {
      position: sticky;
      top: 15vh;
      left: 0;
    }
  }

  .about__story {
    perspective: 1000px;
    &-p {
      margin-bottom: 2rem;
    }
  }

  .about__tech {
    padding: 7rem 0;
    overflow: hidden;
  }

  @media (max-width: 1100px) {
    .about__container {
      padding: 0 5rem;
    }

    .about__contact-block {
      justify-content: flex-start;
    }
  }

  @media (max-width: 550px) {
    .about__content {
      font-size: 2rem;
    }

    .about__container {
      flex-direction: column;
    }

    .about__contact-block {
      margin-bottom: 5rem;
      width: 100%;
    }

    .about__hero-title {
      font-size: 5rem;
    }

    .about__hero {
      margin-bottom: 100px;
    }

    .about__tech {
      padding: 3rem 0;
    }
  }
</style>
