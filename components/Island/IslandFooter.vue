<template>
  <section class="bg-white py-10 md:py-20 text-center md:text-left">
    <div class="w-full max-w-7xl mx-auto px-3">
      <div
        class="
          mb-10
          md:mb-20 md:flex md:items-start md:justify-between md:space-x-20
        "
      >
        <div class="mb-10 md:mb-0 md:w-1/2">
          <h1 class="mb-5 pb-5 border-b border-gray-400 font-semibold text-lg">
            How can we help?
          </h1>

          <div class="md:flex md:items-start md:justify-between">
            <div class="md:w-1/2">
              <div class="space-y-3">
                <div
                  v-for="(h, hx) in helpcontainer"
                  :key="hx"
                  class="font-light text-sm whitespace-nowrap"
                >
                  <nuxt-link :to="h.link">
                    {{ h.name }}
                  </nuxt-link>
                </div>
              </div>
            </div>

            <div class="md:w-1/2">
              <div class="space-y-3">
                <div
                  v-for="(hh, hhx) in helpcontainer2"
                  :key="hhx"
                  class="font-light text-sm whitespace-nowrap"
                >
                  <nuxt-link :to="hh.link">
                    {{ hh.name }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="
            md:w-1/2 md:flex md:items-start md:justify-between md:space-x-20
          "
        >
          <div class="mb-10 md:mb-0 md:w-1/2">
            <h1
              class="mb-5 pb-5 border-b border-gray-400 font-semibold text-lg"
            >
              Useful info
            </h1>

            <div class="md:flex md:items-start md:justify-between">
              <div class="md:w-1/2">
                <div class="space-y-3">
                  <div
                    v-for="(u, ux) in usefullinfo"
                    :key="ux"
                    class="font-light text-sm whitespace-nowrap"
                  >
                    <nuxt-link :to="u.link">
                      {{ u.name }}
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="md:w-1/2">
            <h1
              class="mb-5 pb-5 border-b border-gray-400 font-semibold text-lg"
            >
              Inside Misiki
            </h1>

            <div class="md:flex md:items-start md:justify-between">
              <div class="md:w-1/2">
                <div class="space-y-3">
                  <div
                    v-for="(i, ix) in InsideMisiki"
                    :key="ix"
                    class="font-light text-sm whitespace-nowrap"
                  >
                    <nuxt-link :to="i.link">
                      {{ i.name }}
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mb-10 flex items-center justify-center space-x-5 md:space-x-10"
      >
        <a v-for="(s, sx) in socialmedia" :key="sx" href="#" class="">
          <img :src="s.icon" :alt="s.name" class="h-6 w-6 md:h-8 md:w-8" />
        </a>
      </div>

      <div class="text-xs text-gray-400 text-center font-light tracking-wide">
        © {{ year }} {{ store.websiteName }}
        <span v-if="store.websiteEmail" class="ms-2">
          {{ store.websiteEmail }}</span
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),

      helpcontainer: [
        { link: '/', name: 'Merchant Dashboard' },
        { link: '/legal/shipping-policy', name: 'Shipping Policy' },
        { link: '/my/orders', name: 'Track Order' },
        { link: '/legal/return-policy', name: 'Return Policy' },
      ],

      helpcontainer2: [
        { link: '/faq', name: 'FAQ' },
        { link: '/', name: 'Become a Merchant' },
        { link: '/how-it-works', name: 'How it works' },
        { link: '/my/orders', name: 'Contact Seller' },
      ],

      usefullinfo: [
        { link: '/legal/terms', name: 'Terms Of Use' },
        { link: '/legal/privacy-policy', name: 'Privacy policy' },
        { link: '/features', name: 'Features' },
        { link: '/blog"', name: 'Blog' },
      ],

      InsideMisiki: [
        { link: '/contact-us', name: 'Contact Us' },
        { link: '/legal/about-us', name: 'About Us' },
        { link: '/career', name: 'Career' },
        { link: '/contact-us', name: 'Disputes' },
      ],

      socialmedia: [
        { name: 'facebook', icon: '/socialmedia/facebook.png' },
        { name: 'facebook', icon: '/socialmedia/twitter.png' },
        { name: 'facebook', icon: '/socialmedia/instagram.png' },
        { name: 'facebook', icon: '/socialmedia/linkedin.png' },
        { name: 'facebook', icon: '/socialmedia/youtube.png' },
      ],
    }
  },

  computed: {
    store() {
      return this.$store.state.store || {}
    },
    settings() {
      return this.$store.state.settings || {}
    },
  },
}
</script>

<style></style>
