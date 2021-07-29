<template>
  <div class="max-w-4xl pt-0 bg-white border border-collapse ms-4 me-3">
    <div class="flex flex-row justify-between">
      <h1 class="p-3 pt-3 text-lg font-semibold lg:text-2xl md:text-xl">
        Ratings & Reviews
      </h1>
      <!-- <nuxt-link :to="`/write-reviews?id=${product.id}`"> -->
      <button
        class="
          h-12
          col-end-2
          ps-2
          pe-2
          mx-auto
          mt-4
          text-white
          duration-500
          ease-in-out
          transform
          bg-blue-500
          rounded
          shadow
          me-2
          hover:-translate-y-1 hover:scale-95
          md:mt-4 md:h-12
          lg:h-12
          md:font-semibold md:m-5
          focus:outline-none
        "
      >
        Rate Product
      </button>
      <!-- </nuxt-link> -->
    </div>
    <div class="flex flex-col items-center justify-center mt-3 md:flex-row">
      <span class="text-center me-3">
        <span class="text-3xl font-semibold">4.3★</span>
        <span class="text-sm text-gray-600">2,581 Ratings &</span>
        <span class="text-sm text-gray-600">261 Reviews</span>
      </span>
      <span class="flex flex-row">
        <ul class="ms-2 me-2">
          <li>5★</li>
          <li>4★</li>
          <li>3★</li>
          <li>2★</li>
          <li>1★</li>
        </ul>
        <ul class="me-2">
          <li>
            <div class="w-full h-2 mt-2 text-white bg-green-600 rounded">
              ~~~~~~~~~~~~~~~~~~~~~
            </div>
          </li>
          <li>
            <div class="w-1/2 h-2 mt-4 bg-green-600 rounded"></div>
          </li>
          <li>
            <div class="w-1/5 h-2 mt-4 bg-green-600 rounded"></div>
          </li>
          <li>
            <div class="w-2/12 h-2 mt-4 bg-yellow-500 rounded"></div>
          </li>
          <li>
            <div class="w-1/12 h-2 mt-4 rounded bg-accent-900"></div>
          </li>
        </ul>
        <ul class="col-span-1 text-gray-600">
          <li>1,596</li>
          <li>572</li>
          <li>176</li>
          <li>66</li>
          <li>171</li>
        </ul>
      </span>
    </div>
    <div class="flex flex-row mt-4 border-b me-2 md:me-8">
      <div v-for="(g, ix) in samsung" :key="ix" class>
        <span class="flex flex-row">
          <img
            v-lazy="g.img"
            alt="pics"
            class="object-cover w-20 h-20 p-1 m-1 md:p-2 md:m-4"
          />
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 ps-6 pe-8 mt-4 border-b">
      <span class="flex flex-row">
        <span
          class="
            w-10
            h-6
            ps-2
            text-sm
            font-semibold
            text-white
            bg-green-600
            rounded
            shadow
            me-3
          "
        >
          5★
        </span>
        <span class="font-semibold">Briliant</span>
      </span>
      <span v-for="(r, ix) in review" :key="ix">
        <span class="pb-2 text-sm">{{ r.text }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import PRODUCT from '~/gql/product/product.gql'
export default {
  data() {
    return {
      prouct: null,
      samsung: [
        { img: '/img/sum.png' },
        { img: '/img/sum.png' },
        { img: '/img/sum.png' },
        { img: '/img/sum.png' },
      ],
      review: [
        {
          text: 'camera was ulitmate its a pro and night mode is just wow.. and you do not even need s10 or note too .. its a pro go for it i m using already dont depend on reviews in youtube phone is legend of 6.7 inch display and charging speed was ultimate 4500mah battery with 25watt super fast charging 😍 .. go for it you will definitely enjoy',
        },
        {
          text: 'camera was ulitmate its a pro and night mode is just wow.. and you dont even need s10 or note too .. its a pro go for it i m using already dont depend on reviews in youtube phone is legend of 6.7 inch display and charging speed was ultimate 4500mah battery with 25watt super fast charging 😍 .. go for it you will definitely enjoy',
        },
      ],
    }
  },
  async created() {
    await this.getProduct()
  },
  methods: {
    async getProduct() {
      try {
        this.product = await this.$get('product/product', {
          id: this.$route.query.id,
        })
        // this.product = (
        //   await this.$apollo.query({
        //     query: PRODUCT,
        //     variables: { id: this.$route.query.id },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.product
        // console.log('product details', this.product)
      } catch (e) {
        // console.log(e)
      }
    },
  },
}
</script>
