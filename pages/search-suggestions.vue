<template>
  <div>
    <div class="absolute z-20 px-1 my-auto mt-4">
      <nuxt-link :to="localePath('/')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-6 my-auto text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </nuxt-link>
    </div>
    <div class="absolute w-full">
      <div class="w-full">
        <div class="z-50 flex flex-col justify-center w-full">
          <div class="flex flex-wrap">
            <!--  Input anv Value method used for handling keyup in mobile -->
            <form
              autocomplete="off"
              class="flex flex-row w-full"
              @submit.prevent="submit"
            >
              <input
                ref="q"
                autofocus
                :placeholder="
                  (settings && settings.searchbarText) ||
                  'Search for products, brands...'
                "
                :value="q"
                class="
                  relative
                  w-full
                  p-2
                  ps-10
                  font-light
                  truncate
                  shadow
                  h-14
                  text-normal
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                "
                @input="getData"
              />
              <div class="flex justify-end h-full cursor-pointer">
                <svg
                  v-if="q"
                  class="
                    absolute
                    flex
                    justify-end
                    w-6
                    h-6
                    my-auto
                    mt-4
                    text-sm text-gray-500
                    me-2
                  "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  @click="resetInput"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  class="
                    absolute
                    flex
                    justify-end
                    w-6
                    h-6
                    my-auto
                    mt-4
                    text-sm text-gray-500
                    me-2
                  "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
            <div
              class="
                w-full
                mt-1
                overflow-auto
                bg-white
                border-gray-400
                rounded
                shadow
              "
            >
              <div
                v-for="(v, i) in autocomplete"
                :key="i"
                class="
                  flex flex-row
                  items-center
                  justify-between
                  w-full
                  text-base
                  font-light
                  text-gray-500
                  border-b
                  cursor-pointer
                  hover:bg-gray-100
                "
                @click="onselect(v)"
              >
                <div class="flex flex-row w-10/12">
                  <div v-if="v.img" class="w-1/6 my-auto">
                    <img
                      :key="v._id"
                      v-lazy="v.img"
                      alt=""
                      class="object-contain h-10 mx-auto my-auto"
                    />
                  </div>
                  <span class="w-5/6 p-3 truncate">{{ v.key }}</span>
                </div>
                <svg
                  class="mx-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="M0 0h24v24H0z" />
                    <path
                      fill="#000"
                      fill-opacity=".54"
                      fill-rule="nonzero"
                      d="M16.631 19.015l1.384-1.45-9.55-9.62h6.59v-2h-10v10h2v-6.59z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-auto p-3 mt-16 bg-white border-t border-b shadow">
      <span class="text-sm font-light text-gray-600">Discover More</span>
      <div v-if="popularSearches" class="grid grid-cols-2 mt-2">
        <nuxt-link
          v-for="p in popularSearches"
          :key="p.id"
          :to="`/search/${p.text}`"
          class="
            w-auto
            h-auto
            p-1
            m-1
            text-sm
            font-light
            text-center
            truncate
            bg-white
            shadow
            hover:bg-gray-100
            text-primary-500
          "
        >
          <span>{{ p.text }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import POPULAR_SEARCHES from '~/gql/search/popularSearches.gql'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  layout: 'none',
  data() {
    return {
      popularSearches: null,
      q: '',
      autocomplete: null,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
  created() {
    this.getPopularSearches()
  },
  methods: {
    async getPopularSearches() {
      try {
        this.loading = true
        this.popularSearches = (
          await this.$get('search/popularSearches', { sort: '-popularity' })
        ).data
        // this.popularSearches = (
        //   await this.$apollo.query({
        //     query: POPULAR_SEARCHES,
        //     variables: {
        //       sort: '-popularity',
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.popularSearches.data
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
    submit() {
      // const q1 = q ? `/search/${q}` : `/search/${this.q}`
      this.$router.push(`/search/${this.q}`)
    },
    onselect(v) {
      if (v) this.$router.push(`/search/${v.key}`)
    },
    fillValue(val) {
      this.product = val
    },
    async getData(e) {
      if (e.isComposing) {
        if (e.target.value === '') {
          this.q = this.query.slice(0, -1)
        } else {
          this.q = e.target.value
        }
      } else {
        this.q = e.target.value
      }
      // if (this.q == null || this.q == '') return
      try {
        const result = await this.$axios.$get('/api/products/autocomplete', {
          params: { q: this.q },
        })
        this.autocomplete = result.data
      } catch (e) {
        // console.log(e)
      }
    },
    resetInput() {
      this.q = ''
      this.$refs.q.focus()
    },
    mounted() {
      this.$refs.q.focus()
    },
  },
}
</script>
