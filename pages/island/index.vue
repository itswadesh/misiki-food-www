<template>
  <section class="min-h-screen overflow-hidden bg-white">
    <Megamenu class="hidden lg:flex px-10" />

    <HeroSlider :banners="sliderBanners" />

    <MainCategoryBanners class="mt-px" />

    <SecondMainCategoryBanners class="mb-5 md:mb-10" />

    <Categories class="mb-5 md:mb-10" />

    <HeroBanners :banners="heroBanners" class="mb-5 md:mb-10" />

    <ProductSlider
      :details="youMayLikeProducts"
      :heading="'You May Like'"
      class="md:mb-10"
    />

    <ProductSlider
      :details="hotProducts"
      :heading="'Trending'"
      class="md:mb-10"
    />

    <BrandBanners
      :ishome="true"
      :brands="brandBanners && brandBanners.data"
      class="mb-5 md:mb-10"
    />

    <GallerySlider class="mb-5 md:mb-10" :banners="sliderBanners" />

    <WantMore class="mb-5 md:mb-10" />
  </section>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import HeroSlider from '~/components/Island/HeroSlider.vue'
import MainCategoryBanners from '~/components/Island/MainCategoryBanners.vue'
import SecondMainCategoryBanners from '~/components/Island/SecondMainCategoryBanners.vue'
import Categories from '~/components/Home/Categories.vue'
import HeroBanners from '~/components/Home/HeroBanners.vue'
import BrandBanners from '~/components/Home/BrandBanners.vue'
import ProductSlider from '~/components/Home/ProductSlider.vue'
import GallerySlider from '~/components/Island/GallerySlider.vue'
import WantMore from '~/components/Island/WantMore.vue'

export default {
  components: {
    Megamenu,
    HeroSlider,
    MainCategoryBanners,
    SecondMainCategoryBanners,
    Categories,
    HeroBanners,
    BrandBanners,
    ProductSlider,
    GallerySlider,
    WantMore,
  },

  layout: 'island',

  data() {
    return {
      sliderBanners: null,
      brandBanners: null,
      youMayLikeProducts: null,
      hotProducts: null,
    }
  },

  head() {
    return {
      title: 'Home',
    }
  },

  created() {
    this.getBanners()
    this.getBrands()
    this.getYouMayLikeProducts()
    this.getHotProducts()
  },

  methods: {
    async getBrands() {
      // this.loading = true
      try {
        this.brandBanners = await this.$get('brand/brands', {
          parent: null,
          limit: 30,
          page: 0,
          sort: 'sort',
          featured: true,
        })
        // this.brandBanners = (
        //   await this.$apollo.query({
        //     query: BRANDS,
        //     variables: {
        //       parent: null,
        //       limit: 30,
        //       page: 0,
        //       sort: 'sort',
        //       featured: true,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.brands
        // console.log('brands to show', this.brandBanners)
      } catch (e) {
        // console.log(e)
      } finally {
        // this.loading = false
      }
    },

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

    async getYouMayLikeProducts() {
      this.loading = true
      try {
        this.youMayLikeProducts = await this.$get('product/trending', {
          type: 'sale',
        })
        // this.youMayLikeProducts = (
        //   await this.$apollo.query({
        //     query: TRENDING,
        //     variables: {
        //       type: 'sale',
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.trending
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },

    async getHotProducts() {
      this.loading = true
      try {
        this.hotProducts = await this.$get('product/trending', { type: 'hot' })
        // this.hotProducts = (
        //   await this.$apollo.query({
        //     query: TRENDING,
        //     variables: {
        //       type: 'hot',
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.trending
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
  margin-top: -6px;
}
</style>
