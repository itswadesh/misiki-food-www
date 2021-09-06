<template>
  <Modal :show="show" title="Schedule Live Demo" type="info" :noicon="true">
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
    <form
      v-if="minDate"
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
        h-96
      "
      @submit.stop.prevent="submit"
    >
      <date-picker
        v-model="schedule.scheduleDateTime"
        type="datetime"
        :disabled-date="beforeTomorrow"
      ></date-picker>

      <!-- <VueDatePicker
        ref="menu"
        v-model="schedule.scheduleDateTime"
        :min-date="minDate"
        placeholder="Select Schedule Date Time"
        class="shadow-md"
        @onOpen="menu = true"
        @onClose="menu = false"
      /> -->
      <!-- <VueCtkDateTimePicker
        v-model="schedule.scheduleDateTime"
        :min-date="minDate"
        :no-button-now="true"
      /> -->
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
  </Modal>
</template>

<script>
import dayjs from 'dayjs'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import DatePicker from 'vue2-datepicker'
import { mapMutations } from 'vuex'
import { Button, Modal } from '~/shared/components/ui'
import SAVE_SCHEDULE_DEMO from '~/gql/scheduleDemo/saveScheduleDemo.gql'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import 'vue2-datepicker/index.css'
export default {
  components: {
    Button,
    Modal,
    VueCtkDateTimePicker,
    DatePicker,
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
    this.schedule.scheduleDateTime = tomorrow.toString()
    const tomo = dayjs().add(1, 'day').format('YYYY-MM-DD hh:mm:ss a')
    this.minDate = tomo // 2021-08-08 08:08 am
    if (!this.user) {
      this.$router.push(`/login?ref=${this.$route.fullPath}`)
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
    beforeTomorrow(date) {
      const today = dayjs()
      return date < today
    },
    async submit() {
      const msg = 'Schedule Done !'
      this.loading = true
      // console.log('fesfsdfsdfs')
      try {
        this.saveScheduleDemo = await this.$post(
          'scheduleDemo/saveScheduleDemo',
          this.schedule
        )
        // this.saveScheduleDemo = (
        //   await this.$apollo.mutate({
        //     mutation: SAVE_SCHEDULE_DEMO,
        //     variables: this.schedule,
        //   })
        // ).data.saveScheduleDemo
        // console.log('dsfsdfsdf', this.saveCustomerMessage)
        this.success(msg)
        this.$router.push(`/my/demo-requests`)
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
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hide', true)
    },
  },
}
</script>
<style scoped>
.margin {
  margin-bottom: -1px;
  margin-left: -0.5px;
}
.slowtransition {
  animation: fade 0.3s;
}
@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.frosted {
  /* background-color: rgb(150, 139, 224); */
  backdrop-filter: blur(12px);
  background-color: hsla(0, 0%, 100%, 0.3);
}
</style>
