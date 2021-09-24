<template>
  <main>
    <div class="w-full max-w-7xl mx-auto">
      <section class="text-center">
        <h1 class="font-semibold text-3xl">Worn by you</h1>
        <div
          class="
            mt-2
            md:mt-4
            text-sm
            md:text-base
            font-semibold
            max-w-max
            mx-auto
          "
        >
          <h6><i class="me-1">#</i>ImWearIngRI gallery</h6>
          <hr class="mt-0.5 border-t-2 border-gray-800 w-full" />
        </div>
      </section>

      <section v-if="banners" class="mt-5">
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
              ms-5
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
              v-if="banners && banners.length"
              v-bind="settings"
              ref="carousel"
            >
              <button
                v-for="b in banners"
                :key="b.id"
                class="p-1 md:p-3 focus:outline-none"
                @click="go(b.link)"
              >
                <div class="relative zoom">
                  <img
                    v-lazy="`${b.img}?tr=h-384,fo-auto`"
                    alt="🚀"
                    class="
                      object-cover
                      w-full
                      my-auto
                      overflow-hidden
                      bg-white
                      focus:outline-none
                      md:object-cover
                      h-60
                      md:h-96
                    "
                  />

                  <div
                    class="
                      absolute
                      inset-x-0
                      right-0
                      bottom-0
                      z-10
                      flex
                      justify-end
                    "
                  >
                    <div
                      class="
                        m-5
                        bg-white
                        text-xs text-gray-500
                        font-medium
                        py-1
                        px-2
                        rounded-full
                      "
                    >
                      <span>@Pratap.kritic_</span>
                    </div>
                  </div>
                </div>
              </button>
            </VueSlickCarousel>
          </div>

          <div
            class="
              absolute
              z-20
              inset-y-0
              right-0
              me-5
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
      </section>
    </div>
  </main>
</template>

<script>
// import SlideBarSkeleton from '~/components/AllSkeletons/SlideBarSkeleton'

export default {
  props: {
    banners: { type: Array, default: null },
  },
  // components: { SlideBarSkeleton },
  data() {
    return {
      loading: false,
      settings: {
        centerMode: false,
        focusOnSelect: false,
        infinite: true,
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              arrows: false,
              centerMode: false,
            },
          },
          {
            breakpoint: 360,
            settings: {
              slidesToShow: 1,
              arrows: false,
              centerMode: false,
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
.zoom {
  overflow: hidden;
}
.zoom img {
  transition: transform 0.5s;
}
.zoom:hover img {
  transform: scale(1.1);
}
</style>
