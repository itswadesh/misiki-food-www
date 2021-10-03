import Vue from 'vue'
import VueGtag from 'vue-gtag'
import { GOOGLE_ANALYTICS_ID } from '~/shared/config/index'
// console.log('GOOGLE_ANALYTICS_ID', GOOGLE_ANALYTICS_ID)
const getGDPRPreference = localStorage.getItem('GDPR:preference')
const getGDPRAnalytics = localStorage.getItem('GDPR:analytics')
const getGDPRMarketing = localStorage.getItem('GDPR:marketing')
if (typeof getGDPRAnalytics !== 'undefined' && getGDPRAnalytics === 'true') {
  Vue.use(VueGtag, {
    config: { id: GOOGLE_ANALYTICS_ID },
    enabled: false,
  })
} else if (
  typeof getGDPRAnalytics !== 'undefined' &&
  getGDPRAnalytics === 'false'
) {
  Vue.use(VueGtag, {
    config: { id: GOOGLE_ANALYTICS_ID },
    enabled: true,
  })
}
