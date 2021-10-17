<template>
  <div>
    <CheckoutHeader />
    <div class="flex flex-wrap justify-between">
      <div class="lg:w-16 xs:w-0"></div>
      <div class="px-2 mt-10 xs:w-full lg:w-2/4">
        <!-- <Offers /> -->
        <div
          class="
            flex flex-wrap
            w-full
            p-3
            mt-3
            text-lg
            font-bold
            text-gray-700
            bg-white
          "
        >
          <div class="w-1/2 text-start">
            My Shopping Bag ({{ cart.qty }} Items)
          </div>
          <div class="w-1/2 text-end">
            Total
            {{
              cart.total
                | currency(store.currencySymbol, store.currencyDecimals)
            }}
          </div>
        </div>
        <CartItem v-for="item in cart.items" :key="item._id" :item="item" />
        <div class="hidden lg:block">
          <nuxt-link
            :to="localePath('wishlist')"
            class="flex flex-wrap w-full p-4 mt-6 mb-6 shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mt-1 me-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            Add More From Wishlist
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mt-1 ms-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </nuxt-link>
        </div>
      </div>
      <div class="border-r border-gray-300"></div>
      <CartSummary :cart="cart">
        <button
          class="
            w-full
            p-3
            mt-3
            text-sm
            font-semibold
            tracking-widest
            text-white
            rounded
            bg-accent-900
            focus:outline-none focus:ring-0 focus:ring-offset-0
          "
          @click="placeOrder()"
        >
          CONFIRM ORDER
        </button>
      </CartSummary>

      <div class="w-8"></div>
    </div>
    <CheckoutFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
const CartItem = () => import('~/components/Cart/CartItem')
// const Offers = () => import('~/components/Cart/Offers')
const CartSummary = () => import('~/components/Cart/CartSummary')
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader')
const CheckoutFooter = () => import('~/components/Checkout/CheckoutFooter')

export default {
  components: {
    CartItem,
    // Offers,
    CartSummary,
    CheckoutHeader,
    CheckoutFooter,
    NuxtLink,
  },
  head() {
    return {
      title: 'Payment',
    }
  },
  computed: {
    ...mapGetters({
      store: 'store',
      user: 'auth/user',
      cart: 'cart/cart',
      checkCart: 'cart/checkCart',
      showCart: 'cart/showCart',
    }),
  },
  methods: {
    placeOrder() {},
  },
}
</script>

<style scoped>
.hr-line {
  border-bottom: 1px solid lightgray;
}
.fa-truck {
  transform: scaleX(-1);
}
.bb {
  border-bottom: 1px dashed lightgray;
}
.fa-truck,
.fa-undo,
.fa-shield {
  font-size: 1.5rem;
}
</style>
