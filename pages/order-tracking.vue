<template>
  <section>
    <Megamenu class="hidden lg:flex px-10" />

    <div class="container pb-5 mx-auto">
      <Tracking />
    </div>
  </section>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'

import Tracking from '~/components/Order/Tracking.vue'
export default {
  components: { Megamenu, Tracking },
  middleware: ['isAuth'],
  head() {
    return {
      title: 'Order Tracking',
    }
  },
}
</script>
