<template>
  <section
    class="container mx-auto max-w-5xl px-2 sm:px-10 mb-10 text-gray-700"
  >
    <CheckoutHeader selected="payment" class="py-5 sm:py-10" />

    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="lg:w-2/3 lg:border-r lg:border-gray-200 lg:pe-5">
        <div class="text-lg font-bold tracking-wide mb-3">Payment Methods</div>

        <div v-if="paymentMethods && paymentMethods.length > 0" class="mb-5">
          <div
            v-if="errorMessage"
            class="
              mb-3
              sm:mb-5
              bg-red-50
              p-3
              sm:p-5
              text-red-500 text-sm
              font-light
              tracking-wide
              border border-red-300
              rounded
            "
          >
            {{ errorMessage }}
          </div>

          <div v-for="p in paymentMethods" :key="p.id">
            <label
              class="
                p-3
                sm:p-5
                flex
                items-center
                space-x-5
                w-full
                mb-3
                sm:mb-5
                border
                rounded
                shadow-md
                cursor-pointer
              "
            >
              <div class="flex items-center space-x-5">
                <Radio
                  v-model="paymentMethod"
                  :value="p"
                  :color="p.color"
                  @change="setupStripeElement"
                />

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
              v-show="
                paymentMethod &&
                paymentMethod.value === 'Stripe' &&
                p.value === 'Stripe'
              "
              class="px-6 py-4 mb-3 sm:mb-5 border rounded shadow-md"
            >
              <h6
                v-if="loadingStripe"
                class="text-sm text-center text-gray-500"
              >
                Loading Stripe ...
              </h6>

              <div v-else id="card" ref="card"></div>
            </div>
          </div>

          <div
            v-show="paymentMethod && paymentMethod.value === 'Paypal'"
            id="dropin-container"
          />
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

        <hr class="border-t border-gray-200 mb-3 sm:mb-5" />

        <CheckoutSummary
          :loading="loading"
          class="mb-5"
          :disabled="!enableStripeCheckoutButton"
          @submit="submit"
        >
          <span v-if="paymentMethod && paymentMethod.value == 'COD'">
            Place Order
          </span>

          <span
            v-else-if="
              paymentMethod.value === 'Stripe' && !enableStripeCheckoutButton
            "
          >
            Please fill credit card details
          </span>

          <span v-else>Pay Now</span>
        </CheckoutSummary>

        <div class="text-lg font-bold tracking-wide mb-3">
          Delivery Address:
        </div>

        <hr class="border-t border-gray-200 my-3" />

        <div v-if="address">
          <div v-if="loading" class="w-full animate-pulse">
            <div class="mb-2 bg-gray-200 h-4 w-2/3"></div>

            <div class="mb-2 bg-gray-200 h-4 w-1/3"></div>

            <div class="mb-2 bg-gray-200 h-4 w-1/2"></div>

            <div class="mb-2 bg-gray-200 h-4 w-3/4"></div>
          </div>

          <div v-else>
            <h5 class="mb-3 capitalize font-semibold tracking-wide">
              {{ address.firstName }}

              {{ address.lastName }}
            </h5>

            <div class="mb-3 text-xs font-light flex flex-wrap">
              <span v-show="address.address" class="me-1"
                >{{ address.address }},</span
              >

              <span v-show="address.city" class="me-1"
                >{{ address.city }},</span
              >

              <span v-show="address.state" class="me-1"
                >{{ address.state }},</span
              >

              <span v-show="address.country" class="me-1">{{
                address.country
              }}</span>

              <span v-show="address.zip">- {{ address.zip }}</span>
            </div>

            <div v-show="address.phone" class="mb-3 text-xs space-x-2">
              <span>Mobile : </span>

              <span class="font-semibold"> {{ address.phone }}</span>
            </div>

            <div v-show="address.email" class="mb-5 text-xs space-x-2">
              <span>Email : </span>

              <span class="font-semibold"> {{ address.email }}</span>
            </div>
          </div>
        </div>

        <CheckoutSummary
          class="sm:hidden"
          :loading="loading"
          :disabled="!enableStripeCheckoutButton"
          @submit="submit"
        >
          <span v-if="paymentMethod && paymentMethod.value === 'COD'">
            Place Order
          </span>

          <span
            v-else-if="
              paymentMethod.value === 'Stripe' && !enableStripeCheckoutButton
            "
          >
            Please fill credit card details
          </span>

          <span v-else>Pay Now</span>
        </CheckoutSummary>

        <!-- <Toast v-if="true">
          Stripe Credit Card Details Addition Completed
        </Toast> -->

        <!-- <Footer class="hidden sm:flex" /> -->

        <!-- <form id="payment-form" action="/route/on/your/server" method="post">
        <button type="submit">Make Payment</button>
        <input id="nonce" type="hidden" name="payment_method_nonce" />
      </form> -->
        <!-- <v-braintree
        authorization="sandbox_s9rx6c2c_x742hzxzgx6gk233"
        :paypal="{ flow: 'vault' }"
        @load="onBraintreeLoad"
        @loadFail="onBraintreeLoadFail"
        @success="onBraintreeSuccess"
        @error="onBraintreeError"
      ></v-braintree> -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { Radio, Toast } from '~/shared/components/ui'
