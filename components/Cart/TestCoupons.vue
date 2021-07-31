<template>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:min-h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          overflow-hidden
          align-bottom
          transition-all
          transform
          bg-white
          rounded-lg
          shadow-xl
          text-start
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div v-if="coupons" class="bg-white">
          <div
            class="
              flex flex-row
              justify-between
              p-4
              text-lg text-gray-500
              border-b
            "
          >
            <div v-if="coupons.count > 0">
              Apply Coupon ({{ coupons.count }})
            </div>
            <div v-else class="text-accent-900">No Coupon Are Available !!</div>
            <button
              type="button"
              class="focus:outline-none"
              @click="hide(null)"
            >
              <svg
                class="w-6 h-6 text-gray-500 hover:text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
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
          </div>
          <form
            novalidate
            autocomplete="off"
            class="
              relative
              flex flex-row
              justify-between
              m-3
              border-none
              rounded
            "
            @submit.stop.prevent="applyOffer(coupon_code)"
          >
            <input
              v-model="coupon_code"
              type="text"
              placeholder="Enter coupon Code"
              class="
                w-full
                my-auto
                border-0
                rounded
                ring-yellow-600
                focus:ring-yellow-600 focus:ring-2
                ring-1
              "
            />
            <button
              type="submit"
              class="
                right-0
                p-2
                my-auto
                uppercase
                pe-3
                text-secondary-200
                hover:text-secondary-400
                focus:outline-none
              "
            >
              Apply
            </button>
          </form>
          <div class="h-56 overflow-y-auto">
            <div v-for="c in coupons.data" :key="c.id" class="mt-2">
              <div class="">
                <label class="flex flex-row p-4 pt-5 bg-accent-100">
                  <Radio v-model="coupon_code" :value="c.code" />
                  <div class="flex flex-col ms-2">
                    <div
                      class="
                        w-1/3
                        p-1
                        text-center
                        bg-white
                        dashes
                        text-primary-500
                        hover:shadow-lg
                      "
                    >
                      {{ c.code }}
                    </div>
                    <div class="mt-3 text-xs font-medium text-gray-700">
                      Save up to
                      {{ c.maxAmount | currency(settings.currencySymbol, 2) }}
                    </div>
                    <div class="mt-3 text-xs font-medium text-gray-700">
                      {{ c.text }} on minimum purchase of
                      {{
                        c.minimumCartValue
                          | currency(settings.currencySymbol, 2)
                      }}
                      | Expires on {{ c.validToDate | date }}
                      {{ c.terms }}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <form
            novalidate
            autocomplete="off"
            class="flex flex-col justify-between p-4 md:flex-row"
            @submit.stop.prevent="applyOffer(coupon_code)"
          >
            <div class="my-auto text-sm text-gray-500">
              <!-- Minimum saving {{ 125 | currency(settings.currencySymbol,2) }} -->
            </div>
            <button
              :disabled="disabled"
              type="submit"
              class="
                p-2
                px-4
                text-black
                bg-secondary-400
                border
                rounded
                shadow
                focus:outline-none
                hover:-translate-y-0.5
                transition
                transform
                ease-in-out
                hover:opacity-80
                focus:ring-inset-0 focus:ring-secondary-400 focus:ring-2
              "
            >
              <div v-if="saving" class="flex items-center justify-center">
                <svg
                  style="height: 20px; width: 20px"
                  class="text-black -ms-1 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <!-- <span v-if="text" class="mx-2">add</span> -->
                <span class="mx-2 text">Applying...</span>
              </div>

              <span v-else> Apply Coupon</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import COUPONS from '~/gql/cart/coupons.gql'

import { Radio } from '~/shared/components/ui'

export default {
  components: {
    Radio,
  },
  data() {
    return {
      coupon_code: null,
      coupons: null,
      loading: false,
      disabled: false,
      saving: false,
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
  created() {
    this.getCoupons()
  },

  methods: {
    ...mapActions({ applyCoupon: 'cart/applyCoupon' }),
    async applyOffer(code) {
      try {
        this.disabled = true
        this.saving = true
        await this.applyCoupon({ code })
        this.$emit('hide')
      } catch (e) {
      } finally {
        this.saving = false
        this.disabled = false
      }
    },
    async getCoupons() {
      try {
        this.loading = true
        this.coupons = (
          await this.$apollo.query({
            query: COUPONS,
            fetchPolicy: 'no-cache',
          })
        ).data.coupons
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    hide(e) {
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hide', true)
    },
  },
}
</script>
<style scoped>
.dashes {
  border: dashed 1px;
}
</style>
