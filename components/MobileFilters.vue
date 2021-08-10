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
      <div class="h-11 flex flex-row justify-between p-2 px-3 text-sm">
        <div class="my-auto text-sm font-light text-gray-500">
          <span v-if="count == 0">No</span>
          <b v-else> {{ count }} </b> <span>products found</span>
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
              me-4
              focus:outline-none
              duration-1500
            "
            @click="showMobileSort = !showMobileSort"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 me-1 text-primary-500"
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
              class="h-5 w-5 text-primary-500"
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
      v-if="!!showMobileSort"
      class="fixed"
      @hideSort="showMobileSort = false"
    />
    <div
      v-if="facets && showMobileFilter"
      class="
        py-2\1
        shadow
        h-full
        bg-white
        z-50
        top-24
        fixed
        w-full
        filters-demo
      "
    >
      <div
        class="
          flex
          w-full
          px-4
          py-4
          text-base
          font-light
          text-gray-600
          bg-white
          shadow-md
        "
      >
        <div class="flex-1 text-start" @click="hideFilter">
          CLOSE
          <i class="ms-2 fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="flex-1 font-medium text-center text-primary-500">
          FILTER
        </div>
        <button class="flex-1 text-end focus:outline-none" @click="clearAll">
          Clear all
        </button>
      </div>
      <div class="flex w-full h-full mt-2">
        <div class="w-2/5">
          <ul class="h-full bg-gray-200">
            <li
              v-if="
                facets.brands &&
                facets.brands &&
                facets.brands.all.buckets &&
                facets.brands.all.buckets.length > 0
              "
              class="p-2 text-base font-normal text-gray-500"
              :class="{
                'bg-white text-primary-500 border-l-4 border-primary-500':
                  selected == 'brands',
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
              class="p-2 text-base font-normal text-gray-500"
              :class="{
                'bg-white text-primary-500 border-l-4 border-primary-500':
                  selected == 'genders',
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
              class="p-2 text-base font-normal text-gray-500"
              :class="{
                'bg-white text-primary-500 border-l-4 border-primary-500':
                  selected == 'colors',
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
              class="p-2 text-base font-normal text-gray-500"
              :class="{
                'bg-white text-primary-500 border-l-4 border-primary-500':
                  selected == 'sizes',
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
              class="p-2 text-base font-normal text-gray-500"
              :class="{
                'bg-white text-primary-500 border-l-4 border-primary-500':
                  selected == 'price',
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
              class="p-2 text-base font-normal text-gray-500"
              :class="{
                'bg-white text-primary-500 border-l-4 border-primary-500':
                  selected == 'age',
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
              class="p-2 text-base font-normal text-gray-500"
              :class="{
                'bg-white text-primary-500 border-l-4 border-primary-500':
                  selected == 'discount',
              }"
              @click="selected = 'discount'"
            >
              Discount
            </li>
          </ul>
        </div>
        <div class="w-full overflow-y-auto pb-56">
          <!-- <ul
            class="w-full px-5 py-2 ms-2"
            v-if="selected == 'categories' && facets.categories && facets.categories.all && facets.categories.all.buckets"
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
              selected == 'brands' &&
              facets.brands &&
              facets.brands.all &&
              facets.brands.all.buckets
            "
            class="w-full px-5 py-2 ms-2 overflow-x-auto"
          >
            <li
              v-for="b in facets.brands &&
              facets.brands.all &&
              facets.brands.all.buckets"
              :key="b.key"
              class="py-1"
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
              selected == 'genders' &&
              facets.genders &&
              facets.genders.all &&
              facets.genders.all.buckets
            "
            class="w-full px-5 py-2 ms-2"
          >
            <li
              v-for="b in facets.genders &&
              facets.genders.all &&
              facets.genders.all.buckets"
              :key="b.key"
              class="py-1"
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
              selected == 'colors' &&
              facets.colors &&
              facets.colors.all &&
              facets.colors.all.buckets
            "
            class="w-full px-5 py-2 ms-2"
          >
            <li
              v-for="b in facets.colors &&
              facets.colors.all &&
              facets.colors.all.buckets"
              :key="b.key"
              class="py-1"
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
              selected == 'sizes' &&
              facets.sizes &&
              facets.sizes.all.buckets &&
              facets.sizes.all.buckets.length > 0
            "
            class="w-full px-5 py-2 ms-2"
          >
            <li
              v-for="b in facets.sizes &&
              facets.sizes.all &&
              facets.sizes.all.buckets"
              :key="b.key"
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
              selected == 'price' &&
              facets.price &&
              facets.price.all.buckets &&
              facets.price.all.buckets.length > 0
            "
            class="w-full px-5 py-2 ms-2"
          >
            <li
              v-for="b in facets.price &&
              facets.price.all &&
              facets.price.all.buckets"
              :key="b.key"
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
              selected == 'age' &&
              facets.age &&
              facets.age.all.buckets &&
              facets.age.all.buckets.length > 0
            "
            class="w-full px-5 py-2 ms-2"
          >
            <li
              v-for="b in facets.age &&
              facets.age.all &&
              facets.age.all.buckets"
              :key="b.key"
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
              selected == 'discount' &&
              facets.discount &&
              facets.discount.all &&
              facets.discount.all.buckets &&
              facets.discount.all.buckets.length > 0
            "
            class="w-full px-5 py-2 ms-2"
          >
            <li
              v-for="b in facets.discount &&
              facets.discount.all &&
              facets.discount.all.buckets"
              :key="b.key"
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
      <div
        class="
          fixed
          inset-x-0
          bottom-0
          z-10
          flex flex-row
          p-1
          bg-white
          border
          shadow
        "
      >
        <!-- <button
            @click="hideFilter"
            class="w-1/3 h-12 p-1 tracking-wider text-gray-700 bg-gray-300 rounded me-3 focus:outline-none text-medium"
          >
            CLOSE
          </button> -->
        <Button
          class="
            w-full
            h-12
            p-1
            text-xl
            font-light
            tracking-wider
            text-white
            rounded
            hover:bg-accent-500
            focus:outline-none
            bg-primary-500
            text-medium
          "
          @click="hideFilter"
        >
          APPLY
        </Button>
      </div>
      <!-- <div class="absolute bottom-0 w-full text-center primary">
        <button class="w-full p-3 font-bold text-white shadow-md cursor-pointer hover:bg-yellow-600 bg-primary-500 focus:outline-none">APPLY</button>
      </div> -->
    </div>
  </div>
</template>
<script>
import { Checkbox, Button, Radio } from '~/shared/components/ui'
import SortSlideUp from '~/components/Listing/Mobile/SortSlideUp'
import { constructURL } from '~/lib/'

export default {
  components: { Checkbox, Radio, SortSlideUp, Button },
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
      const url = constructURL(`/${this.$route.params.store}/search`, this.fl)
      this.$router.push(url)
    },
    checkCategory() {},
    go(slug) {
      this.$router.push(`/${this.$route.params.store}/` + slug)
    },
    clearAll() {
      this.$router.push({ query: null })
      this.$emit('hide')
    },
  },
}
</script>
