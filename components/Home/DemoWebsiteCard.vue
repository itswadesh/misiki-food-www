<template>
  <section v-if="demo" class="container mx-auto w-64 lg:w-full">
    <div
      class="
        flex flex-col
        border border-transparent
        hover:border-gray-100
        rounded
        hover:bg-white hover:shadow-md
        text-gray-800
        group
      "
    >
      <a target="blank" :href="demo.link" class="block overflow-hidden">
        <div>
          <img
            v-lazy="demo.img"
            alt="product"
            class="object-contain object-top w-full h-56"
          />
        </div>

        <div class="p-4">
          <h5
            class="
              text-sm
              font-medium
              overflow-hidden
              whitespace-nowrap
              overflow-ellipsis
              group-hover:text-primary-500
            "
          >
            <span v-if="demo.name"> {{ demo.name }}</span>

            <span v-else> _</span>
          </h5>
        </div>
      </a>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    demo: { type: Object, default: () => {} },
    pid: { type: String, default: null },
  },

  data() {
    return {
      isActive: false,
    }
  },

  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },

  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success' }),
  },
}
</script>

<style scoped></style>
