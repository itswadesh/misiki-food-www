<template>
  <div>
    <div
      class="
        container
        flex flex-row
        justify-center
        p-4
        px-8
        mx-auto
        text-xs
        font-medium
        tracking-wider
        text-center text-gray-500
        www
        bg-accent-100
      "
    >
      Select the Reason for returning the product
    </div>
    <div class="container flex-wrap w-full mx-auto overflow-hidden bg-white">
      <div class="flex flex-row overflow-hidden">
        <div
          class="
            container
            grid
            flex-wrap
            w-full
            p-5
            px-8
            mx-auto
            md:grid-cols-2
          "
        >
          <label
            class="
              flex flex-col
              p-4
              mx-2
              mt-5
              bg-white
              border
              rounded
              shadow-sm
              cursor-pointer
              hover:shadow-md
            "
            :class="{ 'border-secondary-500': picked == 'five' }"
          >
            <div class="flex flex-row">
              <Radio
                v-model="picked"
                name="group"
                class="
                  w-4
                  h-4
                  my-auto
                  me-3
                  text-secondary-500
                  focus:ring-1 focus:ring-secondary-500
                "
                value="five"
              />
              <div class="flex flex-row justify-between w-full text-gray-500">
                <div class="flex flex-row my-auto">
                  <span class="my-auto">Net Banking</span>
                  <span class="my-auto text-sm text-gray-400 ms-3">
                    (Online Transaction)</span
                  >
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
                  <!-- <img v-lazy="`/img/kisspng-bank-initial.jpg?tr=w-24,h-24,fo-auto`" alt="mastercard" class="w-6 h-6 my-auto ">  -->
                </div>
              </div>
            </div>
          </label>

          <label
            class="
              flex flex-col
              p-4
              mx-2
              mt-5
              bg-white
              border
              rounded
              shadow-sm
              cursor-pointer
              hover:shadow-md
            "
            :class="{ 'border-secondary-500': picked == 'four' }"
          >
            <div class="flex flex-row">
              <Radio
                v-model="picked"
                name="group"
                class="
                  w-4
                  h-4
                  my-auto
                  me-3
                  text-secondary-500
                  focus:ring-1 focus:ring-secondary-500
                "
                value="four"
              />
              <div class="flex flex-row justify-between w-full text-gray-500">
                <div class="flex flex-col my-auto sm:flex-row">
                  <span class="my-auto">UPI</span>
                  <span class="my-auto text-sm text-gray-400 sm:ms-3">
                    (using UPI ID)</span
                  >
                </div>
                <div class="flex flex-row">
                  <img
                    v-lazy="`/img/phonepe-india.jpg?tr=w-24,h-24,fo-auto`"
                    alt="mastercard"
                    class="w-6 h-6 my-auto border rounded-full me-2"
                  />
                  <img
                    v-lazy="
                      `/img/Google-Pay-Logo-Icon-PNG.png?tr=w-24,h-24,fo-auto`
                    "
                    alt="rupay"
                    class="w-6 h-6 p-1 my-auto border rounded-full me-2"
                  />
                  <img
                    v-lazy="`/img/upi-logo.png?tr=w-24,h-24,fo-auto`"
                    alt="ae"
                    class="w-10 h-6 p-1 my-auto border"
                  />
                </div>
              </div>
            </div>
          </label>
          <label
            class="
              flex flex-col
              p-4
              mx-2
              mt-5
              bg-white
              border
              rounded
              shadow-sm
              cursor-pointer
              hover:shadow-md
            "
            :class="{ 'border-secondary-500': picked == 'three' }"
          >
            <div class="flex flex-row">
              <Radio
                v-model="picked"
                name="group"
                class="
                  w-4
                  h-4
                  my-auto
                  me-3
                  text-secondary-500
                  focus:ring-1 focus:ring-secondary-500
                "
                value="three"
              />
              <span class="flex flex-row text-gray-500"
                >PDO
                <span class="my-auto text-sm text-gray-400 ms-3">
                  (Pay on Delivery)
                </span>
                <span class="my-auto text-sm text-gray-400 ms-3">
                  (Cash/Card/UPI)</span
                ></span
              >
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Radio } from '~/shared/components/ui'
export default {
  components: { Radio },
  data() {
    return {
      // isOpen:false,
      picked: false,
    }
  },
}
</script>
<style scoped>
.www {
  font-weight: 900;
}
</style>
