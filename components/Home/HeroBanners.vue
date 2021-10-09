<template>
  <div
    v-if="banners && banners.length > 0"
    class="container mx-auto bg-white px-2 sm:px-10 text-gray-700"
  >
    <HeroBannerSkeleton v-if="loading" />

    <div v-for="(b, ix) of banners" :key="ix">
      <div
        v-if="b._id.title"
        class="pb-5 lg:pb-10 flex items-center justify-center space-x-2"
      >
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
          {{ b._id.title }}
        </div>

        <hr class="h-1 border-gray-300 flex-1" />
      </div>

      <div v-if="b.data" class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5">
        <a
          v-if="b.data[0] && ifUrl(b.data[0].link)"
          :href="b.data[0].link"
          target="blank"
          class="w-auto col-span-2 geeks rounded"
        >
          <img
            v-lazy="`${b.data[0].imgCdn}?tr=w-760,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[0]"
          :to="localePath(b.data[0].link)"
          class="w-auto col-span-2 geeks rounded"
        >
          <img
            v-lazy="`${b.data[0].imgCdn}?tr=w-760,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
          />
        </nuxt-link>
        <a
          v-if="b.data[1] && ifUrl(b.data[1].link)"
          :href="b.data[1].link"
          target="blank"
          class="w-auto col-span-2 geeks rounded"
        >
          <img
            v-lazy="`${b.data[1].imgCdn}?tr=w-760,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[1]"
          :to="localePath(b.data[1].link)"
          class="w-auto col-span-2 geeks rounded"
        >
          <img
            v-lazy="`${b.data[1].imgCdn}?tr=w-760,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
          />
        </nuxt-link>
        <a
          v-if="b.data[2] && ifUrl(b.data[2].link)"
          :href="b.data[2].link"
          target="blank"
          class="w-auto col-span-1 geeks rounded"
        >
          <img
            v-lazy="`${b.data[2].imgCdn}?tr=w-370,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[2]"
          :to="localePath(b.data[2].link)"
          class="w-auto col-span-1 geeks rounded"
        >
          <img
            v-lazy="`${b.data[2].imgCdn}?tr=w-370,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
          />
        </nuxt-link>

        <a
          v-if="b.data[3] && ifUrl(b.data[3].link)"
          :href="b.data[3].link"
          target="blank"
          class="w-auto col-span-1 geeks rounded"
        >
          <img
            v-lazy="`${b.data[3].imgCdn}?tr=w-370,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[3]"
          :to="localePath(b.data[3].link)"
          class="w-auto col-span-1 geeks rounded"
        >
          <img
            v-lazy="`${b.data[3].imgCdn}?tr=w-370,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
          />
        </nuxt-link>

        <a
          v-if="b.data[4] && ifUrl(b.data[4].link)"
          :href="b.data[4].link"
          target="blank"
          class="w-auto col-span-2 geeks rounded"
        >
          <img
            v-lazy="`${b.data[4].imgCdn}?tr=w-760,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
          />
        </a>
        <nuxt-link
          v-else-if="b.data[4]"
          :to="localePath(b.data[4].link)"
          class="w-auto col-span-2 geeks rounded"
        >
          <img
            v-lazy="`${b.data[4].imgCdn}?tr=w-760,h-390,fo-auto`"
            alt=""
            class="h-full w-full object-cover rounded"
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

<style scoped>
.geeks {
  overflow: hidden;
  margin: 0 auto;
}

.geeks img {
  width: 100%;
  transition: 0.5s all ease-in-out;
}

.geeks:hover img {
  transform: scale(1.03);
}
</style>
