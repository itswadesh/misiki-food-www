<template>
  <div class="h-auto text-gray-800">
    <div v-if="!email" class="relative h-full">
      <form
        v-if="!email"
        novalidate
        autocomplete="off"
        class="flex flex-col"
        @submit.stop.prevent="requestOtp"
      >
        <div class="mb-5 flex flex-col space-y-3">
          <span class="text-center">Please enter Mobile Number</span>

          <vue-tel-input
            v-model="phone"
            :default-country="defaultCountry"
            @validate="onPhoneChange"
          ></vue-tel-input>

          <!-- <Textbox
            id="number"
            ref="mobile"
            v-model="phone"
            type="tel"
            maxlength="13"
            autofocus
            placeholder="Enter Phone Number"
            required
            class="w-full max-w-sm mx-auto"
          /> -->
        </div>

        <PrimaryButtonRounded
          class="w-full max-w-sm mx-auto"
          type="submit"
          :loading="loading"
        >
          SEND OTP
        </PrimaryButtonRounded>
      </form>
    </div>

    <div v-else>
      <EnterEmail />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { VueTelInput } from 'vue-tel-input'
import EnterEmail from '~/components/Login/Email/EnterEmail.vue'
import GET_OTP from '~/gql/user/getOtp.gql'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import { Textbox } from '~/shared/components/ui'
import 'vue-tel-input/dist/vue-tel-input.css'

export default {
  components: {
    EnterEmail,
    PrimaryButtonRounded,
    Textbox,
    VueTelInput,
  },

  data() {
    return {
      email: false,
      transition: 'page',
      loading: false,
      phone: null,
      countryCode: '',
      title: 'aboutpage',
      defaultCountry: 'IN',
      validPhoneNumber: false,
      phoneNumber: null,
    }
  },

  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    store() {
      return this.$store.state.store || {}
    },
  },

  created() {
    this.defaultCountry = this.store.country && this.store.country.code
  },

  methods: {
    ...mapMutations({ setErr: 'setErr' }),

    onPhoneChange(e) {
      this.validPhoneNumber = e.valid
      this.phoneNumber = e.number
    },

    async requestOtp() {
      console.log(this.validPhoneNumber)

      if (!this.validPhoneNumber) {
        this.setErr('Invalid phone number or country code')
        return
      }
      try {
        this.loading = true
        await this.$post('user/getOtp', {
          phone: this.phoneNumber,
          role: 'vendor',
        })
        this.$emit('sendOtp', {
          phone: this.phoneNumber,
        })
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style src="vue-tel-input/dist/vue-tel-input.css"></style>
