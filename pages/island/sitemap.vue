<template>
  <section class="bg-white min-h-screen pb-10 text-gray-800">
    <div class="w-full max-w-7xl mx-auto px-3">
      <h1 class="text-2xl md:text-4xl tracking-wide text-center py-5 sm:py-10">
        Sitemap
      </h1>

      <div v-if="categories && categories.length">
        <div
          class="
            flex flex-col flex-wrap
            justify-between
            content-center
            items-start
            h-rem
          "
        >
          <div
            v-for="(c, cx) in categories"
            :key="cx"
            class="w-1/2 sm:w-48 pe-4 mb-5 sm:me-12 sm:mb-12"
          >
            <h1 class="mb-3 text-lg font-medium border-b border-gray-300 pb-3">
              {{ c.name }}
            </h1>

            <div v-if="c && c.children" class="flex flex-col space-y-2">
              <div v-for="(cc, cxx) in c.children" :key="cxx">
                <h2 class="text-sm font-light">{{ cc.name }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GET_MEGAMENU from '~/gql/category/megamenu.gql'

export default {
  layout: 'island',

  data() {
    return {
      categories: null,
    }
  },

  async created() {
    await this.getCategories()
  },

  methods: {
    async getCategories() {
      // console.log('get categories')
      try {
        this.categories = (
          await this.$apollo.query({
            query: GET_MEGAMENU,
            variables: { level: 0 },
            fetchPolicy: 'no-cache',
          })
        ).data.megamenu
        console.log(this.categories, 'categories')
      } catch (e) {
        // console.log(e)
      }
      //   finally {
      //   }
    },
  },
}
</script>

<style scoped>
.h-rem {
  height: 42rem;
}
</style>
