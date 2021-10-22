<template>
  <section>
    <Megamenu class="hidden lg:flex px-10" />

    <div class="container mx-auto max-w-6xl p-2 py-5 sm:p-10 sm:mb-40">
      <FAQ big-heading />
    </div>
  </section>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import FAQ from '~/components/User/Dashboard/FAQ.vue'

export default {
  components: { Megamenu, FAQ },

  head() {
    return {
      title: 'FAQ',
    }
  },
}
</script>
