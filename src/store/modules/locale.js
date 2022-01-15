// import * as types from '@/store/mutation-types'
import i18n from '@/plugins/i18n'
// import * as Validator from 'vee-validate'

const getters = {
  locale: (state) => state.locale,
  localeFlag: (state) => state.localeFlag
}

const actions = {
  setLocale({ commit }, payload) {
    // commit('SUCCESS', null)
    // commit('ERROR', null)
    i18n.locale = payload
    // Validator.localize(payload)
    window.localStorage.setItem('locale', JSON.stringify(payload))
    commit('SET_LOCALE', payload)
  }
}

const mutations = {
  ['SET_LOCALE'](state, value) {
    state.locale = value
  },
  ['SET_LOCALE_FLAG'](state, value) {
    state.localeFlag = value
  },
}

const state = {
  locale:
    JSON.parse(localStorage.getItem('locale')) ||
    navigator.language.slice(0, 2) ||
    'en',
  localeFlag:JSON.parse(localStorage.getItem('locale')) || 'gb'
}

export default {
  state,
  getters,
  actions,
  mutations
}