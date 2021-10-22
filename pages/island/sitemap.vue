<template>
  <section class="bg-white min-h-screen">
    <Megamenu class="hidden lg:flex px-10" />

    <div class="container mx-auto max-w-7xl px-3">
      <h1
        class="
          py-5
          sm:py-10
          font-serif font-bold
          text-2xl
          sm:text-4xl
          text-center
          flex flex-col
          items-center
          sm:items-start
          max-w-max
          mx-auto
        "
      >
        <span> All Categories</span>
        <hr class="mt-2.5 border-t-4 border-gray-800 opacity-50 w-20" />
      </h1>

      <div v-if="megamenu">
        <div class="flex flex-col flex-wrap content-center items-start h-rem">
          <div
            v-for="(m, mx) in megamenu"
            :key="mx"
            class="w-1/2 sm:w-1/4 lg:w-60 p-2.5 sm:mr-10 sm:mb-10"
          >
            <nuxt-link :to="localePath(`/c/${m.slug}`)"
              ><div
                class="
                  mb-3
                  sm:text-lg
                  font-medium
                  border-b border-gray-300
                  pb-3
                "
              >
                {{ m.name }}
              </div>
            </nuxt-link>

            <div v-if="m && m.children" class="flex flex-col space-y-2">
              <div v-for="(mm, mxx) in m.children" :key="mxx">
                <nuxt-link :to="localePath(`/c/${mm.slug}`)">
                  <div class="text-sm font-light">
                    {{ mm.name }}
                  </div>
                </nuxt-link>
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
import Megamenu from '~/components/Home/Megamenu.vue'
import MEGAMENU from '~/gql/category/megamenuAll.gql'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { Megamenu, NuxtLink },

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
