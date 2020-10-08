import { createStore } from "vuex";

import createPersistedState from "vuex-persistedstate";

import auth from "@/store/modules/auth";
import http from "@/store/modules/http";
import message from "@/store/modules/message";
import user from "@/store/modules/user";
import modal from "@/store/modules/modal";
import zoom from "@/store/modules/zoom";

export default createStore({
  modules: {
    auth,
    http,
    message,
    user,
    modal,
    zoom,
  },
  plugins: [
    createPersistedState({
      key: "example",
      storage: window.sessionStorage,
    }),
  ],
});
