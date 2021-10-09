<template>
  <div
    class="
      grid grid-cols-1
      md:grid-cols-2
      text-gray-800
      overflow-y-auto
      md:overflow-y-hidden
      max-height
    "
  >
    <!-- Image  -->

    <div v-if="imgCdn" class="overflow-hidden">
      <img
        :src="`${imgCdn}`"
        alt="products"
        class="h-full w-full object-cover"
      />
    </div>

    <div
      v-if="product"
      class="p-5 sm:p-10 flex flex-col max-height md:overflow-y-auto"
    >
      <!-- Product brand -->

      <b
        v-if="product.brand"
        class="leading-3 text-lg sm:text-xl mb-1 uppercase"
      >
        {{ product.brand.name }}
      </b>

      <!-- Product name -->

      <p class="mb-1.5 sm:mb-3">
        {{ product.name }}
      </p>

      <!-- Pricing  -->

      <div class="mb-1.5 sm:mb-3">
        <div class="flex flex-row my-auto items-baseline mb-1">
          <b class="me-2 text-base sm:text-xl">
            {{
              product.price
                | currency(store.currencySymbol, store.currencyDecimals)
            }}
          </b>

          <strike
            v-if="product.price < product.mrp"
            class="text-sm sm:text-base font-light me-2 text-gray-500"
          >
            {{
              product.mrp
                | currency(store.currencySymbol, store.currencyDecimals)
            }}
          </strike>

          <div
            v-if="product.discount > 0"
            class="text-sm sm:text-base text-primary-700"
          >
            ({{ product.discount }}% off)
          </div>
        </div>

        <p class="text-sm text-secondary-500 font-medium">
          inclusive of all taxes
        </p>
      </div>

      <!-- Hurry up -->

      <p
        v-if="product.stock > 0 && product.stock < 5"
        class="text-sm font-light text-red-500 mb-2 sm:mb-3 animate-pulse"
      >
        Hurry up, only few left!
      </p>

      <!-- Size and Color  -->

      <div
        v-if="
          pg &&
          ((pg.colorGroup && pg.colorGroup.length) ||
            (pg.sizeGroup && pg.sizeGroup.length))
        "
        class="mb-1.5 sm:mb-3"
      >
        <div v-if="pg.sizeGroup && pg.sizeGroup.length" class="mb-1.5 sm:mb-3">
          <h6 class="mb-1.5 sm:mb-3 font-semibold me-2">Pick Size</h6>

          <div class="flex flex-row items-center space-x-2">
            <nuxt-link
              v-for="(i, ix) in pg.sizeGroup"
              :key="ix + 's'"
              :to="`/${i.slug}?id=${i.id}`"
              :class="getClassesForSizeGroup(i, product)"
              class="
                relative
                text-sm
                font-medium
                flex
                items-center
                justify-center
                w-12
                h-12
                bg-white
                border
                rounded-full
                cursor-pointer
                focus:outline-none
              "
            >
              <div v-if="i.stock < 1" class="absolute inset-x-0">
                <div class="border-t border-gray-400 transform rotate-45"></div>
              </div>
              <div class="uppercase">
                {{ i.size.name }}
              </div>
            </nuxt-link>
          </div>
        </div>

        <div v-if="pg.colorGroup && pg.colorGroup.length">
          <h6 class="mb-1.5 sm:mb-3 font-semibold me-2">Pick Color</h6>

          <div class="flex flex-row items-center space-x-2">
            <nuxt-link
              v-for="(i, ix) in pg.colorGroup"
              :key="ix + 'c'"
              :to="`/${i.slug}?id=${i.id}`"
              :style="`background: ${i.color.color_code};`"
              :class="getClassesForColorGroup(i, product)"
              class="
                flex
                items-center
                justify-center
                w-12
                h-12
                border border-gray-500
                hover:border-primary-500
                rounded-full
                cursor-pointer
                focus:outline-none
                tooltip
              "
            >
              <div
                class="
                  absolute
                  z-50
                  w-auto
                  p-2
                  px-4
                  -mt-24
                  text-sm
                  tracking-wider
                  text-center text-white
                  transition
                  duration-75
                  delay-75
                  transform
                  bg-black
                  rounded-lg
                  shadow-lg
                  tooltiptext
                "
              >
                {{ i.color.name }}
              </div>
              <div class="absolute shadow-lg triangle tooltiptext"></div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- Availability -->

      <div class="flex flex-row items-center mb-2 sm:mb-3 text-sm">
        <div
          class="
            flex flex-row
            items-center
            space-x-2
            me-2
            font-semibold
            whitespace-nowrap
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>

          <span>Availability :</span>
        </div>

        <span
          v-if="product.stock >= 5"
          class="text-secondary-200 whitespace-nowrap"
          >In Stock</span
        >

        <span
          v-else-if="product.stock > 0 && product.stock < 5"
          class="text-primary-500 whitespace-nowrap"
        >
          Only {{ product.stock }} remaining
        </span>

        <span v-else class="text-red-500 whitespace-nowrap"> Out of Stock</span>
      </div>

      <!-- Return Info -->

      <div v-if="product.returnInfo" class="flex flex-wrap items-center">
        <div class="me-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.64 2.35C12.19 0.9 10.2 0 7.99 0C3.57 0 0 3.58 0 8C0 12.42 3.57 16 7.99 16C11.72 16 14.83 13.45 15.72 10H13.64C12.82 12.33 10.6 14 7.99 14C4.68 14 1.99 11.31 1.99 8C1.99 4.69 4.68 2 7.99 2C9.65 2 11.13 2.69 12.21 3.78L8.99 7H15.99V0L13.64 2.35Z"
              fill="#4A4A4A"
            />
          </svg>
        </div>

        <div class="font-light text-gray-500">
          {{ product.returnInfo }}
        </div>
      </div>

      <!-- Get it by -->

      <div class="flex flex-row items-center mb-2.5 sm:mb-5 text-sm">
        <div
          class="
            flex flex-row
            items-center
            space-x-2
            me-2
            font-semibold
            whitespace-nowrap
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            />
          </svg>

          <span> Get it by :</span>
        </div>

        <span class="whitespace-nowrap text-gray-500">
          {{ deliveryDate }}
        </span>
      </div>

      <!-- Add To Cart and QTY -->

      <div
        class="
          flex flex-col
          sm:flex-row
          md:flex-col
          lg:flex-row
          space-y-2
          sm:space-y-0 sm:space-x-3
          md:space-x-0 md:space-y-5
          lg:space-y-0 lg:space-x-5
          mb-2.5
          sm:mb-5
        "
      >
        <div
          class="
            max-w-max
            flex
            items-center
            justify-center
            space-x-3
            border border-gray-400
            rounded-md
          "
        >
          <button
            class="
              rounded-l-md
              hover:bg-gray-100
              transition
              duration-300
              p-2
              sm:p-3
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M20 12H4"
              />
            </svg>
          </button>

          <b class="text-lg px-2 sm:px-3 text-center">1</b>

          <button
            class="
              rounded-r-md
              hover:bg-gray-100
              transition
              duration-300
              p-2
              sm:p-3
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        <AddToCart :product="product" />
        <!-- :user-selected-variant="userSelectedVariant"
          :options="product.options"
          :selected-options="selectedOptions" 
          @alertToSelectMandatoryOptions="alertToSelectMandatoryOptions" -->
      </div>

      <!-- Description -->

      <div class="flex flex-col mb-2 sm:mb-3 text-sm">
        <div
          class="
            mb-2
            flex flex-row
            items-center
            space-x-2
            me-2
            font-semibold
            whitespace-nowrap
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>

          <span> Description </span>
        </div>

        <div
          class="font-light text-gray-500 text-sm"
          v-html="product.description"
        />
      </div>

      <!-- Key Features -->

      <div
        v-if="product.keyFeatures && product.keyFeatures.length"
        class="flex flex-col mb-2 sm:mb-3 text-sm"
      >
        <div
          class="
            mb-2
            flex flex-row
            items-center
            space-x-2
            me-2
            font-semibold
            whitespace-nowrap
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>

          <span> Key Features </span>
        </div>

        <ul class="font-light text-sm sm:text-base">
          <li v-for="(kf, ix) in product.keyFeatures" :key="ix + 'kf'">
            <div v-if="kf" class="flex flex-row py-2">
              <div class="w-5 h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span class="leading-5 ms-2"> {{ kf }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Product Details -->

      <div class="flex flex-col mb-2 sm:mb-3 text-sm">
        <div
          class="
            mb-2
            flex flex-row
            items-center
            space-x-2
            me-2
            font-semibold
            whitespace-nowrap
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>

          <span> Product Details </span>
        </div>

        <div v-for="(s, ix) in product.productDetails" :key="ix + 'pdd'">
          <div v-if="s" class="flex-row font-light text-gray-500 mb-2 text-sm">
            <div class="w-1/3 p-1 my-auto ps-3">
              {{ s.name }}
            </div>
            <div class="w-2/3 p-1 my-auto">
              {{ s.value }}
            </div>
          </div>
        </div>

        <!-- <div
          v-if="product.countryOfOrigin"
          class="flex items-center mb-2 text-sm font-medium"
        >
          <span class="whitespace-nowrap w-36 me-2">Country Of Origin - </span>

          <span class="text-gray-500">{{ product.countryOfOrigin }}</span>
        </div> -->
      </div>

      <!-- Specifications -->

      <div
        v-if="product.specifications && product.specifications.length"
        class="flex flex-col mb-2 sm:mb-3 text-sm"
      >
        <div
          class="
            mb-2
            flex flex-row
            items-center
            space-x-2
            me-2
            font-semibold
            whitespace-nowrap
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>

          <span> Specifications </span>
        </div>

        <div v-for="(s, ix) in product.specifications" :key="ix + 'ds'">
          <div v-if="s" class="flex-row font-light text-gray-500 mb-2 text-sm">
            <div class="w-1/3 p-1 my-auto ps-3">
              {{ s.name }}
            </div>
            <div class="w-2/3 p-1 my-auto">
              {{ s.value }}
            </div>
          </div>
        </div>

        <div
          v-if="product.countryOfOrigin"
          class="flex items-center mb-2 text-sm font-medium"
        >
          <span class="whitespace-nowrap w-36 me-2">Country Of Origin - </span>

          <span class="text-gray-500">{{ product.countryOfOrigin }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import AddToCart from '~/components/ProductDetails/AddToCart.vue'

export default {
  components: {
    AddToCart,
  },

  props: {
    img: { type: String, default: null },
    product: { type: Object, default: null },
    pg: { type: Object, default: null },
  },

  data() {
    return {
      deliveryDate: null,
    }
  },

  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
      settings: 'settings',
      store: 'store',
    }),
    // discount() {
    //   return Math.floor(100 - (this.product.price * 100) / this.product.mrp)
    // },
  },

  async created() {
    // await this.getReviews()
    await this.updatedDeliveryDates()
    if (this.product.options) {
      this.product.options.forEach((o) => {
        if (o.type === 'checkbox') {
          this.selectedOptions[o.name] = []
          if (o.default_option) {
            this.selectedOptions[o.name].push(o.default_option)
          }
        } else {
          this.selectedOptions[o.name] = null
          this.selectedOptions[o.name] = o.default_option
        }
        // console.log(this.product,this.selectedOptions)
      })
    }
  },

  methods: {
    getClassesForSizeGroup(i, product) {
      let classes = ''
      if (i.stock < 1) classes = 'border-gray-400 text-gray-400 bg-gray-300'
      else if (i.id === product.id)
        classes = 'border-primary-500 text-primary-500 bg-white'
      else
        classes =
          'border-gray-500 text-gray-700 hover:border-primary-500 bg-white'
      return classes
    },
    getClassesForColorGroup(i, product) {
      let classes = ''
      if (i.stock < 1) classes = 'border-gray-100 text-gray-400'
      else if (i.id === product.id)
        classes = 'border-primary-500 bg-primary-500'
      else classes = 'border-gray-500 hover:border-primary-500'
      return classes
    },
    populateDemoScheduler(p) {
      this.selectedProduct = { id: p.id, name: p.name }
      this.showDemoScheduler = true
    },
    // async getReviews() {
    //   const pid = this.$route.query.id
    //   if (!pid) return
    //   try {
    //     this.reviewSummary = await this.$get('review/reviewSummary', { pid })
    //     // this.reviewSummary = (
    //     //   await this.$apollo.query({
    //     //     query: REVIEWS,
    //     //     variables: { pid },
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.reviewSummary
    //   } catch (e) {}
    // },
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    ...mapActions({ addToCart: 'cart/addToCart' }),
    alertToSelectMandatoryOptions() {
      // Raised by AddToCart Button at detail page
      this.setErr('Please select a size')
      if (process.client) {
        const el = this.$el.getElementsByClassName('sizeSelector')[0]
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
      this.shake = true
      setTimeout(() => {
        this.shake = false
      }, 3000)
    },
    selectVariant(s) {
      this.updatedDeliveryDates()
      this.userSelectedVariant = s
      this.$emit('variantChanged', s)
      this.selectedImgIndex = 0
    },
    updatedDeliveryDates() {
      const now = new Date()
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      now.setDate(now.getDate() + 5)
      this.deliveryDate =
        now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear()
    },
    pushToLogin() {
      const query = this.$route.query
      let route = this.$route.path
      route = route.substr(1)
      if (!query || !query.id) this.$router.push(`/login?return=${route}`)
      else this.$router.push(`/login?return=${route}?id=${query.id}&wish=true`)
    },
    go(url) {
      this.$router.push(url)
    },
    findVariation() {
      // const pid = this.product.id
      // const obj = this.selectedOptions
      // const options = Object.keys(obj).map(function (key) {
      //   return { name: key, val: obj[key] }
      // })
      // console.log('options', options)
      try {
        this.clearErr()
        // const variant = (
        //   await this.$apollo.query({
        //     query: GET_VARIANT,
        //     variables: { pid, options },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.getVariant
        // this.selectedVariant = variant
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },

    error(err) {
      this.setErr(err.err)
    },
    clearRecentItems() {
      this.RecentlyViewedProducts = []
    },
    // async getProduct() {
    //   this.loading = true
    //   try {
    //     this.product = (
    //       await this.$apollo.query({
    //         query: PRODUCT,
    //         variables: { id: this.$route.query.id },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.product
    //     this.updatedDeliveryDates()
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
}
</script>

<style scoped>
.tooltip .tooltiptext {
  visibility: hidden;
  transition: opacity 5s;
}
.tooltip:hover .tooltiptext {
  border-radius: 3px;
  visibility: visible;
}
::-webkit-scrollbar {
  width: 10px;
}

@media (max-width: 768px) {
  .max-height {
    max-height: 85vh;
  }
}
@media (min-width: 768px) {
  .max-height {
    max-height: 75vh;
  }
}
</style>
