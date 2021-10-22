<template>
  <section class="bg-white min-h-screen">
    <Megamenu class="hidden lg:flex px-10" />

    <div
      class="
        container
        flex flex-col
        max-w-7xl
        mx-auto
        px-4
        md:px-10
        lg:px-16
        text-gray-800
      "
    >
      <h1
        class="
          text-5xl
          tracking-wide
          text-center
          pt-10
          pb-10
          border-b-2 border-gray-800
          mb-10
        "
      >
        About Us
      </h1>

      <div class="lg:relative mb-10 flex flex-col lg:flex-row">
        <img
          src="/island/about-us/models.webp"
          alt=""
          class="hidden lg:block"
        />

        <img
          src="/island/about-us/model1.webp"
          alt=""
          class="my-10 lg:hidden"
        />

        <div
          class="
            lg:absolute
            lg:left-0
            lg:top-0
            lg:flex
            lg:items-center
            lg:justify-center
            lg:w-1/2
            lg:h-1/3
          "
        >
          <div class="lg:max-w-xs p-5 lg:p-0 text-center lg:text-start">
            <h1 class="mb-5 text-2xl sm:text-4xl font-medium">Love fashion.</h1>
            <p class="my-2 lg:text-sm">
              With over 60 years of fashion retailing experience, River Island
              is one of the most well-known and loved brands on the High Street.
              We pride ourselves on our stylish, affordable fashion. Our
              customers can always rely on us to pick up everything they need
              from occasion wear, to amazing denim and fabulous bags and shoes.
            </p>
          </div>
        </div>

        <img
          src="/island/about-us/model2.webp"
          alt=""
          class="my-10 lg:hidden"
        />

        <div
          class="
            lg:absolute
            lg:right-0
            lg:bottom-0
            lg:flex
            lg:items-center
            lg:justify-center
            lg:w-1/2
            lg:h-1/3
          "
        >
          <div
            class="
              lg:max-w-xs
              p-5
              lg:p-0
              text-center
              lg:text-start
              flex flex-col-reverse
              lg:flex-col
            "
          >
            <p class="my-2 lg:text-sm">
              At River Island great design is at the heart of everything we
              create. Almost all of our products are designed in-house, and we
              are proud to deliver new and original fashion for you every single
              week.
            </p>
            <h1 class="mb-5 lg:mt-5 text-2xl sm:text-4xl font-medium">
              Love River Island.
            </h1>
          </div>
        </div>
      </div>

      <nuxt-link
        to="###"
        class="
          bg-gray-100
          flex flex-col-reverse
          lg:flex-row
          items-center
          justify-center
          lg:justify-end lg:space-x-10 lg:py-10
          mb-10
        "
      >
        <div
          class="
            p-10
            lg:p-0 lg:max-w-sm lg:float-right
            text-center
            lg:text-start
          "
        >
          <h1 class="mb-5 text-2xl sm:text-4xl font-medium">Shop Anywhere.</h1>

          <p class="mb-5 lg:text-sm">
            With over 300 stores across the UK, Ireland and internationally, as
            well as six dedicated online sites, it's time to get shopping!
          </p>

          <div class="flex flex-col mx-auto max-w-max lg:mx-0">
            <button
              class="
                mb-3
                bg-white
                rounded
                font-medium
                py-2
                focus:outline-none focus:ring-0 focus:ring-offset-0
                w-48
              "
            >
              Find a Store
            </button>

            <button
              class="
                bg-white
                rounded
                font-medium
                py-2
                focus:outline-none focus:ring-0 focus:ring-offset-0
                w-48
              "
            >
              Shop Now
            </button>
          </div>
        </div>

        <div class="lg:w-1/2">
          <img src="/island/about-us/mall-1.jpg" alt="" />
        </div>
      </nuxt-link>

      <nuxt-link to="##" class="relative mb-10 flex flex-col lg:flex-row">
        <img
          src="/island/about-us/sustainability.webp"
          alt=""
          class="hidden lg:block"
        />

        <img src="/island/about-us/family.webp" alt="" class="lg:hidden" />

        <div
          class="
            lg:absolute lg:right-0 lg:bottom-0
            flex
            items-center
            justify-center
            lg:w-1/2 lg:h-2/3
            green
          "
        >
          <div
            class="p-10 lg:p-0 lg:max-w-sm text-center lg:text-start text-white"
          >
            <h1 class="mb-5 text-2xl sm:text-4xl font-medium">
              Sustainability
            </h1>

            <p class="mb-5 lg:text-sm">
              Our commitment to building a relationship with the environment and
              our society that puts in more than it takes out.
            </p>

            <div class="mx-auto max-w-max lg:mx-0">
              <button
                class="
                  bg-white
                  text-gray-800
                  rounded
                  font-medium
                  lg:text-sm
                  py-2
                  sm:py-3
                  lg:py-2
                  focus:outline-none focus:ring-0 focus:ring-offset-0
                  w-48
                  sm:w-60
                  lg:w-48
                "
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </nuxt-link>

      <div
        class="
          mb-10
          flex flex-col
          lg:flex-row
          justify-center
          space-y-10
          lg:space-y-0 lg:space-x-10
        "
      >
        <div
          class="
            lg:w-1/2
            flex flex-col
            p-10
            border-2 border-black
            items-center
            justify-center
          "
        >
          <div class="max-w-md text-center">
            <h1 class="mb-5 text-2xl sm:text-4xl font-medium">
              Join the RI Fam
            </h1>

            <p class="mb-5 lg:text-sm">
              Ready to join one of the most successful fashion brands on the
              high street?
            </p>

            <button
              class="
                bg-black
                text-white
                uppercase
                font-semibold
                tracking-wide
                py-3
                w-full
                max-w-xs
                mx-auto
                focus:outline-none focus:ring-0 focus:ring-offset-0
              "
            >
              CAREERS AT RI
            </button>
          </div>
        </div>

        <div
          class="
            lg:w-1/2
            flex flex-col
            p-10
            border-2 border-black
            items-center
            justify-center
          "
        >
          <div class="max-w-md text-center">
            <h1 class="mb-5 text-2xl sm:text-4xl font-medium">
              Partner with RI
            </h1>

            <p class="mb-5 lg:text-sm">
              Interested in becoming a supplier, franchiser or affiliate? We'd
              love to hear from you.
            </p>

            <button
              class="
                bg-black
                text-white
                uppercase
                font-semibold
                tracking-wide
                py-3
                w-full
                max-w-xs
                mx-auto
                focus:outline-none focus:ring-0 focus:ring-offset-0
              "
            >
              Partner with Us
            </button>
          </div>
        </div>
      </div>

      <div class="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
        <nuxt-link to="##" class="relative flex flex-col">
          <img src="/island/about-us/model3.webp" alt="" />

          <div class="absolute inset-x-0 bottom-0 m-5">
            <div
              class="
                w-full
                bg-white
                py-2
                px-4
                rounded-md
                text-gray-800
                font-bold
                text-sm text-center
              "
            >
              Women
            </div>
          </div>
        </nuxt-link>

        <nuxt-link to="##" class="relative flex flex-col">
          <img src="/island/about-us/model4.webp" alt="" />

          <div class="absolute inset-x-0 bottom-0 m-5">
            <div
              class="
                w-full
                bg-white
                py-2
                px-4
                rounded-md
                text-gray-800
                font-bold
                text-sm text-center
              "
            >
              Men
            </div>
          </div>
        </nuxt-link>

        <nuxt-link to="##" class="relative flex flex-col">
          <img src="/island/about-us/model5.webp" alt="" />

          <div class="absolute inset-x-0 bottom-0 m-5">
            <div
              class="
                w-full
                bg-white
                py-2
                px-4
                rounded-md
                text-gray-800
                font-bold
                text-sm text-center
              "
            >
              Girls
            </div>
          </div>
        </nuxt-link>

        <nuxt-link to="##" class="relative flex flex-col">
          <img src="/island/about-us/model6.webp" alt="" />

          <div class="absolute inset-x-0 bottom-0 m-5">
            <div
              class="
                w-full
                bg-white
                py-2
                px-4
                rounded-md
                text-gray-800
                font-bold
                text-sm text-center
              "
            >
              Boys
            </div>
          </div>
        </nuxt-link>
      </div>

      <GallerySlider class="mb-10" :banners="sliderBanners" />
      <WantMore class="mb-20" />
      <!-- <WhiteFooter /> -->
    </div>
  </section>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import GallerySlider from '~/components/Island/GallerySlider.vue'
import WantMore from '~/components/Island/WantMore.vue'
import WhiteFooter from '~/components/Island/WhiteFooter.vue'

export default {
  components: { Megamenu, GallerySlider, WantMore, WhiteFooter },

  layout: 'none',

  data() {
    return {
      sliderBanners: null,
    }
  },

  head() {
    return {
      title: 'About',
    }
  },

  created() {
    this.getBanners()
  },

  methods: {
    async getBanners() {
      this.loading = true
      try {
        const banners = await this.$get('banner/banners', {
          sort: 'sort',
          pageId: 'home',
          active: true,
        })

        this.sliderBanners = banners.data.filter((b) => b.type === 'slider')
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
@media (max-width: 1024px) {
  .green {
    background-color: #0f5b32;
  }
}
</style>
