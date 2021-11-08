<template>
  <div
    class="
      flex flex-col
      p-3
      mb-4
      bg-white
      rounded
      shadow
      md:shadow-sm md:border
    "
  >
    <div class="flex flex-row items-start w-full overflow-hidden">
      <nuxt-link
        :to="localePath(`/${item.slug}?id=${item.pid}`)"
        class="w-1/3 md:w-1/4 overflow-hidden"
      >
        <img
          v-lazy="item.img"
          alt="mobile"
          class="object-contain object-top w-full h-auto"
        />
      </nuxt-link>

      <div class="relative flex flex-col flex-1 leading-3 w-2/3 ms-3 md:w-3/4">
        <h6
          class="
            mb-0.5
            text-base
            sm:text-lg
            font-semibold
            capitalize
            text-start
          "
        >
          {{ item.brandName }}
        </h6>

        <nuxt-link
          :to="localePath(`/${item.slug}?id=${item.pid}`)"
          class="
            mb-1
            sm:mb-2
            text-sm
            md:text-base
            text-gray-500
            hover:text-primary-500
            truncate
          "
        >
          {{ item.name }}
        </nuxt-link>

        <div class="flex flex-row items-baseline mb-1 sm:mb-2">
          <b class="me-1 text-sm sm:text-base"></b>

          <b class="me-2 text-sm sm:text-base">
            {{ item.price | currency(store.currencySymbol) }}
          </b>

          <strike
            v-if="item.mrp > item.price"
            class="text-xs sm:text-sm font-light me-2 text-gray-500"
          >
            {{ item.mrp | currency(store.currencySymbol) }}
          </strike>

          <div
            v-if="item.discount > 0"
            class="text-xs sm:text-sm text-primary-700"
          >
            ({{ item.discount }}% off)
          </div>
        </div>

        <div
          class="
            mb-2
            sm:mb-4
            flex flex-col
            text-xs text-gray-400
            md:text-sm md:font-thin
          "
        >
          <div v-for="(o, ix, iix) in JSON.parse(item.options)" :key="iix">
            <!-- {{ ix }}={{ o }} -->
          </div>
        </div>

        <!-- qty button  -->
        <div
          class="
            flex flex-col
            sm:flex-row sm:items-center sm:justify-between
            w-full
          "
        >
          <div
            class="
              mb-2
              sm:mb-0
              flex flex-row
              items-center
              whitespace-nowrap
              max-w-max
              me-4
            "
          >
            <span class="text-sm font-semibold me-2"> Qty : </span>

            <div class="flex flex-row">
              <button
                v-ripple="'rgba(243, 244, 246, 0.5)'"
                aria-label="decrease count"
                class="
                  w-8
                  h-8
                  my-auto
                  text-xl
                  font-semibold
                  text-gray-700
                  bg-gray-100
                  border border-gray-200
                  rounded-full
                  hover:bg-gray-300
                  paddings
                  focus:outline-none focus:ring-0 focus:ring-offset-0
                "
                @click="
                  addToBag({
                    pid: item.pid,
                    vid: item.vid,
                    qty: -1,
                    options: item.options,
                    vendor: item.vendor && item.vendor.id,
                  })
                "
              >
                <!-- minus icon  -->

                <svg
                  class="w-4 h-4 mx-auto text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <div class="my-auto count text-md focus:outline-none">
                <img
                  v-if="loading"
                  v-lazy="'/loading.svg'"
                  class="mx-auto my-auto"
                />

                <div
                  v-else
                  class="container flex justify-center mx-auto my-auto mt-1"
                >
                  <span class="text-sm text-gray-600">{{ item.qty }}</span>
                </div>
              </div>

              <button
                v-ripple="'rgba(243, 244, 246, 0.5)'"
                aria-label="increase count"
                class="
                  w-8
                  h-8
                  my-auto
                  text-xl
                  font-semibold
                  text-gray-700
                  border
                  rounded-full
                  border-secondary-500
                  bg-secondary-500
                  paddings
                  focus:outline-none focus:ring-0 focus:ring-offset-0
                "
                @click="
                  addToBag({
                    pid: item.pid,
                    vid: item.vid,
                    qty: 1,
                    options: item.options,
                    vendor: item.vendor && item.vendor.id,
                  })
                "
              >
                <!-- plus icon  -->
                <svg
                  class="w-4 h-4 mx-auto text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- {{ item.options }}=={{ item.vendor.id }} -->

          <!-- remove icon -->
          <div class="flex flex-row items-center max-w-max">
            <WishButton :pid="item.pid" class="me-1 sm:me-3" />

            <button
              v-ripple="'rgba(229, 231, 235, 0.5)'"
              aria-label="delete product"
              class="
                flex
                items-center
                justify-center
                p-1
                bg-gray-200
                rounded
                icons
                hover:bg-gray-300
                focus:outline-none focus:ring-0 focus:ring-offset-0
              "
              @click="
                addToBag({
                  pid: item.pid,
                  vid: item.vid,
                  qty: -9999999,
                  options: item.options,
                  vendor: item.vendor && item.vendor.id,
                })
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
import WishButton from '~/components/WishButton.vue'

