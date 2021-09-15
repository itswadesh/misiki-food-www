<template>
  <div v-if="deals" class="h-auto mx-auto bg-white conatiner lg:px-10">
    <div class="h-auto focus:outline-none">
      <DealsSkeleton v-if="loading" />
      <div
        v-for="(d, i) in deals"
        v-else
        :key="i"
        class="flex flex-col-reverse xl:flex-row focus:outline-none"
      >
        <div class="ms-3 md:ms-6 md:me-6 xl:w-9/12 focus:outline-none">
          <VueSlickCarousel
            v-if="d.products"
            v-bind="settings"
            class="focus:outline-none"
          >
            <div
              v-for="p in d.products"
              :key="p.id"
              class="flex flex-col mb-6 focus:outline-none justify-items-center"
            >
              <!--  -->
              <SaleProductCard
                :id="p.id"
                :name="p.name"
                :slug="p.slug"
                :img="p.img"
                :price="p.price"
                class="focus:outline-none"
              />
            </div>
            <!--  -->
            <template #prevArrow="arrowOption">
              <div class="invisible custom-arrow custom-arrow1 md:visible">
                {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
              </div>
            </template>
            <template #nextArrow="arrowOption">
              <div class="invisible custom-arrow custom-arrow2 md:visible">
                {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
              </div>
            </template>
          </VueSlickCarousel>
        </div>
        <div class="items-center p-2 mx-auto my-auto text-white">
          <div class="p-3 mx-auto lg:mx-0 lg:p-0">
            <span class="text-4xl me-2 lg:text-2xl lg:me-0">{{ d.name }}</span>
          </div>
          <div v-if="!isexpired" class="flex flex-row lg:flex-col">
            <div
              v-if="isStarted"
              class="
                flex flex-col
                my-auto
                text-xs
                ms-4
                me-2
                lg:ms-0 lg:me-0 lg:mx-0 lg:flex-row
              "
            >
              <span class="me-1">Sales</span>
              <span class="me-1">Start</span>
              <span class="me-1">in</span>
            </div>
            <div
              v-else
              class="
                flex flex-col
                my-auto
                text-xs
                ms-4
                me-2
                lg:ms-0 lg:me-0 lg:mx-0 lg:flex-row
              "
            >
              <span class="me-1">Sales</span>
              <span class="me-1">expires</span>
              <span class="me-1">in</span>
            </div>
            <Countdown
              v-if="isStarted"
              class="mx-auto my-auto"
              :deadline="d.endTime"
            ></Countdown>
            <Countdown
              v-else
              class="mx-auto my-auto"
              :deadline="d.startTime"
            ></Countdown>
          </div>
          <span v-else class="flex flex-row mx-auto lg:flex-col"
            >Sales expierd.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Countdown from 'vuejs-countdown'
import SaleProductCard from '~/components/Home/SaleProductCard.vue'
import DealsSkeleton from '~/components/AllSkeletons/DealsSkeleton.vue'
import PRODUCTS from '~/gql/product/products.gql'
import DEALS from '~/gql/deal/listDeals.gql'
export default {
  components: {
    DealsSkeleton,
    SaleProductCard,
    Countdown,
  },
  data() {
    return {
      isWishlist: false,
      products: null,
      loading: false,
      deals: null,
      isStarted: false,
      isexpired: false,
      isDealStarted: false,
      isDealEnded: false,

      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              centerMode: true,
              centerPadding: '110px',
              centerMargin: '20px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: false,
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,
              centerPadding: '65px',
              centerMargin: '10px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: false,
              slidesToShow: 1,
            },
          },
        ],
      },
    }
  },
  async created() {
    // await this.getDeals()
    // await this.getProducts()
  },
  methods: {
    ...mapMutations({ success: 'success' }),
    compareDates(startTime, endTime) {
      const currentDate = new Date()

      // console.log(startTime, endTime)

      const startDate = new Date(startTime)
      const endDate = new Date(endTime)
      if (currentDate.getTime() >= startDate.getTime()) {
        // console.log('started')

        this.isStarted = false
      } else {
        this.isStarted = true
      }

      if (endDate.getTime() < currentDate.getTime()) {
        this.isexpired = true
      } else {
        this.isexpired = false
      }

      // if (currentDate.getTime() > startDate.getTime()) {
      //   console.log('started')

      //   this.isexpired = true
      // } else {
      //   this.isexpired = false
      // }

      // console.log(this.isStarted, 'started')
      // console.log(this.isExpired, 'expired')

      // if(d1.ge)
      // var current = new Date(startTime)
      // console.log(current.getHours())
      // var currentDate = parseInt(d1.getDate())
      // var currentMonth = parseInt(d1.getMonth())
      // var currentYear = parseInt(d1.getFullYear())

      // var currentHours = parseInt(d1.getHours())
      // var currentMin = parseInt(d1.getMinutes())
      // var currentsec = parseInt(d1.getSeconds())
      // // console.log(typeof )
      // console.log(currentDate, parseInt(new Date(startTime).getDate()))

      // console.log(currentDate > parseInt(new Date(startTime).getDate()))

      // if (
      //   currentDate >= parseInt(new Date(startTime).getDate()) ||
      //   currentMonth >= parseInt(new Date(startTime).getMonth()) ||
      //   currentYear >= parseInt(new Date(startTime).getFullYear()) ||
      //   currentHours >= parseInt(new Date(startTime).getHours()) ||
      //   currentMin >= parseInt(new Date(startTime).getMinutes()) ||
      //   currentsec >= parseInt(new Date(startTime).getSeconds())
      // ) {
      //   this.isDealStarted = true
      // } else {
      //   this.isDealStarted = false
      // }

      // if (
      //   currentDate < parseInt(new Date(endTime).getDate()) ||
      //   currentMonth < parseInt(new Date(endTime).getMonth()) ||
      //   currentYear < parseInt(new Date(endTime).getFullYear()) ||
      //   currentHours < parseInt(new Date(endTime).getHours()) ||
      //   currentMin < parseInt(new Date(endTime).getMinutes()) ||
      //   currentsec < parseInt(new Date(endTime).getSeconds())
      // ) {
      //   this.isDealEnded = true
      // } else {
      //   this.isDealEnded = false
      // }

      // console.log(this.isDealStarted, 'dealStart')
      // console.log(this.isDealEnded, 'dealEnded')
      // var startDate = parseInt(startTime[8] + startTime[9])
      // var startMonth = parseInt(startTime[5] + startTime[6])
      // var startYear = parseInt(
      //   startTime[0] + startTime[1] + startTime[2] + startTime[3]
      // )

      // var startHour = parseInt(startTime[12] + startTime[13])
      // var startMin = parseInt(startTime[15] + startTime[16])
      // var startSec = parseInt(startTime[18] + startTime[19])

      // var endDate = parseInt(endTime[8] + endTime[9])
      // var endMonth = parseInt(endTime[5] + endTime[6])
      // var endYear = parseInt(endTime[0] + endTime[1] + endTime[2] + endTime[3])

      // var endHour = parseInt(endTime[12] + endTime[13])
      // var endMin = parseInt(endTime[15] + endTime[16])
      // var endSec = parseInt(endTime[18] + endTime[19])
      // console.log(endMin, 'min')

      // console.log(d1.getDate())
    },
    async getDeals() {
      this.loading = true
      try {
        this.deals = (await this.$get('deal/listDeals', {})).data
        // this.deals = (
        //   await this.$apollo.query({
        //     query: DEALS,
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.listDeals.data

        // console.log(this.deals, 'DeaALSSSS')
        // console.log(this.deals[0].endTimeISO.getDate())
        this.compareDates(this.deals[0].startTime, this.deals[0].endTime)
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
    async getProducts() {
      this.loading = true
      try {
        this.products = await this.$get('product/products', { hot: true })
        // this.products = (
        //   await this.$apollo.query({
        //     query: PRODUCTS,
        //     variables: {
        //       hot: true,
        //     },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.products
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
.custom-arrow {
  margin-right: 10px;
  height: 80px;
  width: 42px;
  padding: 6px;
  padding-top: 23px;
  box-shadow: 10px;
}
.slick-prev::before,
.slick-next::before {
  font-size: 40px;
  line-height: 1;
  opacity: 1;
  color: white;
  box-shadow: 10px;
  -webkit-font-smoothing: antialiased;
}
.slick-prev {
  margin-left: -20px;
  z-index: 1;
  left: 0;
  box-shadow: 10px;
}
</style>
