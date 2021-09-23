<template>
  <section class="container mx-auto max-w-6xl p-2 py-5 sm:p-10 sm:mb-40">
    <FAQ big-heading />
  </section>
</template>

<script>
import FAQ from '~/components/User/Dashboard/FAQ.vue'

export default {
  components: {
    FAQ,
  },

  head() {
    return {
      title: 'FAQ',
    }
  },
}
</script>
