<template>
  <transition name="slideTop">
    <div
      v-if="show"
      class="
        fixed
        inset-0
        z-50
        frosted
        h-screen
        w-screen
        flex
        items-center
        justify-center
        p-3
        sm:p-10
      "
    >
      <div
        class="
          max-w-max
          text-gray-700
          overflow-hidden
          inline-block
          transition-all
          transform
          bg-white
          rounded-xl
          shadow-xl
          align-middle
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <button
          type="button"
          class="
            fixed
            top-0
            right-0
            mt-3
            mr-5
            p-1
            transform
            rounded-md
            hover:text-white
            transition
            duration-300
            hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-md
            focus:outline-none focus:scale-75
          "
          :class="hideCloseButton ? 'hidden' : 'block'"
          @click="$emit('close')"
        >
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
        </button>

        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    hideCloseButton: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
.frosted {
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
