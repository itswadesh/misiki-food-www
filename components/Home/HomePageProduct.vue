<template>
  <section
    v-if="product"
    class="relative w-full group hover:shadow-md border bg-white text-gray-800"
    @mouseenter="showitems()"
    @mouseleave="hideitems()"
  >
    <!-- Quick view button start-->
    <div
      v-if="quickview"
      class="hidden group-hover:block absolute z-10 right-2 top-2"
    >
      <button
        class="
          flex
          items-center
          justify-center
          bg-white
          hover:bg-gray-800
          text-gray-500
          hover:text-white
          transition
          duration-300
          h-7
          w-7
          rounded-md
          focus:outline-none focus:ring-0 focus:ring-offset-0
        "
        @click="$emit('open', product)"
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>
    </div>

    <!-- Quick view button end-->

    <nuxt-link
      :to="localePath(`/${product.slug}?id=${product.id || pid}`)"
      class="z-0 block overflow-hidden"
    >
      <div
        class="h-48 sm:h-56"
        @mouseenter="onMouseOverImage"
        @mouseleave="onMouseOutImage"
      >
        <transition-group
          class="div-slider h-48 sm:h-56"
          tag="div"
          :name="back ? 'slideback' : 'slide'"
        >
          <div v-if="currentIndex === 0" key="1" class="justify-center flex">
            <img
              v-lazy="`${product.imgCdn}?tr=h-288,fo-auto`"
              alt="product"
              class="card object-contain h-48 sm:h-56 slide"
            />
          </div>
          <div v-if="currentIndex === 1" key="2" class="justify-center flex">
            <img
              :src="`${product.imagesCdn[1]}?tr=h-288,fo-auto`"
              alt="product"
              class="card object-contain h-48 sm:h-56 slide"
            />
          </div>
        </transition-group>
        <!-- <transition name="slide">
          
        </transition> -->
      </div>

      <!-- Product brand -->

      <div class="p-2 sm:p-4">
        <h4 v-if="product.brand" class="mb-1.5 sm:mb-2.5 text-sm font-semibold">
          {{ product.brand.name }}
        </h4>

        <!-- Product name -->

        <h5
          class="
            mb-1.5
            sm:mb-2.5
            text-xs
            sm:text-sm
            font-light
            text-gray-500
            overflow-hidden
            whitespace-nowrap
            overflow-ellipsis
          "
        >
          {{ product.name }}
        </h5>

        <!-- Price,MRP,Discount -->

        <div
          class="
            mb-1.5
            sm:mb-2.5
            flex flex-row
            overflow-hidden
            whitespace-nowrap
            overflow-ellipsis
            items-baseline
            justify-start
          "
        >
          <h6 class="me-1 sm:me-1.5 text-sm font-semibold whitespace-nowrap">
            {{ product.price | currency(store.currencySymbol) }}
          </h6>

          <h6
            v-if="product.price < product.mrp"
            class="
              me-1
              sm:me-1.5
              text-xs text-gray-500
              font-light
              whitespace-nowrap
              line-through
            "
          >
            {{ product.mrp | currency(store.currencySymbol) }}
          </h6>

          <div
            v-if="product.price < product.mrp"
            class="text-xs text-success font-light whitespace-nowrap truncate"
          >
            ({{ product.discount }}% off)
          </div>
        </div>

        <!-- Out of stock -->

        <h6 v-if="product.stock < 1" class="text-xs text-red-500">
          Out of stock
        </h6>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
// import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'

export default {
  components: { NuxtLink },
  // ['id', 'slug', 'name', 'price', 'img'],

  // computed:{
  //   bgColor(){
  //     return{
  //       "background-color": this.bgColor,
  //     };
  //   }
  // },

  props: {
    quickview: { type: Boolean, default: false },
    product: { type: Object, default: () => {} },
    pid: { type: String, default: null },
    pg: { type: Object, default: null },
  },

  data() {
    return {
      back: false,
      currentIndex: 0,
      isActive: false,
      // isWishlist:false,
      products: null,
      featuredImage: null,
      show: false,
      openQuickView: false,
    }
  },

  computed: {
    ...mapGetters({
      store: 'store',
    }),
    // featuredImage() {
    //   return this.product.imgCdn
    // },
  },

  created() {
    this.featuredImage = this.product.imgCdn
  },

  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success' }),
    onMouseOutImage() {
      if (
        this.product &&
        this.product.imagesCdn &&
        this.product.imagesCdn.length > 1
      ) {
        this.back = true
        this.currentIndex = 0
        // this.featuredImage = this.product.imgCdn
      }
    },

    onMouseOverImage() {
      if (
        this.product &&
        this.product.imagesCdn &&
        this.product.imagesCdn.length > 1
      ) {
        this.back = false
        this.currentIndex = 1

        // const secondImage = this.product.imagesCdn.filter((f) => {
        //   return f !== this.product.imgCdn
        // }, {})
        // this.featuredImage = secondImage[0]
      }
    },

    showitems() {
      this.show = true
    },

    hideitems() {
      this.show = false
    },

    // async toggleWishlist(id) {
    //   // console.log(id)
    //   this.isActive = true
    //   const msg = 'Product Added To the Wishlist'
    //   // console.log(id)
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
    //     // console.log(e)
    //     this.setErr(e.toString())
    //     this.$router.push('/login')
    //     // console.log(e)
    //   }
    // },
  },
}
</script>

<style scoped>
.div-slider {
  overflow: hidden;
  position: relative;
}

.div-slider .card {
  position: absolute;
}
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.slideback-leave-active,
.slideback-enter-active {
  transition: 1s;
}
.slideback-enter {
  transform: translate(-100%, 0);
}
.slideback-leave-to {
  transform: translate(100%, 0);
}

.trans {
  transition: width 0.3s;
  overflow: hidden;
  justify-content: start;
  padding-left: 2px;
}
.trans:hover {
  width: 130px;
  padding-left: 0px;
  justify-content: center;
}
.h-rem-similar {
  height: 1.75rem;
}
.h-rem-wishlist {
  height: 2.75rem;
}
.h-rem-size {
  height: 1.6rem;
}
</style>
