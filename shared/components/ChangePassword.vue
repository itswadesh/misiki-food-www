<template>
  <div
    class="w-full p-5 mt-0 bg-white shadow lg:w-1/2 lg:mt-10 xs:w-full lg:ms-10"
  >
    <div class="border-b border-gray-300">
      <div
        class="
          px-0
          py-4
          text-lg
          font-bold
          border-b border-gray-200
          headings
          lg:px-8
        "
      >
        <i
          class="block me-2 fa fa-arrow-left lg:invisible"
          aria-hidden="true"
          @click="$router.push('/my/')"
        ></i
        >Password
      </div>
    </div>
    <div class="w-full">
      <form
        class="px-0 py-8 lg:px-16"
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit"
      >
        <span class="text-sm">Minimum 6 characters</span>
        <div class="w-full mt-3 mb-4 lg:w-1/2">
          <Textbox
            ref="password"
            v-model="password"
            name="password"
            label="Password"
            type="password"
            class="w-full"
          />
        </div>
        <div class="w-1/3 lg:w-1/2">
          <button
            class="
              w-full
              px-1
              py-2
              font-bold
              text-white
              rounded
              primary
              lg:px-4
              focus:outline-none
            "
            type="submit"
          >
            SAVE
          </button>
        </div>
        <input />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { Textbox } from '~/shared/components/ui'
export default {
  components: { Textbox },
  layout: 'account',
  head() {
    return {
      title: 'Change Password',
    }
  },
  methods: {
    ...mapActions({
      changePassword: 'auth/changePassword',
    }),
    ...mapMutations({ setErr: 'setErr' }),
    async submit() {
      if (!this.password || this.password === '') {
        this.setErr('Current Password can not be blank')
        return
      } else if (!this.password || this.password === '') {
        this.setErr('New Password can not be blank')
        return
      }
      try {
        await this.changePassword(this.password)
        this.$router.push('/my/orders')
      } catch (e) {}
    },
  },
}
</script>
