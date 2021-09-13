<template>
  <section class="min-h-screen overflow-hidden bg-white">
    <HeroSlider :banners="sliderBanners" />

    <MainCategoryBanners class="mt-px" />

    <SecondMainCategoryBanners class="mt-px" />

    <Categories class="mt-5 md:mt-10" />

    <HeroBanners :banners="heroBanners" class="mt-5 md:mt-10" />

    <BrandBanners
      :ishome="true"
      :brands="brandBanners && brandBanners.data"
      class="mb-5 md:mb-0"
    />

    <ProductSlider
      :details="youMayLikeProducts"
      :heading="'You May Like'"
      class="mb-5 md:mb-0"
    />

    <ProductSlider
      :details="hotProducts"
      :heading="'Trending'"
      class="mb-5 md:mb-0"
    />

    <GallerySlider class="mt-5 md:mt-10" :banners="sliderBanners" />

    <WantMore class="mt-5 md:mt-10" />
  </section>
</template>

<script>
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

  data() {
    return {
      sliderBanners: null,
      brandBanners: null,
      youMayLikeProducts: null,
      hotProducts: null,
      heroBanners: null,
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
      } catch (e) {
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
      } catch (e) {
      } finally {
        this.loading = false
      }
    },

    async getHotProducts() {
      this.loading = true
      try {
        this.hotProducts = await this.$get('product/trending', { type: 'hot' })
      } catch (e) {
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
