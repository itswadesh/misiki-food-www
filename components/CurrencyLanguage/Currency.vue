<template>
  <div>
    <ModalLarge :show="show" title="Select your currency" type="info" noicon>
      <!-- Close button start -->
      <button
        type="button"
        class="
          absolute
          p-1
          transition
          duration-300
          transform
          rounded-md
          hover:bg-opacity-50
          group
          hover:bg-gray-900 hover:shadow-md
          top-3
          right-3
          focus:outline-none focus:scale-75
        "
        @click="$emit('close')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 transition duration-100 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <!-- Close button end -->

      <div class="w-full text-gray-800">
        <div class="mb-5">
          <h6 class="ml-4 mb-5 font-semibold">Suggested for you</h6>

          <div class="grid grid-cols-3 md:grid-cols-4 gap-x-5">
            <button
              v-for="(s, sx) in SuggestedForYou"
              :key="sx"
              class="
                px-4
                py-3
                w-full
                text-sm text-left
                flex flex-col
                bg-transparent
                hover:bg-gray-100
                focus:outline-none
              "
            >
              <span> {{ s.currencyname }}</span>
              <span class="uppercase">{{ s.currencycode }}</span>
            </button>
          </div>
        </div>

        <div>
          <h6 class="ml-4 mb-5 font-semibold">All currencies</h6>

          <div class="grid grid-cols-3 md:grid-cols-4 gap-x-5">
            <button
              v-for="(a, ax) in AllCurrencies"
              :key="ax"
              class="
                px-4
                py-3
                w-full
                text-sm text-left
                flex flex-col
                bg-transparent
                hover:bg-gray-100
                focus:outline-none
              "
            >
              <span> {{ a.currencyname }}</span>
              <span class="uppercase">{{ a.currencycode }}</span>
            </button>
          </div>
        </div>
      </div>
    </ModalLarge>
  </div>
</template>

<script>
import ModalLarge from '~/shared/components/ui/ModalLarge.vue'

export default {
  components: {
    ModalLarge,
  },

  props: {
    show: { type: Boolean, default: false },
  },

  data() {
    return {
      SuggestedForYou: [
        { currencyname: 'Euro', currencycode: 'EUR' },
        { currencyname: 'US.dollar', currencycode: 'USD' },
        { currencyname: 'Pound sterling', currencycode: 'GBP' },
        { currencyname: 'U.A.E. dirham', currencycode: 'EUR' },
        { currencyname: 'Australian dollar', currencycode: 'AUD' },
      ],

      AllCurrencies: [
        { currencyname: 'Property currency', currencycode: '€£$' },
        { currencyname: 'Argentine peso', currencycode: 'ARS' },
        { currencyname: 'Australian dollar', currencycode: 'AUD' },
        { currencyname: 'Azerbaijan, New Manats', currencycode: 'AZN' },
        { currencyname: 'U.A.E. dirham', currencycode: 'EUR' },
        { currencyname: 'Indian rupee', currencycode: 'INR' },
        { currencyname: 'Property currency', currencycode: '€£$' },
        { currencyname: 'Argentine peso', currencycode: 'ARS' },
        { currencyname: 'Australian dollar', currencycode: 'AUD' },
        { currencyname: 'Azerbaijan, New Manats', currencycode: 'AZN' },
        { currencyname: 'U.A.E. dirham', currencycode: 'EUR' },
        { currencyname: 'Indian rupee', currencycode: 'INR' },
        { currencyname: 'Property currency', currencycode: '€£$' },
        { currencyname: 'Argentine peso', currencycode: 'ARS' },
        { currencyname: 'Australian dollar', currencycode: 'AUD' },
        { currencyname: 'Azerbaijan, New Manats', currencycode: 'AZN' },
        { currencyname: 'U.A.E. dirham', currencycode: 'EUR' },
        { currencyname: 'Indian rupee', currencycode: 'INR' },
        { currencyname: 'Property currency', currencycode: '€£$' },
        { currencyname: 'Argentine peso', currencycode: 'ARS' },
        { currencyname: 'Australian dollar', currencycode: 'AUD' },
        { currencyname: 'Azerbaijan, New Manats', currencycode: 'AZN' },
        { currencyname: 'U.A.E. dirham', currencycode: 'EUR' },
        { currencyname: 'Indian rupee', currencycode: 'INR' },
        { currencyname: 'Property currency', currencycode: '€£$' },
        { currencyname: 'Argentine peso', currencycode: 'ARS' },
        { currencyname: 'Australian dollar', currencycode: 'AUD' },
        { currencyname: 'Azerbaijan, New Manats', currencycode: 'AZN' },
        { currencyname: 'U.A.E. dirham', currencycode: 'EUR' },
        { currencyname: 'Indian rupee', currencycode: 'INR' },
        { currencyname: 'Property currency', currencycode: '€£$' },
        { currencyname: 'Argentine peso', currencycode: 'ARS' },
        { currencyname: 'Australian dollar', currencycode: 'AUD' },
        { currencyname: 'Azerbaijan, New Manats', currencycode: 'AZN' },
        { currencyname: 'U.A.E. dirham', currencycode: 'EUR' },
        { currencyname: 'Indian rupee', currencycode: 'INR' },
      ],
    }
  },
}
</script>

<style scoped></style>
