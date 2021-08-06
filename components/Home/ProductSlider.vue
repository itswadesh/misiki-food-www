<template>
  <main class="container mx-auto bg-white pl-2 sm:pl-10 lg:pr-10 text-gray-700">
    <h1
      class="
        text-xl
        md:text-2xl
        lg:text-3xl
        font-semibold
        sm:font-bold
        pt-5
        pb-5
        lg:pt-10 lg:pb-0
        tracking-wide
      "
    >
      {{ heading }}
    </h1>

    <section v-if="details">
      <!-- Above 1024px  -->

      <div class="hidden lg:block">
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
                class="
                  h-6
                  w-6
                  md:h-10 md:w-10
                  text-gray-500
                  hover:text-gray-800
                "
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
              <div v-for="product in details" :key="product.id" class="p-5">
                <HomePageProduct :product="product" />
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
                class="
                  h-6
                  w-6
                  md:h-10 md:w-10
                  text-gray-500
                  hover:text-gray-800
                "
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
      </div>

      <!-- Below 1024px  -->

      <div class="lg:hidden overflow-x-auto">
        <div
          v-if="details && details.length"
          v-bind="settings"
          class="flex items-start justify-start space-x-2"
        >
          <div v-for="product in details" :key="product.id">
            <HomePageProduct :product="product" />
          </div>
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
            breakpoint: 1536,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
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
