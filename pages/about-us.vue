<template>
  <main>
    <div
      class="
        flex
        items-center
        justify-center
        h-full
        py-10
        bg-gradient-to-tr
        from-primary-500
        to-secondary-500
        xl:h-112
      "
    >
      <div class="container max-w-6xl px-4 mx-auto md:px-10 xl:px-0">
        <h4 class="text-xl font-bold text-white sm:text-2xl md:text-4xl">
          A learning destination for Indians, covering academic, competitive and
          skills in all Indian languages
        </h4>
        <h4
          class="
            p-3
            mt-5
            text-xl
            font-bold
            bg-gradient-to-r
            from-gray-800
            via-gray-800
            to-gray-600
            shadow-4xl
            sm:text-2xl
            md:text-4xl
            text-primary-500
            max-w-max
          "
        >
          Online and Offline.
        </h4>

        <div class="flex flex-col my-10">
          <h4 class="text-base text-white sm:text-lg">
            Want to join us. See our Open Positions
          </h4>
          <nuxt-link
            to="/legal/job-vacancies"
            class="
              flex
              items-center
              mt-5
              text-base
              font-semibold
              text-white
              sm:text-lg
              hover:underline
              max-w-max
            "
          >
            <span>Open Positions</span>
            <div class="ms-3 transform -rotate-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
            </div>
          </nuxt-link>
        </div>

        <!-- <div class="relative text-white">

      <div class="flex flex-col items-center justify-center gap-5 uppercase xl:flex xl:flex-row xl:-mt-6 xl:items-center xl:justify-around">
        <div class="flex items-center gap-5 px-6 py-5 mt-5 transition bg-indigo-900 rounded-lg shadow-xl cursor-pointer group bg-opacity-40 ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 hover:bg-blue-900 hover:bg-opacity-100">
          <img class="w-9" src="data:image/svg+xml,%3C?xml version='1.0' encoding='utf-8'?%3E %3C!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E %3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 80 80' style='enable-background:new 0 0 80 80;' xml:space='preserve'%3E %3Cstyle type='text/css'%3E .st0%7Bfill:%23DD0031;%7D .st1%7Bfill:%23C3002F;%7D .st2%7Bfill:%23FFFFFF;%7D %3C/style%3E %3Cg%3E %3Cpolygon class='st0' points='40,0 40,0 40,0 2.8,13.3 8.4,62.5 40,80 40,80 40,80 71.6,62.5 77.2,13.3 '/%3E %3Cpolygon class='st1' points='40,0 40,8.9 40,8.8 40,49.4 40,49.4 40,80 40,80 71.6,62.5 77.2,13.3 '/%3E %3Cpath class='st2' d='M40,8.8L16.7,61l0,0h8.7l0,0l4.7-11.7h49.8L54.5,61l0,0h8.7l0,0L40,8.8L40,8.8L40,8.8L40,8.8L40,8.8z M46.8,42.2h43.2L40,25.8L46.8,42.2z'/%3E %3C/g%3E %3C/svg%3E" alt="" />
          <div>
            <span>Angular</span>
            <span class="block text-xs text-blue-300">Typescript</span>
          </div>
          <div>
            <i class="block transition transform -translate-x-1 opacity-0 fa fa-chevron-right group-hover:opacity-100 group-hover:translate-x-0"></i>
          </div>
        </div>

        <div class="flex items-center gap-5 px-6 py-5 mt-5 transition bg-indigo-900 rounded-lg shadow-xl cursor-pointer group bg-opacity-40 ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 hover:bg-blue-900 hover:bg-opacity-100">
          <img class="w-9" src="data:image/svg+xml,%3C?xml version='1.0' encoding='utf-8'?%3E %3C!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E %3Csvg version='1.1' id='Layer_2_1_' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 80 80' style='enable-background:new 0 0 80 80;' xml:space='preserve'%3E %3Cstyle type='text/css'%3E .st0%7Bfill:%2361DAFB;%7D %3C/style%3E %3Cg%3E %3Cpath class='st0' d='M80,40c0-5.3-6.6-10.3-16.8-13.4c2.3-10.4,1.3-18.6-3.3-21.3c-1.1-0.6-2.3-0.9-3.7-0.9V8 c0.8,0,1.4,0.1,1.9,0.4c2.2,1.3,3.2,6.1,2.4,12.3c-0.2,1.5-0.5,3.1-0.8,4.8c-3.2-0.8-6.7-1.4-10.4-1.8c-2.2-3-4.5-5.8-6.8-8.2 C47.9,10.7,52.9,8,56.3,8V4.4l0,0c-4.5,0-10.4,3.2-16.3,8.7C34,7.6,28.2,4.4,23.7,4.4v3.6c3.4,0,8.4,2.7,13.7,7.6 c-2.3,2.4-4.6,5.1-6.7,8.1c-3.7,0.4-7.2,1-10.4,1.8c-0.4-1.6-0.7-3.2-0.8-4.7c-0.8-6.2,0.2-11.1,2.4-12.4c0.5-0.3,1.1-0.4,1.9-0.4 V4.5l0,0c-1.4,0-2.6,0.3-3.7,0.9c-4.6,2.6-5.6,10.9-3.2,21.2C6.6,29.7,0,34.7,0,40c0,5.3,6.6,10.3,16.8,13.4 c-2.3,10.4-1.3,18.6,3.3,21.3c1.1,0.6,2.3,0.9,3.7,0.9c4.5,0,10.4-3.2,16.3-8.7c5.9,5.5,11.8,8.7,16.3,8.7c1.4,0,2.6-0.3,3.7-0.9 c4.6-2.6,5.6-10.9,3.2-21.2C73.4,50.3,80,45.3,80,40z M58.8,29.1c-0.6,2.1-1.4,4.3-2.2,6.4c-0.7-1.3-1.4-2.6-2.1-3.9 c-0.8-1.3-1.5-2.6-2.3-3.8C54.4,28.2,56.6,28.6,58.8,29.1z M51.3,46.5c-1.3,2.2-2.6,4.3-3.9,6.2c-2.4,0.2-4.9,0.3-7.4,0.3 c-2.5,0-4.9-0.1-7.3-0.3c-1.4-1.9-2.7-4-3.9-6.2c-1.2-2.1-2.4-4.3-3.4-6.5c1-2.2,2.2-4.4,3.4-6.5c1.3-2.2,2.6-4.3,3.9-6.2 c2.4-0.2,4.9-0.3,7.4-0.3c2.5,0,4.9,0.1,7.3,0.3c1.4,1.9,2.7,4,3.9,6.2c1.2,2.1,2.4,4.3,3.4,6.5C53.7,42.2,52.5,44.4,51.3,46.5z M56.6,44.4c0.9,2.2,1.6,4.4,2.3,6.5c-2.1,0.5-4.4,1-6.7,1.3c0.8-1.3,1.6-2.5,2.3-3.9C55.2,47,55.9,45.7,56.6,44.4z M40,61.8 c-1.5-1.6-3-3.3-4.5-5.2c1.5,0.1,3,0.1,4.5,0.1c1.5,0,3,0,4.5-0.1C43.1,58.5,41.5,60.2,40,61.8z M27.9,52.2 c-2.3-0.3-4.5-0.8-6.7-1.3c0.6-2.1,1.4-4.3,2.2-6.4c0.7,1.3,1.4,2.6,2.1,3.9C26.3,49.7,27.1,50.9,27.9,52.2z M40,18.2 c1.5,1.6,3,3.3,4.5,5.2c-1.5-0.1-3-0.1-4.5-0.1c-1.5,0-3,0-4.5,0.1C36.9,21.5,38.5,19.8,40,18.2z M27.9,27.8 c-0.8,1.3-1.6,2.5-2.3,3.9c-0.8,1.3-1.5,2.6-2.1,3.9c-0.9-2.2-1.6-4.4-2.3-6.5C23.3,28.6,25.6,28.2,27.9,27.8z M13.1,48.3 c-5.8-2.5-9.5-5.7-9.5-8.3c0-2.6,3.7-5.8,9.5-8.3c1.4-0.6,2.9-1.1,4.5-1.6c0.9,3.2,2.2,6.5,3.7,9.9c-1.5,3.4-2.7,6.7-3.6,9.9 C16.1,49.4,14.6,48.9,13.1,48.3z M21.9,71.6c-2.2-1.3-3.2-6.1-2.4-12.3c0.2-1.5,0.5-3.1,0.8-4.8c3.2,0.8,6.7,1.4,10.4,1.8 c2.2,3,4.5,5.8,6.8,8.2C32.1,69.3,27.1,72,23.8,72C23,72,22.4,71.8,21.9,71.6z M60.6,59.1c0.8,6.2-0.2,11.1-2.4,12.4 c-0.5,0.3-1.1,0.4-1.9,0.4c-3.4,0-8.4-2.7-13.7-7.6c2.3-2.4,4.6-5.1,6.7-8.1c3.7-0.4,7.2-1,10.4-1.8C60.1,56,60.4,57.6,60.6,59.1z M66.9,48.3c-1.4,0.6-2.9,1.1-4.5,1.6c-0.9-3.2-2.2-6.5-3.7-9.9c1.5-3.4,2.7-6.7,3.6-9.9c1.6,0.5,3.1,1.1,4.6,1.7 c5.8,2.5,9.5,5.7,9.5,8.3C76.4,42.6,72.6,45.8,66.9,48.3z'/%3E %3Cpath class='st0' d='M23.7,4.4L23.7,4.4L23.7,4.4z'/%3E %3Ccircle class='st0' cx='40' cy='40' r='7.5'/%3E %3Cpath class='st0' d='M56.2,4.4L56.2,4.4L56.2,4.4z'/%3E %3C/g%3E %3C/svg%3E" alt="" />
          <div>
            <span>React</span>
            <span class="block text-xs text-blue-300">Javascript</span>
          </div>
          <div>
            <i class="block transition transform -translate-x-1 opacity-0 fa fa-chevron-right group-hover:opacity-100 group-hover:translate-x-0"></i>
          </div>
        </div>

        <div class="flex items-center gap-5 px-6 py-5 mt-5 transition bg-indigo-900 rounded-lg shadow-xl cursor-pointer group bg-opacity-40 ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 hover:bg-blue-900 hover:bg-opacity-100">
          <img class="w-9" src="data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='36px' height='30px' viewBox='0 0 36 30' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E %3Ctitle%3EUntitled%3C/title%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Crect id='Rectangle' fill='%231389FD' x='15' y='21' width='21' height='7' rx='3.5'%3E%3C/rect%3E %3Ctext id='BETA' font-family='Roboto-Medium, Roboto' font-size='5' font-weight='400' fill='%23FFFFFF'%3E %3Ctspan x='22' y='26'%3EBETA%3C/tspan%3E %3C/text%3E %3Cg id='vue' fill-rule='nonzero'%3E %3Cg id='Group' transform='translate(18.000000, 15.000000) scale(-1, 1) rotate(-180.000000) translate(-18.000000, -15.000000) translate(-0.000000, -0.000000)'%3E %3Cg transform='translate(0.010406, 0.001744)' fill='%2341B883' id='Path'%3E %3Cpolygon points='20.9853249 29.8255814 17.053785 22.9772093 13.1222451 29.8255814 0.0296569468 29.8255814 17.053785 0.170930233 34.0779131 29.8255814'%3E%3C/polygon%3E %3C/g%3E %3Cg transform='translate(6.774271, 11.862209)' fill='%2334495E' id='Path'%3E %3Cpolygon points='14.2214599 17.9651163 10.28992 11.1167442 6.35838003 17.9651163 0.0754431103 17.9651163 10.28992 0.172674419 20.5043968 17.9651163'%3E%3C/polygon%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E" alt="" />
          <div>
            <span>Vue</span>
            <span class="block text-xs text-blue-300">v3 (beta)</span>
          </div>
          <div>
            <i class="block transition transform -translate-x-1 opacity-0 fa fa-chevron-right group-hover:opacity-100 group-hover:translate-x-0"></i>
          </div>
        </div>

      </div>
    </div> -->
      </div>
    </div>
    <div class="container max-w-6xl px-4 mx-auto md:px-10 xl:px-0">
      <div class="px-2 my-8 text-center md:my-16">
        <h4 class="text-2xl font-bold md:text-4xl">About Us</h4>
        <h4 class="mt-5 md:mt-10">
          <nuxt-link to="/" class="link">anne.biz </nuxt-link> provides a
          platform to learn from the Experts (e.g. Educators, Learning
          Specialists, Researchers) to promote learning, covering academic,
          competitive and skills through customized designed content in the form
          of Videos, Notes, MCQs as well as Online and Offline Tuitions in all
          Indian Languages.
        </h4>

        <!-- <h4 class="mt-5">
        Our mission is to share knowledge through customized designed content in the form of Videos,
        Notes, MCQs as well as Online and Offline Tuitions in all Indian Languages and to provide
        interactive, fun and superior learning experience.
        <span class="text-blue-500 cursor-pointer">anne.biz</span> provides a platform to learn from
        the Experts (e.g. Educators, Learning Specialists, Researchers) to promote learning,
        including academic, social-emotional, physical and creative learning, learning basic life
        skills, critical thinking, problem solving and more.
      </h4> -->
      </div>

      <div
        class="
          grid grid-cols-1
          gap-8
          p-8
          bg-gray-200
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        <div class="flex-1 p-2 mt-6 text-center bg-white rounded-md">
          <div
            class="
              flex
              items-center
              justify-center
              mx-auto
              bg-gray-300
              border-4 border-white
              rounded-full
              -mt-9
              w-14
              h-14
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-gray-400 transform -rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h4.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </div>
          <h4 class="mt-2 text-xl font-bold text-gray-600">Mission</h4>
          <h6 class="m-4 text-sm">
            To share knowledge through customized designed content in the form
            of Videos, Notes, MCQs as well as Online and Offline Tuitions in all
            Indian Languages and to provide interactive, fun and superior
            learning experience.
          </h6>
        </div>

        <div class="flex-1 p-2 mt-6 text-center bg-white rounded-md">
          <div
            class="
              flex
              items-center
              justify-center
              mx-auto
              bg-gray-300
              border-4 border-white
              rounded-full
              -mt-9
              w-14
              h-14
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h4 class="mt-2 text-xl font-bold text-gray-600">Vision</h4>
          <h6 class="m-4 text-sm">
            To become a learning destination for Indians, covering academic,
            competitive and skills in all Indian languages both Offline and
            Online.
          </h6>
        </div>

        <div
          class="
            flex-1
            p-2
            mt-6
            text-center
            bg-white
            rounded-md
            sm:col-span-2
            lg:col-span-1
          "
        >
          <div
            class="
              flex
              items-center
              justify-center
              mx-auto
              bg-gray-300
              border-4 border-white
              rounded-full
              -mt-9
              w-14
              h-14
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-400 transform -rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h4zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2h4a1 1 0 000 2h4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h4 class="mt-2 text-xl font-bold text-gray-600">Core Values</h4>
          <div class="m-4 mx-auto text-sm text-start max-w-max">
            <ul class="space-y-1 list-disc">
              <li>Learning Every Moment</li>
              <li>Respect Students Trust</li>
              <li>Nurturing Aspiring Minds</li>
              <li>Result Oriented</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="px-2 my-8 text-center md:my-16">
        <h4 class="text-2xl font-bold md:text-4xl">Platforms</h4>
        <h4 class="mt-5 md:mt-10">
          Our mission is to share knowledge through customized designed content
          in the form of Videos, Notes, MCQs as well as Online and Offline
          Tuitions in all Indian Languages and to provide interactive, fun and
          superior learning experience.
          <nuxt-link to="/" class="link">anne.biz </nuxt-link> provides a
          platform to learn from the Experts (e.g. Educators, Learning
          Specialists, Researchers) to promote learning, including academic,
          social-emotional, physical and creative learning, learning basic life
          skills, critical thinking, problem solving and more.
        </h4>
      </div>

      <div class="px-2 my-8 md:my-16">
        <VueSlickCarousel v-bind="settings">
          <div v-for="i in socialmedia" :key="i.id" class="flex flex-row mt-10">
            <a :href="i.link">
              <div
                class="
                  p-8
                  m-2
                  bg-white
                  border-b-4 border-transparent
                  rounded-lg
                  hover:border-primary-500
                "
              >
                <div class="flex flex-col items-center justify-center">
                  <img
                    v-lazy="`${i.image}?tr=w-64,h-64,fo-auto`"
                    class="w-16 h-16"
                    alt="Social Media Link"
                  />
                  <h4 class="mt-2 font-semibold">{{ i.name }}</h4>
                </div>
              </div>
            </a>
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </main>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  name: 'MyComponent',
  components: { VueSlickCarousel, NuxtLink },
  data() {
    return {
      settings: {
        dots: true,
        infinite: true,
        initialSlide: 2,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },

          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              // infinite: true,
              centerMode: true,
              dots: false,
              centerPadding: '10px',
            },
          },

          // {
          //   breakpoint: 576,
          //   settings: {
          //     arrows: false,
          //     slidesToShow: 2,
          //     centerMode: true,
          //     // infinite: true,
          //     centerPadding: '30px',
          //     slidesToShow: 1,
          //   },
          // },
        ],
      },
      socialmedia: [
        {
          name: 'FaceBook',
          image: '/img/instagram2.png',
          link: 'https://www.facebook.com/anne.biz',
        },
        {
          name: 'Twitter',
          image: '/img/instagram3.png',
          link: 'https://twitter.com/anne_India',
        },
        {
          name: 'Youtube',
          image: '/img/instagram1.png',
          link: 'https://www.youtube.com/channel/UCshs7YQJErO-Wy058REL4yw',
        },
        {
          name: 'Instagram',
          image: '/img/instagram.png',
          link: 'https://www.bizstagram.com/anne.biz/',
        },
      ],
    }
  },

  head() {
    return {
      title: 'About Us',
    }
  },
}
</script>

<style scoped>
.slick-prev {
  margin-left: -10px;
}

/* .slick-next {
  margin-right: -5px;
} */

.slick-dots {
  opacity: 0%;
  opacity: 0px;
}

.slick-prev::before,
.slick-next::before {
  font-family: 'slick';
  font-size: 50px;
  z-index: 1;
  line-height: 1.2;
  opacity: 0.75;
  color: rgba(251, 120, 1, 1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a.hover {
  color: blue;
}

/* @media screen and (max-width: 400px) {
  .slick-prev {
    left: -10px;
  }
  .slick-next {
    right: -10px;
  }
} */
</style>