export default {
  components: { NuxtLink, WishButton },
  props: {
    item: { type: Object, default: null },
  },
  data() {
    return {
      isDisabled: false,
      loading: false,
      isActive: false,
      isAdded: false,
    }
  },
  computed: {
    ...mapGetters({
      store: 'store',
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
    }),
  },

  methods: {
    ...mapActions({ addToCart: 'cart/addToCart' }),
    ...mapMutations({ success: 'success' }),
    async addToBag(obj) {
      try {
        this.loading = true
        await this.addToCart(obj)

        // if (!!this.notify && obj.qty > 0) this.toast()
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    // async toggleWishlist(id) {
    //   // console.log('toggle', id)
    //   ;(this.isDisabled = true), (this.isWishlist = true)
    //   let msg = 'Product Added To the Wishlist'
    //   try {
    //     const data = (
    //       await this.$apollo.mutate({
    //         mutation: TOGGLE,
    //         variables: {
    //           product: id,
    //           variant: id,
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.toggleWishlist
    //     this.success(msg)
    //     // console.log('add to wishlist', this.toggleWishlist)
    //   } catch (e) {
    //     // this.$router.push('/login')
    //     // this.setErr(e.toString())
    //     // console.log(e)
    //   } finally {
    //     ;(this.isDisabled = true), (this.isWishlist = true)
    //   }
    // },
    //  async getCart(){
    //     try{
    //       this.cart=(
    //         await this.$apollo.query({
    //           query:CART,
    //           fetchPolicy:'no-cache',
    //         })
    //       ).data.cart
    //       console.log("add to  cartt",this.cart)
    //     }catch(e){
    //       console.log(e)
    //     }finally{
    //     }
    //   },
    //  // delete / remove method
    //   async deleteCart(id){
    //      this.loading =true
    //      let msg="Product Removed from the Cart"
    //     console.log("id.............", id)
    //     try{
    //       const data=(
    //         await this.$apollo.mutate({
    //           mutation:DELETECART,
    //           variables:{pid:id,
    //                     vid:id,
    //                     qty:-1
    //                 },
    //         })
    //       ).data.deleteCart
    //         this.success(msg)
    //         await this.getCart()
    //         console.log("delete cart", this.deleteCart)
    //     }catch(e){
    //       console.log(e)
    //     }finally{
    //       this.loading=false
    //     }
    //   },
    //   // add / increse method
    //   async addToCart(id){
    //      this.loading =true
    //     let msg="Product incresed by one in the Cart"
    //     try{
    //       const data=(
    //         await this.$apollo.mutate({
    //           mutation: ADDTOCART,
    //           variables:{pid:id,
    //                     vid:id,
    //                     qty:1
    //                     },
    //         })
    //       ).data.addToCart
    //       this.success(msg)
    //       await this.getCart()
    //       console.log("add to cartssss", this.addToCart)
    //     }catch(e){
    //       console.log(e)
    //     }finally{ this.loading=false}
    // }
  },
}
</script>

<style scoped>
.icons {
  padding: 7px;
}
.padding {
  padding: 1px;
}
.paddings {
  padding: 2px;
}
.count {
  height: 1.75rem;
  width: 2.2rem;
}
</style>
