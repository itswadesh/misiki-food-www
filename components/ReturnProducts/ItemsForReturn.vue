<template>
  <div>
    <div
      class="
        container
        flex flex-row
        justify-between
        p-4
        px-8
        mx-auto
        text-xs
        font-medium
        tracking-wider
        text-gray-500
        www
        bg-accent-100
      "
    >
      <span>Select items for return</span>
      <span class="hidden md:flex">Order Information</span>
      <span class="hidden md:flex">Order date</span>
      <span class="hidden md:flex">Price</span>
      <span class="md:hidden">Returning item (1)</span>
    </div>
    <div class="container p-2 mx-auto bg-white rounded-sm shadow-sm">
      <label class="flex flex-row justify-between w-full p-2 px-4 my-2">
        <div class="flex flex-row w-full md:w-1/4">
          <Checkbox />
          <!-- <input type="checkbox" class="border-none bg-gray-50 text-primary-500 ring-1 ring-gray-400 focus:ring-1 focus:ring-yellow-600 focus:ring-offset-0" /> -->
          <div class="text-gray-500">
            <div class="flex flex-row">
              <div class="w-24 mx-2 md:w-20 md:h-20">
                <img
                  v-lazy="`/img/producttrack.jpg?tr=w-96,h-80,fo-auto`"
                  alt="pic"
                  class="object-contain w-full h-full overflow-hidden border"
                />
              </div>
              <div class="relative flex flex-col">
                <span class="font-medium text-gray-600 hover:text-primary-500"
                  >name</span
                >
                <span class="py-2 text-xs text-primary-500">company</span>
                <span
                  class="absolute bottom-0 hidden text-xs text-gray-500 md:flex"
                  >qty:1</span
                >
                <div class="flex flex-col flex-shrink-0 text-xs md:hidden">
                  <span class="flex flex-row flex-shrink-0"
                    >Order ID: <b class="text-primary-500">#12ERaa12PX</b></span
                  >
                  <span class="flex flex-shrink-0 my-2"
                    >Payment: Credit Card</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            flex-row
            justify-between
            hidden
            w-2/3
            text-xs text-gray-500
            md:flex
          "
        >
          <div class="flex flex-col w-1/4 px-6">
            <span>Order ID: <b class="text-primary-500">#12ERaa12PX</b></span>
            <span class="my-2">Payment: Credit Card</span>
          </div>
          <div class="w-1/4 px-6 text-end">22/02/2025</div>
          <div class="w-1/4 text-end">
            {{ 125 | currency(store.currencySymbol, 2) }}
          </div>
        </div>
      </label>
      <!-- second product -->
      <!-- <label class="flex flex-row justify-between w-full p-2 px-4 checkbox">
                <div class="flex flex-row w-1/4">
                    <input type="checkbox" class="bg-gray-100 border-none text-primary-500 ring-1 ring-gray-400 focus:ring-1 focus:ring-yellow-600 focus:ring-offset-0" />
                    <div class="text-gray-500">
                        <div class="flex flex-row">
                            <span class="w-20 mx-2">
                                <img v-lazy="`/img/producttrack.jpg?tr=w-80,h-80,fo-auto`" alt="pic" class="object-contain w-20 h-20 overflow-hidden border md:border-0 md:w-full">
                            </span>
                            <span class="relative flex flex-col">
                                <span class="font-medium text-gray-600 hover:text-primary-500">name</span>
                                <span class="py-2 text-xs text-primary-500">company</span>
                                <span class="absolute bottom-0 text-xs text-gray-500">qty:1</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row justify-between w-2/3 text-xs text-gray-500">
                <div class="flex flex-col w-1/4 px-6">
                    </span>Order ID: <b class="font-normal text-primary-500">#12ERaa12PX</b></span>
                    <span class="my-2">Payment: Credit Card</span>
                </div>
                <div class="w-1/4 px-6 text-end">22/02/2025</div>
                <div class="w-1/4 text-end">{{125 | currency(store.currencySymbol,2)}}</div>
                </div>
            </label> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Checkbox } from '~/shared/components/ui'

export default {
  components: { Checkbox },
  computed: {
    ...mapGetters({
      store: 'store',
    }),
  },
}
</script>
