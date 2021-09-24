<template>
  <div
    class="
      w-full
      px-2
      mt-0
      lg:w-2/4 lg:mt-10 lg:pe-20
      xs:w-full
      lg:px-10
      headings
    "
  >
    <Heading title="Manage Address" />
    <div class="w-full my-4">
      <nuxt-link
        :to="localePath(`address/add`)"
        class="
          flex
          items-center
          justify-center
          w-full
          p-5
          mb-5
          text-center
          bg-white
          border border-gray-100
          rounded
          shadow
          focus:outline-none
          hover:shadow-xl
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 me-1 focus:outline-none hover:text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        ADD NEW ADDRESS
      </nuxt-link>
      <ApolloQuery :query="require('~/gql/address/addresses.gql')">
        <template #default="{ result: { error, data }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <ErrComponent v-if="error" :error="error" />
          <div v-else-if="data && data.addresses">
            <div
              v-for="a in data.addresses"
              :key="a.id"
              class="
                relative
                flex flex-wrap
                w-full
                px-5
                py-3
                mb-5
                bg-white
                border border-gray-100
                rounded
                shadow
                hover:shadow-xl
              "
            >
              <nuxt-link
                :to="localePath(`address/${a.id}`)"
                class="
                  absolute
                  right-0
                  px-2
                  text-xs text-end
                  border border-gray-300
                  rounded
                  me-2
                "
                >Edit</nuxt-link
              >
              <!-- <span class="p-1 text-xs text-gray-700 bg-gray-200">HOME</span> -->
              <!-- <nuxt-link :to="localePath(`address/add?id=${a._id}`)" class="absolute right-0 px-5 text-end" >
          <span class="w-1 h-1 m-1 bg-gray-500 rounded-full"></span>
          <span class="w-1 h-1 m-1 bg-gray-500 rounded-full"></span>
          <span class="w-1 h-1 m-1 bg-gray-500 rounded-full"></span>
              </nuxt-link>-->
              <div class="w-full py-2 text-sm leading-loose">
                <span>
                  <b>{{ a.firstName }} {{ a.lastName }}</b>
                </span>
                <div class="w-full py-2 text-sm leading-loose">
                  <span>{{ a.phone }}</span>
                  <span>{{ a.address }}</span>
                  <span>{{ a.city }}</span>
                  <span>
                    {{ a.state }}-
                    <span class="font-bold">{{ a.zip }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>
<script>
import Heading from './Heading'
// import ListSkeleton from './ui/ListSkeleton'
import DELETE_ADDRESS from '~/gql/address/deleteAddress.gql'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { Heading, NuxtLink },
  layout: 'account',
  middleware: ['isAuth'],
  data() {
    return {
      // addresses: []
    }
  },
  async created() {
    // this.getAddresses()
  },
  methods: {
    // async getAddresses() {
    //   try {
    //     const res = (
    //       await this.$apollo.query({
    //         query: addresses,
    //       })
    //     ).data
    //     this.addresses = res.addresses
    //   } catch (e) {
    //   } finally {
    //   }
    // },
    deel(address) {
      this.$swal({
        title: 'Do you wish to delete this address?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete!',
      }).then(async (result) => {
        if (result.value) {
          this.clearErr()
          await this.$post('address/deleteAddress', { id: address.id })
          // await this.$apollo.mutate({
          //   mutation: DELETE_ADDRESS,
          //   variables: { id: address.id },
          // })
          await this.getAddresses()
        }
      })
    },
  },
}
</script>
