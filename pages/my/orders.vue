<template>
  <section>
    <MyOrder />

    <!-- <Footer class="absolute bottom-0 hidden md:flex" /> -->
  </section>
</template>
<script>
import MyOrder from '~/components/Order/MyOrder.vue'
export default {
  components: {
    MyOrder,
  },
  layout: 'account',
  middleware: ['isAuth'],
  head() {
    return {
      title: 'Order Details',
    }
  },
}
</script>
