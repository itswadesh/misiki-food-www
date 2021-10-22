<template>
  <section class="min-h-screen bg-white text-gray-800">
    <Megamenu class="hidden lg:flex px-10" />

    <div
      class="container flex flex-col max-w-7xl mx-auto px-4 md:px-10 lg:px-16"
    >
      <h1
        class="
          my-5
          sm:my-10
          font-serif font-bold
          text-3xl
          sm:text-4xl
          text-center
        "
      >
        RETURNS
      </h1>

      <div
        class="
          mx-auto
          max-w-max
          mb-10
          sm:mb-16
          flex
          items-center
          justify-start
          space-x-5
          text-sm
          font-semibold
        "
      >
        <span class="border-b-2 pb-0.5 border-transparent">India</span>
        <span class="border-b-2 pb-0.5 border-gray-800">Change Country</span>
      </div>

      <h2
        class="
          mb-5
          sm:mb-10
          font-serif font-bold
          text-xl
          sm:text-2xl
          text-center
        "
      >
        RETURNS POLICY
      </h2>

      <div
        class="
          max-w-3xl
          mx-auto
          grid grid-cols-1
          md:grid-cols-2
          gap-6
          md:gap-12
          lg:gap-16
          mb-10
          sm:mb-16
        "
      >
        <div
          v-for="(i, ix) in items"
          :key="ix"
          class="flex items-center space-x-4 max-w-xs"
        >
          <div v-html="i.svg"></div>

          <p class="flex-1 text-sm">{{ i.detail }}</p>
        </div>
      </div>

      <h2
        class="
          mb-5
          sm:mb-10
          font-serif font-bold
          text-xl
          sm:text-2xl
          text-center
        "
      >
        HOW CAN I RETURN AN ITEM?
      </h2>

      <div
        class="
          mb-5
          sm:mb-10
          max-w-xs
          mx-auto
          border
          bg-white
          shadow-md
          p-7
          flex flex-col
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 mx-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          />
        </svg>

        <h2 class="mb-5 font-bold text-center text-xl">Drop off your return</h2>

        <ul class="list-disc space-y-5 mb-10 px-5">
          <li>Return your items using our return portal.</li>
          <li>
            International returns are charged for through the returns portal.
          </li>
          <li>Returns via the returns portal are tracked.</li>
        </ul>

        <button
          class="
            py-3
            w-full
            rounded
            font-semibold
            tracking-wide
            text-white
            bg-black
            hover:opacity-80
            transition
            duration-300
            focus:outline-none focus:ring-0 focus:ring-offset-0
          "
        >
          START A RETURN
        </button>
      </div>

      <div class="mb-10">
        <h6 class="mb-5 text-center text-xs">
          Can't find what you're looking for?
        </h6>

        <div class="mx-auto max-w-max">
          <button
            class="
              py-3
              w-48
              rounded
              font-semibold
              tracking-wide
              text-white
              bg-black
              hover:opacity-80
              transition
              duration-300
              focus:outline-none focus:ring-0 focus:ring-offset-0
            "
          >
            SEE OUR FAQS
          </button>
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
        {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
</svg>`,
          detail:
            'Items can be returned within 28 days of delivery or store purchase',
        },
        {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
</svg>`,
          detail: 'Items should be clean, unworn and with tags still attached',
        },
        {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
</svg>`,
          detail: 'You’ll need your original receipt or returns note',
        },
        {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
</svg>`,
          detail: 'For exceptions to our returns policy click here',
        },
      ],
    }
  },

  head() {
    return {
      title: 'Returns',
    }
  },
}
</script>

<style scoped></style>
