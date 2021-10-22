<template>
  <div class="w-full lg:my-6">
    <HeroSliderSkeleton v-if="loading" />

    <div
      v-else-if="banners && banners[0] && banners[0].imgCdn"
      class="relative group"
    >
      <video ref="video" muted autoplay loop class="z-0 w-full h-auto">
        <source :src="banners[0].imgCdn" type="video/mp4" />
      </video>

      <!-- Toggle mute , unmute button -->

      <button
        class="
          hidden
          group-hover:flex
          absolute
          top-0
          right-0
          z-10
          m-2
          sm:m-3
          p-1.5
          bg-black bg-opacity-50
          rounded-full
          hover:bg-opacity-30
          text-white
          transition
          duration-300
          items-center
          justify-center
          focus:outline-none focus:ring-0 focus:ring-offset-0
        "
        @click="toggleMute()"
      >
        <!-- mute icon -->

        <svg
          v-if="isMuted"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            clip-rule="evenodd"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>

        <!-- unmute icon -->

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
// import BANNERS from '~/gql/banner/banners.gql'
import HeroSliderSkeleton from '~/components/AllSkeletons/HeroSliderSkeleton.vue'

export default {
  components: { HeroSliderSkeleton },

  props: {
    loading: { type: Boolean, default: false },
    banners: { type: Array, default: null },
  },

  data() {
    return {
      // banners: null,
      isMuted: true,
    }
  },

  created() {
    // this.getBanners()
  },

  methods: {
    async getBanners() {
      this.loading = true
      try {
        this.banners = await this.$get('banner/banners', { type: 'video' })
        // this.banners = (
        //   await this.$apollo.query({
        //     query: BANNERS,
        //     variables: {
        //       type: 'video',
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.banners
      } catch (e) {
      } finally {
        this.loading = false
      }
    },

    toggleMute() {
      const vid = this.$refs.video
      vid.muted = this.isMuted = !vid.muted
    },
  },
}
</script>
