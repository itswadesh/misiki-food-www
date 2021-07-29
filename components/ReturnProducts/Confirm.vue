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
        bg-accent-100 bg:opacity-50
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
            ring-1 ring-gray-200
            focus:outline-none
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
            text-sm text-secondary-200
            border-secondary-200
            font-medium
            border
            rounded
            focus:outline-none
            hover:-translate-y-0.5
            transition
            transform
            ease-in-out
            focus:ring-opacity-50
            focus:ring
            focus:ring-offset-2
            focus:ring-green-500
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
