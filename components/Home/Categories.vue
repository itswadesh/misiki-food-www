<template>
  <section class="container mx-auto bg-white px-2 sm:px-10 text-gray-700">
    <CategoriesSkeleton v-if="loading" />

    <div v-else-if="categories && categories.count > 0">
      <div class="pb-5 lg:pb-10 flex items-center justify-center space-x-2">
        <hr class="h-1 border-gray-300 flex-1" />

        <div
          class="
            flex
            items-center
            justify-center
            text-center text-white text-sm
            sm:text-base
            font-semibold
            tracking-wider
            uppercase
            py-2
            px-8
            bg-primary-500
          "
        >
          Categories
        </div>

        <hr class="h-1 border-gray-300 flex-1" />
      </div>

      <div
        class="
          grid grid-cols-3
          p-1
          px-3
          md:grid-cols-4
          lg:grid-cols-6
          gap-3
          md:gap-4
          lg:gap-6
          justify-items-center
        "
      >
        <div v-for="c in categories.data" v-if="c.imgCdn" :key="c.id">
          <nuxt-link
            :to="localePath(`/c/${c.slug}`)"
            class="
              w-24
              md:w-28
              xl:w-36
              flex flex-col
              items-start
              justify-center
              group
            "
          >
            <div
              class="
                mb-2
                ms:mb-4
                w-24
                h-24
                md:h-28 md:w-28
                xl:w-36 xl:h-36
                rounded-full
                border-2 border-gray-300
                group-hover:border-primary-500
                flex-shrink-0
                group-hover:shadow-lg
                overflow-hidden
              "
            >
              <img
                v-lazy="`${c.imgCdn}?tr=w-144,h-144,fo-auto`"
                alt="categories"
                class="w-full h-full object-cover"
              />
            </div>

            <h6
              class="
                w-full
                text-sm
                sm:text-base
                text-center text-gray-500
                group-hover:text-primary-500
                capitalize
                overflow-ellipsis
                line-clamp-1
                sm:line-clamp-2
              "
            >
              {{ c.name }}
            </h6>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CATEGORIES from '~/gql/category/categories.gql'
import NuxtLink from '~/components/NuxtLink.vue'
import CategoriesSkeleton from '~/components/AllSkeletons/CategoriesSkeleton.vue'

export default {
  components: {
    NuxtLink,
    CategoriesSkeleton,
  },

  props: {
    loading: { type: Boolean, default: false },
    categories: { type: Object, default: null },
  },

  data() {
    return {
      // categories: null,
    }
  },

  created() {
    // this.getCategories()
  },

  methods: {
    // async getCategories() {
    //   this.loading = true
    //   try {
    //     this.categories = await this.$get('category/categories', {
    //       img: true,
    //       shopbycategory: true,
    //     })
    //     // this.categories = (
    //     //   await this.$apollo.query({
    //     //     query: CATEGORIES,
    //     //     variables: { img: true, shopbycategory: true },
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.categories
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },
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
