<template>
  <section
    class="
      flex flex-col
      items-center
      justify-center
      min-h-screen
      p-2
      text-gray-600
      bg-gradient-to-br
      from-secondary-100
      to-primary-100
    "
  >
    <div class="px-4 border rounded-lg frosted w-full max-w-md">
      <!-- Change success start  -->

      <div class="flex flex-col py-10 mx-auto text-center md:w-10/12">
        <nuxt-link to="/" class="">
          <span
            class="
              text-4xl
              font-extrabold
              text-transparent
              bg-clip-text bg-gradient-to-br
              from-green-500
              to-blue-500
            "
            >{{ store.websiteName }}</span
          >
        </nuxt-link>

        <h2 class="py-5 font-semibold">RESET PASSWORD</h2>

        <hr />

        <form
          novalidate
          autocomplete="off"
          class="flex flex-col my-5 space-y-5"
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
          <PrimaryButtonRounded class="w-full mt-5"
            >Reset Password</PrimaryButtonRounded
          >
        </form>

        <div class="flex justify-center mt-5">
          <nuxt-link
            to="/login?forced=true"
            class="text-primary-500 hover:underline max-w-max"
          >
            Back to login
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { Textbox } from '~/shared/components/ui'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { Textbox, PrimaryButtonRounded, NuxtLink },
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
      title: `Reset Password | ${this.store.websiteName || ''}`,
    }
  },
  computed: {
    ...mapGetters({ loading: 'loading', store: 'store' }),
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

<style scoped>
.frosted {
  background-image: url('/login/bg-lighter.svg');
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
</style>
