<template>
  <div class="container mx-auto text-gray-800">
    <div
      class="
        mb-5
        flex flex-col
        sm:flex-row sm:items-center sm:justify-between sm:space-x-5
      "
    >
      <h2 class="mb-2 sm:mb-0 text-xl sm:text-2xl font-semibold tracking-wide">
        Profile Details
      </h2>

      <nuxt-link :to="localePath('/my/add-address')">
        <PrimaryButtonRounded
          class="
            text-xs
            sm:text-sm
            whitespace-nowrap
            w-60
            font-semibold
            tracking-wide
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>ADD NEW ADDRESS</span>
        </PrimaryButtonRounded>
      </nuxt-link>
    </div>

    <SelectAddress
      id:a.id
      :return-url="'/my/edit-addresses'"
      add-return-url="/my/add-address"
    />
  </div>
</template>

<script>
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import SelectAddress from '~/components/User/Dashboard/SelectAddress.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: {
    SelectAddress,
    PrimaryButtonRounded,
    NuxtLink,
  },

  layout: 'account',

  middleware: ['isAuth'],

  head() {
    return {
      title: 'Address',
    }
  },
}
</script>
