import Vue from 'vue'
import { StripePlugin } from '@vue-stripe/vue-stripe'

const options = {
  pk: process.env.STRIPE_PUBLISHABLE_KEY,
}

Vue.use(StripePlugin, options)
