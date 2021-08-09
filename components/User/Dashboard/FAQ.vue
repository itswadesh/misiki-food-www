<template>
  <section
    v-if="faqs"
    class="
      flex flex-col
      p-5
      text-sm
      bg-white
      shadow-md
      rounded-md
      border
      md:my-10
      text-gray-800
    "
  >
    <div class="mb-6 font-semibold tracking-wide">FAQ's</div>

    <div v-for="f in faqs.data" :key="f.ix">
      <div class="mb-2 text-gray-600">{{ f.question }}</div>

      <div class="mb-5 font-thin text-gray-400">{{ f.answer }}</div>
    </div>
  </section>
</template>
<script>
import FAQS from '~/gql/faq/faqs.gql'
export default {
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
