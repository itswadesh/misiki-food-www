<template>
  <div class="flex items-center my-auto text-sm font-thin">
    <nuxt-link :to="localePath('/')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="
          w-5
          h-5
          my-auto
          text-gray-500
          cursor-pointer
          me-1
          hover:text-primary-500
        "
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
        />
      </svg>
    </nuxt-link>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
    <nuxt-link
      v-for="(p, ix) in path"
      v-if="p"
      :key="ix"
      :to="`/c/${p.slug}`"
      class="
        my-auto
        flex flex-wrap
        items-center
        capitalize
        cursor-pointer
        ms-1
        hover:text-primary-500
      "
    >
      {{ p.name }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </nuxt-link>
    <span class="my-auto capitalize truncate text-primary-500 ms-1">
      {{ name }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    path: { type: Array, default: () => [] },
    name: { type: String, default: null },
  },
}
</script>
