<template>
  <div
    class="
      flex flex-col
      w-full
      min-h-screen
      font-sans
      antialiased
      text-gray-900
      bg-gray-50
    "
  >
    <Nuxt />

    <BackToTopDark />

    <div class="flex-1" />
  </div>
</template>
<script>
import BackToTopDark from '~/shared/components/ui/BackToTopDark.vue'

export default {
  components: {
    BackToTopDark,
  },

  head() {
    return this.$nuxtI18nHead()
  },
}
</script>
