<template>
  <section class="container mx-auto w-full">
    <div class="w-full mt-4 text-center text-gray-700">
      <img
        v-lazy="'/no/search2-animate.svg'"
        class="object-contain mx-auto h-80 md:h-96"
        alt=""
      />

      <div class="text-xl md:text-3xl">
        We couldn't find any matches! <br />
      </div>

      <div class="text-1">{{ $route.query.q }}</div>
    </div>

    <nuxt-link :to="localePath('/')">
      <GrnIndGradiantButton class="w-40 text-sm font-normal mx-auto my-10">
        Shop More</GrnIndGradiantButton
      >
    </nuxt-link>

    <!-- <div class="flex w-full shadow-md">
      <MegamenuMobile />
    </div> -->
  </section>
</template>

<script>
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
// import MegamenuMobile from '~/components/MegamenuMobile.vue'

export default {
  components: {
    //  MegamenuMobile
    GrnIndGradiantButton,
  },
}
</script>
