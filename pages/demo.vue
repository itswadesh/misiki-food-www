<template>
  <div>
    <div class="w-full p-8 mx-auto md:w-3/5">
      <p>Open <strong>multiple</strong></p>
      <div class="shadow-md">
        <div
          v-for="(n, i) in 4"
          :key="i"
          class="w-full overflow-hidden border-t tab"
        >
          <input
            :id="'tab-multi-' + i"
            class="absolute opacity-0"
            type="checkbox"
            name="tabs"
          />
          <label
            class="block p-5 leading-normal cursor-pointer"
            :for="'tab-multi-' + i"
            >Label One</label
          >
          <div
            class="
              overflow-hidden
              leading-normal
              bg-gray-100
              border-l-2 border-indigo-500
              tab-content
            "
          >
            <p class="p-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur,
              architecto, explicabo perferendis nostrum, maxime impedit atque
              odit sunt pariatur illo obcaecati soluta molestias iure facere
              dolorum adipisci eum? Saepe, itaque.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Demo',
    }
  },
}
</script>

<style scoped>
.tab-content {
  max-height: 0;
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.35s;
  transition: max-height 0.35s;
} /* :checked - resize to full height */
.tab input:checked ~ .tab-content {
  max-height: 100vh;
}
</style>
