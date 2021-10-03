<template>
  <transition name="fade">
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
          max-height max-w-max
          text-gray-700
          overflow-hidden overflow-y-auto
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
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
.frosted {
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.7);
}
.max-height {
  max-height: 85vh;
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
