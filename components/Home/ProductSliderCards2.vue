<template>
  <div class="focus:outline-none">
    <div class="flex flex-row w-full focus:outline-none">
      <div
        class="
          items-center
          w-full
          mx-auto
          mt-8
          border
          shadow
          rounded-tr-2xl
          h-68
          focus:outline-none
        "
      >
        <nuxt-link
          :to="localePath(`/${product.slug}?id=${product.id}`)"
          class="focus:outline-none"
        >
          <div
            class="
              flex flex-row
              w-full
              mx-auto
              overflow-hidden
              bg-white
              rounded-tr-2xl
              focus:outline-none
            "
          >
            <img
              v-lazy="product.img"
              alt=""
              class="
                object-contain
                w-40
                h-40
                mx-auto
                mt-2
                transition
                duration-500
                ease-in-out
                transform
                hover:-translate-y-1
                hover:scale-110
              "
            />
          </div>
          <!-- style="height:86px;" -->
          <div class="p-3 truncate border-t bg-accent-100">
            <span class="text-start">
              <span class="mt-2 text-base font-semibold text-gray-700">{{
                product.name
              }}</span>
              <span class="text-base font-normal text-gray-500">{{
                product.brand
              }}</span>
              <div>
                <span class="text-base font-normal text-center text-accent-900">
                  {{ product.price | currency(settings.currencySymbol, 2) }}
                </span>
              </div>
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
export default {
  // computed:{
  //   bgColor(){
  //     return{
  //       "background-color": this.bgColor,
  //     };
  //   }
  // },
  components: {},
  // ['id', 'slug', 'name', 'price', 'img'],
  props: {
    product: { type: Object },
  },
  data() {
    return {
      isActive: false,
      // isWishlist:false,
      products: null,
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success' }),
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
