<template>
  <div class="flex flex-col flex-shrink-0 bg-white hfull nowrap">
    <div class="sm:ms-3 xl:me-0">
      <div class="flex flex-row justify-end pb-4 pe-4 md:hidden">
        <Share :product="product" :host="host" />
        <WishButton
          v-if="product.id"
          :rounded="true"
          :pid="product.id"
          class="p-1 w-7 h-7"
        />
      </div>
      <!-- desktop xl and above -->
      <!-- <div
        v-if="!loading"
        class="flex-col hidden w-full md:flex-row-reverse xl:hidden widths"
      >
        <div
          class="
            relative
            z-10
            mx-auto
            overflow-hidden
            bg-white
            border-2
            rounded-sm
            widths
          "
        >
          <div class="absolute right-0 flex justify-end m-3">
            <WishButton
              v-if="product.id"
              :rounded="true"
              :pid="product.id"
              class="z-50 hidden w-8 h-8 p-1 md:flex"
            />
          </div>
          <img
            v-if="!youtubeVideoId(selectedImage)"
            :key="selectedImage"
            v-lazy="selectedImage"
            alt=""
            class="
              object-contain
              w-auto
              h-full
              mx-auto
              preview-img-item
              zoom-in
            "
            @click="
              $photoswipe.open(0, [{ src: selectedImage, w: 800, h: 800 }])
            "
          />

          <div v-else class="w-12">
            <youtube
              ref="youtube"
              :video-id="youtubeVideoId(selectedImage)"
              :resize="true"
            />
          </div>
        </div>
        <div class="">
        <ProductImgThumbnails
            v-if="images && images.length > 1"
            :images="images"
            :selected-image="selectedImage || img"
            class="pe-4 overflow-hidden cursor-pointer"
            @selectedImage="popup"
          />
        </div>
      </div> -->

      <!-- desktop view -->
      <div
        v-if="img"
        class="flex-col hidden w-auto md:flex-row-reverse sm:flex"
      >
        <div
          class="
            relative
            z-10
            mx-auto
            overflow-hidden
            bg-white
            border-2
            rounded-sm
            widths
          "
        >
          <div class="absolute right-0 flex justify-end m-3">
            <WishButton
              v-if="product.id"
              :rounded="true"
              :pid="product.id"
              class="z-50 hidden w-8 h-8 p-1 md:flex"
            />
          </div>
          <img
            v-if="!youtubeVideoId(selectedImage)"
            v-lazy="selectedImage"
            alt=""
            class="
              object-contain
              w-auto
              h-full
              mx-auto
              my-auto
              preview-img-item
            "
            @click="
              $photoswipe.open(0, [{ src: selectedImage, w: 768, h: 768 }])
            "
          />
          <div v-else class="w-12">
            <youtube
              ref="youtube"
              :video-id="youtubeVideoId(selectedImage)"
              :resize="true"
            />
          </div>
        </div>
        <div>
          <ProductImgThumbnails
            :images="images"
            :selected-image="selectedImage || img"
            class="container px-2 mx-auto overflow-hidden cursor-pointer"
            @selectedImage="popup"
          />
        </div>
      </div>

      <!-- mobile view -->
      <div class="w-full">
        <div v-if="images && images.length" class="mx-auto sm:hidden">
          <div class="w-full mx-auto widths">
            <VueSlickCarousel
              ref="c1"
              :as-nav-for="$refs.c2"
              :focus-on-select="true"
            >
              <div
                v-for="(im, ix) in images"
                :key="ix"
                class="bg-white border h-80 focus:outline-none"
              >
                <img
                  v-lazy="im"
                  class="object-cover w-full h-full bg-gray-300"
                />
              </div>
            </VueSlickCarousel>
          </div>
          <div class="w-full mt-10 px-7">
            <VueSlickCarousel
              ref="c2"
              :as-nav-for="$refs.c1"
              :slides-to-show="4"
              :focus-on-select="true"
              class="mx-auto"
            >
              <div
                v-for="(ig, ix) in images"
                :key="ix"
                class="h-20 mx-auto focus:outline-none"
                @click="selectedImage = ig"
              >
                <img
                  v-lazy="ig"
                  class="
                    object-cover
                    w-16
                    h-16
                    mx-auto
                    my-2
                    bg-gray-300
                    border
                    rounded
                  "
                />
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </div>
    <!-- <ShareMobile
        :open="showSharePanel"
            @close="showSharePanel=!showSharePanel"
            :class="showSharePanel ? 'open' : 'close'"
          /> -->
  </div>
