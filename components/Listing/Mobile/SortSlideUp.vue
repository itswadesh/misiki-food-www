<template>
  <div>
    <div class="fixed inset-0 frosted" @click="hideSort" />
    <div
      class="
        fixed
        inset-x-0
        bottom-0
        flex flex-col
        mx-auto
        transition
        bg-white
        text-sm text-gray-800
        border
        shadow
        conatiner
        rounded-t-md
      "
    >
      <!-- short by row -->

      <div class="flex items-center justify-between p-4">
        <span>SORT BY</span>

        <button
          type="button"
          aria-label="Open sort"
          class="
            font-medium
            text-primary-500
            focus:outline-none focus:ring-0 focus:ring-offset-0
          "
          @click="hideSort"
        >
          Close
        </button>
      </div>

      <hr class="border-t border-gray-200 w-full" />

      <!-- radios -->

      <div class="px-4 py-2 flex flex-col">
        <div v-for="(s, ix) in sorts" v-if="s" :key="ix">
          <label
            :value="s.val"
            class="flex flex-row items-center justify-between w-full py-2"
          >
            <span>{{ s.name }}</span>

            <Radio v-model="sortBy" :value="s.val" @change="sortNow" />
          </label>
        </div>
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
  background-color: hsla(0, 0%, 0%, 0.75);
}
</style>
