<template>
  <div class="flex flex-col bg-white shadow frosted">
    <div
      v-if="!settings.id"
      class="
        px-4
        py-2
        font-thin
        tracking-wide
        text-center
        bg-gray-800
        text-accent-900 text-sm
      "
    >
      We are upgrading. Will not take much time.
    </div>
    <header class="z-40 w-full h-24 p-2 shadow-xs sm:shadow-md lg:p-3 lg:h-16">
      <div class="relative flex items-center justify-between space-x-5">
        <div class="flex items-center my-auto">
          <div class="hambargar menu lg:hidden">
            <button
              aria-label="Open Menu"
              class="
                overflow-x-hidden overflow-y-hidden
                transition
                ease-in-out
                focus:outline-none
                duration-1500
              "
              @click="sidebar = !sidebar"
            >
              <svg
                class="w-6 h-6 pt-1 text-primary-500 me-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div
              v-if="sidebar"
              class="
                fixed
                inset-0
                z-30
                w-screen
                h-screen
                bg-black
                opacity-50
                cursor-auto
              "
              @click="sidebar = false"
            />
            <LeftUserProfile
              class="h-screen"
              :show="sidebar"
              :class="sidebar ? 'openSideBar' : 'closeSideBar'"
              @hideSidebar="sidebar = false"
            />
          </div>
          <div class="h-full my-auto lg:mt-1">
            <nuxt-link :to="localePath('/')">
              <div class="my-auto">
                <img
                  v-lazy="settings.logo"
                  class="object-contain h-8 my-auto md:h-8"
                />
              </div>
            </nuxt-link>
          </div>
        </div>

        <SearchAutocomplete class="hidden lg:block" />
        <!--right header block -->

        <div
          class="
            flex
            items-center
            justify-between
            flex-shrink-0
            ml-10
            mr-3
            max-w-max
            space-x-5
          "
        >
          <button
            v-if="!user"
            class="focus:outline-none"
            @click="findLoginScreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div class="text-xs font-bold headings">Profile</div>
          </button>

          <nuxt-link v-else class="w-auto" :to="localePath('/my')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div class="hidden text-xs font-bold sm:flex headings">Profile</div>
          </nuxt-link>

          <nuxt-link class="w-auto" :to="localePath('/my/wishlist')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <div class="hidden text-xs font-bold sm:flex headings">
              Wishlist
            </div>
          </nuxt-link>

          <nuxt-link class="relative" to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            <div class="hidden text-xs font-bold sm:flex">
              Cart
              <div
                v-if="cart && cart.qty > 0"
                class="
                  absolute
                  px-1
                  text-center
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                <div class="text-xs text-center text-white font-semi">
                  {{ cart.qty }}
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <SearchAutocomplete
        style="margin-top: 8px"
        class="sticky top-0 lg:hidden"
      />
    </header>
  </div>
</template>

<script>
// import CART from '~/gql/cart/cart.gql'
import SearchAutocomplete from '~/components/SearchAutocomplete.vue'
import LeftUserProfile from '~/components/User/LeftUserProfile.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: {
    SearchAutocomplete,
    LeftUserProfile,
    NuxtLink,
  },
  props: {
    msg: { type: String, default: null },
  },
  data() {
    return {
      sidebar: false,
      showLogin: false,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    user() {
      return (this.$store.state.auth || {}).user
    },
    cart() {
      return this.$store.state.cart
    },
  },
  // async created() {
  // console.log(this.user)
  // console.log(this.$router.path.name)
  // console.log(this.cart, 'nnnnnnnnnnnnnn')
  // await this.getCart()
  // },
  methods: {
    findLoginScreen() {
      if (this.settings.topLogin) {
        this.$emit('showLogin', true)
      } else {
        this.$router.push(`/${this.$route.params.store}/login`)
      }
    },
    // showLogin() {
    //   if (!this.user) {
    //     this.$router.push('/login')
    //   }
    // },
    hideOffers() {
      // console.log("hide offers")
      // this.showLogin = false
    },
    // async getCart() {
    //   console.log('add to tt', this.cart)
    //   try {
    //     this.cart = (
    //       await this.$apollo.query({
    //         query: CART,
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.cart
    //     console.log('add to carttttttt', this.cart)
    //   } catch (e) {
    //     console.log(e)
    //   } finally {
    //   }
    // },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.frosted {
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}

.text-xs {
  font-size: 0.675rem;
  line-height: 1.1rem;
  margin-left: 1px;
}

.openSideBar {
  left: 0;
  transition: 0.3s all;
}
.closeSideBar {
  left: -100%;
  transition: 0.3s all;
}
</style>
