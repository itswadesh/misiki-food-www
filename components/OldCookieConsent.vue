<template>
  <div
    v-if="showCookieConsent"
    class="
      fixed
      bottom-0
      inset-x-0
      frosted
      text-white text-center
      flex flex-col
      items-center
      justify-center
      px-8
      py-5
    "
  >
    <h1 class="mb-4 text-xs font-light tracking-wide leading-loose">
      We use cookies to improve user experience, and analyze website traffic.
      For these reasons, we may share your site usage data with our analytics
      partners. By continuing to the site, you consent to store on your device
      all the technologies described in our cookie policy. Here is the the

      <a href="/legal/privacy-policy" class="underline">cookie policy </a>
    </h1>

    <button
      class="
        text-sm
        bg-black
        border
        px-4
        py-2
        hover:bg-opacity-50
        max-w-max
        transition
        duration-300
      "
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
      console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', this.$store.state.store)
      if (
        !cookieConsentContent &&
        this.$store.state.store &&
        this.$store.state.store.gdprCookieConsent
      )
        this.showCookieConsent = true
    },
  },
}
</script>

<style scoped>
.frosted {
  backdrop-filter: blur(15px);
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
