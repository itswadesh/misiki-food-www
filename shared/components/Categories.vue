<template>
  <div
    v-if="categories"
    class="
      sticky
      top-0
      z-10
      flex
      w-full
      mb-2
      overflow-x-auto
      text-gray-600
      border-t
      shadow-lg
      bg-gray-50
    "
  >
    <nuxt-link
      v-for="c in categories.data"
      :key="c.id"
      :to="localePath(`/c/${c.slug}`)"
      class="category-item"
    >
      <!-- <i :class="`fa fa-${c.icon}`" /> -->
      <img
        v-lazy="`${c.img}?tr=w-64,h-64,fo-auto`"
        alt="🚀"
        class="w-8 h-8 rounded-full"
      />
      <span class="text-xs">{{ c.name }}</span>
    </nuxt-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CATEGORIES from '~/gql/category/categories.gql'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  data() {
    return {
      categories: null,
    }
  },
  async mounted() {
    try {
      this.clearErr()
      this.categories = await this.$get('category/categories', {})
      // this.categories = (
      //   await this.$apollo.query({
      //     query: CATEGORIES,
      //     fetchPolicy: 'no-cache',
      //   })
      // ).data.categories
    } catch (e) {
      this.setErr(e)
    } finally {
      this.busy(false)
    }
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
  },
}
</script>

<style scoped></style>
