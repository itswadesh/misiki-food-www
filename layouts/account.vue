<template>
  <section
    class="
      relative
      flex flex-col
      w-full
      min-h-screen
      font-sans
      antialiased
      text-gray-900
      bg-gray-50
    "
  >
    <Nav class="fixed top-0 z-50 w-full" />

    <div class="w-full flex flex-row justify-center mt-28 md:mt-16">
      <LeftUserProfile class="sticky top-0 hidden lg:block" />

      <nuxt
        class="container w-full mx-auto px-2 sm:px-10 pt-2 sm:pt-10"
        keep-alive
      />
    </div>

    <div class="flex-1 w-full h-10" />

    <Footer class="absolute bottom-0" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Footer from '~/components/Footer.vue'
import LeftUserProfile from '~/components/User/LeftUserProfile.vue'

import Nav from '~/components/Home/Nav.vue'
export default {
  components: { Nav, Footer, LeftUserProfile },
  head() {
    return this.$nuxtI18nHead()
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  created() {
    // if (!this.user.firstName || this.user.firstName == '') {
    //   this.$router.push('/my/profile')
    // }
  },
}
</script>
