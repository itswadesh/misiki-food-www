<template>
  <div class="bg-gray-50">
    <div class="m-2 text-gray-500 bg-white rounded shadow">
      <div class="flex flex-col justify-between md:flex-row">
        <h1 class="p-4 my-auto text-2xl font-medium md:ms-5">
          Ratings & Reviews
        </h1>
        <!--  -->
        <div v-if="product" class="flex flex-row me-5">
          <div class="p-2 ps-4 my-auto text-gray-700">
            <span>{{ product.name }}</span>
            <!-- <span class="flex justify-end text-xs text-secondary-200 text-end">{{product.price | currency(store.currencySymbol,2)}}</span>-->
          </div>
          <img
            v-lazy="product.img"
            alt="product img"
            class="
              object-contain
              w-16
              h-16
              m-2
              bg-gray-200
              shadow
              ms-4
              border-1
            "
          />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="flex flex-row m-2">
      <div class="hidden w-1/3 text-gray-900 bg-white me-3 md:block">
        <div class="p-5 text-xl font-medium text-gray-500 shadow border-b-1">
          What makes a good review
        </div>
        <div class="p-5 shadow border-b-1">
          <span class="mb-2 text-lg">Have you used this product?</span>
          <span class="text-sm">
            Your review should be about your experience with the product.
          </span>
        </div>
        <div class="p-5 shadow border-b-1">
          <span class="mb-2 text-lg">Why review a product?</span>
          <span class="text-sm">
            Your valuable feedback will help fellow shoppers decide!
          </span>
        </div>
        <div class="p-5 shadow border-b-1">
          <span class="mb-2 text-lg">How to review a product?</span>
          <span class="text-sm">
            Your review should include facts. An honest opinion is always
            appreciated. If you have an issue with the product or service please
            contact us from the help centre.
          </span>
        </div>
      </div>
      <div class="w-full h-auto text-gray-500 bg-white border shadow">
        <div v-if="saveReview" class="flex flex-col p-5">
          <div>
            <span class="text-xl font-semibold">Rate this product</span>
            <div class="border-b-1">
              <StarRating v-model="saveReview.rating" />
            </div>
          </div>
          <div class="mt-2">
            <span class="text-lg font-semibold">Reviews this product</span>
            <form
              novalidate
              autocomplete="off"
              class="mt-4"
              @submit.stop.prevent="submit"
            >
              <!-- {{ saveReview.message }} -->
              <span>
                <textarea
                  v-model="saveReview.message"
                  placeholder="Description"
                  class="
                    w-full
                    h-40
                    p-3
                    text-sm
                    border-none
                    rounded-sm
                    shadow
                    ring-2 ring-gray-400
                    focus:ring-2 focus:ring-primary-500
                  "
                ></textarea>
              </span>
              <button
                type="submit"
                class="
                  float-right
                  w-1/4
                  h-10
                  p-1
                  mt-4
                  text-white
                  bg-primary-500
                  rounded
                  shadow
                  lg:text-xl
                  md:text-lg
                  focus:outline-none
                  md:h-12
                  hover:-translate-y-0.5
                  transition
                  transform
                  ease-in-out
                  focus:ring-opacity-50
                  focus:ring
                  focus:ring-offset-2
                  focus:ring-yellow-600
                "
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import REVIEW from '~/gql/review/saveReview.gql'
import PRODUCT from '~/gql/product/product.gql'
import { StarRating } from '~/shared/components/ui'

export default {
  components: { StarRating },
  middleware: ['isAuth'],
  data() {
    return {
      product: null,
      saveReview: {
        id: 'new',
        pid: this.$route.query.id,
        message: '',
        rating: null,
      },
    }
  },
  head() {
    return {
      title: 'Rate This Product',
    }
  },
  computed: {
    ...mapGetters({
      store: 'store',
    }),
  },
  async created() {
    // console.log('id..........', this.$route.query.id)
    await this.getProduct()
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async getProduct() {
      this.loading = true
      try {
        this.product = await this.$get('product/product', {
          id: this.$route.query.id,
        })
        // this.product = (
        //   await this.$apollo.query({
        //     query: PRODUCT,
        //     variables: { id: this.$route.query.id },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.product
        this.updatedDeliveryDates()
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    async submit() {
      const msg = 'Your Comment Added'
      try {
        this.saveReview = await this.$post('review/saveReview', this.saveReview)
        // this.saveReview = (
        //   await this.$apollo.mutate({
        //     mutation: REVIEW,
        //     variables: this.saveReview,
        //   })
        // ).data.saveReview
        this.success(msg)
        if (this.product)
          this.$router.push(`/${this.product.slug}?id=${this.product.id}`)
      } catch (e) {
        this.setErr(e)
      }
    },
  },
}
</script>
