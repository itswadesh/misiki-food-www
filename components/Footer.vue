<template>
  <div
    class="flex-row justify-center w-full text-gray-500 p-2 text-sm text-center"
  >
    <span>Policy© 2007-{{ year }} {{ store.websiteName }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
  computed: {
    store() {
      return this.$store.state.store || {}
    },
  },
}
</script>
