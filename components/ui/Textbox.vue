<template>
  <div class="w-full text-gray-800">
    <div v-if="icon || label" class="flex flex-wrap items-center mb-1">
      <img v-if="icon" v-lazy="icon" alt="" class="w-6 h-6 me-2" />

      <h5 v-if="label" class="text-sm md:text-base font-semibold">
        {{ label }}
      </h5>
    </div>

    <input
      class="
        w-full
        p-2
        text-sm
        font-light
        placeholder-gray-400
        rounded-md
        bg-gray-50
        hover:bg-white
        transition
        duration-300
        border
        focus:outline-none
      "
      :class="[
        right ? 'text-right' : 'text-left',
        err
          ? 'border-red-500 focus:border-red-500 bg-red-100 focus:ring-red-500'
          : 'border-gray-300',
        success
          ? 'border-secondary-500 focus:border-secondary-500 bg-secondary-100 focus:ring-secondary-500'
          : 'border-gray-300',
      ]"
      :placeholder="placeholder"
      v-bind="$attrs"
      :value="value"
      :type="type"
      :aria-label="label"
      @blur="$emit('blur', $event.target.value)"
      @input="$emit('input', $event.target.value), v ? v.$touch() : ''"
      @change="$emit('change', $event.target.value)"
    />

    <p v-if="description" class="m-1 text-xs text-gray-500">
      {{ description }}
    </p>

    <div v-if="err" class="m-1 block text-xs text-red-500">
      {{ err }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    success: {
      type: Boolean,
      default: false,
    },
    errorPosition: {
      type: String,
      default: 'left',
    },
    icon: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: null,
    },
    cls: {
      type: String,
      default: null,
    },
    validate: {
      type: String,
      default: null,
    },
    v: {
      type: Object,
      default: () => {},
    },
    err: {
      type: String,
      default: null,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.arrow-left {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 5px 0;
  border-color: transparent red transparent transparent;
}
.arrow-right {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent red;
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid red;
}
.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid red;
}
.floating-input {
  font-size: 0.875rem;
}
.floating-input:focus ~ label,
.floating-input:not() ~ label {
  top: 2px;
  color: #b26e12;
  font-size: 0.8rem;
}

label {
  pointer-events: none;
  left: 8px;
  top: 11px;
  transition: 0.2s ease all;
}
</style>
