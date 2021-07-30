<template>
  <nuxt-link v-bind="{ ...$props, ...$attrs }" :to="toWithPrefix">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: { to: { type: String, default: '/' } },
  computed: {
    toWithPrefix() {
      return `/${this.$route.params.store}${this.to}`
    },
  },
}
</script>
