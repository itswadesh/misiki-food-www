<template>
  <!-- Categories start  -->

  <div
    class="
      grid grid-cols-3
      p-1
      px-3
      md:grid-cols-4
      lg:grid-cols-6
      gap-3
      md:gap-4
      lg:gap-6
      justify-items-center
    "
  >
    <div v-for="(i, ix) in 12" :key="ix">
      <div
        class="
          animate-pulse
          w-24
          md:w-32
          xl:w-40
          flex flex-col
          items-start
          justify-center
          group
        "
      >
        <div
          class="
            mb-2
            ms:mb-4
            w-24
            h-24
            md:h-28 md:w-28
            xl:w-36 xl:h-36
            object-cover
            rounded-full
            bg-gray-200
          "
        ></div>

        <h6 class="w-full h-4 bg-gray-200 rounded-md"></h6>
      </div>
    </div>
  </div>

  <!-- Categories end  -->
</template>
