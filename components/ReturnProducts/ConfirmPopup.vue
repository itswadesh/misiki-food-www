<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:min-h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          overflow-hidden
          align-bottom
          transition-all
          transform
          bg-white
          rounded-lg
          shadow-xl
          text-start
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="flex flex-row justify-end p-3 text-gray-500">
          <button
            class="focus:outline-none focus:ring-0 focus:ring-offset-0"
            @click="hide(null)"
          >
            <svg
              class="w-6 h-6 text-gray-500 hover:text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <div class="flex items-center justify-center">
            <img
              v-lazy="`/img/green-bg-check.png?tr=w-80,h-80,fo-auto`"
              alt=""
              class="w-20 h-20 rounded-full"
            />
          </div>
          <span class="mt-3 text-xl text-center text-secondary-500">
            Items Returned Successfullly
          </span>
          <span class="px-4 mt-8 mb-8 text-sm text-center">
            We will pick-up your pasrsel on <b>28-02-2025</b> at your location
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
  methods: {
    hide(e) {
      //  console.log("hide ho ja")
      // this.sidebar = false
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hide', true)
    },
  },
}
</script>
