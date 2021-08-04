<template>
  <section>
    <h1 class="text-3xl font-bold text-gray-700 mb-5 sm:mb-10 tracking-wide">
      Categories
    </h1>

    <BagSkelton v-if="loading" />

    <div
      v-else-if="categories"
      class="
        grid grid-cols-3
        gap-4
        p-1
        px-3
        md:grid-cols-4
        lg:grid-cols-6 lg:px-28
        md:p-8 md:px-24
      "
    >
      <div
        v-for="c in categories.data"
        v-if="c.img"
        :key="c.id"
        class="mx-auto mt-6"
      >
        <nuxt-link :to="localePath(`/c/${c.slug}`)">
          <!-- transition duration-500 ease-in-out transform md:h-auto hover:-translate-y-1 hover:scale-110 -->
          <img
            v-lazy="c.img"
            alt="categories"
            class="
              object-cover
              w-24
              h-24
              mx-auto
              border-2
              rounded-full
              border-secondary-500
              hover:shadow-xl
              md:w-32 md:h-32
            "
          />
          <span
            class="
              flex
              justify-center
              mx-auto
              mt-4
              text-base
              font-normal
              text-center text-gray-500
            "
          >
            {{ c.name }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </section>
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
.border-b4 {
  border-bottom: 3px solid;
}
</style>
