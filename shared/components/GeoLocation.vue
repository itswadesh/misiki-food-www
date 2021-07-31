<template>
  <div>
    <div v-if="errorStr">
      Sorry, but the following error occurred: {{ errorStr }}
    </div>
    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>
    <div v-if="geo" class="mt-6 mb-2 text-center align-middle">
      <div class="flex items-center justify-center">
        <svg
          class="w-6 h-6 transition-all ease-out transition-medium"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
          />
        </svg>
        Your location is {{ geo.city }}
        <nuxt-link
          :to="localePath('/change-location')"
          class="px-2 rounded text-secondary"
          >Change</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { location } from './../mixins'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  mixins: [location],
  data() {
    return {
      errorStr: null,
      geo: null,
      gettingLocation: false,
    }
  },
  mounted() {
    try {
      this.geo = this.$cookies.get('geo')
      if (!this.geo && process.client) {
        this.$router.push('/change-location')
        // this.gettingLocation = true;
        // this.geo = await this.locateMe();
      }
    } catch (e) {
      this.errorStr = e
    } finally {
      this.gettingLocation = false
    }
  },
}
</script>

<style scoped></style>
