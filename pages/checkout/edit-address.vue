<template>
  <div class="container mx-auto max-w-5xl px-2 sm:px-10 mb-10 text-gray-700">
    <CheckoutHeader selected="address" />
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="lg:w-2/3 lg:border-r lg:border-gray-200 lg:pr-5">
        <div class="text-lg font-bold tracking-wide mb-3">Edit Address</div>

        <EditAddress
          :id="$route.query.id"
          class="p-2 overflow-auto bg-white border rounded shadow md:p-5"
          :return-url="'/checkout/address'"
        />
      </div>

      <!-- <div class="lg:w-1/3">
        <PriceDetails
          :btnname="'Continue'"
          :nextpage="`/checkout/payment-options?address=${$route.query.id}`"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import EditAddress from '~/components/User/EditAddress.vue'
import PriceDetails from '~/components/Cart/PriceDetails.vue'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')

export default {
  components: { PriceDetails, CheckoutHeader, EditAddress },
  middleware: ['isAuth'],
  head() {
    return {
      title: 'Edit Address',
    }
  },
}
</script>
