<template>
  <div v-if="show" class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:min-h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          overflow-hidden
          align-bottom
          transition-all
          transform
          bg-white
          rounded-lg
          shadow-xl
          text-start
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
          h-96
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white">
          <div
            class="
              flex flex-row
              justify-between
              p-4
              text-lg text-gray-500
              border-b
            "
          >
            <div>Schedule a live demo</div>
            <button
              type="button"
              class="focus:outline-none"
              @click="hide(null)"
            >
              <svg
                class="w-6 h-6 text-gray-500 hover:text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
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
          </div>
          <form
            v-if="schedule.scheduleDateTime"
            novalidate
            autocomplete="off"
            class="
              relative
              text-center
              justify-between
              m-3
              space-y-6
              border-none
              rounded
            "
            @submit.stop.prevent="submit"
          >
            <VueCtkDateTimePicker
              v-model="schedule.scheduleDateTime"
              :min-date="minDate"
              class="shadow-md"
            />
            <div class="my-6">
              Schedule product demo request for {{ product && product.name }}
            </div>
            <!-- <Textbox
              id="name"
              v-model="schedule.name"
              type="text"
              placeholder="Your Name *"
              class="w-full mx-auto md:w-4/5"
              required
              autofocus
            />
            <Textbox
              id="name"
              v-model="schedule.email"
              type="text"
              placeholder="Your Email *"
              class="w-full mx-auto md:w-4/5"
              required
              autofocus
            /> -->

            <Button
              :disabled="isDisabled"
              type="submit"
              :class="{ 'bg-gray-400': isDisabled }"
              class="
                w-4/5
                p-2
                mx-auto
                focus:ring-2 focus:ring-primary-500
                bg-secondary-500
              "
            >
              <span v-if="loading">
                <svg
                  class="w-6 h-6 text-white -ms-1 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>

              <div v-else>Schedule</div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import { mapMutations } from 'vuex'
import { Button } from '~/shared/components/ui'
import SAVE_SCHEDULE_DEMO from '~/gql/scheduleDemo/saveScheduleDemo.gql'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
export default {
  components: {
    Button,
    VueCtkDateTimePicker,
  },
  props: {
    product: { type: Object, default: null },
    show: { type: Boolean, default: false },
  },
  data() {
    return {
      minDate: null,
      loading: false,
      schedule: {
        id: 'new',
        title: 'Product demo request',
        scheduleDateTime: null,
      },
    }
  },
  computed: {
    isDisabled() {
      return !this.schedule.scheduleDateTime
    },
    settings() {
      return this.$store.state.settings || {}
    },
    user() {
      return this.$store.state.auth.user
    },
  },
  created() {
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD hh:mm:ss a')
    this.schedule.scheduleDateTime = tomorrow
    this.minDate = tomorrow
    // 2021-08-08 08:08 am
    if (!this.user) {
      this.$router.push(
        `/${this.$route.params.store}/login?ref=${this.$route.fullPath}`
      )
    }
    if (this.product) {
      this.schedule.product = this.product.id
      this.schedule.title = `Schedule product demo request for ${
        this.product && this.product.name
      }`
    }
  },
  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success' }),
    async submit() {
      const msg = 'Schedule Done !'
      this.loading = true
      // console.log('fesfsdfsdfs')
      try {
        await this.$post('scheduleDemo/saveScheduleDemo', this.schedule)
        // this.saveScheduleDemo = (
        //   await this.$apollo.mutate({
        //     mutation: SAVE_SCHEDULE_DEMO,
        //     variables: this.schedule,
        //   })
        // ).data.saveScheduleDemo
        // console.log('dsfsdfsdf', this.saveCustomerMessage)
        this.success(msg)
        this.$router.push(`/${this.$route.params.store}/my/demo-requests`)
      } catch (e) {
        this.setErr(e)
      } finally {
        // this.schedule.name = ''
        // this.schedule.email = ''
        // this.schedule.message = ''
        this.loading = false
        this.$emit('hide', true)
      }
    },
    hide(e) {
      if (e) this.$router.push(`/${this.$route.params.store}/c/${e}`)
      this.$emit('hide', true)
    },
  },
}
</script>
<style scoped>
.dashes {
  border: dashed 1px;
}
</style>
