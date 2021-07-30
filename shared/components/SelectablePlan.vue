<template>
  <div
    class="
      w-24
      px-2
      mb-1
      bg-white
      rounded-lg
      shadow-md
      cursor-pointer
      me-2
      hover:bg-green-100
      focus:outline-none
      focus:shadow-outline-green
    "
    :class="{
      'bg-green-100 shadow-outline-green': activePlan === name,
    }"
    tabindex="0"
    @click="updateActivePlan"
    @keydown.space="updateActivePlan"
  >
    <div class="flex items-center justify-between">
      <h1 class="my-2 text-sm text-gray-700">{{ name }}</h1>
      <div v-if="activePlan === value">
        <svg
          class="w-5 h-5 fill-current zoom"
          :class="`text-${color}-500`"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.144 171.84A99.502 99.502 0 1 1 171.841 31.145c37.708 39.043 37.17 101.103-1.212 139.485-38.382 38.381-100.442 38.92-139.485 1.212z"
          />
          <path
            fill="#fff"
            d="M66.667 89.453l22.885 22.985 42.786-42.786 13.93 14.13-56.716 56.517-36.816-36.816 13.93-14.13z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'activePlan',
    event: 'onUpdatePlan',
  },
  props: {
    name: { type: String, default: null },
    value: { type: String, default: null },
    color: { type: String, default: null },
    activePlan: { type: String, default: null },
  },
  //  ['name', 'value', 'color', 'activePlan'],
  methods: {
    updateActivePlan() {
      this.$emit('onUpdatePlan', this.value)
    },
  },
}
</script>
<style scoped>
.zoom {
  animation-name: zoom;
  animation-duration: 1s;
}
</style>
