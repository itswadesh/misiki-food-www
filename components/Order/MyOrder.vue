<template>
  <div class="container w-full mx-auto">
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
                v-lazy="'/img/no-order.svg'"
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
                    focus:ring focus:ring-offset-2 focus:ring-yellow-600
                    bg-primary-500
                    focus:outline-none
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
          <div
            class="
              relative
              flex flex-row
              justify-between
              w-full
              p-5
              ps-8
              mx-auto
              bg-white
              border
              rounded-md
              shadow-md
            "
          >
            <div
              class="
                flex flex-row
                justify-between
                w-full
                font-semibold
                lg:justify-start lg:w-1/2
              "
            >
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

              <nuxt-link
                :to="localePath('cart')"
                class="my-auto text-sm text-blue-400 underline lg:hidden"
              >
                Back to Cart
              </nuxt-link>

              <div class="flex flex-row">
                <div class="tracking-wide">
                  {{ myOrders.count }} Orders Placed
                </div>

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
          </div>

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
                  class="p-1 px-4 text-sm font-medium text-center text-white uppercase bg-accent-700 border-accent-700 rounded-2xl focus:outline-none"
                >
                  {{ b.b }}
                </button>
                <button
                  v-else
                  class="p-1 px-4 text-sm font-medium text-center text-gray-500 uppercase bg-white border-gray-300 hover:shadow rounded-2xl hover:text-primary-500 focus:outline-none hover:border-primary-500"
                >
                  {{ b.b }}
                </button>
              </div>
            </div>
          </div> -->
          <!-- desktop view starts -->

          <div v-if="myOrders" class="">
            <div
              v-for="(order, ix) in myOrders.data"
              :key="ix + 's'"
              class="hidden w-full mx-auto mb-2 lg:container lg:block"
            >
              <div class="flex items-center p-3 sm:p-5 text-sm text-gray-500">
                <div>Order No: {{ order.orderNo }}</div>

                <div class="ms-2 text-xs text-gray-400">
                  Order Date: {{ order.createdAt | date }}
                </div>
              </div>

              <table
                class="
                  min-w-full
                  divide-y divide-gray-200
                  border
                  rounded-md
                  shadow-md
                "
              >
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-xs
                        font-medium
                        tracking-wider
                        text-gray-500
                        uppercase
                        text-start
                      "
                    >
                      #
                    </th>

                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-xs
                        font-medium
                        tracking-wider
                        text-gray-500
                        uppercase
                        text-start
                      "
                    >
                      Image
                    </th>

                    <th
                      scope="col"
                      class="
                        py-3
                        pe-6
                        text-xs
                        font-medium
                        tracking-wider
                        text-gray-500
                        uppercase
                        text-start
                      "
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-xs
                        font-medium
                        tracking-wider
                        text-gray-500
                        uppercase
                        text-start
                      "
                    >
                      Qty
                    </th>

                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-xs
                        font-medium
                        tracking-wider
                        text-gray-500
                        uppercase
                        text-start
                      "
                    >
                      Price
                    </th>

                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-xs
                        font-medium
                        tracking-wider
                        text-gray-500
                        uppercase
                        text-start
                      "
                    >
                      Shipping
                    </th>

                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-xs
                        font-medium
                        tracking-wider
                        text-gray-500
                        uppercase
                        text-start
                      "
                    >
                      Total
                    </th>

                    <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-xs
                        font-medium
                        tracking-wider
                        text-gray-500
                        uppercase
                        text-start
                      "
                    >
                      Status
                    </th>

                    <!-- <th
                      scope="col"
                      class="
                        px-6
                        py-3
                        text-xs
                        font-medium
                        tracking-wider
                        text-gray-500
                        uppercase
                        text-start
                      "
                    >
                      Reviewed
                    </th> -->
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                  <!-- :class="{ 'bg-gray-100': ix % 2 == 0 }" -->
                  <tr
                    v-for="(i, iix) in order.orderItems"
                    :key="iix"
                    class="bg-white cursor-pointer"
                    @click="
                      go(`/my/order-details?orderId=${order.id}&itemId=${i.id}`)
                    "
                  >
                    <td
                      class="
                        px-6
                        py-4
                        text-sm text-gray-900 text-start
                        whitespace-nowrap
                        hover:bg-gray-50
                      "
                    >
                      {{ iix + 1 }}
                    </td>

                    <td class="text-sm text-gray-900 text-start">
                      <img
                        v-lazy="i.img"
                        alt=""
                        class="object-cover w-20 h-20 p-1"
                      />
                    </td>

                    <td class="text-sm text-gray-900 text-start" scope="col">
                      {{ i.name }}
                    </td>

                    <td class="text-sm text-center text-gray-900" scope="col">
                      {{ i.qty }}
                    </td>

                    <td class="text-sm text-center text-gray-900" scope="col">
                      {{ i.price | currency(store.currencySymbol, 2) }}
                    </td>

                    <td class="text-sm text-center text-gray-900" scope="col">
                      {{ i.shippingCharge | currency(store.currencySymbol, 2) }}
                    </td>

                    <td class="text-sm text-center text-gray-900" scope="col">
                      {{ i.total | currency(store.currencySymbol, 2) }}
                    </td>

                    <td class="ps-4 text-sm text-gray-900" scope="col">
                      <span class="text-primary-500">{{ i.status }}</span>

                      <!-- <a
                        v-if="settings.liveCommerce"
                        :href="`${NETEASE_WWW}/netease?channelName=${order.id}-${i.pid}`"
                        target="_"
                      >
                        Schedule Demo
                      </a> -->

                      <!-- :class="showDemoScheduler ? 'open' : 'close'" -->
                    </td>

                    <!-- <td class="text-sm text-center text-gray-900" scope="col">
                     
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
                      
                        <img
                          src=""
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
                          class="p-2 px-4 font-semibold text-white border track bg-accent-700 border-accent-700 focus:outline-none"
                        >
                          Track Order
                        </button>
                      </nuxt-link>
                      <button
                        class="p-2 px-4 font-semibold bg-white border reorder hover:bg-gray-50 text-secondary-400 border-secondary-400 focus:outline-none"
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
              class="
                w-full
                p-4
                mt-3
                text-sm text-gray-600
                bg-white
                rounded-lg
                shadow
                lg:hidden
              "
            >
              <div
                v-for="i in order.orderItems"
                :key="i.pid"
                class=""
                @click="
                  go(`/my/order-details?orderId=${order.id}&itemId=${i.id}`)
                "
              >
                <div class="my-2">
                  <div class="text-sm">
                    <div class="text-sm">
                      {{ i.name }}
                    </div>
                    <div class="flex flex-row text-xs w-full justify-between">
                      <div class="text-gray-400">
                        {{ order.createdAt | date }}
                      </div>
                      <div class="text-gray-400 ms-3">
                        OrderNo: {{ order.orderNo }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- v-if="order.tracking" -->

                <div
                  class="flex items-center justify-between my-3 text-gray-400"
                >
                  <img v-lazy="i.img" alt="" class="object-cover w-16" />

                  <div>
                    Price:
                    <b class="text-gray-500">
                      {{ i.price | currency(store.currencySymbol, 2) }}
                      * {{ i.qty }}
                    </b>
                  </div>
                  <div>
                    Delivery:
                    <b class="text-gray-500">
                      {{ i.shippingCharge | currency(store.currencySymbol, 2) }}
                    </b>
                  </div>
                  <div>
                    Total:
                    <b class="text-gray-500">
                      {{ i.total | currency(store.currencySymbol, 2) }}
                    </b>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between my-3 mt-5 text-sm"
                >
                  <div class="flex flex-row">
                    Status:
                    <span
                      class="
                        px-3
                        my-auto
                        text-primary-500
                        focus:outline-none
                        rounded-2xl
                      "
                    >
                      {{ i.status }}
                    </span>
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
