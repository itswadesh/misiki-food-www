<template>
  <section class="flex flex-col">
    <div class="text-lg font-bold tracking-wide mb-3">Cart Summary</div>

    <hr class="border-t border-gray-200 mb-3" />

    <div v-if="cart">
      <div class="text-sm">
        <div class="flex justify-between mb-2">
          <span>Items Subtotal</span>
          <span>
            {{
              cart.subtotal
                | currency(store.currencySymbol, store.currencyDecimals)
            }}
          </span>
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
          <button
            class="focus:outline-none focus:ring-0 focus:ring-offset-0"
            @click="removeCoupon"
          >
            Remove
          </button>
        </div>

        <div
          v-if="cart.discount && cart.discount.amount > 0"
          class="flex justify-between mb-2"
        >
          <span>Your Savings</span>
          <span class="text-secondary-500">
            -{{
              cart.discount.amount
                | currency(store.currencySymbol, store.currencyDecimals)
            }}
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
            {{
              cart.shipping.charge
                | currency(store.currencySymbol, store.currencyDecimals)
            }}
          </span>
          <span v-else> FREE </span>
        </div>
      </div>

      <button
        class="
          focus:outline-none focus:ring-0 focus:ring-offset-0
          text-sm
          font-medium
          cursor-pointer
          text-primary-500
          hover:text-primary-700
        "
        @click="showOffers = true"
      >
        See Available Offer
      </button>

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
        <nuxt-link v-if="nextpage" :to="nextpage">
          <PrimaryButton
            class="w-full"
            :loading="loading"
            @click="loading = true"
          >
            {{ btnname }}</PrimaryButton
          >
        </nuxt-link>
      </div>
    </div>

    <TestCoupons :show="showOffers" @hide="hideOffers" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import PrimaryButton from '~/components/ui/PrimaryButton.vue'
import TestCoupons from '~/components/Cart/TestCoupons.vue'
import NuxtLink from '~/components/NuxtLink.vue'
// import CART from "~/gql/cart/cart.gql"

export default {
  components: { TestCoupons, PrimaryButton, NuxtLink },

  props: {
    selectedAddress: { type: String, default: null },
    details: {
      type: Array,
      default: null,
    },
    btnname: {
      type: String,
      default: null,
    },
    nextpage: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      showOffers: false,
      hide: false,
      show: true,
      loading: false,
    }
  },

  // async created(){
  //   await this.getCart()
  // },

  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
      store: 'store',
    }),
  },

  methods: {
    proceed() {
      if (!this.selectedAddress) {
        this.$router.push(`/checkout/add`)
        return
      }
      this.$router.push(
        `/checkout/payment-options?address=${this.selectedAddress}`
      )
    },

    hideOffers() {
      // console.log("hide offers")
      this.showOffers = false
    },
  },
}
</script>

<style scoped></style>
