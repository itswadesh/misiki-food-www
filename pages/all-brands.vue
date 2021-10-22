<template>
  <section
    v-if="parentBrands && parentBrands.data && parentBrands.data.length > 0"
    class="bg-white min-h-screen"
  >
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
        <span>All Brands</span>
        <hr class="mt-2.5 border-t-4 border-gray-800 opacity-50 w-20" />
      </h1>

      <div
        v-if="parentBrands"
        class="
          p-10
          grid grid-cols-3
          sm:grid-cols-4
          md:grid-cols-5
          lg:grid-cols-6
          gap-5
          justify-items-center
          items-center
        "
      >
        <div v-for="b in parentBrands.data" :key="b.id">
          <nuxt-link :to="localePath(`/c?brands=${b.name}`)">
            <img
              v-if="b.imgCdn"
              v-lazy="`${b.imgCdn}?tr=h-64,fo-auto`"
              alt="bab"
              class="object-contain h-16"
            />

            <div
              v-else
              class="
                h-16
                w-16
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
              "
            >
              {{ b.name | first }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import PARENT_BRANDS from '~/gql/brand/parentBrands.gql'
// import MEGAMENU from '~/gql/category/megamenu.gql'
// import BRAND from '~/gql/brand/brand.gql'
import Megamenu from '~/components/Home/Megamenu.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { Megamenu, NuxtLink },

  props: {
    brand: { type: String, default: null },
  },

  data() {
    return {
      parentBrands: false,
    }
  },

  computed: {
    ...mapGetters({ megamenu: 'megamenu' }),
  },

  created() {
    this.getParentBrands()
  },

  methods: {
    async getParentBrands() {
      this.loading = true
      try {
        this.parentBrands = await this.$get('brand/parentBrands', {
          featured: true,
          limit: 30,
          page: 0,
        })
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>
