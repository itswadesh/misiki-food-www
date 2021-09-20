<template>
  <div>
    <div class="relative flex px-1 py-2 m-2 bg-white rounded shadow">
      <div class="p-2">
        <img
          v-lazy="`/loading.svg?tr=w-128,h-80,fo-auto`"
          class="object-cover w-32 h-20 rounded"
        />
      </div>
      <div class="w-full my-2">
        <div>
          <img
            v-lazy="`/food-tray.svg?tr=w-32,h-32,fo-auto`"
            class="
              absolute
              top-0
              right-0
              object-cover
              w-8
              h-8
              mt-2
              rounded-full
              me-2
            "
          />
        </div>
        <div class="w-48 font-bold tracking-wide bg-gray-100">&nbsp;</div>
        <div class="flex justify-between">
          <div class="flex items-center text-sm tracking-widest text-gray-500">
            <div class="w-48 bg-gray-100 rounded">&nbsp;</div>
          </div>
          <div class="text-xl font-black text-gray-700">
            {{ 0 | currency(store.currencySymbol, 2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: { ...mapGetters({ store: 'store' }) },
  methods: {},
}
</script>

<style scoped></style>
