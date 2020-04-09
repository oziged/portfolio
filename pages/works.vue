<template>
  <div>
    <!-- <client-only>
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
    </client-only> -->
  </div>
</template>

<script>
import VueDisplacementSlideshow from "vue-displacement-slideshow";

export default {
  components: {VueDisplacementSlideshow},
  mounted() {
    setInterval(() => {
      // this.$refs.slideshow.next()
    }, 1000);
  },
}
</script>

<style>

</style>
