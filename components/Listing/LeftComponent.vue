<template>
  <div class="h-full p-2 bg-white shadow-lg w-72 lg:px-4">
    <div class="flex justify-between ms-2">
      <span class="text-xl">FILTERS</span>
    </div>
    <!-- line -->
    <div class="w-full mt-4 mb-4 border-b-2"></div>
    <!-- categories  -->
    <div v-if="megamenu.length > 0" class="flex flex-col w-full ps-2 xl:hidden">
      <span href="#" class="text-sm font-semibold text-gray-700">CATEGORY</span>
      <FilterCategory :details="megamenu" class="w-full" />
    </div>
    <div class="w-full mt-4 mb-4 border-b xl:hidden"></div>
    <!-- brands  -->
    <div class="flex flex-col ps-2">
      <span class="text-sm font-semibold text-gray-700">BRANDS</span>
      <FilterComponent
        class="w-full"
        :fl="fl"
        :details="brands"
        :model="'brands'"
        @onChangeValue="onChangeValue"
      />
    </div>
    <div class="w-full mt-4 mb-4 border-b"></div>
    <!-- color  -->
    <div class="flex flex-col ps-2">
      <span class="text-sm font-semibold text-gray-700">COLORS</span>
      <FilterComponent
        class="w-full"
        :fl="fl"
        :details="colors"
        :model="'color'"
        @onChangeValue="onChangeValue"
      />
    </div>
    <div class="w-full mt-4 mb-4 border-b"></div>
    <!-- size  -->
    <div class="flex flex-col ps-2">
      <span class="text-sm font-semibold text-gray-700">SIZES</span>
      <FilterComponent
        class="w-full"
        :fl="fl"
        :index="0"
        :details="sizes"
        :model="'size '"
        @onChangeValue="onChangeValue"
      />
    </div>
    <div class="w-full mt-4 mb-4 border-b"></div>
    <!-- price  -->
    <div class="flex flex-col ps-2">
      <a href="#" class="text-sm font-semibold text-gray-700">Price</a>
      <FilterComponent
        class="w-full"
        :fl="fl"
        :details="price"
        :model="'price'"
        @onChangeValue="onChangeValue"
      />
    </div>

    <div class="w-full mt-4 mb-4 border-b"></div>
    <!-- free delivery  -->
    <div class="flex flex-col ps-2">
      <span class="text-sm font-semibold text-gray-700">OTHERS</span>
      <span class="flex flex-row w-full p-1 cursor-pointer ps-4">
        <label class="flex flex-row w-full cursor-pointer">
          <Checkbox @change="onChangeBrand" />
          <!-- <input
            @change="onChangeBrand"
            type="checkbox"
            class="w-4 h-4 my-auto bg-gray-100 border-none rounded-sm me-3 text-primary-500 ring-gray-400 ring-1 focus:ring-1 focus:ring-primary-500 focus:ring-offset-0"
          /> -->
          <span class="text-sm text-gray-600">Free Delivery</span>
        </label>
      </span>
    </div>
  </div>
</template>

<script>
import { Checkbox } from '~/shared/components/ui'

import FilterCategory from '~/components/Listing/FilterCategory.vue'
import FilterComponent from '~/components/Listing/FilterComponent.vue'
import GET_BRANDS from '~/gql/brand/brands.gql'
import GET_SIZES from '~/gql/size/sizes.gql'
import GET_COLORS from '~/gql/color/colors.gql'
// import GET_MEGAMENU from '~/gql/category/megamenu.gql'
export default {
  components: {
    Checkbox,
    FilterCategory,
    FilterComponent,
  },
  // watch: {
  //   '$route.query': function () {
  //     this.fl = this.$route.query
  //     console.log(this.fl, 'flllllllllllllllllll')
  //   },
  // },
  data() {
    return {
      fl: {},
      selectedSize: [],
      selectedBrand: [],
      selectedColor: [],
      brands: [],
      colors: [],
      sizes: [],
      // categories: [],
      discount: [
        { dis: '10% Off and more ' },
        { dis: '20% Off and more ' },
        { dis: '35% Off and more ' },
        { dis: '50% Off and more ' },
        { dis: '55% Off and more ' },
        { dis: '60% Off and more ' },
      ],
      price: [
        { price: '₹99 - ₹399' },
        { price: '₹399 - ₹999' },
        { price: '₹999 - ₹1999' },
        { price: '₹1999 - ₹12,000' },
        { price: '₹12,000 and above' },
      ],
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
    await this.getCategories()

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
    categorySelected() {
      // console.log('category selected')
    },
    async onChangeValue() {
      // console.log(this.fl, 'filterrrrrrrrrrrrrrrrr')
      let link = await this.getUrl()
      link = link.substr(0, link.length - 1)
      this.$router.push(`/c/${this.$route.params.slug}${link}`)
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

    // async getCategories() {
    //   // console.log('get categories')
    //   try {
    //     this.categories = (
    //       await this.$apollo.query({
    //         query: GET_MEGAMENU,
    //         variables: { level: 0 },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.megamenu
    //     // console.log(this.categories, 'categories')
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //   }
    // },

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
