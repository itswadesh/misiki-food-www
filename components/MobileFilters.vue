<template>
  <div>
    <div
      class="
        container
        sticky
        top-0
        z-10
        max-w-full
        mx-auto
        bg-white
        border-b border-gray-200
      "
    >
      <div class="h-11 sm:h-12 flex flex-row justify-between p-2 text-sm">
        <div class="my-auto text-sm font-light text-gray-500 space-x-1">
          <span v-if="count === 0" class="font-bold">No</span>

          <span v-else class="font-bold"> {{ count }} </span>

          <span>products found</span>
        </div>

        <div class="flex flex-row my-auto">
          <div
            class="
              flex flex-row
              mx-auto
              overflow-x-hidden overflow-y-hidden
              transition
              ease-in-out
              cursor-pointer
              me-5
              focus:outline-none
              duration-1500
            "
            @click="showMobileSort = !showMobileSort"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </div>

          <div
            class="
              flex flex-row
              mx-auto
              overflow-x-hidden overflow-y-hidden
              transition
              ease-in-out
              cursor-pointer
              focus:outline-none
              duration-1500
            "
            @click="showMobileFilter = !showMobileFilter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>

          <!-- <div
            class="
              bg-red-500
              text-xs
              w-5
              h-5
              flex
              items-center
              text-center
              justify-center
              text-white
              -mt-2
              -ms-2
              rounded-full
            "
          >
            23
          </div> -->
        </div>
      </div>
    </div>

    <SortSlideUp
      v-if="showMobileSort"
      :class="showMobileSort ? 'slideUp' : 'slideDown'"
      @hideSort="showMobileSort = false"
    />

    <div
      v-if="facets && showMobileFilter"
      class="z-50 fixed inset-0 bg-white text-sm mt-rem"
      :class="showMobileSort ? 'slideUp' : 'slideDown'"
    >
      <div class="h-11 sm:h-12 flex flex-row justify-between p-2 text-sm">
        <button
          type="button"
          aria-label="Close"
          class="font-medium text-primary-500 focus:outline-none"
          @click="hideFilter"
        >
          Close
        </button>

        <h6>FILTER</h6>

        <button
          type="button"
          aria-label="Clear all"
          class="font-medium text-primary-500 focus:outline-none"
          @click="clearAll"
        >
          Clear all
        </button>
      </div>

      <hr class="border-t border-gray-200 w-full" />

      <div class="flex w-full h-full">
        <div class="w-2/5 border-r border-gray-200">
          <ul class="h-full bg-gray-100 divide-y divide-gray-200">
            <li
              v-if="
                facets.brands &&
                facets.brands &&
                facets.brands.all.buckets &&
                facets.brands.all.buckets.length > 0
              "
              class="p-2 font-normal text-gray-500 border-l-4"
              :class="{
                'bg-white text-primary-500  border-primary-500':
                  selected === 'brands',
              }"
              @click="selected = 'brands'"
            >
              Brands
            </li>

            <li
              v-if="
                facets.genders &&
                facets.genders &&
                facets.genders.all.buckets &&
                facets.genders.all.buckets.length > 0
              "
              class="p-2 font-normal text-gray-500 border-l-4"
              :class="{
                'bg-white text-primary-500  border-primary-500':
                  selected === 'genders',
              }"
              @click="selected = 'genders'"
            >
              Gender
            </li>

            <li
              v-if="
                facets.colors &&
                facets.colors &&
                facets.colors.all.buckets &&
                facets.colors.all.buckets.length > 0
              "
              class="p-2 font-normal text-gray-500 border-l-4"
              :class="{
                'bg-white text-primary-500  border-primary-500':
                  selected === 'colors',
              }"
              @click="selected = 'colors'"
            >
              Color
            </li>

            <li
              v-if="
                facets.sizes &&
                facets.sizes &&
                facets.sizes.all.buckets &&
                facets.sizes.all.buckets.length > 0
              "
              class="p-2 font-normal text-gray-500 border-l-4"
              :class="{
                'bg-white text-primary-500  border-primary-500':
                  selected === 'sizes',
              }"
              @click="selected = 'sizes'"
            >
              Sizes
            </li>

            <li
              v-if="
                facets.price &&
                facets.price &&
                facets.price.all.buckets &&
                facets.price.all.buckets.length > 0
              "
              class="p-2 font-normal text-gray-500 border-l-4"
              :class="{
                'bg-white text-primary-500  border-primary-500':
                  selected === 'price',
              }"
              @click="selected = 'price'"
            >
              Price
            </li>

            <li
              v-if="
                facets.age &&
                facets.age &&
                facets.age.all.buckets &&
                facets.age.all.buckets.length > 0
              "
              class="p-2 font-normal text-gray-500 border-l-4"
              :class="{
                'bg-white text-primary-500  border-primary-500':
                  selected === 'age',
              }"
              @click="selected = 'age'"
            >
              Age
            </li>

            <li
              v-if="
                facets.discount &&
                facets.discount &&
                facets.discount.all.buckets &&
                facets.discount.all.buckets.length > 0
              "
              class="p-2 font-normal text-gray-500 border-l-4"
              :class="{
                'bg-white text-primary-500  border-primary-500':
                  selected === 'discount',
              }"
              @click="selected = 'discount'"
            >
              Discount
            </li>
          </ul>
        </div>

        <div class="w-full max-height overflow-y-auto">
          <!-- <ul
            class="w-full p-2"
            v-if="selected === 'categories' && facets.categories && facets.categories.all && facets.categories.all.buckets"
          >
            <li
              v-for="b in facets.categories && facets.categories.all && facets.categories.all.buckets"
              :key="b.key"
            >
              <Checkbox
                :count="b.doc_count"
                :value="b.key"
                v-model="fl.categories"
                @change="changed({model:'categories',checked:fl.categories})"
              >{{b.key}}</Checkbox>
            </li>
          </ul> -->
          <ul
            v-if="
              selected === 'brands' &&
              facets.brands &&
              facets.brands.all &&
              facets.brands.all.buckets
            "
            class="w-full p-2"
          >
            <li
              v-for="b in facets.brands &&
              facets.brands.all &&
              facets.brands.all.buckets"
              :key="b.key"
              class="pb-2"
            >
              <Checkbox
                v-model="fl.brands"
                :count="b.doc_count"
                :value="b.key"
                @change="changed({ model: 'brands', checked: fl.brands })"
              >
                {{ b.key }}
              </Checkbox>
            </li>
          </ul>
          <ul
            v-if="
              selected === 'genders' &&
              facets.genders &&
              facets.genders.all &&
              facets.genders.all.buckets
            "
            class="w-full p-2"
          >
            <li
              v-for="b in facets.genders &&
              facets.genders.all &&
              facets.genders.all.buckets"
              :key="b.key"
              class="pb-2"
            >
              <Checkbox
                v-model="fl.genders"
                :count="b.doc_count"
                :value="b.key"
                @change="changed({ model: 'genders', checked: fl.genders })"
              >
                {{ b.key }}
              </Checkbox>
            </li>
          </ul>
          <ul
            v-if="
              selected === 'colors' &&
              facets.colors &&
              facets.colors.all &&
              facets.colors.all.buckets
            "
            class="w-full p-2"
          >
            <li
              v-for="b in facets.colors &&
              facets.colors.all &&
              facets.colors.all.buckets"
              :key="b.key"
              class="pb-2"
            >
              <Checkbox
                v-model="fl.colors"
                :count="b.doc_count"
                :value="b.key"
                @change="changed({ model: 'colors', checked: fl.colors })"
              >
                {{ b.key }}
              </Checkbox>
            </li>
          </ul>
          <ul
            v-if="
              selected === 'sizes' &&
              facets.sizes &&
              facets.sizes.all.buckets &&
              facets.sizes.all.buckets.length > 0
            "
            class="w-full p-2"
          >
            <li
              v-for="b in facets.sizes &&
              facets.sizes.all &&
              facets.sizes.all.buckets"
              :key="b.key"
              class="pb-2"
            >
              <Checkbox
                v-model="fl.sizes"
                :count="b.doc_count"
                :value="b.key"
                @change="changed({ model: 'sizes', checked: fl.sizes })"
              >
                {{ b.key }}
              </Checkbox>
            </li>
          </ul>
          <ul
            v-if="
              selected === 'price' &&
              facets.price &&
              facets.price.all.buckets &&
              facets.price.all.buckets.length > 0
            "
            class="w-full p-2"
          >
            <li
              v-for="b in facets.price &&
              facets.price.all &&
              facets.price.all.buckets"
              :key="b.key"
              class="pb-2"
            >
              <Radio
                v-model="fl.price"
                :count="b.doc_count"
                :value="b.from + ',' + b.to"
                @change="changed({ model: 'price', checked: fl.price })"
              >
                {{ b.key }}
              </Radio>
            </li>
          </ul>
          <ul
            v-if="
              selected === 'age' &&
              facets.age &&
              facets.age.all.buckets &&
              facets.age.all.buckets.length > 0
            "
            class="w-full p-2"
          >
            <li
              v-for="b in facets.age &&
              facets.age.all &&
              facets.age.all.buckets"
              :key="b.key"
              class="pb-2"
            >
              <Radio
                v-model="fl.age"
                :count="b.doc_count"
                :value="b.from + ',' + b.to"
                @change="changed({ model: 'age', checked: fl.age })"
              >
                {{ b.key }}
              </Radio>
            </li>
          </ul>
          <ul
            v-if="
              selected === 'discount' &&
              facets.discount &&
              facets.discount.all &&
              facets.discount.all.buckets &&
              facets.discount.all.buckets.length > 0
            "
            class="w-full p-2"
          >
            <li
              v-for="b in facets.discount &&
              facets.discount.all &&
              facets.discount.all.buckets"
              :key="b.key"
              class="pb-2"
            >
              <Radio
                v-model="fl.discount"
                :count="b.doc_count"
                :value="b.from + ',' + b.to"
                @change="changed({ model: 'discount', checked: fl.discount })"
              >
                {{ b.key }}
              </Radio>
            </li>
          </ul>
        </div>
      </div>

      <GrnIndGradiantButton
        square
        class="fixed inset-x-0 bottom-0 w-full py-3"
        @click="hideFilter"
      >
        APPLY
      </GrnIndGradiantButton>
    </div>
  </div>
