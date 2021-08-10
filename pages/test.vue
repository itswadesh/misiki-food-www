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
    <image-magnifier
      :src="image"
      :zoom-src="image"
      width="400"
      height="300"
      zoom-width="400"
      zoom-height="300"
    ></image-magnifier>
  </div>
</template>

<script>
import { ImageMagnifier } from 'vue-image-magnifier'
// import PriceSlider from '~/shared/components/ui/PriceSlider.vue'
export default {
  components: {
    // PriceSlider,
    ImageMagnifier,
    // PicZoom,
  },
  layout: 'none',
  data() {
    return {
      image:
        'https://unpkg.com/vue-image-magnifier@0.1.1/example/img/DA2D9393-4081-4384-B493-95DA1620C26D.png',
    }
  },
  methods: {
    changed(e) {
      console.log('Changed', e[0], e[1])
    },
  },
}
</script>
