<template>
  <div class="bg-white h-56 md:h-64 lg:h-80 xl:h-96">
    <div class="flex items-center justify-center">
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
    <!-- <SlideBarSkeleton v-if="skeleton" /> -->
    <VueSlickCarousel
      v-if="mqBanners && mqBanners.length"
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
        v-for="b in mqBanners"
        :key="b.id"
        class="
          z-auto
          my-auto
          focus:outline-none focus:ring-0 focus:ring-offset-0
        "
        aria-label="Slider Banners"
        @click="go(b.link)"
      >
        <!-- <img
          v-if="!b.isMobile"
          v-lazy="`${b.imgCdn}?tr=h-384,fo-auto`"
          class="
            block
            sm:hidden
            bg-white
            h-48
            w-full
            object-cover
            overflow-hidden
            bg-white
          "
          alt="Slider Banners"
        /> -->

        <img
          v-lazy="`${b.imgCdn}?tr=h-384,fo-auto`"
          class="
            hidden
            sm:block
            bg-white
            h-56
            md:h-64
            lg:h-80
            xl:h-96
            w-full
            object-cover
            overflow-hidden
            bg-white
          "
          alt="Slider Banners"
        />
      </button>
      <!-- v-if="loading" -->
    </VueSlickCarousel>
  </div>
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
      skeleton: true,
      loading: false,
    }
  },
  computed: {
    mqBanners() {
      if (this.$mq === 'sm')
        return this.banners && this.banners.filter((b) => b.isMobile)
      else return this.banners && this.banners.filter((b) => !b.isMobile)
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
</style>
