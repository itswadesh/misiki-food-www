<template>
  <div class="flex flex-col flex-shrink-0 bg-white hfull nowrap">
    <div class="sm:ms-3 xl:me-0">
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
        class="
          container
          mx-auto
          hidden
          w-auto
          md:flex-row-reverse
          sm:flex sm:flex-col
        "
      >
        <div class="relative z-10 overflow-hidden bg-white widths">
          <div class="z-50 absolute top-2 right-2">
            <WishButton
              v-if="product.id"
              rounded
              :exist-in-wishlist="existInWishlist"
              :pid="product.id"
              class="p-1 w-8 h-8"
            />
          </div>

          <Zoom
            v-if="!youtubeVideoId(selectedImage)"
            :img-normal="selectedImage"
            :img-zoom="selectedImage"
            :scale="2"
            alt=""
            class="
              object-contain
              w-auto
              h-full
              mx-auto
              my-auto
              preview-img-item
            "
            @click="handleClick"
          />

          <div v-else>
            <youtube
              ref="youtube"
              :video-id="youtubeVideoId(selectedImage)"
              :resize="true"
              :fit-parent="true"
            />
          </div>
        </div>

        <ProductImgThumbnails
          class="md:me-5"
          :images="images"
          :selected-image="selectedImage || img"
          @selectedImage="popup"
        />
      </div>

      <!-- mobile view -->

      <div v-if="images && images.length" class="container mx-auto sm:hidden">
        <div class="relative z-10 overflow-hidden bg-white widths">
          <div class="z-50 absolute top-2 right-2">
            <WishButton
              v-if="product.id"
              rounded
              :pid="product.id"
              :exist-in-wishlist="existInWishlist"
              class="p-1 w-7 h-7"
            />
          </div>

          <VueSlickCarousel
            ref="c1"
            :as-nav-for="$refs.c2"
            :focus-on-select="true"
          >
            <div
              v-for="(im, ix) in images"
              :key="ix"
              class="bg-white h-80 focus:outline-none"
            >
              <img
                v-if="!youtubeVideoId(im)"
                v-lazy="`${im}?tr=h-320,fo-auto`"
                alt=""
                class="object-contain w-full h-full bg-white"
                @click="handleClick"
              />

              <div v-else>
                <youtube
                  ref="youtube"
                  :video-id="youtubeVideoId(im)"
                  :resize="true"
                  :fit-parent="true"
                />
              </div>
            </div>
          </VueSlickCarousel>
        </div>

        <div class="w-full mt-5 sm:mt-10">
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
              class="h-16 w-16 mx-auto focus:outline-none"
              @click="selectedImage = ig"
            >
              <img
                v-lazy="`${imgVideo(ig)}?tr=w-64,h-64,fo-auto`"
                alt=""
                class="object-contain w-16 h-16 mx-auto bg-white"
              />
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </div>

    <!-- <ShareMobile
      :open="showSharePanel"
      :class="showSharePanel ? 'open' : 'close'"
      @close="showSharePanel = !showSharePanel"
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
import Zoom from '~/components/ui/Zoom.vue'

export default {
  components: {
    ProductImgThumbnails,
    WishButton,
    // ImageMagnifier,
    Share,
    Zoom,
  },
  props: {
    loading: { type: Boolean, default: false },
    images: { type: Array, default: null },
    pid: { type: String, default: null },
    img: { type: String, default: null },
    host: { type: String, default: null },
    product: { type: Object, default: null },
    existInWishlist: { type: Boolean, default: false },
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
  computed: {
    photoSwipeImages() {
      return this.images.map((image) => {
        return {
          src: image,
          w: 1024,
          h: 768,
        }
      })
    },
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
  },
  created() {
    this.selectedImage = this.img
    // await this.getProduct()
  },
  methods: {
    ...mapMutations({ success: 'success' }),
    handleClick() {
      const pswp = this.$Pswp.open({
        items: this.photoSwipeImages,
        options: { index: this.getSelectedImageIndex(this.selectedImage) },
      })
    },
    getSelectedImageIndex(i) {
      const pos = this.photoSwipeImages
        .map(function (e) {
          return e.src
        })
        .indexOf(i)
      return pos
      // return this.photoSwipeImages.find((p) => {p.src === i})
    },
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
/* .widths {
  width: 295px;
  height: 291px;
} */
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
