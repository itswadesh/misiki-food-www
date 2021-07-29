<template>
  <div>
    <!--  -->
    <WorkoutSkeleton v-if="loading" />
    <div v-if="banners" class="grid grid-cols-2 lg:grid-cols-4">
      <nuxt-link
        v-if="banners.data && banners.data[0]"
        :to="localePath(banners.data[0].link)"
        class="w-auto col-span-2 m-2 sm:m-3"
      >
        <img
          v-lazy="banners.data[0].img"
          class="object-scale-down w-full h-full rounded"
        />
      </nuxt-link>
      <nuxt-link
        v-if="banners.data && banners.data[1]"
        :to="localePath(banners.data[1].link)"
        class="w-auto col-span-2 m-3"
      >
        <img
          v-lazy="banners.data[1].img"
          class="object-scale-down w-full h-full rounded"
        />
      </nuxt-link>
      <nuxt-link
        v-if="banners.data && banners.data[2]"
        :to="localePath(banners.data[2].link)"
        class="w-auto col-span-1 m-2 sm:m-3"
      >
        <img
          v-lazy="banners.data[2].img"
          class="object-scale-down w-full h-full rounded"
        />
      </nuxt-link>
      <nuxt-link
        v-if="banners.data && banners.data[3]"
        :to="localePath(banners.data[3].link)"
        class="w-auto col-span-1 m-2 sm:m-3"
      >
        <img
          v-lazy="banners.data[3].img"
          class="object-scale-down w-full h-full rounded"
        />
      </nuxt-link>
      <nuxt-link
        v-if="banners.data && banners.data[4]"
        :to="localePath(banners.data[4].link)"
        class="w-auto col-span-2 m-3"
      >
        <img
          v-lazy="banners.data[4].img"
          class="object-scale-down w-full h-full rounded"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import WorkoutSkeleton from '~/components/AllSkeletons/WorkoutSkeleton.vue'
import BANNERS from '~/gql/banner/banners.gql'
export default {
  components: { WorkoutSkeleton },
  data() {
    return {
      banners: null,
      loading: false,
    }
  },
  created() {
    this.getBanners()
  },
  methods: {
    async getBanners() {
      this.loading = true
      try {
        this.banners = await this.$get('banner/banners', {
          type: 'banner',
          sort: 'sort',
        })
        // this.banners = (
        //   await this.$apollo.query({
        //     query: BANNERS,
        //     variables: {
        //       type: 'banner',
        //       sort: 'sort',
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.banners
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
