<template>
  <section v-if="faqs && faqs.count > 0" class="text-gray-800">
    <h1
      v-if="bigHeading"
      class="
        mb-7
        sm:mb-14
        font-serif font-bold
        text-2xl
        sm:text-4xl
        text-center
        flex flex-col
        items-center
        sm:items-start
        max-w-max
        mx-auto
      "
    >
      <span>Frequently Asked Questions</span>

      <hr class="mt-5 border-t-4 border-gray-800 opacity-50 w-20" />
    </h1>

    <div
      v-else
      class="mb-3 sm:mb-5 text-xl sm:text-2xl font-semibold tracking-wide"
    >
      Frequently Asked Questions
    </div>

    <div
      class="border-l border-t border-r rounded-md shadow-md overflow-hidden"
    >
      <div
        v-for="(f, ix) in faqs.data"
        :key="ix"
        class="px-5 sm:px-8 border-b bg-white text-gray-700"
      >
        <div
          class="py-5 sm:py-8 flex items-center justify-between cursor-pointer"
          @click="f.opened = !f.opened"
        >
          <h1 class="flex-1 text-sm sm:text-base font-medium me-2 sm:me-5">
            {{ f.question }}
          </h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 sm:h-6 transition duration-300 text-gray-500"
            :class="
              f.opened ? 'transform rotate-45 transition duration-300' : ''
            "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </div>

        <div
          v-if="f.opened"
          class="overflow-hidden transition-all duration-1000 ease-in-out"
          :class="
            f.opened ? 'max-h-32 animate-dropdown' : 'max-h-0 animate-shiftup'
          "
        >
          {{ f.answer }}

          <div class="h-5 sm:h-8 w-full bg-transparent"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    bigHeading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      faqs: null,
    }
  },
  async created() {
    await this.getFaqs()
  },

  methods: {
    async getFaqs() {
      try {
        this.faqs = await this.$get('faq/faqs', {})
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
