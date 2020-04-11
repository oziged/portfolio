<template>
  <div class="slider-nav__container">
    <div
      v-for="(item, index) in length"
      :key="index"
      class="slider-nav__item"
      @click="$emit('slideChange', index)"
      @mouseenter="updateCursor('disableCircle', 'scalePoint')"
      @mouseleave="updateCursor('enableCircle', 'unScalePoint')"
    >
      <div
        :class="{'slider-nav__item-line': true, 'slider-nav__item-line_active': index == currentIndex}"
      />
    </div>
  </div>
</template>

<script>
export default {
  inject: ['updateCursor'],

  props: {
    length: Number,
    currentIndex: Number
  },
}
</script>

<style lang="scss">
  .slider-nav__item {
    width: 2rem;
    height: 1px;
    padding: 15px 0;
    box-sizing: content-box;
    &:hover .slider-nav__item-line {
      width: 100%;
      background-color: white;
    }
  }

  .slider-nav__item-line {
    width: 70%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.719);
    border-radius: 10px;
    transition: .3s;
  }

  .slider-nav__item-line_active {
    width: 100%;
    background-color: white;
  }
</style>
