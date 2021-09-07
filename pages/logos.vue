<template>
  <section class="relative bg-black overflow-hidden">
    <div class="h-24 md:h-32 relative z-10 flex items-center justify-center">
      <h1
        class="
          text-white text-xl
          sm:text-2xl
          md:text-3xl
          xl:text-4xl
          font-medium
          text-center
          px-2
        "
      >
        1 million+ developers trust the first choice for quality apps
      </h1>
    </div>

    <div
      class="h-72 md:h-80 flex flex-wrap justify-center -mx-16 overflow-hidden"
    >
      <img
        v-for="img in 100"
        :key="img"
        src="/img/visa.png"
        alt=""
        class="h-14 w-14 md:h-16 md:w-16 m-2 rounded bg-white object-contain"
      />
    </div>

    <div
      class="h-24 md:h-32 relative z-10 flex items-center justify-center"
    ></div>

    <div
      v-for="i in 3"
      :key="i"
      class="
        absolute
        inset-0
        bg-gradient-radial
        from-transparent
        via-transparent
        to-black
      "
    ></div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: 'Logos',
    }
  },
}
</script>

<style scoped></style>
