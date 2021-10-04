<template>
  <div>
    <Megamenu class="hidden w-full xl:flex" />

    <MobileFilters
      class="sticky top-0 z-20 flex-none mt-16 md:hidden"
      :count="productCount"
      :facets="facets"
      :fl="fl"
      @showFilter="showMobileFilter = true"
      @hide="showMobileFilter = false"
    />

    <div class="flex">
      <DesktopFilters
        class="sticky top-0 hidden md:block"
        :facets="facets"
        :fl="fl"
        @clearAllFilters="clearAllFilters"
      />

      <div class="relative w-full">
        <HeaderBody
          class="hidden md:block"
          :category="{}"
          :count="productCount"
          :fl="fl"
          @removed="facetRemoved"
          @showFilters="showMobileFilter = true"
        />

        <NoProduct v-if="(!products || !products.length) && !loading" />

        <div v-else>
          <div
            class="
              container
              mx-auto
              px-3
              py-3
              sm:px-3
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
              :quickview="false"
              class="slide-up-item"
              :product="p._source"
              :pid="p._id"
              @open="
                quickViewProduct = p
                openQuickView = true
              "
            />

            <!-- <infinite-loading @infinite="loadMore($route.query.page)"></infinite-loading> -->
          </div>
        </div>

        <Pagination
          :count="noOfPages"
          :current="parseInt($route.query.page || 1)"
          @change="changePage"
        />
      </div>
    </div>
    <!-- <RightSideBar /> -->
    <!-- <div v-if="openQuickView">
      <CleanModal :show="openQuickView" title="Quick View">
        <button
          type="button"
          class="
            absolute
            p-1
            transition
            duration-300
            transform
            rounded-md
            hover:bg-opacity-50
            group
            hover:bg-gray-900 hover:shadow-md
            top-3
            right-3
            focus:outline-none focus:scale-75
          "
          @click="openQuickView = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 transition duration-100 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div v-if="quickViewProduct" class="w-full max-w-4xl">
          <QuickView :img="quickViewProduct.img" :product="quickViewProduct" />
        </div>
      </CleanModal>
    </div> -->
  </div>
</template>

<script>
import Pagination from '~/shared/components/ui/Pagination'
import c from '~/mixins/c.js'
import HomePageProduct from '~/components/Home/HomePageProduct.vue'
// import ProductCardEs from '~/components/Listing/ProductCardEs.vue'
import Megamenu from '~/components/Home/Megamenu.vue'
import HeaderBody from '~/components/HeaderBody.vue'
import QuickView from '~/components/QuickView.vue'
import CleanModal from '~/shared/components/ui/CleanModal.vue'
export default {
  components: {
    Pagination,
    CleanModal,
    QuickView,
    //  ProductCardEs
    HomePageProduct,
    Megamenu,
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
