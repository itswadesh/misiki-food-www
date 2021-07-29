<template>
  <div>
    <div class="pt-10 text-3xl font-bold text-center text-green-500">
      Watch Live Stream
    </div>
    <div v-if="live">
      <div
        v-for="p in live.products"
        :key="p.id"
        class="
          relative
          m-1
          bg-white
          border-2 border-gray-300
          h-36
          group
          w-36
          hover:border-blue-500
        "
      >
        <img v-lazy="p.img" alt="" class="w-32 h-32 mx-auto" />
        <div class="absolute bottom-0 w-full">
          <p class="m-1 text-xs text-center">
            {{ p.name }}
          </p>
        </div>
        <div
          class="
            absolute
            inset-0
            z-10
            hidden
            bg-gray-900
            cursor-default
            transitionstyle
            margin
            group-hover:block
            bg-opacity-60
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="
              w-6
              h-6
              m-1
              ms-auto
              text-gray-100
              transform
              cursor-pointer
              hover:scale-105
            "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <!-- <p class="mt-8 text-sm font-semibold text-center text-gray-100">
            Click to add
          </p> -->
          <!-- <nuxt-link to="/live">
            <p
              class="
                mt-8
                text-sm
                font-semibold
                text-center text-gray-100
                transform
                cursor-pointer
                hover:scale-105
              "
            >
              View
            </p>
          </nuxt-link> -->
        </div>
      </div>
    </div>
    <div class="bg-red-100">
      <video
        v-for="vd in useLocalStreamList"
        :key="vd.id"
        autoplay
        muted
        :srcObject.prop="vd.stream"
        width="500"
        height="500"
      />;
    </div>
  </div>
</template>

<script>
import ZEGO from '~/gql/channel/zego.gql'
import CHANNEL from '~/gql/channel/channel.gql'

export default {
  data() {
    return {
      streamList: [],
      useLocalStreamList: [],
      zg: null,
      loginRoom: false,
      live: null,
    }
  },
  async mounted() {
    this.zego = (await this.$get('channel/zego', {})) || {}
    this.live =
      (await this.$get('channel/channel', { id: this.$route.params.id })) || {}
    // this.zego =
    //   (
    //     await this.$apollo.query({
    //       query: ZEGO,
    //       fetchPolicy: 'no-cache',
    //     })
    //   ).data.zego || {}

    // this.live =
    //   (
    //     await this.$apollo.query({
    //       query: CHANNEL,
    //       variables: { id: this.$route.params.id },
    //       fetchPolicy: 'no-cache',
    //     })
    //   ).data.channel || {}
    const ZegoExpressEngine =
      require('zego-express-engine-webrtc').ZegoExpressEngine
    const zg = (this.zg = new ZegoExpressEngine(
      this.zego.appID,
      this.zego.server
    ))
    zg.setLogConfig({
      logLevel: 'error',
      remoteLogLevel: 'info',
      logURL: '',
    })

    zg.setDebugVerbose(false)
    zg.setSoundLevelDelegate(true, 3000)

    let loginSuc = false
    try {
      loginSuc = await this.enterRoom(this.zego.roomID, this.zego.tokenView)
      // loginSuc && (await this.publish());
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async login(roomId, token) {
      //   const user =
      //     (
      //       await this.$apollo.query({
      //         query: ME,
      //         fetchPolicy: 'no-cache',
      //       })
      //     ).data.me || {}
      const userID = '2lessons@gmail.com'
      const userName = 'itswadesh'
      // const userID = this.zego.userID //'2lessons@gmail.com'
      // const userName = this.zego.userName // 'itswadesh'
      return await this.zg.loginRoom(
        roomId,
        token,
        { userID, userName },
        { userUpdate: true }
      )
      // this.zego.token,
      // { userID: this.zego.userID, userName: this.zego.userName },
    },

    async enterRoom(roomId, token) {
      const zg = this.zg
      if (!roomId) {
        alert('roomId is empty')
        return false
      }
      for (let i = 0; i < this.streamList.length; i++) {
        this.streamList[i].streamID &&
          zg.stopPlayingStream(this.streamList[i].streamID)
      }

      this.listenForEvents()
      return (this.loginRoom = await this.login(roomId, token))
    },
    listenForEvents() {
      const zg = this.zg
      zg.on(
        'roomStreamUpdate',
        (roomID, updateType, streamList, extendedData) => {
          console.error(
            'roomStreamUpdate 1 roomID ',
            roomID,
            streamList,
            extendedData
          )
          if (updateType === 'ADD') {
            for (let i = 0; i < streamList.length; i++) {
              console.info(streamList[i].streamID + ' was added')
              let remoteStream
              let playOption
              zg.startPlayingStream(streamList[i].streamID, playOption)
                .then((stream) => {
                  remoteStream = stream
                  this.useLocalStreamList.push({ stream: remoteStream })
                })
                .catch((err) => {
                  console.error('err', err)
                })
            }
          } else if (updateType === 'DELETE') {
            for (let k = 0; k < this.useLocalStreamList.length; k++) {
              for (let j = 0; j < streamList.length; j++) {
                if (
                  this.useLocalStreamList[k].streamID === streamList[j].streamID
                ) {
                  try {
                    zg.stopPlayingStream(this.useLocalStreamList[k].streamID)
                  } catch (error) {
                    console.error(error)
                  }

                  console.info(
                    this.useLocalStreamList[k].streamID + 'was devared'
                  )

                  // $(".remoteVideo video:eq(" + k + ")").remove();
                  this.useLocalStreamList.splice(k--, 1)
                  break
                }
              }
            }
          }
        }
      )
    },
  },
}
</script>

<style></style>
