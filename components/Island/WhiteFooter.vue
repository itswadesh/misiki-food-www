<template>
  <div class="w-full p-8 text-gray-800 bg-white">
    <div class="flex flex-col justify-between lg:flex-row">
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
          flex-row
          hidden
          w-full
          my-auto
          font-light
          lg:ps-6 lg:flex-col lg:w-2/5
          md:flex
        "
      >
        <div class="flex flex-col md:flex-row mb-2">
          <img
            v-lazy="'/img/footer/original.png'"
            alt=""
            class="object-contain w-12 h-12 p-1 my-auto bg-white rounded"
          />
          <span class="object-cover ps-4 my-auto lg:w-2/3">
            <strong class="font-light"> 100% ORIGINAL </strong> guarantee for
            all products at {{ store.name }}
          </span>
        </div>

        <!-- <div class="flex flex-col my-8 md:flex-row">
          <img
            v-lazy="'/img/footer/return.png'"
            alt=""
            class="object-contain w-12 h-12 p-1 my-auto bg-white rounded"
          />
          <span class="object-cover ps-4 my-auto lg:w-2/3">
            <strong class="font-light">Return within 30days </strong> of
            receiving your order</span
          >
        </div> -->

        <div class="flex flex-col md:flex-row mt-2">
          <img
            v-lazy="'/img/footer/free.png'"
            alt=""
            class="object-contain w-12 h-12 p-1 my-auto bg-white rounded"
          />
          <span class="object-cover ps-4 my-auto lg:w-2/3">
            <strong class="font-light"> Get assured delivery </strong> for every
            order
          </span>
        </div>
      </div>
    </div>

    <div class="w-full my-4 border-b-2 border-gray-400"></div>
    <div class="flex flex-col-reverse justify-between md:flex-row">
      <span class="mt-4 text-sm font-normal tracking-wider md:mt-0">
        © {{ year }} {{ store.name }}
        <span v-if="store.websiteEmail" class="ms-2">
          {{ store.websiteEmail }}</span
        >
      </span>

      <!-- <LanguageSwitcher /> -->

      <div class="container flex flex-row w-full mx-auto md:w-auto md:mx-0">
        <img
          src="/img/Mastercard-logo.png"
          alt="mastercard"
          class="mb-1 bg-white border me-2 icon"
        />
        <!-- <img
          src="/img/Mastercard-logo.png"
          alt="mastercard"
          class="mb-1 bg-white border me-2 icon"
        />
        <img
          src="/img/Rupay-Logo.png"
          alt="rupay"
          class="mb-1 bg-white border me-2 icon"
        />
        <img
          src="/img/visa.png"
          alt="visa"
          class="mb-1 bg-white border me-2 icon"
        />
        <img
          src="/img/american.jpg"
          alt="ae"
          class="mb-1 bg-white border me-2 icon"
        />
        <img
          src="/img/paypal-logo-png-transparent.png"
          alt="payppal"
          class="mb-1 bg-white border me-2 icon"
        />
        <img
          src="/img/UPI-Logo.png"
          alt="ae"
          class="mb-1 bg-white border me-2 icon"
        /> -->
      </div>
    </div>
  </div>
</template>
<script>
// import LanguageSwitcher from '~/components/LanguageSwitcher'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: {
    NuxtLink,
    // LanguageSwitcher
  },
  data() {
    return {
      year: new Date().getFullYear(),
      // popularSearches: null,
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
  methods: {
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
