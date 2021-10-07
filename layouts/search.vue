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
    <div>
      <Nav class="fixed top-0 z-50 w-full" @showLogin="showLogin" />
      <div class="mt-20">
        <Megamenu class="hidden xl:flex px-10" />

        <Nuxt class="w-full" />
      </div>
    </div>

    <BackToTopDark class="mb-3" />

    <WhiteFooter />

    <OtpLogin v-if="showLoginModal" @showLogin="showLogin" />

    <BackToTopDark />
  </div>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import OtpLogin from '~/components/Login/Mobile/OtpLogin.vue'
import Nav from '~/components/Home/Nav.vue'
import WhiteFooter from '~/components/Island/WhiteFooter.vue'
import BackToTopDark from '~/shared/components/ui/BackToTopDark.vue'

export default {
  components: { Megamenu, OtpLogin, BackToTopDark, Nav, WhiteFooter },
  data() {
    return {
      showLoginModal: false,
    }
  },
  head() {
    return this.$nuxtI18nHead()
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
  methods: {
    showLogin(e) {
      this.showLoginModal = e
    },
  },
}
</script>
