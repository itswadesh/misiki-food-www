<template>
  <transition name="fade">
    <div class="fixed z-50 inset-0 overflow-y-auto frosted">
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
            transition-all
            transform
            bg-white
            rounded-t-lg
            sm:rounded-b-lg
            shadow-xl
            text-start
            sm:my-8
            overflow-hidden
            align-bottom
            sm:align-middle
            w-full
            sm:max-w-lg
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div v-if="coupons" class="bg-white text-sm text-gray-800">
            <div
              class="
                flex flex-row
                font-semibold
                items-center
                justify-between
                p-3
                sm:px-5
                border-b
              "
            >
              <h6>APPLY COUPON</h6>

              <button
                type="button"
                class="
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  rounded-md
                  bg-transparent
                  hover:bg-gray-300
                  transition
                  duration-300
                  group
                  focus:outline-none
                "
                @click="hide(null)"
              >
                <svg
                  class="
                    w-6
                    h-6
                    text-gray-500
                    group-hover:text-gray-800
                    transition
                    duration-300
                  "
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
                items-center
                justify-between
                space-x-3
                sm:space-x-5
                p-3
                sm:p-5
                mb-5
              "
              @submit.stop.prevent="applyOffer(coupon_code)"
            >
              <input
                v-model="coupon_code"
                type="text"
                placeholder="Enter coupon Code"
                class="
                  py-2
                  px-4
                  w-full
                  my-auto
                  text-sm
                  rounded-md
                  border-gray-300
                  ring-primary-600
                  focus:ring-primary-600
                "
              />

              <button
                type="submit"
                class="
                  py-2
                  px-6
                  bg-transparent
                  hover:bg-primary-500
                  transition
                  duration-300
                  text-sm
                  hover:text-white
                  font-semibold
                  tracking-wide
                  rounded-md
                  hover:shadow-md
                  focus:outline-none
                "
              >
                Apply
              </button>
            </form>

            <div class="h-56 p-3 sm:p-5 overflow-y-auto">
              <div v-for="c in coupons.data" :key="c.id">
                <label class="flex flex-row mb-3 bg-accent-100">
                  <Radio v-model="coupon_code" :value="c.code" />
                  <div class="flex flex-col ms-2">
                    <div
                      class="
                        w-1/3
                        p-1
                        text-center
                        bg-white
                        text-primary-500
                        hover:shadow-lg
                      "
                    >
                      {{ c.code }}
                    </div>
                    <div class="mt-3 text-xs font-medium text-gray-700">
                      Save up to
                      {{
                        c.maxAmount
                          | currency(
                            store.currencySymbol,
                            store.currencyDecimals
                          )
                      }}
                    </div>
                    <div class="mt-3 text-xs font-medium text-gray-700">
                      {{ c.text }} on minimum purchase of
                      {{
                        c.minimumCartValue
                          | currency(
                            store.currencySymbol,
                            store.currencyDecimals
                          )
                      }}
                      | Expires on {{ c.validToDate | date }}
                      {{ c.terms }}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <form
              novalidate
              autocomplete="off"
              class="flex flex-col justify-between md:flex-row p-3 sm:p-5"
              @submit.stop.prevent="applyOffer(coupon_code)"
            >
              <div class="my-auto text-sm text-gray-500">
                <!-- Minimum saving {{ 125 | currency(store.currencySymbol,2) }} -->
              </div>

              <PrimaryButtonRounded
                type="submit"
                :disabled="disabled"
                class="w-2/3 mx-auto"
              >
                <div v-if="saving" class="flex items-center justify-center">
                  <svg
                    class="h-5 w-5 text-white animate-spin"
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

                  <span class="mx-2 text">Applying...</span>
                </div>

                <span v-else>APPLY</span>
              </PrimaryButtonRounded>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import COUPONS from '~/gql/cart/coupons.gql'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import { Radio } from '~/shared/components/ui'

export default {
  components: {
    PrimaryButtonRounded,
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
      store: 'store',
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
.frosted {
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
