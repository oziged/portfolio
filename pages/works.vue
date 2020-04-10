<template>
  <section class="works">
    <div class="works__slider-wrapper">
      <div class="works__slide-content" v-for="(project, index) in projects" :key="index" ref="projects">
        <span class="splitted-text">
          <span
            class="splitted-text__char"
            style="display: block"
            v-for="(word, index) in project.name" :key="index"
          >
            <span v-for="(char, index) in word" :key="index">{{char}}</span>
          </span>
        </span>
      </div>

      <client-only>
        <vue-displacement-slideshow
          style="height: 20vh; width: 20vw"
          :images="[
            require('../assets/images/1.png'),
            require('../assets/images/2.png')
          ]"
          :displacement="require('@/assets/images/displacement.png')"
          :intensity="0.2"
          :speedIn="1.4"
          :speedOut="1.4"
          ease="expo.out"
          ref="slideshow">
        </vue-displacement-slideshow>
      </client-only>
    </div>
  </section>
</template>

<script>
import VueDisplacementSlideshow from "vue-displacement-slideshow";

export default {
  components: {VueDisplacementSlideshow},

  data() {
    return {
      activeSlide: 0,
      projects: [
        {
          name: ['Youtube', 'Randomizer'],
          desc: 'some desc',
          img: require('@/assets/images/projects/yt/preview.png')
        },
        {
          name: ['Sofa', 'Selector'],
          desc: 'some desc',
          img: require('@/assets/images/projects/yt/preview.png')
        }
      ]
    }
  },


  mounted() {
    console.log(this.$refs.projects)
    setInterval(() => {
      // this.$refs.slideshow.next()
    }, 1000);
  },
}
</script>

<style>

</style>
