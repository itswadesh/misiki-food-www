<template>
  <div
    style="background: #dfdfdf"
    class="
      w-full
      rounded-md
      shadow-md
      hover:shadow-lg
      focus:outline-none
      full-height
      rounded-te-3xl
    "
  >
    <div class="flex flex-row-reverse w-full focus:outline-none">
      <div
        v-if="product"
        class="relative w-full mx-auto overflow-hidden focus:outline-none"
      >
        <div
          class="
            absolute
            top-0
            right-0
            flex flex-row-reverse
            justify-between
            m-3
            flex-start
          "
        >
          <nuxt-link
            :to="`/search/${product.brand && product.brand.name}`"
            class="absolute"
          >
            <div
              class="
                flex
                items-center
                bg-white
                border
                cursor-pointer
                border-primary-500
                trans
              "
            >
              <svg
                class="
                  absolute
                  flex
                  items-center
                  justify-center
                  w-4
                  h-4
                  fill-current
                  ms-1
                  text-primary-500
                "
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
              <div class="my-auto text-xs font-medium ps-6 text-primary-500">
                View Similar
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="image_container">
          <nuxt-link :to="localePath(`/${product.slug}?id=${pid}`)">
            <img
              v-lazy="`${product.imgCdn}?tr=h-256,fo-auto`"
              alt=""
              class="
                object-cover object-top
                w-full
                h-48
                lg:h-64
                overflow-hidden
                rounded-tl-md rounded-tr-3xl
              "
            />
          </nuxt-link>
        </div>
        <!-- name_brand_addtocart -->

        <!-- name_price_container -->
        <nuxt-link :to="localePath(`/${product.slug}?id=${pid}`)">
          <div
            class="
              p-2
              mx-auto
              text-sm
              relative
              overflow-hidden
              bg-white
              h-32
              rounded-b-md
              flex flex-col
              justify-between
            "
          >
            <div class="flex flex-row">
              <div
                class="
                  text-base
                  font-medium
                  capitalize
                  text-start text-primary-500
                  leading-tighter
                  line-clamp-2
                "
              >
                {{ product.name }}
              </div>
            </div>

            <div class="flex flex-row items-center justify-between">
              <div
                class="
                  overflow-hidden
                  text-base
                  font-light
                  text-gray-400
                  truncate
                  text-start
                "
              >
                {{ (product.brand && product.brand.name) || '-' }}
                <!-- <span v-if="product.color"> - {{ product.color.name }}</span> -->
              </div>
              <div v-if="product.color" class="text-gray-800">
                {{ product.color.name }}
              </div>
            </div>

            <div class="flex items-center h-8">
              <div class="font-semibold text-gray-800">
                {{
                  product.price
                    | currency(store.currencySymbol, store.currencyDecimals)
                }}
              </div>

              <div v-if="product.price < product.mrp" class="flex flex-row">
                <strike class="mx-3 my-auto text-xs font-light text-gray-400">
                  {{
                    product.mrp
                      | currency(store.currencySymbol, store.currencyDecimals)
                  }}
                </strike>

                <div
                  v-if="product.price < product.mrp"
                  class="my-auto text-xs text-secondary-200"
                >
                  {{ product.discount }}% off
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { NuxtLink },
  props: {
    product: { type: Object, default: () => {} },
    pid: { type: String, default: null }, // Required in case of elastic search id not available inside product
  },
  computed: {
    ...mapGetters({
      store: 'store',
    }),
  },
}
</script>

<style scoped>
.add {
  width: 57px;
  height: 21px;
}
.trans {
  width: 26px;
  height: 26px;
  transition: width 0.3s;
  overflow: hidden;
  font-size: 10px;
  border-radius: 20px;
}
.trans:hover {
  width: 102px;
}

@media only screen and (min-width: 1024px) {
  .cart {
    overflow: hidden;
  }
  .totalheight {
    transition: height 0.3s;
    overflow: hidden;
    height: 390px;
  }
  .totalheight:hover {
    height: 350px;
  }
}
.similar {
  width: 26px;
  height: 26px;
}
</style>
