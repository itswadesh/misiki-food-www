<template>
  <transition name="fade">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div v-if="show" class="fixed inset-0 z-10 overflow-y-auto frosted">
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          px-4
          pt-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <div
          class="
            inline-block
            overflow-hidden
            text-start
            align-bottom
            transition-all
            transform
            bg-white
            rounded-lg
            shadow-xl
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                v-if="!noicon"
                class="
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                  w-12
                  h-12
                  mx-auto
                  rounded-full
                  sm:mx-0 sm:h-10 sm:w-10
                "
                :class="{
                  'bg-red-100': type == 'error',
                  'bg-green-100': type == 'success',
                  'bg-blue-100': type == 'info',
                  'bg-yellow-100': type == 'warning',
                }"
              >
                <svg
                  class="`h-6 w-6"
                  :class="{
                    'text-red-600': type == 'error',
                    'text-green-600': type == 'success',
                    'text-blue-600': type == 'info',
                    'text-yellow-600': type == 'warning',
                  }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-start">
                <h3
                  id="modal-headline"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  {{ title }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <slot />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex">
            <div class="ms-auto mb-10">
              <button
                v-if="okText"
                type="button"
                class="
                  inline-flex
                  justify-center
                  w-full
                  px-8
                  py-2
                  text-base
                  font-semibold
                  text-white
                  transition
                  duration-300
                  border border-transparent
                  rounded-md
                  shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  sm:ms-3 sm:w-auto sm:text-sm
                "
                :class="{
                  'bg-red-600 hover:bg-red-700 focus:ring-red-500':
                    type == 'error',
                  'bg-accent-500 hover:bg-[#ff4500] focus:ring-green-500':
                    type == 'success',
                  'bg-blue-600 hover:bg-blue-800 focus:ring-blue-500':
                    type == 'info',
                  'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500':
                    type == 'warning',
                }"
                @click="submit"
              >
                {{ okText }}
              </button>
              <button
                v-if="cancelText"
                type="button"
                class="
                  inline-flex
                  justify-center
                  w-full
                  px-4
                  py-2
                  mt-3
                  text-base
                  font-semibold
                  text-blue-500
                  transition
                  duration-300
                  transform
                  bg-transparent
                  border border-transparent
                  rounded-md
                  hover:border-gray-300
                  hover:shadow-sm
                  hover:text-white
                  hover:bg-gray-600
                  focus:outline-none
                  focus:scale-90
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                  sm:mt-0 sm:ms-3 sm:w-auto sm:text-sm
                "
                @click="cancel"
              >
                {{ cancelText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['show', 'title', 'okText', 'cancelText', 'type', 'noicon'],
  methods: {
    submit() {
      this.$emit('submit')
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style scoped>
.frosted {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
</style>
