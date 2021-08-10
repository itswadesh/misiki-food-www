<template>
  <div class="w-full mt-4">
    <div
      class="
        items-center
        justify-between
        flex-none
        hidden
        w-full
        text-sm
        lg:flex
      "
    >
      <div v-if="count !== 0" class="flex flex-row my-auto text-sm font-thin">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="
            w-5
            h-5
            text-gray-500
            cursor-pointer
            me-1
            hover:text-primary-500
          "
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          />
        </svg> -->
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg> -->
        <Breadcrumb
          v-if="category && category.name"
          :path="category && category.pathA"
          :name="category.name"
        />
        <!-- <span
          v-if="category && category.name"
          class="capitalize cursor-pointer ms-1 hover:text-primary-500"
        >
          {{ category.name }}
        </span> -->
        <!-- <span
          v-else
          class="capitalize cursor-pointer ms-1 hover:text-primary-500"
        >
          {{ $route.params.q }}
        </span> -->
      </div>

      <div class="flex p-1 my-auto font-semibold">
        <div class="text-gray-500 text-1">
          <b> {{ count || 'No' }} </b
          ><span class="font-light">items found</span>
          <span v-if="category && category.name"
            ><span class="font-light">under</span>
            <b
              ><q>{{ category.name }} </q></b
            ></span
          >
          <span v-else>
            <span class="font-light">for</span>

            <b
              ><q>{{ $route.params.q }} </q></b
            >
          </span>
        </div>
      </div>

      <div class="flex-wrap p-1 mt-1">
        <div class="text-sm">
          <div class="relative flex flex-row">
            <span class="my-auto text-sm font-light text-gray-500 me-2"
              >SORT BY</span
            >
            <select
              v-model="sortBy"
              class="
                text-sm
                font-light
                border border-gray-300
                rounded
                focus:ring-0 focus:border-primary-500
                hover:shadow
                focus:outline-none
              "
              @change="sort"
            >
              <option
                v-for="(s, ix) in sorts"
                v-if="s"
                :key="ix"
                class="bg-transparent text-start"
                :value="s.val"
              >
                {{ s.name }}
              </option>
            </select>

            <div
              class="
                absolute
                inset-y-0
                right-0
                flex
                items-center
                px-2
                pointer-events-none
                text-primary-500
              "
            >
              <i class="px-1 fa fa-caret-down" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        flex-row
        justify-between
        hidden
        w-full
        mb-2
        sm:flex sm:px-4
        xs:block
        lg:hidden
      "
    >
      <div
        class="
          flex
          items-center
          text-base
          font-light
          text-gray-500
          rounded
          pe-5
          text-start
          hover:bg-gray-200
        "
        @click="$emit('showFilters')"
      >
        Filter
      </div>

      <div
        class="
          flex-1
          hidden
          px-4
          my-auto
          text-base
          font-light
          text-center text-gray-500
          md:block
        "
      >
        <b> {{ count }} </b>items
      </div>
      <div class="items-center text-center text-gray-700 text-primary">
        <select
          v-model="sortBy"
          class="
            text-sm
            font-light
            border-none
            rounded
            text-primary-500
            focus:ring-primary-500
            hover:shadow
            focus:outline-none
          "
          @change="sort"
        >
          <option
            v-for="(s, ix) in sorts"
            :key="ix"
            class="bg-white"
            :value="s.val"
          >
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
