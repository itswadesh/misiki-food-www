<template>
  <Wishlist />
</template>
<script>
import Wishlist from '~/components/User/Dashboard/Wishlist.vue'
export default {
  components: {
    Wishlist,
  },
  layout: 'account',
  middleware: ['isAuth'],
  head() {
    return {
      title: 'My Wishlist',
    }
  },
}
</script>
