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
    <Nav class="fixed top-0 z-50 w-full" @showLogin="showLogin" />

    <Nuxt />

    <div class="flex-1" />

    <IslandFooter />

    <OtpLogin v-if="showLoginModal" @showLogin="showLogin" />
  </div>
</template>
<script>
import Nav from '~/components/Home/Nav.vue'
import OtpLogin from '~/components/Login/Mobile/OtpLogin.vue'
import IslandFooter from '~/components/Island/IslandFooter.vue'

export default {
  components: {
    Nav,
    IslandFooter,
    OtpLogin,
  },

  data() {
    return {
      showLoginModal: false,
    }
  },

  head() {
    return this.$nuxtI18nHead()
  },

  methods: {
    showLogin(e) {
      this.showLoginModal = e
    },
  },
}
</script>
