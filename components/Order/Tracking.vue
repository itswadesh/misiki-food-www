<template>
  <div class="h-full max-w-full text-gray-600 bg-gray-50">
    <div class="mx-auto xl:container">
      <div class="flex flex-row justify-between p-4 md:justify-start md:p-6">
        <nuxt-link :to="localePath('/my/orders')">
          <span class="text-sm text-secondary-500 md:hidden"
            >Back to order</span
          >
        </nuxt-link>
        <span class="hidden text-2xl me-10 md:flex">Order Tracking</span>
        <span class="text-sm align-text-bottom md:mt-3"
          >Track order, Return Items</span
        >
      </div>
      <div
        class="
          flex flex-col
          max-w-full
          mx-4
          rounded
          xl:mx-auto
          lg:bg-white
          lg:shadow
        "
      >
        <div class="p-2 px-4 bg-white shadow md:shadow-none md:mx-4 lg:px-8">
          <div class="flex flex-col w-full py-2 md:border-b md:flex-row">
            <div class="w-full font-medium md:w-1/4">
              <div class="flex flex-row md:flex-col">
                <div class="w-24 h-24 mt-1 border me-4 md:w-40 md:h-40 md:mt-0">
                  <img
                    v-lazy="'/img/producttrack.jpg'"
                    alt="img"
                    class="object-contain w-full h-full"
                  />
                </div>
                <div class="flex flex-col my-auto">
                  <span class="mt-2">Product Name Here</span>
                  <span class="my-2 text-sm text-primary-500">Bruice</span>
                  <span class="flex flex-row my-2 text-sm font-normal">
                    <span class="me-1">Price:</span>
                    <span class="text-secondary-400">1988</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-col w-full text-gray-600 md:w-3/4">
              <div
                class="
                  flex-row
                  justify-end
                  hidden
                  float-right
                  mt-2
                  text-xs
                  md:flex
                "
              >
                <span class="text-blue-400 me-4">Return Item</span>
                <span class="text-gray-400">Order Id: #dhdbd14535</span>
              </div>
              <div class="flex flex-col-reverse lg:flex-col">
                <div class="flex flex-row w-full py-1 text-sm">
                  <div
                    v-for="(t, index) in tracking"
                    :key="t.index"
                    :class="{ 'hidden lg:flex': Math.abs(index % 2) }"
                    class="w-full"
                  >
                    <!-- {{tracking.length-1}} -->
                    <div
                      class="
                        flex flex-col-reverse
                        justify-between
                        w-full
                        px-auto
                        md:flex-col
                      "
                    >
                      <div
                        class="w-full h-5 my-2 bg-gray-200 md:my-4 md:mt-6"
                        :class="{
                          'rounded-s-3xl': index == 0,
                          'rounded-e-3xl': index == tracking.length - 1,
                        }"
                      >
                        <svg
                          class="absolute z-0 w-6 h-5 my-auto text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <div
                          class="
                            relative
                            z-10
                            items-center
                            w-full
                            h-full
                            my-auto
                          "
                        >
                          <div
                            v-if="index < 3"
                            class="w-full h-full bg-secondary-400"
                            :class="{
                              'rounded-s-3xl': index == 0,
                              'rounded-e-3xl:': index == tracking.length - 1,
                            }"
                          >
                            <svg
                              class="w-6 h-5 my-auto text-green-600"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span class="font-medium">{{ t.status }}</span>
                        <span
                          class="
                            hidden
                            w-2/3
                            py-2
                            text-xs text-gray-400
                            md:flex
                          "
                        >
                          {{ t.desc }}
                        </span>
                        <span class="py-2 text-xs text-gray-400 md:py-4">
                          {{ t.date }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="
                  flex flex-row
                  justify-between
                  float-right
                  mt-6
                  text-xs
                  md:hidden
                "
              >
                <span class="text-blue-400 me-4">Return Item</span>
                <span class="text-gray-400">Order Id: #dhdbd14535</span>
              </div>
              <span class="hidden mt-8 text-xs text-gray-400 md:flex">
                Your item in on the way. It will be Arrived on 18th, Feb.
              </span>
            </div>
          </div>
        </div>
        <div class="mt-5 md:px-4 lg:p-2 lg:bg-white lg:mx-4 lg:px-8 lg:mt-0">
          <div class="flex flex-col-reverse w-full lg:flex-row">
            <div
              class="
                w-full
                p-5
                mt-5
                text-sm text-gray-400
                bg-white
                shadow
                lg:shadow-none
                lg:mt-0
                lg:w-1/4
                lg:p-0
              "
            >
              <div class="mb-4 text-lg font-medium text-gray-600">
                Delivery:
              </div>
              <span class="my-3 text-primary-500">Type: Basic Devlivery</span>
              <span>Name: Bipin B</span>
              <span class="w-2/3 my-1">
                Address: Door no: 23/2, ss-p Colony Wiler Road, First Street,
              </span>
              <span>
                <span>Austin, Texas, U,S</span>
                <span class="my-1">Pin: 100021</span>
                <span>+11256121121</span>
                <span class="my-1">vipin.b889@outlokk.com</span>
              </span>
            </div>
            <div
              class="
                flex flex-col-reverse
                justify-between
                w-full
                text-sm text-gray-400
                lg:w-3/4
                lg:flex-row
              "
            >
              <div
                class="
                  w-full
                  p-5
                  mt-5
                  bg-white
                  shadow
                  lg:p-0
                  lg:shadow-none
                  lg:mt-0
                  lg:w-1/2
                  lg:me-6
                "
              >
                <h3 class="mb-4 text-lg font-medium text-gray-600">
                  Payment Information:
                </h3>
                <span class="my-3 text-primary-500">Payment Method</span>
                <span class="flex flex-row my-2">
                  <div class="w-10 h-6 my-auto me-4">
                    <img
                      v-lazy="'/img/visa.png'"
                      alt="visa"
                      class="object-contain"
                    />
                  </div>
                  <div class="flex flex-col">
                    <span>XXXX XXXX XXXX XX36</span>
                    <span>Exp: 12/2026</span>
                  </div>
                </span>
                <span class="my-3 text-primary-500">Billing Address</span>
                <span>Name: Bipin B</span>
                <span class="w-2/3 my-1">
                  Address: Door no: 23/2, ss-p Colony Wiler Road, First Street,
                </span>
                <span>Austin, Texas, U,S</span>
              </div>
              <div class="hidden w-full mb-6 text-sm lg:w-1/2 lg:block">
                <div
                  class="
                    flex flex-row
                    justify-center
                    mb-4
                    text-lg
                    font-medium
                    text-center text-gray-600
                  "
                >
                  <!-- dics icons -->
                  <svg
                    class="w-5 h-5 my-auto me-2 text-secondary-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- <disc-icon size="1.1x" class="my-auto me-2 text-secondary-500 custom-class"></disc-icon> -->
                  <span>Updates</span>
                </div>
                <div
                  class="
                    flex flex-row
                    justify-around
                    w-full
                    pb-2
                    font-medium
                    text-gray-600
                    border-b
                  "
                >
                  <span class="w-1/4">Event</span>
                  <span class="w-1/4">Date</span>
                  <span class="w-1/4">Location</span>
                </div>
                <div class="overflow-hidden overflow-y-auto h-44">
                  <div class="flex flex-row justify-around py-2 border-b">
                    <div class="w-1/4">
                      <span class="font-medium text-gray-500">Processed</span>
                      <span class="text-xs">TID: #123378</span>
                    </div>
                    <span class="w-1/4">15/02/2025</span>
                    <span class="w-1/4">Mesci, MX</span>
                  </div>
                  <div class="flex flex-row justify-around py-2 border-b">
                    <div class="w-1/4">
                      <span class="font-medium text-gray-500">Confirmed</span>
                      <span class="text-xs">TID: #123378</span>
                    </div>
                    <span class="w-1/4">15/02/2025</span>
                    <span class="w-1/4">Mesci, MX</span>
                  </div>
                  <div class="flex flex-row justify-around py-2 border-b">
                    <div class="w-1/4">
                      <span class="font-medium text-gray-500">Ordered</span>
                      <span class="text-xs">TID: #123378</span>
                    </div>
                    <span class="w-1/4">15/02/2025</span>
                    <span class="w-1/4">Mesci, MX</span>
                  </div>
                  <div class="flex flex-row justify-around py-2 border-b">
                    <div class="w-1/4">
                      <span class="font-medium text-gray-500">Ordered</span>
                      <span class="text-xs">TID: #123378</span>
                    </div>
                    <span class="w-1/4">15/02/2025</span>
                    <span class="w-1/4">Mesci, MX</span>
                  </div>
                </div>
              </div>
              <!-- mobile view -->
              <div class="w-full text-sm bg-white shadow lg:hidden">
                <div
                  class="
                    flex flex-row
                    justify-center
                    my-3
                    text-lg
                    font-medium
                    text-center
                  "
                >
                  <svg
                    class="w-5 h-5 my-auto me-2 text-secondary-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- <disc-icon size="1.1x" class="my-auto text-blue-500 me-2 custom-class"></disc-icon> -->
                  <span>Updates</span>
                </div>
                <div class="flex flex-col my-5">
                  <div v-for="(t, index) in tracking" :key="t.index">
                    <div
                      class="
                        container
                        flex flex-row
                        justify-around
                        w-full
                        h-20
                        mx-auto
                      "
                    >
                      <div class="flex flex-col items-center w-1/2">
                        <span class="font-medium text-gray-600">{{
                          t.status
                        }}</span>
                        <span
                          class="w-2/3 mt-1 text-xs text-center text-gray-400"
                        >
                          {{ t.desc1 }}
                        </span>
                      </div>
                      <div
                        class="
                          relative
                          flex flex-row
                          justify-end
                          w-2
                          bg-gray-200
                        "
                      >
                        <div
                          class="
                            absolute
                            z-0
                            w-4
                            h-4
                            mx-auto
                            bg-gray-300
                            rounded-full
                            -me-1
                          "
                        ></div>
                        <div class="z-10 items-center w-full h-full my-auto">
                          <div
                            v-if="index < 3"
                            class="w-full h-full bg-secondary-400"
                          >
                            <div
                              class="
                                absolute
                                w-4
                                h-4
                                mx-auto
                                my-auto
                                bg-blue-500
                                rounded-full
                                -ms-1
                              "
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col items-center w-1/2">
                        <span class="font-medium text-gray-600"
                          >LLnoise, CH</span
                        >
                        <span class="mt-1 text-xs text-gray-400"
                          >12/02/2025</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="
                    flex flex-row
                    items-center
                    justify-center
                    p-3
                    mx-4
                    my-4
                    text-xs text-center text-gray-500
                    bg-gray-100
                  "
                >
                  <span>Your item in on the way. It will be Arrived on</span>
                  <span class="text-accent-900">18th, Feb.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      tracking: [
        {
          status: 'Orderd',
          desc: 'We have recieved Your Order',
          desc1: 'Order Recieved',
          date: '12/02/2025',
        },
        {
          status: 'Confirmed',
          desc: 'Your Order has been Confirmed',
          desc1: 'Order Confirmed',
          date: '12/02/2025',
        },
        {
          status: 'Processed',
          desc: 'We have Processed Your Order!',
          desc1: 'Order Processed',
          date: '12/02/2025',
        },
        {
          status: 'Shipped',
          desc: 'We have Shipped Your Order',
          desc1: 'Order Shipped',
          date: '12/02/2025',
        },
        {
          status: 'Delivered',
          desc: 'Your Order has been Delivered',
          desc1: 'Order Delivered',
          date: '12/02/2025',
        },
      ],
    }
  },
}
</script>
