<template>
  <simplebar class="simplebar-fullscreen">
    <h1>DEFAULT</h1>
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

<style>
html {
  cursor: none;
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

