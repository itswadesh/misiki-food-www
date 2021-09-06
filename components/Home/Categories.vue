<template>
  <main
    v-if="categories && categories.count > 0"
    class="container mx-auto bg-white px-2 sm:px-10 pb-5 md:pb-0 text-gray-700"
  >
    <div class="py-5 lg:py-10 flex items-center justify-center space-x-2">
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

    <BagSkelton v-if="loading" />

    <section v-else>
      <div
        class="grid grid-cols-3 gap-4 p-1 px-3 md:grid-cols-4 lg:grid-cols-6"
      >
        <div
          v-for="c in categories.data"
          v-if="c.img"
          :key="c.id"
          class="mr-2 mb-2 sm:mr-5 xl:mr-6 sm:mb-5 xl:mb-6"
        >
          <nuxt-link :to="localePath(`/c/${c.slug}`)">
            <div
              class="
                overflow-hidden
                w-24
                h-24
                md:w-32 md:h-32
                rounded-full
                border-2 border-gray-300
                group-hover:border-primary-500
                flex-shrink-0
                group
              "
            >
              <img
                v-lazy="c.img"
                alt="categories"
                class="
                  object-cover object-top
                  w-24
                  h-24
                  mx-auto
                  border-2
                  md:border-4
                  rounded-full
                  border-white border-opacity-70
                  group-hover:shadow-lg
                  md:w-32 md:h-32
                "
              />
            </div>
            <span
              class="
                flex
                justify-center
                mx-auto
                mt-4
                text-base
                font-normal
                text-center text-gray-500
                group-hover:text-primary-500
              "
            >
              {{ c.name }}
            </span>
          </nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import BagSkelton from '~/components/AllSkeletons/BagSkelton.vue'
import CATEGORIES from '~/gql/category/categories.gql'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: {
    BagSkelton,
    NuxtLink,
  },
  data() {
    return {
      categories: null,
      loading: false,
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      this.loading = true
      try {
        this.categories = await this.$get('category/categories', {
          img: true,
          shopbycategory: true,
        })
        // this.categories = (
        //   await this.$apollo.query({
        //     query: CATEGORIES,
        //     variables: { img: true, shopbycategory: true },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.categories
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
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
