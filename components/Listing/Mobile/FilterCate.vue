<template>
  <div
    class="
      fixed
      inset-x-0
      bottom-0
      z-50
      flex flex-col
      w-full
      mx-auto
      mt-12
      overflow-x-hidden
      transition
      bg-white
      shadow
      conatiner
      height
      rounded-2xl
    "
  >
    <div
      class="
        fixed
        z-50
        flex flex-row
        justify-between
        w-full
        p-3
        px-5
        bg-white
        border-b-2
        rounded-t-lg
        h-18
      "
    >
      <span class="text-xl font-semibold tracking-wider text-gray-700">
        Filters
      </span>
      <span class="my-auto text-sm font-medium tracking-widest text-gray-400">
        CLEAR ALL
      </span>
    </div>
    <div class="z-50 flex flex-row">
      <div
        class="
          flex flex-col
          w-2/5
          overflow-x-hidden
          text-gray-500
          bg-gray-50
          margintop
          left-height
        "
      >
        <!-- color -->
        <div class="cursor-pointer" @click="onSelectCategory('color')">
          <div
            class="p-3 ps-5"
            :class="{
              'bg-white border-s-4 border-primary-500':
                selectedCategory == 'color',
            }"
          >
            Colour
          </div>
        </div>
        <!-- price  -->
        <div class="cursor-pointer" @click="onSelectCategory('price')">
          <div
            class="p-3 ps-5"
            :class="{
              'bg-white border-s-4 border-primary-500':
                selectedCategory == 'price',
            }"
          >
            Price
          </div>
        </div>
        <!-- brands  -->
        <div class="cursor-pointer" @click="onSelectCategory('brand')">
          <div
            class="p-3 ps-5"
            :class="{
              'bg-white border-s-4 border-primary-500':
                selectedCategory == 'brand',
            }"
          >
            Brands
          </div>
        </div>
      </div>
      <!--  -->
      <div
        class="
          flex flex-col
          w-3/5
          h-auto
          -mt-3
          overflow-hidden
          z-1
          right-height
        "
      >
        <FilterComponent
          v-if="selectedCategory == 'color'"
          class="h-auto mt-16 overflow-hidden overflow-y-auto left-height"
          :fl="fl"
          :details="colors"
          :model="'color'"
          @onChangeValue="onChangeValue"
        />
        <FilterComponent
          v-if="selectedCategory == 'price'"
          class="h-auto mt-16 overflow-hidden overflow-y-auto left-height"
          :fl="fl"
          :details="price"
          :model="'price'"
          @onChangeValue="onChangeValue"
        />
        <FilterComponent
          v-if="selectedCategory == 'brand'"
          class="h-auto mt-16 overflow-hidden overflow-y-auto left-height"
          :fl="fl"
          :details="brands"
          :model="'brand'"
          @onChangeValue="onChangeValue"
        />
      </div>
    </div>
    <div
      class="
        fixed
        inset-x-0
        bottom-0
        z-10
        flex flex-row
        p-5
        bg-white
        border
        shadow
      "
    >
      <button
        class="
          w-1/3
          h-12
          p-1
          tracking-wider
          text-gray-700
          bg-gray-300
          rounded
          me-3
          focus:outline-none
          text-medium
        "
        @click="hideFilter"
      >
        CLOSE
      </button>
      <button
        class="
          w-2/3
          h-12
          p-1
          tracking-wider
          text-white
          rounded
          hover:bg-accent-500
          focus:outline-none
          bg-primary-500
          text-medium
        "
      >
        APPLY
      </button>
    </div>
  </div>
</template>

<script>
import FilterComponent from '~/components/Listing/FilterComponent.vue'
import GET_BRANDS from '~/gql/brand/brands.gql'
import GET_SIZES from '~/gql/size/sizes.gql'
import GET_COLORS from '~/gql/color/colors.gql'

