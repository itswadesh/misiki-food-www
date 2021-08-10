<template>
  <section class="container mx-auto">
    <Dashboard class="" />
  </section>
</template>

<script>
import Dashboard from '~/components/User/Dashboard/Dashboard.vue'

export default {
  components: {
    Dashboard,
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
