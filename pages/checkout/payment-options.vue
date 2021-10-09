<template>
  <section
    class="container mx-auto max-w-5xl px-2 sm:px-10 mb-10 text-gray-700"
  >
    <CheckoutHeader selected="payment" class="py-5 sm:py-10" />

    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="lg:w-2/3 lg:border-r lg:border-gray-200 lg:pe-5">
        <div class="text-lg font-bold tracking-wide mb-3">Payment Methods</div>

        <div v-if="paymentMethods && paymentMethods.length > 0" class="mb-5">
          <div v-for="p in paymentMethods" :key="p.id">
            <label
              class="
                p-3
                sm:p-5
                flex
                items-center
                space-x-5
                w-full
                my-2
                border
                rounded
                shadow-md
                cursor-pointer
              "
            >
              <div class="flex items-center space-x-5">
                <Radio v-model="paymentMethod" :value="p" :color="p.color" />

                <div
                  class="
                    flex
                    items-center
                    justify-center
                    w-12
                    h-12
                    rounded-full
                    border border-gray-200
                  "
                >
                  <img
                    v-lazy="`${p.imgCdn}?tr=w-40,h-40,fo-auto`"
                    :alt="p.name"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </div>

              <div class="flex-1">
                <h2 class="mb-1 text-sm sm:text-base leading-3 font-black">
                  {{ p.name }}
                </h2>
                <!-- <div
                  v-if="
                    p.value !== 'COD' &&
                    p.value !== 'Manual' &&
                    (!p.key || p.key == '')
                  "
                  class="text-center text-red-500"
                >
                  {{ p.name }} Publishable key is invalid
                </div> -->
                <span class="text-xs">
                  {{ p.text }}
                </span>
              </div>
            </label>

            <div
              v-if="
                paymentMethod == 'Stripe' &&
                p.name == 'Stripe' &&
                loadedStripe &&
                p.key &&
                p.key != null
              "
              class="px-6 py-4 my-2 rounded shadow-lg"
            ></div>
          </div>
        </div>

        <!-- <label
            class="flex flex-col p-4 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'one' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="one"
              />
              <div
                class="flex flex-col justify-between w-full my-auto text-gray-500 ms-3 sm:flex-row"
              >
                <div class="flex flex-col sm:flex-row">
                  <span class="my-auto">Debit/Creadit Card</span>
                  <span class="my-auto text-sm text-gray-400 sm:ms-3">
                    (no cast EMI available)
                 </span>
                </div>
                <div class="flex flex-row mt-1 md:mt-0">
                  <img
                    v-lazy="`/img/Mastercard-logo.png?tr=w-40,h-24,fo-auto`"
                    alt="mastercard"
                    class="w-10 h-6 p-1 my-auto border me-2"
                  />
                  <img
                    v-lazy="`/img/rupay-logo.png?tr=w-40,h-24,fo-auto`"
                    alt="rupay"
                    class="w-10 h-6 p-1 my-auto border me-2"
                  />
                  <img
                    v-lazy="`/img/visa.png?tr=w-40,h-24,fo-auto`"
                    alt="visa"
                    class="w-10 h-6 p-1 my-auto border me-2"
                  />
                  <img
                    v-lazy="`/img/american.jpg?tr=w-40,h-24,fo-auto`
                    alt="ae"
                    class="w-10 h-6 p-1 my-auto border"
                  />
                </div>
              </div>
            </div>
            <div v-if="picked == 'one'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label>
          <label
            class="flex flex-col p-4 mt-5 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'five' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="five"
              />
              <div
                class="flex flex-row justify-between w-full text-gray-500 ms-3"
              >
                <div class="flex flex-row my-auto">
                  <span class="my-auto">Net Banking</span>
                  <span class="my-auto text-sm text-gray-400 ms-3">
                    (Online Transaction)
                 </span>
                </div>
                <div class="flex flex-row">
                  <svg
                    class="w-6 h-6 my-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div v-if="picked == 'five'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label> -->
        <!-- <label
            class="flex flex-col p-4 mt-5 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'two' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                color="red"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="two"
              />
              <div
                class="flex flex-row justify-between w-full text-gray-500 ms-3"
              >
                <div class="flex flex-col my-auto sm:flex-row">
                  </span>Paypal</span>
                  <span class="my-auto text-sm text-gray-400 sm:ms-3">
                    (International Transaction)
                 </span>
                </div>
                <div class="my-auto">
                  <img
                    v-lazy="`/img/paypal-logo-png-transparent.png?tr=w-64,h-28,fo-auto`
                    alt="paypal"
                    class="w-16 p-1 my-auto border h-7"
                  />
                </div>
              </div>
            </div>
            <div v-if="picked == 'two'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label> -->

        <!-- <label
            class="flex flex-col p-4 mt-5 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'three' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="three"
              />
              <span class="flex flex-row text-gray-500 ms-3"
                >PDO
                <span class="my-auto text-sm text-gray-400 ms-3">
                  (Pay on Delivery)
               </span>
                <span class="my-auto text-sm text-gray-400 ms-3">
                  (Cash/Card/UPI)
               </span></span
              >
            </div>
            <div v-if="picked == 'three'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label>

          <label
            class="flex flex-col p-4 mt-5 bg-white border rounded shadow cursor-pointer hover:shadow-lg"
            :class="{ 'border-secondary-500': picked == 'four' }"
          >
            <div class="flex flex-row">
              <input
                type="radio"
                name="group"
                class="w-5 h-5 my-auto me-3 text-secondary-500 focus:ring-1 focus:ring-secondary-500"
                v-model="picked"
                value="four"
              />
              <div
                class="flex flex-row justify-between w-full text-gray-500 ms-3"
              >
                <div class="flex flex-col my-auto sm:flex-row">
                  <span class="my-auto">UPI</span>
                  <span class="my-auto text-sm text-gray-400 sm:ms-3">
                    (using UPI ID)
                 </span>
                </div>
                <div class="flex flex-row">
                  <img
                    v-lazy="`/img/phonepe-india.jpg?tr=w-24,h-24,fo-auto`
                    alt="mastercard"
                    class="w-6 h-6 my-auto border rounded-full me-2"
                  />
                  <img
                    v-lazy="`/img/Google-Pay-Logo-Icon-PNG.png?tr=w-24,h-24,fo-auto`
                    alt="rupay"
                    class="w-6 h-6 p-1 my-auto border rounded-full me-2"
                  />
                  <img
                    v-lazy="`/img/upi-logo.png?tr=w-40,h-24,fo-auto`
                    alt="ae"
                    class="w-10 h-6 p-1 my-auto border"
                  />
                </div>
              </div>
            </div>
            <div v-if="picked == 'four'" class="mt-4">
              <DebitCreditCard />
            </div>
          </label> -->
      </div>

      <div class="lg:w-1/3 pb-10">
        <div class="text-lg font-bold tracking-wide mb-3">Cart Summary</div>

        <hr class="border-t border-gray-200 mb-2" />

        <CheckoutSummary :loading="loading" class="mb-5" @submit="submit">
          <span v-if="paymentMethod && paymentMethod.value == 'COD'"
            >Place Order</span
          >
          <span v-else-if="razorpayReady && loadedStripe">Pay Now</span>
        </CheckoutSummary>

        <div class="text-lg font-bold tracking-wide mb-3">
          Delivery Address:
        </div>

        <hr class="border-t border-gray-200 my-3" />

        <h5 v-if="address" class="mb-2 capitalize font-semibold tracking-wide">
          {{ address.firstName }}
          {{ address.lastName }}
        </h5>

        <div>
          <div class="mb-3 text-xs font-light flex flex-wrap">
            {{ address.address }}, {{ address.city }}, {{ address.state }},
            {{ address.country }} - {{ address.zip }}
          </div>

          <div class="mb-3 text-xs space-x-2">
            <span>Mobile : </span>
            <span class="font-semibold"> {{ address.phone }}</span>
          </div>

          <div class="mb-5 text-xs space-x-2">
            <span>Email : </span>
            <span class="font-semibold"> {{ address.email }}</span>
          </div>
        </div>

        <CheckoutSummary class="sm:hidden" :loading="loading" @submit="submit">
          <span v-if="paymentMethod && paymentMethod.value === 'COD'"
            >Place Order</span
          >
          <span v-else-if="razorpayReady && loadedStripe">Pay Now</span>
        </CheckoutSummary>
        <!-- <Footer class="hidden sm:flex" /> -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { Radio } from '~/shared/components/ui'
