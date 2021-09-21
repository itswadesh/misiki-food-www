import Vue from 'vue'
import vueLazy from 'vue-lazyload'
export default ({ store, app }) => {
  Vue.use(vueLazy, {
    observer: true,
    preLoad: 1.3,
    error: '/icon.png',
    loading: '/loading.svg',
    attempt: 1,
    // adapter: {
    //     loaded({ src, loading, error }) {
    //         const CDN = store.state.settings.CDN_URL
    //         src = CDN + src
    //     },
    // },
    filter: {
      progressive(listener, options) {
        const CDN_URL = store.state.settings && store.state.settings.CDN_URL
        const S3_URL = store.state.settings && store.state.settings.S3_URL
        let src = listener.src
        if (src) {
          let loadingSrc = src
          // if (CDN_URL && S3_URL) src = src.replace(S3_URL, CDN_URL)
          try {
            if (CDN_URL) {
              const url = new URL(src)
              src = src.replace(url.origin, CDN_URL)
              loadingSrc = CDN_URL + url.pathname + '?tr=w-3,h-2'
            }
          } catch (e) {
            src = CDN_URL + src // When image comes from frontend e.g. /socialmedia/linkedin.png
            loadingSrc = src + '?tr=w-3,h-2'
          }
          // const contains = src.includes(S3_URL)
          listener.el.setAttribute('lazy-progressive', 'true')
          listener.loading = loadingSrc
          listener.src = src
        }
      },
      error(listener, Init) {},
    },
  })
}
