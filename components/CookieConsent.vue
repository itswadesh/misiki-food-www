<template>
  <div>
    <CleanModal v-if="showCookieConsent" title="Allow Cookies">
      <!-- Real Data section start  -->

      <div class="p-5 sm:p-10 max-w-2xl bg-blue-900 text-white">
        <div class="text-center">
          <h1 class="mb-2.5 sm:mb-10 text-xl font-medium tracking-wide">
            Cookie settings
          </h1>

          <p class="mb-2.5 sm:mb-5 text-sm font-light leading-relaxed">
            When you visit e-resident.gov.ee, e-Residency and our partners use
            cookies and other methods to process your personal data in order to
            customize content and your site experience, provide social media
            features, analyze our traffic, and personalize advertising on both
            our family of websites and our partners' platforms.
          </p>

          <p class="mb-2.5 sm:mb-5 text-sm font-light leading-relaxed">
            You may use the below interface to accept (or reject) specific
            categories of data processing, and to see some of the vendors
            undertaking those categories of data processing. You can click here
            for a complete list of e-Residency’s data processing partners, and
            the categories of processing undertaken by each. Please note that
            withholding consent for processing may reduce or remove some
            functionality of our website.
          </p>

          <p class="mb-2.5 sm:mb-5 text-sm font-light leading-relaxed">
            For more information on how we process your personal data - or to
            update your preferences, personal data at any time - please visit
            our Privacy Policy. You can review or update these preferences at
            any time by following the link from that page.
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
            color="blue"
            class="hidden sm:block"
            @click="allowNecessaryCookies"
          />

          <ToggleSwitchWhite
            color="blue"
            size="sm"
            class="sm:hidden"
            @click="allowNecessaryCookies"
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
            color="blue"
            class="hidden sm:block"
            @click="allowPreferencesCookies"
          />

          <ToggleSwitchWhite
            color="blue"
            size="sm"
            class="sm:hidden"
            @click="allowPreferencesCookies"
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
            color="blue"
            class="hidden sm:block"
            @click="allowAnalyticsCookies"
          />

          <ToggleSwitchWhite
            color="blue"
            size="sm"
            class="sm:hidden"
            @click="allowAnalyticsCookies"
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
            <h6 class="mb-1 font-medium tracking-wide">Marketing cookies</h6>

            <p class="text-sm font-light leading-relaxed">
              These cookies do things like tell us if you’ve seen our adverts on
              social media, such as Facebook or Twitter
            </p>
          </div>

          <ToggleSwitchWhite
            color="blue"
            class="hidden sm:block"
            @click="allowMarketingCookies"
          />

          <ToggleSwitchWhite
            color="blue"
            size="sm"
            class="sm:hidden"
            @click="allowMarketingCookies"
          />
        </div>

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
              hover:bg-white hover:text-blue-900
              transition
              duration-300
              focus:outline-none
            "
          >
            SAVE MY SETTINGS
          </button>
        </div>
      </div>

      <!-- Real Data section end -->
    </CleanModal>
  </div>
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
      show: false,
    }
  },
}
</script>

<style scoped></style>
