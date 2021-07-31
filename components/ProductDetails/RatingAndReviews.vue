<template>
  <div v-if="productReviews" class="px-2">
    <div
      class="
        flex
        justify-start
        h-12
        p-3
        my-auto
        font-normal
        text-center
        capitalize
        bg-gray-300
      "
    >
      Rating and reviews
    </div>
    <div v-for="r in productReviews.data" :key="r.id" class="py-5 border-b">
      <div class="flex flex-row justify-between mb-3">
        <div class="flex flex-row">
          <div
            class="
              flex flex-row
              items-center
              justify-center
              w-20
              h-8
              my-auto
              text-base
              font-normal
              tracking-wider
              text-gray-600
              bg-gray-300
              rounded
              me-4
            "
          >
            <span class="my-auto me-1">{{ r.rating }}</span>
            <svg
              width="17"
              height="17"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0517 15.1844L10 15.1532L9.94833 15.1844L3.97123 18.7919L5.55738 11.9927L5.5711 11.9339L5.52548 11.8944L0.244617 7.31961L7.19845 6.72964L7.25854 6.72454L7.28207 6.66902L10 0.256259L12.7179 6.66902L12.7415 6.72454L12.8015 6.72964L19.7554 7.31961L14.4745 11.8944L14.4289 11.9339L14.4426 11.9927L16.0288 18.7919L10.0517 15.1844Z"
                fill="#F2B200"
                stroke="#95989A"
                stroke-width="0.2"
              />
            </svg>
          </div>
          <div class="my-auto">
            <p v-if="r.rating == 1" class="text-red-600">Very Disappointed</p>
            <p v-if="r.rating == 2" class="text-red-400">
              Slightly Disappointed
            </p>
            <p v-if="r.rating == 3" class="text-accent-500">Good</p>
            <p v-if="r.rating == 4" class="text-secondary-200">Very Good</p>
            <p v-if="r.rating == 5" class="text-[#c30b4e]">Awesome</p>
          </div>
        </div>
        <!-- <div class="flex flex-row my-auto text-gray-600">
          <div class="flex flex-row cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 my-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
              />
            </svg>
            <div class="my-auto text-xs font-light ms-2">07</div>
          </div>
          <div class="flex flex-row mx-4 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 my-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"
              />
            </svg>
            <div class="my-auto text-xs font-light ms-2">07</div>
          </div>
          <div class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 my-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
              />
            </svg>
          </div>
        </div> -->
      </div>
      {{ r.message }}
      <!-- <div class="flex flex-row mt-4 text-base font-light">
        <span class="my-auto">Table Customer</span>
        <span class="my-auto text-xs leading-7 ms-3">1 Month</span>
      </div> -->
      <div class="mt-3 text-base font-light ps-8">
        Certified Buyer, {{ r.user.firstName }} {{ r.user.lastName }}
      </div>
    </div>
    <!-- <div>
    :to="localePath(`/rate-this-product?id=${product.id}`)"
      <nuxt-link to="/"
        class="flex flex-col justify-between my-4 sm:flex-row"
      >
        <div>Have doubts regarding this product?</div>
        <button
          class="px-4 py-2 mt-4 text-base font-light text-gray-600 bg-gray-300 border-none rounded sm:mt-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none hover:bg-gray-200"
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
