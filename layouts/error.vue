<template>
  <section class="min-h-screen px-8 py-1">
    <div
      class="
        pb-4
        mx-auto
        font-bold
        text-center text-gray-800
        border-b-4 border-gray-800
        lg:w-1/2
      "
    >
      <h1 v-if="error.statusCode === 404" class="text=5xl">404</h1>
      <h1 v-else class="text=4xl">Error!</h1>
      <img
        v-lazy="'/placeholder/no-network.png'"
        alt=""
        class="object-contain h-48 mx-auto sm:w-2/3"
      />
      <div class="px-4 py-2 mt-3 text-red-500 bg-red-200 border border-red-300">
        {{ error.message }}
      </div>
    </div>
    <div>
      <nuxt-link
        to="/"
        class="
          block
          px-4
          py-2
          mt-4
          text-sm
          font-thin
          text-center text-gray-700
          rounded
        "
      >
        {{ settings.websiteName }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    error: { type: Object, default: null },
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      ...i18nHead,
      title: `Error Occured - ${this.settings.websiteName}`,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
}
</script>

<style scoped>
h1 {
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
