<template>
  <section v-if="brand" class="container mx-auto flex justify-center">
    <div class="md:flex items-center justify-center px-5">
      <div class="md:w-1/3 flex items-center">
        <img
          v-lazy="`${brand.img}?tr=h-176,fo-auto`"
          alt="🚀"
          class="h-44 object-contain"
        />
      </div>
      <div class="mt-8 md:mt-0 md:w-2/3 flex items-center md:ms-12">
        <p class="text-xs text-center text-gray-400">
          {{ brand.info }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    brand: { type: Object, default: null },
  },
}
</script>

<style scoped></style>
