<template>
  <section>
    <div
      v-if="showCookieConsent"
      class="
        fixed
        bottom-5
        left-5
        sm:bottom-10 sm:left-10
        mr-5
        sm:mr-10
        p-5
        sm:p-10
        max-w-2xl
        bg-gray-900
        rounded-xl
        shadow-xl
        text-white text-center
      "
    >
      <p class="mb-2.5 sm:mb-5 text-sm font-light leading-relaxed">
        This website needs some cookies and similar means to function. If you
        permit us, we will use those means to collect data on your visits for
        aggregated statistics to improve our service. Moreover, we use YouTube
        for showing videos, which will use cookies and similar means only if you
        decide to watch them.
      </p>

      <div class="flex flex-wrap items-center justify-center">
        <button class="button" @click="showCookieSetting = true">
          CHANGE COOKIE SETTING
        </button>
        <button class="button" @click="allowAllCookies">
          ACCEPT ALL COOKIES
        </button>
      </div>
    </div>

    <CleanModal :show="showCookieSetting" title="Allow Cookies">
      <!-- Real Data section start  -->

      <div
        class="
          p-5
          sm:p-10
          max-w-2xl
          bg-gray-900
          text-white
          max-height
          overflow-y-auto
        "
      >
        <div class="text-center">
          <h1 class="mb-2.5 sm:mb-10 text-xl font-medium tracking-wide">
            Cookie settings
          </h1>

          <p class="mb-2.5 sm:mb-5 text-sm font-light leading-relaxed">
            When you visit anne.biz, Anne and our partners use cookies and other
            methods to process your personal data in order to customize content
            and your site experience, provide social media features, analyze our
            traffic, and personalize advertising on both our family of websites
            and our partners' platforms.
          </p>

          <p class="mb-2.5 sm:mb-5 text-sm font-light leading-relaxed">
            You may use the below interface to accept (or reject) specific
            categories of data processing, and to see some of the vendors
            undertaking those categories of data processing. You can click here
            for a complete list of Anne’s data processing partners, and the
            categories of processing undertaken by each. Please note that
            withholding consent for processing may reduce or remove some
            functionality of our website.
          </p>

          <p class="mb-2.5 sm:mb-5 text-sm font-light leading-relaxed">
            For more information on how we process your personal data - or to
            update your preferences, personal data at any time - please visit
            our
            <nuxt-link to="/legal/privacy-policy">Privacy Policy</nuxt-link>.
            You can review or update these preferences at any time by following
            the link from that page.
          </p>
        </div>

        <hr class="mb-2.5 sm:mb-5 border-t border-white w-full" />

        <div class="flex items-start justify-between space-x-5 sm:space-x-10">
          <div class="mb-2.5 sm:mb-5">
            <div class="flex items-center space-x-2">
              <h6 class="mb-1 font-medium tracking-wide">Necessary cookies</h6>

              <Tooltip
                data="Necessary cookies connot be turned off as they are needed for the site to function"
                :tipposition="'top'"
              />
            </div>

            <p class="text-sm font-light leading-relaxed">
              These cookies do things like remember pop-ups you’ve seen so
              you’re not shown them again.
            </p>
          </div>

          <ToggleSwitchWhite
            v-model="necessaryCookies"
            docheck
            color="gray"
            class="hidden sm:block"
          />

          <ToggleSwitchWhite
            v-model="necessaryCookies"
            docheck
            color="gray"
            size="sm"
            class="sm:hidden"
          />
        </div>

        <hr class="mb-2.5 sm:mb-5 border-t border-white w-full" />

        <div
          class="
            mb-2.5
            sm:mb-5
            flex
            items-start
            justify-between
            space-x-5
            sm:space-x-10
          "
        >
          <div>
            <h6 class="mb-1 font-medium tracking-wide">Preferences cookies</h6>

            <p class="text-sm font-light leading-relaxed">
              These cookies store information that changes the way the website
              behaves or looks, like your preferred language or the region that
              you are in.
            </p>
          </div>

          <ToggleSwitchWhite
            v-model="preferencesCookies"
            color="gray"
            class="hidden sm:block"
          />

          <ToggleSwitchWhite
            v-model="preferencesCookies"
            color="gray"
            size="sm"
            class="sm:hidden"
          />
        </div>

        <hr class="mb-2.5 sm:mb-5 border-t border-white w-full" />

        <div
          class="
            mb-2.5
            sm:mb-5
            flex
            items-start
            justify-between
            space-x-5
            sm:space-x-10
          "
        >
          <div>
            <h6 class="mb-1 font-medium tracking-wide">Analytics cookies</h6>

            <p class="text-sm font-light leading-relaxed">
              These cookies store information about how you use our website,
              such as what you click on.
            </p>
          </div>

          <ToggleSwitchWhite
            v-model="analyticsCookies"
            color="gray"
            class="hidden sm:block"
          />

          <ToggleSwitchWhite
            v-model="analyticsCookies"
            color="gray"
            size="sm"
            class="sm:hidden"
          />
        </div>

        <!-- <hr class="mb-2.5 sm:mb-5 border-t border-white w-full" />

        <div
          class="
            mb-2.5
            sm:mb-5
            flex
            items-start
            justify-between
            space-x-5
            sm:space-x-10
          "
        >
          <div>
            <h6 class="mb-1 font-medium tracking-wide">Marketing cookies</h6>

            <p class="text-sm font-light leading-relaxed">
              These cookies do things like tell us if you’ve seen our adverts on
              social media, such as Facebook or Twitter
            </p>
          </div>

          <ToggleSwitchWhite
            color="gray"
            class="hidden sm:block"
            v-model="marketingCookies"
          />

          <ToggleSwitchWhite
            color="gray"
            size="sm"
            class="sm:hidden"
            v-model="marketingCookies"
          />
        </div> -->

        <hr class="mb-2.5 sm:mb-5 border-t border-white w-full" />

        <div class="flex justify-center">
          <button
            class="
              border-2 border-white
              rounded-full
              py-2
              px-8
              font-semibold
              tracking-wide
              text-white
              hover:bg-white hover:text-gray-900
              transition
              duration-300
              focus:outline-none
            "
            @click="saveCookieConsent"
          >
            SAVE MY SETTINGS
          </button>
        </div>
      </div>

      <!-- Real Data section end -->
    </CleanModal>
  </section>
