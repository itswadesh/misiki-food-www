<template>
  <div class="container mx-auto bg-white rounded-lg">
    <div class="h-full max-w-full p-2 sm:p-3 lg:p-8">
      <div class="flex flex-col">
        <div class="p-2 sm:p-4 lg:mt-12 lg:p-12">
          <div class="">
            <div
              class="flex items-center justify-center rounded-full lg:-mt-28"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-24 h-24 text-secondary-200 md:w-28 md:h-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h2 v-if="order" class="text-3xl font-bold text-center">
              Paid:
              {{ order.amount.total | currency(settings.currencySymbol, 2) }}
            </h2>
            <h3
              class="
                flex flex-row
                justify-center
                pt-4 pt:mt-0
                lg:justify-between
              "
            >
              <div class="text-2xl font-medium text-gray-700">
                Thanks for your Order!!
              </div>
              <!-- <div
                class="flex-row hidden -mt-6 text-secondary-500 px-auto lg:flex"
              >
                <h3
                  class="flex flex-row h-8 p-1 px-2 rounded cursor-pointer me-3 hover:shadow hover:bg-blue-100"
                >
                  <div class="me-1">Invoice</div>
                  <svg
                    class="w-4 h-4 my-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </h3>
                <h3
                  class="flex flex-row h-8 p-1 px-6 rounded cursor-pointer hover:shadow hover:bg-blue-100"
                >
                  <div class="me-1">Print</div>
                  <svg
                    class="w-4 h-4 my-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </h3>
              </div> -->
            </h3>
            <OrderSuccessSkeleton v-if="!order && loading" />
            <div v-else-if="order">
              <h3
                class="
                  flex flex-row
                  justify-center
                  mt-1
                  font-medium
                  lg:justify-start
                "
              >
                <div class="text-gray-500 me-2">Order Number:</div>
                <div
                  class="underline text-secondary-500 underline-secondary-500"
                >
                  {{ order.orderNo }}
                </div>
              </h3>
              <div
                class="
                  flex flex-col
                  justify-center
                  w-full
                  lg:justify-between lg:flex-row
                  py-7
                "
              >
                <!-- {{ order.createdAt }} -->
                <div
                  class="
                    w-full
                    text-sm
                    font-light
                    text-center text-gray-500
                    lg:text-start lg:w-3/5
                  "
                >
                  Your Order was place on <b>{{ order.createdAt | date }}</b> .
                  A Confirmation e-mail will be sent to the e-mail Address(es)
                  that you specified in Order details.
                </div>
                <div class="flex flex-row justify-center mt-6 text-sm lg:mt-0">
                  <nuxt-link :to="localePath('/my/orders')">
                    <button
                      class="
                        p-2
                        text-white
                        bg-primary-500
                        border-primary-500 border
                        rounded
                        shadow
                        px-4
                        lg:px-3 lg:p-2
                        focus:outline-none
                        duration-200
                        hover:-translate-y-0.5
                        transition
                        transform
                        ease-in-out
                        focus:ring-opacity-50
                        focus:ring
                        focus:ring-offset-2
                        focus:ring-primary-500
                      "
                    >
                      View Order Details
                    </button>
                  </nuxt-link>
                  <nuxt-link :to="localePath('/')">
                    <button
                      class="
                        p-2
                        my-auto
                        ms-4
                        text-secondary-200
                        border border-secondary-200
                        rounded
                        shadow
                        focus:outline-none
                        md:py-2
                        px-4
                        lg:px-3 lg:p-2
                        duration-200
                        hover:-translate-y-0.5
                        transition
                        transform
                        ease-in-out
                        focus:ring-opacity-50
                        hover:opacity-8
                        focus:ring focus:ring-offset-2 focus:ring-green-500
                      "
                    >
                      Continue Shopping
                    </button>
                  </nuxt-link>
                </div>
              </div>
              <!-- item details  -->
              <div>
                <div class="my-4 font-medium text-gray-700">Item Details</div>
                <div
                  v-for="(item, ix) in order.items"
                  :key="ix"
                  class="flex flex-row justify-between w-full pb-6 lg:pb-0"
                  :class="{ 'border-b': ix != order.items.length - 1 }"
                >
                  <div class="flex flex-row w-full my-3">
                    <nuxt-link
                      :to="localePath(`/${item.slug}?id=${item.pid}`)"
                      class=""
                    >
                      <img
                        v-lazy="item.img"
                        alt="pro"
                        class="object-cover border w-28"
                      />
                    </nuxt-link>
                    <div class="relative flex flex-col w-4/5 ms-3 lg:w-10/12">
                      <nuxt-link
                        :to="localePath(`/${item.slug}?id=${item.pid}`)"
                        class="text-base font-normal text-gray-600 truncate"
                      >
                        {{ item.name }}
                      </nuxt-link>
                      <div class="mt-2 text-xs text-primary-500 lg:text-sm">
                        {{ item.brandName }}
                      </div>
                      <!-- <div class="mt-1 text-xs text-primary-500 lg:text-sm">
                    <div v-for="(v, k) in JSON.parse(item.options)" :key="v">
                      {{ k }}={{ v }}
                    </div>
                  </div> -->
                      <div
                        class="
                          flex
                          items-center
                          justify-start
                          w-full
                          mt-2
                          text-sm
                          font-medium
                          text-gray-500
                        "
                      >
                        <div class="me-4">Qty: {{ item.qty }}</div>
                        <div
                          class="
                            flex flex-row
                            text-base
                            font-medium
                            justify-self-end
                            md:my-auto
                          "
                        >
                          <div class="font-light text-gray-400 me-1">
                            Price:
                          </div>
                          <div class="text-secondary-200">
                            {{
                              item.price | currency(settings.currencySymbol, 2)
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div
                class="flex-row hidden text-sm font-medium justify-self-end md:flex md:my-auto"
              >
                <div class="text-gray-400 me-1">Price:</div>
                <div class="text-green-400">
                  {{ item.price | currency(settings.currencySymbol,2) }}
                </div>
              </div> -->
                </div>
              </div>
              <div class="flex flex-row pt-3 text-secondary-500 lg:hidden">
                <!-- <h3 class="flex flex-row me-6">
              <div class="me-1">Invoice</div>
              <svg
                class="w-4 h-4 my-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
            </h3>
            <h3 class="flex flex-row">
              <div class="me-1">Print</div>
              <svg
                class="w-4 h-4 my-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </h3> -->
              </div>
            </div>
            <div
              v-if="order"
              class="
                flex flex-col
                w-full
                mt-6
                text-sm text-gray-500
                lg:flex-row
              "
            >
              <!-- <div class="w-full p-6 bg-white border shadow me-6 lg:w-1/2">
            <span class="text-lg font-medium">Billing Information</span>
            <span class="flex flex-row my-2">
              <h2 class="w-10 h-6 my-auto me-4">
                <img src="/img/visa.png" alt="visa" class="object-contain" />
              </h2>
              <h2 class="flex flex-col">
                </span>XXXX XXXX XXXX XX36</span>
                </span>Exp: 12/2026</span>
              </h2>
            </span>
            <span class="my-4 underline text-primary-500">Billing Address</span>
            </span>Name: Bipin B</span>
            <span class="w-2/3 my-2">
              Address: Door no: 23/2, ss-p Colony Wiler Road, First Street,
           </span>
            </span>Austin, Texas, U,S</span>
            <span class="my-2">Pin: 1000021</span>
            <span class="underline">+1 1256 121 121</span>
            <span class="mt-2 underline">vipin.b8896@outlok.vom</span>
          </div> -->
              <div
                v-if="order && order.address"
                class="w-full p-6 mt-6 me-2 shadow lg:mt-0 lg:w-1/2"
              >
                <div class="pb-2 text-lg font-medium border-b">
                  Shipping Information
                </div>
                <div class="my-4 text-base font-light">
                  <div v-if="order.address.firstName">
                    <strong> Name:</strong> {{ order.address.firstName }}
                    {{ order.address.lastName }}
                  </div>
                  <div v-if="order.address.address" class="w-2/3 my-2">
                    <strong> Address:</strong> {{ order.address.address }},
                  </div>
                  <div v-if="order.address.city">
                    {{ order.address.city }},{{ order.address.country }}
                  </div>
                  <div v-if="order.address.zip" class="my-2">
                    <strong> Pincode: </strong> {{ order.address.zip }}
                  </div>
                  <div v-if="order.address.phone" class="underline">
                    <strong>Phone:</strong> {{ order.address.phone }}
                  </div>
                  <div v-if="order.address.email" class="my-1 underline">
                    <strong>Email:</strong> {{ order.address.email }}
                  </div>
                </div>
              </div>
              <div
                v-if="order && order.amount"
                class="w-full p-6 mt-6 shadow lg:mt-0 lg:w-1/2"
              >
                <div class="pb-2 text-lg font-medium border-b">
                  Payment Information
                </div>
                <div class="my-4 text-base font-light">
                  <div v-if="order.amount.subtotal">
                    <strong> Subtotal:</strong>
                    {{
                      order.amount.subtotal
                        | currency(settings.currencySymbol, 2)
                    }}
                  </div>
                  <div v-if="order.amount.discount" class="w-2/3 my-2">
                    <strong> Discount:</strong>
                    {{
                      order.amount.discount
                        | currency(settings.currencySymbol, 2)
                    }},
                  </div>
                  <div v-if="order.amount.shipping" class="my-2">
                    <strong> Shipping: </strong>
                    {{
                      order.amount.shipping
                        | currency(settings.currencySymbol, 2)
                    }}
                  </div>
                  <div v-if="order.amount.total" class="underline">
                    <strong>Total:</strong>
                    {{
                      order.amount.total | currency(settings.currencySymbol, 2)
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import ORDER from '~/gql/order/order.gql'
import PAY_SUCCESS_PAGE_HIT from '~/gql/order/paySuccessPageHit.gql'
// import SUBSCRIPTION_ORDER_UPDATED from '~/gql/order/SUBSCRIPTION_ORDER_UPDATED.gql'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  data() {
    return {
      order: null,
      loading: false,
    }
  },
  head() {
    return {
      title: 'Thank You',
    }
  },
  // apollo: {
  //   $subscribe: {
  //     orderUpdated: {
  //       query: SUBSCRIPTION_ORDER_UPDATED,
  //       variables() {
  //         return {
  //           id: this.$route.query.id,
  //         }
  //       },
  //       result({ data }) {
  //         this.order = data.orderUpdated
  //         const status = this.order.items[0].status
  //         const currentStatus = this.settings.orderStatuses.filter(
  //           (s) => s.status == status
  //         )[0]
  //         Push.create(currentStatus.title, {
  //           body: currentStatus.body,
  //           icon: currentStatus.icon,
  //         })
  //       },
  //     },
  //   },
  // },
  computed: {
    ...mapGetters({
      settings: 'settings',
      user: 'auth/user',
      cart: 'cart/cart',
    }),
  },
  async mounted() {
    const paySuccessPageHit = await this.getPaySuccessPageHit()
    if (paySuccessPageHit < 2) {
      await this.clearCart()
      // await this.fetchCart()
    }
    await this.refresh()
    try {
      this.$refs.map.route(
        `${this.order.delivery.start.lat},${this.order.delivery.start.lng}`,
        `${this.order.delivery.finish.lat},${this.order.delivery.finish.lng}`
      )
    } catch (e) {
    } finally {
      this.loading = false
    }
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    ...mapActions({
      fetchCart: 'cart/fetch',
      clearCart: 'cart/clear',
    }),
    async getPaySuccessPageHit() {
      if (!this.$route.query.id) return
      try {
        return await this.$post('order/paySuccessPageHit', {
          id: this.$route.query.id,
        })
        // return (
        //   await this.$apollo.mutate({
        //     mutation: PAY_SUCCESS_PAGE_HIT,
        //     variables: { id: this.$route.query.id },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.paySuccessPageHit
      } catch (e) {
        return 0
      }
    },
    async refresh() {
      try {
        this.loading = true
        this.clearErr()
        this.order = await this.$get('order/order', {
          id: this.$route.query.id,
        })
        // this.order = (
        //   await this.$apollo.query({
        //     query: ORDER,
        //     variables: { id: this.$route.query.id },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.order
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
        this.loading = false
      }
    },
  },
}
</script>
