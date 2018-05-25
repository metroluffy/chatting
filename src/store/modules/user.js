// initial state
const state = {
  user:null,
  contact: {
    groups: null,
    friends: null
  }
}

// getters
const getters = {
  getUser: state => {
    return state.user
  },
  getContacts: state => {
    return state.contact
  },
  getContactByID: state => (id,isGroup = false) => {
    let contacts
    if(isGroup){
      contacts = state.contact.groups
    }else {
      contacts = state.contact.friends
    }
    for(let i in contacts){
      if (contacts[i].id === id) {
        if(isGroup){
          contacts[i].group = true
        }
        return contacts[i]
      }
    }
  },

}

// actions
const actions = {}

// mutations
const mutations = {
  setCurrentUser(state,n){
    state.user = n
  },
  setContacts(state,n){
    if(n.groups.length > 0){
      state.contact.groups = n.groups
    }
    if(n.friends.length > 0){
      state.contact.friends = n.friends
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
