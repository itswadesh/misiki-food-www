<template>
  <section>
    <!-- Integrated tooptip with 4 directions start -->

    <div
      class="relative group cursor-help flex"
      :class="{
        'flex-col': tipposition == 'top',
        'flex-col': tipposition == 'bottom',
        'flex-row': tipposition == 'left',
        'flex-row': tipposition == 'right',
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-300"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        />
      </svg>

      <div
        class="absolute items-center hidden group-hover:flex"
        :class="{
          'bottom-0 inset-x-0 mb-6 flex-col': tipposition == 'top',
          'top-0 inset-x-0 mt-6 flex-col-reverse': tipposition == 'bottom',
          'right-0 inset-y-0 mr-6 flex-row': tipposition == 'left',
          'left-0 inset-y-0 ml-6 flex-row-reverse': tipposition == 'right',
        }"
      >
        <div class="relative z-10 p-3 bg-gray-800 rounded-md shadow-lg width">
          <h6
            class="
              text-xs
              sm:text-sm
              text-center
              font-light
              tracking-wide
              text-white
              smoothly-open
            "
          >
            {{ data }}
          </h6>
        </div>

        <div
          class="w-3 h-3 sm:h-4 sm:w-4 transform rotate-45 bg-gray-800"
          :class="{
            '-mt-2': tipposition == 'top',
            '-mb-2': tipposition == 'bottom',
            '-ml-2': tipposition == 'left',
            '-mr-2': tipposition == 'right',
          }"
        ></div>
      </div>
    </div>
    <!-- Integrated tooptip with 4 directions end -->
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: null,
    },
    tipposition: {
      type: String,
      default: 'bottom',
    },
  },
}
</script>

<style scoped>
.width {
  width: max-content;
  max-width: 15rem;
}

.smoothly-open {
  animation: fade 0.5s;
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
