<template>
  <section class="text-gray-800 bg-gray-100 min-h-screen">
    <Megamenu class="hidden lg:flex px-10" />

    <div class="relative">
      <img
        v-lazy="`/island/help/group.jpg?tr=h-384,fo-auto`"
        alt=""
        class="object-cover object-top w-full h-96"
      />

      <div class="absolute inset-0 bg-black bg-opacity-30 flex justify-center">
        <h1
          class="
            mt-24
            text-white text-2xl
            sm:text-4xl
            font-bold
            tracking-wide
            text-center
            max-w-max
          "
        >
          Delivery and Collection
        </h1>
      </div>
    </div>

    <div
      class="
        -mt-44
        sm:-mt-32
        relative
        z-10
        container
        max-w-5xl
        mx-auto
        px-4
        md:px-10
        lg:px-16
      "
    >
      <div
        class="
          mx-10
          mb-5
          sm:mb-10
          flex
          items-center
          justify-start
          space-x-5
          text-sm text-white
          font-semibold
        "
      >
        <span class="border-b-2 pb-0.5 border-transparent">India</span>
        <span class="border-b-2 pb-0.5 border-white">Change Country</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-7 pb-10">
        <!-- To your door -->

        <div class="bg-white p-7 sm:p-10 w-full">
          <h1 class="mb-5 font-bold text-xl">To your door</h1>

          <h6 class="mb-1 font-bold">Standard Delivery</h6>

          <p class="mb-1 text-sm">Delivered within 10 working days</p>

          <h6 class="font-bold">£10.00</h6>
        </div>

        <!-- Pick it up -->

        <div class="bg-white p-7 sm:p-10 w-full">
          <h1 class="mb-5 font-bold text-xl">Pick it up</h1>

          <p class="mb-1 text-sm">
            Sorry, store collection is not available in your country.
          </p>
        </div>

        <!-- Popular Questions -->

        <div class="bg-white p-7 sm:p-10 w-full">
          <h1 class="mb-5 font-bold text-xl">Popular Questions</h1>

          <div class="flex flex-col">
            <div class="flex flex-wrap mb-5">
              <nuxt-link
                v-for="(i, ix) in items"
                :key="ix"
                to="##"
                class="bg-gray-100 rounded-full mb-3 me-3 py-2 px-6 max-w-max"
              >
                <span class="text-sm font-semibold">{{ i.query }}</span>
              </nuxt-link>
            </div>

            <h6 class="mt-2 mb-0.5 text-xs">
              Couldn't find what you're looking for? View more
            </h6>

            <nuxt-link
              to="##"
              class="
                font-semibold
                text-sm
                border-b border-black
                pb-0.5
                max-w-max
              "
            >
              Frequently asked question
            </nuxt-link>
          </div>
        </div>

        <div
          class="
            bg-white
            p-7
            sm:p-10
            w-full
            flex flex-col
            items-center
            justify-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mb-1 h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>

          <h6 class="mb-0.5 text-sm font-semibold">Free UK Returns</h6>

          <h6 class="mb-3 text-sm">With in 28 days</h6>

          <nuxt-link
            to="##"
            class="font-semibold text-sm border-b border-black pb-0.5 max-w-max"
          >
            More Info
          </nuxt-link>
        </div>
      </div>
    </div>

    <WantMore class="mb-20" />
    <!-- <WhiteFooter /> -->
  </section>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import WantMore from '~/components/Island/WantMore.vue'
import WhiteFooter from '~/components/Island/WhiteFooter.vue'

export default {
  components: { Megamenu, WantMore, WhiteFooter },

  data() {
    return {
      items: [
        { query: `Where is my order?` },
        { query: `There's a problem with my order` },
        { query: `How can i track my order?` },
      ],
    }
  },

  head() {
    return {
      title: 'Delivery',
    }
  },
}
</script>

<style scoped></style>
