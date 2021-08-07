<template>
  <section
    class="container mx-auto max-w-6xl px-2 sm:px-10 mb-10 text-gray-700"
  >
    <CheckoutHeader selected="address" class="py-5 sm:py-10" />

    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="lg:w-2/3 lg:border-r lg:border-gray-200 lg:pr-5">
        <div class="text-2xl font-bold tracking-wide mb-3">
          Select Delivery Address
        </div>

        <SelectAddress
          class="w-full mx-auto mb-4 bg-white rounded shadow"
          :return-url="'/checkout/edit-address'"
          :add-return-url="'/checkout/add'"
          @addressChanged="addressChanged"
        />

        <div class="my-10 w-1/2">
          <nuxt-link
            :to="localePath('/checkout/add')"
            class="
              w-full
              h-40
              sm:h-60
              border border-gray-400 border-dashed
              rounded-md
              flex flex-col
              items-center
              justify-center
              hover:border-primary-500
              group
            "
          >
            <div
              class="
                h-8
                w-8
                sm:h-10 sm:w-10
                rounded-full
                border border-gray-400
                flex
                items-center
                justify-center
                bg-gray-100
                group-hover:border-primary-500
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-600 group-hover:text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <span
              class="
                mt-2
                text-gray-800
                group-hover:text-primary-500
                text-sm
                sm:text-base
                font-medium
              "
            >
              ADD NEW ADDRESS</span
            >
          </nuxt-link>
        </div>
      </div>

      <div class="lg:w-1/3 pb-10">
        <div class="text-2xl font-bold tracking-wide mb-3">Cart Summary</div>

        <hr class="border-t border-gray-200 mb-2" />

        <CartSummaryCheckout
          :loading="loading"
          :selected-address="selectedAddress"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import SelectAddress from '~/components/User/Dashboard/SelectAddress.vue'
import MY_ADDRESSES from '~/gql/address/myAddresses.gql'
import DELETE_ADDRESS from '~/gql/address/deleteAddress.gql'
import CartSummaryCheckout from '~/components/Checkout/CartSummaryCheckout.vue'
import NuxtLink from '~/components/NuxtLink.vue'

const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')
export default {
  components: {
    SelectAddress,
    CartSummaryCheckout,
    CheckoutHeader,
    NuxtLink,
  },
  middleware: ['isAuth'],

  data() {
    return {
      iconloading: false,
      addresses: null,
      selectedAddress: null,
    }
  },
  head() {
    return {
      title: 'Select Address',
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  async created() {
    this.$store.dispatch('cart/fetch')
    await this.getAddress()
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    selectFirstAddress(x) {
      this.selectedAddress = x.addresses && x.addresses[0] && x.addresses[0].id
      return x
    },
    addressChanged(e) {
      this.selectedAddress = e
    },
    async getAddress() {
      try {
        this.loading = true
        this.addresses = await this.$get('address/myAddresses', {})
        // this.addresses = (
        //   await this.$apollo.query({
        //     query: MY_ADDRESSES,
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.myAddresses
        this.selectedAddress =
          this.addresses &&
          this.addresses.data &&
          this.addresses.data[0] &&
          this.addresses.data[0].id
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    del(id) {
      this.$swal({
        title: 'Delete address?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          try {
            this.iconloading = true
            this.clearErr()
            await this.$post('address/deleteAddress', { id })
            // await this.$apollo.mutate({
            //   mutation: DELETE_ADDRESS,
            //   variables: { id },
            //   // refetchQueries: () => [{ query: ADDRESSES }],
            // })
            // query.refetch()
            await this.getAddress()
            // this.$refs.adQ.getApolloQuery().refresh();
            this.success('Address deleted successfully')
          } catch (e) {
            this.setErr(e)
          } finally {
            this.iconloading = false
            this.busy(false)
          }
        }
      })
    },
  },
}
</script>
