<template>
  <ul class="block text-sm font-semibold list-none">
    <button
      class="
        flex
        border-l-2 border-transparent
        hover:border-indigo-600
        items-center
        justify-between
        w-full
        py-1.5
        px-2
        cursor-pointer
        focus:outline-none
      "
      @click="toggleShow"
    >
      {{ title }}
      <svg
        v-if="submenu"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ 'rotate-90': showMenu }"
        class="w-5 h-5 pt-1 transition duration-300 bg-transparent"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <!-- <ChevronDownIcon
        v-if="submenu"
        width="20"
        height="20"
        :class="{ 'rotate-90': showMenu }"
        class="pt-1 bg-transparent"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </ChevronDownIcon> -->
    </button>
    <li
      v-if="submenu"
      class="me-4 overflow-hidden font-normal"
      :class="this.class"
    >
      <slot></slot>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['title', 'link', 'height', 'submenu'],
  data() {
    return {
      showMenu: false,
    }
  },
  computed: {
    class() {
      return this.showMenu ? this.height : 'h-0'
    },
  },
  created() {
    if (this.$route.hash.replace('#', '') === this.link) {
      this.showMenu = true
    }
  },
  methods: {
    toggleShow(t) {
      this.$emit('hideSidebar')
      this.$router.push(`${this.$router.currentRoute.path}`)
      this.showMenu = !this.showMenu
      if (!this.submenu) this.$router.push(this.link)
    },
  },
}
</script>

<style scoped>
svg.rotate-90 {
  transform: rotate(90deg);
  transition: 0.3s;
}
button:hover {
  @apply bg-indigo-500;
  @apply bg-opacity-20;
}
</style>
