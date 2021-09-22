<template>
  <div v-if="product && product.id" class="w-full">
    <!-- go to cart -->

    <nuxt-link v-if="addedToCart" :to="localePath('/cart')">
      <button
        class="
          w-full
          px-4
          py-2
          sm:py-3
          font-semibold
          justify-center
          tracking-wider
          text-white
          transition
          duration-300
          transform
          bg-accent-500
          hover:bg-opacity-80
          rounded-md
          shadow-md
          hover:shadow
          focus:outline-none focus:ring-0 focus:ring-offset-0
          active:scale-95
        "
      >
        Go To Cart
      </button>
    </nuxt-link>

    <!-- add to cart -->

    <button
      v-else-if="product.stock > 0"
      class="
        w-full
        px-4
        py-2
        sm:py-3
        font-semibold
        justify-center
        tracking-wider
        text-white
        transition
        duration-300
        transform
        bg-white
        rounded-md
        shadow-md
        hover:shadow
        focus:outline-none focus:ring-0 focus:ring-offset-0
        active:scale-95
      "
      :class="
        iconloading
          ? ' bg-gray-400 cursor-not-allowed'
          : 'bg-primary-500 hover:bg-opacity-80'
      "
      @click="
        ;[
          addToBag({
            pid: product.pid || product.id,
            qty: 1,
            vid: product.pid || product.id,
            options: selectedOptions,
          }),
          (iconloading = true),
        ]
      "
    >
      <div
        v-if="!iconloading"
        class="flex items-center justify-center space-x-1"
      >
        ADD TO CART
      </div>

      <div v-else>
        <svg
          class="mx-auto text-white animate-spin h-6 w-6"
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
    </button>

    <button
      v-else
      class="
        w-full
        px-4
        py-2
        sm:py-3
        font-semibold
        flex
        items-center
        justify-center
        tracking-wider
        text-white
        transition
        duration-300
        transform
        rounded-md
        shadow-md
        hover:shadow
        focus:outline-none focus:ring-0 focus:ring-offset-0
        bg-gray-400
        cursor-not-allowed
      "
    >
      No Stock
    </button>

    <!-- No stock  -->

    <!-- <div v-else>Vendor not found. can't proceed checkout</div> -->
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: { NuxtLink },
  props: {
    product: { type: Object, default: null },
    selectedOptions: { type: Object, default: null },
    options: { type: Array, default: null },
    userSelectedVariant: { type: Object, default: null },
  },
  data() {
    return {
      addedToCart: false,
      isDisabled: false,
      iconloading: false,
    }
  },
  methods: {
    ...mapActions({ addToCart: 'cart/addToCart' }),
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async addToBag(obj) {
      // if (!this.userSelectedVariant) {
      //   this.$emit('alertToSelectMandatoryOptions')
      //   return
      // } else {
      // const msg = 'Product Added To the Cart'
      // console.log(obj)
      try {
        this.isDisabled = true
        this.iconloading = true
        // this.selectedOptions = []
        // if (!this.selectedOptions) {
        //   this.$emit('alertToSelectMandatoryOptions')
        //   return this.setErr(`Please select options`)
        // }
        // for (let o of this.options) {
        //   if (!this.selectedOptions[o.name]) {
        //     this.$emit('alertToSelectMandatoryOptions')
        //     return this.setErr(`Please select ${o.name}`)
        //   }
        // }
        obj.options = this.selectedOptions
        await this.addToCart(obj)
        this.addedToCart = true
        this.toast()
      } catch (e) {
      } finally {
        this.iconloading = false
        this.isDisabled = false
      }
      // }
    },
    toast() {
      this.$toast
        .show(
          `
      <div class="items-center hidden lg:flex w-72">
        <img class="object-cover h-8 me-2" src="${this.product.img}" alt="🚀" />
        <div class="items-center toasted-text">
          <div class="text-xs text-gray-600">Added to your cart</div>
        </div>
      </div>
      `,
          {
            containerClass: 'sw-toast-container',
            theme: 'outline',
            position: 'top-right',
            singleton: false,
            action: {
              text: 'View Cart',
              onClick: (e, toastObject) => {
                this.$router.push(`/cart`)
                toastObject.goAway(0)
              },
            },
          }
        )
        .goAway(5000)
    },
  },
}
</script>

<style scoped>
.button {
  height: 53px;
}
</style>
