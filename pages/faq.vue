<template>
  <div>
    <FAQ />
  </div>
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
