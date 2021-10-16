<template>
  <div
    v-if="images && images.length > 1"
    class="
      z-0
      flex flex-row
      md:flex-col
      justify-center
      xl:justify-start
      items-center
      overflow-hidden
      md:mx-0 md:w-24
    "
  >
    <VueSlickCarousel
      v-bind="settings"
      :arrows="true"
      class="w-auto h-rem"
      :class="images.length > 4 ? 'py-10' : ''"
    >
      <template #prevArrow="arrowOption" class="absolute top-0">
        <div
          class="
            invisible
            custom-arrow-product-image-thumbnails
            prev-arrow-product-image-thumbnails
            sm:visible
          "
        >
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>
      <div v-for="(img, ix) in images" :key="ix" class="overflow-hidden">
        <!-- :class="images.length > 4 ? 'mt-8' : ''" -->
        <img
          :key="img"
          v-lazy="imgVideo(img)"
          alt=""
          class="
            object-contain
            overflow-hidden
            bg-white
            border
            p-0.5
            rounded-sm
            smallimg
            hover:border-primary-500
            w-full
            h-full
          "
          :class="{ 'border-primary-500': img === selectedImage }"
          @mouseenter="$emit('selectedImage', img)"
        />
        <!-- <youtube
          v-else
          ref="youtube"
          :video-id="youtubeVideoId(img)"
          :resize="true"
          :fit-parent="true"
          class="
            object-contain
            mx-auto
            overflow-hidden
            bg-white
            border
            p-0.5
            rounded-sm
            smallimg
            hover:border-primary-500
            md:w-full md:object-contain md:w-auto
          "
          :class="{ 'border-primary-500': img === selectedImage }"
          @mouseenter="$emit('selectedImage', img)"
        /> -->
      </div>
      <template #nextArrow="arrowOption" class="absolute bottom-0">
        <div
          class="
            invisible
            custom-arrow-product-image-thumbnails
            next-arrow-product-image-thumbnails
            sm:visible
          "
        >
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>
    </VueSlickCarousel>
  </div>
</template>

<script>
// import PRODUCT from '~/gql/product/product.gql'
import { getIdFromUrl } from 'vue-youtube'
export default {
  props: {
    images: { type: Array, default: () => [] },
    selectedImage: { type: String, default: null },
  },
  // ['images', 'selectedImage'],
  data() {
    return {
      settings: {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerPadding: '70px',
              centerMargin: '15px',
              vertical: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
        ],
      },
      product: {
        images: '',
      },
    }
  },
  async created() {
    // await this.getProduct()
  },
  methods: {
    imgVideo(url) {
      return this.youtubeVideoId(url)
        ? `https://img.youtube.com/vi/${this.youtubeVideoId(url)}/1.jpg`
        : `${url}?tr=w-64`
    },
    youtubeVideoId(url) {
      return getIdFromUrl(url)
    },
    // async getProduct() {
    //   try {
    //     this.product = (
    //       await this.$apollo.query({
    //         query: PRODUCT,
    //         variables: { id: this.$route.query.id },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.product
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //   }
    // },
  },
}
</script>

<style>
.h-rem {
  height: 27.1rem;
}
.smallimg {
  width: 70px;
  height: 70px;
}

@media only screen and (min-width: 768px) {
  .hfull {
    height: 29.2rem;
  }
  .smallimg {
    height: 5rem;
    width: 5rem;
  }

  /* For both left and right arrow */
  .custom-arrow-product-image-thumbnails {
    height: 109px;
    width: 49px;
    z-index: 20;
  }
  .prev-arrow-product-image-thumbnails {
    margin-right: 25px;
    margin-top: -248px;
    z-index: 999;
    transform: rotate(90deg);
  }
  .next-arrow-product-image-thumbnails {
    margin-right: 84px;
    z-index: 999;
    margin-top: 163px;
    transform: rotate(90deg);
  }

  /* .slick-list { 
   margin-top: 36px !important; 
  } */

  .slick-prev {
  }
  .slick-next {
  }
  .slick-prev::before,
  .slick-next::before {
    font-size: 32px;
    line-height: 1;
    opacity: 1;
    color: black;
    -webkit-font-smoothing: antialiased;
  }
}
</style>
