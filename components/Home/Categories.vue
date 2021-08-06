<template>
  <main
    class="container mx-auto bg-white px-2 sm:px-10 pb-5 md:pb-0 text-gray-700"
  >
    <h1
      class="
        text-xl
        md:text-2xl
        lg:text-3xl
        font-semibold
        sm:font-bold
        py-5
        lg:py-10
        tracking-wide
      "
    >
      Categories
    </h1>

    <BagSkelton v-if="loading" />

    <section v-else-if="categories">
      <div
        class="
          grid grid-cols-3
          sm:grid-cols-5
          gap-2
          sm:gap-5
          items-start
          justify-items-center
        "
      >
        <div v-for="c in categories.data" v-if="c.img" :key="c.id">
          <nuxt-link :to="localePath(`/c/${c.slug}`)" class="group">
            <div
              class="
                overflow-hidden
                border-2 border-gray-300
                group-hover:border-primary-500
                mb-2
                sm:mb-4
                max-w-max max-h-max
                rounded-full
              "
            >
              <img
                v-lazy="c.img"
                alt="categories"
                class="
                  object-cover
                  h-24
                  w-24
                  md:h-32 md:w-32
                  border-2
                  md:border-4
                  rounded-full
                  border-white border-opacity-70
                  shadow
                  hover:shadow-md
                "
              />
            </div>

            <h6
              class="
                text-sm
                font-serif
                sm:text-base
                text-center
                group-hover:text-primary-500
              "
            >
              {{ c.name }}
            </h6>
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
