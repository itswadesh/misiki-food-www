<template>
  <div class="group">
    <center>
      <div class="floating-form">
        <div class="floating-label">
          <textarea
            class="
              w-full
              bg-gray-100
              border-b
              rounded
              floating-input
              hover:bg-gray-300
              focus:outline-none
              focus:border-pink-500
            "
            placeholder=" "
            v-bind="$attrs"
            :value="value"
            :type="type"
            :aria-label="label"
            :rows="rows"
            @input="$emit('input', $event.target.value)"
            @blur="$emit('blur', $event.target.value)"
          />
          <span class="highlight"></span>
          <label>{{ label }}</label>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    type: { type: String, default: 'text' },
    value: { type: String },
    rows: { type: Number, default: 4 },
  },
}
</script>

<style scoped>
textarea {
  overflow: auto;
}
.floating-label {
  position: relative;
  margin-bottom: 20px;
}
.floating-input {
  display: block;
  width: 100%;
  padding: 20px 14px 0;
  border: none;
  overflow: auto;
}

.floating-input:focus {
  outline: none;
  border-bottom: 2px solid rgba(0, 0, 255, 0.555);
}

label {
  color: #999;
  font-size: 1rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 20px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -1px;
  left: 4px;
  font-size: 14px;
  color: #fb6340;
}

.floating-select:focus ~ label,
.floating-select:not([value='']):valid ~ label {
  top: -18px;
  font-size: 14px;
  color: #fb6340;
}
</style>
