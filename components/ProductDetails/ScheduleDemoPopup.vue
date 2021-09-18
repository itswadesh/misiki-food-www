<template>
  <div>
    <!-- <VueCtkDateTimePicker
      v-model="demo.scheduleDate"
      :min-date="minDate"
      class="shadow-md"
    /> -->
  </div>
</template>

<script>
// import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
export default {
  components: {
    // VueCtkDateTimePicker,
  },
  props: {
    show: { type: Boolean, default: false },
  },
  data() {
    return {
      minDate: null,
      demo: { name: null, email: null, pid: null, scheduleDate: new Date() },
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || {}
    },
  },
  created() {
    this.minDate = new Date()
    this.demo.name = this.user.firstName
    this.demo.email = this.user.email
    this.demo.pid = this.$route.query.id
  },
}
</script>

<style></style>
