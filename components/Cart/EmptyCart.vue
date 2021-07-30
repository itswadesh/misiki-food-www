<template>
  <div class="m-2 bg-white rounded-lg shadow">
    <div class="flex flex-col p-6">
      <span class="text-xl font-semibold">My Cart</span>
      <span class="flex flex-col items-center justify-center p-5">
        <img
          v-lazy="'/placeholder/empty-cart.png'"
          alt="emptycart"
          class="object-contain h-48"
        />
        <span class="p-3 text-xl">Your cart is empty!</span>
        <span class="text-xs">Add items to it now.</span>
        <nuxt-link :to="localePath('/')">
          <button
            class="
              p-2
              ps-16
              pe-16
              m-3
              text-base
              font-light
              text-white
              border
              rounded
              shadow
              focus:ring-opacity-50
              hover:bg-yellow-600
              focus:ring focus:ring-offset-2 focus:ring-yellow-600
              bg-primary-500
              focus:outline-none
              border-primary-500
            "
          >
            Shop Now
          </button>
        </nuxt-link>
      </span>
    </div>
  </div>
</template>
<script>
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { NuxtLink },
}
</script>
