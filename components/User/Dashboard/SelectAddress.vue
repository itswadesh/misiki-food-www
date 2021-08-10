<template>
  <div>
    <div class="w-full">
      <!--  -->
      <AddressSkeleton v-if="skeleton" />

      <div
        v-if="addresses && addresses.data && addresses.data.length == 0"
        class="p-6 text-lg text-center text-gray-500"
      >
        No Address found
      </div>

      <div
        v-if="addresses && addresses.data && addresses.data.length"
        class="w-full"
      >
        <div
          v-for="(a, ix) in addresses && addresses.data"
          :key="ix"
          class="p-2 sm:p-4"
          :class="ix == addresses.data.length - 1 ? '' : 'border-b'"
        >
          <label class="flex flex-row items-start w-full mb-5">
            <Radio
              v-model="selectedAddress"
              class="mt-1.5"
              :value="a.id"
              name="group"
              @change="addressChanged"
            />

            <div class="w-full font-light text-gray-800 cursor-pointer ms-2">
              <h5 class="capitalize font-semibold tracking-wide md:text-lg">
                {{ a.firstName }}
                {{ a.lastName }}
              </h5>

              <div class="text-sm md:text-base flex items-start my-1 sm:w-2/3">
                <h5
                  class="
                    font-medium
                    tracking-wide
                    me-2
                    w-16
                    sm:w-20
                    flex
                    items-start
                    justify-between
                  "
                >
                  <span>Address</span> <span>:</span>
                </h5>

                <h6 class="flex flex-col text-gray-500">
                  <span>{{ a.address }},</span
                  ><span>{{ a.city }}, {{ a.state }}, {{ a.country }}</span>
                </h6>
              </div>

              <div class="text-sm md:text-base flex items-start my-1 sm:w-2/3">
                <h5
                  class="
                    font-medium
                    tracking-wide
                    me-2
                    w-16
                    sm:w-20
                    flex
                    items-start
                    justify-between
                  "
                >
                  <span>Pin</span> <span>:</span>
                </h5>

                <h6 class="text-gray-500">{{ a.zip }}</h6>
              </div>

              <div class="text-sm md:text-base flex items-start my-1 sm:w-2/3">
                <h5
                  class="
                    font-medium
                    tracking-wide
                    me-2
                    w-16
                    sm:w-20
                    flex
                    items-start
                    justify-between
                  "
                >
                  <span>Phone</span> <span>:</span>
                </h5>

                <h6 class="text-gray-500">{{ a.phone }}</h6>
              </div>

              <div class="text-sm md:text-base flex items-start my-1 sm:w-2/3">
                <h5
                  class="
                    font-medium
                    tracking-wide
                    me-2
                    w-16
                    sm:w-20
                    flex
                    items-start
                    justify-between
                  "
                >
                  <span>Email</span> <span>:</span>
                </h5>

                <h6 class="text-gray-500 truncate">{{ a.email }}</h6>
              </div>
            </div>
          </label>

          <!-- <div class="w-full my-auto">
            <label class="flex flex-row items-start">
              <input
                type="checkbox"
                class="
                  my-auto
                  border-0
                  rounded-sm
                  me-3
                  bg-gray-50
                  text-primary-500
                  ring-yellow-600 ring-1
                  focus:ring-1 focus:ring-yellow-600 focus:ring-offset-0
                "
              />
              <h6 class="text-gray-500">Make this as a Primary address</h6>
            </label>
          </div> -->

          <div class="flex flex-row space-x-2 sm:space-x-5">
            <!-- <nuxt-link
                :to="localePath(`/my/edit-addresses?id=${a.id}`)"
                class="me-3"
              > -->

            <GrnIndGradiantButton
              type="button"
              class="w-full uppercase"
              @click="edit(a.id)"
            >
              Edit
            </GrnIndGradiantButton>
            <!-- </nuxt-link> -->

            <button
              type="button"
              class="
                w-full
                py-2
                text-gray-700
                hover:text-white
                font-semibold
                bg-transparent
                hover:bg-gray-600
                transition
                duration-300
                rounded-md
                hover:shadow-md
                uppercase
                focus:outline-none
                transform
                active:scale-95
              "
              @click="del(a.id)"
            >
              <div v-if="iconloading" class="flex items-center justify-center">
                <svg
                  class="h-5 w-5 text-gray-500 animate-spin"
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

              <h6 v-else>Remove</h6>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AddressSkeleton from '~/components/AllSkeletons/AddressSkeleton.vue'
import { Radio } from '~/shared/components/ui'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
import MY_ADDRESSES from '~/gql/address/myAddresses.gql'
import DELETE_ADDRESS from '~/gql/address/deleteAddress.gql'
export default {
  components: { Radio, AddressSkeleton, GrnIndGradiantButton },
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
      this.$router.push(`${this.returnUrl}?id=${id}`)
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

<style scoped></style>
