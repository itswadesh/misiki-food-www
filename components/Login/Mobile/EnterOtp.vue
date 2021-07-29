<template>
  <div
    class="
      flex flex-col
      items-center
      justify-center
      font-semibold
      tracking-wider
      text-center
    "
  >
    <form @submit.prevent="VerifyTheOtp()">
      <div class="container flex flex-col mx-auto space-y-3">
        <div class="text-center">
          <span class="text-xl font-medium text-primary-500"
            >OTP Verification</span
          >
        </div>
        <label for="email" class="my-2 text-center otptext lg:my-0">
          Enter The OTP sent to
          <span class="text-xs font-bold"> {{ countryCode }}-{{ phone }} </span>
          <button
            type="button"
            class="text-xs text-primary-500 ms-1"
            @click="$emit('reRequest')"
          >
            Change
          </button>
        </label>
        <div class="flex justify-center">
          <otp-input
            ref="otpInput"
            input-classes="mw-2 w-12 mx-2 border-none rounded shadow-md appearance-none none ring-1 ring-gray-100 focus:ring-1 focus:ring-primary-500 text-center rounded border-0 shadow-lg"
            :num-inputs="4"
            separator=" "
            :should-auto-focus="true"
            @on-complete="VerifyTheOtp"
          />
        </div>
      </div>

      <!-- <div
      class="flex flex-row items-center justify-center text-xs text-orange-500"
    >
    Please wait for 00:{{ timerCount }} seconds
    </div> -->

      <div class="mt-6 text-center">
        <h1 class="text-xs text-gray-700 otptext">
          Didn't receive the OTP?
          <div v-if="timerCount != 0">
            Please wait for 00:{{ timerCount }} seconds before next request
          </div>
          <button
            v-else
            type="button"
            class="
              text-sm
              font-semibold
              uppercase
              focus:outline-none
              text-primary-500
            "
            @click="requestOtp"
          >
            Resend otp
          </button>
        </h1>
      </div>
      <div class="w-full mt-6 lg:mt-5">
        <Button
          class="
            flex
            justify-center
            w-4/5
            px-4
            py-2
            mx-auto
            text-lg
            font-semibold
            transition-colors
            duration-300
            rounded-md
            shadow
            focus:outline-none focus:ring-primary-500 focus:ring-2
          "
          :class="
            loading ? 'text-white bg-gray-500' : 'bg-primary-500 text-white'
          "
          type="submit"
          :disabled="loading"
        >
          <span
            v-if="!loading"
            class="text-base font-light tracking-widest uppercase"
          >
            verify
          </span>
          <span v-else>
            <svg
              class="w-6 h-6 text-white -ms-1 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        </Button>

        <!-- <nuxt-link to="/"
          class="flex justify-center w-full px-4 py-2 mt-3 text-lg font-semibold transition-colors duration-300 bg-white border-none rounded-md shadow ring-1 ring-primary-500 text-primary-500 focus:outline-none focus:ring-primary-500 focus:ring-2"
        >
          <span class="font-normal uppercase text-normal">
            Back
          </span>
        </nuxt-link> -->
      </div>
    </form>
  </div>
</template>

<script>
import OtpInput from '@bachdgvn/vue-otp-input'
import { mapActions, mapMutations } from 'vuex'
import GET_OTP from '~/gql/user/getOtp.gql'
import { Button } from '~/shared/components/ui'

export default {
  components: { OtpInput, Button },
  props: {
    countryCode: {
      type: String,
      default: '+91',
    },
    phone: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      timerCount: 3,
      otp: null,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    user() {
      return this.$store.state.auth.user
    },
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
          }, 1000)
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  mounted() {
    $nuxt.$on('getPhoneNo', (val) => {
      this.phone = val
    })
  },
  methods: {
    ...mapActions({ verifyOtp: 'auth/verifyOtp' }),
    ...mapMutations({ setErr: 'setErr', success: 'success' }),
    async requestOtp() {
      try {
        this.loading = true
        const result = await this.$post('user/getOtp', {
          phone: this.countryCode + this.phone,
        })
        // const result = (
        //   await this.$apollo.mutate({
        //     mutation: GET_OTP,
        //     variables: { phone: this.countryCode + this.phone },
        //   })
        // ).data
        this.timerCount = result.getOtp.timer
        this.timerCount = result.timer
        this.success('OTP Send Successfully')
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },
    async VerifyTheOtp(val) {
      if (val) this.otp = val
      try {
        this.loading = true
        const user = await this.verifyOtp({
          otp: this.otp,
          phone: this.countryCode + this.phone,
        })
        this.$emit('success')
        let r = this.$route.query.ref || '/'
        if (!user.firstName) {
          r = `/my/profile?ref=${r}`
        }
        this.$router.push(r)
        this.success('OTP Verified Successfully')
        this.$gtag.event('login', { method: 'Google' })
      } catch (e) {
        // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', e)
        // this.setErr(e.toString())
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.error {
  border: 1px solid red !important;
}
</style>