</template>

<script>
import CleanModal from '~/shared/components/ui/CleanModal.vue'
import ToggleSwitchWhite from '~/shared/components/ui/ToggleSwitchWhite.vue'
import Tooltip from '~/components/ui/Tooltip'

export default {
  components: {
    CleanModal,
    ToggleSwitchWhite,
    Tooltip,
  },

  data() {
    return {
      showCookieConsent: false,
      showCookieSetting: false,
      marketingCookies: false,
      necessaryCookies: true,
      preferencesCookies: false,
      analyticsCookies: false,
    }
  },

  mounted() {
    const vm = this
    setTimeout(function () {
      vm.checkCookieConsent()
    }, 3000)
  },

  methods: {
    saveCookieConsent() {
      this.allowCookies()
    },
    allowCookies() {
      // this.$cookies.set('cookieConsent', true, { path: '/' })
      localStorage.setItem('GDPR:preference', this.preferencesCookies)
      localStorage.setItem('GDPR:analytics', this.analyticsCookies)
      localStorage.setItem('GDPR:marketing', this.marketingCookies)
      this.showCookieConsent = false
      this.showCookieSetting = false
    },
    allowAllCookies() {
      localStorage.setItem('GDPR:preference', true)
      localStorage.setItem('GDPR:analytics', true)
      localStorage.setItem('GDPR:marketing', true)
      this.showCookieConsent = false
      this.showCookieSetting = false
    },
    checkCookieConsent() {
      // const cookieConsentContent = this.$cookies.get('cookieConsent')
      const cookieConsentContent = localStorage.getItem('GDPR:preference')
      if (
        !cookieConsentContent &&
        this.$store.state.store &&
        this.$store.state.store.gdprCookieConsent
      )
        this.showCookieConsent = true
    },
  },
}
</script>

<style scoped>
.button {
  @apply m-2.5 font-semibold py-2 px-8  border-2 border-white rounded-full bg-transparent hover:bg-white text-sm sm:text-base text-white hover:text-gray-900 transition duration-300 focus:outline-none tracking-wide;
}
.max-height {
  max-height: 85vh;
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
