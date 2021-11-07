<template>
  <div>
    <div
      class="
        container
        flex flex-row
        justify-center
        p-4
        px-8
        mx-auto
        text-xs
        font-medium
        tracking-wider
        text-center text-gray-500
        bg-gray-100 bg:opacity-50
      "
    >
      Confirm your return
    </div>

    <div
      class="
        container
        flex-wrap
        w-full
        h-64
        p-5
        mx-auto
        overflow-hidden
        bg-white
      "
    >
      <span class="my-4 text-center text-gray-600 text-normal"
        >Are you sure you want to return this product?</span
      >
      <div class="flex flex-row items-center justify-center">
        <button
          class="
            p-3
            px-16
            me-4
            text-sm
            font-medium
            bg-gray-200
            rounded
            shadow
            focus:outline-none focus:ring-0 focus:ring-offset-0
            hover:bg-gray-300 hover:-translate-y-0.5
            transition
            transform
            ease-in-out
          "
        >
          Cancle
        </button>
        <button
          class="
            p-3
            px-4
            text-sm text-secondary-500
            border-secondary-500
            font-medium
            border
            rounded
            hover:-translate-y-0.5
            transition
            transform
            ease-in-out
            focus:outline-none focus:ring-0 focus:ring-offset-0
          "
          @click="showOffers = !showOffers"
        >
          Return this Product
        </button>
      </div>
      <span v-if="showOffers">
        <ConfirmPopup
          :class="showOffers ? 'open' : 'close'"
          @hide="hideOffers"
        />
      </span>
    </div>
  </div>
</template>

<script>
import ConfirmPopup from '~/components/ReturnProducts/ConfirmPopup.vue'
export default {
  components: {
    ConfirmPopup,
  },
  data() {
    return {
      showOffers: false,
    }
  },
  methods: {
    hideOffers() {
      // console.log("hide offers")
      this.showOffers = false
    },
  },
}
</script>
