<template>
  <div class="max-w-full">
    <div class="w-full min-h-screen">
      <Nav class="hidden md:flex" />
      <div class="container mx-2">
        <h1 class="my-4 text-3xl font-bold text-center text-secondary-500">
          Live Streams
        </h1>
        <div class="grid mb-8 lg:grid-cols-3 xl:grid-cols-5">
          <div
            v-for="(remoteStream, index) in remoteStreams"
            :key="index"
            class="px-2 py-2 bg-white rounded shadow"
          >
            <h3 class="mb-2 text-gray-600">{{ remoteStream.getId() }}</h3>
            <StreamPlayer
              class="w-full"
              :stream="remoteStream"
              :dom-id="remoteStream.getId()"
            ></StreamPlayer>
          </div>
        </div>
        <div v-if="myChannels && myChannels.length > 0" class="">
          <div class="mb-2 text-2xl font-bold text-primary-500">
            <div>Scheduled</div>
          </div>
          <div class="grid gap-4 lg:grid-cols-3 xl:grid-cols-5">
            <div
              v-for="item in myChannels"
              :key="item.title"
              class="px-4 py-2 bg-white rounded shadow"
            >
              <div>
                <div class="text-gray-800" v-text="item.title"></div>
              </div>
              <div>
                <div class="text-xs text-gray-300">
                  {{ item.scheduleDateTime | date }}
                </div>
              </div>
              <div>
                <img v-lazy="item.imageUrl" alt="" />
              </div>
            </div>
          </div>
        </div>
        <button
          class="px-4 py-2 text-white bg-green-500 border"
          type="button"
          :disabled="disableJoin"
          @click="joinEvent"
        >
          join
        </button>
        <button
          class="px-4 py-2 text-white bg-red-500"
          :disabled="!disableJoin"
          @click="leaveEvent"
        >
          leave
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import RTCClient from './agora-rtc-client'
import { log } from './config'
import Nav from '~/components/Home/Nav.vue'

import StreamPlayer from '~/components/Video/stream-player.vue'
import MY_CHANNELS from '~/gql/channel/myChannels.gql'
import RTC_TOKEN from '~/gql/channel/rtcToken.gql'

export default {
  components: {
    StreamPlayer,
    Nav,
  },
  props: {
    msg: { type: String, default: null },
  },
  asyncData({ env }) {
    const { AGORA_APP_ID, AGORA_LOG, AGORA_CHANNEL_NAME } = env
    return {
      AGORA_APP_ID,
      AGORA_LOG,
      AGORA_CHANNEL_NAME,
    }
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
      myChannels: [],
    }
  },
  head() {
    return {
      title: 'Live Stream',
    }
  },
  async created() {
    await this.getData()
    this.rtc = new RTCClient()
    const rtc = this.rtc

    rtc.on('stream-added', (evt) => {
      const { stream } = evt
      log('[agora] [stream-added] stream-added', stream.getId())
      rtc.client.subscribe(stream)
    })

    rtc.on('stream-subscribed', (evt) => {
      const { stream } = evt
      log('[agora] [stream-subscribed] stream-added', stream.getId())
      if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
        this.remoteStreams.push(stream)
      }
    })

    rtc.on('stream-removed', (evt) => {
      const { stream } = evt
      log('[agora] [stream-removed] stream-removed', stream.getId())
      this.remoteStreams = this.remoteStreams.filter(
        (it) => it.getId() !== stream.getId()
      )
    })

    rtc.on('peer-online', (evt) => {
      this.success(`Peer ${evt.uid} is online`)
    })

    rtc.on('peer-leave', (evt) => {
      this.success(`Peer ${evt.uid} already leave`)
      this.remoteStreams = this.remoteStreams.filter(
        (it) => it.getId() !== evt.uid
      )
    })
    // console.log('basic call first page loaded', rtc)
  },
  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success', busy: 'busy' }),
    async joinEvent() {
      this.option.appid = this.AGORA_APP_ID
      const channel = (this.option.channel = this.AGORA_CHANNEL_NAME)
      try {
        this.busy(true)
        const rtcTokenObject = await this.$get('channel/rtcToken', {
          isPublisher: true,
          channel,
        })
        // const rtcTokenObject = (
        //   await this.$apollo.query({
        //     query: RTC_TOKEN,
        //     variables: { isPublisher: true, channel },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.rtcToken
        this.option.token = rtcTokenObject.token
        this.option.uid = rtcTokenObject.uid
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
      // console.log('this option data is:', this.option)
      // if (this.option.role == 'host') {
      this.rtc
        .joinChannelAsHost(this.option)
        .then(() => {
          this.success('Join Success')
          this.rtc
            .publishStream()
            .then((stream) => {
              this.success('Publish Success')
              this.localStream = stream
            })
            .catch((err) => {
              // console.log('the error is', err)
              this.setErr('Publish Failure')
              log('publish local error', err)
            })
        })
        .catch((err) => {
          // console.log('the error is', err)
          log('join channel error', err)
        })
      // } else {
      //   this.rtc
      //     .joinChannelAsAudience(this.option)
      //     .then(() => {
      //       this.success('Join Success')
      //     })
      //     .catch((err) => {
      //       console.log('the error is', err)
      //       log('join channel error', err)
      //     })
      // }
      this.disableJoin = true
    },

    leaveEvent() {
      this.disableJoin = false
      this.rtc
        .leaveChannel()
        .then(() => {
          this.success('Leave Success')
        })
        .catch((err) => {
          // console.log('the error is', err)
          this.success('Leave Failure')
          log('leave error', err)
        })
      this.localStream = null
      this.remoteStreams = []
    },

    judge(detail) {
      this.setErr(`Please enter the ${detail}`)
    },

    async getData() {
      const myChannels = await this.$get('channel/myChannels', {})
      // const myChannels = (
      //   await this.$apollo.query({
      //     query: MY_CHANNELS,
      //     fetchPolicy: 'no-cache',
      //   })
      // ).data.myChannels
      // console.log('my schduled live stream is', myChannels)
      this.myChannels = myChannels
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agora-title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
}
.agora-view {
  display: flex;
  flex-wrap: wrap;
}
.agora-video {
  width: 320px;
  height: 240px;
  margin: 20px;
}
.agora-input {
  margin: 20px;
  width: 320px;
}
.agora-text {
  margin: 5px;
  font-size: 16px;
  font-weight: bold;
}
.agora-button {
  display: flex;
  width: 160px;
  justify-content: space-between;
  margin: 20px;
}
</style>
