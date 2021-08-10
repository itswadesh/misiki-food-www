<template>
  <div class="w-full">
    <div class="w-full">
      <div v-for="(d, i) in details" :key="d.id" class="w-full cursor-pointer">
        <label
          class="
            block
            w-full
            p-2
            text-gray-600
            rounded
            cursor-pointer
            hover:bg-yellow-100 hover:text-yellow-600
          "
        >
          <Radio
            v-model="selectedvalue"
            class="hidden my-auto border-none"
            :value="d"
            @change="onChangeValue(i)"
          />
          <span class="w-full pb-1 ps-2">{{ d.name }}</span>
          <span
            v-if="
              selectedvalue &&
              selectedvalue.children.length > 0 &&
              selectedCategoryIndex === i
            "
          >
            <FilterCategory
              :details="selectedvalue.children"
              class="mt-1 ps-2"
            />
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import FilterCategory from '~/components/Listing/FilterCategory'
export default {
  components: {
    FilterCategory,
  },
  props: {
    details: { type: Array, default: () => [] },
  },
  data() {
    return {
      selectedvalue: null,
      selectedCategoryIndex: null,
    }
  },
  watch: {
    '$route.query'() {
      if (this.$route.query.category === undefined) {
        this.selectedvalue = null
        this.selectedCategoryIndex = null
      }
    },
  },
  methods: {
    onChangeValue(i) {
      this.selectedCategoryIndex = i
      this.$router.push(`/c/${this.selectedvalue.slug}`)
      // $nuxt.$emit('onSelectCategory', this.selectedvalue.slug)
    },
  },
}
</script>
