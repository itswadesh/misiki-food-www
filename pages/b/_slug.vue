<template>
  <div>
    <Megamenu class="hidden w-full xl:flex" />
    <HeroSlider v-if="brand && brand.img" :banners="[{ img: brand.img }]" />
    <MobileFilters
      class="sticky top-0 z-20 flex-none mt-16 sm:hidden"
      :count="productCount"
      :facets="facets"
      :fl="fl"
      @showFilter="showMobileFilter = true"
      @hide="showMobileFilter = false"
    />
    <div class="flex sm:mt-6 xl:mt-0">
      <DesktopFilters
        class="
          sticky
          top-0
          flex-none
          hidden
          max-w-xs
          min-h-screen
          mt-5
          bg-gray-100
          shadow
          ms-4
          lg:block
        "
        :facets="facets"
        :fl="fl"
        @clearAllFilters="clearAllFilters"
      />
      <div class="relative w-full">
        <HeaderBody
          :category="category"
          :count="productCount"
          :fl="fl"
          @removed="facetRemoved"
          @showFilters="showMobileFilter = true"
        />

        <!-- <ProductSkeleton /> -->

        <NoProduct v-if="(!products || !products.length) && !loading" />

        <div v-else>
          <div
            class="
              container
              mx-auto
              px-3
              py-3
              sm:py-0 sm:px-3
              md:p-4
              grid grid-cols-2
              gap-3
              md:gap-4
              sm:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
            "
          >
            <div v-if="loading" class="flex flex-wrap justify-between">
              <ProductSkeleton v-for="(p, ix) in 10" :key="ix + '-1'" />
            </div>

            <HomePageProduct
              v-for="(p, ix) in products"
              v-else-if="products && products.length > 0"
              :key="ix"
              class="slide-up-item"
              :product="p._source"
              :pid="p._id"
            />
            <!-- <infinite-loading @infinite="loadMore($route.query.page)"></infinite-loading> -->
          </div>

          <div
            v-if="loading"
            class="
              grid grid-cols-2
              gap-4
              sm:grid-cols-3
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
            "
          >
            <ProductSkeleton v-for="(p, ix) in 10" :key="ix + '-1'" />
          </div>

          <!-- <infinite-loading @infinite="loadMore($route.query.page)"></infinite-loading> -->

          <!-- <div class="pagination_box">
            <v-pagination
              v-if="noOfPages>1"
              v-model="currentPage"
              @change="changePage(currentPage)"
              :page-count="noOfPages"
              :disabled="loading"
              :classes="bootstrapPaginationClasses"
              :labels="paginationAnchorTexts"
            ></v-pagination>
          </div>-->
        </div>
        <Pagination
          class="mt-5"
          :count="noOfPages"
          :current="parseInt($route.query.page || 1)"
          @change="changePage"
        />
      </div>
    </div>
    <!-- <RightSideBar /> -->
  </div>
</template>
<script>
import BRAND from '~/gql/brand/brand.gql'
import c from '~/mixins/c.js'
import { DESCRIPTION, KEYWORDS, sharingLogo } from '~/shared/config'
import HomePageProduct from '~/components/Home/HomePageProduct.vue'
// import ProductCardEs from '~/components/Listing/ProductCardEs.vue'
import ProductSkeleton from '~/components/ProductSkeleton.vue'
import Megamenu from '~/components/Home/Megamenu.vue'
import HeaderBody from '~/components/HeaderBody.vue'
import Pagination from '~/shared/components/ui/Pagination.vue'
import HeroSlider from '~/components/Home/HeroSlider.vue'

