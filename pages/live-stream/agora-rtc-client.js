import EventEmitter from 'events'
export default class RTCClient {
  constructor() {
    // Options for joining a channel
    this.option = {
      appId: '',
      channel: '',
      uid: '',
      token: '',
    }
    this.client = null
    this.localStream = null
    this._eventBus = new EventEmitter()
  }

  // init client and Join a channel
  joinChannel(option) {
    if (process.client) {
      const AgoraRTC = require('agora-rtc-sdk')
    }
    return new Promise((resolve, reject) => {
      this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
      // init Agora SDK
      this.client.init(
        option.appid,
        () => {
          // console.log('init success')
          this.clientListener()
          this.client.join(
            option.token ? option.token : null,
            option.channel,
            null,
            (uid) => {
              // console.log(
              //   'join channel: ' + this.option.channel + ' success, uid: ',
              //   uid
              // )
              this.option = {
                appid: option.appid,
                token: option.token,
                channel: option.channel,
                uid,
              }
              resolve()
            },
            (err) => {
              console.error('client join failed', err)
            }
          )
        },
        (err) => {
          reject(err)
          console.error(err)
        }
      )
      // console.log('[agora-vue] appId', option.appid)
    })
  }

  // PUBLISH STREAM IS USED FOR ON LOCAL CAMERA AND ,MAKE IT PUBLISH
  publishStream() {
    const AgoraRTC = require('agora-rtc-sdk')
    return new Promise((resolve, reject) => {
      // Create a local stream
      this.localStream = AgoraRTC.createStream({
        streamID: this.option.uid,
        audio: true,
        video: true,
        screen: false,
      })
      // Initialize the local stream
      this.localStream.init(
        () => {
          // console.log('init local stream success')
          resolve(this.localStream)
          // Publish the local stream
          this.client.publish(this.localStream, (err) => {
            // console.log('publish failed')
            console.error(err)
          })
        },
        (err) => {
          reject(err)
          console.error('init local stream failed ', err)
        }
      )
    })
  }

  clientListener() {
    const client = this.client

    client.on('stream-added', (evt) => {
      // The stream is added to the channel but not locally subscribed
      this._eventBus.emit('stream-added', evt)
    })
    client.on('stream-subscribed', (evt) => {
      this._eventBus.emit('stream-subscribed', evt)
    })
    client.on('stream-removed', (evt) => {
      this._eventBus.emit('stream-removed', evt)
    })
    client.on('peer-online', (evt) => {
      this._eventBus.emit('peer-online', evt)
    })
    client.on('peer-leave', (evt) => {
      this._eventBus.emit('peer-leave', evt)
    })
  }

  on(eventName, callback) {
    this._eventBus.on(eventName, callback)
  }

  leaveChannel() {
    return new Promise((resolve, reject) => {
      // Leave the channel
      this.client.unpublish(this.localStream, (err) => {
        // console.log(err)
      })
      this.client.leave(
        () => {
          // Stop playing the local stream
          if (this.localStream.isPlaying()) {
            this.localStream.stop()
          }
          // Close the local stream
          this.localStream.close()
          this.client = null
          resolve()
          // console.log('client leaves channel success')
        },
        (err) => {
          reject(err)
          // console.log('channel leave failed')
          console.error(err)
        }
      )
    })
  }

  joinChannelAsHost(option) {
    const AgoraRTC = require('agora-rtc-sdk')
    return new Promise((resolve, reject) => {
      this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
      // init Agora SDK
      this.client.init(
        option.appid,
        () => {
          // console.log('init success')
          // set the role
          this.client.setClientRole(
            'host',
            function () {
              // console.log('Client role set as host.')
            },
            function (e) {
              // console.log('setClientRole failed', e)
            }
          )
          this.clientListener()
          this.client.join(
            option.token ? option.token : null,
            option.channel,
            null,
            (uid) => {
              // console.log(
              //   'join channel: ' + this.option.channel + ' success, uid: ',
              //   uid
              // )
              this.option = {
                appid: option.appid,
                token: option.token,
                channel: option.channel,
                uid,
              }
              resolve()
            },
            (err) => {
              console.error('client join failed', err)
            }
          )
        },
        (err) => {
          reject(err)
          console.error(err)
        }
      )
      // console.log('[agora-vue] appId', option.appid)
    })
  }

  joinChannelAsAudience(option) {
    return new Promise((resolve, reject) => {
      if (process.client) {
        const AgoraRTC = require('agora-rtc-sdk')
        this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
        // init Agora SDK
        this.client.init(
          option.appid,
          () => {
            // console.log('init success')
            // set the role
            this.client.setClientRole(
              'audience',
              function () {
                // console.log('Client role set as host.')
              },
              function (e) {
                // console.log('setClientRole failed', e)
              }
            )
            this.clientListener()
            this.client.join(
              option.token ? option.token : null,
              option.channel,
              null,
              (uid) => {
                // console.log(
                //   'join channel: ' + this.option.channel + ' success, uid: ',
                //   uid
                // )
                this.option = {
                  appid: option.appid,
                  token: option.token,
                  channel: option.channel,
                  uid,
                }
                resolve()
              },
              (err) => {
                console.error('client join failed', err)
              }
            )
          },
          (err) => {
            reject(err)
            console.error(err)
          }
        )
        // console.log('[agora-vue] appId', option.appid)
      }
    })
  }
}
