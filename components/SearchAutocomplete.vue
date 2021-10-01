<template>
  <div class="w-full lg:mx-5 lg:w-2/3 z-50">
    <div v-if="isFocused" class="fixed inset-0" @click="onUnfocused"></div>

    <div class="relative w-full">
      <form
        novalidate
        autocomplete="off"
        class="relative w-full"
        @submit.stop.prevent="submit"
      >
        <!-- tablet and desktop input -->
        <input
          v-model="selectedVal"
          :placeholder="
            (store && store.searchbarText) || 'Search for products, brands...'
          "
          class="
            hidden
            sm:flex
            w-full
            py-3
            px-10
            pe-4
            text-xs
            bg-gray-100
            border border-transparent
            rounded-sm
            focus:bg-white focus:border-gray-200 focus:outline-none
          "
          @keyup.enter="
            $event.target.blur()
            $router.push(`/search/${selectedVal || ''}`)
          "
          @focus="onFocused()"
          @input="getData()"
          @keyup="onSelectValue($event)"
        />

        <!-- mobile view input -->
        <input
          :placeholder="
            (store && store.searchbarText) || 'Search for products, brands...'
          "
          class="
            sm:hidden
            w-full
            py-3
            px-10
            pe-4
            text-xs
            bg-gray-100
            border-0
            rounded-sm
            focus:bg-white focus:border focus:outline-none
          "
          @focus="onFocusedMobile()"
        />

        <div class="absolute left-3 inset-y-0 flex items-center justify-center">
          <!-- search icon -->
          <svg
            class="w-5 h-5 text-sm text-gray-500"
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
        v-if="isFocused"
        style="z-index: 9999"
        class="
          absolute
          top-11
          inset-x-0
          w-full
          overflow-auto
          bg-white
          shadow-xl
        "
      >
        <div
          v-for="(v, i) in products"
          :key="i"
          :class="{ 'bg-gray-200': selectedIndex === i }"
          class="
            flex
            items-center
            w-full
            border-b border-l border-r
            cursor-pointer
            hover:bg-gray-100
          "
          @click="onselect(v)"
        >
          <!-- <img
              v-if="v.img"
              :key="i"
              v-lazy="`${v.img}?tr=w-48,h-40,fo-auto`"
              alt="🚀"
              class="object-contain w-12 h-10 mx-2"
            /> -->
          <span class="p-3 text-sm font-light text-gray-600 truncate">
            {{ v.key }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: null,
      selectedVal: null,
      isFocused: false,
      product: null,
      selectedIndex: -1,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    store() {
      return this.$store.state.store || {}
    },
  },
  methods: {
    submit() {
      this.onUnfocused()
      if (this.product)
        this.$router.push(
          `/${this.product._source.slug}?id=${this.product._id}`
        )
      else this.$router.push(`/search/${this.selectedVal}`)
    },
    onselect(val) {
      // console.log(val)
      this.fillValue(val)
      this.onUnfocused()
      this.$router.push(`/search/${val.key}`)
      // this.$router.push(`/${this.product._source.slug}?id=${this.product._id}`)
      // console.log(this.selectedVal)
    },
    fillValue(val) {
      this.product = val
      this.selectedVal = this.product.key
    },
    onSelectValue(e) {
      // console.log(e);
      if (this.isFocused) {
        if (e.key === 'ArrowDown') {
          if (this.selectedIndex < this.products.length) {
            this.selectedIndex++
            this.fillValue(this.products[this.selectedIndex])
          } else {
            this.selectedIndex = 0
          }
        } else if (e.key === 'ArrowUp') {
          if (this.selectedIndex >= 0) {
            this.selectedIndex--
            this.fillValue(this.products[this.selectedIndex])
          }
        } else if (e.key === 'Escape') {
          this.isFocused = false
          this.selectedIndex = -1
        } else if (e.key === 'Enter') {
          this.isFocused = false
          this.selectedIndex = -1
        } else {
          this.selectedIndex = -1
          // this.selectedVal=null
          this.product = null
        }
      }
    },
    async getData() {
      if (this.selectedVal === null || this.selectedVal === '') return
      try {
        const result = await this.$axios.$get('/api/products/autocomplete', {
          params: { q: this.selectedVal, store: this.store.id },
        })
        // console.log(result)
        this.products = result.data
      } catch (e) {
        // console.log(e)
      }
    },
    onFocusedMobile() {
      this.$router.push(`/search-suggestions`)
    },
    onFocused() {
      //
      this.isFocused = true
      this.getData()
    },
    onUnfocused() {
      this.isFocused = false
      this.selectedIndex = -1
      // console.log(this.isFocused, this.selectedIndex)
    },
  },
}
</script>
