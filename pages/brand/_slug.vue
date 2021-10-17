<template>
  <section>
    <MobileFilters
      class="sticky top-0 z-20 flex-none mt-16 lg:hidden"
      :count="productCount"
      :facets="facets"
      :fl="fl"
      @showFilter="showMobileFilter = true"
      @hide="showMobileFilter = false"
    />

    <div class="flex">
      <DesktopFilters
        class="sticky top-0 hidden lg:block"
        :facets="facets"
        :fl="fl"
        @clearAllFilters="clearAllFilters"
      />

      <div class="w-full">
        <div class="container mx-auto pb-2 sm:p-4 sm:border-b">
          <img
            v-lazy="`${category.bannerCdn}?tr=h-360`"
            alt=" "
            class="w-full h-auto object-contain object-top"
          />
        </div>

        <HeaderBody
          class="hidden lg:block"
          :category="category"
          :count="productCount"
          :fl="fl"
          @removed="facetRemoved"
          @showFilters="showMobileFilter = true"
        />

        <!-- <ProductSkeleton /> -->

        <div>
          <div
            v-if="$fetchState.pending"
            class="
              container
              mx-auto
              sm:p-4
              grid grid-cols-2
              sm:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
              sm:gap-4
            "
          >
            <ProductSkeleton v-for="(p, ix) in 10" :key="ix + '-1'" />
          </div>

          <p v-else-if="$fetchState.error" class="p-5 sm:p-10 text-center">
            Error while fetching products
          </p>

          <div
            v-else-if="products && products.length > 0"
            class="
              container
              mx-auto
              sm:p-4
              grid grid-cols-2
              sm:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
              sm:gap-4
            "
          >
            <HomePageProduct
              v-for="(p, ix) in products"
              :key="ix"
              :quickview="false"
              class="slide-up-item"
              :product="p._source"
              :pid="p._id"
            />
          </div>

          <NoProduct v-else />

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
  </section>
</template>

<script>
import CATEGORY from '~/gql/category/category.gql'
import c from '~/mixins/c.js'
import { DESCRIPTION, KEYWORDS } from '~/shared/config'
// import ProductCardEs from '~/components/Listing/ProductCardEs.vue'
import HomePageProduct from '~/components/Home/HomePageProduct.vue'
import ProductSkeleton from '~/components/ProductSkeleton.vue'
import HeaderBody from '~/components/HeaderBody.vue'
import Pagination from '~/shared/components/ui/Pagination.vue'
import BRAND from '~/gql/brand/brand.gql'

