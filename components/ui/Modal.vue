<template>
  <transition name="slideTop">
    <div
      v-if="isVisible"
      class="
        fixed
        inset-0
        z-50
        frosted
        h-screen
        w-screen
        flex flex-col
        items-center
        justify-center
        p-3
        sm:p-10
      "
    >
      <div
        class="
          overflow-hidden
          flex flex-col
          max-w-max
          rounded-lg
          shadow-lg
          bg-white
          border
          align-middle
        "
      >
        <!-- header-->

        <div
          class="
            p-3
            sm:px-6
            text-gray-800
            flex
            items-center
            justify-between
            border-b border-gray-200
          "
        >
          <h3 class="me-4 font-semibold text-lg">
            <slot name="title"></slot>
          </h3>

          <button
            type="button"
            class="
              p-1
              transform
              rounded-md
              hover:text-white
              transition
              duration-300
              hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-md
              focus:outline-none focus:scale-75
            "
            @click="emitCancel"
          >
            <div class="text-xl font-semibold h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        </div>

        <!-- body-->

        <div class="p-3 sm:px-6 py-3 height overflow-y-auto text-gray-800">
          <slot />
        </div>

        <!-- footer-->

        <slot name="footer">
          <div
            class="
              p-3
              sm:px-6
              border-t border-gray-200
              flex
              justify-end
              items-center
            "
          >
            <button @click="emitCancel">
              <slot name="cancel-button"
                ><button class="btn-outline">Cancel</button></slot
              ></button
            ><button class="ms-4" @click="emitConfirm">
              <slot name="confirm-button"
                ><button class="btn">Confirm</button></slot
              >
            </button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: { isVisible: { type: Boolean, default: false } },

  methods: {
    emitCancel() {
      this.$emit('cancel')
    },

    emitConfirm() {
      this.$emit('confirm')
    },
  },
}
</script>

<style scoped>
.frosted {
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.2);
}

.height {
  max-height: 70vh;
}
</style>