import ADDRESS from '~/gql/address/address.gql'
// import DebitCreditCard from '~/components/Checkout/PaymentOptions/DebitCreditCard'
import STRIPE_MUTATION from '~/gql/pay/stripe.gql'
import PAYMENT_METHODS from '~/gql/payment/paymentMethods.gql'
// import { StripeElementCard } from '@vue-stripe/vue-stripe'
// import braintree from 'braintree-web-drop-in'

const dropin = require('braintree-web-drop-in')

const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader.vue')

const CheckoutSummary = () =>
  import('~/components/Checkout/CheckoutSummary.vue')

export default {
  components: {
    CheckoutHeader,
    CheckoutSummary,
    // DebitCreditCard,
    Radio,
    Toast,
  },

  middleware({ store, redirect }) {
    if (store.state.cart.qty < 1) return redirect('/cart')
  },

  async asyncData({ $get }) {
    const paymentMethods = await $get('payment/paymentMethods', {
      active: true,
    })
    // if (paymentMethods && paymentMethods.data) {
    //       paymentMethods = paymentMethods.data
    // }
    return { paymentMethods: paymentMethods.data }
  },

  data() {
    return {
      braintreeToken: null,
      braintreeInstance: null,
      dropinInstance: null,
      loadingStripe: false,
      card: null,
      pulishableKey: null,
      // paymentMethods: null,
      loading: false,
      paymentMethod: {},
      razorpayReady: false,
      stripeReady: false,
      loadedStripe: false,
      errorMessage: null,
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

    enableStripeCheckoutButton() {
      if (this.paymentMethod.value === 'Stripe') return this.complete
      else return true
    },
  },

  async created() {
    this.$store.dispatch('cart/fetch')
    this.address = await this.getAddress()

    // await this.getPaymentMethods()
    // this.paymentMethod = this.paymentMethods[0] && this.paymentMethods[0].value
    // this.paymentMethod =
    //   this.paymentMethods.data[0] && this.paymentMethods.data[0].value
    // await this.loadRazorpay()
    // this.pulishableKey = this.settings.stripePublishableKey
  },

  mounted() {
    this.setupStripeElement()
    this.getDropinInstance()
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

    // onBraintreeLoad(instance) {
    //   this.braintreeInstance = instance
    // },
    // onBraintreeLoadFail() {
    //   alert('load fail')
    // },
    // onBraintreeSuccess() {
    //   const nonce = payload.nonce
    //   console.log('Success!', payload.nonce)
    // },
    // onBraintreeError() {
    //   const message = error.message
    //   console.log('Error!', error)
    // },

    // clearBraintreePaymentSelection() {
    //   if (this.instance != null) {
    //     this.instance.clearSelectedPaymentMethod()
    //   }
    // },

    setupStripeElement() {
      if (this.$stripe) {
        const elements = this.$stripe.elements()
        this.card = elements.create('card', {})
        // Add an instance of the card Element into the `card-element` <div>
        this.card.mount('#card')
        this.card.on('change', ({ error, complete, value }) => {
          if (complete) {
            this.complete = true
          }
        })
      }
    },

    // async purchase() {

    // },
    async payWithCard(clientSecret) {
      this.loading = true
      try {
        const result = await this.$stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: this.card },
        })
        if (result.error) {
          this.errorMessage = result.error.message
          // this.setErr(result.error.message)
        } else if (result.paymentIntent) {
          this.$router.push(
            `/payment/success?paymentReferenceId=${result.paymentIntent.id}`
          )
        }
      } catch (e) {
        console.log('erorrrr............', e)
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },

    // async getPaymentMethods() {
    //   try {
    //     this.loading = true
    //     const paymentMethods = await this.$get('payment/paymentMethods', {
    //       active: true,
    //     })
    //     // const paymentMethods = (
    //     //   await this.$apollo.query({
    //     //     query: PAYMENT_METHODS,
    //     //     variables: { active: true },
    //     //   })
    //     // ).data.paymentMethods
    //     if (paymentMethods && paymentMethods.data) {
    //       this.paymentMethods = paymentMethods.data
    //       this.paymentMethod =
    //         paymentMethods.data[0] && paymentMethods.data[0].value
    //       this.setupStripeElement()
    //     }
    //   } catch (e) {
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // loadRazorpay() {
    //   try {
    //     this.loading = true
    //     this.clearErr()
    //     // const id = this.$route.query.address
    //     // if(!id)
    //     const razorpayScript = document.createElement('script')
    //     razorpayScript.setAttribute(
    //       'src',
    //       'https://checkout.razorpay.com/v1/checkout.js'
    //     )
    //     document.head.appendChild(razorpayScript)
    //     this.razorpayReady = true
    //     // this.loadedStripe = true
    //     // if (process.browser) {
    //     //   const domElement = document.createElement('script')
    //     //   domElement.setAttribute('src', 'https://js.stripe.com/v3/')
    //     //   domElement.onload = () => {
    //     //     this.loadedStripe = true
    //     //     // const {
    //     //     //   Card,
    //     //     //   createToken,
    //     //     //   CardNumber,
    //     //     // } = require('vue-stripe-elements-plus')
    //     //   }
    //     //   document.body.appendChild(domElement)
    //     // }
    //     // let stripeScript = document.createElement('script')
    //     // stripeScript.setAttribute('src', 'https://js.stripe.com/v3/')
    //     // document.head.appendChild(stripeScript)
    //     // this.stripeReady = true
    //   } catch (e) {
    //     this.setErr(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // async stripeTokenCreated(token) {
    //   console.log('token...........', token, this.$stripe.confirmCardPayment)
    //   try {
    //     this.loading = true
    //     // const groupComponent = this.$refs.elms
    //     // const cardComponent = this.$refs.card
    //     // const cardElement = cardComponent.stripeElement
    //     // const { token } = await groupComponent.instance.createToken()
    //     // import { StripeElementCard } from '@vue-stripe/vue-stripe'
    //     if (!token) return this.setErr('Invalid card number')
    //     const capture = await this.$post('pay/stripe', {
    //       address: this.$route.query.address,
    //       token: token.id,
    //     })
    //     // const capture = (
    //     //   await this.$apollo.mutate({
    //     //     mutation: STRIPE_MUTATION,
    //     //     variables: {
    //     //       address: this.$route.query.address,
    //     //       token: token.id,
    //     //     },
    //     //   })
    //     // ).data.stripe
    //     this.$router.push(`/payment/success?id=${capture.id}`)
    //   } catch (e) {
    //     this.setErr(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },

    async submit() {
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
        let pm
        try {
          pm = await this.$stripe.createPaymentMethod({
            type: 'card',
            card: this.card,
          })
        } catch (e) {}
        if (!pm.paymentMethod)
          return this.setErr('Credit card details incorrect.')
        // this.$stripe.confirmCardPayment()
        if (pm.paymentMethod) {
          try {
            const res = await this.$get('pay/stripe', {
              paymentMethodId: pm.paymentMethod.id,
              address: this.$route.query.address,
            })
            this.payWithCard(res.clientSecret)
            // console.log('pay/stripe', res)
          } catch (e) {
            this.setErr(e)
          }
        }
        // this.$refs.stripeElementRef[0].submit()
        // try {
        //   this.loading = true
        //   // const groupComponent = this.$refs.elms
        //   // const cardComponent = this.$refs.card
        //   // const cardElement = cardComponent.stripeElement
        //   // const { token } = await groupComponent.instance.createToken()
        //   // import { StripeElementCard } from '@vue-stripe/vue-stripe'
        //   if (!token) return this.setErr('Invalid card number')
        //   const capture = await this.$post('pay/stripe', {
        //     address: this.$route.query.address,
        //     token: token.id,
        //   })
        //   // const capture = (
        //   //   await this.$apollo.mutate({
        //   //     mutation: STRIPE_MUTATION,
        //   //     variables: {
        //   //       address: this.$route.query.address,
        //   //       token: token.id,
        //   //     },
        //   //   })
        //   // ).data.stripe
        //   this.$router.push(`/payment/success?id=${capture.id}?provider=Stripe`)
        // } catch (e) {
        //   this.setErr(e)
        // } finally {
        //   this.loading = false
        // }
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
        const vm = this
        console.log('dropinInstance.............', this.dropinInstance)
        this.dropinInstance.requestPaymentMethod(function (err, payload) {
          if (err) {
            console.log('err...............', err)
            vm.setErr(err)
            // Handle errors in requesting payment method
          }
          console.log(
            'Send to server..............',
            payload.nonce,
            vm.braintreeToken
          )
          // try {
          //   const result = await vm.$get('pay/braintreeMakePayment', {
          //     nonce: payload.nonce,
          //     token: vm.braintreeToken,
          //   })
          //   vm.$router.push(`/payment/success?id=${result.id}`)
          // } catch (e) {}
          // Send payload.nonce to your server
        })
        // } else if (paymentMethod === 'Paypal') {
        //   try {
        //     this.loading = true
        //     this.clearErr()
        //     await this.checkout({
        //       paymentMethod: 'Paypal',
        //       address: this.$route.query.address,
        //     })
        //   } catch (e) {
        //     // this.setErr(e)
        //   } finally {
        //     this.loading = false
        //     this.busy(false)
        //   }
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
    async getDropinInstance() {
      try {
        // const submitButton = (this.$refs.this.loading = true)
        this.clearErr()
        const braintreeT = await this.$get('pay/braintreeToken', {
          address: this.$route.query.address,
        })
        this.braintreeToken = braintreeT.token
        const dropinInstance = await dropin.create({
          // Step three: get client token from your server, such as via
          //    templates or async http request
          authorization: this.braintreeToken,
          container: '#dropin-container',
        })
        // .then((dropinInstance) => {
        this.dropinInstance = dropinInstance
        // if (err) {
        //   // Handle any errors that might've occurred when creating Drop-in
        //   console.error(err)
        //   return
        // }
        // submitButton.addEventListener('click', function () {
        //   dropinInstance.requestPaymentMethod(function (err, payload) {
        //     if (err) {
        //       console.log('err..........', err)
        //       // Handle errors in requesting payment method
        //     }
        //     console.log('submitButton success')
        //     // Send payload.nonce to your server
        //   })
        // })
        // Use `dropinInstance` here
        // Methods documented at https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html
        // })
        // .catch((error) => {})
      } catch (e) {
        console.log('rrrrrrrrrrrrrrrrrrr', e)
        // this.setErr(e)
      } finally {
        this.loading = false
        this.busy(false)
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