import ADDRESS from '~/gql/address/address.gql'
// import DebitCreditCard from '~/components/Checkout/PaymentOptions/DebitCreditCard'
import STRIPE_MUTATION from '~/gql/pay/stripe.gql'
import PAYMENT_METHODS from '~/gql/payment/paymentMethods.gql'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')
const CheckoutSummary = () =>
  import('~/components/Checkout/CheckoutSummary.vue')
export default {
  components: {
    CheckoutHeader,
    CheckoutSummary,
    // DebitCreditCard,
    Radio,
  },
  middleware({ store, redirect }) {
    if (store.state.cart.qty < 1) return redirect('/cart')
  },
  data() {
    return {
      paymentMethods: null,
      loading: false,
      paymentMethod: null,
      razorpayReady: false,
      stripeReady: false,
      loadedStripe: false,
      complete: false,
      isOpen: false,
      picked: false,
      address: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        town: '',
        city: '',
        country: '',
        zip: '',
        phone: '',
      },
    }
  },
  head() {
    return {
      title: 'Payment',
    }
  },
  //  async mounted() {
  // this.address = await this.$axios.$get(
  //   `api/addresses/${this.$route.query.address}`
  // );
  // },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      cart: 'cart/cart',
      settings: 'settings',
    }),
    disable() {
      if (this.paymentMethod.value === 'Stripe')
        return !this.complete || this.errors.any()
      else return this.errors.any()
    },
  },
  async created() {
    this.$store.dispatch('cart/fetch')
    await this.getPaymentMethods()
    await this.loadStripe()
  },
  methods: {
    ...mapActions({
      applyDiscount: 'cart/applyDiscount',
      checkout: 'cart/checkout',
    }),
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async getPaymentMethods() {
      try {
        this.loading = true
        const paymentMethods = await this.$get('payment/paymentMethods', {
          active: true,
        })
        // const paymentMethods = (
        //   await this.$apollo.query({
        //     query: PAYMENT_METHODS,
        //     variables: { active: true },
        //   })
        // ).data.paymentMethods
        if (paymentMethods && paymentMethods.data) {
          this.paymentMethods = paymentMethods.data
          this.paymentMethod =
            paymentMethods.data[0] && paymentMethods.data[0].value
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    async loadStripe() {
      try {
        this.loading = true
        this.clearErr()
        // const id = this.$route.query.address
        // if(!id)
        this.address = await this.getAddress()
        const razorpayScript = document.createElement('script')
        razorpayScript.setAttribute(
          'src',
          'https://checkout.razorpay.com/v1/checkout.js'
        )
        document.head.appendChild(razorpayScript)
        this.razorpayReady = true

        if (process.browser) {
          const domElement = document.createElement('script')
          domElement.setAttribute('src', 'https://js.stripe.com/v3/')
          domElement.onload = () => {
            this.loadedStripe = true
          }
          document.body.appendChild(domElement)
        }
        // let stripeScript = document.createElement('script')
        // stripeScript.setAttribute('src', 'https://js.stripe.com/v3/')
        // document.head.appendChild(stripeScript)
        // this.stripeReady = true
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },
    async submit() {
      // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', this.paymentMethod.value)
      if (!this.paymentMethod || !this.paymentMethod.value) {
        this.setErr('Please Select Payment Method')
      }
      const paymentMethod = this.paymentMethod.value
      if (this.loading) return
      if (this.address) {
        delete this.address.__typename
        delete this.address.createdAt
        delete this.address.updatedAt
        if (this.address.coords) delete this.address.coords.__typename
      }
      this.clearErr()
      if (paymentMethod === 'COD') {
        try {
          this.loading = true
          await this.checkout({
            paymentMethod: 'COD',
            address: this.$route.query.address,
          })
        } catch (e) {
          // this.setErr(e)
        } finally {
          this.loading = false
        }
      } else if (paymentMethod === 'Stripe') {
        try {
          this.loading = true
          const { token } = await createToken()
          if (!token) return this.setErr('Invalid card number')
          const capture = await this.$post('pay/stripe', {
            address: this.$route.query.address,
            token: token.id,
          })
          // const capture = (
          //   await this.$apollo.mutate({
          //     mutation: STRIPE_MUTATION,
          //     variables: {
          //       address: this.$route.query.address,
          //       token: token.id,
          //     },
          //   })
          // ).data.stripe
          this.$router.push(`/payment/success?id=${capture.id}?provider=Stripe`)
        } catch (e) {
          this.setErr(e)
        } finally {
          this.loading = false
        }
      } else if (paymentMethod === 'Cashfree') {
        try {
          this.loading = true
          this.clearErr()
          await this.checkout({
            paymentMethod: 'Cashfree',
            address: this.$route.query.address,
          })
        } catch (e) {
          // this.setErr(e)
        } finally {
          this.loading = false
          this.busy(false)
        }
      } else if (paymentMethod === 'Paypal') {
        try {
          this.loading = true
          this.clearErr()
          await this.checkout({
            paymentMethod: 'Paypal',
            address: this.$route.query.address,
          })
        } catch (e) {
          // this.setErr(e)
        } finally {
          this.loading = false
          this.busy(false)
        }
      } else if (paymentMethod === 'Razorpay') {
        try {
          const options = await this.checkout({
            paymentMethod: 'Razorpay',
            address: this.$route.query.address,
          })
          const rzp1 = new Razorpay(options)
          rzp1.open()
        } catch (e) {
          this.setErr(e)
        } finally {
          this.loading = false
          this.busy(false)
        }
      } else {
        this.setErr('Please Select Payment Method')
      }
    },
    async getAddress() {
      try {
        this.loading = true
        return await this.$get('address/address', {
          id: this.$route.query.address,
        })
        // return (
        //   await this.$apollo.query({
        //     query: ADDRESS,
        //     variables: { id: this.$route.query.address },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.address
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
