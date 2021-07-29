<template>
  <div class="flex flex-col sm:p-1">
    <div class="p-3 my-auto text-lg font-medium text-center text-gray-600">
      PRICE DETAILS
    </div>
    <div v-if="cart">
      <div>
        <button
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
          <!-- <span class="flex-shrink-0 mx-auto text-white bg-green-700 rounded-full pl">i</span>-->
        </button>
        <span v-if="showOffers">
          <TestCoupons
            :class="showOffers ? 'open' : 'close'"
            @hide="hideOffers"
          />
        </span>
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
          font-light
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
          font-light
        "
      >
        <span>Total Item</span>
        <span>{{ cart.qty }}</span>
      </div>
      <div
        v-if="cart.discount && cart.discount.amount > 0"
        class="
          container
          flex flex-row
          justify-between
          p-2
          px-3
          mx-auto
          text-base
          font-light
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
          font-light
        "
      >
        <nuxt-link
          to="/delivery-charges"
          class="
            flex
            font-light
            hover:font-medium
            text-gray-600
            hover:text-primary-500
            cursor-pointer
          "
        >
          <h6>Delivery Charges</h6>
          <h6 class="ms-1 my-auto">
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
        <span>{{
          cart.shipping.charge | currency(settings.currencySymbol, 2)
        }}</span>
      </div>

      <div
        class="
          container
          flex flex-row
          justify-between
          p-2
          px-3
          mx-auto
          text-base
          font-semibold
          text-gray-600
        "
      >
        <span class="text-xl">Total Amount</span>
        <!-- class="text-secondary-400" -->
        <span class="text-xl">
          {{ cart.total | currency(settings.currencySymbol, 2) }}
        </span>
      </div>
      <div class="fixed bottom-0 w-full sm:relative">
        <nuxt-link v-if="nextpage" :to="nextpage">
          <div class="flex items-center justify-center w-full sm:px-3">
            <Button
              class="
                p-3
                text-white
                sm:my-4
                focus:ring-primary-500
                bg-primary-500
              "
            >
              {{ btnname }}
            </Button>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Button } from '~/shared/components/ui'
import TestCoupons from '~/components/Cart/TestCoupons.vue'

// import CART from "~/gql/cart/cart.gql"
export default {
  components: { TestCoupons, Button },
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
    }
  },

  // async created(){
  //   await this.getCart()
  // },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
      settings: 'settings',
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
