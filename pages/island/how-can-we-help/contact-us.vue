<template>
  <section class="text-gray-800">
    <div class="container max-w-5xl mx-auto px-4 md:px-10 lg:px-16">
      <h1
        class="
          text-2xl
          md:text-5xl
          font-bold
          tracking-wide
          text-center
          py-10
          sm:py-20
        "
      >
        Contact us
      </h1>

      <div class="mb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div class="p-7 sm:p-10 bg-white rounded">
          <h2 class="mb-5 text-xl sm:text-2xl font-semibold">Contact us</h2>

          <p class="mb-10 text-sm">
            For information regarding an item returned in the UK, please only
            contact us if it has been more than 10 days since you posted your
            return.
            <br />
            <br />

            For International returns it can usually take up to 28 business days
            (excluding weekends and public holidays) for us to receive your
            return depending on your location and which postal service you use,
            please only contact us after this period has elapsed
            <br />
            <br />
            Once we've processed your return, we'll drop you an email to let you
            know.
          </p>

          <h2 class="mb-5 text-xl sm:text-2xl font-semibold">FAQs</h2>

          <p class="mb-10 text-sm">
            We think you might find the info you need in the answers to our most
            popular questions:
          </p>

          <div class="flex flex-wrap">
            <nuxt-link
              v-for="(i, ix) in items"
              :key="ix"
              to="##"
              class="bg-gray-100 rounded-full mb-3 me-3 py-2 px-6 max-w-max"
            >
              <span class="text-sm font-semibold">{{ i.query }}</span>
            </nuxt-link>
          </div>
        </div>

        <div class="flex flex-col p-7 sm:p-10 bg-white rounded">
          <h2 class="mb-5 text-xl sm:text-2xl font-semibold">Get in touch</h2>

          <p class="mb-10 text-sm">
            We are keeping our online FAQ section up-to-date with all the latest
            RI information and we’re sure you’ll find what you’re looking for
            but if you can’t you can still contact us on the following number:
            <br />
            <br />
            UK Customers 0344 576 6444
            <br />
            <br />
            International Customers +44 344 576 6444
            <br />
            <br />
            Our team in the UK is available between the hours of 08:00am and
            19:30pm GMT/BST.
            <br />
            <br />
            Calls are in English and will be charged at your network providers
            rates. Opening times may vary during UK bank Holidays.
            <br />
            <br />
            If you chose to contact us Via our webform, please include as much
            info as you can in the text box below, including: billing address,
            order date, return date, return tracking code, product description &
            any other relevant info. Please allow 48 hours for us to respond to
            your enquiry.
          </p>

          <nuxt-link
            to="##"
            class="
              border-b-2 border-black
              pb-0.5
              text-sm
              font-semibold
              max-w-max
            "
            >Click here</nuxt-link
          >
        </div>
      </div>
    </div>

    <WantMore class="mb-20" />
  </section>
</template>

<script>
import WantMore from '~/components/Island/WantMore.vue'

export default {
  components: {
    WantMore,
  },

  data() {
    return {
      items: [
        { query: `Where is my order?` },
        { query: `There's a problem with my order` },
        { query: `How can i track my order?` },
      ],
    }
  },
  head() {
    return {
      title: 'Contact Us',
    }
  },
}
</script>

<style scoped></style>
