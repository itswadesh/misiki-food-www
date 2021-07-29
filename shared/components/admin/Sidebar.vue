<template>
  <aside
    class="
      fixed
      inset-0
      z-50
      flex flex-col flex-shrink-0
      w-48
      h-screen
      overflow-auto
      text-white
      transition-all
      duration-300
      ease-in-out
      transform
      bg-gray-900
    "
  >
    <div class="flex items-start justify-between">
      <div class="mt-6 mb-3 ms-2 text-3xl text-white">Litekart</div>
      <button
        type="button"
        class="
          z-30
          px-2
          py-1
          text-lg
          bg-indigo-600
          cursor-pointer
          focus:outline-none
          hover:bg-indigo-700
        "
        @click="hideSidebar('forceClose')"
      >
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 fill-current"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.707 5.293a1 1 0 010 1.414l-12 12a1 1 0
                  01-1.414-1.414l12-12a1 1 0 011.414 0z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.293 5.293a1 1 0 011.414 0l12 12a1 1 0 01-1.414
                  1.414l-12-12a1 1 0 010-1.414z"
          />
        </svg>
      </button>
    </div>
    <div class="">
      <div v-for="(m, ix) in menu" :key="ix">
        <div class="m-2 mt-4 mb-2 text-xs text-gray-500">{{ m.title }}</div>
        <ul>
          <dropdown-menu
            v-for="(i, ixx) in m.items"
            :key="ixx"
            :title="i.name"
            :link="i.link"
            :submenu="i.items && i.items.length"
            @hideSidebar="
              hideSidebar(i.items && i.items.length > 0 ? false : true)
            "
          >
            <ul>
              <li v-for="(ii, ixxx) in i.items" :key="ixxx">
                <nuxt-link
                  :to="`${ii.link}#${i.link}`"
                  class="
                    block
                    py-2
                    ps-5
                    text-sm
                    cursor-pointer
                    hover:bg-indigo-600 hover:bg-opacity-20
                  "
                  @click.native="$emit('hideSidebar', true)"
                >
                  {{ ii.name }}
                </nuxt-link>
              </li>
            </ul>
          </dropdown-menu>
        </ul>
      </div>
    </div>
    <div v-if="user" class="mt-1 ms-2">
      <div class="py-2 text-xs font-semibold text-gray-500">Refer a Friend</div>
      <button class="py-2 text-xs font-semibold text-gray-500" @click="logout">
        Logout
      </button>
    </div>
    <div v-else class="mt-1 ms-2">
      <div class="py-2 text-xs font-semibold text-gray-500">Refer a Friend</div>
      <nuxt-link
        :to="localePath('/login')"
        class="py-2 text-xs font-semibold text-gray-500"
      >
        Login
      </nuxt-link>
    </div>
  </aside>
</template>

<script>
import { mapActions } from 'vuex'
import DropdownMenu from './DropdownMenu'
import { menu } from '~/config/menu'
export default {
  props: {
    open: { type: Boolean },
  },
  data() {
    return {
      menu,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    user() {
      return (this.$store.state.auth || {}).user
    },
  },
  mounted() {
    // $nuxt.$on('hide', () => {
    //   this.hideSidebar(true)
    // })
  },
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
    hideSidebar(e) {
      this.$emit('hideSidebar', e)
    },
  },
  components: { DropdownMenu },
}
</script>

<style scoped>
/* DropdownMenuStyle */
a.nuxt-link-active {
  @apply text-indigo-500;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  @apply text-indigo-600;
}
/* Hide scrollbar for Chrome, Safari and Opera */
aside::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
aside {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
