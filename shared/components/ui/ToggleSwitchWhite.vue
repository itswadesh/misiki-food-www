<template>
  <!-- Toggle Button -->

  <label
    :for="uniqueId"
    class="flex items-center cursor-pointer max-w-max hover:bg-opacity-90"
  >
    <!-- toggle -->

    <div class="relative">
      <input
        :id="uniqueId"
        v-bind="$attrs"
        :checked="value"
        type="checkbox"
        :name="name || uniqueId"
        :disabled="disabled"
        :required="required"
        class="hidden"
        @input="onInput"
      />

      <!-- line -->

      <div
        class="block bg-gray-400 rounded-full line"
        :class="{
          'h-5 w-8': size == 'xs',
          'h-6 w-10': size == 'sm',
          'h-9 w-16': size == 'md',
        }"
      ></div>

      <!-- dot -->

      <div
        class="
          absolute
          transition
          duration-300
          ease-in-out
          rounded-full
          dot
          left-1
          top-1
          bg-gray-900
        "
        :class="{
          'h-3 w-3': size == 'xs',
          'h-4 w-4': size == 'sm',
          'h-7 w-7': size == 'md',
          'custom-color': dotcolor,
        }"
      ></div>
    </div>

    <div class="text-sm ms-2 font-semibold">
      <slot>
        <span v-if="value === true && onText" class="text-white">{{
          onText
        }}</span>

        <span v-else-if="offText" class="text-gray-400">{{ offText }}</span>
      </slot>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    id: { type: String, default: null, required: false },

    dotcolor: { type: String, default: 'green', required: false },

    circle: {
      type: Boolean,
      default: false,
      required: false,
    },

    value: {
      type: [String, Boolean],
      required: false,
      default: false,
    },

    count: { type: [String, Number], default: null },

    name: { type: String, default: null },

    required: {
      type: Boolean,
      required: false,
      default: false,
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },

    small: {
      type: Boolean,
      required: false,
    },

    size: {
      type: String,
      default: 'md',
      required: false,
    },

    onText: {
      type: String,
      default: null,
      required: false,
    },

    offText: {
      type: String,
      default: null,
      required: false,
    },

    fontSize: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  data: () => ({
    checked: false,
    uniqueId: '',
  }),

  mounted() {
    this.genId()
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.checked)
    },

    genId() {
      if (this.id === undefined || typeof String) {
        this.uniqueId = `toggle--${Math.random().toString(36).substring(2, 10)}`
      } else {
        this.uniqueId = this.id
      }
    },
  },
}
</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
}

input:checked ~ .line {
  @apply bg-white;
}

.custom-color {
  background-color: (--dotcolor);
}
</style>
