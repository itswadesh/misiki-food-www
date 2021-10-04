<template>
  <section
    class="
      container
      mx-auto
      bg-white
      min-h-screen
      px-2
      py-5
      sm:p-10
      text-gray-700
    "
  >
    <OrderSuccessSkeleton v-if="!order && loading" />

    <div v-else-if="order">
      <div class="text-center">
        <div class="mb-5 sm:mb-10">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <h2 v-if="order" class="mb-5 text-2xl sm:text-3xl font-bold">
          Thank You For Your Purchase !!
        </h2>

        <h5
          class="
            mb-2
            flex
            items-center
            justify-center
            space-x-2
            text-sm
            sm:text-base
          "
        >
          <span class="text-gray-500">Order Number:</span>
          <b>
            {{ order.orderNo }}
          </b>
        </h5>

        <p class="mb-4 sm:mb-9 text-sm">
          Your Order was place on <b>{{ order.createdAt | date }}</b> <br />
          A Confirmation e-mail will be sent to the e-mail Address(es) that you
          specified in Order details.
        </p>

        <div
          class="
            mb-4
            sm:mb-7
            flex flex-wrap
            items-center
            justify-center
            text-sm
            sm:text-base
          "
        >
          <nuxt-link
            :to="localePath('/my/orders')"
            rel="noopener"
            class="m-1 sm:m-3"
          >
            <PrimaryButtonRounded class="whitespace-nowrap">
              View Order Details
            </PrimaryButtonRounded>
          </nuxt-link>

          <nuxt-link :to="localePath('/')" rel="noopener" class="m-1 sm:m-3">
            <button
              class="
                flex
                items-center
                justify-center
                px-4
                py-2
                space-x-1
                font-semibold
                text-gray-700
                bg-white
                border border-gray-700
                whitespace-nowrap
                tracking-wide
                transition
                duration-300
                transform
                rounded-md
                shadow-md
                active:scale-95
                hover:shadow hover:bg-opacity-80
                focus:outline-none
                focus:ring-2
                focus:ring-gray-400
                focus:ring-offset-2
              "
            >
              Continue Shopping
            </button>
          </nuxt-link>
        </div>
      </div>

      <div
        class="
          sm:flex sm:items-start sm:justify-center
          space-y-5
          sm:space-y-0 sm:space-x-10
          md:space-x-20
        "
      >
        <div class="sm:w-1/2 flex flex-col justify-center">
          <div class="mb-5">
            <h6
              class="
                mb-2
                text-base
                sm:text-lg
                font-semibold
                border-b border-dashed border-gray-400
                pb-1
              "
            >
              Item Details
            </h6>

            <div
              v-for="(item, ix) in order.items"
              :key="ix"
              class="flex flex-row justify-between w-full pb-6 lg:pb-0"
              :class="{ 'border-b': ix != order.items.length - 1 }"
            >
              <div class="flex flex-row w-full my-3">
                <nuxt-link
                  :to="localePath(`/${item.slug}?id=${item.pid}`)"
                  rel="noopener"
                  class=""
                >
                  <img
                    v-lazy="`${item.img}?tr=w-112,fo-auto`"
                    alt="pro"
                    class="object-cover border w-28"
                  />
                </nuxt-link>
                <div class="relative flex flex-col w-4/5 ms-3 lg:w-10/12">
                  <nuxt-link
                    :to="localePath(`/${item.slug}?id=${item.pid}`)"
                    rel="noopener"
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
                      <div class="font-light text-gray-400 me-1">Price:</div>
                      <div class="text-secondary-200">
                        {{
                          item.price
                            | currency(
                              store.currencySymbol,
                              store.currencyDecimals
                            )
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
                  {{ item.price | currency(store.currencySymbol,2) }}
                </div>
              </div> -->
            </div>
          </div>

          <div v-if="order && order.amount" class="text-sm">
            <h6
              class="
                mb-2
                text-base
                sm:text-lg
                font-semibold
                border-b border-dashed border-gray-400
                pb-1
              "
            >
              Payment Information
            </h6>

            <div v-if="order.amount.subtotal" class="mb-3">
              <span class="font-semibold"> Subtotal :</span>

              {{
                order.amount.subtotal
                  | currency(store.currencySymbol, store.currencyDecimals)
              }}
            </div>

            <div v-if="order.amount.discount" class="mb-3">
              <span class="font-semibold"> Discount :</span>

              {{
                order.amount.discount
                  | currency(store.currencySymbol, store.currencyDecimals)
              }},
            </div>

            <div v-if="order.amount.shipping" class="mb-3">
              <span class="font-semibold"> Shipping : </span>

              {{
                order.amount.shipping
                  | currency(store.currencySymbol, store.currencyDecimals)
              }}
            </div>

            <div v-if="order.amount.total" class="mb-3">
              <span class="font-semibold">Total :</span>

              {{
                order.amount.total
                  | currency(store.currencySymbol, store.currencyDecimals)
              }}
            </div>
          </div>
        </div>

        <div class="sm:w-1/2 flex flex-col justify-center">
          <div v-if="order && order.address" class="text-sm">
            <h6
              class="
                mb-2
                text-base
                sm:text-lg
                font-semibold
                border-b border-dashed border-gray-400
                pb-1
              "
            >
              Shipping Information
            </h6>

            <h5
              class="mb-3 sm:text-base capitalize font-semibold tracking-wide"
            >
              {{ order.address.firstName }}

              {{ order.address.lastName }}
            </h5>

            <div class="mb-3 flex flex-col">
              <span class="flex flex-wrap"> {{ order.address.address }}, </span>

              <span class="flex flex-wrap">
                {{ order.address.city }}, {{ order.address.state }},

                {{ order.address.country }} - {{ order.address.zip }}</span
              >
            </div>

            <div class="mb-3 space-x-2 whitespace-nowrap">
              <span>Mobile : </span>

              <span class="font-semibold"> {{ order.address.phone }}</span>
            </div>

            <div class="mb-5 sm:space-x-2 whitespace-nowrap">
              <span>Email : </span>

              <span class="font-semibold"> {{ order.address.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <h3 class="flex flex-row justify-center lg:justify-between">
      <div class="flex-row hidden -mt-6 text-secondary-500 px-auto lg:flex">
        <h3
          class="
            flex flex-row
            h-8
            p-1
            px-2
            rounded
            cursor-pointer
            me-3
            hover:shadow hover:bg-blue-100
          "
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
          class="
            flex flex-row
            h-8
            p-1
            px-6
            rounded
            cursor-pointer
            hover:shadow hover:bg-blue-100
          "
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
      </div>
    </h3>
    <div v-if="order">
      <div class="flex flex-row pt-3 text-secondary-500 lg:hidden">
        <h3 class="flex flex-row me-6">
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
        </h3>
      </div>
    </div>
    <div
      v-if="order"
      class="flex flex-col w-full mt-6 text-sm text-gray-500 lg:flex-row"
    >
      <div class="w-full p-6 bg-white border shadow me-6 lg:w-1/2">
        <span class="text-lg font-medium">Billing Information</span>
        <span class="flex flex-row my-2">
          <h2 class="w-10 h-6 my-auto me-4">
            <img
              v-lazy="`/img/visa.png?tr=w-40,h-24,fo-auto`"
              alt="visa"
              class="object-contain"
            />
          </h2>
          <h2 class="flex flex-col">
            <span>XXXX XXXX XXXX XX36</span>
            <span>Exp: 12/2026</span>
          </h2>
        </span>
        <span class="my-4 underline text-primary-500">Billing Address</span>
        <span>Name: Bipin B</span>
        <span class="w-2/3 my-2">
          Address: Door no: 23/2, ss-p Colony Wiler Road, First Street,
        </span>
        <span>Austin, Texas, U,S</span>
        <span class="my-2">Pin: 1000021</span>
        <span class="underline">+1 1256 121 121</span>
        <span class="mt-2 underline">vipin.b8896@outlok.vom</span>
      </div>
    </div> -->
  </section>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import ORDER from '~/gql/order/order.gql'
import PAY_SUCCESS_PAGE_HIT from '~/gql/order/paySuccessPageHit.gql'
// import SUBSCRIPTION_ORDER_UPDATED from '~/gql/order/SUBSCRIPTION_ORDER_UPDATED.gql'
import NuxtLink from '~/components/NuxtLink.vue'
import OrderSuccessSkeleton from '~/components/Order/SuccessSkeleton.vue'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: { OrderSuccessSkeleton, PrimaryButtonRounded, NuxtLink },
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
  //         const currentStatus = this.store.orderStatuses.filter(
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
      store: 'store',
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

<style scoped>
.success-animation {
  margin: 150px auto;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 4;
  stroke: #4bb71b;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #4bb71b;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
  position: relative;
  top: 5px;
  right: 5px;
  margin: 0 auto;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 4;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: #fff;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #4bb71b;
  }
}
</style>
