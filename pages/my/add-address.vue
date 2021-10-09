<template>
  <!--  -->
  <div class="mb-10 mx-auto lg:px-8 max-w-2xl">
    <div
      class="
        mb-5
        w-full
        sm:flex sm:items-center sm:justify-between
        text-gray-800
      "
    >
      <h1 class="mb-2 sm:mb-0 text-xl sm:text-2xl font-semibold tracking-wide">
        Add Address
      </h1>

      <nuxt-link :to="localePath('/my/manage-address')">
        <PrimaryButtonRounded
          class="
            text-xs
            sm:text-sm
            whitespace-nowrap
            w-full
            sm:w-60
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
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>

          <span>ALL ADDRESSES</span>
        </PrimaryButtonRounded>
      </nuxt-link>
    </div>

    <EditAddress id="new" :return-url="'/my/manage-address'" />
  </div>
</template>

<script>
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import EditAddress from '~/components/User/EditAddress.vue'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: {
    EditAddress,
    PrimaryButtonRounded,
    NuxtLink,
  },
  layout: 'account',
  middleware: ['isAuth'],
  head() {
    return {
      title: 'Add New Address',
    }
  },
}
</script>
