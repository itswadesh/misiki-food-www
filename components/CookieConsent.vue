<template>
  <div
    v-if="showCookieConsent"
    class="fixed bottom-0 bg-gray-800 text-white text-center flex-col px-8 py-4"
  >
    <h1 class="text-xs">
      We use cookies to improve user experience, and analyze website traffic.
      For these reasons, we may share your site usage data with our analytics
      partners. By continuing to the site, you consent to store on your device
      all the technologies described in our cookie policy. Here is the the
      <a href="/legal/privacy-policy">cookie policy </a>
    </h1>
    <button
      class="bg-black border px-4 py-2 mt-2 hover:bg-gray-900"
      @click="allowCookies"
    >
      Allow Cookies
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCookieConsent: false,
    }
  },
  mounted() {
    const vm = this
    setTimeout(function () {
      vm.checkCookieConsent()
    }, 3000)
  },
  methods: {
    allowCookies() {
      this.$cookies.set('cookieConsent', true, { path: '/' })
      this.showCookieConsent = false
    },
    checkCookieConsent() {
      const cookieConsentContent = this.$cookies.get('cookieConsent')
      if (!cookieConsentContent) this.showCookieConsent = true
    },
  },
}
</script>

<style></style>
