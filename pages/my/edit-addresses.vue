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
      <div class="my-auto text-lg font-normal text-gray-700">Edit Address</div>
      <nuxt-link :to="localePath('/my/manage-address')" class="mt-2 sm:mt-0">
        <Button
          class="
            flex flex-row
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
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span class="my-auto text-base ms-2"> ALL ADDRESSES</span>
        </Button>
        <!-- <button
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
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span class="my-auto ms-2"> ALL ADDRESSES</span>
        </button> -->
      </nuxt-link>
    </div>
    <EditAddress
      :id="$route.query.id"
      class="p-2 mt-4 overflow-auto bg-white border rounded shadow md:p-5"
      :return-url="'/my/manage-address'"
    />
  </div>
</template>

<script>
import { Button } from '~/shared/components/ui'
import EditAddress from '~/components/User/EditAddress.vue'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: {
    EditAddress,
    Button,
    NuxtLink,
  },
  layout: 'account',
  middleware: ['isAuth'],
  head() {
    return {
      title: 'Edit Address',
    }
  },
}
</script>