export default {
  components: {
    Pagination,
    ProductSkeleton,
    HomePageProduct,
    // ProductCardEs,
    Megamenu,
    HeaderBody,
    HeroSlider,
  },
  mixins: [c],
  layout: 'search',
  async asyncData({ route, query, params, $axios, app }) {
    let products = []
    let brand = {}
    let facets = []
    let fl = {}
    let err = null
    let productCount = 0
    const client = app.apolloProvider.defaultClient
    try {
      const cslug = route.params.slug
      if (cslug) {
        brand = (
          await client.query({
            query: BRAND,
            variables: { slug: cslug },
            fetchPolicy: 'no-cache',
          })
        ).data.brand
      }
      const q = params.slug || null
      const qry = { ...query }
      if (q) qry.brands = q
      // if (cslug) qry.categories = cslug
      const result = await $axios.$get('/api/products/es', {
        params: { ...qry },
      })
      products = result.data
      productCount = result.count
      facets = result.facets && result.facets.all_aggs
      Object.keys(qry).map(function (k, i) {
        if (
          qry[k] &&
          !Array.isArray(qry[k]) &&
          qry[k] !== null &&
          qry[k] !== ''
        )
          qry[k] = qry[k].split(',')
      })
      fl = { ...qry } // For selected filters
      return { products, brand, productCount, facets, fl, err: null }
    } catch (e) {
      if (e && e.response && e.response.data) {
        err = e.response.data
      } else if (e && e.response) {
        err = e.response
      } else {
        err = e
      }
      // console.log('err...', e)
      return { products, brand, productCount, facets: [], fl: {}, err }
    }
  },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host
    return {
      title:
        (this.brand && this.brand.metaTitle) ||
        (this.brand && 'Brand: ' + this.brand.name) ||
        'Brand: ' + this.$route.path.substr(1),
      meta: [
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: (this.brand && this.brand.metaDescription) || DESCRIPTION,
        },
        {
          hid: 'keywords',
          name: 'Keywords',
          property: 'keywords',
          content: (this.brand && this.brand.metaKeywords) || KEYWORDS,
        },
        {
          hid: 'og:title',
          name: 'og_title',
          property: 'og:title',
          content:
            (this.brand && this.brand.metaTitle) ||
            (this.brand && 'Brand: ' + this.brand.name) ||
            'Brand: ' + this.$route.path.substr(1),
        },
        // Google+ / Schema.org
        {
          name: 'og_url',
          property: 'og:url',
          content: host + '/' + this.$route.path.substr(1) || '',
        },
        {
          property: 'og:image',
          content: host + ((this.brand && this.brand.img) || sharingLogo),
        },
        {
          property: 'og:image:width',
          content: '600',
        },
        {
          property: 'og:image:height',
          content: '600',
        },
        // Twitter
        {
          name: 'twitter:title',
          content:
            (this.brand && this.brand.metaTitle) ||
            (this.brand && 'Brand: ' + this.brand.name) ||
            'Brand: ' + this.$route.path.substr(1),
        },
        {
          name: 'twitter:description',
          content: (this.brand && this.brand.metaDescription) || DESCRIPTION,
        },
      ],
    }
  },
  watchQuery: true,
  created() {
    this.scrollToTop()
    this.currentPage = parseInt(this.$route.query.page)
    // let query = { ...this.$route.query };
    // this.fl = query;
  },
  mounted() {
    // this.getWishlist() // This was causing node undefined error when page is refreshed
  },
  methods: {
    // scrollToTop() {
    //   if (process.client) {
    //     window.scroll({ behavior: 'smooth', left: 0, top: 80 })
    //   }
    // },
    async getData() {
      const q = this.$route.query || {}
      // q.categories = this.$route.path.substr(1)
      try {
        this.loading = true
        const p = params.slug || null
        q.parentBrands = p
        const products = await this.$axios.$get('/api/products/es', {
          params: q,
        })
        this.productCount = products.count
        this.products = products.data
        this.facets = products.facets && products.facets.all_aggs
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style scoped>
.pagination {
  list-style-type: none !important;
  display: flex !important;
  padding-left: 0 !important;
  border-radius: 0.25rem !important;
}
.page-link {
  position: relative !important;
  display: block !important;
  padding: 0.5rem 0.75rem !important;
  margin-left: -1px !important;
  line-height: 1.25 !important;
  color: #007bff !important;
  background-color: #fff !important;
  border: 1px solid #dee2e6 !important;
}
.page-item.disabled .page-link {
  color: #6c757d !important;
  pointer-events: none !important;
  cursor: auto !important;
  background-color: #fff !important;
  border-color: #dee2e6 !important;
  height: 34px !important;
}
.page-item:first-child .page-link {
  margin-left: 0 !important;
  border-top-left-radius: 0.25rem !important;
  border-bottom-left-radius: 0.25rem !important;
}
.page-item.active .page-link {
  z-index: 1 !important;
  color: #fff !important;
  background-color: #007bff !important;
  border-color: #007bff !important;
}
</style>
