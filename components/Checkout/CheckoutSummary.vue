<template>
  <section class="flex flex-col">
    <div v-if="cart">
      <div class="text-sm">
        <div class="flex items-center justify-between mb-2">
          <span>Items Subtotal</span>

          <span>{{
            cart.subtotal
              | currency(store.currencySymbol, store.currencyDecimals)
          }}</span>
        </div>

        <div class="flex items-center justify-between mb-2">
          <span>Total Item</span>

          <span>{{ cart.qty }}</span>
        </div>

        <div
          v-if="cart.discount && cart.discount.amount > 0"
          class="flex items-center justify-between mb-2"
        >
          <span>Applied Coupon</span>

          <span class="text-primary-500">
            {{ cart.discount.code }}
          </span>

          <button @click="removeCoupon">Remove</button>
        </div>

        <div
          v-if="cart.discount && cart.discount.amount > 0"
          class="flex items-center justify-between mb-2"
        >
          <span>Your Savings</span>

          <span class="text-secondary-500">
            -{{
              cart.discount.amount
                | currency(store.currencySymbol, store.currencyDecimals)
            }}
          </span>
        </div>

        <div
          v-if="cart.shipping"
          class="flex items-center justify-between mb-2"
        >
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
            {{
              cart.shipping.charge
                | currency(store.currencySymbol, store.currencyDecimals)
            }}
          </span>

          <span v-else> FREE </span>
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
      </div>

      <hr class="border-t border-gray-200 my-3" />

      <div class="flex justify-between text-base sm:pb-5">
        <b>Total Amount</b>

        <b>
          {{
            cart.total | currency(store.currencySymbol, store.currencyDecimals)
          }}
        </b>
      </div>

      <div class="fixed bottom-0 inset-x-0 w-full sm:static">
        <PrimaryButton
          :loading="loading"
          :disabled="disabled"
          class="w-full"
          @click="$emit('submit')"
        >
          <slot />
        </PrimaryButton>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TestCoupons from '~/components/Cart/TestCoupons.vue'
import PrimaryButton from '~/components/ui/PrimaryButton.vue'

export default {
  components: { TestCoupons, PrimaryButton },

  props: {
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    selectedAddress: { type: Object, default: null },
  },

  data() {
    return {
      showOffers: false,
      hide: false,
      proceedLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      store: 'store',
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
