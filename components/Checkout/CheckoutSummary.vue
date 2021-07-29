<template>
  <div class="flex flex-col bg-white sm:p-1">
    <div class="p-3 my-auto text-lg font-medium text-center text-gray-600">
      PRICE DETAILS
    </div>
    <div v-if="cart">
      <div>
        <button
          type="button"
          class="flex flex-row focus:outline-none"
          @click="showOffers = !showOffers"
        >
          <span
            class="
              flex-shrink-0
              text-sm
              font-medium
              cursor-pointer
              ms-3
              text-secondary-200
              hover:text-secondary-400
            "
          >
            See Available Offer
          </span>
        </button>
        <div v-if="showOffers">
          <TestCoupons
            :class="showOffers ? 'open' : 'close'"
            @hide="hideOffers"
          />
        </div>
      </div>

      <div
        class="
          container
          flex flex-row
          justify-between
          flex-shrink-0
          p-2
          px-3
          mx-auto
          text-base
        "
      >
        <span>Items Subtotal</span>
        <span>{{ cart.subtotal | currency(settings.currencySymbol, 2) }}</span>
      </div>

      <div
        class="
          container
          flex flex-row
          justify-between
          flex-shrink-0
          p-2
          px-3
          mx-auto
          text-base
        "
      >
        <span>Total Item</span>
        <span>{{ cart.qty }}</span>
      </div>

      <div
        v-if="cart.discount.amount > 0"
        class="
          container
          flex flex-row
          justify-between
          p-2
          px-3
          mx-auto
          text-base
        "
      >
        <span>Your Savings</span>
        <span class="text-accent-900">
          -{{ cart.discount.amount | currency(settings.currencySymbol, 2) }}
        </span>
      </div>

      <div
        v-if="cart.shipping"
        class="
          container
          flex flex-row
          justify-between
          p-2
          px-3
          mx-auto
          text-base
        "
      >
        <span>Delivery Charge</span>
        <span v-if="cart.shipping.charge > 0">
          {{ cart.shipping.charge | currency(settings.currencySymbol, 2) }}
        </span>
        <span v-else> FREE </span>
      </div>

      <div
        class="
          container
          flex flex-row
          justify-between
          p-2
          px-3
          mx-auto
          mb-16
          text-base
          font-semibold
          text-gray-600
          sm:mb-0
        "
      >
        <span class="text-xl">Total Amount</span>
        <span class="text-xl">
          {{ cart.total | currency(settings.currencySymbol, 2) }}
        </span>
      </div>

      <div class="fixed bottom-0 w-full mt-4 sm:mt-0 sm:relative sm:px-3">
        <Button
          :disabled="loading"
          :class="loading ? 'bg-gray-400' : 'bg-primary-500'"
          class="p-3 bg-primary-500 focus:ring-primary-500"
          @click="$emit('submit')"
        >
          <div v-if="loading" class="flex justify-center">
            <svg
              class="w-5 h-5 text-white -ms-1 animate-spin"
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
          </div>
          <slot v-else />
        </Button>

        <!-- <button
          :disabled="loading"
          @click="$emit('submit')"
          class="flex items-center justify-center w-full p-3 sm:my-4 text-white duration-200 
          hover:-translate-y-0.5 transition transform ease-in-out sm:rounded focus:ring-opacity-50 
          focus:ring focus:ring-offset-2 focus:ring-yellow-600 focus:outline-none"
          :class="loading ? 'bg-gray-400' : 'bg-primary-500'"
        >
          <div class="w-full font-semibold tracking-widest uppercase">
            <div v-if="loading" class="flex justify-center">
              <svg
                class="w-5 h-5 text-white -ms-1 animate-spin"
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
            </div>
            <slot v-else />
          </div>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TestCoupons from '~/components/Cart/TestCoupons.vue'
import { Button } from '~/shared/components/ui'

export default {
  components: { TestCoupons, Button },
  props: {
    loading: { type: Boolean },
    selectedAddress: { type: String, default: null },
  },
  data() {
    return {
      showOffers: false,
      hide: false,
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      cart: 'cart/cart',
    }),
  },
  methods: {
    hideOffers() {
      this.showOffers = false
    },
  },
}
</script>

<style scoped>
.close {
  /* left: -100%; */
  transition: 0.3s all;
}
.open {
  /* left: 0; */
  transition: 0.3s all;
}
</style>
