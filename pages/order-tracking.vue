<template>
  <div>
    <div></div>
    <div class="container pb-5 mx-auto">
      <Tracking />
    </div>
  </div>
</template>

<script>
import Tracking from '~/components/Order/Tracking.vue'
export default {
  components: { Tracking },
  middleware: ['isAuth'],
  head() {
    return {
      title: 'Order Tracking',
    }
  },
}
</script>
