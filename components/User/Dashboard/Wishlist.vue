<template>
  <div class="h-full max-w-full mx-auto text-gray-800">
    <div
      v-if="listLoading"
      class="
        grid
        w-auto
        grid-cols-2
        gap-2
        sm:gap-4 sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-6
      "
    >
      <WishlistSkeleton v-for="(p, ix) in 10" :key="ix + '-1'" />
    </div>

    <div v-if="myWishlist">
      <div v-if="myWishlist.count === 0" class="h-screen w-full">
        <!-- v-lazy="`/img/review/review.png?tr=h-384,fo-auto`" -->

        <img
          src="/img/wishlist/wishlist.png"
          alt=""
          class="object-contain object-top height w-full mx-auto"
        />

        <div class="flex flex-col text-center">
          <h2
            class="mb-2 text-lg sm:text-xl font-medium font-serif tracking-wide"
          >
            Empty Wishlist !!
          </h2>

          <p class="text-xs mb-5">
            You have no items in your Wishlist. Start adding
          </p>

          <nuxt-link :to="localePath('/')" class="mb-5 mx-auto">
            <GrnIndGradiantButton>Shop Now</GrnIndGradiantButton>
          </nuxt-link>
        </div>
      </div>

      <div v-else class="relative">
        <div>
          <h1
            class="mb-3 sm:mb-5 text-xl sm:text-2xl font-semibold tracking-wide"
          >
            My Wishlist ({{ myWishlist.count }})
          </h1>

          <div
            class="
              grid
              w-auto
              grid-cols-2
              gap-4
              mt-4
              sm:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
            "
          >
            <div
              v-for="w in myWishlist.data"
              :key="w.id"
              class="
                relative
                border
                bg-white
                shadow-md
                rounded-md
                cursor-pointer
              "
            >
              <div v-if="w.product" class="group">
                <!-- Close button start -->

                <button
                  type="button"
                  class="
                    hidden
                    group-hover:block
                    absolute
                    z-10
                    p-1
                    transition
                    duration-300
                    transform
                    rounded-md
                    hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-md
                    top-2
                    right-2
                    focus:outline-none
                    focus:ring-0
                    focus:ring-offset-0
                    focus:scale-75
                    hovereffect
                  "
                  @click="toggleWishlist(w.product.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <!-- Close button end -->

                <nuxt-link
                  v-if="w.product"
                  :to="localePath(`/${w.product.slug}?id=${w.product.id}`)"
                  class="cols-span-1"
                >
                  <div class="">
                    <div class="overflow-hidden">
                      <img
                        v-lazy="`${w.product.img}?tr=h-224,fo-auto`"
                        alt="mobile"
                        class="object-contain object-top w-full h-48 sm:h-56"
                      />
                    </div>

                    <div class="p-2 sm:p-4 mx-auto text-sm text-center">
                      <div class="mb-2 line-clamp-2 font-medium">
                        {{ w.product.name }}
                      </div>

                      <div
                        class="
                          flex flex-row
                          justify-center
                          items-center
                          overflow-hidden
                          whitespace-nowrap
                          overflow-ellipsis
                        "
                      >
                        <div class="me-2">
                          <b>{{
                            w.product.price | currency(store.currencySymbol)
                          }}</b>
                        </div>

                        <strike
                          v-if="w.product.price < w.product.mrp"
                          class="me-2 text-gray-500"
                        >
                          {{ w.product.mrp | currency(store.currencySymbol) }}
                        </strike>

                        <div
                          v-if="w.product.price < w.product.mrp"
                          class="text-secondary-500"
                        >
                          {{
                            Math.floor((w.product.price * 100) / w.product.mrp)
                          }}% off
                        </div>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <!-- if there is no items in cart -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WishlistSkeleton from '~/components/AllSkeletons/WishlistSkeleton.vue'
import NuxtLink from '~/components/NuxtLink.vue'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
import MY_WISHLIST from '~/gql/wishlist/myWishlist.gql'
import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'

export default {
  components: { WishlistSkeleton, NuxtLink, GrnIndGradiantButton },

  data() {
    return {
      loading: false,
      listLoading: false,
      myWishlist: null,
    }
  },
  computed: {
    ...mapGetters({
      store: 'store',
    }),
  },

  async created() {
    await this.getWishlist()
  },
  methods: {
    async getWishlist(id) {
      this.listLoading = true
      // console.log('getting wishlist', this.getWishlist)
      try {
        this.myWishlist = await this.$get('wishlist/myWishlist', {})
        // this.myWishlist = (
        //   await this.$apollo.query({
        //     query: MY_WISHLIST,
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.myWishlist
      } catch (e) {
        // console.log(e)
      } finally {
        this.listLoading = false
      }
    },
    async toggleWishlist(id) {
      this.loading = true
      // console.log()
      try {
        await this.$post('wishlist/toggleWishlist', {
          product: id,
          variant: id,
        })
        // await this.$apollo.mutate({
        //   mutation: TOGGLE,
        //   variables: {
        //     product: id,
        //     variant: id,
        //   },
        //   fetchPolicy: 'no-cache',
        // })

        await this.getWishlist()
        // console.log('add to wishlist', this.toggleWishlist)
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.hovereffect:hover svg {
  @apply text-white transition duration-300;
}

@media (max-width: 768px) {
  .height {
    height: 55%;
  }
}

@media (min-width: 768px) {
  .height {
    height: 60%;
  }
}
</style>
