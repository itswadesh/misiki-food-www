<template>
  <section class="min-h-screen overflow-hidden bg-white">
    <HeroSlider :banners="sliderBanners" />
    <MainCategoryBanners class="mt-px" />
    <GallerySlider class="mt-5 md:mt-10" :banners="sliderBanners" />
    <WantMore class="mt-5 md:mt-10" />
    <WhiteFooter class="mt-10 md:mt-20" />
  </section>
</template>

<script>
import HeroSlider from '~/components/Island/HeroSlider.vue'
import MainCategoryBanners from '~/components/Island/MainCategoryBanners.vue'
import GallerySlider from '~/components/Island/GallerySlider.vue'
import WantMore from '~/components/Island/WantMore.vue'
import WhiteFooter from '~/components/Island/WhiteFooter.vue'

export default {
  components: {
    HeroSlider,
    MainCategoryBanners,
    GallerySlider,
    WantMore,
    WhiteFooter,
  },
  layout: 'none',
  data() {
    return {
      sliderBanners: null,
    }
  },
  created() {
    this.getBanners()
  },
  methods: {
    async getBanners() {
      this.loading = true
      try {
        const banners = await this.$get('banner/banners', {
          sort: 'sort',
          pageId: 'home',
          active: true,
        })

        this.sliderBanners = banners.data.filter((b) => b.type === 'slider')
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.mt-px {
  margin-top: -5px;
}
</style>
