<template>
  <div
    v-if="banners && banners.data && banners.data.length"
    class="w-full my-6"
  >
    <video autoplay loop muted class="z-10 w-full h-auto">
      <source v-lazy="banners.data[0].imgCdn" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import BANNERS from '~/gql/banner/banners.gql'

export default {
  data() {
    return {
      banners: null,
    }
  },
  created() {
    this.getBanners()
  },
  methods: {
    async getBanners() {
      this.loading = true
      try {
        this.banners = await this.$get('banner/banners', { type: 'video' })
        // this.banners = (
        //   await this.$apollo.query({
        //     query: BANNERS,
        //     variables: {
        //       type: 'video',
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.banners
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
