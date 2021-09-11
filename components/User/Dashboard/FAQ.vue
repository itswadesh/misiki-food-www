<template>
  <section v-if="faqs && faqs.count > 0" class="md:my-10 text-gray-800">
    <div class="mb-3 text-lg font-semibold tracking-wide">
      Frequently Asked Questions
    </div>

    <div class="border-l border-t border-r rounded-lg overflow-hidden">
      <div
        v-for="f in faqs.data"
        :key="f.ix"
        class="border-b"
        :class="show[ix] ? 'bg-white' : 'bg-gray-50'"
        @click="showans(ix)"
      >
        <div
          class="
            px-2
            sm:px-4
            pt-2
            sm:pt-4
            cursor-pointer
            flex
            items-start
            justify-between
          "
          :class="show[ix] ? 'pb-0.5' : 'pb-2 sm:pb-4'"
        >
          <span class="flex-1 text-sm sm:text-base font-medium">{{
            f.question
          }}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 sm:h-6 transition duration-300 text-gray-500"
            :class="
              show[i] ? 'transform rotate-45 transition duration-300' : ''
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
          v-if="show[ix]"
          class="
            px-2
            sm:px-4
            pt-2
            pb-2
            sm:pb-4
            text-gray-500 text-xs
            sm:text-sm
            animate-dropdown
          "
        >
          {{ f.answer }}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import FAQS from '~/gql/faq/faqs.gql'

export default {
  data() {
    return {
      faqs: null,
      show: false,
    }
  },

  async created() {
    await this.getFaqs()
  },

  methods: {
    showans(ix) {
      show[ix] = !show[ix]
    },

    async getFaqs() {
      try {
        this.faqs = await this.$get('faq/faqs', {})
        // this.faqs = (
        //   await this.$apollo.query({
        //     query: FAQS,
        //     fetchpolicy: 'no-cache',
        //   })
        // ).data.faqs
      } catch (e) {}
    },
  },
}
</script>
