<template>
  <div v-if="product" class="w-full px-2 xl:ms-5">
    <!-- Description -->

    <div v-if="product.description" class="text-sm sm:text-base mb-1.5 sm:mb-3">
      <div class="flex items-center space-x-2 mb-2">
        <span class="font-semibold">Description</span>

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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </div>

      <div
        class="font-light text-gray-500 text-sm"
        v-html="product.description"
      />
    </div>

    <!-- Key Features -->

    <div
      v-if="product.keyFeatures && product.keyFeatures.length"
      class="text-sm sm:text-base mb-1.5 sm:mb-3"
    >
      <div class="flex items-center space-x-2 mb-2">
        <span class="font-semibold"> Key Features</span>

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
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      </div>

      <div>
        <ul class="font-light text-sm sm:text-base">
          <li v-for="(kf, ix) in product.keyFeatures" :key="ix + 'kf'">
            <div v-if="kf" class="flex flex-row py-2">
              <div class="w-5 h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span class="leading-5 ms-2"> {{ kf }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="text-sm sm:text-base mb-1.5 sm:mb-3">
      <div class="flex items-center space-x-2 mb-2">
        <span class="font-semibold">Product Details</span>

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
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>

      <div v-for="(s, ix) in product.productDetails" :key="ix + 'pdd'">
        <div v-if="s" class="flex-row font-light text-gray-500 mb-2 text-sm">
          <div class="w-1/3 p-1 my-auto ps-3">
            {{ s.name }}
          </div>
          <div class="w-2/3 p-1 my-auto">
            {{ s.value }}
          </div>
        </div>
      </div>

      <div
        v-if="product.countryOfOrigin"
        class="flex items-center mb-2 text-sm font-medium"
      >
        <span class="whitespace-nowrap w-36 me-2">Country Of Origin - </span>

        <span class="text-gray-500">{{ product.countryOfOrigin }}</span>
      </div>
    </div>

    <div
      v-if="product.specifications && product.specifications.length"
      class="text-sm sm:text-base mb-1.5 sm:mb-3"
    >
      <div class="flex items-center space-x-2 mb-2">
        <span class="font-semibold">Specifications</span>

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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      <div v-for="(s, ix) in product.specifications" :key="ix + 'ds'">
        <div v-if="s" class="flex-row font-light text-gray-500 mb-2 text-sm">
          <div class="w-1/3 p-1 my-auto ps-3">
            {{ s.name }}
          </div>
          <div class="w-2/3 p-1 my-auto">
            {{ s.value }}
          </div>
        </div>
      </div>

      <div
        v-if="product.countryOfOrigin"
        class="flex items-center mb-2 text-sm font-medium"
      >
        <span class="whitespace-nowrap w-36 me-2">Country Of Origin - </span>

        <span class="text-gray-500">{{ product.countryOfOrigin }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: { type: Object, default: null },
  },
  data() {
    return {
      review: false,
      returninfo: false,
      desc: false,
      spec: false,
      selectedCategory: 'spec',
    }
  },
  // computed: {
  //   ProductDetails: function () {
  //     return this.product.ProductDetails.filter((i) => {
  //       if (i) return i
  //     })
  //   },
  // },
  methods: {
    onSelectCategory(val) {
      this.selectedCategory = val
    },
  },
}
</script>
