import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie';
import { apolloClient } from '../vue-apollo'
import { LOGGED_IN_USER } from '../graphql/queries'
import { LOGIN_USER, REGISTER_USER } from '../graphql/mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: null,
        user: {},
        authStatus: false
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.authStatus,
        user: state => state.user
    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
        },
        LOGIN_USER (state, user) {
            state.authStatus = true
            state.user = { ...user }
        },
        LOGOUT_USER (state) {
            state.authStatus = false
            state.token = '' && localStorage.removeItem('apollo-token')
            state.user = {}
        }
    },
    actions: {
        async register ({ commit, dispatch }, authDetails) {
            try {
                const { data } = await apolloClient.mutate({ mutation: REGISTER_USER, variables: { ...authDetails } })
                if (data.registerUser.status === "success") {
                    const token = JSON.stringify(data.registerUser.token)
                    commit('SET_TOKEN', token)
                    localStorage.setItem('apollo-token', token)
                    dispatch('setUser')
                }
                return data.registerUser;
            } catch (e) {
                console.log(e)
            }
        },
        async login ({ commit, dispatch }, authDetails) {
            try {
                const { data } = await apolloClient.mutate({ mutation: LOGIN_USER, variables: { ...authDetails } })
                if (data.login.status === "success") {
                    const token = JSON.stringify(data.login.token)
                    commit('SET_TOKEN', token)
                    localStorage.setItem('apollo-token', token)
                    dispatch('setUser')
                }
                return data.login;
            } catch (e) {
                console.log(e)
            }
        },
        async setUser ({ commit }) {
            const { data } = await apolloClient.query({ query: LOGGED_IN_USER, fetchPolicy: 'network-only' })
            commit('LOGIN_USER', data.me)
        },
        async logOut ({ commit, dispatch }) {
            commit('LOGOUT_USER')
        }
    },
    plugins: [
        createPersistedState({
          getState: (key) => {
                let result = Cookies.get(key);
                if (result) {
                    return JSON.parse(Cookies.get(key));
                } else {
                    return {}
                }
          },
          setState: (key, state) => {
              return Cookies.set(key, JSON.stringify(state), { expires: 7, secure: true })
          }
        })
    ]
})

export default store