<template>
  <div class="bg-white">
    <div class="relative mt-4 overflow-hidden bg-white xl:mt-0 max-h-112">
      <div class="">
        <div
          class="
            relative
            z-10
            pb-8
            bg-gray-100
            sm:pb-16
            md:pb-20
            lg:max-w-3xl lg:w-full
          "
        >
          <svg
            class="
              absolute
              inset-y-0
              right-0
              hidden
              w-48
              h-full
              text-gray-100
              transform
              translate-x-1/2
              lg:block
            "
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div class="relative px-4 pt-2 sm:px-6 lg:px-8">
            <nav
              class="
                relative
                flex
                items-center
                justify-between
                sm:h-10
                lg:justify-start
              "
              aria-label="Global"
            >
              <div
                class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0"
              >
                <div
                  class="flex items-center justify-between w-full md:w-auto"
                ></div>
              </div>
            </nav>
          </div>

          <div
            class="
              absolute
              inset-x-0
              top-0
              p-2
              transition
              origin-top-right
              transform
              md:hidden
            "
          />

          <main
            class="
              px-4
              container
              mx-auto
              mt-2
              sm:mt-8 sm:px-6
              md:mt-12
              lg:px-8
              xl:px-16
            "
          >
            <div class="text-center lg:text-start">
              <h1
                class="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                  sm:text-4xl
                  md:text-5xl
                  flex flex-col
                "
              >
                <span class="block xl:inline">Grow Your Career With Us</span>
                <span class="mt-5 block text-indigo-600 xl:inline"
                  >ANNE.BIZ</span
                >
              </h1>
              <p
                class="
                  mt-3
                  text-base text-gray-500
                  sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto
                  md:mt-5 md:text-xl
                  lg:mx-0
                "
              >
                You give us Quality, we will take care of your Job Satisfaction
                and Remuneration.
              </p>
              <div
                class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
              >
                <button
                  class="
                    relative
                    w-48
                    px-6
                    py-2
                    my-5
                    text-white
                    font-medium
                    tracking-wide
                    bg-yellow-500
                    hover:bg-yellow-600
                    rounded-md
                    shadow-md
                    transition
                    duration-300
                    focus:outline-none focus:ring-0 focus:ring-offset-0
                    group
                  "
                >
                  <span
                    class="
                      absolute
                      top-0
                      right-0
                      inline-flex
                      w-3
                      h-3
                      bg-yellow-500
                      group-hover:bg-yellow-600
                      rounded-full
                      animate-ping
                    "
                  />
                  Apply Now
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="hidden lg:absolute xl:block lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          v-lazy="`/img/home/fashion-designer.jpg?tr=h-384,fo-auto`"
          alt=""
          class="
            object-contain object-center
            w-full
            h-56
            xl:object-cover
            sm:h-full
            md:h-96
            lg:w-full lg:h-full
          "
        />
      </div>
    </div>

    <!-- Image Gallery -->
    <div
      class="flex flex-row items-center justify-between w-full mt-12 border-b"
    >
      <div class="flex flex-col ps-4">
        <h3 class="text-3xl font-bold">Gallery</h3>
        <span class="mt-5 mb-2 font-medium text-grey-dark"
          >A Place That's Meant For You</span
        >
      </div>
    </div>
    <div id="root" class="mt-2 grid-container">
      <figure
        v-for="i in images"
        :key="i.id"
        class="object-contain object-center gallery-img geeks"
      >
        <img
          v-lazy="i"
          class="object-contain rounded-sm"
          alt="Some Specfic Moments in Anne "
        />
      </figure>
    </div>

    <!-- What We Technology Use -->
    <div class="hidden mt-8 ms-4 xl:block">
      <p class="text-3xl font-bold">Technologies we use</p>
    </div>
    <div class="p-1 xl:m-4">
      <VueSlickCarousel
        v-bind="settings"
        class="
          flex flex-row
          items-center
          justify-between
          w-full
          h-full
          py-4
          xl:ps-6 xl:pe-6
        "
        :arrows="true"
        :dots="true"
      >
        <div
          v-for="i in img"
          :key="i.id"
          class="flex flex-row items-center justify-center"
        >
          <img
            v-lazy="`${i}?tr=w-128,h-128,fo-auto`"
            class="
              object-contain object-center
              w-32
              h-32
              p-1
              bg-purple-200
              rounded-full
              shadow-lg
            "
            alt="Technology Icon"
          />
        </div>
      </VueSlickCarousel>
    </div>
    <!--  -->
    <div class="px-4 mt-10 xl:px-6">
      <div
        class="
          relative
          flex flex-col
          items-center
          justify-between
          h-auto
          p-8
          bg-blue-100
          rounded-lg
          shadow-lg
          md:flex-row
          w-100
          md:h-64
        "
      >
        <div class="w-full text-2xl xl:w-8/12 mx-auto">
          <i>
            <q class="w-auto tracking-widest fonts">
              Join us if you are passionate about Teaching and ready to put your
              100% effort with dedication. You promise the Best Quality, we
              guarantee your Job Satisfaction and Remuneration.
            </q>
          </i>
        </div>
        <button
          class="
            relative
            w-48
            px-6
            py-2
            my-5
            text-white
            font-medium
            tracking-wide
            bg-yellow-500
            hover:bg-yellow-600
            rounded-md
            shadow-md
            transition
            duration-300
            focus:outline-none focus:ring-0 focus:ring-offset-0
            group
          "
        >
          <span
            class="
              absolute
              top-0
              right-0
              inline-flex
              w-3
              h-3
              bg-yellow-500
              group-hover:bg-yellow-600
              rounded-full
              animate-ping
            "
          />
          Apply Now
        </button>
      </div>
    </div>
    <!--  -->
    <div class="px-4 mt-8 mb-4 xl:px-6 xl:mt-16">
      <div
        class="
          flex flex-col
          items-center
          justify-between
          w-full
          h-full
          p-4
          bg-gray-100
          rounded-lg
          shadow-2xl
          xl:flex-row xl:p-0
        "
      >
        <div
          class="
            flex flex-col
            items-center
            justify-center
            w-full
            text-2xl
            xl:w-1/2 xl:flex-col
          "
        >
          <div class="flex flex-col items-start justify-start text-gray-600">
            <div class="flex items-center font-medium text-3xl -ms-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Benefits at Anne</span>
            </div>
            <ul class="ps-2 space-y-2 text-sm list-disc list-inside">
              <li class="text-sm font-medium xl:text-lg">Fair Compensation</li>
              <li class="text-sm font-medium xl:text-lg">
                Recognition & Appreciation
              </li>
              <li class="text-sm font-medium xl:text-lg">
                Freedom of experiment
              </li>
              <li class="text-sm font-medium xl:text-lg">
                Professional development opportunities
              </li>
            </ul>
          </div>
          <div class="block object-contain w-full mt-4 bg-purple-400 xl:hidden">
            <img
              class="w-full"
              src="https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
          </div>
        </div>
        <div class="hidden object-contain w-1/2 bg-purple-400 xl:block">
          <img
            class="w-full"
            src="https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
        </div>
      </div>
    </div>

    <!--  -->
    <main class="my-8 mt-12">
      <div class="flex flex-col items-center justify-center">
        <div
          class="
            flex flex-col
            items-center
            justify-center
            w-16
            h-16
            p-1
            bg-purple-100
            rounded-full
            shadow-lg
          "
        >
          <img
            v-lazy="`/suitcase.svg?tr=w-48,h-48,fo-auto`"
            alt=""
            class="object-center w-12 h-12"
          />
        </div>
        <span class="pt-4 text-xl font-bold text-gray-700 opacity-90"
          >15 positions open</span
        >
        <span
          class="
            pt-2
            text-lg
            font-normal
            text-center text-gray-700
            stroke-2
            opacity-90
          "
          ><b class="font-bold text-blue-500 cursor-pointer">allfields</b> in
          all
          <b class="font-bold text-blue-500 cursor-pointer">Locations</b>
        </span>
      </div>
    </main>
    <!-- 
    <div class="">
      <div class="flex flex-col items-start justify-start">
        <span
          class="pt-4 ps-4 text-xl font-bold text-gray-700 xl:ps-6 opacity-90"
          >Recent Job Posts</span
        >
      </div>
      <div class="pb-4 ms-4 me-4 xl:ms-6 xl:me-4">
        <div class="w-full lg:w-full xl:grid xl:grid-cols-3 xl:gap-4">
          <div v-for="i in datalist" :key="i.id" class="mt-6">
            <div
              class="
                relative
                max-w-full
                px-4
                py-2
                bg-white
                border
                rounded-lg
                shadow-md
                xl:px-6
                xl:py-4
              "
            >
              <div class="w-1/2 mt-1">
                <img v-lazy="`${i.image}?tr=w-48,h-48,fo-auto`" class="w-12 h-12 rounded-md" alt="" />
              </div>
              <div class="absolute top-3 right-2">
                <div class="relative cursor-pointer dropdown">
                  <button
                    class="
                      z-10
                      inline-block
                      text-gray-700
                      rounded
      focus:outline-none focus:ring-0 focus:ring-offset-0
                    "
                  >
                    <svg
                      class="w-6 h-6 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="py-2 text-start">
                <span
                  v-if="i.juniorsection"
                  class="
                    text-xl
                    font-bold
                    text-center text-gray-700
                    hover:underline
                  "
                  >{{ i.juniorsection }} Expert</span
                >
                <span
                  v-else
                  class="text-xl font-bold text-gray-700 hover:underline"
                  >{{ i.seniorsection }} Expert</span
                >
              </div>

              <div class="w-full xl:w-full">
                <a
                  v-if="i.juniorsection"
                  href="#"
                  class="
                    text-lg
                    font-medium
                    text-gray-700
                    hover:line-clamp-2
                    line-clamp-1
                  "
                  >{{ i.name }} ({{ i.juniorsection }})
                </a>
                <a
                  v-else
                  href="#"
                  class="
                    w-full
                    text-lg
                    font-medium
                    text-gray-700
                    line-clamp-1
                    hover:line-clamp-2
                  "
                  >{{ i.name }} ({{ i.seniorsection }})
                </a>
              </div>

              <div>
                <ol
                  class="
                    inline-block
                    px-6
                    mb-4
                    text-sm
                    list-disc
                    border-gray-400
                    description
                    line-clamp-5
                  "
                >
                  <b class="-ms-6">Annual Salary:-</b>
                  <li>1.2 Lakhs to 2.5 Lakhs + Incentive</li>
                </ol>

                <ol
                  class="
                    inline-block
                    px-6
                    mb-4
                    text-sm
                    list-disc
                    border-gray-400
                    description
                    line-clamp-5
                  "
                >
                  <b class="-ms-6">Job Location:-</b>
                  <li>Semiliguda, Koraput Dist., Odisha</li>
                </ol>

                <ol
                  class="
                    inline-block
                    px-6
                    mb-4
                    text-sm
                    list-decimal
                    border-gray-400
                    description
                    line-clamp-5
                  "
                >
                  <b class="-ms-6"> Our Expectations:-</b>
                  <li>Ready to Teach Offline + Online,</li>
                  <li>Graduation in the applied Subject,</li>
                  <li>Innovative Teaching Technique.</li>
                </ol>

                <p
                  class="
                    block
                    py-1
                    text-sm
                    border-gray-400
                    description
                    line-clamp-5
                  "
                >
                  Drop your CV Now:
                  <b class="text-blue-500 underline text-md">
                    <mark class="px-1 text-gray-600 bg-blue-200"
                      >contact@anne.biz</mark
                    >
                  </b>
                  <br />
                  <span class="text-xs xl:whitespace-nowrap"
                    >(Mention Subject Name and Section -Junior or Senior)</span
                  >
                </p>
              </div>

              <div class="">
                <div class="flex flex-wrap">
                  <div class="w-full py-2 lg:w-full">
                    <details class="w-full mb-4">
                      <summary
                        class="
                          text-xs
                          font-normal
                          rounded-md
                          cursor-pointer
                          focus:outline-none
                        "
                      >
                        read More
                      </summary>

                      <span
                        class="
                          block
                          py-1
                          text-sm
                          border-gray-400
                          description
                          line-clamp-5
                        "
                      >
                        <b> Note:-</b> Our Batch Size is small (10-12 students
                        per batch). Your responsibilities will be limited to one
                        subject only. We expect the Best Quality in Teaching,
                        making Notes, Mcqs, and related content in your
                        Subject.</span
                      >
                      <span
                        class="
                          flex flex-row
                          pt-1
                          list-disc
                          border-gray-400
                          description
                          text-md
                          line-clamp-5
                        "
                      >
                        <b> Last Date of Application:-</b>
                        <div class="flex items-center justify-between">
                          <span class="font-medium text-gray-600"
                            >{{ i.time }}
                          </span>
                        </div></span
                      >
                    </details>
                  </div>
                </div>
              </div>

              <div class="flex flex-row items-center justify-end">
                <img src="" alt="" />
                <button
                  type="submit"
                  class="
                    flex flex-row
                    items-center
                    justify-center
                    px-2
                    py-2
                    text-sm text-gray-700
                    bg-gray-400
                    rounded-sm
                    w-36
                    hover:text-white
                    hover:bg-gray-500
                      focus:outline-none focus:ring-0 focus:ring-offset-0

                  "
                >
                  <img v-lazy="`https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg?tr=w-24,h-24,fo-auto`"
                    alt=""
                    class="w-6 h-6 pe-2"
                  />
                  Drop your Cv
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex-row items-center justify-between w-full pt-4 mt-2 bg-gray-100"
    >
      <h3
        class="
          flex flex-col
          items-center
          justify-center
          text-2xl
          font-bold
          text-center
          underline
        "
      >
        Life at Anne
      </h3>
    </div>
    <div class="-mt-4 bg-gray-100">
      <VueSlickCarousel class="text-purple-400" v-bind="setting">
        <div
          v-for="i in AuthorList"
          :key="i.id"
          class="container mb-4 focus:outline-none"
        >
          <div class="bg-opacity-50 section ourTeam">
            <div
              class="
                flex flex-row
                items-center
                justify-between
                m-4
                focus:outline-none
              "
            >
              <div class="i">
                <div class="text-center c">
                  <div class="font-bold text-white wrap h-80 xl:h-92">
                    <img
                      v-lazy="i.image"  alt=""
                      class="
                        object-contain
                        aspect-w-1 aspect-h-1
                        img-responsive
                      "
                    />
                    <div class="mt-4 bg-purple-600 info">
                      <h3 class="text-sm">{{ i.name }}</h3>
                      <h4 class="position">{{ i.Position }}</h4>
                    </div>
                  </div>
                  <div
                    class="
                      text-white
                      xl:p-10
                      more
                      hover:bg-transparent
                      opacity-90
                    "
                  >
                    <p>
                      I’m lucky to be a part of such an organisation that is
                      touching million student lives daily. There is a feeling
                      of immense responsibility to constantly innovate and
                      deliver quality education using technology. Each day is a
                      new challenge which keeps me pumped..
                    </p>
                    <div class="socials">
                      <a href="#" title="#" class="facebook"
                        ><svg
                          fill="currentColor"
                          class="w-6 h-6 m-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                          /></svg
                      ></a>
                      <a href="#" title="#" class="twitter"
                        ><svg
                          fill="currentColor"
                          class="w-6 h-6 m-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M 21.800781 0 L 2.199219 0 C 1 0 0 1 0 2.199219 L 0 21.800781 C 0 23 1 24 2.199219 24 L 21.800781 24 C 23 24 24 23 24 21.800781 L 24 2.199219 C 24 1 23 0 21.800781 0 Z M 7 20 L 3 20 L 3 9 L 7 9 Z M 5 7.699219 C 3.800781 7.699219 3 6.898438 3 5.898438 C 3 4.800781 3.800781 4 5 4 C 6.199219 4 7 4.800781 7 5.800781 C 7 6.898438 6.199219 7.699219 5 7.699219 Z M 21 20 L 17 20 L 17 14 C 17 12.398438 15.898438 12 15.601563 12 C 15.300781 12 14 12.199219 14 14 C 14 14.199219 14 20 14 20 L 10 20 L 10 9 L 14 9 L 14 10.601563 C 14.601563 9.699219 15.601563 9 17.5 9 C 19.398438 9 21 10.5 21 14 Z"
                          /></svg
                      ></a>
                      <a href="#" title="#" class="google-plus"
                        ><svg
                          fill="currentColor"
                          class="w-6 h-6 m-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                          /></svg
                      ></a>
                      <a href="#" title="#" class="linkedin">
                        <svg
                          fill="currentColor"
                          class="w-6 h-6 m-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12,0C5.373,0,0,5.373,0,12c0,6.016,4.432,10.984,10.206,11.852V15.18H7.237v-3.154h2.969V9.927c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L16.73,15.18h-3.106v8.697 C19.481,23.083,24,18.075,24,12C24,5.373,18.627,0,12,0z"
                          /></svg
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
     -->
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: {
    VueSlickCarousel,
  },

  props: ['details', 'type', 'title'],

  data() {
    return {
      path: null,
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },

          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },

          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              centerMode: true,
              dots: false,
              centerPadding: '30px',
            },
          },
        ],
      },
      setting: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 4000,
        cssEase: 'linear',
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

      menuVisible: false,

      datalist: [
        {
          name: 'Junior Section Class I-VI',
          juniorsection: 'English',
          time: '05.05.2021',
          image: '/class.png',
        },
        {
          name: 'Junior Section Class I-VI',
          juniorsection: 'Hindi',
          time: '05.05.2021',
          image: '/class.png',
        },
        {
          name: 'Junior Section Class I-VI',
          juniorsection: 'Odia',
          time: '05.05.2021',
          image: '/class.png',
        },
        {
          name: 'Junior Section Class I-VI',
          juniorsection: 'Mathematics',
          time: '05.05.2021',
          image: '/class.png',
        },
        {
          name: 'Junior Section Class I-VI',
          juniorsection: 'EVS',
          time: '05.05.2021',
          image: '/class.png',
        },

        {
          name: 'Senior Section Class VII-X',
          seniorsection: 'English',
          time: '05.05.2021',
          image: '/classes.png',
        },
        {
          name: 'Senior Section Class VII-X',
          seniorsection: 'Hindi',
          time: '05.05.2021',
          image: '/classes.png',
        },
        {
          name: 'Senior Section Class VII-X',
          seniorsection: 'Odia',
          time: '05.05.2021',
          image: '/classes.png',
        },
        {
          name: 'Senior Section Class VII-X',
          seniorsection: 'Mathematics',
          time: '05.05.2021',
          image: '/classes.png',
        },
        {
          name: 'Senior Section Class VII-X',
          seniorsection: 'Geography',
          time: '05.05.2021',
          image: '/classes.png',
        },
        {
          name: 'Senior Section Class VII-X',
          seniorsection: 'Civics',
          time: '05.05.2021',
          image: '/classes.png',
        },
        {
          name: 'Senior Section Class VII-X',
          seniorsection: 'History',
          time: '05.05.2021',
          image: '/classes.png',
        },
        {
          name: 'Senior Section Class VII-X',
          seniorsection: 'Physics',
          time: '05.05.2021',
          image: '/classes.png',
        },
        {
          name: 'Senior Section Class VII-X',
          seniorsection: ' Chemistry',
          time: '05.05.2021',
          image: '/classes.png',
        },
        {
          name: 'Senior Section Class VII-X',
          seniorsection: ' Biology',
          time: '05.05.2021',
          image: '/classes.png',
        },
      ],

      img: [
        'https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
        'https://nuxtjs.org/logos/nuxt.svg',
        'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
        'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg',
        'https://tailwindcss.com/_next/static/media/tailwindcss-mark.cb8046c163f77190406dfbf4dec89848.svg',
        'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
        'https://upload.wikimedia.org/wikipedia/en/4/45/MongoDB-Logo.svg',
        'https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2019/07/image2-1.png',
      ],

      images: [
        'https://www.thecuriousreader.in/wp-content/uploads/2019/04/Feature-_Should-shakespeare-still-be-taught-in-indian-schools-.png',
        '/img/career/teacherProfile1.jpg',
        '/img/career/gallery11.jpg',
        '/img/career/teacher4.png',
        '/img/career/gallery1.jpg',
        '/img/career/gallery2.jpg',
        '/img/career/gallery10.jpg',
        '/img/career/gallery5.jpg',
        '/img/career/gallery4.jpeg',
        '/img/career/gallery6.jpg',
        '/img/career/gallery3.jpg',
      ],

      AuthorList: [
        {
          name: 'Dharmendra Maurya',
          Position: 'Junior Web Developer',
          image: '/img/career/teacher2.jpg',
        },
        //  {name:"Dhanraj Roy",Position:"Founder anne.biz", image:""},
        //  {name:"Naman Khurana",Position:"Web Developer", image:"" },
        {
          name: 'Prakash Jayaswal',
          Position: 'FullStack Developer',
          image: '/img/career/teacher1.jpg',
        },
        {
          name: 'Jyoti Rai',
          Position: 'Faculty Co-ordinator',
          image: '/img/career/maddem1.jpg',
        },
      ],
    }
  },

  head() {
    return {
      title: 'Career',
    }
  },

  mounted() {},

  methods: {
    clickMenu() {
      this.menuVisible = !this.menuVisible
    },
  },
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}

