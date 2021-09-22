<template>
  <div v-if="brands" class="p-3 md:py-10">
    <div class="flex justify-center">
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
      <!-- <SlideBarSkeleton v-if="skeleton" /> -->
      <button
        class="
          hidden
          md:flex
          absolute
          z-20
          top-0
          mt-2
          w-8
          h-8
          me-2
          items-center
          justify-center
          text-gray-800
          transition
          duration-300
          transform
          bg-gray-200
          rounded-l-full rounded-r-md
          cursor-pointer
          focus:outline-none
          active:scale-90
          hover:bg-gray-300 hover:shadow
        "
        @click="showPrev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="">
        <VueSlickCarousel
          v-if="brands && brands.length"
          v-bind="settings"
          ref="carousel"
          class="relative focus:outline-none md:mx-12"
        >
          <!-- <template #prevArrow="arrowOption"> -->
          <!-- </template> -->

          <div v-for="b in brands" :key="b.id">
            <nuxt-link
              :to="localePath(`/search?brands=${b.slug}`)"
              class="my-auto focus:outline-none"
            >
              <img
                v-lazy="`${b.img}?tr=w-96,h-48,fo-auto`"
                class="
                  w-12
                  h-6
                  md:h-12 md:w-24
                  object-cover
                  my-auto
                  focus:outline-none
                "
                alt="🚀"
              />
            </nuxt-link>
          </div>

          <!-- <template #nextArrow="arrowOption">
            <div
              v-if="arrowOption"
              class="
                flex
                items-center
                justify-center
                w-8
                h-8
                me-2
                text-gray-800
                transition
                duration-300
                transform
                bg-gray-200
                rounded-l-full rounded-r-md
                cursor-pointer
                focus:outline-none
                active:scale-90
                hover:bg-gray-300
                hover:shadow
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </template> -->
          <!-- v-if="loading" -->
        </VueSlickCarousel>
      </div>
      <button
        class="
          hidden
          md:flex
          absolute
          top-0
          right-0
          z-20
          mt-2
          w-8
          h-8
          ms-2
          items-center
          justify-center
          text-gray-800
          transition
          duration-300
          transform
          bg-gray-200
          rounded-r-full rounded-l-md
          cursor-pointer
          focus:outline-none
          active:scale-90
          hover:bg-gray-300 hover:shadow
        "
        @click="showNext"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
// import SlideBarSkeleton from '~/components/AllSkeletons/SlideBarSkeleton'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { NuxtLink },
  props: {
    brands: { type: Array, default: null },
  },
  // components: { SlideBarSkeleton },
  data() {
    return {
      loading: false,
      settings: {
        centerMode: true,
        focusOnSelect: false,
        infinite: true,
        slidesToShow: 8,
        arrows: false,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 7,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 7,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 6,
              arrows: false,
              centerMode: false,
            },
          },
        ],
      },
    }
  },
  // async created() {
  // await this.getbrands()
  // },
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
/* .custom-arrow {
  height: 18px;
  width: 16px;
  padding: 3px;
  padding-top: 23px;
  background: #777;
  border-radius: 5px;
  opacity: 0.75;
  z-index: 1;
} */

/* .slick-prev {
  left: -30px;
}
.slick-next {
  right: -30px;
} */

/* .slick-prev,
.slick-next {
  } */

/* .slick-prev::before,
.slick-next::before {
  @apply transform shadow-md bg-gray-200 rounded-l-full rounded-r-md;
} */

/* .slick-prev:hover,
.slick-next:hover {
  background: #777;
} */
</style>
