<template>
  <section>
    <div class="grid grid-cols-1 md:grid-cols-3">
      <div
        class="
          col-span-1
          md:col-span-2
          relative
          border-t
          md:border-t-2 md:border-r-2
          border-white
          flex-1
        "
      >
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

      <div
        class="col-span-1 relative border-t md:border-t-2 border-white flex-1"
      >
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
