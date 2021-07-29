<template>
  <div class="flex flex-col">
    <div v-if="address">
      <form class="p-1 md:p-4" action @submit.prevent="submit">
        <!-- forms -->
        <div
          class="
            grid grid-cols-1
            gap-2
            text-sm text-primary-500
            md:gap-4 md:grid-cols-2
          "
        >
          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <Textbox
              v-model="address.firstName"
              placeholder=""
              required
              autofocus
              :v="$v.address.firstName"
              :err="
                $v.address.firstName.$invalid && $v.address.firstName.$dirty
                  ? 'First Name is required'
                  : ''
              "
            />
            <span class="my-2">First Name</span>
          </label>

          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <Textbox v-model="address.lastName" placeholder="" required />
            <span class="my-2">Last Name</span>
          </label>

          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <Textbox
              v-model.number="address.phone"
              type="tel"
              placeholder=""
              required
            />
            <span class="my-2">Mobile number</span>
          </label>
          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <!-- @input="$event.target.composing = false" -->
            <Textbox
              v-model.number="address.zip"
              type="tel"
              placeholder=""
              required
              :v="$v.address.zip"
              :err="
                $v.address.zip.$invalid && $v.address.zip.$dirty
                  ? 'Pincode is invalid'
                  : ''
              "
              @keyup="getLocationFromZip(address.zip)"
            />
            <span class="my-2">Pincode</span>
          </label>

          <label class="flex flex-col-reverse col-span-2">
            <Textbox
              v-model="address.address"
              placeholder=""
              required
              :v="$v.address.address"
              :err="
                $v.address.address.$invalid && $v.address.address.$dirty
                  ? 'Address is required'
                  : ''
              "
            />
            <span class="my-2">Address (Area and Street)</span>
          </label>

          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <Textbox v-model="address.city" placeholder="" required />
            <span class="my-2">City/District/Town</span>
          </label>

          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <Textbox v-model="address.state" placeholder="" required />
            <span class="my-2">State</span>
          </label>

          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <Textbox v-model="address.country" placeholder="" required />
            <span class="my-2">Country</span>
          </label>

          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <Textbox v-model="address.email" placeholder="" required />
            <span class="my-2">Email</span>
          </label>
        </div>
        <div class="w-full mt-8">
          <div
            class="
              flex flex-col
              justify-between
              w-full
              my-auto
              mb-0
              md:flex-row
            "
          >
            <div class="w-full my-auto md:w-1/2">
              <!-- <label class="flex flex-row">
                <input
                  type="checkbox"
                  class="my-auto border-0 rounded-sm me-3 bg-gray-50 text-primary-500 ring-primary-500 ring-1 focus:ring-1 focus:ring-primary-500 focus:ring-offset-0"
                />
                <span class="text-gray-500"
                  >Make this as a default address</span
                >
              </label> -->
            </div>
            <button
              type="submit"
              class="
                w-full
                p-3
                mt-4
                text-sm
                font-semibold
                tracking-widest
                text-white
                bg-secondary-500
                md:w-1/3 md:mt-0
                focus:outline-none
                duration-200
                hover:-translate-y-0.5
                transition
                transform
                ease-in-out
                rounded
                focus:ring-opacity-50
                hover:opacity-80
                focus:ring focus:ring-offset-2 focus:ring-secondary-500
                lg:rounded
              "
            >
              <div v-if="iconloading" class="flex justify-center">
                <svg
                  style="height: 20px; width: 20px"
                  class="text-white -ms-1 animate-spin"
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
              </div>
              <span v-else> ADD ADDRESS</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { Textbox } from '~/shared/components/ui'
import SAVE_ADDRESS from '~/gql/address/saveAddress.gql'
import GET_LOCATION_FROM_ZIP from '~/gql/location/getLocationFromZip.gql'
import ADDRESS from '~/gql/address/address.gql'
export default {
  components: { Textbox },
  mixins: [validationMixin],
  middleware: ['isAuth'],
  props: {
    id: { type: String, default: 'new' },
  },
  validations: {
    address: {
      firstName: { required },
      address: { required },
      zip: { required, max: maxLength(6) },
    },
  },
  data() {
    return {
      iconloading: false,
      address: {
        email: null,
        firstName: null,
        lastName: null,
        address: null,
        town: null,
        city: null,
        country: null,
        state: null,
        zip: null,
        phone: null,
      },
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user
    },
  },
  async created() {
    if (this.id !== 'new') await this.getAddress()
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async getAddress() {
      try {
        this.address = await this.$get('address/address', {
          id: this.$route.query.id,
        })
        // this.address = (
        //   await this.$apollo.query({
        //     query: ADDRESS,
        //     variables: { id: this.$route.query.id },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.address
        if (!this.address) {
          this.address.firstName = this.user.firstName
          this.address.lastName = this.user.lastName
          this.address.email = this.user.email
          this.address.phone = this.user.phone
          this.address.address = this.user.address
          this.address.town = this.user.town
          this.address.city = this.user.city
          this.address.country = this.user.country
          this.address.zip = this.user.zip
        }
        // console.log(this.address)
      } catch (e) {
        // console.log(e)
      }
    },
    async getLocationFromZip(zip) {
      try {
        const locationData = await this.$post('location/getLocationFromZip', {
          zip,
        })
        // const locationData = (
        //   await this.$apollo.mutate({
        //     mutation: GET_LOCATION_FROM_ZIP,
        //     variables: { zip },
        //   })
        // ).data.getLocationFromZip
        if (!this.address.city) this.address.city = locationData.city
        if (!this.address.state) this.address.state = locationData.state
        if (!this.address.country) this.address.country = locationData.country
      } catch (e) {}
    },
    async submit() {
      this.address.phone = this.address.phone.replace(/^0+/, '')
      if (!this.address.address) return this.setErr('Please enter address')
      const msg = this.id === 'new' ? 'Address Added' : 'Address Updated'
      try {
        this.iconloading = true
        if (this.id !== 'new')
          if (this.address.coords) delete this.address.coords.__typename
        if (!this.address.id) this.address.id = 'new'
        this.address = await this.$post('address/saveAddress', this.address)
        // this.address = (
        //   await this.$apollo.mutate({
        //     mutation: SAVE_ADDRESS,
        //     variables: this.address,
        //   })
        // ).data.saveAddress
        this.success(msg)
        if (this.$route.query.prev)
          this.$router.push(`/${this.$route.query.prev}`)
        else this.$router.push('/checkout/address')
      } catch (e) {
        this.setErr(e)
      } finally {
        this.iconloading = false
      }
    },
  },
}
</script>
