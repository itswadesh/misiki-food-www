<template>
  <div>
    <ModalLarge :show="show" title="Select your language" type="info" noicon>
      <!-- Close button start -->
      <button
        type="button"
        class="
          absolute
          p-1
          transition
          duration-300
          transform
          rounded-md
          hover:bg-opacity-50
          group
          hover:bg-gray-900 hover:shadow-md
          top-3
          right-3
          focus:outline-none focus:scale-75
        "
        @click="$emit('close')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 transition duration-100 group-hover:text-white"
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
      <!-- Close button end -->

      <div class="w-full text-gray-800">
        <div class="mb-5">
          <h6 class="ms-4 mb-5 font-semibold">Suggested for you</h6>

          <div class="grid grid-cols-3 md:grid-cols-4 gap-x-5">
            <button
              v-for="(s, sx) in SuggestedForYou"
              :key="sx"
              class="
                px-4
                py-3
                w-full
                text-sm text-start
                flex flex-row
                items-center
                space-x-2
                bg-transparent
                hover:bg-gray-100
                focus:outline-none
              "
            >
              <div class="h-8 w-8 rounded-full overflow-hidden">
                <img
                  v-lazy="`${s.countryflag}?tr=w-32,h-32,fo-auto`"
                  alt="🚀"
                  class="h-full w-full object-cover"
                />
              </div>
              <h6>{{ s.language }}</h6>
            </button>
          </div>
        </div>

        <div>
          <h6 class="ms-4 mb-5 font-semibold">All languages</h6>

          <div class="grid grid-cols-3 md:grid-cols-4 gap-x-5">
            <button
              v-for="(a, ax) in AllLanguages"
              :key="ax"
              class="
                px-4
                py-3
                w-full
                text-sm text-start
                flex flex-row
                items-center
                space-x-2
                bg-transparent
                hover:bg-gray-100
                focus:outline-none
              "
            >
              <div class="h-8 w-8 rounded-full overflow-hidden">
                <img
                  v-lazy="`${a.countryflag}?tr=w-32,h-32,fo-auto`"
                  alt="🚀"
                  class="h-full w-full object-cover"
                />
              </div>
              <h6>{{ a.language }}</h6>
            </button>
          </div>
        </div>
      </div>
    </ModalLarge>
  </div>
</template>

<script>
import ModalLarge from '~/shared/components/ui/ModalLarge.vue'

export default {
  components: {
    ModalLarge,
  },

  props: {
    show: { type: Boolean, default: false },
  },

  data() {
    return {
      SuggestedForYou: [
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
      ],

      AllLanguages: [
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
        { countryflag: '/flags/india-flag.png', language: 'English(US)' },
      ],
    }
  },
}
</script>

<style scoped></style>
