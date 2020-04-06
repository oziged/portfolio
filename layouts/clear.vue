<template>
  <simplebar class="simplebar-fullscreen">
    <nuxt/>
    <app-cursor ref="cursor"/>
  </simplebar>
</template>

<script>
import AppCursor from '@/components/AppCursor'
import simplebar from 'simplebar-vue';

export default {
  components: {AppCursor, simplebar},

  provide () {
    return {
      updateCursor: this.updateCursor
    }
  },


  methods: {
    updateCursor(type, payload) {
      this.$refs.cursor[type]()
    }
  },
}
</script>
