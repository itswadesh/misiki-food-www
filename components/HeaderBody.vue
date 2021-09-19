<template>
  <div class="w-full padding text-sm border-b">
    <div class="grid grid-cols-3 items-center gap-5 place-content-between">
      <div class="col-span-1 justify-self-start">
        <Breadcrumb
          v-if="category && category.name"
          :path="category && category.pathA"
          :name="category.name"
        />
      </div>

      <div
        class="
          col-span-1
          font-light
          text-center
          flex
          space-x-1
          items-center
          justify-self-center
          overflow-hidden
          whitespace-nowrap
          overflow-ellipsis
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

      <div class="col-span-1 justify-self-end flex items-center">
        <h6 class="hidden lg:block text-xs font-light tracking-wide me-2">
          SORT BY :
        </h6>

        <select
          v-model="sortBy"
          class="
            py-1
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

<style scoped>
@media (max-width: 1280px) {
  .padding {
    padding: 7px;
  }
}
@media (min-width: 1280px) {
  .padding {
    padding: 9px;
  }
}
</style>
