<template>
  <div class="container relative mx-auto">
    <div>
      <CheckoutHeader selected="address" />
      <div>
        <div class="flex flex-col w-full mx-auto pb-14 sm:pb-20 lg:flex-row">
          <div class="container w-full mx-auto lg:w-2/3">
            <span
              class="
                hidden
                mx-auto
                my-4
                text-2xl text-center text-gray-500
                lg:text-start
                sm:flex
              "
            >
              Billing Details
            </span>
            <EditAddress
              id="new"
              class="p-2 bg-white border rounded shadow"
              :return-url="'/checkout/address'"
            />
          </div>
          <!-- <AddAddressMobile class="py-4 bg-white sm:hidden" /> -->
          <!-- <EditAddress go="checkout" id="add" class="w-2/3 bg-white border shadow rounded-xl" /> -->
          <div
            class="
              container
              relative
              w-full
              mx-auto
              mt-6
              lg:ms-4 lg:w-1/3 lg:mt-0
            "
          >
            <span
              class="
                hidden
                mx-auto
                my-4
                text-2xl text-center text-gray-500
                lg:text-start
                sm:flex
              "
            >
              Cart Details
            </span>
            <PriceDetails
              :btnname="'Continue'"
              class="bg-white border rounded shadow"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-center">
      <Footer class="absolute bottom-0 items-center" />
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditAddress from '~/components/User/EditAddress.vue'
import PriceDetails from '~/components/Cart/PriceDetails.vue'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')

export default {
  components: {
    CheckoutHeader,
    EditAddress,
    PriceDetails,
  },
  middleware: ['isAuth'],
  data() {
    return {
      address: null,
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  async created() {
    // const id = this.$route.query.id
    // If editing
    // if (!id) {
    //   let geoCookie = this.$cookies.get('geo')
    //   if (geoCookie) {
    //     this.address = geoCookie || {}
    //     this.address.firstName = this.user.firstName
    //     this.address.lastName = this.user.lastName
    //     this.address.phone = this.user.phone
    //   }
    // }
  },
  head() {
    return {
      title: 'Add Address',
    }
  },

  methods: {
    // go(url) {
    //   this.$router.push(url)
    // },
    // async submit(address) {
    //   if (address && address.coords) delete address.coords.__typename
    //   try {
    //     // address.zip = +address.zip
    //     if (address.id)
    //       await this.$apollo.mutate({
    //         mutation: updateAddress,
    //         variables: address,
    //       })
    //     else
    //       await this.$apollo.mutate({
    //         mutation: addAddress,
    //         variables: address,
    //       })
    //     this.go('/checkout/address')
    //   } catch (e) {
    //   } finally {
    //   }
    // },
  },
}
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
</style>
