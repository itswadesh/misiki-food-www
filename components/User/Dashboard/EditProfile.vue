<template>
  <section class="w-full text-gray-800">
    <!-- Edit profile start -->

    <form
      v-if="profile"
      novalidate
      autocomplete="off"
      class="mb-5 sm:mb-10"
      @submit.stop.prevent="submit"
    >
      <!-- Profile name and credentials start  -->

      <div class="mb-5 sm:mb-10 text-gray-800 bg-gray-200 rounded-sm">
        <h2
          class="
            p-4
            text-lg
            font-semibold
            tracking-wider
            border-b border-gray-50
          "
        >
          Profile name and credentials
        </h2>

        <div class="py-4">
          <div class="items-center p-2 sm:px-4 sm:flex">
            <div class="w-full text-sm sm:w-4/12 md:w-3/12">First Name</div>

            <div class="w-full sm:w-8/12 md:w-9/12">
              <div class="max-w-sm mt-2 sm:mt-0">
                <Textbox
                  v-model="profile.firstName"
                  type="text"
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
              </div>
            </div>
          </div>

          <div class="items-center p-2 sm:px-4 sm:flex">
            <div class="w-full text-sm sm:w-4/12 md:w-3/12">Last Name</div>

            <div class="w-full sm:w-8/12 md:w-9/12">
              <div class="max-w-sm mt-2 sm:mt-0">
                <Textbox
                  v-model="profile.lastName"
                  type="text"
                  placeholder="Last Name"
                  class="w-full"
                  required
                />
              </div>
            </div>
          </div>

          <!-- <div class="p-2 md:flex lg:items-center">
            <div class="w-full md:px-2 md:w-3/12">Community username</div>

            <div class="items-center w-full lg:flex md:w-9/12">
              <div class="max-w-sm mt-2 md:w-96 md:mt-0">
                <Textbox v-model="profile.username" @change="save(profile)" />
              </div>

              <h6 class="my-2 text-xs text-gray-600 lg:ms-5">
                Username for community forums
              </h6>
            </div>
          </div> -->

          <div class="items-center p-2 sm:px-4 sm:flex">
            <div class="w-full text-sm sm:w-4/12 md:w-3/12">Your Email</div>

            <div class="w-full sm:w-8/12 md:w-9/12">
              <div class="max-w-sm mt-2 sm:mt-0">
                <Textbox
                  v-model="profile.email"
                  type="email"
                  placeholder="Email"
                  class="w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div class="items-center p-2 sm:px-4 sm:flex">
            <div class="w-full text-sm sm:w-4/12 md:w-3/12">Your Phone</div>

            <div class="w-full sm:w-8/12 md:w-9/12">
              <div class="max-w-sm mt-2 sm:mt-0">
                <Textbox
                  v-model="profile.phone"
                  type="tel"
                  placeholder="Mobile number"
                  class="w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div class="items-center p-2 sm:px-4 sm:flex">
            <div class="w-full text-sm sm:w-4/12 md:w-3/12">Gender</div>

            <div class="w-full sm:w-8/12 md:w-9/12">
              <div class="flex mt-2 md:mt-0">
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

          <div class="p-2 sm:px-4 sm:flex">
            <div class="w-full text-sm sm:w-4/12 md:w-3/12">
              Your Profile Picture
            </div>

            <div class="w-full sm:w-8/12 md:w-9/12">
              <div class="max-w-sm mt-2 sm:mt-0">
                <ImageUpload
                  name="avatar"
                  folder="user"
                  :image="profile.avatar"
                  @save="saveImage"
                  @remove="saveImage(profile.avatar, '')"
                />
              </div>
            </div>
          </div>

          <div class="items-center p-2 sm:px-4 sm:flex">
            <div class="w-full text-sm sm:w-4/12 md:w-3/12"></div>

            <div class="w-full sm:w-8/12 md:w-9/12">
              <div class="max-w-sm mt-2 sm:mt-0">
                <PrimaryButtonRounded
                  type="submit"
                  class="w-full text-sm sm:text-base"
                  :disabled="$v.profile.$anyError && $v.profile.$anyDirty"
                >
                  Submit
                </PrimaryButtonRounded>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile name and credentials end  -->
    </form>

    <!-- Edit profile end -->

    <!-- Close account start  -->

    <div class="mb-5 text-gray-800 bg-gray-200 rounded-sm">
      <h2
        class="p-4 text-lg font-semibold tracking-wider border-b border-gray-50"
      >
        Close Account
      </h2>

      <div class="p-4">
        <h6 class="text-xs text-gray-600">
          account will be closed permanently.
          {{ settings.websiteName }} store will be shut down.
        </h6>
        <button
          type="button"
          class="
            px-4
            py-2
            my-5
            text-sm
            font-semibold
            transition
            duration-300
            bg-white
            border-2 border-gray-400
            rounded-md
            shadow-md
            hover:border-red-500
            focus:outline-none focus:ring-0 focus:ring-offset-0
            hover:text-white hover:bg-red-500
          "
          @click="openDeleteAccountModal = true"
        >
          Close my acount
        </button>
      </div>
    </div>

    <!-- Close account end -->

    <Modal
      :is-visible="openDeleteAccountModal"
      @cancel="openDeleteAccountModal = false"
      @confirm="openDeleteAccountModal = false"
    >
      <template #title>
        <p>Close Account ?</p>
      </template>

      <div class="width">
        <label>
          <h6 class="mb-1 text-sm">
            What is the main reason you're deleting the account ?
          </h6>

          <select
            class="
              mb-5
              w-full
              p-2
              text-sm
              font-light
              placeholder-gray-400
              rounded-md
              bg-gray-50
              border border-gray-300
              hover:bg-white
              transition
              duration-300
              focus:outline-none
            "
          >
            <option :value="null">Select an option</option>
            <option>I was testing the website.</option>
            <option>Website is very slow.</option>
            <option>Don't know how to use.</option>
            <option>Don't want to add profile details.</option>
          </select>
        </label>

        <h6 class="mb-1 text-sm">Please tell us more</h6>

        <Textarea class="mb-5 w-full" />

        <h6 class="mb-1 text-sm">Enter password to conform</h6>

        <Textbox class="w-full" />
      </div>

      <template #confirm-button>
        <button
          type="button"
          class="
            px-4
            py-2
            text-sm
            font-semibold
            rounded-md
            shadow-md
            text-white
            bg-red-500 bg-opacity-70
            hover:bg-opacity-100
            transition
            duration-300
            focus:outline-none
          "
        >
          Close acount
        </button>
      </template>
    </Modal>
  </section>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import Textbox from '~/components/ui/Textbox.vue'
