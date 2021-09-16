<template>
  <div class="pb-10 bg-white sm:pb-32">
    <Megamenu class="hidden border-b xl:flex" />

    <!-- <div v-if="loading"  class="flex flex-col mt-32 xl:flex-row sm:mt-5">
        <DetailsPageLeftSkeleton class="xl:w-2/5" />
        <DetailsSkeleton class="-mt-1 xl:w-3/5" />
     </div> -->

    <div class="container mx-auto px-2 sm:px-10">
      <div
        v-if="product && product.id"
        class="
          flex flex-row
          items-center
          justify-between
          space-x-4
          py-2
          sm:py-5
        "
      >
        <Breadcrumb :path="bc()" :name="product.name" class="w-3/4" />

        <Share :product="product" :host="host" />
      </div>

      <div class="flex flex-col w-full xl:flex-row">
        <div class="xl:w-3/5">
          <!-- <DetailsPageLeftSkeleton v-if="loading" class="hidden sm:block" /> -->

          <div v-if="product && product.id" class="sticky top-20">
            <ProductImages
              v-if="product"
              :loading="$fetchState.pending"
              class="h-auto mt-5 nowrap lg:mt-0 mb-5 md:mb-10"
              :images="product && product.images"
              :pid="product.id"
              :img="product.img"
              :host="host"
              :product="product"
              :exist-in-wishlist="checkWishlist"
            />

            <div
              class="
                flex-row
                hidden
                w-full
                xl:flex
                items-center
                justify-between
                space-x-5
              "
            >
              <div class="w-1/2 my-auto">
                <AddToCart
                  :product="product"
                  :user-selected-variant="userSelectedVariant"
                  :options="product.options"
                  :selected-options="selectedOptions"
                  @alertToSelectMandatoryOptions="alertToSelectMandatoryOptions"
                />
              </div>

              <div class="w-1/2">
                <BuyNow
                  v-if="product.stock > 0"
                  :product="product"
                  :user-selected-variant="userSelectedVariant"
                  :options="product.options"
                  :selected-options="selectedOptions"
                  @alertToSelectMandatoryOptions="alertToSelectMandatoryOptions"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 sm:mt-10 xl:w-2/5 xl:mt-0">
          <!-- <DetailsSkeleton v-if="loading"  /> -->

          <div v-if="product && product.id" class="bg-white">
            <ProductRight
              ref="ProductRight"
              class="w-full h-auto nowrap mb-5"
              :host="host"
              :product="product"
              :pg="pg"
              :review-summary="reviewSummary"
              @variantChanged="variantChanged"
              @optionChanged="optionChanged"
            />

            <div
              class="
                mb-5
                px-2
                xl:ms-5
                md:flex
                items-center
                space-y-4
                md:space-y-0 md:space-x-5
                xl:hidden
              "
            >
              <div class="w-full md:w-1/2">
                <AddToCart
                  class=""
                  :product="product"
                  :user-selected-variant="userSelectedVariant"
                  :options="product.options"
                  :selected-options="selectedOptions"
                  @alertToSelectMandatoryOptions="alertToSelectMandatoryOptions"
                />
              </div>

              <div class="w-full md:w-1/2">
                <BuyNow
                  v-if="product.stock > 0"
                  class=""
                  :product="product"
                  :user-selected-variant="userSelectedVariant"
                  :options="product.options"
                  :selected-options="selectedOptions"
                  @alertToSelectMandatoryOptions="alertToSelectMandatoryOptions"
                />
              </div>
            </div>
          </div>

          <ProductDetailSpecs :product="product" class="mb-5" />

          <RatingAndReviews />
        </div>
      </div>
    </div>

    <div
      v-if="!product && !product.id"
      class="
        container
        mx-auto
        flex flex-col
        items-center
        justify-center
        w-4/5
        pt-16
        text-center
        sm:pt-10 sm:w-1/2
      "
    >
      <img
        v-lazy="'/no/empty-animate.svg'"
        alt="Not found"
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
      class="container mx-auto my-10"
    >
      <ProductSlider
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
import { TITLE, DESCRIPTION, KEYWORDS } from '~/shared/config'
import PRODUCTS from '~/gql/product/products.gql'
import DETAIL from '~/gql/groupQueries/DETAIL.gql'
import PRODUCT_GROUP from '~/gql/product/product_group.gql'
// import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
// import CHECK_WISHLIST from '~/gql/wishlist/checkWishlist.gql'
import DetailsPageLeftSkeleton from '~/components/AllSkeletons/DetailsPageLeftSkeleton.vue'
import { ReviewSummary } from '~/shared/components'
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
    let productGroup = {}
    let checkWishlist = false
    let reviewSummary = {}
    let selectedVariant = null
    let err = null
    const id = query.id
    if (!id) error({ statusCode: 404, message: 'Page not found' })
    try {
      const pw = (
        await client.query({
          query: DETAIL,
          variables: { id },
          fetchPolicy: 'no-cache',
        })
      ).data
      product = pw.product
      productGroup = pw.product_group
      checkWishlist = pw.checkWishlist
      reviewSummary = pw.reviewSummary
      if (!product) error('Not found')
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
    if (product && store.state.store) {
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
          priceCurrency: store.state.store.currencyCode,
          seller: {
            '@type': 'Organization',
            name: store.state.store.name,
            url: HOST,
          },
        },
      }
    }
    const { title, keywords, description, favicon, logoMobile } =
      store.state.store || {} // err = null
    return {
      host: HOST,
      product,
      productGroup,
      checkWishlist,
      reviewSummary,
      selectedVariant,
      err,
      structuredData,
      title,
      keywords,
      description,
      favicon,
      logoMobile,
    }
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
  async fetch() {
    this.recommendedProducts = await this.$get('product/products', {
      new: true,
    })
    // this.getProducts()
    // // this.getProductGroups()
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
            content: this.product.img || this.logoMobile,
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
            content: this.product.img || this.logoMobile,
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
            content: this.product.img || this.logoMobile,
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
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    bc() {
      let b = []
      if (this.product.category) b = [...this.product.category.pathA]
      b.push(this.product.category)
      return b
    },
    // async getProductGroups() {
    //   const id = this.$route.query.id
    //   if (!id) return
    //   try {
    //     this.pg = await this.$get('product/product_group', { id })
    //     // this.pg = (
    //     //   await this.$apollo.query({
    //     //     query: PRODUCT_GROUP,
    //     //     variables: { id },
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.product_group
    //     // this.checkWishlist()
    //   } catch (e) {}
    // },
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
    // async getProducts() {
    //   // Recommended Products
    //   this.loading = true
    //   try {
    //     this.recommendedProducts = await this.$get('product/products', {
    //       new: true,
    //     })
    //     // this.recommendedProducts = (
    //     //   await this.$apollo.query({
    //     //     query: PRODUCTS,
    //     //     variables: {
    //     //       new: true,
    //     //     },
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.products
    //   } catch (e) {
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
}
</script>
