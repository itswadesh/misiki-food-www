<template>
  <section
    class="container mx-auto max-w-5xl px-2 sm:px-10 mb-10 text-gray-700"
  >
    <CheckoutHeader selected="address" class="py-5 sm:py-10" />

    <div class="flex flex-col sm:items-center justify-center max-w-2xl mx-auto">
      <div class="w-full mb-3 sm:flex sm:items-center sm:justify-between">
        <h1
          class="
            mb-3
            sm:mb-0
            text-lg
            font-bold
            tracking-wide
            text-start
            max-w-max
          "
        >
          Edit Address
        </h1>

        <nuxt-link to="/checkout/address">
          <PrimaryButtonRounded
            type="button"
            :loading="loading"
            class="text-sm w-40"
            @click="loading = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5"
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
            <span>All Address</span>
          </PrimaryButtonRounded></nuxt-link
        >
      </div>

      <EditAddress :id="$route.query.id" :return-url="'/checkout/address'" />
    </div>
  </section>
</template>

<script>
import EditAddress from '~/components/User/EditAddress.vue'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
// import PriceDetails from '~/components/Cart/PriceDetails.vue'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')

export default {
  components: {
    // PriceDetails,
    CheckoutHeader,
    EditAddress,
    PrimaryButtonRounded,
  },

  middleware: ['isAuth'],

  data() {
    return {
      loading: false,
    }
  },

  head() {
    return {
      title: 'Edit Address',
    }
  },
}
</script>
