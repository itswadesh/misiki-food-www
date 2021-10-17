<template>
  <div class="container w-full mx-auto text-gray-800">
    <div class="z-0 lg:mx-auto lg:container">
      <!--  -->

      <OrderListSkeleton v-if="loading" />

      <div v-if="myOrders" class="w-full text-gray-800">
        <div
          v-if="myOrders.count == 0"
          class="w-full h-full m-2 bg-white border shadow"
        >
          <div class="flex flex-col p-6">
            <span class="text-xl font-semibold">My Order</span>

            <div class="flex flex-col items-center justify-center p-5">
              <img
                v-lazy="`/img/no-order.svg?tr=w-192,h-208,fo-auto`"
                alt="emptycart"
                class="object-contain h-48 w-52"
              />

              <span class="p-3 text-xl">Your have't ordered yet!!</span>

              <span class="text-xs">Add items to it now.</span>

              <nuxt-link :to="localePath('/')">
                <button
                  class="
                    p-2
                    ps-16
                    pe-16
                    m-3
                    text-sm
                    font-semibold
                    text-white
                    border
                    rounded
                    shadow
                    focus:ring-opacity-50
                    hover:bg-yellow-600
                    focus:outline-none focus:ring-0 focus:ring-offset-0
                    bg-primary-500
                    border-primary-500
                  "
                >
                  Shop Now
                </button>
              </nuxt-link>
            </div>
          </div>
        </div>

        <!-- <div class="flex flex-col w-2/3 lg:w-1/2 md:flex-row">
          <span class="py-2 my-auto text-2xl font-semibold me-5">Your Orders</span>
          <span class="hidden my-auto text-sm text-gray-600 lg:flex">
            Edit, Delete, track, Re-order items
         </span>
        </div> -->

        <!--  -->

        <!--v-if="orders"  -->

        <div v-if="myOrders.count > 0">
          <div class="mb-5 flex flex-row items-center justify-between w-full">
            <!-- <div
                class="relative flex-row flex-shrink-0 hidden lg:w-1/2 lg:flex"
              >
                <input
                  type="text"
                  class="w-full p-2 px-2 my-auto text-sm border-0 rounded bg-gray-50 ring-1 ring-gray-600 focus:ring-2 focus:ring-yellow-600"
                  placeholder="Serach Items"
                />

                <span class="my-auto -ms-8 top-2">
                  <svg
                    class="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div> -->

            <h2 class="text-xl sm:text-2xl font-semibold tracking-wide">
              {{ myOrders.count }} Orders Placed
            </h2>

            <nuxt-link
              :to="localePath('/')"
              class="text-sm text-blue-400 underline lg:hidden"
            >
              Shop More
            </nuxt-link>

            <!-- <select
                  name=""
                  id=""
                  class="text-sm bg-gray-200 border-0 rounded cursor-pointer ring-1 ring-gray-600 hover:shadow focus:outline-none lg:bg-white focus:ring-2 focus:ring-yellow-600"
                >
                  <option value="1">2015-2016</option>
                  <option value="1">2017-2018</option>
                  <option value="1">2018-2019</option>
                </select> -->
          </div>

          <!-- <span
              class="flex-row hidden my-auto text-sm bg-gray-200 border rounded lg:flex"
            >
              <select
                name=""
                id=""
                class="text-sm bg-gray-200 border-0 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-600 hover:shadow"
              >
                <option
                  class="flex flex-row my-auto text-gray-600"
                  selected
                  disabled
                >
                  Filter
                </option>
                <option class="mx-2 my-auto text-gray-600">Filter</option>
                <option class="mx-2 my-auto text-gray-600">Filter</option>
              </select>
            </span> -->

          <!-- v-ripple="'rgba(255, 255, 255, 0.5)'" -->
          <!-- <div class="flex flex-row justify-between p-1 my-4 lg:hidden">
            <div
              v-for="(b, index) in size"
              :key="b.index"
              class="flex flex-row justify-between"
            >
              <div @click="onSelect(index)">
                <button
                  v-ripple="'rgba(255, 255, 255, 0.2)'"
                  v-if="select == index"
                  class="p-1 px-4 text-sm font-medium text-center text-white uppercase bg-accent-700 border-accent-700 rounded-2xl       focus:outline-none focus:ring-0 focus:ring-offset-0
