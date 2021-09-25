<template>
  <div class="w-full p-8 text-gray-800 bg-white">
    <div class="flex flex-col justify-between lg:flex-row lg:space-x-10">
      <div class="w-full lg:w-4/5">
        <span class="ps-1 text-lg font-medium uppercase lg:mx-auto">
          Useful links
        </span>

        <div
          class="
            flex flex-row flex-wrap
            mt-4
            mb-4
            text-xs
            font-light
            md:mt-2
            lg:mx-auto
          "
        >
          <a
            :href="settings.ADMIN_PANEL_LINK"
            target="blank"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Merchant Dashboard
          </a>
          <nuxt-link
            to="/contact-us"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Contact Us
          </nuxt-link>
          <nuxt-link
            to="/legal/about-us"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            About Us
          </nuxt-link>
          <nuxt-link
            to="/faq"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            FAQ
          </nuxt-link>
          <nuxt-link
            to="/legal/terms"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Terms Of Use
          </nuxt-link>
          <nuxt-link
            to="/legal/shipping-policy"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Shipping Policy
          </nuxt-link>
          <nuxt-link
            to="/my/orders"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Track Order
          </nuxt-link>
          <nuxt-link
            to="/how-it-works"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            How it works
          </nuxt-link>
          <a
            :href="`${settings.ADMIN_PANEL_LINK}/account/signup`"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Become a merchant
          </a>
          <!-- <span
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800
              hover:text-white
            "
            >Shipping</span
          >
          <span
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800
              hover:text-white
            "
          >
            Cancellation
          </span> -->
          <nuxt-link
            to="/legal/return-policy"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Return Policy
          </nuxt-link>
          <!-- <span
            class="w-auto px-1 mb-1 tracking-wider text-center border-r border-gray-400 cursor-pointer hover:bg-gray-800 hover:text-white"
            >Whitehat</span
          >
          <span
            class="w-auto px-1 mb-1 tracking-wider text-center border-r border-gray-400 cursor-pointer hover:bg-gray-800 hover:text-white"
            >Blog</span
          >
          <span
            class="w-auto px-1 mb-1 tracking-wider text-center border-r border-gray-400 cursor-pointer hover:bg-gray-800 hover:text-white"
            >Careers</span
          > -->
          <nuxt-link
            to="/legal/privacy-policy"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Privacy policy
          </nuxt-link>
          <nuxt-link
            to="/career"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Career
          </nuxt-link>
          <nuxt-link
            to="/contact-us"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Disputes
          </nuxt-link>
          <nuxt-link
            to="/my/orders"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Contact Seller
          </nuxt-link>
          <nuxt-link
            to="/features"
            class="
              w-auto
              px-1
              mb-1
              tracking-wider
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Features
          </nuxt-link>

          <nuxt-link
            to="/blog"
            class="
              w-auto
              px-1
              mb-1
              text-center
              border-r border-gray-400
              cursor-pointer
              hover:bg-gray-800 hover:text-white
            "
          >
            Blog
          </nuxt-link>
        </div>
        <div v-if="popularSearches && popularSearches.length">
          <span class="ps-1 my-4 mt-6 text-lg font-medium uppercase lg:mx-auto">
            Popular searches
          </span>
          <div
            class="
              flex flex-row flex-wrap
              mt-4
              text-xs
              font-light
              md:mt-2
              lg:mx-auto
            "
          >
            <nuxt-link
              v-for="(s, ix) in popularSearches"
              :key="ix"
              :to="`/search/${s.text}`"
              class="
                w-auto
                px-1
                mb-1
                tracking-wider
                text-center
                border-r border-gray-400
                cursor-pointer
                hover:bg-gray-800 hover:text-white
              "
            >
              {{ s.text }}
            </nuxt-link>
          </div>
        </div>
      </div>

      <div
        class="
          hidden
          md:flex
          flex-row
          items-start
          lg:flex-col
          space-x-5
          lg:space-x-0 lg:w-2/5
          w-full
        "
      >
        <div
          class="w-1/2 lg:w-full flex flex-col md:flex-row items-center mb-2"
        >
          <img
            v-lazy="`/img/footer/original.png?tr=w-48,h-48,fo-auto`"
            alt=" "
            class="me-4 object-contain w-8 h-8"
          />

          <h6 class="flex-1 text-sm">
            <strong> 100% Original </strong
            ><span class="font-light">
              guarantee for all products at {{ store.name }}</span
            >
          </h6>
        </div>

        <div
          class="w-1/2 lg:w-full flex flex-col md:flex-row items-center mb-2"
        >
          <img
            v-lazy="`/img/footer/free.png?tr=w-48,h-48,fo-auto`"
            alt=" "
            class="me-4 object-contain w-8 h-8"
          />

          <h6 class="flex-1 text-sm">
            <strong>Get assured delivery</strong
            ><span class="font-light"> for every order</span>
          </h6>
        </div>

        <!-- <div class="flex flex-col my-8 md:flex-row">
          <img
            v-lazy="`/img/footer/return.png?tr=w-48,h-48,fo-auto`"
            alt="🚀"
            class="object-contain w-8 h-8 lg:w-12 lg:h-12 p-1 my-auto bg-white rounded"
          />
          <span class="object-cover ps-4 my-auto lg:w-2/3">
            <strong class="font-light">Return within 30days </strong> of
            receiving your order</span
          >
        </div> -->
      </div>
    </div>

    <hr class="w-full my-4 border-t-2" />

    <div
      class="
        flex flex-row
        items-center
        mb-3
        lg:mb-0 lg:items-start
        justify-between
      "
    >
      <div
        class="text-sm font-normal tracking-wider whitespace-nowrap max-w-max"
      >
        © {{ year }} {{ store.name }}
        <span v-if="store.websiteEmail" class="ms-2">
          {{ store.websiteEmail }}</span
        >
      </div>

      <div
        class="
          hidden
          lg:flex
          max-w-max
          flex-shrink-0 flex-row
          items-start
          text-sm
          space-x-5
        "
      >
        <div id="google_translate_element"></div>

        <div v-if="visitorCount">Visitors : {{ visitorCount }}</div>
      </div>

      <!-- <LanguageSwitch v-if="loadedTranslate" /> -->
      <!-- <button @click="googleTranslateElementInit">
        googleTranslateElementInit
      </button> -->

      <div class="flex flex-row items-center space-x-2 max-w-max">
        <div v-for="(i, ix) in icons" :key="ix" class="mb-1">
          <img
            v-lazy="`${i.img}?tr=w-36,h-36,fo-auto`"
            :alt="i.alt"
            class="h-9 w-9 bg-white"
          />
        </div>
      </div>
    </div>

    <div
      class="
        lg:hidden
        max-w-max
        flex-shrink-0 flex flex-row
        items-start
        text-sm
        space-x-5
      "
    >
      <div id="google_translate_element "></div>

      <div v-if="visitorCount">
        <span class="me-1">Visitors :</span> <b>{{ visitorCount }}</b>
      </div>
    </div>

    <CookieConsent />
  </div>
