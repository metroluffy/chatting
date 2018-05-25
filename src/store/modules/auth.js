//auth
const state = {
  LoggedState : false,
  token: null
}

// getters
const getters = {
  getToken: state => {
    return state.token
  }
}

// actions
const actions = {}

// mutations
const mutations = {
  login(state,token){
    state.LoggedState = true
    state.token = token
  },
  logout: state => {
    state.LoggedState = false
    state.token = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
