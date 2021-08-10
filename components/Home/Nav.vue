<template>
  <nav class="flex flex-col bg-white shadow md:shadow-md frosted">
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

    <header class="z-40 w-full h-24 p-2 md:p-3 md:h-16">
      <div class="relative flex items-center justify-between space-x-5">
        <div class="flex items-center my-auto flex-shrink-0">
          <div class="hambargar menu md:hidden">
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
                class="w-6 h-6 pt-1 me-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
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

          <nuxt-link :to="localePath('/')">
            <img
              v-lazy="settings.logo"
              alt="logo"
              class="object-contain h-6 w-6 md:h-10 md:w-10 flex-shrink-0"
            />
          </nuxt-link>
        </div>

        <!-- Above 768px search bar start  -->

        <SearchAutocomplete class="hidden md:block relative z-20" />

        <!-- Above 768px search bar end  -->

        <!--right header with icons block start -->

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
                stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>

            <div class="hidden text-xs font-semibold md:block">Login</div>
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
                stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div class="hidden text-xs font-semibold md:block">Profile</div>
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
                stroke-width="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <div class="hidden text-xs font-semibold md:block">Wishlist</div>
          </nuxt-link>

          <nuxt-link class="relative" to="/cart">
            <div
              class="
                absolute
                top-0
                right-0
                -m-1
                bg-primary-500
                flex-shrink-0
                h-4
                w-4
                rounded-full
                flex
                items-center
                justify-center
                text-xs text-center text-white
              "
            >
              <span v-if="cart && cart.qty > 0">{{ cart.qty }}</span>
              <span v-else>0</span>
            </div>

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
                stroke-width="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            <div class="hidden text-xs font-semibold md:block">Cart</div>
          </nuxt-link>
        </div>

        <!--right header with icons block end -->
      </div>

      <!-- Below 768px search bar start  -->

      <SearchAutocomplete
        style="margin-top: 8px"
        class="sticky top-0 md:hidden"
      />

      <!-- Below 768px search bar end -->
    </header>
  </nav>
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
