<template>
  <div>
    <div class="w-full">
      <!--  -->
      <AddressSkeleton v-if="skeleton" />
      <div
        v-if="addresses && addresses.data && addresses.data.length"
        class="w-full"
      >
        <div
          v-for="(a, ix) in addresses && addresses.data"
          :key="ix"
          class="pb-4"
          :class="ix == addresses.data.length - 1 ? '' : 'border-b'"
        >
          <label class="flex flex-row w-full p-2 px-3 sm:p-4 sm:px-6">
            <Radio
              v-model="selectedAddress"
              :value="a.id"
              name="group"
              @change="addressChanged"
            />
            <div
              class="
                w-full
                text-base
                font-light
                leading-7
                text-gray-500
                cursor-pointer
                ms-2
              "
            >
              <span class="capitalize">
                {{ a.firstName }} {{ a.lastName }}
              </span>
              <div class="flex flex-row my-1 sm:w-2/3">
                <span class="text-gray-700 me-1">Address:</span>
                {{ a.address }},
              </div>
              <span class="capitalize">
                {{ a.city }}, {{ a.state }}, {{ a.country }}
              </span>
              <div class="flex flex-row my-1">
                <span class="text-gray-700 me-1">Pin:</span>
                {{ a.zip }}
              </div>
              <div class="flex flex-row my-1">
                <span class="text-gray-700 me-1">Phone:</span>
                <span class="underline">
                  {{ a.phone }}
                </span>
              </div>
              <div class="flex flex-row flex-wrap my-1">
                <span class="text-gray-700 me-1">Email:</span>
                <span class="underline">
                  {{ a.email }}
                </span>
              </div>
            </div>
          </label>
          <div
            class="
              flex flex-row
              w-full
              px-3
              my-auto
              mt-5
              sm:mt-0 sm:justify-between sm:px-7
            "
          >
            <div class="w-full my-auto">
              <!-- <label class="flex flex-row">
                        <input
                          type="checkbox"
                          class="my-auto border-0 rounded-sm me-3 bg-gray-50 text-primary-500 ring-yellow-600 ring-1 focus:ring-1 focus:ring-yellow-600 focus:ring-offset-0"
                        />
                        <span class="text-gray-500">Make this as a Primary address</span>
                      </label> -->
            </div>
            <div class="flex flex-row">
              <!-- <nuxt-link
                :to="localePath(`/my/edit-addresses?id=${a.id}`)"
                class="me-3"
              > -->
              <button
                type="button"
                class="
                  w-full
                  px-5
                  text-sm
                  tracking-widest
                  uppercase
                  bg-white
                  border
                  rounded
                  sm:p-1 sm:px-3
                  text-primary-500
                  border-primary-500
                  focus:outline-none
                  focus:ring-opacity-50
                  focus:ring
                  focus:ring-offset-2
                  focus:ring-primary-200
                  lg:rounded
                "
                @click="edit(a.id)"
              >
                Edit
              </button>
              <!-- </nuxt-link> -->
              <button
                type="button"
                class="
                  w-full
                  p-2
                  px-3
                  text-sm
                  tracking-widest
                  text-gray-400
                  uppercase
                  rounded
                  ms-3
                  focus:outline-none
                  focus:ring-opacity-50
                  focus:ring
                  focus:ring-offset-2
                  lg:rounded
                "
                @click="del(a.id)"
              >
                <div v-if="iconloading" class="flex justify-center">
                  <svg
                    style="height: 20px; width: 20px"
                    class="text-gray-500 -ms-1 animate-spin"
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
                <span v-else>remove</span>
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="addresses.data.length == 0"
          class="p-6 text-lg text-center text-gray-500"
        >
          No Address found
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AddressSkeleton from '~/components/AllSkeletons/AddressSkeleton.vue'
import { Radio } from '~/shared/components/ui'
import MY_ADDRESSES from '~/gql/address/myAddresses.gql'
import DELETE_ADDRESS from '~/gql/address/deleteAddress.gql'
export default {
  components: { Radio, AddressSkeleton },
  middleware: ['isAuth'],
  props: {
    id: { type: String, default: null },
    returnUrl: { type: String, default: null },
    addReturnUrl: { type: String, default: null },
  },
  data() {
    return {
      skeleton: false,
      iconloading: false,
      addresses: null,
      selectedAddress: null,
    }
  },
  head() {
    return {
      title: 'Manage Address',
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  async created() {
    await this.getAddress()
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    selectFirstAddress(x) {
      this.selectedAddress = x.addresses && x.addresses[0] && x.addresses[0].id
      return x
    },
    addressChanged(e) {
      this.selectedAddress = e
      this.$emit('addressChanged', e)
    },
    async getAddress() {
      try {
        this.skeleton = true
        this.addresses = await this.$get('address/myAddresses', {})
        // this.addresses = (
        //   await this.$apollo.query({
        //     query: MY_ADDRESSES,
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.myAddresses
        // Can not push automatically, because it creates bad user experience when user clicks on back to address list page
        // if (this.addresses.count < 1) this.$router.push(this.addReturnUrl)
        this.selectedAddress =
          this.addresses &&
          this.addresses.data &&
          this.addresses.data[0] &&
          this.addresses.data[0].id
      } catch (e) {
        // console.log('eeeeeeeeeee', e)
      } finally {
        this.skeleton = false
      }
    },
    edit(id) {
      this.$router.push(
        `/${this.$route.params.store}${this.returnUrl}?id=${id}`
      )
    },
    del(id) {
      this.$swal({
        title: 'Delete address?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          try {
            this.iconloading = true
            // this.$store.commit('clearErr')
            this.clearErr()
            await this.$post('address/deleteAddress', { id })
            // await this.$apollo.mutate({
            //   mutation: DELETE_ADDRESS,
            //   variables: { id },
            //   // refetchQueries: () => [{ query: ADDRESSES }],
            // })
            // query.refetch()
            await this.getAddress()
            // this.$refs.adQ.getApolloQuery().refresh();
            this.success('Address deleted successfully')
          } catch (e) {
            // this.$store.commit('setErr', e)
            this.setErr(e)
          } finally {
            this.iconloading = false
            // this.$store.commit('busy', false)
            this.busy(false)
          }
        }
      })
    },
  },
}
</script>
