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
      <NavLanding class="fixed top-0 z-50 w-full" @showLogin="showLogin" />

      <Nuxt class="w-full mt-28 lg:mt-20" />
    </div>

    <BackToTopDark />

    <WhiteFooter />

    <OtpLogin v-if="showLoginModal" @showLogin="showLogin" />
  </div>
</template>

<script>
import OtpLogin from '~/components/Login/Mobile/OtpLogin.vue'
import NavLanding from '~/components/Home/NavLanding.vue'
import WhiteFooter from '~/components/Island/WhiteFooter.vue'
import BackToTopDark from '~/shared/components/ui/BackToTopDark.vue'

export default {
  components: { NavLanding, OtpLogin, BackToTopDark, WhiteFooter },

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
