<template>
  <section class="grid grid-cols-1 md:grid-cols-3">
    <div
      class="relative border-t md:border-t-2 md:border-r-2 border-white flex-1"
    >
      <img
        v-lazy="`/island/home/girl.jpg?tr=h-640,fo-auto`"
        alt="Girls"
        class="
          object-cover object-top
          w-full
          my-auto
          overflow-hidden
          bg-white
          focus:outline-none
          md:object-cover
          h-rem
        "
      />

      <nuxt-link to="##" class="absolute inset-0 flex items-end justify-center">
        <div
          class="
            mb-10
            md:mb-20
            bg-white
            py-2
            px-4
            rounded-md
            text-gray-800
            font-bold
            text-sm
          "
        >
          Girls
        </div>
      </nuxt-link>
    </div>

    <div
      class="relative border-t md:border-t-2 md:border-r-2 border-white flex-1"
    >
      <img
        v-lazy="`/island/home/boy.jpg?tr=h-640,fo-auto`"
        alt="Boys"
        class="
          object-cover object-top
          w-full
          my-auto
          overflow-hidden
          bg-white
          focus:outline-none
          md:object-cover
          h-rem
        "
      />

      <nuxt-link to="##" class="absolute inset-0 flex items-end justify-center">
        <div
          class="
            mb-10
            md:mb-20
            bg-white
            py-2
            px-4
            rounded-md
            text-gray-800
            font-bold
            text-sm
          "
        >
          Boys
        </div>
      </nuxt-link>
    </div>

    <div class="relative border-t md:border-t-2 border-white flex-1">
      <img
        v-lazy="`/island/home/men.jpg?tr=h-640,fo-auto`"
        alt="Mens"
        class="
          object-cover object-top
          w-full
          my-auto
          overflow-hidden
          bg-white
          focus:outline-none
          md:object-cover
          h-rem
        "
      />

      <nuxt-link to="##" class="absolute inset-0 flex items-end justify-center">
        <div
          class="
            mb-10
            md:mb-20
            bg-white
            py-2
            px-4
            rounded-md
            text-gray-800
            font-bold
            text-sm
          "
        >
          Mens
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
@media (max-width: 768px) {
  .h-rem {
    height: 20rem;
  }
}
@media (min-width: 768px) {
  .h-rem {
    height: 40rem;
  }
}
</style>
