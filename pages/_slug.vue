<template>
  <div class="pb-10 bg-white sm:pb-32">
    <Megamenu class="hidden border-b xl:flex" />
    <!-- <div v-if="loading"  class="flex flex-col mt-32 xl:flex-row sm:mt-5">
        <DetailsPageLeftSkeleton class="xl:w-2/5" />
        <DetailsSkeleton class="-mt-1 xl:w-3/5" />
     </div> -->
    <div class="w-full">
      <div
        v-if="product && product.id"
        class="
          container
          flex-row
          justify-between
          hidden
          px-3
          mx-2
          xl:py-5
          md:py-4
          lg:pt-5 lg:mx-auto
          md:flex
        "
      >
        <Breadcrumb
          :path="product.category && product.category.pathA"
          :name="product.name"
          class="w-full"
        />
        <div>
          <Share :product="product" :host="host" />
        </div>
      </div>
      <div class="container flex flex-col mx-auto">
        <div class="flex flex-col w-full xl:flex-row">
          <div class="xl:w-2/5">
            <!-- <DetailsPageLeftSkeleton v-if="loading" class="hidden sm:block" /> -->
            <div v-if="product && product.id" class="sticky top-20">
              <ProductImages
                v-if="product"
                :loading="loading"
                class="h-auto mt-5 nowrap lg:mt-0"
                :images="product && product.images"
                :pid="product.id"
                :img="product.img"
                :host="host"
                :product="product"
              />
              <div class="flex-row hidden w-full mx-3 mt-2 xl:flex">
                <div class="w-1/2 my-auto">
                  <AddToCart
                    class="mt-3"
                    :product="product"
                    :user-selected-variant="userSelectedVariant"
                    :options="product.options"
                    :selected-options="selectedOptions"
                    @alertToSelectMandatoryOptions="
                      alertToSelectMandatoryOptions
                    "
                  />
                </div>
                <div class="z-10 w-1/2 ms-3">
                  <BuyNow
                    v-if="product.stock > 0"
                    class="mt-3"
                    :product="product"
                    :user-selected-variant="userSelectedVariant"
                    :options="product.options"
                    :selected-options="selectedOptions"
                    @alertToSelectMandatoryOptions="
                      alertToSelectMandatoryOptions
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="
              mt-4
              border-t border-b
              xl:w-3/5
              md:border-t-0 md:border-b-0
              xl:mt-0
            "
          >
            <!-- <DetailsSkeleton v-if="loading"  /> -->
            <div v-if="product && product.id" class="bg-white">
              <ProductRight
                ref="ProductRight"
                class="w-full h-auto nowrap"
                :host="host"
                :product="product"
                :pg="pg"
                @variantChanged="variantChanged"
                @optionChanged="optionChanged"
              />
              <div
                class="
                  fixed
                  bottom-0
                  z-50
                  flex flex-row
                  w-full
                  bg-white
                  sm:relative sm:z-0
                  xl:hidden
                "
              >
                <div class="w-full sm:w-1/2 sm:me-3">
                  <AddToCart
                    class=""
                    :product="product"
                    :user-selected-variant="userSelectedVariant"
                    :options="product.options"
                    :selected-options="selectedOptions"
                    @alertToSelectMandatoryOptions="
                      alertToSelectMandatoryOptions
                    "
                  />
                </div>
                <div class="w-full sm:w-1/2">
                  <BuyNow
                    v-if="product.stock > 0"
                    class=""
                    :product="product"
                    :user-selected-variant="userSelectedVariant"
                    :options="product.options"
                    :selected-options="selectedOptions"
                    @alertToSelectMandatoryOptions="
                      alertToSelectMandatoryOptions
                    "
                  />
                </div>
              </div>
            </div>
            <div
              class="
                py-4
                bg-white
                border-t border-b
                xl:mt-0 xl:ms-4
                sm:border-b-0 sm:border-t-0
              "
            >
              <ProductDetailSpecs class="w-full" :product="product" />
              <RatingAndReviews class="mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!product && !product.id"
      class="
        flex flex-col
        items-center
        justify-center
        w-4/5
        pt-16
        mx-auto
        text-center
        sm:pt-10 sm:w-1/2
      "
    >
      <img
        v-lazy="`/placeholder/no-product.png`"
        alt=""
        class="object-contain w-full h-80"
      />
      <div class="mt-10 text-xl font-semibold text-red-500">
        Product not found!!
      </div>
    </div>
    <div
      v-if="
        recommendedProducts &&
        recommendedProducts.data &&
        recommendedProducts.data.length
      "
      class="px-2 my-12 sm:mx-3 md:my-20"
    >
      <ProductSlider
        class="mt-2 sm:mt-6"
        :details="recommendedProducts.data"
        :heading="'Recommended For You'"
      />
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Share from '~/components/ProductDetails/Share.vue'
import Megamenu from '~/components/Home/Megamenu.vue'
import ProductImages from '~/components/ProductDetails/ProductImages.vue'
import ProductRight from '~/components/ProductDetails/ProductRight.vue'
import ProductDetailSpecs from '~/components/ProductDetails/ProductDetailSpecs.vue'
import RatingAndReviews from '~/components/ProductDetails/RatingAndReviews.vue'
import Breadcrumb from '~/components/ProductDetails/Breadcrumb.vue'
import AddToCart from '~/components/ProductDetails/AddToCart.vue'
import BuyNow from '~/components/ProductDetails/BuyNow.vue'
import ProductSlider from '~/components/Home/ProductSlider.vue'
import { TITLE, DESCRIPTION, KEYWORDS, sharingLogo } from '~/shared/config'
import PRODUCTS from '~/gql/product/products.gql'
import PRODUCT from '~/gql/product/product.gql'
import PRODUCT_GROUP from '~/gql/product/product_group.gql'
// import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
// import CHECK_WISHLIST from '~/gql/wishlist/checkWishlist.gql'
import DetailsPageLeftSkeleton from '~/components/AllSkeletons/DetailsPageLeftSkeleton.vue'
export default {
  components: {
    Share,
    BuyNow,
    DetailsPageLeftSkeleton,
    RatingAndReviews,
    Megamenu,
    ProductImages,
    ProductRight,
    ProductDetailSpecs,
    Breadcrumb,
    ProductSlider,
    AddToCart,
  },
  // validate({ query }) {
  //   if (!query.id) return false
  // },
  async asyncData({ params, query, app, req, error, store }) {
    const client = app.apolloProvider.defaultClient
    let product = {}
    let selectedVariant = null
    let err = null
    const id = query.id
    if (!id) error({ statusCode: 404, message: 'Product not found' })
    try {
      product = (
        await client.query({
          query: PRODUCT,
          variables: { id },
          fetchPolicy: 'no-cache',
        })
      ).data.product
      if (!product) error('Product not found')
      // for (let v of product && product.variants) {
      //   if (v.stock > 0) {
      //     selectedVariant = v
      //     break
      //   }
      // }
    } catch (e) {
      product = {}
      selectedVariant = null
      if (e && e.response && e.response.data) {
        err = e.response.data
      } else if (e && e.response) {
        err = e.response
      } else {
        err = e
      }
    }
    const HOST = process.server ? req.headers.host : window.location.host
    const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7))
    let structuredData = {}
    if (product && store.state.settings) {
      structuredData = {
        '@context': 'http://schema.org/',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        sku: product.sku,
        image: product.img,
        gtin8: product.id,
        brand: product.brand && product.brand.name,
        aggregateRating: {
          '@type': 'AggregateRating',
          worstRating: 1,
          bestRating: 5,
          ratingCount: product.reviews || 0 + 1,
          ratingValue: product.rating || 5,
        },
        releaseDate: product.createdAt,
        dateModified: product.updatedAt,
        url: `${HOST}/${product.slug}?id=${product.id}`,
        interactionStatistic: {
          '@type': 'InteractionCounter',
          interactionType: 'http://schema.org/DownloadAction',
          userInteractionCount: product.popularity + 1000,
        },
        offers: {
          '@type': 'Offer',
          availability: 'http://schema.org/InStock',
          priceValidUntil: nextWeek.toISOString(),
          url: `${HOST}/${product.slug}?id=${product.id}`,
          price: product.price < 1 ? '0.00' : product.price,
          priceCurrency: store.state.settings.currencyCode,
          seller: {
            '@type': 'Organization',
            name: store.state.settings.websiteName,
            url: HOST,
          },
        },
      }
    }
    return { host: HOST, product, selectedVariant, err, structuredData }
  },
  data() {
    return {
      pg: null,
      recommendedProducts: null,
      userSelectedVariant: null,
      selectedOptions: null,
      // savingWishlist: false,
      // alertToSelectMandatoryOptions: false,
    }
  },

  head() {
    // const host = process.server
    //   ? this.$ssrContext.req.headers.host
    //   : window.location.host
    let prod = {}
    if (this.product) {
      prod = {
        title: this.product.metaTitle || this.product.name || TITLE,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              this.product.metaDescription ||
              this.product.description ||
              DESCRIPTION,
          },
          {
            hid: 'keywords',
            name: 'Keywords',
            property: 'keywords',
            content:
              this.product.metaKeywords || this.product.keywords || KEYWORDS,
          },

          // OpenGraph data
          {
            hid: 'og:title',
            name: 'og_title',
            property: 'og:title',
            content: this.product.metaTitle || this.product.name || TITLE,
          },
          {
            hid: 'og:description',
            name: 'Description',
            property: 'og:description',
            content:
              this.product.metaDescription ||
              this.product.description ||
              DESCRIPTION,
          },
          {
            name: 'og_url',
            property: 'og:url',
            content:
              this.host + '/' + this.product.slug + '?id=' + this.product.id,
          },
          {
            name: 'og_image',
            property: 'og:image',
            content: this.product.img || sharingLogo,
          },
          {
            property: 'og:image:width',
            content: '600',
          },
          {
            property: 'og:image:height',
            content: '600',
          },
          // Twitter
          {
            name: 'twitter:title',
            content: this.product.metaTitle || this.product.name || TITLE,
          },
          {
            name: 'twitter:description',
            content:
              this.product.metaDescription ||
              this.product.description ||
              DESCRIPTION,
          },
          {
            name: 'twitter:image:src',
            content: this.product.img || sharingLogo,
          },
          // Google / Schema.org markup:
          {
            hid: 'product_name',
            itemprop: 'name',
            content: this.product.name || TITLE,
          },
          {
            hid: 'product_description',
            itemprop: 'description',
            content:
              this.product.metaDescription ||
              this.product.description ||
              DESCRIPTION,
          },
          {
            hid: 'product_image',
            itemprop: 'image',
            content: this.product.img || sharingLogo,
          },
          {
            hid: 'product_price',
            name: 'product_price',
            property: 'product:price',
            content: this.product.price,
          },
        ],
        script: [{ type: 'application/ld+json', json: this.structuredData }],
      }
    }
    return prod
  },
  created() {
    this.getProducts()
    this.getProductGroups()
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async getProductGroups() {
      const id = this.$route.query.id
      if (!id) return
      try {
        this.pg = await this.$get('product/product_group', { id })
        // this.pg = (
        //   await this.$apollo.query({
        //     query: PRODUCT_GROUP,
        //     variables: { id },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.product_group
        // this.checkWishlist()
      } catch (e) {}
    },
    // async checkWishlist() {
    //   try {
    //     this.existInWishlist = (
    //       await this.$apollo.query({
    //         query: CHECK_WISHLIST,
    //         variables: {
    //           product: this.$route.query.id,
    //           variant: this.$route.query.id,
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.checkWishlist
    //   } catch (e) {
    //     this.setErr(e)
    //   } finally {
    //   }
    // },
    // async toggleWishlist() {
    //   if (!this.user) {
    //     this.$router.push(`/login?ref=${this.$router.currentRoute.fullPath}`)
    //   }
    //   this.existInWishlist = !this.existInWishlist
    //   let msg = 'Product added to wishlist'
    //   let err = 'Product removed from wishlist'
    //   try {
    //     this.savingWishlist = true
    //     this.existInWishlist = (
    //       await this.$apollo.mutate({
    //         mutation: TOGGLE,
    //         variables: {
    //           product: this.$route.query.id,
    //           variant: this.$route.query.id,
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.toggleWishlist
    //     this.existInWishlist ? this.success(msg) : this.setErr(err)
    //   } catch (e) {
    //     console.log('zzzzzzzzzzzzzzzzzz', e)
    //   } finally {
    //     this.savingWishlist = false
    //   }
    // },
    alertToSelectMandatoryOptions() {
      const child = this.$refs.ProductRight
      child.alertToSelectMandatoryOptions()
    },
    variantChanged(v) {
      // console.log('vvvvvvvvvvvvvvv', v)
      this.userSelectedVariant = v
    },
    optionChanged(o) {
      // console.log('oooooooooooooooooo', o)
      this.selectedOptions = o
    },
    async getProducts() {
      // Recommended Products
      this.loading = true
      try {
        this.recommendedProducts = await this.$get('product/products', {
          new: true,
        })
        // this.recommendedProducts = (
        //   await this.$apollo.query({
        //     query: PRODUCTS,
        //     variables: {
        //       new: true,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.products
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
