<template>
  <div
    v-if="banners && banners.length"
    class="container mx-auto bg-white sm:px-10 text-gray-700"
  >
    <div class="mb-5 relative flex px-2 lg:px-3">
      <h3 v-if="title" class="text-base md:text-xl font-medium">{{ title }}</h3>
      <div v-else class="h-6 md:h-8 w-full"></div>

      <div class="absolute right-0 me-2 lg:me-3 top-0 flex">
        <button
          aria-label="Show Previous"
          class="
            flex
            items-center
            justify-center
            w-6
            h-6
            md:w-8 md:h-8
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

        <button
          aria-label="Show Next"
          class="
            flex
            items-center
            justify-center
            w-6
            h-6
            md:w-8 md:h-8
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

    <VueSlickCarousel v-bind="sliderSettings" ref="carousel">
      <button
        v-for="b in banners"
        :key="b.id"
        aria-label="Picked Sliders"
        class="overflow-hidden focus:outline-none px-1 lg:px-3"
        @click="go(b.link)"
      >
        <img
          v-lazy="`${b.img}?tr=w-375,h-430,fo-auto`"
          alt="🚀"
          class="h-full w-full object-cover rounded-2xl bg-white"
        />
      </button>
    </VueSlickCarousel>
  </div>
</template>

<script>
// import SlideBarSkeleton from '~/components/AllSkeletons/SlideBarSkeleton'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: {
    VueSlickCarousel,
  },
  props: {
    title: { type: String, default: '' },
    banners: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  // components: { SlideBarSkeleton },
  data() {
    return {
      path: null,
      sliderSettings: {
        dots: false,
        dotsClass: 'slick-dots custom-dot-class',
        edgeFriction: 0.55,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToScroll: 1,
        slidesToShow: 4,
        centerMode: false,
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 4,
            },
          },

          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
            },
          },

          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },

          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              centerMode: true,
              centerPadding: '30px',
              arrows: false,
            },
          },
        ],
      },
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
  // async created() {
  // await this.getBanners()
  // },
  methods: {
    go(url) {
      if (this.ifUrl(url)) window.open(url, '_blank')
      else this.$router.push(this.localePath(url))
    },

    ifUrl(url) {
      if (!url || url === '') return false
      const pattern = /^((http|https|ftp):\/\/)/
      const isUrl = pattern.test(url)
      return isUrl
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
