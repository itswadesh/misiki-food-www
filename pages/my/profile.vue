<template>
  <section>
    <EditProfile />
  </section>
</template>
<script>
import EditProfile from '~/components/User/Dashboard/EditProfile.vue'
export default {
  components: {
    EditProfile,
  },
  layout: 'account',
  middleware: ['isAuth'],
  head() {
    return {
      title: 'User Profile',
    }
  },
}
</script>
