<template>
  <div>
    <FlvPlayer :src="$route.query.url.replace('http://', 'https://')" />
    <!-- <VideoPlayer
      :video-src="$route.query.url"
    /> -->
  </div>
</template>

<script>
import VideoPlayer from '~/components/Video/VideoPlayer.vue'
import FlvPlayer from '~/components/Video/FlvPlayer.vue'
export default {
  components: {
    VideoPlayer,
    FlvPlayer,
  },
}
</script>

<style scoped></style>
