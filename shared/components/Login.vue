<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-200"
  >
    <div class="w-full px-4 lg:w-1/3">
      <div class="bg-white rounded shadow">
        <div class="text-white text-secondary">
          <h1 class="p-3 mb-2 text-xl text-center">
            <span v-if="!signup" class="font-extrabold">SIGN IN</span>
            <span v-else class="font-extrabold">SIGN UP</span> TO YOUR ACCOUNT
          </h1>
        </div>
        <form
          novalidate
          autocomplete="off"
          class="center"
          @submit.stop.prevent="submit()"
        >
          <div class="p-6">
            <div>
              <Textbox
                v-model="uid"
                autocomplete="disabled"
                type="tel"
                label="Phone"
                class="bg-gray-200"
                @keyup.native="onPhoneChange"
              />
            </div>
            <div v-if="showOTP">
              <Textbox
                v-if="signup"
                v-model="firstName"
                autocomplete="disabled"
                label="Fisrt Name"
                class="w-full bg-gray-200"
              />
              <Textbox
                v-if="signup"
                v-model="lastName"
                autocomplete="disabled"
                label="Last Name"
                class="w-full bg-gray-200"
              />
              <!-- <span class="mb-5 text-xs font-hairline text-secondary-500">Please enter password</span>-->
              <!-- Show password box -->
              <div v-if="!isPhone">
                <Textbox
                  ref="password"
                  v-model="password"
                  autocomplete="disabled"
                  name="password"
                  label="Password"
                  type="password"
                  class="w-full bg-gray-200"
                />
              </div>
              <!-- Show OTP box -->
              <div v-else class="text-center">
                <span class="mb-5 text-xs font-hairline text-primary-500">
                  Please enter OTP sent to mobile number
                </span>
                <div
                  class="
                    relative
                    inline-block
                    w-32
                    p-2
                    mb-4
                    bg-gray-200
                    rounded
                    otp-container
                  "
                >
                  <div
                    id="wraper1"
                    class="absolute w-1 h-1 rounded otp-seperator"
                    :class="{ 'wraper-hide': otp.length > 0 }"
                  ></div>
                  <div
                    id="wraper2"
                    class="absolute w-1 h-1 rounded otp-seperator"
                    :class="{ 'wraper-hide': otp.length > 1 }"
                  ></div>
                  <div
                    id="wraper3"
                    class="absolute w-1 h-1 rounded otp-seperator"
                    :class="{ 'wraper-hide': otp.length > 2 }"
                  ></div>
                  <div
                    id="wraper4"
                    class="absolute w-1 h-1 rounded otp-seperator"
                    :class="{ 'wraper-hide': otp.length > 3 }"
                  ></div>
                  <input
                    ref="otp"
                    v-model="otp"
                    type="tel"
                    name="otp"
                    class="
                      w-32
                      ps-4
                      bg-transparent
                      border border-gray-400
                      outline-none
                      otp-content
                    "
                    maxlength="4"
                    autocomplete="off"
                    @keyup="onOTPEnter(otp.length, $event)"
                  />
                </div>
              </div>
            </div>
            <!-- <Error /> -->
            <div class="flex-col items-center justify-between mt-6">
              <Submit>{{ submitText }}</Submit>
              <!-- <span class="mt-2 text-xs">
                    <nuxt-link :to=" v-if="p.vendor"('/account/forgot-password')">Forgot Password?</nuxt-link>
             </span>-->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { Textbox, Submit } from '~/shared/components/ui'
