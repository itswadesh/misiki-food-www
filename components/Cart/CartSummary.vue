<template>
  <div class="px-3 mt-10 lg:w-1/4 lg:pe-20 xs:w-full">
    <div class="relative flex flex-wrap justify-between w-full pb-2 hr-line">
      <input
        type="search"
        class="w-full p-2 bg-gray-200 border rounded focus:outline-none"
        placeholder="Promo Code"
      />
      <button
        class="
          absolute
          right-0
          pe-2
          mt-2
          text-sm text-gray-500
          cursor-pointer
          focus:outline-none
          hover:text-gray-600
        "
      >
        APPLY
      </button>
    </div>
    <div class="right-0 border-b border-dotted 4/5 lg:mb-0">
      <div>
        <span class="mt-4 text-xl font-normal text-black">Price Summary</span>
        <span class="text-xs text-gray-400"
          >Includes GST and all government taxes</span
        >
        <div class="flex justify-between mt-1">
          <div class="w-1/2 text-sm text-start">Total item price</div>
          <div class="w-1/2 text-end ms-2 text-black-400">
            {{ cart.subtotal | currency }}
          </div>
        </div>
        <div class="flex justify-between mt-1">
          <div class="w-1/2 text-sm text-start">Item discount</div>
          <div class="w-1/2 text-end ms-2 text-black-400">
            {{ cart.discount | currency }}
          </div>
        </div>
        <div
          v-if="$store.state.settings && $store.state.settings.shipping"
          class="flex justify-between mt-1"
        >
          <div class="w-1/2 text-sm text-start">Shipping fee</div>
          <div
            v-if="$store.state.settings.shipping.charge > 0"
            class="w-1/2 text-end ms-2 text-black-400"
          >
            {{ $store.state.settings.shipping.charge | currency }}
          </div>
          <div v-else class="w-1/2 text-end ms-2 text-black-400">FREE</div>
        </div>
        <!-- <div class="mt-1">
          <div class="pb-2 text-xs text-gray-400">
            Free shipping on orders of ₹999 or more. For first purchase,
            <a href class="underline">See Offer</a>
          </div>
        </div> -->
      </div>
      <!-- <div class="p-2 my-2 text-xs text-gray-500 rounded bg-accent-100">
        <div class="flex items-center">
          <img v-lazy="'/shield.png'" class="w-12 pe-2" alt="" />
          <div class="ms-1 justify">
            Genuine products. 15 day returns. 100% secure payments.
            <span class="text-black">Know More</span>
          </div>
        </div>
      </div> -->
    </div>
    <div
      class="
        fixed
        bottom-0
        right-0
        w-full
        px-2
        py-4
        bg-white
        shadow
        lg:relative lg:px-0 lg:py-0 lg:shadow-none
      "
    >
      <div class="flex justify-between mt-2">
        <div class="w-1/2 text-lg font-bold text-start">Total</div>
        <div class="w-1/2 font-bold text-end ms-2 text-black-400">
          {{ cart.total | currency }}
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: { type: Object, default: null },
  },
}
</script>
