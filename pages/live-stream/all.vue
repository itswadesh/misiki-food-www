<template>
  <div>
    <div>
      <div class="mx-auto text-center">
        <div dark>
          <h3 class="text-3xl font-bold">Current Live vendors</h3>
        </div>

        <div v-if="!liveChannels">No live vendor Now</div>
        <div v-else>
          <div v-for="item in liveChannels" :key="item.title">
            <div>{{ item.user.firstName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import StreamPlayer from '~/components/Video/stream-player'
import CHANNEL_LIST from '~/gql/channel/channelList.gql'

export default {
  components: {
    // StreamPlayer,
  },
  data() {
    return {
      option: {
        appid: '',
        token: '',
        uid: 0,
        channel: 'litekart',
        role: 'host',
      },
      disableJoin: false,
      localStream: null,
      remoteStreams: [],
      userType: [
        { text: 'Host', value: 'host' },
        { text: 'Audience', value: 'audience' },
      ],
      liveChannels: null,
    }
  },
  head() {
    return {
      title: 'Live Stream',
    }
  },
  async created() {
    await this.liveVendors()
  },
  methods: {
    async liveVendors() {
      const liveChannels = await this.$get('channel/channelList', {})
      // const liveChannels = (
      //   await this.$apollo.query({
      //     query: CHANNEL_LIST,
      //     fetchPolicy: 'no-cache',
      //   })
      // ).data.channelList
      this.liveChannels = liveChannels
    },
  },
}
</script>
