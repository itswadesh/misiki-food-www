<template>
  <section>
    <h1 class="text-3xl font-bold text-gray-700 mb-5 sm:mb-10 tracking-wide">
      Top Brands
    </h1>

    <div v-if="loading"><ProductSliderSkeleton /></div>

    <div class="flex flex-row flex-wrap items-start justify-between">
      <button
        v-for="b in brands"
        :key="b.id"
        class="flex-shrink-0 p-1"
        @click="go(b.slug)"
      >
        <img
          v-if="b.img"
          v-lazy="b.img"
          alt="brand"
          class="
            bg-white
            border
            sm:border-0
            w-1/2
            sm:w-60 sm:mb-2
            md:mb-5
            object-cover
          "
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
  </section>
</template>

<script>
// import BRANDS from '~/gql/brand/brands.gql'
// import NuxtLink from '~/components/NuxtLink.vue'

export default {
  // components: { NuxtLink },
  props: {
    ishome: { type: Boolean, default: false },
    brands: { type: Array, default: () => [] },
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
          `/${this.$route.params.store}/search?${
            this.ishome ? 'parentBrands' : 'brands'
          }=${url}`
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
