<template>
  <div>
    <div class="container mx-auto w-full">
      <div class="w-full mt-4 text-center text-gray-700">
        <img
          v-lazy="'/no/search2-animate.svg'"
          class="object-contain mx-auto h-80 md:h-96"
          alt=""
        />

        <div class="capitalize">
          We are unable to find items matching !! <br />
          Try again...
        </div>

        <div class="text-1">{{ $route.query.q }}</div>
      </div>
    </div>

    <div class="flex w-full shadow-md">
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
