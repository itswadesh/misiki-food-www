<template>
  <div class="p-2 sm:p-3 text-gray-800 mb-10 sm:mb-0">
    <div class="mb-2 flex flex-col justify-between lg:flex-row lg:space-x-10">
      <div class="w-full lg:w-4/5">
        <h1
          class="
            mb-4
            text-base
            sm:text-lg
            font-medium
            uppercase
            border-b border-gray-400
            max-w-max
            pb-2
          "
        >
          Useful links
        </h1>

        <div class="flex flex-row flex-wrap text-xs md:mt-2">
          <div class="mb-2 pr-2 mr-2 border-r border-gray-400">
            <a
              :href="settings.ADMIN_PANEL_LINK"
              target="blank"
              class="
                whitespace-nowrap
                max-w-max
                tracking-wider
                text-center
                hovereffect
              "
            >
              Merchant Dashboard
            </a>
          </div>

          <div
            v-for="(f, fx) in footerLink"
            :key="fx"
            class="mb-2 pr-2 mr-2 border-r border-gray-400"
          >
            <nuxt-link
              :to="f.link"
              class="
                whitespace-nowrap
                max-w-max
                tracking-wider
                text-center
                hovereffect
              "
            >
              {{ f.name }}
            </nuxt-link>
          </div>

          <div class="mb-2 pr-2 mr-2 border-r border-gray-400">
            <a
              :href="`${settings.ADMIN_PANEL_LINK}/account/signup`"
              target="blank"
              class="
                whitespace-nowrap
                max-w-max
                tracking-wider
                text-center
                hovereffect
              "
            >
              Become a merchant
            </a>
          </div>

          <div
            v-if="store.domain === 'anne.biz'"
            class="mb-2 pr-2 mr-2 border-r border-gray-400"
          >
            <a
              href="https://anne.today"
              target="blank"
              class="
                whitespace-nowrap
                max-w-max
                tracking-wider
                text-center
                hovereffect
              "
            >
              Exclusive Furnitures
            </a>
          </div>

          <!-- <span
            class="
              w-auto
              
              mb-2
              tracking-wider
              text-center
              
              cursor-pointer
              hover:bg-gray-700
              hover:text-white
            "
            >Shipping</span
          >
          <span
            class="
              w-auto
              
              mb-2
              tracking-wider
              text-center
              
              cursor-pointer
              hover:bg-gray-700
              hover:text-white
            "
          >
            Cancellation
          </span> -->

          <!-- <span
            class="w-auto  mb-1 tracking-wider text-center  cursor-pointer "
            >Whitehat</span
          >
          <span
            class="w-auto  mb-1 tracking-wider text-center  cursor-pointer "
            >Blog</span
          >
          <span
            class="w-auto  mb-1 tracking-wider text-center  cursor-pointer "
            >Careers</span
          > -->

          <!-- <nuxt-link
            v-if="store.domain === 'anne.biz'"
            to="/social-impact"
            class="
              w-auto
              
              mb-2
              text-center
              
              cursor-pointer
              
            "
          >
            Social Impact
          </nuxt-link> -->
        </div>

        <div v-if="popularSearches && popularSearches.length">
          <h1
            class="
              mb-4
              ps-1
              text-base
              sm:text-lg
              font-medium
              uppercase
              border-b border-gray-400
              max-w-max
              pb-2
            "
          >
            Popular searches
          </h1>

          <div class="flex flex-row flex-wrap mb-4 text-xs md:mt-2">
            <nuxt-link
              v-for="(s, ix) in popularSearches"
              :key="ix"
              :to="`/search/${s.text}`"
              class="
                w-auto
                mb-1
                tracking-wider
                text-center
                cursor-pointer
                hovereffect
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
            v-lazy="
              `${settings.CDN_URL}/img/footer/original.png?tr=w-48,h-48,fo-auto`
            "
            alt=" "
            class="me-4 object-contain w-8 h-8"
          />

          <h6 class="flex-1 text-xs">
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
            v-lazy="
              `${settings.CDN_URL}/img/footer/free.png?tr=w-48,h-48,fo-auto`
            "
            alt=" "
            class="me-4 object-contain w-8 h-8"
          />

          <h6 class="flex-1 text-xs">
            <strong>Get assured delivery</strong
            ><span class="font-light"> for every confirmed order</span>
          </h6>
        </div>

        <!-- <div class="flex flex-col my-8 md:flex-row">
          <img
            v-lazy="`/img/footer/return.png?tr=w-48,h-48,fo-auto`"
            alt=""
            class="object-contain w-8 h-8 lg:w-12 lg:h-12 p-1 my-auto bg-white rounded"
          />
          <span class="object-cover ps-4 my-auto lg:w-2/3">
            <strong class="font-light">Return within 30days </strong> of
            receiving your order</span
          >
        </div> -->
      </div>
    </div>

    <hr class="w-full mb-4 border-t border-gray-400" />

    <div
      class="flex flex-col sm:flex-row flex-wrap items-start justify-between"
    >
      <div class="mb-2">
        <div
          class="
            mb-5
            text-xs
            font-normal
            tracking-wider
            whitespace-nowrap
            max-w-max
          "
        >
          © {{ year }} {{ store.name }}

          <span v-if="store.websiteEmail" class="ms-2">
            {{ store.websiteEmail }}</span
          >
        </div>

        <div class="flex flex-row items-center space-x-4">
          <a
            v-if="store.facebook != null && store.facebook != ''"
            :href="store.facebook"
            target="blank"
          >
            <img
              v-lazy="`/img/social-media/facebook.png?tr=h-16,fo-auto`"
              alt="facebook"
              class="h-4 object-contain"
            />
          </a>

          <a
            v-if="store.twitter != null && store.twitter != ''"
            :href="store.twitter"
            target="blank"
          >
            <img
              v-lazy="`/img/social-media/twitter.png?tr=h-16,fo-auto`"
              alt=""
              class="h-4 object-contain"
            />
          </a>

          <a
            v-if="store.instagram != null && store.instagram != ''"
            :href="store.instagram"
            target="blank"
          >
            <img
              v-lazy="`/img/social-media/instagram.png?tr=h-16,fo-auto`"
              alt=""
              class="h-4 object-contain"
            />
          </a>

          <a
            v-if="store.linkedin != null && store.linkedin != ''"
            :href="store.linkedin"
            target="blank"
          >
            <img
              v-lazy="`/img/social-media/linkedin.png?tr=h-16,fo-auto`"
              alt=""
              class="h-4 object-contain"
            />
          </a>
        </div>
      </div>

      <div id="google_translate_element" class="mb-2"></div>

      <!-- <LanguageSwitch v-if="loadedTranslate" /> -->
      <!-- <div
        class="
          mb-2
          hidden
          lg:flex
          max-w-max
          flex-shrink-0 flex-row
          items-start
          text-xs
          space-x-5
        "
      >

        <div v-if="visitorCount">Visitors : {{ visitorCount }}</div>
      </div> -->

      <div class="flex flex-row items-center space-x-2 max-w-max">
        <div v-for="(i, ix) in icons" :key="ix" class="mb-2">
          <img
            v-lazy="`${settings.CDN_URL}/${i.img}?tr=w-36,h-36,fo-auto`"
            :alt="i.alt"
            class="h-9 object-contain"
          />
        </div>
      </div>
    </div>

    <!-- <div
      class="
        mb-2
        flex
        lg:hidden
        max-w-max
        flex-shrink-0 flex-row
        items-start
        text-xs
        space-x-5
      "
    >
      <div id="google_translate_element" class="lg:hidden"></div>

      <div v-if="visitorCount">Visitors : {{ visitorCount }}</div>
    </div> -->

    <client-only>
      <CookieConsent />
    </client-only>
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

      footerLink: [
        { link: '/contact-us', name: 'Contact Us' },
        { link: '/legal/about-us', name: 'About Us' },
        { link: '/faq', name: 'FAQ' },
        { link: '/legal/terms', name: 'Terms Of Use' },
        { link: '/legal/shipping-policy', name: 'Shipping Policy' },
        { link: '/my/orders', name: 'Track Order' },
        { link: '/how-it-works', name: 'How it works' },
        { link: '/legal/return-policy', name: 'Return Policy' },
        { link: '/legal/privacy-policy', name: 'Privacy policy' },
        { link: '/career', name: 'Career' },
        { link: '/contact-us', name: 'Disputes' },
        { link: '/my/orders', name: 'Contact Seller' },
        { link: '/features', name: 'Features' },
        { link: '/blog', name: 'Blog' },
      ],

      icons: [
        // { img: '/img/payment/rupay.svg', alt: 'rupay' },
        { img: '/img/payment/stripe.png', alt: 'stripe' },
        { img: '/img/payment/mastercard.png', alt: 'mastercard' },
        { img: '/img/payment/visa.png', alt: 'visa' },
        { img: '/img/payment/american-express.png', alt: 'american express' },
        { img: '/img/payment/paypal.svg', alt: 'paypal' },
        // { img: '/img/payment/bhim-upi.png', alt: 'upi' },
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

  async mounted() {
    await this.$store.dispatch('cart/fetch')
    const getGDPRPreference = localStorage.getItem('GDPR:preference')
    // console.log('getGDPRPreference...........', getGDPRPreference)
    if (
      typeof getGDPRPreference !== 'undefined' &&
      getGDPRPreference === 'true'
    ) {
      this.loadTranslate()
      const vm = this
      setTimeout(function () {
        vm.googleTranslateInit()
        // vm.updateVisitorCount()
      }, 3000)
    }
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

          vm.googleTranslateElementInit()
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

@media (min-width: 640px) {
  .hovereffect {
    position: relative;
  }

  .hovereffect::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: rgba(156, 163, 175, 1);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .hovereffect:hover::before {
    transform: scaleX(1);
  }
}
</style>
