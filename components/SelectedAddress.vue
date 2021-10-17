<template>
  <div class="p-2 bg-white rounded shadow">
    <div v-for="(a, ix) in addresses" :key="a.id" class="flex justify-between">
      <label class="flex justify-between w-full cursor-pointer">
        <div>
          <Radio />
        </div>
        <div class="flex-1 ms-2">
          <div class="font-semibold">
            {{ a.firstName }} {{ a.lastName }}
            <span v-if="ix == 0">(Default)</span>
          </div>
          <div class="py-2 text-xs">
            <div>{{ a.address }}</div>
            <div>{{ a.city }}</div>
            <div>{{ a.zip }}</div>
            <div>{{ a.state }}</div>
            <div class="py-2">
              Mobile:
              <span class="font-bold">{{ a.phone }}</span>
            </div>
          </div>
        </div>
        <div v-if="office">
          <div class="px-2 py-1 text-xs bg-gray-200 rounded-full">OFFICE</div>
        </div>
      </label>
      <label class="flex w-full border-t border-gray-200">
        <button
          class="
            w-1/2
            py-1
            mt-1
            tracking-widest
            text-blue-500
            border-r border-gray-200
            focus:outline-none focus:ring-0 focus:ring-offset-0
          "
          @click="go(`/checkout/address`)"
        >
          Edit/Change
        </button>
        <button
          class="
            w-1/2
            py-1
            mt-1
            tracking-widest
            text-blue-500
            focus:outline-none focus:ring-0 focus:ring-offset-0
          "
          @click="go(`/checkout/add`)"
        >
          Add New Address
        </button>
      </label>
    </div>
  </div>
</template>

<script>
import { Radio } from '~/shared/components/ui'

export default {
  components: { Radio },
  data() {
    return {
      office: false,
      addresses: [],
    }
  },
  created() {
    this.getAddress()
  },
  methods: {
    async getAddress() {
      const a = await this.$axios.$get('api/addresses/my')
      this.addresses = a.data
    },
    go(url) {
      this.$router.push(url)
    },
  },
}
</script>
