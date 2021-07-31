<template>
  <div class="container relative mx-auto">
    <div
      class="container h-full max-w-full p-2 pb-10 mx-auto text-gray-600 md:p-0"
    >
      <div>
        <div
          class="
            flex-row
            justify-between
            hidden
            p-4
            md:flex md:justify-start md:p-5 md:px-8
          "
        >
          <nuxt-link :to="localePath('/my/orders')">
            <span class="text-sm text-blue-500 md:hidden">Back to order</span>
          </nuxt-link>
          <span class="hidden mx-10 text-2xl md:flex">Returns</span>
          <span class="text-xs align-text-bottom md:mt-2"
            >Returning Items (1)</span
          >
        </div>
        <div class="my-4 text-lg text-center text-gray-500 uppercase md:hidden">
          Items for return
        </div>
      </div>
      <div class="container max-w-full min-h-screen bg-gray-50">
        <div class="container p-5 mx-auto bg-white rounded-sm shadow-sm">
          <div class="flex flex-col-reverse w-full text-gray-600 md:flex-col">
            <h3
              class="
                flex flex-col
                justify-between
                float-right
                mt-2
                text-sm
                ps-16
                md:flex-row
              "
            >
              <span
                >Retun your Products within <b>15 days</b> after purchase</span
              >
              <h3
                class="
                  flex flex-row
                  justify-end
                  w-auto
                  h-8
                  p-1
                  my-auto
                  rounded
                  cursor-pointer
                  text-secondary-500
                  md:px-6 md:hover:shadow md:hover:bg-blue-50
                "
              >
                <span class="my-auto me-2">Print return Invoice</span>
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
                <!-- <printer-icon size="1.1x" class="my-auto custom-class"></printer-icon> -->
              </h3>
            </h3>
            <div class="flex flex-col-reverse md:flex-col">
              <div
                class="
                  flex flex-row
                  w-full
                  p-5
                  px-4
                  py-1
                  pb-10
                  mt-10
                  text-sm
                  md:px-16
                "
              >
                <div
                  v-for="(t, index) in tracking"
                  :key="t.index"
                  class="container w-full px-1 ms-10"
                >
                  <div class="flex flex-col justify-between w-full md:flex-col">
                    <div class="hidden w-11/12 mx-auto text-center lg:flex">
                      <span
                        class="
                          flex flex-shrink-0
                          mx-auto
                          font-semibold
                          text-gray-400
                          uppercase
                        "
                        :class="{ 'text-gray-600': select > index - 1 }"
                      >
                        {{ t.status }}
                      </span>
                    </div>
                    <div
                      class="w-full h-3 bg-gray-200 md:mt-6"
                      :class="{
                        'rounded-r-3xl': index == tracking.length - 1,
                        'bg-primary-500': select > index - 1,
                      }"
                    >
                      <div
                        class="my-auto -mt-2 -ms-10"
                        @click="onSelect(index)"
                      >
                        <button
                          class="
                            w-8
                            h-8
                            border-2
                            rounded-full
                            text-primary-500
                            border-primary-500
                            focus:outline-none
                          "
                          :class="{
                            'ring-pink-200 ring-4': select > index - 1,
                          }"
                        >
                          {{ index + 1 }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ItemsForReturn v-if="select == 0" />
          <ReasonFor v-if="select == 1" />
          <PaymentMode v-if="select == 2" />
          <Confirm v-if="select == 3" />
        </div>
      </div>
    </div>
    <!-- <div class="bottom-0 flex justify-between"> -->
    <!-- <Footer class="absolute bottom-0 hidden sm:flex" /> -->
    <!-- </div> -->
  </div>
</template>

<script>
import ItemsForReturn from '~/components/ReturnProducts/ItemsForReturn.vue'
import ReasonFor from '~/components/ReturnProducts/ReasonFor.vue'
import PaymentMode from '~/components/ReturnProducts/PaymentMode.vue'
import Confirm from '~/components/ReturnProducts/Confirm.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: {
    ItemsForReturn,
    ReasonFor,
    PaymentMode,
    Confirm,
    NuxtLink,
  },
  data() {
    return {
      select: 0,
      tracking: [
        { status: 'item for return' },
        { status: 'reason for return' },
        { status: 'method of payment' },
        { status: 'confirmation' },
      ],
    }
  },
  head() {
    return {
      title: 'Return Product',
    }
  },
  methods: {
    onSelect(val) {
      this.select = val
    },
  },
}
</script>
