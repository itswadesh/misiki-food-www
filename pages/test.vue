<template>
  <div>
    <!-- <price-slider
      :range0="0"
      :range1="10"
      :min="0"
      :max="10"
      @changed="changed"
    /> -->
    <!-- <PicZoom url="/img/american.jpg" :scale="3"></PicZoom> -->
    <div style="width: 400px">
      <Zoom img-normal="zoom-demo.jpg" img-zoom="zoom-demo.jpg" :scale="3" />
      <!-- <zoom-on-hover
        img-normal="zoom-demo.jpg"
        img-zoom="zoom-demo.jpg"
        :scale="1.5"
      ></zoom-on-hover> -->
      <!-- <inner-image-zoom src="/zoom-demo.jpg" zoom-src="/zoom-demo.jpg" /> -->

      <!-- <image-magnifier
        src="/zoom-demo.jpg"
        zoom-src="/zoom-demo.jpg"
        width="400"
        height="300"
        zoom-width="400"
        zoom-height="300"
      ></image-magnifier> -->
    </div>
  </div>
</template>

<script>
// import { ImageMagnifier } from 'vue-image-magnifier'
// import InnerImageZoom from 'vue-inner-image-zoom'

import Zoom from '~/components/ui/Zoom.vue'
export default {
  components: {
    Zoom,
    // ImageMagnifier,
    // 'inner-image-zoom': InnerImageZoom,
    // PicZoom,
  },
  layout: 'none',
  data() {
    return {
      image:
        'https://unpkg.com/vue-image-magnifier@0.1.1/example/img/DA2D9393-4081-4384-B493-95DA1620C26D.png',
    }
  },
  head() {
    return {
      title: 'Test',
    }
  },
  methods: {
    changed(e) {
      console.log('Changed', e[0], e[1])
    },
  },
}
</script>
