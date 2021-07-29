<template>
  <div>
    <div class="container w-full">
      <div class="w-full mt-4 text-center text-gray-700">
        <img
          v-lazy="'/placeholder/no-search-result.png'"
          class="object-contain mx-auto h-80 sm:w-2/3"
          alt=""
        />
        <div class="text-xl text-red-500 capitalize">
          We are unable to find items matching !! Try again...
        </div>
        <div class="text-center text-1">{{ $route.query.q }}</div>
      </div>
    </div>
    <div class="flex w-full text-center shadow-md">
      <MegamenuMobile />
    </div>
  </div>
</template>

<script>
import MegamenuMobile from '~/components/MegamenuMobile.vue'
export default {
  components: { MegamenuMobile },
}
</script>
