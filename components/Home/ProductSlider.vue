<template>
  <section class="bg-white text-gray-700">
    <div class="pb-5 md:pb-10 flex items-center justify-center space-x-2">
      <hr class="h-1 border-gray-300 flex-1" />

      <div
        class="
          flex
          items-center
          justify-center
          text-center text-white text-sm
          sm:text-base
          font-semibold
          tracking-wider
          uppercase
          py-2
          px-8
          bg-primary-500
        "
      >
        {{ heading }}
      </div>

      <hr class="h-1 border-gray-300 flex-1" />
    </div>

    <ProductSliderSkeleton v-if="loading" />

    <div v-else-if="details">
      <!-- Above 1024px  -->

      <div class="hidden lg:block">
        <div class="flex justify-center items-center">
          <progress
            v-if="loading"
            class="
              absolute
              z-10
              justify-center
              block
              m-3
              material-progress-circular
            "
          />
        </div>

        <div class="relative">
          <div
            class="
              absolute
              z-10
              top-36
              left-0
              ms-5
              flex
              items-center
              justify-center
            "
          >
            <button
              class="focus:outline-none focus:ring-0 focus:ring-offset-0"
              @click="showPrev"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="
                  h-6
                  w-6
                  md:h-10 md:w-10
                  text-gray-500
                  hover:text-gray-800
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div>
            <VueSlickCarousel v-bind="settings" ref="carousel">
              <div
                v-for="product in details"
                :key="product.id"
                class="pe-5 w-full"
              >
                <HomePageProduct
                  :quickview="true"
                  :product="product"
                  @open="
                    quickViewProduct = product
                    openQuickView = true
                  "
                />
              </div>
            </VueSlickCarousel>
          </div>

          <div
            class="
              absolute
              z-10
              top-36
              right-0
              me-5
              flex
              items-center
              justify-center
            "
          >
            <button
              class="focus:outline-none focus:ring-0 focus:ring-offset-0"
              @click="showNext"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="
                  h-6
                  w-6
                  md:h-10 md:w-10
                  text-gray-500
                  hover:text-gray-800
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Below 1024px  -->

      <div class="lg:hidden overflow-x-auto">
        <div
          v-if="details && details.length"
          class="flex flex-row items-start justify-start"
        >
          <div v-for="product in details" :key="product.id">
            <HomePageProduct
              :quickview="true"
              :product="product"
              class="w-48 sm:w-56 me-2"
              @open="
                quickViewProduct = product
                openQuickView = true
              "
            />
          </div>
        </div>
      </div>

      <CleanModal
        :show="openQuickView"
        title="Quick View"
        @close="openQuickView = false"
      >
        <div v-if="quickViewProduct" class="w-full max-w-4xl">
          <QuickView
            :img="quickViewProduct.imgCdn"
            :product="quickViewProduct"
          />
        </div>
      </CleanModal>
    </div>
  </section>
</template>

<script>
import HomePageProduct from '~/components/Home/HomePageProduct.vue'
import ProductSliderSkeleton from '~/components/AllSkeletons/ProductSliderSkeleton'
import CleanModal from '~/shared/components/ui/CleanModal.vue'
import ProductImages from '~/components/ProductDetails/ProductImages.vue'
import AddToCart from '~/components/ProductDetails/AddToCart.vue'
import ProductRight from '~/components/ProductDetails/ProductRight.vue'
import ProductDetailSpecs from '~/components/ProductDetails/ProductDetailSpecs.vue'
import QuickView from '~/components/QuickView.vue'

export default {
  components: {
    ProductSliderSkeleton,
    HomePageProduct,
    CleanModal,
    ProductImages,
    AddToCart,
    ProductRight,
    ProductDetailSpecs,
    QuickView,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    details: {
      type: Array,
      default: () => [],
    },
    heading: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      openQuickView: false,
      quickViewProduct: null,
      settings: {
        centerMode: false,
        focusOnSelect: false,
        infinite: true,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        responsive: [
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 4,
            },
          },
        ],
      },
    }
  },

  methods: {
    go(url) {
      this.$router.push(this.localePath(url))
    },

    showNext() {
      this.$refs.carousel.next()
    },

    showPrev() {
      this.$refs.carousel.prev()
    },
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
}
</style>
