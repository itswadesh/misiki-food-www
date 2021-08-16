<template>
  <section
    v-if="banners && banners.length"
    class="
      container
      mx-auto
      overflow-hidden
      bg-white
      h-48
      md:h-64
      lg:h-80
      xl:h-96
    "
  >
    <div class="flex items-center justify-center">
      <progress v-if="loading" class="material-progress-circular" />
    </div>

    <!-- <SlideBarSkeleton v-if="skeleton" /> -->

    <VueSlickCarousel v-bind="settings" class="relative">
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
        class="overflow-hidden focus:outline-none"
        @click="go(b.link)"
      >
        <img
          v-lazy="b.img"
          class="
            bg-white
            object-cover
            w-full
            my-auto
            overflow-hidden
            bg-white
            h-48
            md:h-64
            lg:h-80
            xl:h-96
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
      loading: false,

      settings: {
        centerMode: false,
        centerPadding: '150px',
        centerMargin: '20px',
        focusOnSelect: false,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        speed: 500,
        skeleton: false,
        loading: true,
        // dots: true,
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
</style>
