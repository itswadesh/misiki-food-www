<template>
  <transition name="fade ">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto frosted">
      <div
        class="
          flex
          items-end
          justify-end
          sm:items-center sm:justify-center
          pt-10
          sm:p-10
          min-h-screen
        "
      >
        <div
          class="
            inline-block
            overflow-hidden
            text-start
            align-bottom
            transition-all
            transform
            bg-white
            rounded-t-lg
            sm:rounded-b-lg
            shadow-xl
            sm:my-auto sm:align-middle
            max-w-4xl
            w-full
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
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

          <!-- This element is to trick the browser into centering the modal contents. -->

          <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->

          <div class="p-5 sm:p-10 w-full text-gray-700">
            <div class="flex flex-wrap items-center justify-center sm:mb-2">
              <svg
                class="`h-6 w-6 mb-3 me-2"
                :class="{
                  'text-brand-700': type == 'error',

                  'text-secondary-500': type == 'success',

                  'text-blue-600': type == 'info',

                  'text-brand-500': type == 'warning',
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77
                     1.333.192 3 1.732 3z"
                />
              </svg>

              <h3
                id="modal-headline"
                class="mb-3 text-lg font-medium leading-6 text-center"
              >
                {{ title }}
              </h3>
            </div>

            <div class="w-full">
              <slot />
            </div>
          </div>

          <div v-if="okText || cancelText" class="px-4 pb-6 sm:px-6 sm:flex">
            <div class="ms-auto flex space-x-5 items-center">
              <PrimaryButtonRounded
                type="button"
                class="text-sm px-8"
                @click="submit"
              >
                {{ okText }}
              </PrimaryButtonRounded>

              <button
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
                  text-primary-500
                  transition
                  duration-300
                  transform
                  bg-transparent
                  border border-transparent
                  rounded-md
                  hover:border-gray-300
                  hover:shadow-sm
                  hover:text-white
                  hover:bg-gray-500
                  focus:outline-none
                  active:scale-90
                  focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
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
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: { PrimaryButtonRounded },

  props: {
    title: { type: String, default: null },
    show: { type: Boolean, default: false },
    okText: { type: String, default: null },
    cancelText: { type: String, default: null },
    type: { type: String, default: null },
  },

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
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