</template>

<script>
// import { ImageMagnifier } from 'vue-image-magnifier'
import { mapMutations } from 'vuex'
import { getIdFromUrl } from 'vue-youtube'
import ProductImgThumbnails from './ProductImgThumbnails.vue'
import Share from '~/components/ProductDetails/Share.vue'
import WishButton from '~/components/WishButton.vue'

export default {
  components: {
    ProductImgThumbnails,
    WishButton,
    // ImageMagnifier,
    Share,
  },
  props: {
    loading: { type: Boolean, default: false },
    images: { type: Array, default: null },
    pid: { type: String, default: null },
    img: { type: String, default: null },
    host: { type: String, default: null },
    product: { type: Object, default: null },
  },
  data() {
    return {
      share: false,
      showSharePanel: false,
      hide: false,
      isBuyProduct: false,
      show: true,
      selectedImage: null,
    }
  },
  created() {
    this.selectedImage = this.img
    // await this.getProduct()
  },
  // computed: {
  // ...mapGetters({
  //   cart: 'cart/cart',
  //   getItemQty: 'cart/getItemQty',
  // }),
  // calculateOffPercent() {
  //   if (!this.product || !this.product) return 0
  //   let percent =
  //     ((this.product.mrp - this.product.price) * 100) / this.product.mrp
  //   return Math.round(percent)
  // },
  // calculatePrice() {
  //   let price = 0
  //   if (this.product.price < this.product.mrp) {
  //     price = this.product.price
  //   } else {
  //     price = this.product.mrp
  //   }
  //   return price
  // },
  // },
  methods: {
    ...mapMutations({ success: 'success' }),
    imgVideo(url) {
      return this.youtubeVideoId(url)
        ? `https://img.youtube.com/vi/${this.youtubeVideoId(url)}/1.jpg`
        : url
    },
    youtubeVideoId(url) {
      return getIdFromUrl(url)
    },
    // async getProduct() {
    //   this.loading = true
    //   try {
    //     this.product = (
    //       await this.$apollo.query({
    //         query: PRODUCT,
    //         variables: { id: this.$route.query.id },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.product
    //     this.selectedImage = this.product.img
    //     // console.log('product details', this.product)
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // async buyProduct(obj) {
    //   this.isBuyProduct = true
    //   // await this.checkOut(obj)
    // },
    // async checkOut() {
    //   try {
    //     const data = (
    //       await this.$apollo.mutate({
    //         mutation: CHECKOUT,
    //         variables: {
    //           address: {},
    //           paymentMethod: 'COD',
    //         },
    //       })
    //     ).data.checkout
    //     if (this.isBuyProduct) {
    //       this.$router.push('/checkout')
    //     }
    //     // console.log('address reciewved', data)
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //   }
    // },
    // async toggleWishlist(id) {
    //   ;(this.isDisabled = true), (this.isWishlist = true)
    //   // console.log(id)
    //   let msg = 'Product Added To the Wishlist'
    //   try {
    //     const data = (
    //       await this.$apollo.mutate({
    //         mutation: TOGGLE,
    //         variables: {
    //           product: id,
    //           variant: id,
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.toggleWishlist
    //     this.success(msg)
    //     // console.log('add to wishlist', this.toggleWishlist)
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     ;(this.isDisabled = true), (this.isWishlist = true)
    //   }
    // },
    popup(val) {
      this.selectedImage = val
    },
    hideOffers() {
      this.showOffers = false
    },
  },
}
</script>

<style scoped>
.zoom-in {
  cursor: zoom-in;
}
.widths {
  width: 295px;
  height: 291px;
}
@media only screen and (min-width: 640px) {
  .widths {
    width: 470px;
    height: 370px;
  }
}

@media only screen and (min-width: 768px) {
  .widths {
    width: 90%;
    height: 29.2rem;
  }
}
@media only screen and (min-width: 1024px) {
  .widths {
    width: 100%;
    height: 28.2rem;
  }
}
</style>
