<template>
  <transition name="fade ">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto frosted">
      <div class="flex items-center justify-center pt-10 sm:p-10 min-h-screen">
        <div
          class="
            inline-block
            overflow-hidden
            text-left
            align-bottom
            transition-all
            transform
            bg-white
            rounded-lg
            shadow-xl
            sm:my-auto sm:align-middle
            max-w-4xl
            w-full
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="p-3 sm:p-6 flex flex-col items-start">
            <h1
              id="modal-headline"
              class="
                ml-4
                mb-3
                sm:mb-5
                text-lg
                sm:text-xl
                text-gray-800
                font-bold
              "
            >
              {{ title }}
            </h1>

            <div class="w-full">
              <slot />
            </div>
          </div>

          <div v-if="okText || cancelText" class="px-4 pb-6 sm:px-6 sm:flex">
            <div class="ml-auto flex space-x-5 items-center">
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
                  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
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

.slowtransition {
  animation: fade 0.3s;
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
