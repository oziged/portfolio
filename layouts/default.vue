<template>
  <simplebar
    class="simplebar-fullscreen"
    style="color: white"
  >
    <nuxt style=""/>
    <app-header/>
    <app-cursor
      v-if="!$device.isMobile"
      ref="cursor"
    />
    <app-menu ref="menu"/>
    <app-loader v-if="isLoading" ref="app-loader"/>
  </simplebar>
</template>

<script>
import AppCursor from '@/components/AppCursor'
import AppHeader from '@/components/AppHeader'
import AppMenu from '@/components/AppMenu/AppMenu'
import AppLoader from '@/components/AppLoader'
import simplebar from 'simplebar-vue';

export default {
  components: {AppCursor, AppHeader, AppMenu, AppLoader, simplebar},


  data() {
    return {
      isLoading: true
    }
  },


  provide () {
    return {
      updateCursor: this.updateCursor,
      updateMenu: this.updateMenu
    }
  },


  mounted() {
    setTimeout(async () => {
      await this.$refs['app-loader'].revealAnim()
      this.isLoading = false
    }, 1000);

  },


  methods: {
    updateCursor() {
      if (this.$device.isMobile) return
      [].forEach.call(arguments, name => this.$refs.cursor[name]())
    },

    updateMenu(type) {
      this.$refs.menu[type]()
    }
  },
}
</script>

<style>
html {
  cursor: none;
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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