export default {
  components: {
    Pagination,
    ProductSkeleton,
    HomePageProduct,
    // ProductCardEs,
    HeaderBody,
  },

  mixins: [c],

  asyncData({ params, app, store }) {
    const { title, keywords, description, favicon, logoMobile } =
      store.state.store || {} // err = null
    return { title, keywords, description, favicon, logoMobile }
  },

  data() {
    return {
      brand: null,
    }
  },

  async fetch() {
    let facets = []
    let fl = {}
    // let err = null
    // let productCount = 0
    // const client = app.apolloProvider.defaultClient
    const storeId = this.$store.state.store && this.$store.state.store.id
    // try {
    const cslug = this.$route.params.slug
    if (cslug) {
      this.category = await this.$get('brand/brand', {
        slug: cslug,
      })
    }
    const q = cslug || null
    const query = this.$route.query
    query.store = storeId || '23sdf43rfs5fdgsdf'
    const qry = { ...query }
    const result = await this.$axios.$get('/api/products/es', {
      params: { ...qry },
    })
    this.products = result.data
    this.productCount = result.facets && result.facets.style_count.value
    facets = result.facets && result.facets.all_aggs
    Object.keys(qry).map(function (k, i) {
      if (
        qry[k] &&
        !Array.isArray(qry[k]) &&
        qry[k] !== null &&
        qry[k] !== '' &&
        k !== 'price' &&
        k !== 'age' &&
        k !== 'discount'
      )
        qry[k] = qry[k].split(',')
    })
    fl = { ...qry } // For selected filters
    this.fl = fl
    this.facets = facets
    // return { products, category, productCount, facets, fl, err: null }
    // } catch (e) {
    //   if (e && e.response && e.response.data) {
    //     err = e.response.data
    //   } else if (e && e.response) {
    //     err = e.response
    //   } else {
    //     err = e
    //   }
    //   console.log('/c/_slug err...', e)
    //   return { products, category, productCount, facets: [], fl: {}, err }
    // }
  },
  // async asyncData({ route, query, params, $axios, app, store }) {
  //   let products = []
  //   let category = {}
  //   let facets = []
  //   let fl = {}
  //   let err = null
  //   let productCount = 0
  //   const client = app.apolloProvider.defaultClient
  //   const storeId = store.state.store && store.state.store.id
  //   try {
  //     const cslug = route.params.slug
  //     if (cslug) {
  //       category = (
  //         await client.query({
  //           query: CATEGORY,
  //           variables: {
  //             slug: cslug,
  //             store: storeId,
  //           },
  //           fetchPolicy: 'no-cache',
  //         })
  //       ).data.category
  //     }
  //     const q = params.slug || null
  //     query.store = storeId || '23sdf43rfs5fdgsdf'
  //     const qry = { ...query }
  //     delete qry.brand
  //     if (q) qry.categories = q
  //     // if (cslug) qry.categories = cslug
  //     const result = await $axios.$get('/api/products/es', {
  //       params: { ...qry },
  //     })
  //     products = result.data
  //     productCount = result.facets && result.facets.style_count.value
  //     facets = result.facets && result.facets.all_aggs
  //     Object.keys(qry).map(function (k, i) {
  //       if (
  //         qry[k] &&
  //         !Array.isArray(qry[k]) &&
  //         qry[k] !== null &&
  //         qry[k] !== '' &&
  //         k !== 'price' &&
  //         k !== 'age' &&
  //         k !== 'discount'
  //       )
  //         qry[k] = qry[k].split(',')
  //     })
  //     fl = { ...qry } // For selected filters
  //     return { products, category, productCount, facets, fl, err: null }
  //   } catch (e) {
  //     if (e && e.response && e.response.data) {
  //       err = e.response.data
  //     } else if (e && e.response) {
  //       err = e.response
  //     } else {
  //       err = e
  //     }
  //     console.log('/c/_slug err...', e)
  //     return { products, category, productCount, facets: [], fl: {}, err }
  //   }
  // },

  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host
    return {
      title:
        (this.category && this.category.metaTitle) ||
        (this.category && this.category.name) ||
        'Brand ',
      meta: [
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content:
            (this.category && this.category.metaDescription) || DESCRIPTION,
        },
        {
          hid: 'keywords',
          name: 'Keywords',
          property: 'keywords',
          content: (this.category && this.category.metaKeywords) || KEYWORDS,
        },
        {
          hid: 'og:title',
          name: 'og_title',
          property: 'og:title',
          content:
            (this.category && this.category.metaTitle) ||
            (this.category && 'Category: ' + this.category.name) ||
            'Category: ' + this.$route.path.substr(1),
        },
        // Google+ / Schema.org
        {
          name: 'og_url',
          property: 'og:url',
          content: host + '/' + this.$route.path.substr(1) || '',
        },
        {
          property: 'og:image',
          content: (this.category && this.category.imgCdn) || this.logoMobile,
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
            (this.category && this.category.metaTitle) ||
            (this.category && 'Category: ' + this.category.name) ||
            'Category: ' + this.$route.path.substr(1),
        },
        {
          name: 'twitter:description',
          content:
            (this.category && this.category.metaDescription) || DESCRIPTION,
        },
      ],
    }
  },
  // watchQuery: true,
  // fetch() {
  // this.scrollToTop()
  // let query = { ...this.$route.query };
  // this.fl = query;
  // },

  mounted() {
    // this.getWishlist() // This was causing node undefined error when page is refreshed
  },

  async created() {
    await this.getBrand()
  },

  methods: {
    // scrollToTop() {
    //   if (process.client) {
    //     window.scroll({ behavior: 'smooth', left: 0, top: 80 })
    //   }
    // },
    // async getData() {
    //   const q = this.$route.query || {}
    //   // q.categories = this.$route.path.substr(1)
    //   try {
    //     this.loading = true
    //     const p = params.slug || null
    //     q.categories = p
    //     const products = await this.$axios.$get('/api/products/es', {
    //       params: q,
    //     })
    //     this.productCount = products.count
    //     this.products = products.data
    //     this.facets = products.facets && products.facets.all_aggs
    //   } catch (e) {
    //   } finally {
    //     this.loading = false
    //   }
    // },

    async getBrand() {
      try {
        this.loading = true
        this.brand = await this.$apollo.query({
          query: BRAND,
        })
        console.log(this.brand)
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
/* .pagination {
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
} */
</style>
