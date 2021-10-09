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
          v-lazy="item.imgCdn"
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
            v-if="item.price < item.mrp"
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
                  focus:outline-none
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
                  focus:outline-none
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
            <WishButton
              :pid="item.pid"
              class="
                me-1
                sm:me-3
                p-1.5
                w-8
                h-8
                font-semibold
                text-center
                rounded
                hover:bg-red-200
                bg-accent-100
                px-auto
                focus:outline-none
              "
            />

            <button
              v-ripple="'rgba(229, 231, 235, 0.5)'"
              aria-label="delete product"
              class="
                flex
                items-center
                justify-center
                p-1.5
                w-8
                h-8
                font-semibold
                text-gray-600
                bg-gray-200
                rounded
                icons
                focus:outline-none
                hover:bg-gray-300
                focus:outline-noe
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
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
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
