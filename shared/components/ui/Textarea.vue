<template>
  <textarea
    class="
      w-full
      p-2
      text-sm
      placeholder-gray-400
      border border-gray-400
      rounded-md
      bg-gray-50
      hover:bg-white hover:border-primary-500
      focus:outline-none
    "
    placeholder=" "
    v-bind="$attrs"
    :value="value"
    :type="type"
    :rows="rows"
    @input="$emit('input', $event.target.value)"
    @blur="$emit('blur', $event.target.value)"
    @change="$emit('change', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'text' },
    value: { type: String, default: null },
    rows: { type: Number, default: 4 },
  },
}
</script>

<style scoped></style>
