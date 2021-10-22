<template>
  <section>
    <Megamenu class="hidden lg:flex px-10" />

    <div class="flex flex-col justify-center">
      <div>
        <h1 class="my-5 text-3xl font-bold text-center">Contact Us</h1>
      </div>

      <div class="container flex flex-col-reverse w-full mx-auto sm:flex-row">
        <div
          class="
            w-full
            py-3
            mt-5
            border-t-2
            sm:border-t-0 sm:py-0 sm:mt-0 sm:border-r-2 sm:w-1/2
          "
        >
          <form
            novalidate
            autocomplete="off"
            class="p-5 space-y-6"
            @submit.stop.prevent="submit"
          >
            <Textbox
              id="name"
              v-model="contact.name"
              type="text"
              placeholder="Your Name *"
              class="w-full mx-auto md:w-4/5"
              required
              autofocus
            />
            <Textbox
              id="email"
              v-model="contact.email"
              type="email"
              placeholder="Your Email *"
              class="w-full mx-auto md:w-4/5"
              required
            />
            <textarea
              v-model="contact.message"
              placeholder="Message *"
              required
              class="
                flex
                justify-center
                w-full
                h-40
                p-3
                mx-auto
                text-base
                font-light
                border-none
                rounded-sm
                md:w-4/5
                ring-1 ring-gray-400
                focus:ring-1 focus:ring-primary-500
              "
            ></textarea>

            <Button
              :disabled="isDisabled"
              type="submit"
              :class="{ 'bg-gray-400': isDisabled }"
              class="
                w-4/5
                p-2
                mx-auto
                focus:outline-none focus:ring-0 focus:ring-offset-0
                bg-primary-500
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

              <div v-else>Submit</div>
            </Button>
          </form>
        </div>
        <div class="flex flex-col w-full sm:w-1/2">
          <div v-if="store" class="flex flex-col justify-center text-center">
            <span class="mt-4">Email:</span>
            <span
              class="
                font-light
                cursor-pointer
                text-primary-500
                hover:text-primary-200
                max-w-max
                mx-auto
                transition
                duration-100
              "
            >
              <a :href="`mailto:${store.websiteEmail}`">{{
                store.websiteEmail
              }}</a>
            </span>
            <span class="mt-8">Telephone:</span>
            <span
              class="
                font-light
                cursor-pointer
                text-primary-500
                hover:text-primary-200
                max-w-max
                mx-auto
                transition
                duration-100
              "
            >
              {{ store.shopPhone }}
            </span>
            <span class="mt-8 text-xl">{{ store.websiteLegalName }}</span>
            <span class="w-1/2 mx-auto text-primary-500">
              {{ store.shopAddress }}
            </span>
          </div>
          <div class="mt-4 text-center">
            <h1
              v-if="
                !(
                  store.facebook == (null || '') &&
                  store.twitter == (null || '') &&
                  store.instagram == (null || '') &&
                  store.linkedin == (null || '')
                )
              "
            >
              Follow Us On:
            </h1>
            <div class="flex flex-row justify-center mt-3">
              <a
                v-if="store.facebook != null && store.facebook != ''"
                :href="store.facebook"
                target="blank"
              >
                <img
                  v-lazy="`/socialmedia/facebook.png?tr=w-40,h-40,fo-auto`"
                  alt=""
                  class="w-10 h-10 me-5"
                />
              </a>
              <a
                v-if="store.twitter != null && store.twitter != ''"
                :href="store.twitter"
                target="blank"
              >
                <img
                  v-lazy="`/socialmedia/twitter.png?tr=w-40,h-40,fo-auto`"
                  alt=""
                  class="w-10 h-10 me-5"
                />
              </a>
              <a
                v-if="store.instagram != null && store.instagram != ''"
                :href="store.instagram"
                target="blank"
              >
                <img
                  v-lazy="`/socialmedia/instagram.png?tr=w-40,h-40,fo-auto`"
                  alt=""
                  class="w-10 h-10 me-5"
                />
              </a>
              <a
                v-if="store.linkedin != null && store.linkedin != ''"
                :href="store.linkedin"
                target="blank"
              >
                <img
                  v-lazy="`/socialmedia/linkedin.png?tr=w-40,h-40,fo-auto`"
                  alt=""
                  class="w-10 h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- <h1 class="mt-4 mb-4 text-3xl font-bold text-center">Contact Us</h1>
    <div class="container flex items-center justify-center">
      Email:
      <div class="text-primary-500 ms-1">care@tablez.com</div>
    </div> -->
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import Megamenu from '~/components/Home/Megamenu.vue'
import SAVE_CUSTOMER_MESSAGE from '~/gql/customerMessage/saveCustomerMessage'
import { Textbox, Button } from '~/shared/components/ui'

export default {
  components: { Megamenu, Textbox, Button },
  data() {
    return {
      loading: false,
      contact: {
        id: '',
        name: '',
        email: '',
        message: '',
      },
    }
  },
  head() {
    return {
      title: 'Contact Us',
    }
  },
  computed: {
    isDisabled() {
      return !this.contact.name || !this.contact.email || !this.contact.message
    },
    store() {
      return this.$store.state.store || {}
    },
    user() {
      return this.$store.state.auth.user
    },
  },
  created() {
    if (this.user) {
      this.contact.name = this.user.firstName
      this.contact.email = this.user.email
    }
  },
  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success' }),

    async submit() {
      const msg = 'Message Sent !'
      this.loading = true
      // console.log('fesfsdfsdfs')
      try {
        this.saveCustomerMessage = await this.$post(
          'customerMessage/saveCustomerMessage',
          this.contact
        )
        // this.saveCustomerMessage = (
        //   await this.$apollo.mutate({
        //     mutation: SAVE_CUSTOMER_MESSAGE,
        //     variables: this.contact,
        //   })
        // ).data.saveCustomerMessage
        // console.log('dsfsdfsdf', this.saveCustomerMessage)
        this.success(msg)
      } catch (e) {
        this.setErr(e)
      } finally {
        this.contact.name = ''
        this.contact.email = ''
        this.contact.message = ''
        this.loading = false
      }
    },
  },
}
</script>
