<template>
  <section>
    <h1
      class="
        text-xl
        md:text-3xl
        font-bold
        text-gray-700
        mb-5
        sm:mb-10
        tracking-wide
      "
    >
      Top Brands
    </h1>

    <div v-if="loading"><ProductSliderSkeleton /></div>

    <div
      class="hidden lg:grid lg:grid-cols-5 gap-2 sm:gap-5 md:gap-10 items-start"
    >
      <button
        v-for="b in brands"
        :key="b.id"
        class="flex-shrink-0 flex-grow-0"
        @click="go(b.slug)"
      >
        <img
          v-if="b.img"
          v-lazy="b.img"
          alt="brand"
          class="object-cover object-top h-96"
        />
        <div
          v-else
          class="
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
            h-96
          "
        >
          {{ b.name | first }}
        </div>
      </button>
    </div>

    <div class="lg:hidden overflow-x-auto">
      <div class="flex items-start justify-start space-x-2 sm:space-x-5">
        <button
          v-for="b in brands"
          :key="b.id"
          class="flex-shrink-0 flex-grow-0"
          @click="go(b.slug)"
        >
          <img
            v-if="b.img"
            v-lazy="b.img"
            alt="brand"
            class="object-cover object-top h-96"
          />
          <div
            v-else
            class="
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
              h-96
            "
          >
            {{ b.name | first }}
          </div>
        </button>
      </div>
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
      loading: false,
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

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}

/* Handle */
::-webkit-scrollbar-thumb {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}
</style>
