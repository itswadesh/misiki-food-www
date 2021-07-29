<template>
  <div v-if="product" class="w-full px-2 pt-3 xl:mx-auto">
    <div v-if="product.description">
      <span
        class="
          flex
          justify-center
          pb-2
          font-normal
          text-center text-gray-700
          uppercase
          text-normal
          md:justify-start
        "
      >
        Description
      </span>
      <div class="pb-4 text-base font-light" v-html="product.description" />
    </div>
    <!-- key featires -->
    <div v-if="product.keyFeatures && product.keyFeatures.length">
      <span
        class="
          flex
          justify-center
          pb-2
          font-normal
          text-center text-gray-700
          uppercase
          md:justify-start
          text-normal
        "
      >
        Key Features
      </span>
      <div>
        <ul class="text-base font-light">
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

    <div class="mt-8">
      <div
        class="
          flex
          justify-center
          h-12
          my-auto
          font-normal
          text-center text-gray-700
          uppercase
          bg-white
          sm:bg-gray-300
          md:justify-start
          text-normal
        "
      >
        <span class="my-auto ps-5">Product Details</span>
      </div>

      <div v-for="(s, ix) in product.productDetails" :key="ix + 'pdd'">
        <div
          v-if="s"
          class="flex-row hidden text-lg font-light text-gray-500 sm:flex"
        >
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
        class="flex-row hidden text-lg font-light text-gray-500 sm:flex"
      >
        <div class="w-1/3 p-1 my-auto ps-3">Country Of Origin</div>
        <div class="w-2/3 p-1 my-auto">
          {{ product.countryOfOrigin }}
        </div>
      </div>
      <!-- mobile screen  -->
      <!--  -->
      <div v-for="(s, ix) in product.productDetails" :key="ix + 'pdm'">
        <div
          v-if="s"
          class="
            flex flex-col
            text-base
            font-light
            text-gray-500
            bg-gray-200
            sm:hidden
          "
        >
          <span class="w-full p-2 my-auto bg-white">
            {{ s.name }}
          </span>
          <span class="w-full p-2 my-auto bg-gray-100">
            {{ s.value }}
          </span>
        </div>
      </div>
      <div
        class="
          flex flex-col
          text-base
          font-light
          text-gray-500
          bg-gray-200
          sm:hidden
        "
      >
        <span class="w-full p-2 my-auto bg-white"> Country Of Origin </span>
        <span class="w-full p-2 my-auto bg-gray-100">
          {{ product.countryOfOrigin }}
        </span>
      </div>
    </div>

    <div
      v-if="product.specifications && product.specifications.length"
      class="mt-8"
    >
      <div
        class="
          flex
          justify-center
          h-12
          my-auto
          font-normal
          text-center
          bg-white
          sm:bg-gray-300
          md:justify-start
          desc
        "
      >
        <span class="my-auto uppercase ps-5">Specifications</span>
      </div>
      <div v-for="(s, ix) in product.specifications" :key="ix + 'ds'">
        <div
          v-if="s"
          class="flex-row hidden text-base font-light text-gray-500 sm:flex"
        >
          <div class="w-1/3 p-1 my-auto ps-3">
            {{ s.name }}
          </div>
          <div class="w-2/3 p-1 my-auto">
            {{ s.value }}
          </div>
        </div>
      </div>
      <!-- mobile screen  -->
      <div v-for="(s, ix) in product.specifications" :key="ix + 'ms'">
        <div
          v-if="s"
          class="flex flex-col text-base font-light text-gray-600 sm:hidden"
        >
          <span class="w-full p-2 my-auto bg-white">
            {{ s.name }}
          </span>
          <span class="w-full p-2 my-auto text-sm bg-gray-100">
            {{ s.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
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
