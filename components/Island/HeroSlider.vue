<template>
  <section>
    <div class="flex justify-center">
      <progress
        v-if="loading"
        class="absolute z-10 justify-center block material-progress-circular"
      />
    </div>
    <!-- <SlideBarSkeleton v-if="skeleton" /> -->
    <VueSlickCarousel
      v-if="banners && banners.length"
      v-bind="settings"
      class="relative focus:outline-none"
    >
      <template #prevArrow="arrowOption">
        <div class="invisible custom-arrow md:visible hover:shadow-xl">
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>
      <template #nextArrow="arrowOption">
        <div class="invisible custom-arrow md:visible hover:shadow-xl">
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>

      <button
        v-for="b in banners"
        :key="b.id"
        class="rounded-2xl focus:outline-none"
        @click="go(b.link)"
      >
        <div
          v-if="loading"
          class="w-full h-rem flex items-center justify-center"
        >
          <svg
            class="w-20 h-20 text-gray-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        <!--  -->

        <img
          v-else
          v-lazy="b.img"
          class="
            object-cover
            w-full
            my-auto
            overflow-hidden
            bg-white
            focus:outline-none
            md:object-cover
            h-rem
          "
        />
      </button>
    </VueSlickCarousel>
  </section>
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
      settings: {
        centerMode: false,
        centerPadding: '150px',
        centerMargin: '20px',
        focusOnSelect: false,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        speed: 500,
        lazyLoad: 'progressive',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              centerPadding: '110px',
              centerMargin: '20px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              centerPadding: '60px',
              centerMargin: '15px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
          {
            breakpoint: 640,
            settings: {
              centerPadding: '0px',
              centerMargin: '15px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
        ],
      },
      skeleton: false,
      loading: false,
    }
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
  },
}
</script>
<style scoped>
.custom-arrow {
  height: 80px;
  width: 46px;
  padding: 3px;
  padding-top: 23px;
  background: #777;
  border-radius: 5px;
  opacity: 0.75;
  z-index: 1;
}
.slick-prev {
  left: 30px;
}
.slick-next {
  right: 30px;
}
.slick-prev:hover {
  background: #777;
}
.slick-next:hover {
  background: #777;
}
.slick-prev::before,
.slick-next::before {
  font-size: 40px;
  line-height: 1;
  opacity: 1;
  color: white;
  -webkit-font-smoothing: antialiased;
}
@media (max-width: 768px) {
  .h-rem {
    height: 20rem;
  }
}
@media (min-width: 768px) {
  .h-rem {
    height: 43rem;
  }
}
</style>
