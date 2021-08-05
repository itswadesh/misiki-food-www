<template>
  <main>
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
      {{ heading }}
    </h1>

    <section v-if="details" class="mt-5">
      <div class="flex justify-center items-center">
        <progress
          v-if="loading"
          class="
            absolute
            z-10
            justify-center
            block
            m-3
            material-progress-circular
          "
        />
      </div>

      <div class="relative">
        <div
          class="
            absolute
            z-20
            inset-y-0
            left-0
            ml-5
            flex
            items-center
            justify-center
          "
        >
          <button class="focus:outline-none" @click="showPrev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 md:h-10 md:w-10 text-gray-500 hover:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <div>
          <VueSlickCarousel
            v-if="details && details.length"
            v-bind="settings"
            ref="carousel"
          >
            <div
              v-for="product in details"
              :key="product.id"
              class="pr-2 sm:pr-5 lg:pr-10 flex"
            >
              <HomePageProduct :product="product" class="item-stretch" />
            </div>
          </VueSlickCarousel>
        </div>

        <div
          class="
            absolute
            z-20
            inset-y-0
            right-0
            mr-5
            flex
            items-center
            justify-center
          "
        >
          <button class="focus:outline-none" @click="showNext">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 md:h-10 md:w-10 text-gray-500 hover:text-gray-800"
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
            </svg>
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import HomePageProduct from '~/components/Home/HomePageProduct.vue'
// import ProductSliderSkeleton from '~/components/AllSkeletons/ProductSliderSkeleton'

export default {
  components: {
    // ProductSliderSkeleton,
    HomePageProduct,
  },

  props: {
    details: {
      type: Array,
      default: () => [],
    },
    heading: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      loading: false,
      settings: {
        centerMode: false,
        focusOnSelect: false,
        infinite: true,
        slidesToShow: 5,
        arrows: false,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          // {
          //   breakpoint: 768,
          //   settings: {
          //     slidesToShow: 3,
          //   },
          // },
          // {
          //   breakpoint: 640,
          //   settings: {
          //     slidesToShow: 2,
          //     arrows: false,
          //     centerMode: false,
          //   },
          // },
          // {
          //   breakpoint: 360,
          //   settings: {
          //     slidesToShow: 1,
          //     arrows: false,
          //     centerMode: false,
          //   },
          // },
        ],
      },
    }
  },

  methods: {
    go(url) {
      this.$router.push(this.localePath(url))
    },

    showNext() {
      this.$refs.carousel.next()
    },

    showPrev() {
      this.$refs.carousel.prev()
    },
  },
}
</script>
<style scoped></style>
