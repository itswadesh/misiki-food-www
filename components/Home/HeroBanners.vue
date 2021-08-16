<template>
  <div>
    <HeroBannerSkeleton v-if="loading" />

    <div v-for="(b, ix) of banners" :key="ix">
      <h2 class="text-3xl text-gray-500 ms-3 font-bold">{{ b._id.title }}</h2>

      <div v-if="b.data" class="grid grid-cols-2 lg:grid-cols-4">
        <a
          v-if="b.data[0] && ifUrl(b.data[0].link)"
          :href="b.data[0].link"
          target="blank"
          class="block w-auto col-span-2 m-2 sm:m-3"
        >
          <img
            v-lazy="b.data[0].img"
            class="object-scale-down w-full h-full rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[0]"
          :to="localePath(b.data[0].link)"
          class="w-auto col-span-2 m-2 sm:m-3"
        >
          <img
            v-lazy="b.data[0].img"
            class="object-scale-down w-full h-full rounded"
          />
        </nuxt-link>
        <a
          v-if="b.data[1] && ifUrl(b.data[1].link)"
          :href="b.data[1].link"
          target="blank"
          class="block w-auto col-span-2 sm:m-3"
        >
          <img
            v-lazy="b.data[1].img"
            class="object-scale-down w-full h-full rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[1]"
          :to="localePath(b.data[1].link)"
          class="w-auto col-span-2 m-3"
        >
          <img
            v-lazy="b.data[1].img"
            class="object-scale-down w-full h-full rounded"
          />
        </nuxt-link>
        <a
          v-if="b.data[2] && ifUrl(b.data[2].link)"
          :href="b.data[2].link"
          target="blank"
          class="block w-auto col-span-1 m-2 sm:m-3"
        >
          <img
            v-lazy="b.data[2].img"
            class="object-scale-down w-full h-full rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[2]"
          :to="localePath(b.data[2].link)"
          class="w-auto col-span-1 m-2 sm:m-3"
        >
          <img
            v-lazy="b.data[2].img"
            class="object-scale-down w-full h-full rounded"
          />
        </nuxt-link>

        <a
          v-if="b.data[3] && ifUrl(b.data[3].link)"
          :href="b.data[3].link"
          target="blank"
          class="block w-auto col-span-1 m-2 sm:m-3"
        >
          <img
            v-lazy="b.data[3].img"
            class="object-scale-down w-full h-full rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[3]"
          :to="localePath(b.data[3].link)"
          class="w-auto col-span-1 m-2 sm:m-3"
        >
          <img
            v-lazy="b.data[3].img"
            class="object-scale-down w-full h-full rounded"
          />
        </nuxt-link>

        <a
          v-if="b.data[4] && ifUrl(b.data[4].link)"
          :href="b.data[4].link"
          target="blank"
          class="block w-auto col-span-2 m-3"
        >
          <img
            v-lazy="b.data[4].img"
            class="object-scale-down w-full h-full rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[4]"
          :to="localePath(b.data[4].link)"
          class="w-auto col-span-2 m-3"
        >
          <img
            v-lazy="b.data[4].img"
            class="object-scale-down w-full h-full rounded"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeroBannerSkeleton from '~/components/AllSkeletons/HeroBannerSkeleton'
import NuxtLink from '~/components/NuxtLink.vue'
// import BANNERS from '~/gql/banner/banners.gql'
export default {
  components: { HeroBannerSkeleton, NuxtLink },
  props: {
    banners: { type: Array, default: null },
  },
  data() {
    return {
      // banners: null,
      loading: false,
    }
  },
  created() {
    // this.getBanners()
  },
  methods: {
    ifUrl(url) {
      if (!url || url === '') return false
      const pattern = /^((http|https|ftp):\/\/)/
      const isUrl = pattern.test(url)
      return isUrl
    },
    // async getBanners() {
    //   this.loading = true
    //   try {
    //     this.banners = (
    //       await this.$apollo.query({
    //         query: BANNERS,
    //         variables: {
    //           type: 'banner',
    //           sort: 'sort',
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.banners
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
}
</script>
