<template>
  <div class="">
    <div v-for="d in details" :key="d.id" class="w-full text-gray-600">
      <label
        class="
          flex flex-row
          w-full
          p-1
          rounded
          cursor-pointer
          ps-4
          hover:bg-primary-200
        "
      >
        <Checkbox
          v-model="selectedvalue"
          :value="d.name"
          @change="onChangeValue"
        />
        <!-- <input
          class="w-4 h-4 my-auto border-none rounded-sm me-3 bg-gray-50 text-primary-500 ring-gray-400 ring-1 focus:ring-1 focus:ring-primary-500 focus:ring-offset-0"
          type="checkbox"
          @change="onChangeValue"
          :value="d.name"
          v-model="selectedvalue"
        /> -->
        <span class="w-full my-auto text-sm text-gray-600">{{ d.name }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { Checkbox } from '~/shared/components/ui'

export default {
  components: { Checkbox },
  props: {
    details: {
      type: Array,
    },
    model: {
      type: String,
    },
    fl: {
      type: Object,
    },
  },
  data() {
    return {
      selectedvalue: [],
    }
  },
  watch: {
    '$route.query'() {
      this.getFilterdata()
    },
  },
  // watch: {
  //   '$route.query': function () {
  //     this.getFilterdata()
  //   },
  // },
  created() {
    this.getFilterdata()
  },
  methods: {
    getFilterdata() {
      const qry = this.$route.query
      // this.fl = qry/
      this.selectedvalue = []
      if (this.$route.query) {
        Object.keys(this.$route.query).forEach((e) => {
          if (e === this.model) {
            // console.log(typeof qry[e])

            // console.log(qry[e].split(','))
            //   this.selectedvalue.push(qry[e].split(','))
            this.selectedvalue = qry[e].split(',')
            // console.log(this.selectedvalue)
          }
        })
      }
    },
    onChangeValue() {
      // console.log('naman')
      // console.log(this.selectedvalue)
      // console.log(this.fl)
      if (this.selectedvalue.length === 0) {
        Object.keys(this.fl).forEach((e) => {
          if (e === this.model) {
            delete this.fl[e]
          }
        })
      } else {
        Object.keys(this.fl).forEach((e) => {
          let val
          if (e === this.model) {
            val = this.selectedvalue.toString()
            this.fl[e] = val
          } else {
            // this.fl = {
            //   [key]: this.model,
            // }
            val = this.selectedvalue.toString()
            this.fl[this.model] = val
          }
          // console.log(this.fl, 'sssssssssssssssss')
        })
      }

      this.$emit('onChangeValue')
    },
  },
}
</script>
