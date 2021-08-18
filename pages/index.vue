<template>
  <div class="container mx-auto">
    <Megamenu class="hidden xl:flex px-2 sm:px-10" />

    <HeroSlider :banners="sliderBanners" />

    <Categories class="px-2 sm:px-10 mb-5 md:mb-0" />

    <HeroBanners :banners="heroBanners" class="px-2 sm:px-10 mb-5 md:mb-0" />

    <Deals />

    <div
      v-for="(p, ix) in pickedBanners"
      v-if="pickedBanners && pickedBanners.length"
      :key="ix"
      class="px-2 sm:px-10 mb-5 md:mb-0"
    >
      <HeroBannersSlider :banners="p && p.data" :title="p._id && p._id.title" />
    </div>

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

    <VideoBanner :banners="videoBanners" class="px-2 sm:px-10 mb-5 md:mb-0" />

    <!-- <Discounts /> -->
    <!-- <div>
      <SelectedCategoryDetails />
    </div> -->
    <!-- <FooterSection class="hidden lg:block" /> -->
    <!-- <GridComponents /> -->
    <!--    -->

    <div class="h-10 bg-white w-full"></div>
  </div>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import HeroSlider from '~/components/Home/HeroSlider.vue'
import HeroBanners from '~/components/Home/HeroBanners.vue'
import Categories from '~/components/Home/Categories.vue'
import Deals from '~/components/Home/Deals.vue'
import ProductSlider from '~/components/Home/ProductSlider.vue'
import ProductSlider2 from '~/components/Home/ProductSlider2.vue'
import BrandBanners from '~/components/Home/BrandBanners.vue'
import HeroBannersSlider from '~/components/Home/HeroBannersSlider.vue'
import VideoBanner from '~/components/Home/VideoBanner.vue'
import TRENDING from '~/gql/product/trending.gql'
import BANNERS from '~/gql/banner/banners.gql'
import GROUP_BY_BANNER from '~/gql/banner/groupByBanner.gql'
import BRANDS from '~/gql/brand/brands.gql'
import { TITLE, DESCRIPTION, KEYWORDS, sharingLogo } from '~/shared/config'
export default {
  components: {
    Megamenu,
    HeroSlider,
    HeroBanners,
    Categories,
    Deals,
    HeroBannersSlider,
    ProductSlider,
    ProductSlider2,
    BrandBanners,
    // Discounts,
    VideoBanner,
  },

  asyncData({ params, app, store }) {
    const { title, keywords, description } = store.state.settings || {} // err = null
    return { title, keywords, description }
  },

  data() {
    return {
      hotProducts: null,
      youMayLikeProducts: null,
      visible: false,
      banners: null,
      brandBanners: null,
      sliderBanners: null,
      heroBanners: null,
      videoBanners: null,
      loadingVideoBanners: false,
      pickedBanners: null,
    }
  },

  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host
    return {
      title: this.title || TITLE,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description || DESCRIPTION,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: this.description || DESCRIPTION,
        },
        {
          name: 'Keywords',
          content: this.keywords || KEYWORDS,
        },
        {
          hid: 'og:title',
          name: 'og_title',
          property: 'og:title',
          content: this.title || TITLE,
        },
        {
          name: 'og_url',
          property: 'og:url',
          content: host,
        },
        {
          name: 'og_image',
          property: 'og:image',
          content: host + sharingLogo,
        },

        {
          name: 'twitter:title',
          content: this.title || TITLE,
        },
        {
          hid: 'twitter_description',
          name: 'twitter:description',
          content: this.description || DESCRIPTION,
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
      // this.skeleton = true
      try {
        const banners = await this.$get('banner/banners', {
          sort: 'sort',
          pageId: 'home',
          active: true,
        })
        // const banners = (
        //   await this.$apollo.query({
        //     query: BANNERS,
        //     variables: {
        //       sort: 'sort',
        //       pageId: 'home',
        //       active: true,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.banners
        this.sliderBanners = banners.data.filter((b) => b.type === 'slider')
        this.videoBanners = banners.data.filter((b) => b.type === 'video')
        this.heroBanners = await this.$get('banner/groupByBanner', {
          pageId: 'home',
          type: 'hero',
        })
        // this.heroBanners = (
        //   await this.$apollo.query({
        //     query: GROUP_BY_BANNER,
        //     variables: {
        //       pageId: 'home',
        //       type: 'hero',
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.groupByBanner
        this.pickedBanners = await this.$get('banner/groupByBanner', {
          pageId: 'home',
          type: 'picked',
        })
        // this.pickedBanners = (
        //   await this.$apollo.query({
        //     query: GROUP_BY_BANNER,
        //     variables: {
        //       pageId: 'home',
        //       type: 'picked',
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