</template>

<script>
// import LanguageSwitcher from '~/components/LanguageSwitcher'
import { mapMutations } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
import CookieConsent from '~/components/CookieConsent.vue'
// import LanguageSwitch from '~/components/CurrencyLanguage/LanguageSwitch.vue'
export default {
  components: {
    NuxtLink,
    CookieConsent,
    // LanguageSwitch,
    // LanguageSwitcher
  },
  data() {
    return {
      visitorCount: null,
      loadedTranslate: false,
      year: new Date().getFullYear(),
      // popularSearches: null,
      icons: [
        { img: '/img/payment/mastercard.svg', alt: 'mastercard' },
        { img: '/img/payment/rupay.svg', alt: 'rupay' },
        { img: '/img/payment/visa.svg', alt: 'visa' },
        { img: '/img/payment/american-express.svg', alt: 'american-express' },
        { img: '/img/payment/paypal.svg', alt: 'paypal' },
        { img: '/img/payment/bhim-upi.png', alt: 'upi' },
      ],
    }
  },
  // async fetch() {
  // this.getPopularSearches()
  // this.popularSearches = (
  //   await this.$get('search/popularSearches', { sort: '-popularity' })
  // ).data
  // },
  computed: {
    store() {
      return this.$store.state.store || {}
    },
    settings() {
      return this.$store.state.settings || {}
    },
    popularSearches() {
      return this.$store.state.popularSearches || []
    },
  },
  mounted() {
    this.loadTranslate()
    const vm = this
    setTimeout(function () {
      vm.googleTranslateInit()
      vm.updateVisitorCount()
    }, 3000)
  },
  methods: {
    ...mapMutations({ setErr: 'setErr', clearErr: 'clearErr' }),

    async updateVisitorCount() {
      this.visitorCount = await this.$post('store/updateVisitorCount')
    },
    googleTranslateInit() {
      const vm = this
      const checkIfGoogleLoaded = setInterval(() => {
        if (google.translate.TranslateElement != null) {
          clearInterval(checkIfGoogleLoaded)

          vm.googleTranslateElementInit('google_translate_element')
        }
      }, 1000)
      this.googleTranslateElementInit()
    },
    googleTranslateElementInit() {
      // eslint-disable-next-line no-new
      new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      )
    },
    // googleTranslateElement(id) {
    //   // eslint-disable-next-line no-new
    //   new google.translate.TranslateElement(
    //     {
    //       pageLanguage: 'en',
    //       layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    //     },
    //     id
    //   )
    // },
    loadTranslate() {
      try {
        this.loading = true
        this.clearErr()
        if (process.browser) {
          const domElement = document.createElement('script')
          domElement.setAttribute(
            'src',
            '//translate.google.com/translate_a/element.js'
          )
          domElement.onload = () => {
            this.loadedTranslate = true
          }
          document.body.appendChild(domElement)
        }
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },
    // googleTranslateElement(id) {
    //   new google.translate.TranslateElement(
    //     {
    //       pageLanguage: 'en',
    //       layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    //     },
    //     id
    //   )
    // },

    // async getPopularSearches() {
    //   try {
    //     this.loading = true
    //     this.popularSearches = (
    //       await this.$get('search/popularSearches', { sort: '-popularity' })
    //     ).data
    //     // this.popularSearches = (
    //     //   await this.$apollo.query({
    //     //     query: POPULAR_SEARCHES,
    //     //     variables: {
    //     //       sort: '-popularity',
    //     //     },
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.popularSearches.data
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
.icon {
  width: 40px;
  height: 23px;
}
</style>
