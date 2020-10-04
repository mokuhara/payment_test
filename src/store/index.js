import {
  createStore
} from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import http from '@/store/modules/http'
import message from '@/store/modules/message'
import user from '@/store/modules/user'


export default createStore({
  modules: {
    auth,
    http,
    message,
    user
  },
  plugins: [createPersistedState({
    key: 'example',
    storage: window.sessionStorage
  })]
})