<template>
  <div>
    <button @click="showToast = !showToast">Show {{ showToast }}</button>
    <transition name="pop">
      <div v-if="showToast" class="fixed bottom-0 inset-x-0 m-5">
        <div
          class="
            mx-auto
            max-w-max
            flex
            items-center
            justify-center
            space-x-4
            bg-gray-800
            py-2
            px-6
          "
        >
          <div
            class="
              bg-secondary-500
              flex
              items-center
              justify-center
              h-5
              w-5
              rounded-full
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <span class="flex-1 text-sm text-white"> <slot /> </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: { show: { type: Boolean, default: false } },
  data() {
    return {
      showToast: false,
    }
  },
  created() {
    this.showToast = true
    const vm = this
    setTimeout(function () {
      vm.showToast = false
    }, 3000)
  },
}
</script>

<style scoped>
.pop-enter-active {
  animation: pop 0.5s ease-in-out;
}
.pop-leave-active {
  animation: pop 0.5s ease-in-out reverse;
}

@keyframes pop {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 1;
    transform: translateY(30px);
  }
  100% {
    transform: translateY(-3px);
  }
}
</style>
