<template>
  <section
    class="container mx-auto max-w-5xl px-2 sm:px-10 mb-10 text-gray-700"
  >
    <CheckoutHeader selected="address" class="py-5 sm:py-10" />

    <div class="flex flex-col sm:items-center justify-center max-w-2xl mx-auto">
      <div
        class="text-lg font-bold tracking-wide mb-3 text-start sm:text-center"
      >
        Edit Address
      </div>

      <EditAddress :id="$route.query.id" :return-url="'/checkout/address'" />
    </div>
  </section>
</template>

<script>
import EditAddress from '~/components/User/EditAddress.vue'
// import PriceDetails from '~/components/Cart/PriceDetails.vue'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')

export default {
  components: {
    // PriceDetails,
    CheckoutHeader,
    EditAddress,
  },

  middleware: ['isAuth'],

  head() {
    return {
      title: 'Edit Address',
    }
  },
}
</script>
