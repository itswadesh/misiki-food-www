import STORE_ONE from '~/gql/store/storeOne.gql'
import SETTINGS from '~/gql/settings/settings.gql'
import MEGAMENU from '~/gql/category/megamenu.gql'
import SAVE_FCM_TOKEN from '~/gql/fcmToken/saveFcmToken.gql'
export default {
  async fcm({ commit, state, getters }) {
    try {
      if (process.client) {
        const currentToken = await this.$fire.messaging.getToken({})
        if (currentToken) {
          await this.app.apolloProvider.defaultClient.mutate({
            mutation: SAVE_FCM_TOKEN,
            variables: { id: 'new', token: currentToken, platform: 'web' },
            fetchPolicy: 'no-cache',
          })
        } else {
          // Show permission request UI
          // console.log(
          //   'No registration token available. Request permission to generate one.'
          // )
          // ...
        }
      }
    } catch (e) {
      // console.log('FCM:::', e.toString())
    }
  },
  async fetchSettings({ commit, state, getters, $fire, params }, slug) {
    try {
      commit('clearErr')
      const settings = (
        await this.app.apolloProvider.defaultClient.query({ query: SETTINGS })
      ).data.settings
      commit('settings', settings)
    } catch (e) {
      commit('setErr', e)
    } finally {
      commit('busy', false)
    }
  },
  async fetch({ commit, state, getters, $fire, params }, slug) {
    console.log('store id.........', slug)
    try {
      commit('clearErr')
      const stor = (
        await this.app.apolloProvider.defaultClient.query({
          query: STORE_ONE,
          variables: { slug },
        })
      ).data.storeOne
      const megamenu = (
        await this.app.apolloProvider.defaultClient.query({ query: MEGAMENU })
      ).data.megamenu
      commit('megamenu', megamenu)
      commit('store', stor)
      // const observer = this.app.apolloProvider.defaultClient.subscribe({
      //   query: SUBSCRIPTION_SETTINGS_UPDATED,
      // })

      // observer.subscribe({
      //   next({ data }) {
      //     settings = data.settingsUpdated
      //     commit('settings', settings)
      //     // console.log(data.settingsUpdated)
      //   },
      //   error(error) {
      //     console.error('Settings subscription error', error)
      //   },
      // })
    } catch (e) {
      console.error('An error occurred while retrieving token. ', e)

      if (
        e.toString() !==
        'Error: Network error: Unexpected token E in JSON at position 0'
      )
        commit('setErr', e)
    } finally {
      commit('busy', false)
    }
  },
  async nuxtClientInit({ state, commit, dispatch }, context) {
    // dispatch('fcm')
    // await dispatch('fetch')
    // await dispatch('auth/fetch')
    // await dispatch('cart/fetch')
  },
  async nuxtServerInit({ state, commit, dispatch }, { params, app }) {
    await dispatch('fetchSettings')
    if (!params.store) return
    app.router.base = params.store || '/'

    // console.log('nuxtServerInit')
    await dispatch('fetch', params.store)
    await dispatch('auth/fetch', params.store)
    await dispatch('cart/fetch', params.store)
  },
}
