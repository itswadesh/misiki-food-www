export default function ({ app, error, store, redirect, query }) {
  try {
    store.commit('clearErr')
    const { otpLogin } = store.state.settings
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', otpLogin)
    if (otpLogin) {
      let goto = '/otplogin'
      if (query.ref) goto += `?ref=${query.ref}`
      redirect(goto)
    }
  } catch (e) {
  } finally {
    store.commit('busy', false)
  }
}
