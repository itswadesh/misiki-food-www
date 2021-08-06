<template>
  <div
    class="
      relative
      flex flex-col
      w-full
      font-sans
      antialiased
      text-gray-900
      bg-gray-50
    "
  >
    <div class="min-h-screen">
      <Nav class="fixed top-0 z-50 w-full" @showLogin="showLogin" />
      <Nuxt class="w-full mt-24 lg:mt-16" keep-alive />
      <div class="flex-1" />
    </div>
    <WhiteFooter class="hidden sm:block" />
    <OtpLogin v-if="showLoginModal" @showLogin="showLogin" />
  </div>
</template>
<script>
import OtpLogin from '~/components/Login/Mobile/OtpLogin.vue'
import Nav from '~/components/Home/Nav.vue'
import WhiteFooter from '~/components/Island/WhiteFooter.vue'
export default {
  components: { Nav, OtpLogin, WhiteFooter },
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
