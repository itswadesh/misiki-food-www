<template>
  <section class="container mx-auto">
    <Dashboard class="mb-5 sm:mb-10" />

    <FAQ />
  </section>
</template>

<script>
import Dashboard from '~/components/User/Dashboard/Dashboard.vue'
import FAQ from '~/components/User/Dashboard/FAQ.vue'

export default {
  components: {
    Dashboard,
    FAQ,
  },

  layout: 'account',

  middleware: ['isAuth'],

  head() {
    return {
      title: 'Dashboard',
    }
  },
}
</script>
