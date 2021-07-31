<template>
  <div>
    <button
      type="button"
      :class="{ 'bg-gray-300': open == true }"
      class="
        flex flex-row
        px-4
        py-2
        rounded-full
        me-3
        focus:outline-none
        hover:shadow-lg hover:bg-gray-300
      "
      @click="open = true"
    >
      <svg
        class="my-auto text-gray-500"
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 14C21.1 14 21.99 13.1 21.99 12L22 2C22 0.89 21.1 0 20 0H4C2.89 0 2 0.89 2 2V12C2 13.1 2.89 14 4 14H0V16H24V14H20ZM4 12V2H20V12.01L4 12ZM13 5.13C9.11 5.67 7.56 8.33 7 11C8.39 9.13 10.22 8.28 13 8.28V10.47L17 6.73L13 3V5.13Z"
          fill="#616161"
        />
      </svg>

      <span class="hidden my-auto font-thin ms-1 md:flex">Share</span>
    </button>
    <div v-if="open && product" class="">
      <div
        class="
          absolute
          z-50
          items-center
          w-4/5
          mt-2
          overflow-y-auto
          bg-white
          border
          rounded-sm
          shadow-2xl
          right-8
          sm:right-0 sm:overflow-hidden sm:p-3 sm:w-2/5 sm:h-32
        "
      >
        <div
          class="
            flex flex-col
            h-full
            sm:justify-around sm:my-auto sm:flex-wrap sm:flex-row
          "
        >
          <div class="p-3 bg-gray-200 border-b sm:hidden">
            <span class="text-lg text-center">Share Via</span>
          </div>

          <div class="flex flex-col w-full sm:flex-row">
            <!-- fb -->
            <ShareNetwork
              :url="`${host}/${$route.params.store}/${product.slug}?id=${product.id}`"
              :title="product.name"
              :description="product.description || ''"
              :quote="(product.category && product.category.name) || ''"
              :hashtags="product.keywords || ''"
              network="facebook"
              style="color: #3b5998"
              class="
                flex flex-row
                items-center
                w-full
                mx-auto
                border-b
                sm:flex-col
                focus:outline-none
                sm:border-b-0 sm:ps-0
                ps-4
              "
              @click="close(null)"
            >
              <svg
                class="
                  my-2
                  rounded-full
                  cursor-pointer
                  sm:my-auto
                  hover:shadow-lg
                "
                width="50"
                height="50"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(1 1)" fill="none">
                  <ellipse stroke="#EAEAEA" cx="24" cy="24" rx="24" ry="24" />
                  <path
                    fill="#3B5998"
                    d="M29 14v4h-2c-.69 0-1 .81-1 1.5V22h3v4h-3v8h-4v-8h-3v-4h3v-4c0-2.21 1.79-4 4-4h3z"
                  />
                </g>
              </svg>
              <span class="my-auto font-light text-gray-500 ps-4 sm:ps-0">
                Facebook
              </span>
            </ShareNetwork>
            <!-- twitter -->
            <ShareNetwork
              :url="`${host}/${$route.params.store}/${product.slug}?id=${product.id}`"
              :title="product.name"
              :description="product.description || ''"
              :quote="(product.category && product.category.name) || ''"
              :hashtags="product.keywords || ''"
              :twitter-user="settings.websiteName"
              network="twitter"
              style="color: #53a8e7"
              class="
                flex flex-row
                items-center
                w-full
                mx-auto
                border-b
                sm:flex-col
                focus:outline-none
                sm:border-b-0 sm:ps-0
                ps-4
              "
              @click="close(null)"
            >
              <svg
                class="
                  my-2
                  rounded-full
                  cursor-pointer
                  sm:my-auto
                  hover:shadow-lg
                "
                width="50"
                height="50"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(1 1)" fill="none">
                  <ellipse stroke="#EAEAEA" cx="24" cy="24" rx="24" ry="24" />
                  <path
                    fill="#55ACEE"
                    d="M34.46 18c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C30.37 16.5 29.26 16 28 16c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.95 4 2.98-1.46 1.16-3.31 1.84-5.33 1.84-.34 0-.68-.02-1.02-.06 1.9 1.22 4.16 1.93 6.58 1.93 7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                  />
                </g>
              </svg>
              <span class="my-auto font-light text-gray-500 ps-4 sm:ps-0">
                Twitter
              </span>
            </ShareNetwork>
            <!-- email -->
            <ShareNetwork
              :url="`${host}/${$route.params.store}/${product.slug}?id=${product.id}`"
              :title="product.name"
              :description="product.description || ''"
              :quote="(product.category && product.category.name) || ''"
              :hashtags="product.keywords || ''"
              network="Email"
              style="color: #54cc61"
              class="
                flex flex-row
                items-center
                w-full
                mx-auto
                border-b
                sm:flex-col
                focus:outline-none
                sm:border-b-0 sm:ps-0
                ps-4
              "
              @click="close(null)"
            >
              <svg
                class="
                  my-2
                  rounded-full
                  cursor-pointer
                  sm:my-auto
                  hover:shadow-lg
                "
                width="50"
                height="50"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(1 1)" fill="none">
                  <ellipse stroke="#EAEAEA" cx="24" cy="24" rx="24" ry="24" />
                  <path
                    fill="#3F3F3F"
                    d="M31.75 20.5l-7 4.375-7-4.375v-1.75l7 4.375 7-4.375v1.75zm0-3.5h-14c-.97 0-1.75.78-1.75 1.75v10.5c0 .966.784 1.75 1.75 1.75h14c.966 0 1.75-.784 1.75-1.75v-10.5c0-.97-.788-1.75-1.75-1.75z"
                  />
                </g>
              </svg>
              <span class="my-auto font-light text-gray-500 ps-4 sm:ps-0"
                >Email</span
              >
            </ShareNetwork>
            <ShareNetwork
              :url="`${host}/${$route.params.store}/${product.slug}?id=${product.id}`"
              :title="product.name"
              :description="product.description || ''"
              :quote="(product.category && product.category.name) || ''"
              :hashtags="product.keywords || ''"
              network="whatsapp"
              style="color: #54cc61"
              class="
                flex flex-row
                items-center
                w-full
                mx-auto
                border-b
                sm:flex-col
                focus:outline-none
                sm:border-b-0 sm:ps-0
                ps-4
              "
              @click="close(null)"
            >
              <svg
                id="Capa_1"
                version="1.1"
                class="w-12 h-12 p-3 my-2 text-gray-600 border rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
              >
                <path
                  style="fill: #4caf50"
                  d="M256.064,0h-0.128l0,0C114.784,0,0,114.816,0,256c0,56,18.048,107.904,48.736,150.048l-31.904,95.104
                  l98.4-31.456C155.712,496.512,204,512,256.064,512C397.216,512,512,397.152,512,256S397.216,0,256.064,0z"
                />
                <path
                  style="fill: #fafafa"
                  d="M405.024,361.504c-6.176,17.44-30.688,31.904-50.24,36.128c-13.376,2.848-30.848,5.12-89.664-19.264
                  C189.888,347.2,141.44,270.752,137.664,265.792c-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624,26.176-62.304
                  c6.176-6.304,16.384-9.184,26.176-9.184c3.168,0,6.016,0.16,8.576,0.288c7.52,0.32,11.296,0.768,16.256,12.64
                  c6.176,14.88,21.216,51.616,23.008,55.392c1.824,3.776,3.648,8.896,1.088,13.856c-2.4,5.12-4.512,7.392-8.288,11.744
                  c-3.776,4.352-7.36,7.68-11.136,12.352c-3.456,4.064-7.36,8.416-3.008,15.936c4.352,7.36,19.392,31.904,41.536,51.616
                  c28.576,25.44,51.744,33.568,60.032,37.024c6.176,2.56,13.536,1.952,18.048-2.848c5.728-6.176,12.8-16.416,20-26.496
                  c5.12-7.232,11.584-8.128,18.368-5.568c6.912,2.4,43.488,20.48,51.008,24.224c7.52,3.776,12.48,5.568,14.304,8.736
                  C411.2,329.152,411.2,344.032,405.024,361.504z"
                />
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
              <span class="my-auto font-light text-gray-500 ps-4 sm:ps-0">
                WhatsApp
              </span>
            </ShareNetwork>

            <ShareNetwork
              :url="`${host}/${$route.params.store}/${product.slug}?id=${product.id}`"
              :title="product.name"
              :description="product.description || ''"
              :quote="(product.category && product.category.name) || ''"
              :hashtags="product.keywords || ''"
              network="sms"
              style="color: #54cc61"
              class="
                flex flex-row
                items-center
                w-full
                mx-auto
                border-b
                sm:flex-col
                focus:outline-none
                sm:border-b-0 sm:ps-0
                ps-4
              "
              @click="close(null)"
            >
              <svg
                id="Capa_1"
                class="w-12 h-12 p-3 my-2 text-gray-600 border rounded-full"
                enable-background="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <g>
                    <path
                      d="m480 412.511-120-79.995v-203.027h-240v-120h392v330h-32z"
                      fill="#ffdf40"
                    />
                  </g>
                  <path
                    d="m315 129.489h45v203.027l120 79.995v-73.022h32v-330h-197z"
                    fill="#ffbe40"
                  />
                  <g>
                    <path
                      d="m30 502.511v-73.022h-30v-330h390v330h-250.459z"
                      fill="#ff7f40"
                    />
                  </g>
                  <path d="m195 99.489h195v330h-195z" fill="#f25a3c" />
                  <g id="Question_1_">
                    <g>
                      <g><path d="m180 309.489h30v30h-30z" fill="#f3f5f9" /></g>
                      <g>
                        <path
                          d="m240 219.489c0 21.299-11.1 32.399-19.501 40.499-7.2 7.5-10.499 11.1-10.499 19.501h-30c0-17.701 7.5-28.2 15-36l4.501-4.501c7.2-7.5 10.499-11.1 10.499-19.499 0-8.401-6.599-15-15-15s-15 6.599-15 15h-30c0-24.901 20.099-45 45-45s45 20.099 45 45z"
                          fill="#f3f5f9"
                        />
                      </g>
                    </g>
                  </g>
                  <g fill="#e1e6f0">
                    <path d="m195 309.489h15v30h-15z" />
                    <path
                      d="m240 219.489c0 21.299-11.1 32.399-19.501 40.499-7.2 7.5-10.499 11.1-10.499 19.501h-15v-36l4.501-4.501c7.2-7.5 10.499-11.1 10.499-19.499 0-8.401-6.599-15-15-15v-30c24.901 0 45 20.099 45 45z"
                    />
                  </g>
                </g>
              </svg>

              <span class="my-auto font-light text-gray-500 ps-4 sm:ps-0">
                Message
              </span>
            </ShareNetwork>

            <button
              class="
                flex flex-row
                items-center
                w-full
                mx-auto
                border-b
                sm:flex-col
                focus:outline-none
                sm:border-b-0 sm:ps-0
                ps-4
              "
              @click="copy()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-12 h-12 p-3 my-2 text-gray-600 border rounded-full"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"
                />
                <path
                  d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                />
              </svg>
              <span class="my-auto font-light text-gray-500 ps-4 sm:ps-0">
                Copy Link
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="open"
        class="fixed inset-0 z-0 w-screen h-screen"
        @click="close(null)"
      ></div>
    </div>
    <div ref="productLink" class="hidden">
      {{ `${host}/${$route.params.store}/${product.slug}?id=${product.id}` }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: { type: Object, default: () => {} },
    host: { type: String, default: null },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
  methods: {
    copy() {
      // const productUrl = `${this.host}/${this.product.slug}?id=${this.product.id}`
      navigator.clipboard.writeText(this.$refs.productLink.innerHTML)
      this.close(null)
    },
    close(e) {
      this.open = false
      if (e) this.$router.push(`/${this.$route.params.store}/c/${e}`)
    },
  },
}
</script>
