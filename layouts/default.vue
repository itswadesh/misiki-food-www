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
      <div
        v-if="!store.id && settings.isMultiStore"
        class="px-8 py-12 flex flex-col items-center justify-center"
      >
        <div
          class="mb-6 text-2xl font-bold text-center text-gray-800 md:text-3xl"
        >
          <img src="/no/dog-png-1.png" alt="" class="mx-auto h-96 w-72" />
          <p>Oops! Store not found</p>
        </div>

        <a target="blank" :href="`${settings.adminPanelLink}`" class="mb-5">
          <GrnIndGradiantButton
            :loading="loading"
            class="w-52"
            @click="loading = true"
          >
            Create your store
          </GrnIndGradiantButton>
        </a>

        <div class="mb-1 text-xs font-semibold text-center">
          {{ websiteName }}
        </div>
      </div>

      <div v-else>
        <Nav class="fixed top-0 z-50 w-full" @showLogin="showLogin" />

        <Nuxt class="w-full mt-24 lg:mt-16" keep-alive />
      </div>

      <div class="flex-1" />
    </div>

    <WhiteFooter class="hidden sm:block" />

    <OtpLogin v-if="showLoginModal" @showLogin="showLogin" />
    <Modal :show="store.closed" title="Store is not accepting orders now">
      {{ store.closedMessage || 'Please visit back later' }}
    </Modal>
  </div>
</template>
<script>
import OtpLogin from '~/components/Login/Mobile/OtpLogin.vue'
import Nav from '~/components/Home/Nav.vue'
import WhiteFooter from '~/components/Island/WhiteFooter.vue'
import { Modal } from '~/shared/components/ui'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
export default {
  components: { Nav, OtpLogin, WhiteFooter, Modal, GrnIndGradiantButton },
  data() {
    return {
      showLoginModal: false,
      loading: false,
    }
  },
  head() {
    return this.$nuxtI18nHead()
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    store() {
      return this.$store.state.store || {}
    },
  },
  methods: {
    showLogin(e) {
      this.showLoginModal = e
    },
  },
}
</script>
