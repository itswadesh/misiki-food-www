<template>
  <div class="ps-2 pe-2 mx-auto">
    <div class="mt-10 md:mt-20 absolute-center">
      <span
        class="text-xl font-semibold text-center md:text-3xl text-secondary-500"
      >
        24% Dicount on your Subscription
      </span>
      <span class="mt-4 text-lg text-center text-gray-700 md:text-2xl">
        Carry the day these styles Makes you gorgeous Person
      </span>
      <span class="text-lg text-center text-gray-700 md:text-2xl">
        Subscribe for everyday deals withs abundantly Coupons for free randomly
        though
      </span>
      <span class="text=lg md:text-2xl text-center text-gray-700">
        Get super deals and complete free delivery on premium activation
      </span>
      <div class="relative flex flex-row justify-center mt-10 md:mt-20">
        <div class="">
          <!-- mail icon  -->
          <svg
            class="absolute z-10 w-6 h-5 my-auto text-gray-400 ms-4 -pt-2 mt"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
            />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
        <input
          type="text"
          class="
            w-2/3
            px-8
            py-2
            text-gray-400
            bg-white
            border-none
            ps-12
            ring-1 ring-white
            focus:outline-none
            focus:ring-1
            focus:ring-blue-300
            focus:ring-offset-0
            rounded-s-3xl
            md:w-1/4
          "
          placeholder="Your Email Here"
        />
        <button
          class="
            px-4
            py-2
            font-semibold
            text-white
            md:px-6
            bg-secondary-500
            rounded-e-3xl
            focus:outline-none focus:ring-0 focus:ring-offset-0
            hover:shadow-2xl
          "
        >
          Subscribe
        </button>
      </div>
      <div
        class="
          flex flex-col
          justify-around
          py-12
          mt-12
          uppercase
          bg-gray-200
          md:mt-20
          w-max-full
          text-error
          md:flex-row md:ps-0
          text-size
        "
      >
        <div class="flex-row hidden md:flex">
          <span>17</span>
          <div class="pt-1 my-auto text-2xl font-semibold ms-2 text-error">
            <span>Golbal</span>
            <span>Brands</span>
          </div>
        </div>
        <div class="flex-row hidden md:flex">
          <span>74</span>
          <div class="pt-1 my-auto text-2xl font-semibold ms-2 text-error">
            <span>Current</span>
            <span>Stores</span>
          </div>
        </div>
        <!-- mobile start -->
        <div class="flex flex-row items-center justify-center w-full md:hidden">
          <div class="flex flex-row me-2">
            <span class="my-auto text-6xl">17</span>
            <div class="my-auto mt-1 text-lg font-semibold ms-2 text-error">
              <span>Golbal</span>
              <span>Brands</span>
            </div>
          </div>
          <div class="flex flex-row me-3">
            <span class="my-auto text-6xl">74</span>
            <div class="my-auto mt-1 text-lg font-semibold ms-2 text-error">
              <span>Current</span>
              <span>Stores</span>
            </div>
          </div>
        </div>
        <!-- mobile end -->
        <div class="flex flex-row justify-center">
          <span>300+</span>
          <div class="pt-1 my-auto text-2xl font-semibold ms-2 text-error">
            <span>Store</span>
            <span>2020 plan</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped>
.mt {
  margin-top: 9px;
}
.text-size {
  font-size: 500%;
}
.colorcode {
  color: #ff8c00;
}
</style>
