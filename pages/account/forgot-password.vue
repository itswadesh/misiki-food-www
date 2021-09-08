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
      <!-- Forgot password start  -->

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
        <div class="flex flex-col">
          <div class="my-5 font-semibold">FORGOT PASSWORD</div>

          <form
            novalidate
            autocomplete="off"
            class="flex flex-col my-5 space-y-5"
            @submit.stop.prevent="submit()"
          >
            <p class="">we will email you the password reset link</p>
            <Textbox
              v-model="email"
              class="w-full"
              filled
              type="tel"
              name="email"
              required
              placeholder="Enter your email"
            />
            <GrnIndGradiantButton
              class="w-full"
              :class="loading ? 'bg-gray-500' : ''"
              type="submit"
              :disabled="loading"
            >
              Send email
            </GrnIndGradiantButton>
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

      <!-- Forgot password end -->
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Textbox } from '~/shared/components/ui'
import GrnIndGradiantButton from '~/components/ui/GrnIndGradiantButton.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { Textbox, GrnIndGradiantButton, NuxtLink },
  layout: 'none',
  data() {
    return { email: this.$route.query.email }
  },
  head() {
    return {
      title: `Forgot Password | ${this.store.websiteName || ''}`,
    }
  },
  computed: {
    ...mapGetters({ loading: 'loading', store: 'store' }),
  },
  methods: {
    ...mapActions({ emailPassword: 'auth/emailPassword' }),
    async submit() {
      try {
        await this.emailPassword({
          email: this.email,
        })
        this.$router.push(`/account/forgot-success`)
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
