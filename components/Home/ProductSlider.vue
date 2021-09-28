<template>
  <main v-if="details && details.length" class="bg-white text-gray-700">
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

    <section v-if="details">
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
            <button class="focus:outline-none" @click="showPrev">
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
                  :product="product"
                  @open="openQuickView = true"
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
            <button class="focus:outline-none" @click="showNext">
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
          v-bind="settings"
          class="flex flex-row items-start justify-start"
        >
          <div v-for="product in details" :key="product.id">
            <HomePageProduct
              :product="product"
              class="w-48 sm:w-56 me-2"
              @open="openQuickView = true"
            />
          </div>
        </div>
      </div>

      <div v-if="openQuickView">
        <ModalLarge :show="openQuickView" title="Quick View" type="info" noicon>
          <!-- Close button start -->
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

          <!-- Close button end -->

          <div v-if="details && details.length" class="w-full">
            <div class="grid grid-cols-2 gap-5">
              <ProductImages :img="details[5].img" :product="details[5]" />

              <ProductRight :product="details[5]" />
            </div>

            <!-- <ProductImages
              :loading="$fetchState.pending"
              class="h-auto mt-5 nowrap lg:mt-0 mb-5 md:mb-10"
              :images="product && product.images"
              :pid="product.id"
              :img="product.img"
              :host="host"
              :product="product"
              :exist-in-wishlist="checkWishlist"
            /> -->

            <!-- <div v-if="product && product.id" class="bg-white">
              <ProductRight
                ref="ProductRight"
                class="w-full h-auto nowrap mb-5"
                :host="host"
                :product="product"
                :pg="pg"
                :review-summary="reviewSummary"
                @variantChanged="variantChanged"
                @optionChanged="optionChanged"
              />

              <div
                class="
                  mb-5
                  px-2
                  xl:ms-5
                  md:flex
                  items-center
                  space-y-4
                  md:space-y-0 md:space-x-5
                  xl:hidden
                "
              >
                <div class="w-full md:w-1/2">
                  <AddToCart
                    class=""
                    :product="product"
                    :user-selected-variant="userSelectedVariant"
                    :options="product.options"
                    :selected-options="selectedOptions"
                    @alertToSelectMandatoryOptions="
                      alertToSelectMandatoryOptions
                    "
                  />
                </div>

                <div class="w-full md:w-1/2">
                  <BuyNow
                    v-if="product.stock > 0"
                    class=""
                    :product="product"
                    :user-selected-variant="userSelectedVariant"
                    :options="product.options"
                    :selected-options="selectedOptions"
                    @alertToSelectMandatoryOptions="
                      alertToSelectMandatoryOptions
                    "
                  />
                </div>
              </div>
            </div>

            <ProductDetailSpecs :product="product" class="mb-5" /> -->
          </div>
        </ModalLarge>
      </div>
    </section>
  </main>
</template>

<script>
import HomePageProduct from '~/components/Home/HomePageProduct.vue'
// import ProductSliderSkeleton from '~/components/AllSkeletons/ProductSliderSkeleton'
import ModalLarge from '~/shared/components/ui/ModalLarge.vue'
import ProductImages from '~/components/ProductDetails/ProductImages.vue'
import AddToCart from '~/components/ProductDetails/AddToCart.vue'
import ProductRight from '~/components/ProductDetails/ProductRight.vue'
import ProductDetailSpecs from '~/components/ProductDetails/ProductDetailSpecs.vue'

export default {
  components: {
    // ProductSliderSkeleton,
    HomePageProduct,
    ModalLarge,
    ProductImages,
    AddToCart,
    ProductRight,
    ProductDetailSpecs,
  },

  props: {
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
      loading: false,
      openQuickView: false,

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
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}

/* Handle */
::-webkit-scrollbar-thumb {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}
</style>
