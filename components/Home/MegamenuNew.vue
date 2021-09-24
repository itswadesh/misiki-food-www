<template>
  <div class="w-full mx-auto mt-12 text-gray-800 bg-transparent border-b">
    <ul class="container flex flex-row justify-center mx-auto text-sm">
      <li
        v-for="(category, index) in megamenu"
        :key="category.id"
        class="h-auto mx-1 my-auto border-b-4 border-transparent hoverable"
        :class="{
          'hover:border-yellow-500 ': index % 6 == 0,
          'hover:border-purple-500': index % 6 == 1,
          'hover:border-red-500 ': index % 6 == 2,
          'hover:border-green-500 ': index % 6 == 3,
          'hover:border-pink-500 ': index % 6 == 4,
          'hover:border-blue-500 ': index % 6 == 5,
        }"
      >
        <nuxt-link
          :to="localePath(`/c/${category.slug}`)"
          class="
            relative
            flex flex-row
            items-end
            space-x-1
            flex-shrink-0
            p-2
            py-3
            mx-auto
            my-auto
            font-medium
          "
          :class="{
            'hover:text-yellow-500 ': index % 6 == 0,
            'hover:text-purple-500': index % 6 == 1,
            'hover:text-red-500 ': index % 6 == 2,
            'hover:text-green-500 ': index % 6 == 3,
            'hover:text-pink-500 ': index % 6 == 4,
            'hover:text-blue-500 ': index % 6 == 5,
          }"
        >
          <!-- Root category -->

          <h1>{{ category.name }}</h1>

          <!-- Down icon -->

          <svg
            v-if="category.children != 0"
            class="w-4 h-4 my-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </nuxt-link>

        <div
          v-if="category.children.length"
          class="mt-1 border-b shadow-2xl mega-menu"
        >
          <div class="p-5 bg-white shadow-inner">
            <div
              class="flex flex-col flex-wrap items-start"
              :class="category.children.length > 4 ? 'max-h-screen' : 'h-72'"
            >
              <!-- 2nd level child category  -->

              <div
                v-for="(c, ix) in category.children"
                :key="ix"
                class="w-64 flex-shrink-0 flex-grow-0 flex-1 pe-5 mb-5"
              >
                <nuxt-link :to="localePath(`/c/${c.slug}`)" class="flex">
                  <h1
                    class="mb-2 font-medium hover:font-semibold"
                    :class="{
                      'text-yellow-500': index % 6 == 0,
                      'text-purple-500': index % 6 == 1,
                      'text-red-500': index % 6 == 2,
                      'text-green-500': index % 6 == 3,
                      'text-pink-500': index % 6 == 4,
                      'text-blue-500': index % 6 == 5,
                    }"
                  >
                    {{ c.name }}
                  </h1>
                </nuxt-link>

                <div
                  v-if="c && c.children"
                  class="flex flex-col flex-wrap items-start space-y-1"
                >
                  <!-- 3rd level child category  -->

                  <div v-for="(c1, ixx) in c.children" :key="ixx">
                    <nuxt-link :to="localePath(`/c/${c1.slug}`)">
                      <h2
                        class="text-sm font-light hover:font-medium min-w-full"
                      >
                        {{ c1.name }}
                      </h2>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { NuxtLink },

  props: {
    brand: { type: String, default: null },
  },

  data() {
    return {
      // megamenu: null,
      parentBrands: false,
    }
  },

  computed: {
    ...mapGetters({ megamenu: 'megamenu' }),
  },
}
</script>

<style scoped>
.mega-menu {
  visibility: hidden;
  transition: 0.2s 0.1s; /* delay of 1 seconds on hover off */
  opacity: 0;
  left: 0;
  position: absolute;
  text-align: left;
  width: 100%;
  z-index: 9999;
}

/* #hoverable Class Styles
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
.hoverable {
  position: static;
}

.hoverable > a::after {
  padding-left: 6px;
  position: relative;
}

.hoverable:hover .mega-menu {
  visibility: visible;
  opacity: 1;
  transition-delay: 0.1s;
}
</style>
