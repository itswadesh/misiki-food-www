<template>
  <div
    class="
      z-0
      w-full
      hover:shadow
      md:p-1
      focus:outline-none
      full-height
      rounded-2xl
    "
  >
    <div class="flex flex-row-reverse w-full bg-white focus:outline-none">
      <div
        v-if="product"
        class="
          relative
          items-center
          w-full
          mx-auto
          bg-white
          rounded-lg
          totalheight
          focus:outline-none
        "
      >
        <div
          class="
            relative
            flex flex-row
            justify-between
            px-2
            pt-2
            mx-auto
            my-auto
            bg-red-300
            md:relative
          "
        >
          <div
            class="
              relative
              flex flex-row
              bg-white
              border
              cursor-pointer
              border-primary-500
              trans
            "
          >
            <!-- bag icon  -->
            <svg
              class="absolute w-4 h-4 fill-current text-primary-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
              <path
                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
              />
            </svg>
            <div class`="text-xs font-medium ms-4 text-primary-500">
              View Similar
            </div>
          </div>
          <div class="my-auto">
            <button
              class="
                relative
                z-10
                bg-white
                border border-gray-500
                rounded-full
                hover:border-gray-400
                similar
                focus:outline-none
              "
              @click="toggleWishlist(product.id)"
            >
              <svg
                class="
                  w-5
                  h-5
                  text-gray-500
                  fill-current
                  hover:text-gray-400
                  heart
                "
                :class="[
                  isActive
                    ? 'text-gray-500 fill-current'
                    : 'text-accent-900 fill-current',
                ]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="isActive = !isActive"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="cart">
          <nuxt-link :to="localePath(`/${product.slug}?id=${product.id}`)">
            <span
              class="
                flex flex-row
                items-center
                h-40
                mx-auto
                overflow-hidden
                md:w-full md:h-56
              "
            >
              <img
                v-lazy="product.img || (product.images && product.images[0])"
                alt=""
                class="
                  object-cover
                  mx-auto
                  overflow-hidden
                  md:pt-0 md:p-0 md:object-contain
                "
              />
            </span>
          </nuxt-link>
        </div>
        <div
          class="
            relative
            bottom-0
            w-full
            pb-4
            overflow-hidden
            md:absolute md:pb-0
            nameall
          "
        >
          <nuxt-link :to="localePath(`/${product.slug}?id=${product.id}`)">
            <div class="p-2 mx-auto text-sm text-center rounded-b-lg">
              <div>
                <span class="text-xs font-semibold text-start text-primary-500">
                  {{ product.brand.name }}
                </span>
                <div
                  class="
                    overflow-hidden
                    text-gray-700
                    truncate
                    md:text-lg
                    text-normal
                  "
                >
                  {{ product.name }}
                </div>
              </div>
              <div class="flex justify-center mx-auto mt-2">
                <div class="flex flex-row text-xs conatiner">
                  <div class="font-semibold text-gray-600 me-1 md:me-2">
                    {{ product.price | currency(store.currencySymbol, 2) }}
                  </div>
                  <strike
                    class="
                      my-auto
                      text-xs
                      font-normal
                      text-gray-500
                      me-1
                      md:me-2
                    "
                    >{{
                      product.mrp | currency(store.currencySymbol, 2)
                    }}</strike
                  >
                  <div
                    v-if="product.price < product.mrp"
                    class="my-auto text-xs font-bold text-secondary-200"
                  >
                    ({{ Math.floor((product.price * 100) / product.mrp) }}% off)
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
          <!-- bottom add to cart -->
          <div class="relative hidden h-12 overflow-hidden md:flex">
            <div
              class="container absolute flex flex-col items-center mx-auto mt-1"
            >
              <button
                :disabled="isDisabled"
                class="focus:outline-none"
                @click="
                  addToBag({
                    pid: product.pid || product.id,
                    qty: 1,
                    vid: product.pid || product.id,
                    options: [],
                    vendor: product.vendor,
                  })
                "
              >
                <span
                  v-if="addedToCart"
                  class="
                    w-full
                    px-2
                    py-1
                    text-sm text-white
                    uppercase
                    bg-gray-400
                    rounded
                    md:px-6 md:text-normal
                    focus:outline-none
                  "
                >
                  Added To Cart
                </span>
                <span
                  v-else
                  class="
                    w-full
                    px-2
                    py-1
                    text-sm text-white
                    uppercase
                    rounded
                    bg-primary-500
                    hover:bg-secondary-500
                    md:px-6 md:text-normal
                    focus:outline-none
                  "
                >
                  Add To Cart
                </span>
                <span class="text-xs text-center text-gray-400">
                  <!-- </span>Size: XS, S, M, L, XL</span>-->
                </span>
              </button>
            </div>
          </div>
          <!-- mobile addtocart -->
          <div class="h-12 mt-1 overflow-hidden md:hidden">
            <div class="container absolute flex flex-col items-center mx-auto">
              <button
                :disabled="isDisabled"
                class="mb-1 focus:outline-none"
                @click="
                  addToBag({
                    pid: product.pid || product.id,
                    qty: 1,
                    vid: product.pid || product.id,
                    options: [],
                    vendor: product.vendor,
                  })
                "
              >
                <span
                  v-if="addedToCart"
                  class="
                    w-full
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    text-white
                    uppercase
                    bg-gray-400
                    rounded-2xl
                    focus:outline-none
                  "
                >
                  Added
                </span>
                <span
                  v-else
                  class="
                    flex flex-row
                    w-full
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    text-white
                    uppercase
                    transition
                    duration-300
                    ease-in-out
                    transform
                    bg-secondary-500
                    rounded-2xl
                    focus:outline-none
                    hover:opacity-75 hover:-translate-y-1 hover:scale-100
                  "
                >
                  <svg
                    class="my-auto font-bold text-white me-1"
                    xmlns="http://www.w3.org/2000/svg"
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
                  Add
                </span>
              </button>
              <span class="mt-2 text-xs text-center text-gray-400">
                <!-- </span>Size: XS, S, M, L, XL</span>-->
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  // ['p'],
  props: {
    product: { type: Object, default: () => {} },
  },
  data() {
    return {
      show: false,
      isDisabled: false,
      isActive: true,
      products: null,
      addedToCart: false,
    }
  },

  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
      store: 'store',
    }),
  },
  mounted() {
    $nuxt.$on('getSelectedCategory', (val) => {})
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    ...mapActions({ addToCart: 'cart/addToCart' }),
    async addToBag(obj) {
      const msg = 'Product Added To the Cart'
      this.isDisabled = true
      // console.log(obj)
      try {
        await this.addToCart(obj)
        // if (!!this.notify && obj.qty > 0) this.toast()
        this.addedToCart = true
        this.success(msg)
      } catch (e) {
        this.setErr(e)
      } finally {
        this.success()
      }
    },
  },
}
</script>

<style scoped>
.trans {
  width: 25px;
  height: 25px;
  transition: width 0.3s;
  overflow: hidden;
  font-size: 10px;
  padding: 2px;
  padding-left: 4px;
  padding-top: 4px;
  border-radius: 20px;
}
.trans:hover {
  width: 102px;
}
.cart {
  /* width: 231px; */
  height: 162px;
}
@media only screen and (min-width: 770px) {
  .cart {
    overflow: hidden;
  }
  .nameall {
    height: 150px;
  }
  .totalheight {
    transition: height 0.3s;
    overflow: hidden;
    height: 425px;
  }
  .totalheight:hover {
    height: 373px;
  }
  .full-height {
    overflow: hidden;
    height: 370px;
  }
}
.similar {
  width: 25px;
  height: 25px;
}
.heart {
  padding: 3px;
  padding-right: 4px;
}
.text {
  font-size: 16px;
  font-weight: 700px;
}
</style>
