<template>
  <div class="mx-auto lg:ps-8 lg:w-3/4">
    <div
      class="
        flex flex-col
        justify-between
        px-4
        py-4
        bg-white
        rounded-sm
        shadow
        sm:py-2 sm:flex-row
      "
    >
      <div class="my-auto text-lg font-normal text-gray-700">
        Manage Address
      </div>
      <nuxt-link :to="localePath('/my/add-address')" class="mt-2 sm:mt-0">
        <Button
          type="submit"
          class="
            flex flex-row
            justify-center
            w-full
            p-2
            px-5
            rounded-sm
            bg-secondary-500
            focus:ring-secondary-500
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 my-auto text-secondary-500 sm:text-white"
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
          <span class="my-auto text-base ms-2"> ADD NEW ADDRESS</span>
        </Button>
        <!-- <button
          type="submit"
          class="flex flex-row justify-center w-full p-3 px-5 text-sm font-semibold tracking-widest bg-white rounded text-secondary-500 sm:text-white ring-1 ring-secondary-500 sm:bg-secondary-500 md:w-auto md:mt-0 focus:outline-none focus:ring-opacity-50 focus:ring focus:ring-offset-2 focus:ring-secondary-500 lg:rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-secondary-500 sm:text-white"
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
          <span class="my-auto ms-2"> ADD NEW ADDRESS</span>
        </button> -->
      </nuxt-link>
    </div>
    <SelectAddress
      class="w-full px-3 py-2 mx-auto my-4 bg-white rounded shadow"
      id:a.id
      :return-url="'/my/edit-addresses'"
      add-return-url="/my/add-address"
    />
  </div>
</template>

<script>
import { Button } from '~/shared/components/ui'

import SelectAddress from '~/components/User/Dashboard/SelectAddress.vue'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: {
    SelectAddress,
    Button,
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
