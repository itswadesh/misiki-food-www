<template>
  <div class="w-full p-8 text-white bg-primary-500">
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
            font-thin
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
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Merchant Dashboard
          </a>
          <nuxt-link
            to="/contact-us"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Contact Us
          </nuxt-link>
          <nuxt-link
            to="/legal/about-us"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            About Us
          </nuxt-link>
          <nuxt-link
            to="/faq"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            FAQ
          </nuxt-link>
          <nuxt-link
            to="/legal/terms"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Terms Of Use
          </nuxt-link>
          <nuxt-link
            to="/legal/shipping-policy"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Shipping Policy
          </nuxt-link>
          <nuxt-link
            to="/my/orders"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Track Order
          </nuxt-link>
          <nuxt-link
            to="/how-it-works"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            How it works
          </nuxt-link>
          <a
            :href="`${settings.ADMIN_PANEL_LINK}/account/signup`"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Become a merchant
          </a>
          <!-- <span
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white
              hover:text-primary-500
            "
            >Shipping</span
          >
          <span
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white
              hover:text-primary-500
            "
          >
            Cancellation
          </span> -->
          <nuxt-link
            to="/legal/return-policy"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Return Policy
          </nuxt-link>
          <!-- <span
            class="w-auto px-1 my-auto tracking-wider text-center border-r border-white cursor-pointer hover:bg-white hover:text-primary-500"
            >Whitehat</span
          >
          <span
            class="w-auto px-1 my-auto tracking-wider text-center border-r border-white cursor-pointer hover:bg-white hover:text-primary-500"
            >Blog</span
          >
          <span
            class="w-auto px-1 my-auto tracking-wider text-center border-r border-white cursor-pointer hover:bg-white hover:text-primary-500"
            >Careers</span
          > -->
          <nuxt-link
            to="/legal/privacy-policy"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Privacy policy
          </nuxt-link>
          <nuxt-link
            to="/career"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Career
          </nuxt-link>
          <nuxt-link
            to="/contact-us"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Disputes
          </nuxt-link>
          <nuxt-link
            to="/my/orders"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Contaact Seller
          </nuxt-link>
          <nuxt-link
            to="/features"
            class="
              w-auto
              px-1
              my-auto
              tracking-wider
              text-center
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Features
          </nuxt-link>

          <nuxt-link
            to="/blog"
            class="
              w-auto
              px-1
              my-auto
              text-center
              border border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            Blog
          </nuxt-link>
        </div>
        <span class="ps-1 my-4 mt-6 text-lg font-medium uppercase lg:mx-auto">
          Popular searches
        </span>
        <div
          class="
            flex flex-row flex-wrap
            mt-4
            text-xs
            font-thin
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
              my-auto
              tracking-wider
              text-center
              border-r border-white
              cursor-pointer
              hover:bg-white hover:text-primary-500
            "
          >
            {{ s.text }}
          </nuxt-link>
        </div>
      </div>
      <div
        class="
          flex-row
          hidden
          w-full
          my-auto
          font-thin
          text-white
          lg:ps-6 lg:flex-col lg:w-2/5
          md:flex
        "
      >
        <div class="flex flex-col md:flex-row mb-2">
          <img
            v-lazy="`/img/footer/original.png?tr=w-48,h-48,fo-auto`"
            alt=""
            class="object-contain w-12 h-12 p-1 my-auto bg-white rounded"
          />
          <span class="object-cover ps-4 my-auto lg:w-2/3">
            <strong class="font-light"> 100% ORIGINAL </strong> guarantee for
            all products at {{ store.name }}
          </span>
        </div>
        <!-- <div class="flex flex-col my-8 md:flex-row">
          <img v-lazy="`/img/footer/return.png?tr=w-48,h-48,fo-auto`"
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
            v-lazy="`/img/footer/free.png?tr=w-48,h-48,fo-auto`"
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
    <div class="w-full my-4 border-b-2 border-white"></div>
    <div class="flex flex-col-reverse justify-between md:flex-row">
      <span class="mt-4 text-sm font-normal tracking-wider md:mt-0">
        © {{ year }} {{ store.name }}
        <span v-if="store.websiteEmail" class="ms-2">
          {{ store.websiteEmail }}</span
        >
      </span>
      <!-- <LanguageSwitcher /> -->
      <div class="flex flex-row items-center space-x-2">
        <div v-for="(i, ix) in icons" :key="ix" class="mb-1">
          <img
            v-lazy="`${i.imgCdn}?tr=w-48,h-28,fo-auto`"
            :alt="i.alt"
            class="h-7 w-12 bg-white border p-1 object-contain"
          />
        </div>
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
    // LanguageSwitcher,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      // popularSearches: null,
      icons: [
        { img: '/img/mastercard-logo.png', alt: 'mastercard' },
        { img: '/img/rupay-logo.png', alt: 'rupay' },
        { img: '/img/visa.png', alt: 'visa' },
        { img: '/img/american.jpg', alt: 'american-express' },
        { img: '/img/paypal-logo-png-transparent.png', alt: 'paypal' },
        { img: '/img/upi-logo.png', alt: 'upi' },
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
