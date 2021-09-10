<template>
  <div
    class="
      flex
      items-center
      my-auto
      text-sm
      overflow-hidden
      whitespace-nowrap
      overflow-ellipsis
    "
  >
    <nuxt-link :to="localePath('/')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 my-auto cursor-pointer hover:text-primary-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
        />
      </svg>
    </nuxt-link>

    <span class="transform rotate-12 mx-1">/</span>

    <div v-for="(p, ix) in path" v-if="p" :key="ix" class="flex items-center">
      <nuxt-link
        :to="`/c/${p.slug}`"
        class="
          my-auto
          whitespace-nowrap
          items-center
          capitalize
          cursor-pointer
          hover:text-primary-500
        "
      >
        {{ p.name }}
      </nuxt-link>

      <span class="transform rotate-12 mx-1">/</span>
    </div>

    <span class="my-auto capitalize text-primary-500">
      {{ name }}
    </span>
  </div>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    path: { type: Array, default: () => [] },
    name: { type: String, default: null },
  },
}
</script>
