<template>
  <div v-if="count > 1" class="flex flex-row w-full">
    <div
      class="
        justify-start
        flex-1
        w-full
        p-3
        text-xs text-center text-gray-500
        border-t-1
        lg:text-sm
      "
    >
      <div
        class="
          float-left
          w-full
          m-2
          my-3
          text-base
          font-normal
          lg:my-2
          lg:w-auto
        "
      >
        Page {{ current }} of {{ count }}
      </div>
      <div class="flex flex-row justify-center w-full my-auto lg:w-auto">
        <button
          v-if="current > 1"
          class="
            items-center
            hidden
            p-2
            mx-5
            my-auto
            font-semibold
            bg-white
            border border-gray-400
            rounded
            shadow
            lg:inline-flex
            hover:bg-gray-100
            lg:px-4
          "
          @click="$emit('change', current - 1)"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          &nbsp;
          <span>
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
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </span>
        </button>
        <button
          v-for="i in pages"
          :key="i"
          class="
            w-8
            h-8
            my-auto
            rounded
            focus:outline-none
            hover:bg-gray-400
            hover:text-white
          "
          :class="{
            'bg-black font-medium text-white tracking-wide rounded-sm':
              current == i,
          }"
          @click="$emit('change', i)"
        >
          {{ i }}
        </button>
        <button
          v-if="current < count"
          class="
            items-center
            hidden
            px-4
            py-2
            mx-5
            font-semibold
            bg-white
            border border-gray-400
            rounded
            shadow
            focus:outline-none
            lg:inline-flex
            hover:bg-gray-100
          "
          @click="$emit('change', current + 1)"
        >
          <span>
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
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </span>
          &nbsp;
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1,
    },
    current: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    pages() {
      const count = this.count > 10 ? 10 : this.count
      return parseInt(count)
    },
  },
  methods: {},
}
</script>
