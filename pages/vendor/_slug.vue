<template>
  <div class="z-auto pb-0 bg-gray-50">
    <Megamenu class="hidden xl:flex" :brand="brand.id" />
    <HeroSlider
      v-if="sliderBanners && sliderBanners.length"
      :banners="sliderBanners"
      class="md:mb-12 lg:mb-16"
    />
    <div class="max-w-6xl mx-auto w-full">
      <AllBrands
        v-if="childBrands && childBrands.data && childBrands.data.length"
        :brands="childBrands && childBrands.data"
        class="mt-5"
      />
      <div v-if="pickedBanners && pickedBanners.length" class="my-5">
        <div v-for="(p, ix) in pickedBanners" :key="ix">
          <HeroBannersSlider
            class=""
            :banners="p && p.data"
            :title="p._id && p._id.title"
          />
        </div>
      </div>
      <HeroBanners :banners="heroBanners" class="my-5" />
      <BrandInformation :brand="brand" class="my-5" />
    </div>
    <!-- <BrandBanners :brands="childBrands && childBrands.data" /> -->
    <VideoBanner :banners="videoBanners" />
    <WeProvides :brand="brand" class="lg:mb-5 max-w-6xl mx-auto w-full" />
  </div>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import HeroSlider from '~/components/Home/HeroSlider.vue'
import AllBrands from '~/components/Home/AllBrands.vue'
import HeroBanners from '~/components/Home/HeroBanners.vue'
import PRODUCTS from '~/gql/product/products.gql'
import { TITLE, DESCRIPTION, KEYWORDS, sharingLogo } from '~/shared/config'
import BANNERS from '~/gql/banner/banners.gql'
import BRANDS from '~/gql/brand/brands.gql'
import BRAND from '~/gql/brand/brand.gql'
import GROUP_BY_BANNER from '~/gql/banner/groupByBanner.gql'
// import BrandBanners from '~/components/Home/BrandBanners'
import VideoBanner from '~/components/Home/VideoBanner.vue'
import HeroBannersSlider from '~/components/Home/HeroBannersSlider.vue'
import WeProvides from '~/components/Home/WeProvides.vue'
import BrandInformation from '~/components/Home/BrandInformation.vue'
export default {
  components: {
    Megamenu,
    HeroSlider,
    AllBrands,
    HeroBanners,
    // BrandBanners,
    HeroBannersSlider,
    BrandInformation,
    // Discounts,
    VideoBanner,
    WeProvides,
  },
  async asyncData({ params, app, store, error }) {
    let brand = {}
    const { title, keywords, description, logoMobile } = store.state.store || {} // err = null
    const client = app.apolloProvider.defaultClient
    try {
      brand = (
        await client.query({
          query: BRAND,
          variables: {
            slug: params.slug,
            store: store.state.store && store.state.store.id,
          },
          fetchPolicy: 'no-cache',
        })
      ).data.brand
      if (!brand || !brand.id) error('Brand not found')
    } catch (e) {
      error('Brand not found')
    }
    return { brand, title, keywords, description, logoMobile }
  },
  data() {
    return {
      hotProducts: null,
      youMayLikeProducts: null,
      visible: false,
      banners: null,
      childBrands: null,
      sliderBanners: null,
      heroBanners: null,
      pickedBanners: null,
      videoBanners: null,
      loadingVideoBanners: false,
      brand: null,
    }
  },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host
    return {
      title: this.brand.title || this.brand.name || TITLE,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.brand.description || DESCRIPTION,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: this.brand.description || DESCRIPTION,
        },
        {
          name: 'Keywords',
          content: this.brand.keywords || KEYWORDS,
        },
        {
          hid: 'og:title',
          name: 'og_title',
          property: 'og:title',
          content: this.brand.title || TITLE,
        },
        {
          name: 'og_url',
          property: 'og:url',
          content: host,
        },
        {
          name: 'og_image',
          property: 'og:image',
          content: host + this.logoMobile,
        },

        {
          name: 'twitter:title',
          content: this.brand.title || TITLE,
        },
        {
          hid: 'twitter_description',
          name: 'twitter:description',
          content: this.brand.description || DESCRIPTION,
        },
      ],
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener)
  },
  created() {
    this.getBanners()
    this.getHotProducts()
    this.getYouMayLikeProducts()
    this.getBrands()
  },
  methods: {
    async getBrands() {
      // this.loading = true
      try {
        this.childBrands = await this.$get('brand/brands', {
          limit: 10,
          page: 0,
          sort: 'sort',
          parent: this.brand.id,
          featured: true,
        })
        // this.childBrands = (
        //   await this.$apollo.query({
        //     query: BRANDS,
        //     variables: {
        //       limit: 10,
        //       page: 0,
        //       sort: 'sort',
        //       parent: this.brand.id,
        //       featured: true,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.brands
        // console.log('brands to show', this.childBrands)
      } catch (e) {
        // console.log(e)
      } finally {
        // this.loading = false
      }
    },
    async getBanners() {
      this.loading = true
      // this.skeleton = true
      try {
        const banners = await this.$get('banner/banners', {
          sort: 'sort',
          pageId: this.brand.id,
          active: true,
        })
        // const banners = (
        //   await this.$apollo.query({
        //     query: BANNERS,
        //     variables: {
        //       sort: 'sort',
        //       pageId: this.brand.id,
        //       active: true,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.banners
        this.sliderBanners = banners.data.filter((b) => b.type === 'slider')
        // this.heroBanners = banners.data.filter((b) => b.type === 'hero')
        this.videoBanners = banners.data.filter((b) => b.type === 'video')
        this.heroBanners = await this.$get('banner/groupByBanner', {
          pageId: this.brand.id,
          type: 'hero',
          sort: 'sort',
        })
        this.pickedBanners = await this.$get('banner/groupByBanner', {
          pageId: this.brand.id,
          type: 'hero',
          sort: 'sort',
        })
        // this.heroBanners = (
        //   await this.$apollo.query({
        //     query: GROUP_BY_BANNER,
        //     variables: {
        //       pageId: this.brand.id,
        //       type: 'hero',
        //       sort: 'sort',
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.groupByBanner
        // this.pickedBanners = (
        //   await this.$apollo.query({
        //     query: GROUP_BY_BANNER,
        //     variables: {
        //       pageId: this.brand.id,
        //       type: 'picked',
        //       sort: 'sort',
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.groupByBanner
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
        // this.skeleton = false
      }
    },
    scrollListener() {
      if (window.scrollY > 480) {
        // console.log('Naman')
        this.visible = true
      } else {
        this.visible = false
      }
    },
    async getYouMayLikeProducts() {
      this.loading = true
      try {
        this.youMayLikeProducts = await this.$get('product/products', {
          sale: true,
        })
        // this.youMayLikeProducts = (
        //   await this.$apollo.query({
        //     query: PRODUCTS,
        //     variables: {
        //       sale: true,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.products
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
    async getHotProducts() {
      this.loading = true
      try {
        this.hotProducts = await this.$get('product/products', { hot: true })
        // this.hotProducts = (
        //   await this.$apollo.query({
        //     query: PRODUCTS,
        //     variables: {
        //       hot: true,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.products
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
