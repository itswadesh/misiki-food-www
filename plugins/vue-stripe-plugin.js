import Vue from 'vue'
import { StripePlugin } from '@vue-stripe/vue-stripe'
import { STRIPE_PUBLISHABLE_KEY } from '~/shared/config/index'
const options = {
  pk: STRIPE_PUBLISHABLE_KEY,
}

Vue.use(StripePlugin, options)
