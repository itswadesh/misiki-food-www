<template>
  <div v-if="product && product.id" class="w-full">
    <WhiteButton
      :loading="iconloading"
      class="w-full sm:py-3"
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
      <span>BUY NOW</span>
    </WhiteButton>

    <!-- <div v-else>Vendor not found. can't proceed checkout</div> -->
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import WhiteButton from '~/components/ui/WhiteButton.vue'

export default {
  components: { WhiteButton },

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
    go() {
      this.$router.push(`/cart`)
    },
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
        this.go('/cart')
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
        <img class="object-cover w-12 h-12" v-lazy="${this.product.imgCdn}" alt="" />
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
.text {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 17px;
}
.button {
  height: 53px;
}
</style>
