<template>
  <section class="container mx-auto w-full">
    <div class="w-full mt-4 text-center text-gray-700">
      <img
        v-lazy="`/no/search2-animate.svg?tr=w-384,h-320,fo-auto`"
        class="object-contain mx-auto h-80 md:h-96"
        alt="🚀"
      />

      <div class="text-xl md:text-2xl lg:text-3xl">
        We couldn't find any matches! <br />
      </div>

      <div class="text-1">{{ $route.query.q }}</div>
    </div>

    <nuxt-link :to="localePath('/')">
      <PrimaryButtonRounded class="w-40 text-sm font-normal mx-auto my-10">
        Shop More
      </PrimaryButtonRounded>
    </nuxt-link>

    <!-- <div class="flex w-full shadow-md">
      <MegamenuMobile />
    </div> -->
  </section>
</template>

<script>
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
// import MegamenuMobile from '~/components/MegamenuMobile.vue'

export default {
  components: {
    //  MegamenuMobile
    PrimaryButtonRounded,
  },
}
</script>
