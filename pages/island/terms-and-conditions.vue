<template>
  <section class="bg-white min-h-screen">
    <div
      class="container max-w-7xl mx-auto px-4 md:px-10 lg:px-16 text-gray-800"
    >
      <h1 class="text-2xl md:text-4xl tracking-wide text-center pt-10 pb-5">
        Terms & Conditions
      </h1>

      <h6 class="text-sm mb-5 flex items-center space-x-1">
        <span>Last Updated:</span><span>July 2021</span>
      </h6>

      <h3 class="mb-5 font-semibold text-lg">Defination</h3>

      <ul>
        <li
          v-for="(i, ix) in items"
          :key="ix"
          class="flex flex-col text-sm space-y-2 mb-3"
        >
          <q>{{ i.heading }}</q>
          <span class="ms-8">{{ i.description }}</span>
        </li>
      </ul>

      <h3 class="mb-5 font-semibold text-lg">Use of this website</h3>

      <ul>
        <li
          v-for="(j, jx) in items2"
          :key="jx"
          class="flex flex-col text-sm space-y-5"
        >
          <ul>
            <h4 class="mb-2 font-semibold">{{ j.heading }}</h4>
            <li
              v-for="(k, kx) in j.items3"
              :key="kx"
              class="flex flex-col text-sm mb-5"
            >
              {{ k.data }}
              <h6 class="mb-5" v-html="k.html"></h6>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Back to Top start  -->
      <div class="pb-10 max-w-max">
        <div class="flex items-center space-x-2 text-blue-500 font-medium">
          <button
            class="
              bg-white
              border
              h-12
              w-12
              flex
              items-center
              justify-center
              rounded-full
              shadow-md
              focus:outline-none focus:ring-0 focus:ring-offset-0
            "
            @click="toTop"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
          </button>
          <span class="cursor-pointer" @click="toTop">Back to Top</span>
        </div>
      </div>
      <!-- Back to Top end -->
    </div>

    <WantMore class="mt-5 md:mt-10" />
    <!-- <WhiteFooter class="mt-10 md:mt-20" /> -->
  </section>
</template>

