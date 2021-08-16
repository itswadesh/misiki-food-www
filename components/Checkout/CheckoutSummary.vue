<template>
  <section class="flex flex-col">
    <div v-if="cart">
      <div class="text-sm sm:text-base">
        <div class="flex justify-between mb-2">
          <span>Items Subtotal</span>
          <span>{{
            cart.subtotal | currency(settings.currencySymbol, 2)
          }}</span>
        </div>

        <div class="flex justify-between mb-2">
          <span>Total Item</span>
          <span>{{ cart.qty }}</span>
        </div>

        <div
          v-if="cart.discount && cart.discount.amount > 0"
          class="flex justify-between mb-2"
        >
          <span>Applied Coupon</span>
          <span class="text-primary-500">
            {{ cart.discount.code }}
          </span>
          <button @click="removeCoupon">Remove</button>
        </div>

        <div
          v-if="cart.discount && cart.discount.amount > 0"
          class="flex justify-between mb-2"
        >
          <span>Your Savings</span>
          <span class="text-secondary-500">
            -{{ cart.discount.amount | currency(settings.currencySymbol, 2) }}
          </span>
        </div>

        <div v-if="cart.shipping" class="flex justify-between mb-2">
          <nuxt-link
            to="/delivery-charges"
            class="flex items-center hover:text-primary-500"
          >
            <h6 class="me-1">Delivery Charges</h6>

            <h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </h6>
          </nuxt-link>

          <span v-if="cart.shipping.charge > 0">
            {{ cart.shipping.charge | currency(settings.currencySymbol, 2) }}
          </span>
          <span v-else> FREE </span>
        </div>
      </div>

      <div class="mb-2">
        <button
          class="flex flex-row focus:outline-none"
          @click="showOffers = !showOffers"
        >
          <span
            class="
              text-sm
              font-medium
              cursor-pointer
              text-primary-500
              hover:text-primary-700
            "
          >
            See Available Offer
          </span>
        </button>

        <span v-if="showOffers">
          <TestCoupons
            :class="showOffers ? 'open' : 'close'"
            @hide="hideOffers"
          />
        </span>
      </div>

      <hr class="border-t border-gray-200 my-2" />

      <div class="mt-4 flex justify-between text-base sm:text-lg sm:pb-5">
        <b>Total Amount</b>
        <b> {{ cart.total | currency(settings.currencySymbol, 2) }}</b>
      </div>

      <div class="fixed bottom-0 inset-x-0 w-full sm:static">
        <GrnIndGradiantButton
          class="w-full"
          :loading="loading"
          @click=";[$emit('submit'), (loading = true)]"
        >
          Proceed
        </GrnIndGradiantButton>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TestCoupons from '~/components/Cart/TestCoupons.vue'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'

export default {
  components: { TestCoupons, GrnIndGradiantButton },
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
