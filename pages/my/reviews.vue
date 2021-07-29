<template>
  <ReviewAndRating />
</template>
<script>
import ReviewAndRating from '~/components/User/Dashboard/ReviewAndRating.vue'
export default {
  components: {
    ReviewAndRating,
  },
  layout: 'account',
  middleware: ['isAuth'],
  head() {
    return {
      title: 'Reviews',
    }
  },
}
</script>
