<template>
  <!-- class="w-4 h-4 my-auto bg-gray-100 text-primary-500 focus:ring-1 focus:ring-yellow-600 focus:ring-offset-0" -->
  <label
    class="flex items-center cursor-pointer hover:bg-none"
    :for="id || uniqueId"
  >
    <input
      :id="id || uniqueId"
      type="radio"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :color="color"
      :checked="checked"
      class="
        w-4
        h-4
        me-2
        cursor-pointer
        focus:ring-0
        text-primary-500
        focus:ring-offset-0
      "
      @change="updateInput"
    />

    <slot class="align-middle" />

    <div class="align-middle" :class="color" />
  </label>
</template>
<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
    model: {
      type: String | Array,
      default: undefined,
    },
    value: {
      type: [String, Object, Number],
      default: null,
    },
    modelValue: {
      type: [Array, String, Number, Boolean],
      default: null,
    },
    color: {
      type: String,
      default: 'primary',
    },
    count: {
      type: [String, Number],
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
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
    size: {
      type: Number,
      required: false,
      default: null,
    },
    fontSize: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data: () => ({
    uniqueId: '',
  }),
  computed: {
    //  checkboxState() {
    //   // if (this.model === undefined) return this.value;
    //   if (Array.isArray(this.model)) return this.model.includes(this.value)
    //   return this.model && this.value
    // },
    checked() {
      return this.modelValue === this.value
    },
  },
  mounted() {
    this.genId()
  },
  methods: {
    updateInput() {
      this.$emit('change', this.value)
    },
    genId() {
      if (this.id === undefined || typeof String) {
        this.uniqueId = `m-checkbox--${Math.random()
          .toString(36)
          .substring(2, 10)}`
      } else {
        this.uniqueId = this.id
      }
    },
  },
}
</script>
