<template>
  <section class="container max-w-7xl mx-auto px-2 md:px-10 h-screen">
    <div class="flex flex-col p-6">
      <span class="text-xl font-semibold">My Cart</span>
      <span class="flex flex-col items-center justify-center p-5">
        <!-- v-lazy="`/no/empty-animate.svg?tr=w-,h-,fo-auto`" -->
        <img
          v-lazy="`/no/empty-animate.svg?tr=h-384,fo-auto`"
          alt="emptycart"
          class="object-contain h-80 md:h-96"
        />
        <span class="p-3 text-xl md:text-3xl font-medium">
          Your cart is empty!</span
        >

        <span class="mb-5 text-xs">Add items to it now.</span>
        <nuxt-link :to="localePath('/')">
          <PrimaryButtonRounded class="py-2 w-40 text-sm">
            Shop Now
          </PrimaryButtonRounded>
        </nuxt-link>
      </span>
    </div>
  </section>
</template>
<script>
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: { PrimaryButtonRounded },
}
</script>
