<template>
  <main
    v-if="brands"
    class="container mx-auto bg-white pl-2 sm:pl-10 lg:pr-10 text-gray-700"
  >
    <h1
      class="
        text-xl
        md:text-2xl
        text-gray-500
        font-semibold
        sm:font-bold
        py-5
        lg:py-10
        tracking-wide
      "
    >
      Top Brands
    </h1>

    <div v-if="loading"><ProductSliderSkeleton /></div>

    <section v-else>
      <!-- Above 1024px  -->

      <div class="hidden lg:grid lg:grid-cols-6 gap-5 items-start">
        <button
          v-for="b in brands"
          :key="b.id"
          class="flex-grow-0 container mx-auto flex-shrink-0"
          @click="go(b.slug)"
        >
          <img
            v-if="b.img"
            v-lazy="b.img"
            alt="brand"
            class="object-cover object-top w-full"
          />
          <div
            v-else
            class="
              flex
              justify-center
              items-center
              text-center
              my-auto
              text-primary-500
              font-semibold
              rounded-full
              border-2 border-primary-500
              text-2xl
              h-96
            "
          >
            {{ b.name | first }}
          </div>
        </button>
      </div>

      <!-- Below 1024px  -->

      <div class="lg:hidden overflow-x-auto">
        <div class="flex items-start justify-start space-x-2 sm:space-x-5">
          <button
            v-for="b in brands"
            :key="b.id"
            class="container mx-auto w-64 flex-shrink-0"
            @click="go(b.slug)"
          >
            <img
              v-if="b.img"
              v-lazy="b.img"
              alt="brand"
              class="object-cover object-top w-full"
            />

            <div
              v-else
              class="
                flex
                justify-center
                items-center
                text-center
                my-auto
                text-primary-500
                font-semibold
                rounded-full
                border-2 border-primary-500
                text-2xl
                h-96
              "
            >
              {{ b.name | first }}
            </div>
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import BRANDS from '~/gql/brand/brands.gql'
// import NuxtLink from '~/components/NuxtLink.vue'

export default {
  // components: { NuxtLink },
  props: {
    ishome: { type: Boolean, default: false },
    brands: { type: Array, default: () => [] },
  },

  data() {
    return {
      loading: false,
    }
  },

  async created() {
    // await this.getBrands()
  },
  methods: {
    go(url) {
      if (url)
        this.$router.push(
          `/search?${this.ishome ? 'parentBrands' : 'brands'}=${url}`
        )
    },
    //   async getBrands() {
    //     // this.loading = true
    //     try {
    //       this.brands = (
    //         await this.$apollo.query({
    //           query: BRANDS,
    //           variables: { featured: true, limit: 5, page: 0 },
    //           fetchPolicy: 'no-cache',
    //         })
    //       ).data.brands
    //       // console.log("brands to show", this.brands)
    //     } catch (e) {
    //       // console.log(e)
    //     } finally {
    //       // this.loading = false
    //     }
    //   },
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}

/* Handle */
::-webkit-scrollbar-thumb {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}
</style>
