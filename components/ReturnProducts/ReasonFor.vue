<template>
  <div>
    <div
      class="
        container
        flex flex-row
        justify-center
        p-4
        px-8
        mx-auto
        text-xs
        font-medium
        tracking-wider
        text-center text-gray-500
        bg-gray-100
      "
    >
      Select the Reason for returning the product
    </div>
    <div class="container w-full h-64 p-5 mx-auto overflow-auto bg-white">
      <div v-for="d in reason" :key="d.id" class="flex flex-row w-4/5 mx-auto">
        <label class="flex flex-row my-2 text-sm cursor-pointer">
          <Radio
            name="group"
            class="
              w-4
              h-4
              mx-3
              my-auto
              me-3
              text-secondary-500
              focus:ring-1 focus:ring-secondary-500
            "
          />
          <span class="text-sm">{{ d.d }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { Radio } from '~/shared/components/ui'
export default {
  components: { Radio },
  data() {
    return {
      reason: [
        { d: 'Changed Mind' },
        { d: 'Arrived late than expected' },
        { d: 'Damages upon Arrival' },
        { d: 'Wrong items delivered' },
        { d: 'Does not fit' },
        { d: 'Does not work' },
        { d: 'Fake product' },
        { d: 'Used' },
        { d: 'Other' },
      ],
    }
  },
}
</script>
