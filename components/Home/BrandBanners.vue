<template>
  <div
    v-if="brands && brands.length"
    class="
      container
      mx-auto
      flex flex-col
      md:flex-row md:items-center
      bg-white
      px-2
      sm:px-10
      text-gray-700
    "
  >
    <h1
      class="
        w-full
        mb-5
        md:mb-0
        text-base
        md:text-lg
        lg:text-xl
        antialiased
        font-semibold
        tracking-widest
        text-center
        transform
        md:-rotate-90
        text-secondary-500
        lg:w-1/6
        md:w-1/4
      "
    >
      BRANDS
    </h1>

    <div
      class="
        w-full
        grid grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5 lg:w-5/6
        md:w-3/4
      "
    >
      <div v-for="b in brands" :key="b.id" class="mx-auto">
        <button class="p-1" @click="go(b.slug)">
          <img
            v-if="b.img"
            v-lazy="b.img"
            alt="bab"
            class="object-contain h-12 sm:h-20"
          />
          <div
            v-else
            class="
              h-12
              w-12
              sm:h-20 sm:w-20
              flex
              justify-center
              items-center
              text-center
              my-auto
              text-primary-500
              font-semibold
              rounded-full
              border-2 border-primary-500
              text-2xl
            "
          >
            {{ b.name | first }}
          </div>
        </button>
      </div>
    </div>

    <!-- <div class="bg-yellow-300 md:hidden" v-if="brands && brands.data && brands.data.length">
      <VueSlickCarousel
        v-bind="settings"
        class=" focus:outline-none"
      >
        <nuxt-link
          :to="localePath('/c')"
          class=" focus:outline-none"
          v-for="b in brands.data"
          :key="b.id"
        >
          <img
            v-lazy="b.img"
            alt="bab"
            class="object-contain h-20 focus:outline-none"
          />
        </nuxt-link>
      </VueSlickCarousel>
    </div> -->
  </div>
</template>

<script>
// import BRANDS from '~/gql/brand/brands.gql'

export default {
  props: {
    ishome: { type: Boolean, default: false },
    brands: { type: Array, default: null },
  },
  data() {
    return {
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
            },
          },
          // {
          //   breakpoint: 400,
          //   settings: {
          //     centerMode: true,
          //     centerPadding: '90px',
          //     centerMargin: '5px',
          //     slidesToScroll: 1,
          //     focusOnSelect: true,
          //     infinite: false,
          //     slidesToShow: 1,
          //   },
          // },
        ],
      },
    }
  },
  async created() {
    // await this.getBrands()
  },
  methods: {
    go(url) {
      if (url)
        this.$router.push(
          `/search?${this.ishome ? 'parentBrands' : 'brands'}=${url}`
        )
    },
    //   async getBrands() {
    //     // this.loading = true
    //     try {
    //       this.brands = (
    //         await this.$apollo.query({
    //           query: BRANDS,
    //           variables: { featured: true, limit: 5, page: 0 },
    //           fetchPolicy: 'no-cache',
    //         })
    //       ).data.brands
    //       // console.log("brands to show", this.brands)
    //     } catch (e) {
    //       // console.log(e)
    //     } finally {
    //       // this.loading = false
    //     }
    //   },
  },
}
</script>
