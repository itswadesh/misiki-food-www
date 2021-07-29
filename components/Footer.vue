<template>
  <div
    class="
      flex-row
      justify-center
      w-full
      p-2
      text-sm
      font-semibold
      text-center
      bg-white
      text-primary-500
      -z-2
    "
  >
    <span>Policy© 2007-{{ year }} {{ settings.websiteName }}</span>
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
    settings() {
      return this.$store.state.settings || {}
    },
  },
}
</script>
