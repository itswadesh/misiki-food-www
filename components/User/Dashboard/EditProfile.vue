<template>
  <section>
    <form
      v-if="profile"
      novalidate
      autocomplete="off"
      class="
        w-full
        text-gray-800
        bg-white
        rounded-lg
        shadow
        lg:mx-auto lg:container
      "
      @submit.stop.prevent="submit"
    >
      <div class="w-full p-5 font-semibold border-b">Profile Details</div>

      <div class="w-full p-10 space-y-5 text-base font-light">
        <Textbox
          v-model="profile.firstName"
          placeholder="First Name"
          class="w-full"
          required
          autofocus
          :v="$v.profile.firstName"
          :err="
            $v.profile.firstName.$invalid && $v.profile.firstName.$dirty
              ? 'First Name is required'
              : ''
          "
        />

        <Textbox
          v-model="profile.lastName"
          placeholder="Last Name"
          class="w-full"
          required
        />

        <Textbox
          v-model="profile.email"
          placeholder="Email"
          class="w-full"
          required
        />

        <div class="flex flex-row mb-5">
          <div class="me-5">Gender:</div>

          <div class="flex">
            <label class="flex flex-row cursor-pointer me-4">
              <Radio
                id="one"
                v-model="profile.gender"
                value="Male"
                name="group"
                class="my-auto"
              />

              <span class="my-auto text-gray-600 ms-2">Male</span>
            </label>

            <label class="flex flex-row cursor-pointer">
              <Radio
                id="one"
                v-model="profile.gender"
                value="Female"
                name="group"
                class="my-auto"
              />

              <span class="my-auto text-gray-600 ms-2">Female</span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex justify-end px-5 md:px-12 lg:px-20">
        <!--  -->
        <GrnIndGradiantButton
          class="
            w-full
            p-3
            my-6
            md:px-6 md:p-2 md:w-1/3
            sm:w-1/2 sm:mt-10
            bg-secondary-500
            focus:ring-secondary-500
          "
          type="submit"
          :disabled="$v.profile.$anyError && $v.profile.$anyDirty"
          >UPDATE
        </GrnIndGradiantButton>

        <!-- <button
          type="submit"
          :disabled="$v.profile.$anyError && $v.profile.$anyDirty"
          class="md:w-1/3 sm:w-1/2 w-full p-3 my-6 sm:mt-10 hover:-translate-y-0.5 transition transform text-lg text-center text-white uppercase ease-in-out rounded shadow bg-secondary-500 focus:ring focus:ring-offset-2 focus:ring-secondary-500 focus:outline-none md:px-6 md:p-2"
        >
          UPDATE
        </button> -->
      </div>
    </form>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { Textbox, Radio } from '~/shared/components/ui'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
import UPDATE_PROFILE from '~/gql/user/updateProfile.gql'
import ME from '~/gql/user/me.gql'

export default {
  components: { Textbox, Radio, GrnIndGradiantButton },

  mixins: [validationMixin],

  data() {
    return {
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
      },
    }
  },
  validations: {
    profile: {
      firstName: { required },
    },
  },
  async created() {
    await this.getMe()
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async getMe() {
      try {
        this.profile = await this.$get('user/me', {})
        // this.profile = (
        //   await this.$apollo.query({
        //     query: ME,
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.me
      } catch (e) {
        // console.log(e)
      }
    },
    async submit() {
      // console.log("update profile", this.profile)
      const msg = 'Profile Updated'
      delete this.profile.__typename
      delete this.profile.info
      delete this.profile.address
      try {
        const data = await this.$post('user/updateProfile', this.profile)
        // const data = (
        //   await this.$apollo.mutate({
        //     mutation: UPDATE_PROFILE,
        //     variables: this.profile,
        //   })
        // ).data.updateProfile
        this.success(msg)
        const r = this.$route.query.ref || '/'
        this.$router.push(r)
      } catch (e) {
        this.setErr(e)
      }
    },
  },
}
</script>
