<template>
  <div
    class="
      flex flex-col
      items-center
      justify-center
      h-screen
      p-2
      text-center text-gray-600
      bg-gradient-to-br
      from-secondary-100
      to-primary-100
    "
  >
    <div class="w-full max-w-sm">
      <div class="rounded-md shadow-md frosted flex flex-col">
        <h2 class="py-5 font-semibold">RESET PASSWORD</h2>

        <hr />
        <form
          novalidate
          autocomplete="off"
          class="py-5 mx-auto md:w-10/12 p-4"
          @submit.stop.prevent="submit()"
        >
          <h3 class="text-gray-500">Enter a new password for your account</h3>

          <Textbox
            v-model="password"
            class="mt-5"
            placeholder="New password"
            name="password"
            type="password"
            autofocus
          />
          <!-- <Textbox
            v-model="conformpassword"
            class="mt-5"
            placeholder="Conform password"
            name="conformpassword"
            type="password"
            autofocus
          /> -->
          <GrnIndGradiantButton class="w-full mt-5"
            >Reset Password</GrnIndGradiantButton
          >
        </form>
        <nuxt-link to="/login?forced=true" class="mt-5 mb-10 link"
          >Back to login</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Textbox } from '~/shared/components/ui'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { Textbox, GrnIndGradiantButton, NuxtLink },
  layout: 'none',
  data() {
    return {
      id: null,
      token: null,
      password: '',
      passwordConfirmation: '',
    }
  },
  head() {
    return {
      title: 'Reset Password',
    }
  },
  computed: {
    ...mapGetters({ loading: 'loading' }),
  },
  created() {
    this.id = this.$route.query.id
    this.token = this.$route.query.token
    this.$store.commit('busy', false)
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch('auth/resetPassword', {
          id: this.id,
          token: this.token,
          password: this.password,
          passwordConfirmation: this.password,
        })
        this.$router.push(`/account/reset-success`)
      } catch (e) {
        this.$store.commit('setErr', e)
      }
    },
  },
}
</script>
