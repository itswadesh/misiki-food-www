export default {
  showMenu(state, payload) {
    state.showMenu = payload
  },
  megamenu(state, payload) {
    state.megamenu = payload
  },
  settings(state, payload) {
    state.settings = payload
  },
  sore(state, payload) {
    state.store = payload
  },
  busy(state, payload) {
    state.loading = payload
  },
  success(state, msg) {
    this.$toast.success(msg).goAway(2000)
  },
  warning(state, msg) {
    this.$toast.warning(msg).goAway(5000)
  },
  info(state, msg) {
    this.$toast.info(msg).goAway(5000)
  },
  clearErr(state) {
    state.errors = []
    state.loading = true
  },
  setGuest(state, guestId) {
    state.guestId = guestId
  },
  setErr(state, e) {
    state.errors = []
    if (e.networkError) {
      if (!e.networkError.result) {
        if (
          e.networkError.message === 'Unexpected token E in JSON at position 0'
        )
          state.errors.push('Server is down.')
        else state.errors.push(e.toString())
        state.errors.map((message, i) => {
          if (this.$toast) return this.$toast.error(message).goAway(5000)
        })
      } else if (e.networkError.result && e.networkError.result.errors) {
        e.networkError.result.errors.map(({ message }, i) => {
          return state.errors.push(message)
        })
        // While adding address, it throughs invalid value at zip
        state.errors.map((message, i) => {
          if (this.$toast) return this.$toast.error(message).goAway(5000)
        })
      } else {
        state.errors = e.networkError
      }
    } else if (e.graphQLErrors) {
      if (e.graphQLErrors.length < 1) {
        // state.errors.push('Server is down.')
        if (this.$toast) this.$toast.error('Error Occured..').goAway(5000)
      } else {
        e.graphQLErrors.map(({ message }, i) => {
          state.errors.push(message)
        })
        if (this.$toast) this.$toast.error(state.errors).goAway(5000)
      }
      // console.log(state.errors)
    } else {
      state.errors = [e]
      if (this.$toast) this.$toast.error(state.errors).goAway(5000)
      // throw e // One error not suppose to throw another error
    }
    state.errors.map((message, i) => {
      //   this.$toast.error(message).goAway(3000)
    })
    state.loading = false
    // console.error('err at store...', e.toString())
  },
}
