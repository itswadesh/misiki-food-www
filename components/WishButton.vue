<template>
  <button
    v-ripple="'rgba(255, 0,0, 0.5)'"
    :disabled="isDisabled"
    class="
      font-semibold
      text-center
      bg-accent-100
      px-auto
      hover:opacity-75
      focus:outline-none
    "
    :class="rounded ? 'rounded-full' : 'rounded-sm'"
    @click="toggleWishlist(pid)"
  >
    <!-- class="p-2 hover:bg-red-200 focus:outline-none hover:shadow-md" -->
    <!-- heart icon  -->
    <svg
      class="mx-auto text-accent-900"
      :class="{ 'text-accent-900 fill-current ': existInWishlist }"
      xmlns="http://www.w3.org/2000/svg"
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
  </button>
</template>

<script>
import { mapMutations } from 'vuex'
import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
import CHECK_WISHLIST from '~/gql/wishlist/checkWishlist.gql'
export default {
  props: {
    pid: { type: String, required: true },
    rounded: { type: Boolean },
  },
  data() {
    return {
      existInWishlist: false,
      isDisabled: false,
    }
  },
  created() {
    this.checkWishlist()
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      info: 'info',
      busy: 'busy',
    }),
    async checkWishlist() {
      try {
        this.existInWishlist = await this.$get('wishlist/checkWishlist', {
          product: this.pid,
          variant: this.pid,
        })
        // this.existInWishlist = (
        //   await this.$apollo.query({
        //     query: CHECK_WISHLIST,
        //     variables: {
        //       product: this.pid,
        //       variant: this.pid,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.checkWishlist
      } catch (e) {
        this.setErr(e)
      }
    },
    async toggleWishlist() {
      if (!this.user) {
        this.$router.push(`/login?ref=${this.$router.currentRoute.fullPath}`)
      }
      this.existInWishlist = !this.existInWishlist
      const msg = 'Product added to wishlist'
      const err = 'Product removed from wishlist'
      try {
        this.savingWishlist = true
        this.existInWishlist = await this.$post('wishlist/toggleWishlist', {
          product: this.pid,
          variant: this.pid,
        })
        // this.existInWishlist = (
        //   await this.$apollo.mutate({
        //     mutation: TOGGLE,
        //     variables: {
        //       product: this.pid,
        //       variant: this.pid,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.toggleWishlist
        this.existInWishlist ? this.success(msg) : this.info(err)
      } catch (e) {
        // console.log('zzzzzzzzzzzzzzzzzz', e)
      } finally {
        this.savingWishlist = false
      }
    },
  },
}
</script>
