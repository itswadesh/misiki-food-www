<template>
  <section>
    <Megamenu class="hidden lg:flex px-10" />

    <div class="container mx-auto">
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
                md:p-4
                grid grid-cols-2
                md:gap-4
                sm:grid-cols-3
                xl:grid-cols-4
                2xl:grid-cols-5
              "
            >
              <ProductSkeleton v-for="(p, ix) in 30" :key="ix + '-1'" />
            </div>

            <p v-else-if="$fetchState.error" class="p-5 sm:p-10 text-center">
              Error while fetching products
            </p>

            <div
              v-else-if="products && products.length > 0"
              class="
                md:p-4
                grid grid-cols-2
                md:gap-4
                sm:grid-cols-3
                xl:grid-cols-4
                2xl:grid-cols-5
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
    </div>

    <!-- <RightSideBar /> -->
  </section>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import Pagination from '~/shared/components/ui/Pagination'
import c from '~/mixins/c.js'
import HomePageProduct from '~/components/Home/HomePageProduct.vue'
// import ProductCardEs from '~/components/Listing/ProductCardEs.vue'
import HeaderBody from '~/components/HeaderBody.vue'
import QuickView from '~/components/QuickView.vue'

export default {
  components: {
    Megamenu,
    Pagination,
    QuickView,
    //  ProductCardEs
    HomePageProduct,
    HeaderBody,
  },

  mixins: [c],

  asyncData({ params, app, store }) {
    const { title, keywords, description, favicon, logoMobile } =
      store.state.store || {} // err = null
    return { title, keywords, description, favicon, logoMobile }
  },

  async fetch() {
    let facets = []
    let fl = {}
    const storeId = this.$store.state.store && this.$store.state.store.id
    const cslug = this.$route.params.q
    const q = cslug || null
    const query = this.$route.query
    query.store = storeId || '23sdf43rfs5fdgsdf'
    const qry = { ...query }
    if (q) qry.q = q
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
  },
  head() {
    return {
      title: 'Search Product',
    }
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
