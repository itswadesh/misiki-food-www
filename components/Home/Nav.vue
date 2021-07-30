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
      <div class="relative flex justify-between mx-auto xl:container">
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
        <SearchAutocomplete class="absolute hidden my-auto mb-1 lg:flex" />
        <!--right header block -->
        <div class="relative flex items-center my-auto lg:mt-1">
          <div class="flex flex-row items-center mx-3 my-auto flex-nowrap">
            <div class="my-auto">
              <!-- for desktop screen  -->
              <div
                v-if="!user"
                class="
                  hidden
                  my-auto
                  tracking-wider
                  cursor-pointer
                  lg:flex
                  sm:mb-0
                  text-primary-500 text-normal
                "
                @click="findLoginScreen"
              >
                <!-- {{ showLogin }} -->
                <!-- login icon  -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <!-- for mobile screen -->
              <nuxt-link
                v-if="!user"
                to="/login"
                class="
                  my-auto
                  tracking-wider
                  cursor-pointer
                  lg:hidden
                  sm:mb-0
                  text-primary-500 text-normal
                "
              >
                <!-- login icon  -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </nuxt-link>

              <div v-else class="w-auto cursor-pointer text-primary-500">
                <nuxt-link :to="localePath('/my')">
                  <div class="flex flex-col items-center w-full mx-auto">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <!-- <div
                      v-if="user"
                      class="flex w-full text-center sm:hidden sm:-mt-0 text-normal"
                    >
                      <span v-if="!user.firstName" class="mx-auto my-auto text-center"
                        >Hi</span
                      >
                      <span v-else class="mx-auto my-auto capitalize">
                        {{ user.firstName }}
                      </span>
                    </div> -->
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
          <nuxt-link :to="localePath('/my/wishlist')">
            <div class="">
              <!-- heart icon  -->
              <svg
                class="
                  w-6
                  h-6
                  mx-2
                  my-auto
                  transition
                  duration-500
                  ease-in-out
                  transform
                  text-primary-500
                  hw
                  hover:-translate-y-1 hover:scale-110 hover:text-accent-900
                "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </nuxt-link>
          <!-- :to="localePath('index')" -->
          <nuxt-link :to="localePath('cart')" class="h-full mx-3 my-auto">
            <div class="relative flex flex-col">
              <!-- cart icon -->
              <svg
                class="relative w-6 h-6 mt-2 text-primary-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </svg>
              <div
                v-if="cart && cart.qty > 0"
                class="
                  absolute
                  top-0
                  right-0
                  flex
                  items-center
                  justify-center
                  w-5
                  h-5
                  -mt-1
                  text-xs text-center text-white
                  rounded-full
                  -me-2
                  ms-1
                  bg-secondary-500
                "
              >
                {{ cart.qty }}
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
        this.$router.push(`${$route.params.store}/login`)
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
