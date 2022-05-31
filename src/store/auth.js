import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {
    authenticated(state) {
      return state.token && state.user
    },
    user(state) {
      return state.user
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, data) {
      state.user = data
    },
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      // axios.post('auth/login', credentials)
      const response = await axios.post('login', credentials)
      // eslint-disable-next-line no-alert
      alert('Berhasil Login')

      return dispatch('attempt', response.data.token)
    },
    async attempt({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }
      if (!state.token) {
        return
      }
      try {
        const response = await axios.get('user')
        commit('SET_USER', response.data)
        console.log(response.data)
      } catch (error) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },

    signOut({ commit }) {
      localStorage.removeItem('token')
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
      window.location.reload()
    },
  },
}
