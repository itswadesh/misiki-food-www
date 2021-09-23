<template>
  <div class="flex justify-center p-5 sm:p-10">
    <div
      class="
        w-full
        sm:w-96
        flex
        justify-between
        text-xs
        font-semibold
        tracking-widest
        text-center
        leading-3
      "
    >
      <nuxt-link
        :to="localePath('/cart')"
        class="w-16 flex flex-col items-center justify-center"
      >
        <div
          class="
            flex
            items-center
            justify-center
            w-8
            h-8
            mx-auto
            rounded-full
            border
          "
          :class="[
            selected == 'cart'
              ? 'border-primary-500 bg-primary-500  text-white'
              : 'border-gray-500 text-gray-500',
          ]"
        >
          <span>1</span>
        </div>

        <div
          class="mt-1"
          :class="[
            selected == 'cart' ? 'text-primary-500  ' : ' text-gray-500',
          ]"
        >
          Cart
        </div>
      </nuxt-link>

      <hr class="flex-1 mx-1 my-4 dashes text-gray-500" />

      <div
        v-if="selected == 'address'"
        class="w-16 flex flex-col items-center justify-center"
      >
        <div
          class="
            flex
            items-center
            justify-center
            w-8
            h-8
            mx-auto
            rounded-full
            border
          "
          :class="[
            selected == 'address'
              ? 'border-primary-500 bg-primary-500  text-white'
              : 'border-gray-500 text-gray-500',
          ]"
        >
          <span>2</span>
        </div>

        <div
          class="mt-1"
          :class="[
            selected == 'address' ? 'text-primary-500  ' : ' text-gray-500',
          ]"
        >
          Address
        </div>
      </div>

      <nuxt-link
        v-else
        :to="localePath(`/checkout/address`)"
        class="w-16 flex flex-col items-center justify-center"
      >
        <div
          class="
            flex
            items-center
            justify-center
            w-8
            h-8
            mx-auto
            rounded-full
            border
          "
          :class="[
            selected == 'address'
              ? 'border-primary-500 bg-primary-500  text-white'
              : 'border-gray-500 text-gray-500',
          ]"
        >
          <span>2</span>
        </div>

        <div
          class="mt-1"
          :class="[
            selected == 'address' ? 'text-primary-500  ' : ' text-gray-500',
          ]"
        >
          Address
        </div>
      </nuxt-link>

      <hr class="flex-1 mx-1 my-4 dashes text-gray-500" />

      <!--  -->

      <div class="w-16 flex flex-col items-center justify-center">
        <div
          class="
            flex
            items-center
            justify-center
            w-8
            h-8
            mx-auto
            rounded-full
            border
          "
          :class="[
            selected == 'payment'
              ? 'border-primary-500 bg-primary-500  text-white'
              : 'border-gray-500 text-gray-500',
          ]"
        >
          <span>3</span>
        </div>

        <div
          class="mt-1"
          :class="[
            selected == 'payment' ? 'text-primary-500  ' : ' text-gray-500',
          ]"
        >
          Payment
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    selected: { type: String, default: null },
  },
  // ['selected'],
}
</script>

<style scoped>
.dashes {
  border-top: dashed 1px;
}
</style>
