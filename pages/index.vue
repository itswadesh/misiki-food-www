<template>
  <div class="container mx-auto bg-white">
    <Megamenu class="hidden xl:flex px-10" />

    <HeroSlider :banners="sliderBanners" class="pb-5 md:pb-10" />

    <Categories
      :categories="shopByCategory"
      class="px-2 sm:px-10 pb-5 md:pb-10"
    />

    <HeroBanners :banners="heroBanners" class="px-2 sm:px-10 pb-5 md:pb-10" />

    <Deals class="px-2 sm:px-10 pb-5 md:pb-10" />

    <div
      v-for="(p, ix) in pickedBanners"
      v-if="pickedBanners && pickedBanners.length"
      :key="ix"
    >
      <HeroBannersSlider
        :banners="p && p.data"
        :title="p._id && p._id.title"
        class="sm:px-10 lg:px-7 pb-5"
      />
    </div>

    <ProductSlider
      :details="youMayLikeProducts"
      :pg="pg"
      :heading="'You May Like'"
      class="pb-5 lg:pb-10 pl-2 sm:pl-10 lg:pr-10"
    />

    <ProductSlider
      :details="hotProducts"
      :pg="pg"
      :heading="'Trending'"
      class="pb-5 lg:pb-10 pl-2 sm:pl-10 lg:pr-10"
    />

    <VideoBanner :banners="videoBanners" class="px-2 sm:px-10 pb-5 md:pb-10" />
    <BrandBanners
      :ishome="true"
      :brands="brandBanners && brandBanners.data"
      class="px-2 sm:px-10 pb-5 md:pb-10"
    />

    <!-- <Discounts /> -->
    <!-- <div>
      <SelectedCategoryDetails />
    </div> -->
    <!-- <FooterSection class="hidden lg:block" /> -->
    <!-- <GridComponents /> -->
    <!--    -->
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
import HOME from '~/gql/groupQueries/HOME.gql'
import TRENDING from '~/gql/product/trending.gql'
import BANNERS from '~/gql/banner/banners.gql'
import GROUP_BY_BANNER from '~/gql/banner/groupByBanner.gql'
import BRANDS from '~/gql/brand/brands.gql'
import PRODUCT_GROUP from '~/gql/product/product_group.gql'
import { TITLE, DESCRIPTION, KEYWORDS } from '~/shared/config'

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
  middleware: ['landing'],

  asyncData({ params, app, store }) {
    const { title, keywords, description, favicon, logoMobile } =
      store.state.store || {} // err = null
    return { title, keywords, description, favicon, logoMobile }
  },

  data() {
    return {
      hotProducts: null,
      youMayLikeProducts: null,
      pg: null,
      visible: false,
      banners: null,
      brandBanners: null,
      sliderBanners: null,
      heroBanners: null,
      videoBanners: null,
      loadingVideoBanners: false,
      pickedBanners: null,
      shopByCategory: null,
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
          content: this.logoMobile,
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
      link: [
        {
          hid: 'favicon',
          rel: 'icon',
          type: 'image/x-icon',
          href: this.favicon || '/favicon.ico',
        },
      ],
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    },
    store() {
      return this.$store.state.store || {}
    },
  },
  created() {
    this.getAllRecommendations()
    // this.getBanners()
    // this.getHotProducts()
    // this.getYouMayLikeProducts()
    // this.getBrands()
    // this.getProductGroups()
  },

  mounted() {
    window.addEventListener('scroll', this.scrollListener)
  },
  methods: {
    async getAllRecommendations() {
      try {
        const productDetailRecommendations = (
          await this.$apollo.query({
            query: HOME,
            variables: {
              store: this.store.id,
            },
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
          })
        ).data
        const banners = productDetailRecommendations.banners
        const groupByBanner = productDetailRecommendations.groupByBanner
        this.sliderBanners = banners.data.filter((b) => b.type === 'slider')
        this.videoBanners = banners.data.filter((b) => b.type === 'video')
        this.heroBanners = groupByBanner.filter((b) => b._id.type === 'hero')
        this.pickedBanners = groupByBanner.filter(
          (b) => b._id.type === 'picked'
        )
        this.brandBanners = productDetailRecommendations.brands
        this.shopByCategory = productDetailRecommendations.categories

        const trending = productDetailRecommendations.trending
        this.youMayLikeProducts = trending.filter((b) => b.sale === true)
        this.hotProducts = trending.filter((b) => b.hot === true)

        this.pg = productDetailRecommendations.pg
      } catch (e) {
        console.log('err...........', e)
      }
    },
    async getBrands() {
      // this.loading = true
      try {
        this.brandBanners = await this.$get('brand/brands', {
          parent: null,
          limit: 30,
          page: 0,
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
        // const banners = await this.$get('banner/banners', {
        //   sort: 'sort',
        //   pageId: 'home',
        //   active: true,
        // })
        // this.sliderBanners = banners.data.filter((b) => b.type === 'slider')
        // this.videoBanners = banners.data.filter((b) => b.type === 'video')
        this.heroBanners = await this.$get('banner/groupByBanner', {
          pageId: 'home',
          type: 'hero',
        })
        this.pickedBanners = await this.$get('banner/groupByBanner', {
          pageId: 'home',
          type: 'picked',
        })
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
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },

    // async getProductGroups() {
    //   try {
    //     this.pg = await this.$get('product/product_group', { id })
    //     // this.pg = (
    //     //   await this.$apollo.query({
    //     //     query: PRODUCT_GROUP,
    //     //     variables: { id },
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.product_group
    //     // this.checkWishlist()
    //     console.log(pg)
    //   } catch (e) {}
    // },
  },
}
</script>
