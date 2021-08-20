<template>
  <div
    class="
      flex flex-col
      items-center
      justify-center
      h-screen
      p-2
      text-center text-gray-600
      bg-gradient-to-br
      from-secondary-100
      to-primary-100
    "
  >
    <div class="w-full max-w-sm">
      <div class="p-10 rounded-md shadow-md frosted">
        <div class="mx-auto max-w-max">
          <svg
            class="w-20 h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 62 80"
          >
            <path
              fill="lightblue"
              fill-rule="nonzero"
              d="M59.466 10.162l-27.88-10a2.708 2.708 0 0 0-1.84 0l-27.878 10C.748 10.562 0 11.645 0 12.858v31.945c0 5.943 2.265 11.809 6.736 17.438 1.69 2.117 3.757 4.257 6.319 6.543 2.954 2.643 10.25 7.23 15.85 10.613l.308.189c.444.277.947.414 1.45.414a2.77 2.77 0 0 0 1.458-.414l.307-.189c5.6-3.383 12.897-7.97 15.85-10.611 2.563-2.288 4.63-4.428 6.322-6.55 4.468-5.624 6.733-11.48 6.733-17.405V12.858c0-1.213-.748-2.296-1.867-2.696zm-28.8 8.41c4.613 0 8.364 3.846 8.364 8.573s-3.751 8.572-8.363 8.572-8.364-3.845-8.364-8.572c0-4.727 3.752-8.572 8.364-8.572zm13.94 37.145H16.727c-.77 0-1.394-.639-1.394-1.428 0-8.665 6.88-15.715 15.334-15.715C39.12 38.574 46 45.624 46 54.289c0 .79-.623 1.428-1.394 1.428z"
            />
          </svg>
        </div>

        <h2 class="py-5 font-semibold">Password successfully changed</h2>

        <h5>You need to login again</h5>
        <nuxt-link to="/login?forced=true" class="pt-10 link"
          >Back to login</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  layout: 'none',
  computed: {
    ...mapGetters({ settings: 'settings', error: 'error' }),
  },
}
</script>
