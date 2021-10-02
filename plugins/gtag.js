import Vue from 'vue'
import VueGtag from 'vue-gtag'
import { GOOGLE_ANALYTICS_ID } from '~/shared/config/index'
// console.log('GOOGLE_ANALYTICS_ID', GOOGLE_ANALYTICS_ID)
const getGDPR = localStorage.getItem('GDPR:accepted')
if (typeof getGDPR !== 'undefined' && getGDPR === 'true') {
  Vue.use(VueGtag, {
    config: { id: GOOGLE_ANALYTICS_ID },
    enabled: false,
  })
} else if (typeof getGDPR !== 'undefined' && getGDPR === 'false') {
  Vue.use(vueAnalytics, {
    config: { id: GOOGLE_ANALYTICS_ID },
    enabled: true,
  })
}
