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
        <p class="about__story-p" ref="about-p-1" v-on-appear="() => bottomRevealTween($refs['about-p-1'], {duration: 2})">Hi, how are you?</p>
        <p class="about__story-p" ref="about-p-2" v-on-appear="() => bottomRevealTween($refs['about-p-2'], {duration: 2})">I’m a multidisciplinary designer from New Zealand and currently based in Berlin, Germany.</p>
        <p class="about__story-p" ref="about-p-3" v-on-appear="() => bottomRevealTween($refs['about-p-3'], {duration: 2})">My expertise is art direction, animation and anything interactive. I’ve had over 4 years industry experience, from working with startups, agencies and international clients from concept to final deliverables.</p>
        <p class="about__story-p" ref="about-p-4" v-on-appear="() => bottomRevealTween($refs['about-p-4'], {duration: 2})">My expertise is art direction, animation and anything interactive. I’ve had over 4 years industry experience, from working with startups, agencies and international clients from concept to final deliverables.</p>
        <p class="about__story-p" ref="about-p-5" v-on-appear="() => bottomRevealTween($refs['about-p-5'], {duration: 2})">My expertise is art direction, animation and anything interactive. I’ve had over 4 years industry experience, from working with startups, agencies and international clients from concept to final deliverables.</p>
        <p class="about__story-p" ref="about-p-6" v-on-appear="() => bottomRevealTween($refs['about-p-6'], {duration: 2})">My expertise is art direction, animation and anything interactive. I’ve had over 4 years industry experience, from working with startups, agencies and international clients from concept to final deliverables.</p>
        <p class="about__story-p" ref="about-p-7" v-on-appear="() => bottomRevealTween($refs['about-p-7'], {duration: 2})">My expertise is art direction, animation and anything interactive. I’ve had over 4 years industry experience, from working with startups, agencies and international clients from concept to final deliverables.</p>
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
  <footer class="about__footer">
    <div class="container"></div>
  </footer>
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
        text: 'RUBY - RUBY ON RAILS - LINUX - GITHUB',
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
  },


  methods: {
    charLeaveAnim(event) {
      gsap.to(event.target, {autoAlpha: 0, duration: .2, ease: 'power3.inOut'})
      gsap.to(event.target, {autoAlpha: 0, duration: .8, delay: .2})
      gsap.to(event.target, {autoAlpha: 1, duration: 1, delay: 1, ease: 'power3.inOut'})
    },

    updateHeroPadding() {
      this.heroPadding = (this.windowHeight - this.$refs['hero-title'].clientHeight) / 2
    },

    bottomRevealTween(target, {...tweenParams}) {
      return gsap.from(target, {y: 50, autoAlpha: 0, ease: 'power3.inOut', paused: true,  ...tweenParams})
    }
  },
}
</script>

<style lang="scss">
  .about {
    overflow: hidden;
  }

  .about__container {
    max-width: 1000px;
    padding: 0;
  }

  .about__hero {
    padding-bottom: 20vh;
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
  }
</style>
