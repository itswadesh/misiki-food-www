<template>
  <div v-if="banners && banners[0] && banners[0].imgCdn" class="w-full lg:my-6">
    <video autoplay loop muted class="z-10 w-full h-auto">
      <source :src="banners[0].imgCdn" type="video/mp4" />
    </video>
  </div>
</template>

<script>
// import BANNERS from '~/gql/banner/banners.gql'

export default {
  props: {
    banners: { type: Array, default: null },
  },
  data() {
    return {
      // banners: null,
    }
  },
  created() {
    // this.getBanners()
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
