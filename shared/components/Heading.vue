<template>
  <div class="flex items-center justify-start px-2 bg-gray-50 md:bg-white">
    <button
      class="
        absolute
        flex flex-1
        px-2
        py-1
        font-bold
        rounded
        text-start
        focus:ring-gray-200 focus:outline-none
        md:hidden
        hover:bg-gray-200
      "
      @click="go()"
    >
      <!-- <ChevronLeftIcon  class="text-gray-600 me-1" /> -->
      <svg
        class="w-6 h-6 transition-all ease-out transition-medium"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
        />
      </svg>
    </button>
    <h1
      class="
        flex-1
        p-2
        text-xl
        font-semibold
        text-center
        bg-gray-50
        md:bg-white md:text-left
      "
    >
      {{ title }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: null },
    back: { type: String, default: null },
  },
  methods: {
    go(url) {
      this.back ? this.$router.push(this.back || -1) : this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
