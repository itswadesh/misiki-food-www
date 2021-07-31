<template>
  <div class="w-full p-2">
    <form
      class="relative"
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit(search)"
    >
      <div class="absolute">
        <svg
          class="
            w-6
            h-6
            mx-3
            my-2
            text-gray-400
            transition-all
            ease-out
            transition-medium
          "
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          />
        </svg>
      </div>
      <input
        v-model="search"
        aria-label="Search Box"
        type="text"
        class="
          w-full
          h-10
          px-10
          pr-4
          text-xs
          bg-transparent
          border border-gray-300
          rounded
          shadow
          focus:border-black focus:ring-0
          bg-purple-white
          focus:outline-none
        "
        placeholder="Search for products"
        name="search"
      />
      <!-- <nuxt-link
        :to="localePath('/')"
        class="absolute top-0 right-0 focus:outline-none"
      >
        <svg
          class="
            w-6
            h-6
            m-2
            text-gray-400
            transition-all
            ease-out
            transition-medium
          "
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
          />
        </svg>
      </nuxt-link> -->
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      search: '',
    }
  },
  computed: { ...mapGetters({ settings: 'settings' }) },
  watch: {
    search: {
      immediate: false,
      handler(value, oldValue) {
        // if (value.length < 4) return;
        if (!oldValue) return // Do not trigger on page load
        clearTimeout(this.typingTimer)
        const vm = this
        this.typingTimer = setTimeout(function () {
          if (!value || value === 'undefined') value = '' // When clear button clicked
          vm.searchString = value
          vm.$router.push(`/${this.$route.params.store}/search/${value}`)
        }, this.settings.typingTimeout)
      },
    },
    '$route.query.q': {
      immediate: true,
      handler(value) {
        let pathName = null
        if (this.$route.name) pathName = this.$route.name.substr(0, 8)
        if (pathName === 'category') return
        if (!value || value === 'undefined') value = ''
        if (value === '') return
        if (this.search === '') this.search = value
      },
    },
  },
  created() {
    this.search = this.$route.params.q
  },
  methods: {
    submit(q) {
      this.$router.push(`/${this.$route.params.store}/search/${q}`)
    },
    go(url) {
      this.$router.go(-1)
    },
  },
}
</script>
