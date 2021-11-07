<template>
  <div
    v-if="productReviews && productReviews.count > 0"
    class="w-full px-2 xl:ms-5"
  >
    <div class="text-sm sm:text-base flex items-center space-x-2 mb-2">
      <span class="font-semibold">Rating and reviews</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    </div>

    <div v-for="r in productReviews.data" :key="r.id">
      <div class="mb-2 flex items-end space-x-2">
        <h1 class="font-medium text-4xl leading-none">{{ r.rating }}</h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-primary-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>

        <span v-if="r.rating == 1" class="text-red-600"
          >Very Disappointed Product</span
        >
        <span v-if="r.rating == 2" class="text-red-500">
          Slightly Disappointed Product
        </span>
        <span v-if="r.rating == 3" class="text-red-400">Good Product</span>
        <span v-if="r.rating == 4" class="text-success">Very Good Product</span>
        <span v-if="r.rating == 5" class="text-primary-500"
          >Awesome Product</span
        >
      </div>

      <h6 class="text-sm font-light text-gray-500">5.2k Verified Buyers</h6>
    </div>

    <!-- <div>
    :to="localePath(`/rate-this-product?id=${product.id}`)"
      <nuxt-link to="/"
        class="flex flex-col justify-between my-4 sm:flex-row"
      >
        <div>Have doubts regarding this product?</div>
        <button
          class="px-4 py-2 mt-4 text-base font-light text-gray-600 bg-gray-300 border-none rounded sm:mt-0 ring-1 ring-gray-300       focus:outline-none focus:ring-0 focus:ring-offset-0
 hover:bg-gray-200"
        >
          Post Your Question
        </button>
      </nuxt-link>
    </div> -->
  </div>
</template>
<script>
import PRODUCT_REVIEWS from '~/gql/review/productReviews.gql'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  data() {
    return {
      productReviews: null,
    }
  },
  created() {
    this.getReviews()
  },
  methods: {
    async getReviews() {
      const pid = this.$route.query.id
      if (!pid) return
      try {
        this.productReviews = await this.$get('review/productReviews', { pid })
        // this.productReviews = (
        //   await this.$apollo.query({
        //     query: PRODUCT_REVIEWS,
        //     variables: { pid },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.productReviews
      } catch (e) {}
    },
  },
}
</script>
