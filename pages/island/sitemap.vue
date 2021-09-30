<template>
  <section class="bg-white min-h-screen pb-10 text-gray-800">
    <div class="w-full max-w-7xl mx-auto px-3">
      <h1 class="text-2xl md:text-4xl tracking-wide text-center py-5 sm:py-10">
        All Categories
      </h1>

      <div v-if="megamenu">
        <div class="flex flex-col flex-wrap content-center items-start h-rem">
          <div
            v-for="(m, mx) in megamenu"
            :key="mx"
            class="w-1/2 sm:w-1/4 lg:w-60 p-2.5 sm:mr-10 sm:mb-10"
          >
            <h1
              class="mb-3 sm:text-lg font-medium border-b border-gray-300 pb-3"
            >
              {{ m.name }}
            </h1>

            <div v-if="m && m.children" class="flex flex-col space-y-2">
              <div v-for="(mm, mxx) in m.children" :key="mxx">
                <h2 class="text-sm font-light">{{ mm.name }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import MEGAMENU from '~/gql/category/megamenuAll.gql'

export default {
  layout: 'island',

  data() {
    return {
      categories: null,
      loading: false,
    }
  },

  computed: {
    ...mapGetters({ megamenu: 'megamenu' }),
  },

  // async created() {
  //   await this.getCategories()
  // },

  // methods: {
  //   async getCategories() {
  //     try {
  //       this.loading = true
  //       this.categories = await this.$apollo.query({
  //         query: MEGAMENU,
  //         fetchPolicy: 'no-cache',
  //       }).data
  //       console.log(this.categories, 'categories')
  //     } catch (e) {
  //       // console.log(e)
  //     } finally {
  //       this.loading = false
  //     }
  //   },
  // },
}
</script>

<style scoped>
@media (max-width: 640px) {
  .h-rem {
    height: 50rem;
  }
}
@media (min-width: 640px) {
  .h-rem {
    height: 45rem;
  }
}
@media (min-width: 768px) {
  .h-rem {
    height: 40rem;
  }
}
@media (min-width: 1024px) {
  .h-rem {
    height: 35rem;
  }
}
@media (min-width: 1280px) {
  .h-rem {
    height: 30rem;
  }
}
</style>
