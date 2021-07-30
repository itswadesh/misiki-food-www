<template>
  <div v-if="brands" class="w-full">
    <div class="flex flex-col py-6 bg-white lg:py-12 md:flex-row">
      <div
        class="
          w-full
          my-auto
          text-lg
          antialiased
          font-semibold
          tracking-widest
          text-center
          transform
          lg:py-6
          md:-rotate-90
          text-secondary-500
          lg:w-1/6
          md:w-1/4
        "
      >
        Brands
      </div>
      <div
        class="
          grid
          w-full
          grid-cols-2
          mx-auto
          sm:grid-cols-3
          lg:grid-cols-5 lg:w-5/6
          md:w-3/4
        "
      >
        <div v-for="b in brands.data" :key="b.id" class="mx-auto">
          <nuxt-link
            :to="localePath(`/${$route.params.store}/search?brands=${b.name}`)"
            class="p-1"
          >
            <img v-lazy="b.img" alt="bab" class="object-contain h-12 sm:h-20" />
          </nuxt-link>
        </div>
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
import BRANDS from '~/gql/brand/brands.gql'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { NuxtLink },
  data() {
    return {
      brands: false,
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
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
    await this.getBrands()
  },
  methods: {
    async getBrands() {
      // this.loading = true
      try {
        this.brands = await this.$get('brand/brands', {
          featured: true,
          limit: 5,
          page: 0,
        })
        // this.brands = (
        //   await this.$apollo.query({
        //     query: BRANDS,
        //     variables: { featured: true, limit: 5, page: 0 },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.brands
        // console.log("brands to show", this.brands)
      } catch (e) {
        // console.log(e)
      } finally {
        // this.loading = false
      }
    },
  },
}
</script>
