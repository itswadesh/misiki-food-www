<template>
  <div v-if="order" class="mx-auto md:w-10/12">
    <div class="mb-2 bg-white md:mt-10">
      <!-- first bolck -->
      <div class="flex flex-row p-5 bg-white shadow md:ps-8">
        <div class="flex flex-col w-4/5 border-r md:w-1/3">
          <span class="text-lg font-semibold">Delivery Address</span>
          <span class="mb-2 font-semibold"
            >{{ order.user.firstName }} {{ order.user.lastName }}</span
          >
          <div class="mb-2 text-sm">
            <span>{{ order.address.town }}</span>
            <span>{{ user.address2 }}</span>
            <span>{{ user.address3 }}</span>
            <span>{{ user.address4 }}</span>
          </div>
          <h3 class="font-semibold">Phone number</h3>
          <div class="text-sm">
            <span>{{ order.user.phone }}</span>
          </div>
        </div>
        <div class="flex flex-col ps-8 cursor-pointer">
          <span class="mb-2 font-semibold">Your Rewards</span>
          <div class="flex flex-row">
            <img
              v-lazy="`/img/lockinCoinNew.svg?tr=w-20,h-20,fo-auto`"
              alt="coin"
              class="w-5 h-5 my-auto me-4"
            />
            <div>
              <span class="text-sm">50 SuperCoins</span>
              <span class="text-xs text-gray-700"
                >Will be credited after return over</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- second block -->
    <div v-if="order" class="w-full mt-4 shadow">
      <div v-for="i in order.items" :key="i.id" class="p-5 bg-white">
        <div class="flex flex-col justify-around md:flex-row">
          <div class="flex flex-row me-12">
            <div class="me-8">
              <img
                v-lazy="`${i.img}?tr=w-64,h-96,fo-auto`"
                alt="mobile"
                class="w-16 h-24"
              />
            </div>
            <div class="flex flex-col">
              <span class="mb-2">{{ i.name }}</span>
              <span class="text-sm text-gray-500">Color : color</span>
              <span class="text-sm text-gray-500">Quantity : {{ i.qty }}</span>
              <span>{{
                i.price | currency(store.currencySymbol, store.currencyDecimals)
              }}</span>
            </div>
          </div>
          <div class="flex flex-col mt-3 lg:flex-row md:mt-0">
            <div class="mx-auto me-12">
              <div class="flex flex-row">
                <span
                  class="w-3 h-3 my-auto rounded-full me-2 bg-accent-900"
                ></span>
                <span class="text-sm font-semibold">{{ i.status }}</span>
              </div>
              <span class="text-xs"
                >Your payment was not confirmed by the bank</span
              >
            </div>
            <div class="mt-5 md:mt-0">
              <span class="font-semibold">Order Not Placed</span>
              <div class="flex flex-row cursor-pointer me-2">
                <img v-lazy="'/img/contact.svg'" alt="help" />
                <span class="font-semibold text-blue-500 ms-3">NEED HELP?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ORDER_DETAILS from '~/gql/order/order.gql'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { NuxtLink },
  data() {
    return {
      order: null,
      user: {
        name: 'name',
        address1: 'Address line 1',
        address2: 'address line 2',
        address3: 'Address line 3',
        address4: 'Address line 4',
        phone1: 'Phone 1',
        phone2: 'Phone 2',
      },
    }
  },
  computed: {
    ...mapGetters({
      store: 'store',
    }),
  },
  created() {
    this.getOrderDetails()
  },
  methods: {
    async getOrderDetails() {
      try {
        this.order = await this.$get('order/order', {
          id: this.$route.query.id,
        })
        // this.order = (
        //   await this.$apollo.query({
        //     query: ORDER_DETAILS,
        //     variables: { id: this.$route.query.id },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.order
      } catch (e) {
        // console.log(e)
      }
    },
  },
}
</script>