</template>
<script>
import { Checkbox, Radio } from '~/shared/components/ui'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
import SortSlideUp from '~/components/Listing/Mobile/SortSlideUp'
import { constructURL } from '~/lib/'

export default {
  components: { Checkbox, Radio, SortSlideUp, GrnIndGradiantButton },

  props: {
    count: {
      type: Number,
      default: null,
    },

    clear: Boolean,

    fl: {
      type: [Object, Array],
      default: () => {},
    },

    facets: {
      type: [Object, Array],
      default: () => {
        return {}
      },
    },
  },

  data() {
    return {
      isFilter: false,
      selected: 'brands',
      loadingPrice: true, // Required because after loading finished then only we will initiate the price slider component
      showMobileFilter: false,
      showMobileSort: false,
    }
  },

  created() {
    // console.log(this.facets)
  },

  methods: {
    hideFilter(e) {
      this.showMobileFilter = false
      // this.$emit('hide', true)
    },

    Changed(i) {
      console.error('categoryChanged', i)
    },

    changed(e) {
      this.fl[e.model] = e.checked
      // this.fl.pilot = e.checked;
      const url = constructURL(`/search`, this.fl)
      this.$router.push(url)
    },

    checkCategory() {},

    go(slug) {
      this.$router.push(`/` + slug)
    },

    clearAll() {
      this.$router.push({ query: null })
      this.$emit('hide')
    },
  },
}
</script>

<style scoped>
.slideUp {
  top: 100%;
  transition: 0.3s all;
}

.slideDown {
  bottom: -100%;
  transition: 0.3s all;
}

.mt-rem {
  margin-top: 6.5rem;
}

.max-height {
  height: 70vh;
}
</style>
