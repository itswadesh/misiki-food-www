<template>
  <section
    class="
      flex flex-col
      items-center
      justify-center
      h-screen
      p-2
      text-center text-gray-600
      bg-gradient-to-br
      from-green-100
      to-indigo-100
    "
  >
    <div class="w-full max-w-sm mx-auto">
      <div class="p-4 md:p-0 frosted rounded-md shadow-md">
        <!-- Login side start  -->

        <div class="py-10 mx-auto text-center md:w-10/12">
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
              >Litekart</span
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
            <nuxt-link to="/login" class="mt-5 link">Back to login</nuxt-link>
          </div>
        </div>

        <!-- Login side end -->
      </div>
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
  computed: {
    ...mapGetters({ loading: 'loading' }),
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

<style scoped></style>
