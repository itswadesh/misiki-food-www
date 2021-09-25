<template>
  <button
    v-if="scrolled > 1000"
    class="
      fixed
      bottom-3
      right-3
      z-10
      flex
      items-center
      space-x-2
      w-8
      h-8
      frosted
      border border-gray-600
      rounded-full
      shadow-md
      hover:shadow
      transition-all
      duration-700
      transform
      hover:-translate-y-0.5 hover:text-white
      focus:outline-none
    "
    @click="scrollToTop"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-4 m-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  </button>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      shouldShow: false,
      scrolled: 0,
    }
  },
  mounted() {
    if (process.client) {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY
      })
    }
  },
  methods: {
    scrollToTop() {
      if (process.client) {
        window.scroll({ behavior: 'smooth', left: 0, top: 100 })
      }
    },
  },
}
</script>

<style scoped>
.frosted {
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
.frosted:hover {
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 0%, 0.75);
}
</style>
