<template>
  <section>
    <div class="flex items-center justify-center space-x-2">
      <div class="relative flex-col group">
        <button
          class="
            h-10
            w-10
            flex
            items-center
            justify-center
            rounded
            bg-transparent
            hover:bg-gray-100
            transition
            duration-300
            focus:outline-none focus:ring-0 focus:ring-offset-0
          "
          @click="showCurrency = true"
        >
          <span class="uppercase font-bold tracking-wide text-gray-800"
            >INR</span
          >
        </button>

        <div
          class="
            absolute
            hidden
            group-hover:flex
            flex-col
            items-center
            delay_open
            ease-in-out
            bottom-0
            inset-x-0
            mb-11
          "
        >
          <div
            class="
              relative
              z-10
              px-3
              py-1
              bg-gray-800
              rounded-md
              shadow-lg
              width
            "
          >
            <h6
              class="
                text_size
                sm:text-sm
                text-center
                font-light
                tracking-wide
                text-white
              "
            >
              Choose your currency
            </h6>
          </div>

          <div
            class="w-2 h-2 sm:h-3 sm:w-3 transform rotate-45 bg-gray-800 -mt-2"
          ></div>
        </div>
      </div>

      <div class="relative flex-col group">
        <button
          class="
            h-10
            w-10
            flex
            items-center
            justify-center
            rounded
            bg-transparent
            hover:bg-gray-100
            transition
            duration-300
            focus:outline-none focus:ring-0 focus:ring-offset-0
            overflow-hidden
          "
          @click="showLanguages = true"
        >
          <img
            v-lazy="`/flags/india-flag.png?tr=w-40,h-40,fo-auto`"
            alt=""
            class="h-8 w-8 rounded-full object-cover"
          />
        </button>

        <div
          class="
            absolute
            hidden
            group-hover:flex
            flex-col
            items-center
            delay_open
            ease-in-out
            bottom-0
            inset-x-0
            mb-11
          "
        >
          <div
            class="
              relative
              z-10
              px-3
              py-1
              bg-gray-800
              rounded-md
              shadow-lg
              width
            "
          >
            <h6
              class="
                text_size
                sm:text-sm
                text-center
                font-light
                tracking-wide
                text-white
              "
            >
              Choose your language
            </h6>
          </div>

          <div
            class="w-2 h-2 sm:h-3 sm:w-3 transform rotate-45 bg-gray-800 -mt-2"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="showCurrency">
      <Currency :show="showCurrency" @close="showCurrency = false" />
    </div>

    <div v-if="showLanguages">
      <Languages :show="showLanguages" @close="showLanguages = false" />
    </div>
  </section>
</template>

<script>
import Currency from '~/components/CurrencyLanguage/Currency.vue'
import Languages from '~/components/CurrencyLanguage/Languages.vue'

export default {
  components: { Currency, Languages },

  data() {
    return {
      showCurrency: false,
      showLanguages: false,
    }
  },
}
</script>

<style scoped>
.width {
  width: max-content;
  max-width: 15rem;
}

.text_size {
  font-size: 12px;
}

.delay_open {
  animation: delay 1.5s;
}

@keyframes delay {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