.ourTeam .i {
  width: 100%;
  margin-top: 30px;
}

.ourTeam .i .c {
  background: linear-gradient(90deg, #8234e9, #8234e9);

  -webkit-box-shadow: 0 4px 0 #2b86ac;
  -moz-box-shadow: 0 4px 0 #2b86ac;
  box-shadow: 0 4px 0 #2b86ac;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  position: relative;
  overflow: hidden;
  padding-bottom: 80px;
}

.ourTeam .i .c .wrap {
  position: relative;
}

.ourTeam .i .c .wrap img {
  width: 100%;
  -webkit-border-top-left-radius: 5px;
  -webkit-border-top-right-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-topright: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /* -webkit-transition: all 0.3s ease; */
  /* -moz-transition: all 0.3s ease; */
  /* -ms-transition: all 0.3s ease; */
  /* -o-transition: all 0.3s ease; */
}

.ourTeam .i .c .wrap .info {
  padding: 10px 10px;
  position: absolute;
  top: 100%;
  width: 100%;
  /* -webkit-transition: all 0.3s ease; */
  /* -moz-transition: all 0.3s ease; */
  /* -ms-transition: all 0.3s ease; */
  /* -o-transition: all 0.3s ease; */
}

.ourTeam .i .c .wrap .info .name {
  margin: 0;
  font-size: 24px;
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.ourTeam .i .c .more {
  position: absolute;
  bottom: -100%;

  /* -webkit-transition: all 0.3s ease; */
  /* -moz-transition: all 0.3s ease; */
  /* -ms-transition: all 0.3s ease; */
  /* -o-transition: all 0.3s ease; */
}

.ourTeam .i .c .more .socials {
  margin: 0 0 0 0;
}

.ourTeam .i .c .more .socials a {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  font-size: 2.2rem;
  color: rgb(255, 255, 255);
  margin: 0 0 0 15px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  text-align: center;
  -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
}

.ourTeam .i .c .more .socials a:first-child {
  margin: 0;
}

.ourTeam .i .c .more .socials a.facebook {
  background: #2c167c;
}

.ourTeam .i .c .more .socials a.facebook:hover {
  background: #551591;
}

.ourTeam .i .c .more .socials a.twitter {
  background: #3dd7e5;
}

.ourTeam .i .c .more .socials a.twitter:hover {
  background: #27d2e2;
}

.ourTeam .i .c .more .socials a.google-plus {
  background: #e23535;
}

.ourTeam .i .c .more .socials a.google-plus:hover {
  background: #de2020;
}

.ourTeam .i .c .more .socials a.linkedin {
  background: #069;
}

.ourTeam .i .c .more .socials a.linkedin:hover {
  background: #005580;
}

.ourTeam .i .c:hover img {
  -moz-opacity: 0;
  -khtms-opacity: 0;
  -webkit-opacity: 0;
  opacity: 0;
}

.ourTeam .i .c:hover .info {
  top: 0;
}

.ourTeam .i .c:hover .more {
  bottom: 0;
}

.custom-arrow {
  height: 80px;
  width: 46px;
  padding: 6px;
  padding-top: 23px;
  background: black;
  z-index: 1;
}

.custom-arrow2[data-v-f2d6c0b2] {
  margin-right: 25px;
}

.custom-arrow1[data-v-f2d6c0b2] {
  margin-left: 25px;
}

.slick-prev:before,
.slick-next:before {
  font-size: 40px;
  line-height: 1;
  opacity: 0.75;
  color: white;
  -webkit-font-smoothing: antialiased;
}

.full-width {
  position: relative;
  object-fit: contain;

  height: 800px;
  padding: 15px;
}

.half-background:after {
  background-color: #3e1e96;

  content: '';

  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  object-fit: contain;
}

.bg-color {
  background-color: #3a1477;
}

* {
  margin: 0;
  padding: 0;
}

.grid-container {
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(7, 1.2fr);
  grid-template-rows: repeat(2, 15vw);
  grid-gap: 5px;
}

.gallery-img {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  background: gray;
  object-position: bottom;
}

.gallery-img img {
  width: 100%;
  height: 100%;
  object-position: center;

  object-fit: Cover;
}

.gallery-img:first-child {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 4;
}

@media screen and (max-width: 960px) {
  .grid-container {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media screen and (max-width: 760px) {
  .grid-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (max-width: 560px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 460px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 400px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(8, 25vw);
  }
}

.heading {
  font-size: clamp(2.027rem, (0.6366rem + 2.9004vw), 3.247rem);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.headings {
  font-size: clamp(1.08rem, (0.6366rem + 2.9004vw), 3.247rem);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.fonts {
  font-size: clamp(1.6rem, (0.6366rem + 2.9004vw), 1rem);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.shw {
  text-shadow: 2px 2px black;
}

@media (min-width: 1280px) {
  .text-size {
    font-size: 40px;
  }
}

.geeks {
  overflow: hidden;
  margin: 0 auto;
}

.geeks img {
  width: 100%;
  transition: 0.8s all ease-in-out;
}

.geeks:hover img {
  transform: scale(1.1);
}

.slick-next {
  right: 25px;
  opacity: 100%;
}

.slick-prev {
  left: 5px;
  opacity: 100%;
  z-index: 1;
}

@media screen and (max-width: 400px) {
  .slick-prev {
    left: 5px;
    opacity: 0%;
    z-index: 1;
  }
  .slick-next {
    right: 25px;
    opacity: 0%;
  }
}

.slick-prev:before,
.slick-next:before {
  font-size: 40px;
  line-height: 1;
  color: purple;

  opacity: 100%;
  -webkit-font-smoothing: antialiased;
}

.slick-dots {
  opacity: 0;
}
</style>