import { Textarea, Radio } from '~/shared/components/ui'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import ImageUpload from '~/shared/components/ImageUpload.vue'
import Modal from '~/components/ui/Modal.vue'
import UPDATE_PROFILE from '~/gql/user/updateProfile.gql'
import ME from '~/gql/user/me.gql'

export default {
  components: {
    Textbox,
    Textarea,
    Radio,
    PrimaryButtonRounded,
    ImageUpload,
    Modal,
  },

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
      openDeleteAccountModal: false,
    }
  },

  validations: {
    profile: {
      firstName: { required },
    },
  },

  computed: {
    ...mapGetters({ loading: 'loading' }),
    settings() {
      return this.$store.state.settings || {}
    },
  },

  async created() {
    await this.getMe()
  },

  methods: {
    ...mapMutations({
      success: 'success',
      setErr: 'setErr',
      setUser: 'auth/setUser',
    }),

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

    saveImage(name, image) {
      this.profile.avatar = image
      this.submit()
    },

    async submit() {
      // console.log("update profile", this.profile)
      const msg = 'Profile Updated'
      delete this.profile.__typename
      delete this.profile.info
      delete this.profile.address
      try {
        const data = await this.$post('user/updateProfile', this.profile)
        this.setUser({
          phone: data.phone,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: data.avatar,
          gender: data.gender,
          state: data.state,
          city: data.city,
          zip: data.zip,
          role: data.role,
          provider: data.provider,
          verified: data.verified,
        })
        // const data = (
        //   await this.$apollo.mutate({
        //     mutation: UPDATE_PROFILE,
        //     variables: this.profile,
        //   })
        // ).data.updateProfile
        this.success(msg)
        const r = this.$route.query.ref || '/my'
        // this.$router.push(r)
      } catch (e) {
        this.setErr(e)
      }
    },
  },
}
</script>

<style scoped>
@media (max-width: 640px) {
  .width {
    width: 90vw;
  }
}
@media (min-width: 640px) {
  .width {
    width: 80vw;
  }
}
@media (min-width: 768px) {
  .width {
    width: 70vw;
  }
}
@media (min-width: 1024px) {
  .width {
    width: 60vw;
  }
}
@media (min-width: 1024px) {
  .width {
    width: 50vw;
  }
}
</style>