export default {
  components: {
    FilterComponent,
  },
  data() {
    return {
      fl: {},
      selectedSize: [],
      selectedBrand: [],
      selectedColor: [],
      brands: [],
      colors: [],
      sizes: [],

      isFilter: true,
      color: false,
      price: false,
      brand: false,
      selectedCategory: 'color',
    }
  },
  watch: {
    // '$route.query.brand': function () {
    //   // console.log(decodeURI(this.$route.query.brand))
    //   if (this.$route.query.brand)
    //     this.selectedBrand = this.$route.query.brand.split(',')
    //   else {
    //     this.selectedBrand = []
    //   }
    //   console.log(this.selectedBrand)
    // },

    '$route.query'() {
      this.fl = this.$route.query
      // console.log(this.fl)
    },
  },
  mounted() {
    // console.log(this.fl)
    $nuxt.$on('onSelectCategory', (val) => {
      // console.log('on change value')
      this.fl.category = val
      this.onChangeValue()
    })
  },
  async created() {
    this.fl = this.$route.query
    await this.getBrands()
    await this.getSizes()
    await this.getColors()

    if (this.$route.query.brand) {
      const decodedBrand = decodeURI(this.$route.query)
      this.selectedBrand = decodedBrand.split(',')
      // console.log(this.selectedBrand)
    }

    if (this.$route.query.color) {
      const decodedColor = decodeURI(this.$route.query.color)
      // console.log(decodedColor)
      this.selectedColor = decodedColor.split(',')
      // console.log(this.selectedColor)
    }

    if (this.$route.query.size) {
      const decodedSize = decodeURI(this.$route.query.size)
      // console.log(decodedSize)
      this.selectedSize = decodedSize.split(',')
      // console.log(this.selectedSize)
    }
  },
  methods: {
    show(e) {
      this.isFilter = true
    },
    hideFilter(e) {
      this.$emit('hideFilter', true)
    },
    onSelectCategory(val) {
      this.selectedCategory = val
    },
    async onChangeValue() {
      // console.log(this.fl, 'filterrrrrrrrrrrrrrrrr')
      let link = await this.getUrl()
      link = link.substr(0, link.length - 1)
      this.$router.push(
        `/${this.$route.params.store}/c/${this.$route.params.slug}${link}`
      )
    },
    getUrl() {
      let url = '?'

      Object.keys(this.fl).forEach((e) => {
        if (
          this.fl[e] &&
          e !== 'sort' &&
          this.fl[e] !== undefined &&
          this.fl[e].length > 0
        ) {
          url += `${e}=${this.fl[e]}&`
        }
      })
      return url
    },
    onChangeBrand() {
      this.selectedBrand = this.selectedBrand.toString()
      encodeURI(this.selectedBrand)

      this.$router.replace(
        `/c/${this.$route.params.slug}?brands=${this.selectedBrand}${
          this.$route.query.size ? '&size=' + this.$route.query.size : ''
        }
        ${this.$route.query.color ? '&color=' + this.$route.query.color : ''}
         ${this.$route.query.sortBy ? '&sort=' + this.$route.query.sortBy : ''}`
      )
    },

    onChangeColors() {
      this.selectedColor = this.selectedColor.toString()
      encodeURI(this.selectedColor)
      this.$router.replace(
        `/c/${this.$route.params.slug}?color=${this.selectedColor}${
          this.$route.query.size ? '&size=' + this.$route.query.size : ''
        }
        ${this.$route.query.brand ? '&brands=' + this.$route.query.brand : ''}
         ${this.$route.query.sortBy ? '&sort=' + this.$route.query.sortBy : ''}`
      )
    },

    onChangeSize() {
      this.selectedSize = this.selectedSize.toString()
      this.$router.push(
        `/c/${this.$route.params.slug}?size=${this.selectedSize}${
          this.$route.query.color ? '&color=' + this.$route.query.color : ''
        }
        ${this.$route.query.brand ? '&brands=' + this.$route.query.brand : ''}
         ${this.$route.query.sortBy ? '&sort=' + this.$route.query.sortBy : ''}`
      )
    },
    async getBrands() {
      try {
        this.brands = (await this.$get('brand/brands', { level: 0 })).data
        // this.brands = (
        //   await this.$apollo.query({
        //     query: GET_BRANDS,
        //     variables: { level: 0 },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.brands.data
      } catch (e) {}
    },

    async getSizes() {
      try {
        this.sizes = (await this.$get('size/sizes', { level: 0 })).data
        // this.sizes = (
        //   await this.$apollo.query({
        //     query: GET_SIZES,
        //     variables: { level: 0 },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.sizes.data
      } catch (e) {}
    },

    async getColors() {
      // console.log('get categories')
      try {
        this.colors = (await this.$get('color/colors', { level: 0 })).data
        // this.colors = (
        //   await this.$apollo.query({
        //     query: GET_COLORS,
        //     variables: { level: 0 },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.colors.data
        // console.log(this.colors, 'colors')
      } catch (e) {
        // console.log(e)
      }
    },
  },
}
</script>

<style scoped>
.margintop {
  margin-top: 3.4rem;
}
.height {
  height: 38.3rem;
}
.right-height {
  height: 33.1rem;
}
.left-height {
  height: 29.4rem;
}
</style>
