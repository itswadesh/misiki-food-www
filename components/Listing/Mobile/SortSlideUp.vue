<template>
  <div class="">
    <div class="fixed inset-0 bg-white opacity-80 frosted" @click="hideSort" />
    <div
      class="
        fixed
        inset-x-0
        bottom-0
        flex flex-col
        mx-auto
        transition
        bg-white
        border-2
        shadow
        conatiner
        rounded-t-2xl
      "
    >
      <!-- short by row -->
      <div class="container flex flex-row justify-between p-3 border-b">
        <span class="text-lg text-gray-700">SORT BY</span>
        <button
          aria-label="Open sort"
          class="
            z-10
            p-1
            font-semibold
            rounded
            text-primary-500
            focus:outline-none
          "
          @click="hideSort"
        >
          Close
        </button>
      </div>
      <!-- radios -->
      <div v-for="(s, ix) in sorts" v-if="s" :key="ix">
        <label
          :value="s.val"
          class="
            flex flex-row
            justify-between
            w-full
            px-3
            m-3
            mx-auto
            font-medium
            text-gray-600
          "
        >
          <span>{{ s.name }}</span>
          <Radio v-model="sortBy" :value="s.val" @change="sortNow" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { Radio } from '~/shared/components/ui'
import { constructURL } from '~/lib/'
import { sorts } from '~/shared/config'
export default {
  components: { Radio },
  props: {
    category: {
      type: Object,
    },
    count: {
      type: Number,
    },
    fl: {
      type: [Object, Array],
    },
  },
  data() {
    return {
      isSort: true,
      sorts,
      sortBy: null,
    }
  },
  created() {
    // await this.getSortOptions()
    this.sortBy = this.$route.query.sort || '-createdAt'
  },
  methods: {
    scrollToTop() {
      if (process.client) {
        window.scroll({ behavior: 'smooth', left: 0, top: 100 })
      }
    },
    show(e) {
      this.isSort = true
    },
    hideSort(e) {
      this.$emit('hideSort', true)
    },
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
    sortNow() {
      const fl = { ...this.fl }
      fl.sort = this.sortBy
      this.hideSort()
      const url = constructURL(`/search`, fl)
      this.$router.push(url)
      this.scrollToTop()
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
.frosted {
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
</style>
