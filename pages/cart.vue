<template>
  <section
    class="container mx-auto max-w-5xl px-2 sm:px-10 mb-10 text-gray-700"
  >
    <CheckoutHeader
      v-if="cart.items.length"
      selected="cart"
      class="py-5 sm:py-10"
    />

    <!-- <CartPageSkeleton v-if="loadingCart" class="mt-5" /> -->

    <div v-if="cart">
      <div
        v-if="cart.items != 0"
        class="flex flex-col lg:flex-row lg:space-x-5"
      >
        <div class="lg:w-2/3 lg:border-r lg:border-gray-200 lg:pe-5">
          <div class="flex items-baseline mb-3">
            <div class="text-2xl font-bold tracking-wide">Cart</div>

            <div
              class="
                w-1
                h-1
                flex-shrink-0 flex-grow-0
                mx-1.5
                bg-gray-400
                rounded-full
              "
            ></div>
            <div class="text-sm text-gray-400">
              {{ cart.items.length }} items
            </div>
          </div>

          <!-- <div class="flex flex-row justify-between w-full px-5">
                  <span class="w-3/4 bg-red-300">
                    </span>Product Name</span>
                  </span>
                  <div class="flex flex-row justify-between w-1/4 bg-red-400">
                    </span>Qantity</span>
                    </span>Price</span>
                  </div>
                </div> -->

          <CartItem v-for="(item, ix) in cart.items" :key="ix" :item="item" />

          <Weprovides />
        </div>

        <div class="lg:w-1/3">
          <PriceDetails
            :btnname="'Select Address'"
            :nextpage="'/checkout/address'"
          />
        </div>
      </div>

      <div v-else class="mt-32 lg:mt-20">
        <EmptyCart />
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
// import CartPageSkeleton from '~/components/AllSkeletons/CartPageSkeleton'
import CartItem from '~/components/Cart/CartItem.vue'
import Weprovides from '~/components/Weprovides.vue'
import PriceDetails from '~/components/Cart/PriceDetails.vue'
import EmptyCart from '~/components/Cart/EmptyCart.vue'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')

export default {
  components: {
    CheckoutHeader,
    // CartPageSkeleton,
    CartItem,
    Weprovides,
    PriceDetails,
    EmptyCart,
  },
  asyncData({ params, app, store }) {
    const { title, keywords, description, favicon, logoMobile } =
      store.state.store || {} // err = null
    return { title, keywords, description, favicon, logoMobile }
  },
  data() {
    return {
      // loadingCart: false,
      isOpen: false,
    }
  },
  head() {
    return {
      title: 'Cart',
    }
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
    }),
  },
  created() {
    this.$store.dispatch('cart/fetch')
  },
}
</script>
