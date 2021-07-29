import Vue from 'vue'
import VueGtag from 'vue-gtag'
import { GOOGLE_ANALYTICS_ID } from '~/shared/config/index'

Vue.use(VueGtag, {
  config: { id: GOOGLE_ANALYTICS_ID },
})
