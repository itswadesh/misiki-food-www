<template>
  <div
    class="
      hidden
      sm:grid
      grid-cols-3
      items-center
      gap-5
      place-content-between
      w-full
      p-4
      lg:p-2
      text-sm
      border-b
    "
  >
    <div class="col-span-1 justify-self-start lg:hidden">
      <button
        class="
          w-20
          text-sm
          font-semibold
          uppercase
          tracking-wide
          py-1.5
          bg-gray-300
          hover:bg-primary-500
          border border-gray-300
          hover:border-primary-500
          text-gray-800
          hover:text-white
          transition
          duration-300
          rounded-md
          focus:outline-none
        "
        @click="$emit('showFilters')"
      >
        Filter
      </button>
    </div>

    <div class="hidden lg:block col-span-1 justify-self-start">
      <Breadcrumb
        v-if="category && category.name"
        :path="category && category.pathA"
        :name="category.name"
      />
    </div>

    <div
      class="
        flex
        col-span-1
        font-light
        text-center
        items-center
        space-x-1
        justify-self-center
      "
    >
      <span class="font-bold"> {{ count || 'No' }} </span>

      <span>items found for</span>

      <span
        v-if="category && category.name && category.name !== ''"
        class="font-bold"
      >
        {{ category.name }}
      </span>

      <q v-else class="font-bold"> {{ $route.params.q }} </q>
    </div>

    <div class="col-span-1 justify-self-end">
      <select
        v-model="sortBy"
        class="
          py-1.5
          text-sm
          font-light
          border-gray-300
          rounded
          focus:outline-none
        "
        @change="sort"
      >
        <option v-for="(s, ix) in sorts" v-if="s" :key="ix" :value="s.val">
          {{ s.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { constructURL } from '~/lib/'
import { sorts } from '~/shared/config'
import Breadcrumb from '~/components/ProductDetails/Breadcrumb.vue'

export default {
  components: { Breadcrumb },
  props: {
    category: {
      type: Object,
      default: () => {},
    },
    count: {
      type: Number,
      default: null,
    },
    fl: {
      type: [Object, Array],
      default: () => null,
    },
  },
  data() {
    return {
      sorts,
      sortBy: null,
    }
  },
  // eslint-disable-next-line require-await
  async created() {
    // await this.getSortOptions()
    this.sortBy = this.$route.query.sort || '-createdAt'
  },
  methods: {
    // async getSortOptions() {
    //   try {
    //     this.loading = true
    //     this.sorts = (
    //       await this.$apollo.query({
    //         query: SORTS,
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.sorts
    //   } catch (e) {
    //   } finally {
    //     this.isLoading = false
    //   }
    // },
    sort() {
      // // let url = new URL(window.location.host + this.$route.fullPath)
      // // let params = new URLSearchParams(url.search)

      // // // //Add a third parameter.
      // // params.set('sort', this.sortBy)
      // // // params.toString() // "foo=1&bar=2&baz=3"
      // // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', params.toString())
      // // let fl = { ...this.fl }
      // // fl.sort = this.sortBy
      // this.$route.query.sort = this.sortBy
      // let url = constructURL('/c', this.$route.query)
      // const path = '/c/' + this.$route.params.slug + url
      // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', path)
      // this.$router.push(path)
      const fl = { ...this.fl }
      fl.sort = this.sortBy
      const url = constructURL(`/search`, fl)
      this.$router.push(url)
    },
    remove(k, i) {
      const ix = this.fl[k].indexOf(i)
      this.fl[k].splice(ix, 1)
      // this.$emit("removed", this.fl);
      const url = constructURL(`/search`, this.fl)
      this.$router.push(url)
    },
  },
}
</script>
