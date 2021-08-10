<template>
  <section
    v-if="order"
    class="p-4 md:p-8 xl:p-16 bg-white border shadow-md text-gray-700"
  >
    <!-- Order detail  -->
    <div class="md:flex md:justify-between border-b-2 border-gray-200 pb-10">
      <div class="md:w-1/2 md:border-r-2 md:border-gray-200">
        <div class="md:flex md:space-x-5">
          <nuxt-link :to="`/${order.slug}?id=${order.pid}`">
            <img
              :src="order.img"
              alt=""
              class="w-40 object-contain object-top mb-5 md:mb-0"
            />
          </nuxt-link>
          <div class="flex-1 md:pr-5">
            <nuxt-link :to="`/${order.slug}?id=${order.pid}`">
              <h4 class="text-xl font-medium">
                {{ order.name }}
              </h4>
            </nuxt-link>
            <div class="flex flex-wrap items-center text-sm whitespace-nowrap">
              <h5 class="mt-2 mr-5">Size: {{ order.size }}</h5>
              <h5 class="mt-2">Color: {{ order.color }}</h5>
            </div>
            <h6
              v-if="order.vendorInfo"
              class="mt-2 text-xs font-light text-gray-500"
            >
              Seller: {{ order.vendorInfo.firstName }}
              {{ order.vendorInfo.lastName }}
            </h6>
            <h4 class="mt-2 text-xl font-medium">
              {{ order.price | currency(settings.currencySymbol, 2) }}
            </h4>
          </div>
        </div>
      </div>

      <div
        class="
          border-t border-dashed border-gray-200
          md:border-t-0
          mt-5
          pt-5
          md:pt-0 md:mt-0 md:w-1/2 md:px-5
          lg:px-10
        "
      >
        <h4 class="text-xl font-medium">Delivery Address</h4>
        <h5 class="mt-2 font-mediums uppercase">
          {{ order.userFirstName }} {{ order.userLastName }}
        </h5>
        <p class="mt-2 text-xs text-gray-500 font-light flex flex-col">
          <span
            >{{ order.address.address }} {{ order.address.town }}
            {{ order.address.city }}, {{ order.address.state }}</span
          >
          <span>{{ order.address.zip }}</span>
        </p>
        <h6 class="mt-2 text-sm">
          Phone number: <span> {{ order.userPhone }}</span>
        </h6>
      </div>
    </div>

    <!-- Order Tracker -->
    <div>
      <div class="">
        <h4 class="mt-5 flex-1 text-xl font-medium">Reason for cancellation</h4>
        <div class="text-gray-400 text-sm md:mt-0 flex items-center">
          Please tell us correct reason for cancellation. This information is
          only used to improve our service
        </div>
      </div>
      <div class="mt-10">
        <div class="relative">
          <ul class="px-2 overflow-auto font-light ms-2 max-h-96">
            <li v-for="(r, ix) in returnReasons" :key="ix">
              <Radio
                v-model="returnInfo.reason"
                class="flex flex-row my-2 tracking-wider"
                color="primary"
                :value="r"
                ><span class="my-auto"> {{ r }}</span>
              </Radio>
            </li>
          </ul>
        </div>

        <div class="mt-16 mb-5">
          <div class="flex flex-wrap md:items-center md:justify-center">
            <nuxt-link
              :to="`/my/order-details?orderId=${$route.query.orderId}&itemId=${$route.query.itemId}`"
              class="
                mt-3
                h-12
                w-48
                flex
                justify-center
                items-center
                hover:bg-primary-500
                transition
                duration-300
                tezt-lg
                text-primary-500
                hover:text-white
                font-medium
                border-2 border-primary-500
                focus:outline-none
                transform
                active:scale-95
              "
            >
              Cancel Return
            </nuxt-link>
            <button
              class="
                mt-3
                h-12
                w-48
                bg-primary-500
                transition
                duration-300
                tezt-lg
                text-white
                font-medium
                border-2 border-primary-500
                focus:outline-none
                transform
                active:scale-95
              "
              @click="submit"
            >
              Confirm Return
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { Radio } from '~/shared/components/ui'
import NuxtLink from '~/components/NuxtLink.vue'

import ORDER_ITEM from '~/gql/order/orderItem.gql'
import RETURN_OR_REPLACE_ITEM from '~/gql/order/returnOrReplace.gql'
const returnReasons = [
  'Product Not Required Anymore',
  'Cash issue',
  'Ordered by mistake',
  'Want to change the product',
  'Delay delivery cancellation',
  'I have changed my mind',
  'Want to change order delivery details',
  'Others',
]
export default {
  components: {
    Radio,
    NuxtLink,
  },
  layout: 'account',
  middleware: ['isAuth'],
  data() {
    return {
      order: null,
      returnReasons: null,
      returnInfo: {},
    }
  },
  head() {
    return {
      title: 'Order Details',
    }
  },
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
  created() {
    this.getReturnReasons()
    this.getData()
  },
  methods: {
    getReturnReasons() {
      this.returnReasons = this.settings.returnReasons
    },
    async submit() {
      try {
        const res = (
          await this.$apollo.mutate({
            mutation: RETURN_OR_REPLACE_ITEM,
            variables: {
              orderId: this.$route.query.orderId,
              pId: this.order.pid,
              reason: this.returnInfo.reason,
              requestType: 'Return',
              qty: 1,
            },
          })
        ).data.returnOrReplace
        this.$router.push(
          `/my/order-details?orderId=${this.$route.query.orderId}&itemId=${this.$route.query.itemId}`
        )
      } catch (e) {
        this.$store.commit('setErr', e)
      }
    },
    async getData() {
      try {
        const order = (
          await this.$apollo.query({
            query: ORDER_ITEM,
            variables: { id: this.$route.query.itemId },
            fetchPolicy: 'no-catch',
          })
        ).data.orderItem
        this.order = order
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
