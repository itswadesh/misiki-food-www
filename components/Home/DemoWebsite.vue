<template>
  <main
    v-if="demoimage && demoimage.length"
    class="container mx-auto bg-white pl-2 sm:pl-10 lg:pr-10 text-gray-700"
  >
    <h1
      class="
        text-xl
        md:text-2xl
        text-gray-500
        font-semibold
        sm:font-bold
        py-5
        lg:py-10
        tracking-wide
      "
    >
      {{ heading }}
    </h1>

    <section>
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
              top-28
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
            <VueSlickCarousel v-bind="settings" ref="carousel">
              <div v-for="(d, dx) in demoimage" :key="dx" class="pr-5 w-full">
                <DemoWebsiteCard :demo="d" />
              </div>
            </VueSlickCarousel>
          </div>

          <div
            class="
              absolute
              z-20
              top-28
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
        <div class="flex items-start justify-start space-x-2">
          <div v-for="(d, dx) in demoimage" :key="dx" class="pr-5 w-full">
            <DemoWebsiteCard :demo="d" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import DemoWebsiteCard from '~/components/Home/DemoWebsiteCard.vue'

export default {
  components: {
    DemoWebsiteCard,
  },

  props: {
    heading: { type: String, default: null },
    demoimage: { type: Array, default: () => [] },
  },

  data() {
    return {
      loading: false,

      settings: {
        centerMode: false,
        focusOnSelect: false,
        infinite: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        responsive: [
          {
            breakpoint: 1536,
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
