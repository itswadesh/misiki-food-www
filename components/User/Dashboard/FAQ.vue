<template>
  <div
    v-if="faqs"
    class="
      flex flex-col flex-shrink-0
      p-8
      my-5
      mt-10
      text-sm
      bg-white
      shadow
      md:my-10
    "
  >
    <div class="mb-6 text-lg">FAQ's</div>
    <div v-for="f in faqs.data" :key="f.ix">
      <div class="flex-shrink-0 mb-2 text-gray-500">{{ f.question }}</div>
      <div class="mb-5 font-thin text-gray-400">{{ f.answer }}</div>
    </div>
  </div>
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
