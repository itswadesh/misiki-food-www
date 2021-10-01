<template>
  <div class="bg-gray-100">
    <div class="relative justify-center w-full">
      <video
        v-lazy="
          'https://res.cloudinary.com/anne-biz/video/upload/q_auto/v1631807948/video_wiaoqe_m9u8ih.mp4?q_auto'
        "
        class="object-cover w-full h-48 md:h-96 lg:h-125"
        autoplay
        loop
        muted
      />
      <!-- <div>
        <iframe
          src="https://player.vimeo.com/video/545331344?title=0&byline=0&portrait=0&speed=0&badge=0&loop=1&autoplay=1&muted=1&player_id=0&app_id=58479/embed"
          width="100%"
          frameborder="0"
          class="object-cover w-full h-64"
        />
      </div> -->
      <!-- <div
        class="absolute w-full py-4 text-3xl font-bold text-center bg-white cursor-pointer top-40 bg-opacity-60"
      >
        Lorem Ipsum Dolor Sit Amet
      </div> -->
      <!-- 
      <nuxt-link
        to="/search"
        class="absolute py-3 text-center text-white rounded shadow-lg top-60 px-9 bg-primary-500 hover:bg-gray-200 hover:text-primary-500"
      >
        Enter Site
      </nuxt-link> -->

      <div class="w-full lg:bg-white lg:absolute lg:bg-opacity-60 lg:bottom-0">
        <div
          class="
            mx-4
            lg:mx-auto lg:w-2/3
            flex flex-col
            items-center
            justify-center
            text-center
          "
        >
          <h1 class="pt-5 text-2xl font-bold lg:text-4xl">
            Explore the world of Live Commerce
          </h1>

          <p class="mt-2 text-sm lg:mt-5">Livestram your products showcase</p>

          <PrimaryButtonRounded class="my-5 py-3 px-9" @click="saveLanding()">
            Enter Site
          </PrimaryButtonRounded>
        </div>
      </div>
    </div>
    <div class="mx-auto my-5 lg:container">
      <HomeHeroCards v-for="(i, ix) in items" :key="ix" :product="i" :ix="ix" />
    </div>

    <div
      class="pb-20 mt-2 bg-no-repeat lg:mt-4"
      style="background-image: url('/img/pink.jpg')"
    >
      <div class="py-2 text-3xl font-bold text-center lg:py-3 lg:text-4xl">
        How It Works
      </div>
      <div class="container mx-auto">
        <div class="container flex flex-wrap justify-center px-3 mx-auto">
          <HowItWorks
            v-for="(i, ix) in items2"
            :key="ix"
            :product="i"
            class="flex items-stretch w-full md:w-1/2 xl:w-1/3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeroCards from '~/components/Anne/HomeHeroCards.vue'
import HowItWorks from '~/components/Anne/HowItWorks.vue'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: {
    HomeHeroCards,
    HowItWorks,
    PrimaryButtonRounded,
  },

  layout: 'landing',

  data() {
    return {
      items: [
        {
          id: 'live',
          link: 'https://live.anne.biz/',
          title: 'Live Now',
          img: '/img/home/live-now.jpg',
          name: 'Enjoy tech-enabled Live Shopping e-Commerce brands.',
          description: [
            { info: 'In-video purchase' },
            { info: 'Brand-owned experience control' },
            { info: 'Menu of Live Vendors to choose from.' },
            { info: 'Take control of your live sales events.' },
            { info: 'Grow your customer base every time you go live.' },
            {
              info: 'With Anne.biz, live stream shopping platform, you own your audience and brand.',
            },
          ],
          footer: 'Stand Out, Sell & Buy Live.',
        },
        {
          id: 'stored-videos-section',
          link: '/videos',
          title: 'Stored Videos',
          img: '/img/home/stored-videos.jpg',
          name: `“Anne.Biz travels the globe in search of the world’s most amazing
products. Products that are innovative, unique, effective and easy to
use. Products that really matter and can make a positive impact in
your life. “`,
          description: '',
          footer: '',
        },
        {
          id: 'prime-streaming-section',
          link: '/womens-fancy-sunglasses-black?id=60bb4351217f06075f56dea9',
          title: 'Prime Streaming',
          img: '/img/home/prime-streaming.jpg',
          name: `ENJOY UNPARALEL LIVE SHOPPING EXPERIENCE!
Unlock engagement, awareness with tech-enabled Live Shopping eCommerce brands.`,
          description: [
            { info: 'Schedule Streaming' },
            { info: 'Seamless Checkout' },
            { info: 'In-video purchase' },
            { info: 'Brand-owned experience control' },
            { info: 'One to one pre-scheduled Streaming.' },
            { info: 'Manu of Live Vendors to choose from.' },
            { info: 'Stored Videos' },
            { info: 'Brand-owned experience control' },
          ],
          footer: `Live | Publish | Lucky Draw | Schedule`,
        },
      ],
      items2: [
        {
          link: '/live',
          img: '/live-commerce/image-01-of-how-it-works.png',
          name: 'Grow your business with your own live shopping solution',
          description:
            'With AnneBiz you engage with customers virtually and send your products directly through video and chat.',
        },
        {
          link: '/live',
          img: '/live-commerce/image-02-of-how-it-works.png',
          name: 'Find out how we can help you reach more customers in just 5 minutes: Own the live sales experience ',
          description:
            'Once you have signed up for your account you will be able to publish live or recorded product showcases to your personal landing page or website.',
        },
        {
          link: '/live',
          img: '/live-commerce/image-03-of-how-it-works.png',
          name: 'Maximize reach for your live sales event',
          description:
            'Your live videos can also appear simultaniously on social media channels, For example Facebook, You Tube, Instagram and more. This will help you to grow your outreach and customer base each time you publish content.',
        },
        {
          link: '/live',
          img: '/live-commerce/image-04-of-how-it-works.png',
          name: 'Easily create engaging experience.',
          description:
            'People can now watch your videos and ofcourse purchase products, ask questions, and participete in lucky draws and much more.',
        },
        {
          link: '/live',
          img: '/live-commerce/image-05-of-how-it-works.png',
          name: 'Get more customers',
          description:
            'Everytime when viewers interact with your content, they will leave there contact details, growing your customer base over time.',
        },
        {
          link: '/live',
          img: '/live-commerce/image-06-of-how-it-works.png',
          name: 'No additional equipment needed',
          description: `You don't need any equipment other than your mobile phone, or a computer with a webcam. Of course, if you want you can also use professional studio equipment and create your own live shopping TV station.`,
        },
        {
          link: '/live',
          img: '/live-commerce/image-06-of-how-it-works.png',
          name: 'E-commerce platform included',
          description: `Use our build in checkout flow and start receiving orders, or integrate with your existing e-commerce platform.`,
        },
        {
          link: '/live',
          img: '/live-commerce/image-06-of-how-it-works.png',
          name: 'Start increasing e-commerce conversion',
          description: `Try with a free DEMO and take your live sales events to the next level.`,
        },
      ],
    }
  },
  head() {
    return {
      title: 'Landing',
    }
  },
  methods: {
    saveLanding(c) {
      this.$cookies.set('landing', 'ok', { path: '/' })
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.mid {
  height: 70vh;
}
</style>