"
                >
                  {{ b.b }}
                </button>
                <button
                  v-else
                  class="p-1 px-4 text-sm font-medium text-center text-gray-500 uppercase bg-white border-gray-300 hover:shadow rounded-2xl hover:text-primary-500       focus:outline-none focus:ring-0 focus:ring-offset-0
 hover:border-primary-500"
                >
                  {{ b.b }}
                </button>
              </div>
            </div>
          </div> -->

          <div v-if="myOrders">
            <!-- desktop view starts -->

            <div
              v-for="(order, ix) in myOrders.data"
              :key="ix + 's'"
              class="hidden xl:block mb-5 sm:mb-10"
            >
              <div
                class="
                  flex
                  items-center
                  justify-between
                  mb-3
                  sm:mb-5
                  text-sm text-gray-500
                "
              >
                <h6>Order No : {{ order.orderNo }}</h6>

                <h6>Order Date : {{ order.createdAt | date }}</h6>
              </div>

              <table
                class="
                  min-w-full
                  text-gray-500 text-start
                  border border-gray-200
                  divide-y divide-gray-200
                  rounded-md
                  shadow-md
                "
              >
                <thead
                  class="
                    text-xs
                    rounded-t-md
                    bg-gray-100
                    whitespace-nowrap
                    uppercase
                  "
                >
                  <tr>
                    <th
                      class="px-5 py-3 font-medium tracking-wider text-gray-500"
                    >
                      #
                    </th>

                    <th class="p-3 font-medium tracking-wider text-gray-500">
                      Image
                    </th>

                    <th class="p-3 font-medium tracking-wider text-gray-500">
                      Name
                    </th>

                    <th class="p-3 font-medium tracking-wider text-gray-500">
                      Qty
                    </th>

                    <th class="p-3 font-medium tracking-wider text-gray-500">
                      Price
                    </th>

                    <th class="p-3 font-medium tracking-wider text-gray-500">
                      Shipping
                    </th>

                    <th class="p-3 font-medium tracking-wider text-gray-500">
                      Total
                    </th>

                    <th class="p-3 font-medium tracking-wider text-gray-500">
                      Status
                    </th>

                    <!-- <th  class=" p-3 font-medium tracking-wider text-gray-500">
                      Reviewed
                    </th> -->
                  </tr>
                </thead>

                <tbody
                  class="text-sm rounded-b-md bg-white divide-y divide-gray-200"
                >
                  <!-- :class="{ 'bg-gray-100': ix % 2 == 0 }" -->
                  <tr
                    v-for="(i, iix) in order.orderItems"
                    :key="iix"
                    class="bg-white cursor-pointer"
                    @click="
                      go(`/my/order-details?orderId=${order.id}&itemId=${i.id}`)
                    "
                  >
                    <td class="px-5 py-3 whitespace-nowrap hover:bg-gray-50">
                      {{ iix + 1 }}
                    </td>

                    <td class="p-3">
                      <img
                        v-lazy="`${i.imgCdn}?tr=w-80,h-80,fo-auto`"
                        alt=""
                        class="object-contain w-20 h-20"
                      />
                    </td>

                    <td class="p-3 w-60">
                      {{ i.name }}
                    </td>

                    <td class="p-3 whitespace-nowrap">
                      {{ i.qty }}
                    </td>

                    <td class="p-3 whitespace-nowrap">
                      {{
                        i.price
                          | currency(
                            store.currencySymbol,
                            store.currencyDecimals
                          )
                      }}
                    </td>

                    <td class="p-3 whitespace-nowrap">
                      {{
                        i.shippingCharge
                          | currency(
                            store.currencySymbol,
                            store.currencyDecimals
                          )
                      }}
                    </td>

                    <td class="p-3 whitespace-nowrap">
                      {{
                        i.total
                          | currency(
                            store.currencySymbol,
                            store.currencyDecimals
                          )
                      }}
                    </td>

                    <td class="p-3">
                      <span class="text-primary-500 whitespace-nowrap">{{
                        i.status
                      }}</span>

                      <!-- <a
                        v-if="settings.liveCommerce"
                        :href="`${NETEASE_WWW}/netease?channelName=${order.id}-${i.pid}`"
                        target="_"
                      >
                        Schedule Demo
                      </a> -->

                      <!-- :class="showDemoScheduler ? 'open' : 'close'" -->
                    </td>

                    <!-- <td class="p-3  whitespace-nowrap " >
                     
                    </td> -->
                  </tr>
                </tbody>
              </table>

              <!-- <div
              class="flex flex-row p-3 mx-auto font-semibold text-gray-600 capitalize bg-gray-200 border"
            >
              <span class="w-1/4 ps-5">items</span>

              <span class="flex flex-row justify-around w-3/4">

                </span>Order Id</span>

                </span>Status</span>

                </span>Order Date</span>

                </span>Delivered Date</span>

                </span>Price</span>

                <span class="text-gray-200">No heading</span>
              </span>
            </div>

            <div v-if="myOrders">
              <div>
                <div class="flex flex-row p-3 mx-auto bg-white border-b">

                  <span class="w-1/4 ps-5">

                    <div class="flex flex-row">

                      <span class="w-1/3 me-2">
                      
                        <img  v-lazy="`?tr=w-96,h-96,fo-auto`"
                          alt="pic"
                          class="object-contain w-24 h-24 mx-auto overflow-hidden border md:border-0 md:w-full"
                        />
                      </span>
                      <span class="relative flex flex-col w-2/3">
                        <span
                          class="font-semibold text-gray-500 hover:text-primary-500"
                        >
                          name
                       </span>
                        <span class="py-2 text-sm font-semibold text-primary-500">
                          company
                       </span>
                        <span class="absolute bottom-0 py-2 text-sm text-gray-500">
                          qty
                       </span>
                      </span>
                    </div>
                  </span>
                  <span
                    class="flex flex-row justify-around w-3/4 font-medium text-gray-500"
                  >
                    </span>Order Id</span>
                    <span
                      class="h-8 px-2 pt-1 text-center text-secondary-200 bg-secondary-100"
                    >
                      Status
                   </span>
                    </span>Order Date</span>
                    </span>Delivered Date</span>
                    <span class="text-secondary-400">Price</span>
                    <span class="flex flex-col my-auto space-y-2">
                      <nuxt-link :to="localePath('/order-tracking')">
                        <button
                          class="p-2 px-4 font-semibold text-white border track bg-accent-700 border-accent-700       focus:outline-none focus:ring-0 focus:ring-offset-0
