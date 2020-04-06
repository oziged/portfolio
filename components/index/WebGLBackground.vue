<template>
  <canvas  ref="canvas" class="webgl-bg" style="width: 100%"></canvas>
</template>

<script>
import * as THREE from 'three'
import shader from '@/assets/shader'

export default {
  props: {
    uTimeScale: {
      type: Number,
      default: () => 1
    }
  },

  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      geometry: null,
      material: null,
      mesh: null,
      uniforms: {
        uTime: {value: 0},
        uResolution: {value: {x: 1000, y: 1000}}
      }
    }
  },


  mounted() {
    this.init()
    this.animate()
  },


  methods: {
    init() {
      this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: this.$refs.canvas})
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, this.canvasSize().width/this.canvasSize().height, 0.01, 100)
      this.camera.position.z = .5
      this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        fragmentShader: shader
      });
      this.mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 1),
        this.material
      );
      this.scene.add(this.mesh)
    },

    animate() {
      this.handleResize()
      this.uniforms.uTime.value += .01 * this.uTimeScale
      this.renderer.render( this.scene, this.camera );
      requestAnimationFrame( this.animate );
    },

    handleResize() {
      const canvasSize = this.canvasSize()
      if (canvasSize.width != this.$refs.canvas.width || canvasSize.height != this.$refs.canvas.height) {
        this.renderer.setSize(canvasSize.width, canvasSize.height, false)
        this.camera.aspect = canvasSize.width / canvasSize.height
        this.camera.updateProjectionMatrix()
      }
    },

    canvasSize() {
      return {
        width: this.$refs.canvas.clientWidth,
        height: this.$refs.canvas.clientHeight
      }
    }
  },

}
</script>

<style lang="scss">
  .webgl-bg {
    filter: hue-rotate(50deg);
  }
</style>
