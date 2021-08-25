<template>
  <div
    class="
      fixed
      inset-0
      z-50
      flex flex-col
      w-4/5
      overflow-x-hidden overflow-y-auto
      transition
      bg-white
      shadow-lg
      lg:w-3/5
    "
  >
    <button
      aria-label="Open sidebar"
      class="
        absolute
        top-0
        right-0
        inline-flex
        items-center
        justify-center
        w-8
        h-8
        rounded
        hover:bg-gray-100
        focus:outline-none
      "
      @click="hideSidebar(null)"
    >
      <svg
        class="w-5 h-5 text-primary-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div class="mt-6">
      <img
        :src="product && product.sizechart"
        alt="No Sizechart available"
        class="h-full w-full"
      />
    </div>
    <!-- <div class="">
        <div class="w-full border-t border-b">
          <div class="w-full py-2 text-lg text-center border-b-2 text-medium text-primary-500 border-primary-500">Size Chart</div>
        </div>
        
        <div class="flex flex-row justify-between w-full p-3 mt-4 font-light text-gray-600 border">
            <div>#</div>
            <div class="flex flex-row justify-between w-11/12">
                <div class="w-1/4 text-center">Size</div>
                <div class="w-1/4 text-center">Chest(in)</div>
                <div class="w-1/4 text-center">Front Length(in)</div>
                <div class="w-1/4 text-center">Accross Shoulder(in)</div>
            </div>
        </div>
        <div class="p-3 border-b">
            <label class="flex flex-row justify-between w-full ">
                <Radio />
                <div class="flex flex-row justify-between w-11/12 text-base font-light text-center">
                    <span class="w-1/4">S</span>
                    <span class="w-1/4">40.5</span>
                    <span class="w-1/4">26.5</span>
                    <span class="w-1/4">17.5</span>
                </div>
            </label>
        </div>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    product: { type: Object, default: null },
  },
  methods: {
    hideSidebar(e) {
      this.sidebar = false
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hideSidebar', true)
    },
  },
}
</script>
