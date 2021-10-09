<template>
  <div
    class="
      relative
      flex flex-col
      w-full
      font-sans
      antialiased
      text-gray-800
      bg-gray-50
    "
  >
    <div class="min-h-screen">
      <div
        v-if="!store.id && settings.isMultiStore"
        class="
          px-8
          py-12
          flex flex-col
          min-h-screen
          items-center
          justify-center
        "
      >
        <div
          class="mb-10 text-2xl font-bold text-center text-gray-800 md:text-3xl"
        >
          <img
            v-lazy="`/no/dog-png-1.png?tr=h-384,fo-auto`"
            alt=""
            class="mb-5 mx-auto w-full h-96 object-contain"
          />
          <p>Oops! Store not found</p>
        </div>

        <a :href="`${settings.ADMIN_PANEL_LINK}`" class="mb-5">
          <PrimaryButtonRounded class="w-52">
            Create your store
          </PrimaryButtonRounded>
        </a>

        <div class="mb-1 text-xs font-semibold text-center">
          {{ settings.websiteName }}
        </div>
      </div>

      <div v-else>
        <Nav class="fixed top-0 z-50 w-full" @showLogin="showLogin" />
        <div class="mt-rem">
          <Megamenu class="hidden lg:flex px-10" />

          <Nuxt class="w-full" />
        </div>
      </div>
    </div>

    <WhiteFooter />

    <BackToTopDark />

    <OtpLogin v-if="showLoginModal" @showLogin="showLogin" />

    <Modal
      :show="store.closed"
      type="info"
      title="Store is not accepting orders now"
    >
      <div class="-mt-8 flex flex-col items-center justify-center text-center">
        <img v-lazy="`/store-closed.png?tr=h-384,fo-auto`" alt="" class="" />
        <span> {{ store.closedMessage || 'Please visit back later' }}</span>
      </div>
    </Modal>
  </div>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import OtpLogin from '~/components/Login/Mobile/OtpLogin.vue'
import Nav from '~/components/Home/Nav.vue'
import WhiteFooter from '~/components/Island/WhiteFooter.vue'
import BackToTopDark from '~/shared/components/ui/BackToTopDark.vue'
import { Modal } from '~/shared/components/ui'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: {
    Megamenu,
    Nav,
    OtpLogin,
    WhiteFooter,
    BackToTopDark,
    Modal,
    PrimaryButtonRounded,
  },
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

<style scoped>
@media (max-width: 1024px) {
  .mt-rem {
    margin-top: 6.55rem;
  }
}
@media (min-width: 1024px) {
  .mt-rem {
    margin-top: 5.7rem;
  }
}
</style>
