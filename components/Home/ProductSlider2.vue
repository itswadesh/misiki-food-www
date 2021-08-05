<template>
  <section>
    <h1 class="text-3xl font-bold text-gray-700 mb-5 sm:mb-10 tracking-wide">
      {{ heading }}
    </h1>

    <div v-if="loading"><ProductSliderSkeleton /></div>

    <VueSlickCarousel v-else-if="details && details.length" v-bind="settings">
      <template #prevArrow="arrowOption">
        <div
          class="
            invisible
            text-primary-500
            custom-arrow custom-arrow1
            md:visible
          "
        >
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>

      <div v-for="product in details" :key="product.id">
        <ProductSliderCards :product="product" />
      </div>

      <template #nextArrow="arrowOption">
        <div
          class="
            invisible
            custom-arrow
            text-primary-500
            custom-arrow2
            md:visible
          "
        >
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>
    </VueSlickCarousel>
  </section>
</template>

<script>
import ProductSliderCards from '~/components/Home/ProductSliderCards.vue'
import ProductSliderSkeleton from '~/components/AllSkeletons/ProductSliderSkeleton'
export default {
  components: {
    ProductSliderSkeleton,
    ProductSliderCards,
  },

  props: {
    details: {
      type: Array,
      default: null,
    },
    heading: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isWishlist: false,
      products: null,
      loading: false,

      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
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
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 768,
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
        ],
      },
    }
  },
}
</script>

<style scoped>
.border-b2 {
  border-bottom: 3px solid;
}
.custom-arrow {
  margin-right: 7px;
  height: 80px;
  width: 46px;
  padding: 6px;
  padding-top: 23px;
  box-shadow: 10px;
}
.slick-prev::before,
.slick-next::before {
  font-size: 40px;
  line-height: 1;
  opacity: 1;
  box-shadow: 10px;
  -webkit-font-smoothing: antialiased;
}
.slick-prev {
  margin-left: -25px;
  z-index: 1;
  left: 0;
  box-shadow: 10px;
}
</style>