<script>
import WantMore from '~/components/Island/WantMore.vue'
import WhiteFooter from '~/components/Island/WhiteFooter.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: {
    WantMore,
    WhiteFooter,
    NuxtLink,
  },

  data() {
    return {
      items: [
        {
          heading: 'Conditions',
          description: 'means these terms and conditions;',
        },
        {
          heading: 'Contract',
          description:
            'means the contract incorporating these Conditions which is formed when You place an Order and We confirm acceptance of the Order;',
        },
        {
          heading: 'International',
          description: 'means countries other than the United Kingdom (UK)',
        },
        {
          heading: 'Order',
          description:
            'means an order placed by You via this Website for one or more Products;',
        },
        {
          heading: 'Personal Information',
          description:
            'means all and any information provided by You in an Order or when registering on any part of this Website to include without limit your name, address and card details;',
        },
        {
          heading: 'Product',
          description: 'means any product advertised on this Website;',
        },
        {
          heading: 'Unlimited Delivery',
          description:
            'means the 12 (twelve) months free of charge UK-only standard, next day and nominated day delivery service and the 12 (twelve) months discounted UK-only precise delivery service offered on Our Website in connection with an Order.',
        },
        {
          heading: 'We/Us/Our',
          description:
            'means River Island Clothing Co. Limited of Chelsea House, Westgate, London W5 1DR, England registered in England and Wales with Registered Number 636095, VAT Registration Number 227179454;',
        },
        {
          heading: 'Website',
          description:
            'Means Riverisland.com, any other URL operated by us and our mobile applications;',
        },
        {
          heading: 'You/Your',
          description: 'means a user of this Website;',
        },
        {
          heading: 'Error',
          description:
            'means a human mistake or a technical or system failure that leads to incorrect pricing of Orders and/or Products.',
        },
      ],

      items2: [
        {
          heading: 'Application of these Conditions',
          items3: [
            {
              data: `These Conditions apply to Use of this Website and are the terms and conditions on which We will supply any of the Products to You (including the supply of Unlimiited Delivery) and by proceeding further and/or placing an Order You agree to be bound by the Conditions. If You do not agree to be bound by them, You should leave this Website now.`,
            },
            {
              data: `Please click on the button to mark Your acceptance of these Conditions before placing an Order if You accept them. Please understand that if You refuse to accept these Conditions, You will not be able to order any Products from the Website.`,
            },
            {
              data: `The terms and Conditions applicable to the purchase of Products offered for sale through this Website and the equivalent terms and conditions for sale through River Island shops and elsewhere shall be mutually exclusive. In particular, promotions and offers advertised on this Website shall not be valid in connection with any purchase through River Island shops or elsewhere, and promotions and offers available through Our shops or elsewhere shall not be valid in respect of Website purchases.`,
            },
            {
              data: `When Using the Website, You accept that communication with Us will be mainly electronic. We will contact You by email or provide You with information by posting notices on the Website. For contractual purposes, You agree to this electronic means of communication and You acknowledge that all contracts, notices, information and other communications that We provide to You electronically comply with any legal requirement that such communications be in writing. This condition does not affect Your statutory rights.`,
            },
            {
              data: `You may obtain further information about Your statutory rights by contacting Your local authority Trading Standards Department or Citizens Advice Bureau.`,
            },
          ],
        },

        {
          heading: 'Changes',
          items3: [
            {
              data: `We may change these Conditions from time to time without notice to You. Changes will apply to any subsequent Orders received. It is Your responsibility to check regularly to see if any changes have been made to these Conditions. We reserve the right to modify or withdraw this Website at any time without liability to You.`,
            },
          ],
        },

        {
          heading: 'Queries',
          items3: [
            {
              data: `Contact Us if You have any questions relating to these Conditions or ordering the Products generally by using the Contact Us page.`,
            },
          ],
        },

        {
          heading: 'Your Account',
          items3: [
            {
              data: `You are responsible for maintaining the confidentiality of the password chosen by You when You register on the Website and for restricting access to Your computer and/or email address to prevent unauthorised access to Your account.`,
            },
          ],
        },

        {
          heading: 'Description and Availability',
          items3: [
            {
              data: `We take all reasonable measures to ensure that details, measurements and descriptions of Products given on this Website are as accurate and complete as possible but there may be variations between these and the Products themselves. All Products are subject to availability. In the event Products are unavailable they will be cancelled from Your Order and You will receive a refund.`,
            },
          ],
        },

        {
          heading: 'Price',
          items3: [
            {
              data: `For International Orders, prices appearing on this Website may be subject to taxes and duties (where applicable) at the current rates.`,
            },
            {
              data: `The cost of Your Order will be the price of the Products ordered plus the appropriate delivery charge outlined in the “Delivery Services” section below. Please note that all prices on this Website are for on-line purchases only.`,
            },
            {
              data: `Due to circumstances beyond Our control prices may have to be altered, including any variations in the rate of sales tax. If this occurs You will be notified and requested to reconfirm Your Order at the altered price.`,
            },
            {
              data: `By notifying You, We shall be entitled to cancel any Contract in whole or in part to the extent that it is for the purchase of a Product the price of which was stated incorrectly on the Website.`,
            },
          ],
        },

        {
          heading: 'Placing an Order',
          items3: [
            {
              data: `You must not order Products via this Website if You are younger than 16 years of age. In the case of Products which can only legally be supplied to people over the age of 18, this will be indicated on the Website in relation to the appropriate Product.`,
            },
            {
              data: `All Orders are subject to acceptance by Us and are subject to availability. After placing an Order, You will receive an email from Us acknowledging that We have received Your Order. Please note that this does not mean that Your Order has been accepted. Your Order constitutes an offer to Us to buy a Product. All Orders are subject to acceptance by Us and We will confirm such acceptance by sending You an email that confirms that the Product has been despatched (the “Despatch Notice”). The Contract between Us will only be formed when We send You the Despatch Notice.`,
            },
            {
              data: `Where, in our reasonable judgment, we believe that there is an Error, we will be entitled to cancel Your Order and refund Your payment.`,
            },
            {
              data: `Where the Error is noticed before the Order is despatched, we will use all reasonable endeavours to inform You and allow You to choose whether to re-place the Order at the correct price or to have Your Order refunded.`,
            },
            {
              data: `We may undertake searches with credit reference agencies for the purpose of verifying Your identity and the Personal Information You submit as part of an Order. To do so the agencies may check Your Personal Information against any particulars on any database (public or otherwise) to which they have access. They may also Use Your details in the future to assist other companies for verification purposes. By submitting Your Order You agree to this. For details of the credit reference agencies We receive information from and share information with, write to General Data Protection Compliance Officer, River Island, Chelsea House, Westgate, London, W5 1DR, United Kingdom.`,
            },
            {
              html: `<p><span class="me-1">For information about placing an order using Klarna, please </span><nuxt-link to="#" class="text-blue-500 hover:text-blue-700 cursor-pointer">click here</nuxt-link></p>`,
            },
          ],
        },
      ],
    }
  },

  head() {
    return {
      title: 'Terms & Conditions',
    }
  },

  methods: {
    toTop() {
      if (process.client) {
        window.scrollTo(0, 0)
      }
    },
  },
}
</script>

<style scoped></style>