// import { Error } from '~/shared/components'
import SIGN_IN from '~/gql/user/signIn.gql'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { Textbox, Submit, NuxtLink },
  middleware: ['isGuest'],
  data() {
    return {
      loading: false,
      fadeIn: '',
      disable: 'disable',
      p: {},
      msg: null,
      signup: false,
      uid: '',
      password: '',
      firstName: '',
      lastName: '',
      otp: '',
      showOTP: false,
    }
  },
  computed: {
    isEmail() {
      if (this.uid.includes('@')) return true
      else return false
    },
    isPhone() {
      const phoneno = /^[+()\d-]+$/
      if (this.uid.length >= 10 && this.uid.match(phoneno)) return true
      else return false
    },
    submitText() {
      if (this.signup) {
        return 'Signup New Account'
      } else if (!this.isPhone && !this.isEmail && !this.showOTP) {
        return 'Verify'
      } else if (this.isPhone && !this.showOTP) {
        return 'Verify Phone' // Login Now
      } else if (this.isEmail && !this.showOTP) {
        return 'Verify Email' // Login Now
      } else if (this.isPhone && this.showOTP) {
        return 'Verify OTP'
      } else {
        return 'Login Now'
      }
    },
  },
  mounted() {
    const isAuthenticated = !!this.$apolloHelpers.getToken()
    if (isAuthenticated) this.$router.push(`/my`)
  },
  async created() {
    // let geoCookie = await this.$cookies.get("geo");
    // let geo = await this.locateMe(geoCookie.coords);
    // console.log(geo);
  },
  methods: {
    ...mapActions({
      updateProfile: 'auth/updateProfile',
      getOtp: 'auth/getOtp',
      verifyOtp: 'auth/verifyOtp',
      signup: 'auth/signup',
      login: 'auth/login',
    }),
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async submit() {
      if (!this.uid || this.uid === '') {
        this.setErr('Please enter your phone no')
        return
      }
      if (!this.isPhone && !this.isEmail) {
        this.setErr('Entered email is not valid')
        return
      }
      if (this.isPhone) {
        await this.phoneLogin()
      } else {
        await this.emailLogin()
      }
    },
    async phoneLogin() {
      const phone = this.uid
      const otp = this.otp
      if (!this.showOTP) {
        // When clicked 1st time
        try {
          await this.getOtp({ phone })
          this.showOTP = true
          this.$nextTick(() => this.$refs.otp.focus())
          this.msg = 'Please enter OTP sent to your Mobile'
        } catch (e) {}
      } else {
        try {
          const user = await this.verifyOtp({
            phone,
            otp,
          })
          if (user.role === 'user' && this.$route.query.role === 'chef') {
            user.role = 'chef'
            await this.updateProfile(user)
            const vm = this
            vm.$swal({
              title: 'Successfully registed as chef',
              text: 'We will contact you within 24hrs for document verification',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'OK!',
            }).then((result) => {
              if (result.value) {
                const redirect = this.$route.hash.substr(1) || '/my'
                vm.$router.push(redirect)
              }
            })
          } else {
            const redirect = this.$route.hash.substr(1) || '/my'
            this.$router.push(`${redirect}`)
          }
        } catch (e) {
          this.setErr(e)
        }
      }
    },
    async emailLogin() {
      if (!this.showOTP) {
        // When clicked 1st time
        try {
          await this.$post('user/signIn', {
            email: this.uid,
            password: this.password,
          })
          // this.$apollo.mutate({
          //   mutation: SIGN_IN,
          //   variables: { email: this.uid, password: this.password },
          //   fetchPolicy: 'no-cache',
          // })
          this.showOTP = true
          this.msg = 'Please enter your password'
          // this.$refs.otp.focus();
          return
        } catch (e) {
          if (e.response && e.response.status === '400') {
            this.signup = true
            this.showOTP = true
            // console.log('err...', e.response.status)
          } else {
            // console.log('err...', e.toString())
          }
        } finally {
          this.showOTP = true
        }
      } else {
        try {
          if (this.signup) {
            await this.signup({
              email: this.uid,
              firstName: this.firstName,
              lastName: this.lastName,
              password: this.password,
              route: this.$route.query.return,
            })
          } else {
            await this.login({
              uid: this.uid,
              password: this.password,
              route: this.$route.query.return,
            })
          }
          this.showOTP = true
          // this.$refs.password.focus();
        } catch (e) {
          this.showOTP = false
          this.msg = this.err = e.response && e.response.data
          this.setErr(this.err)
          // this.$refs.uid.focus();
        } finally {
          this.showOTP = true
        }
      }
    },
    onOTPEnter(index, event) {
      // const eventCode = event.which || event.keyCode
      if (index === 4) {
        this.submit() // Submit code
      }
    },
    onPhoneChange(e) {
      if (e.keyCode !== 13) {
        this.showOTP = false
        this.p = {}
      }
    },
  },
}
</script>

<style scoped>
.border-t {
  border-bottom: 1px solid lightgray;
}
.container {
  max-height: 80vh !important;
  min-height: 80vh !important;
}
.wraper-hide {
  visibility: hidden;
}
.border-t {
  border-bottom: 1px solid lightgray;
}
.big-button {
  background: linear-gradient(87deg, #fb6340, #da1c5f) !important;
  border-color: #fb6340;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.otp-container .otp-seperator {
  background-color: #dfe1e6;
  border: 1px solid #dfe1e6;
}
.otp-container #wraper1 {
  top: 20px;
  left: 28px;
}
.otp-container #wraper2 {
  top: 20px;
  left: 51px;
}
.otp-container #wraper3 {
  top: 20px;
  left: 76px;
}
.otp-container #wraper4 {
  top: 20px;
  left: 100px;
}
.otp-container .otp-content {
  letter-spacing: 15px;
  border: 1px solid transparent;
}
input + label {
  position: relative;
  z-index: 999;
}
</style>
