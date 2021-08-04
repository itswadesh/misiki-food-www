<template>
  <section class="container max-w-7xl mx-auto px-2 md:px-10 h-screen">
    <div class="flex flex-col p-6">
      <span class="text-xl font-semibold">My Cart</span>
      <span class="flex flex-col items-center justify-center p-5">
        <img
          v-lazy="'/no/empty-animate.svg'"
          alt="emptycart"
          class="object-contain h-80 md:h-96"
        />
        <span class="p-3 text-xl md:text-3xl font-medium">
          Your cart is empty!</span
        >

        <span class="mb-5 text-xs">Add items to it now.</span>

        <nuxt-link
          :to="localePath('/')"
          class="
            py-2
            px-16
            text-sm
            md:text-base
            font-medium
            text-white
            rounded
            shadow
            hover:shadow-md
            transition
            duration-300
            transform
            active:scale-95
            bg-primary-500
            hover:bg-primary-600
            focus:ring-opacity-50
            focus:ring
            focus:ring-offset-2
            focus:ring-primary-600
          "
        >
          Shop Now
        </nuxt-link>
      </span>
    </div>
  </section>
</template>
<script>
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { NuxtLink },
}
</script>
