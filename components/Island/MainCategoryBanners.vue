<template>
  <section>
    <div class="md:flex space-y-0.5 md:space-y-0 md:space-x-0.5">
      <div class="relative md:w-2/3 flex-shrink-0">
        <img
          src="/island/home/adorable-baby-beautiful-boy.jpg"
          alt=""
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

        <nuxt-link
          to="##"
          class="absolute inset-y-0 left-0 w-1/2 flex items-end justify-end"
        >
          <div
            class="
              mb-10
              mr-20
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
            Boy
          </div>
        </nuxt-link>

        <nuxt-link
          to="##"
          class="absolute inset-y-0 right-0 w-1/2 flex items-end justify-start"
        >
          <div
            class="
              mb-10
              ml-20
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
            Girl
          </div>
        </nuxt-link>
      </div>

      <div class="relative md:w-1/3 flex-shrink-0">
        <img
          src="/island/home/men.jpg"
          alt=""
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

        <nuxt-link
          to="##"
          class="absolute inset-0 flex items-end justify-center"
        >
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
            Men
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
}
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
