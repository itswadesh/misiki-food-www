<template>
  <div class="container mx-auto mb-14 sm:mb-36">
    <div class="sm:mx-2">
      <div>
        <CheckoutHeader v-if="cart.items.length" selected="cart" />
        <!-- <CartPageSkeleton v-if="loadingCart" class="mt-5" /> -->
        <div v-if="cart">
          <div
            v-if="cart.items != 0"
            class="container flex flex-col mx-auto lg:flex-row"
          >
            <div
              class="
                container
                flex flex-col
                w-full
                mx-auto
                my-5
                bg-gray-200
                border
                shadow
                lg:mx-0 lg:w-2/3
              "
            >
              <div class="h-auto mt-5">
                <span class="mx-auto text-2xl text-gray-500 ps-6"
                  >Your Cart</span
                >
              </div>

              <div
                class="
                  container
                  flex flex-col
                  p-1
                  mx-auto
                  md:ps-6 md:pe-6 md:pb-6
                "
              >
                <!-- <div class="flex flex-row justify-between w-full px-5">
                  <span class="w-3/4 bg-red-300">
                    </span>Product Name</span>
                  </span>
                  <div class="flex flex-row justify-between w-1/4 bg-red-400">
                    </span>Qantity</span>
                    </span>Price</span>
                  </div>
                </div> -->
                <div class>
                  <CartItem
                    v-for="(item, ix) in cart.items"
                    :key="ix"
                    :item="item"
                  />
                </div>
              </div>
            </div>
            <div
              class="
                container
                relative
                w-full
                mx-auto
                sm:p-1 sm:mb-5
                md:p-0
                lg:ms-4 lg:w-1/3 lg:mt-5
              "
            >
              <PriceDetails
                :btnname="'Select Address'"
                :nextpage="'/checkout/address'"
                class="
                  bg-white
                  border-t
                  rounded-sm
                  shadow
                  sm:border-t-0 sm:border
                  md:bg-gray-200
                "
              />
            </div>
          </div>
          <div v-else class="mt-32 lg:mt-20">
            <EmptyCart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import CartPageSkeleton from '~/components/AllSkeletons/CartPageSkeleton'
import CartItem from '~/components/Cart/CartItem.vue'
import PriceDetails from '~/components/Cart/PriceDetails.vue'
import EmptyCart from '~/components/Cart/EmptyCart.vue'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')

export default {
  components: {
    CheckoutHeader,
    // CartPageSkeleton,
    CartItem,
    PriceDetails,
    EmptyCart,
  },
  asyncData({ params, app, store }) {
    const { title, keywords, description } = store.state.settings || {} // err = null
    return { title, keywords, description }
  },
  data() {
    return {
      // loadingCart: false,
      isOpen: false,
    }
  },
  head() {
    return {
      title: 'Anne Cart',
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