"
                        >
                          Track Order
                        </button>
                      </nuxt-link>
                      <button
                        class="p-2 px-4 font-semibold bg-white border reorder hover:bg-gray-50 text-secondary-400 border-secondary-400       focus:outline-none focus:ring-0 focus:ring-offset-0
"
                      >
                        Re Order
                      </button>
                   </span>
                  </span>
                </div>
              </div>
            </div> -->
            </div>

            <!-- desktop view ends -->

            <!-- mobile view starts -->

            <!-- {{select}} -->

            <div
              v-for="order in myOrders.data"
              :key="order.id"
              class="xl:hidden"
            >
              <div
                class="
                  flex
                  items-center
                  justify-between
                  mb-3
                  sm:mb-5
                  text-sm text-gray-500
                "
              >
                <h6>
                  <span class="hidden sm:block">Order No :</span>
                  {{ order.orderNo }}
                </h6>

                <h6>
                  <span class="hidden sm:block">Order Date :</span>
                  {{ order.createdAt | date }}
                </h6>
              </div>

              <div
                class="
                  w-full
                  mb-5
                  sm:mb-10
                  text-sm text-gray-600
                  bg-white
                  divide-y divide-gray-200
                  border
                  rounded-md
                  shadow-md
                "
              >
                <div
                  v-for="i in order.orderItems"
                  :key="i.pid"
                  @click="
                    go(`/my/order-details?orderId=${order.id}&itemId=${i.id}`)
                  "
                >
                  <div class="p-4 flex items-start space-x-2 sm:space-x-5">
                    <img
                      v-lazy="`${i.imgCdn}?tr=w-64,fo-auto`"
                      alt=""
                      class="
                        object-contain object-top
                        w-12
                        h-12
                        sm:w-20 sm:h-20
                      "
                    />

                    <div>
                      <h6 class="mb-3">
                        {{ i.name }}
                      </h6>

                      <div class="flex flex-wrap text-sm">
                        <div
                          class="flex items-center mb-1 sm:mb-2 me-5 space-x-2"
                        >
                          <h6>Price :</h6>

                          <b class="text-gray-500">
                            {{
                              i.price
                                | currency(
                                  store.currencySymbol,
                                  store.currencyDecimals
                                )
                            }}

                            * {{ i.qty }}
                          </b>
                        </div>

                        <div
                          class="flex items-center mb-1 sm:mb-2 me-5 space-x-2"
                        >
                          <h6>Delivery :</h6>

                          <b class="text-gray-500">
                            {{
                              i.shippingCharge
                                | currency(
                                  store.currencySymbol,
                                  store.currencyDecimals
                                )
                            }}
                          </b>
                        </div>

                        <div
                          class="flex items-center mb-1 sm:mb-2 me-5 space-x-2"
                        >
                          <h6>Total :</h6>

                          <b class="text-gray-500">
                            {{
                              i.total
                                | currency(
                                  store.currencySymbol,
                                  store.currencyDecimals
                                )
                            }}
                          </b>
                        </div>

                        <div
                          class="flex items-center mb-1 sm:mb-2 me-5 space-x-2"
                        >
                          <h6>Status :</h6>

                          <b class="text-primary-500">
                            {{ i.status }}
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- mobile view ends -->
          </div>
        </div>
      </div>

      <!-- if no product found -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderListSkeleton from '~/components/AllSkeletons/OrderListSkeleton.vue'
import MY_ORDERS from '~/gql/order/myOrders.gql'
import { NETEASE_WWW } from '~/shared/config'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { OrderListSkeleton, NuxtLink },
  data() {
    return {
      select: 0,
      statuses: [{ b: 'delivered' }, { b: 'In-track' }, { b: 'pending' }],
      loading: false,
      myOrders: null,
      NETEASE_WWW,
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      store: 'store',
    }),
  },
  async created() {
    await this.getOrders()
  },
  methods: {
    go(url) {
      this.$router.push(`${url}`)
    },
    onSelect(val) {
      this.select = val
    },
    async getOrders() {
      // console.log('shivam order', this.myOrders)
      this.loading = true
      try {
        this.myOrders = await this.$get('order/myOrders', {})
        // this.myOrders = (
        //   await this.$apollo.query({
        //     query: MY_ORDERS,
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.myOrders
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.track {
  border-radius: 25px;
  font-size: 11px;
}
</style>
