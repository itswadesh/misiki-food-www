<template>
  <div v-if="imgNormal">
    <div
      class="zoom-on-hover"
      @mousemove="move"
      @mouseenter="zoom"
      @mouseleave="unzoom"
    >
      <img ref="normal" class="normal" :src="imgNormal" />
      <img ref="zoom" class="zoom" :src="imgZoom || imgNormal" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgNormal: { type: String, default: null },
    imgZoom: { type: String, default: null },
    scale: { type: Number, default: 1.5 },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      scaleFactor: 1.5,
      resizeCheckInterval: null,
    }
  },
  mounted() {
    if (this.scale) {
      this.scaleFactor = this.scale
      if (this.$refs.zoom)
        this.$refs.zoom.style.transform = 'scale(' + this.scaleFactor + ')'
    }
    this.initEventLoaded()
    this.initEventResized()
  },
  updated() {
    this.initEventLoaded()
  },
  beforeDestroy() {
    this.resizeCheckInterval && clearInterval(this.resizeCheckInterval)
  },
  methods: {
    zoom() {
      if (this.disabled) return
      if (this.$refs.zoom) this.$refs.zoom.style.opacity = 1
      if (this.$refs.normal) this.$refs.normal.style.opacity = 0
    },
    unzoom() {
      if (this.disabled) return
      if (this.$refs.zoom) this.$refs.zoom.style.opacity = 0
      if (this.$refs.normal) this.$refs.normal.style.opacity = 1
    },
    move(event) {
      if (this.disabled) return
      const offset = pageOffset(this.$el)
      const zoom = this.$refs.zoom
      if (!zoom) return
      const normal = this.$refs.normal
      const relativeX = event.clientX - offset.x + window.pageXOffset
      const relativeY = event.clientY - offset.y + window.pageYOffset
      const normalFactorX = relativeX / normal.offsetWidth
      const normalFactorY = relativeY / normal.offsetHeight
      const x =
        normalFactorX *
        (zoom.offsetWidth * this.scaleFactor - normal.offsetWidth)
      const y =
        normalFactorY *
        (zoom.offsetHeight * this.scaleFactor - normal.offsetHeight)
      zoom.style.left = -x + 'px'
      zoom.style.top = -y + 'px'
    },
    initEventLoaded() {
      // emit the "loaded" event if all images have been loaded
      const promises = [this.$refs.zoom, this.$refs.normal].map(function (
        image
      ) {
        return new Promise(function (resolve, reject) {
          image.addEventListener('load', resolve)
          image.addEventListener('error', reject)
        })
      })
      const component = this
      Promise.all(promises).then(function () {
        component.$emit('loaded')
      })
    },
    initEventResized() {
      const normal = this.$refs.normal
      let previousWidth = normal.offsetWidth
      let previousHeight = normal.offsetHeight
      const component = this
      this.resizeCheckInterval = setInterval(function () {
        if (
          previousWidth !== normal.offsetWidth ||
          previousHeight !== normal.offsetHeight
        ) {
          previousWidth = normal.offsetWidth
          previousHeight = normal.offsetHeight
          component.$emit('resized', {
            width: normal.width,
            height: normal.height,
            fullWidth: normal.naturalWidth,
            fullHeight: normal.naturalHeight,
          })
        }
      }, 1000)
    },
  },
}
function pageOffset(el) {
  // -> {x: number, y: number}
  // get the left and top offset of a dom block element
  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return {
    y: rect.top + scrollTop,
    x: rect.left + scrollLeft,
  }
}
</script>
<style scoped>
.zoom-on-hover {
  position: relative;
  overflow: hidden;
}
.zoom-on-hover .normal {
  width: 100%;
}
.zoom-on-hover .zoom {
  position: absolute;
  opacity: 0;
  transform-origin: top left;
}
</style>
