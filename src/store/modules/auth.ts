const AUTH_REQUEST = "AUTH_REQUEST";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const AUTH_LOGINED = "AUTH_LOGINED";
const AUTH_SIGNIN = "AUTH_SIGNIN";
const AUTH_SET_USERNAME = "AUTH_SET_USERNAME";
const AUTH_DEL_USERNAME = "AUTH_DEL_USERNAME";

import { login, signin, get_current_user } from "@/api/auth";
import { RootState } from "@/store/index";
import { Module } from "vuex";

export interface AuthState {
  token: string;
  status: string;
  username: string;
}

const auth_module: Module<AuthState, RootState> = {
  state: (): AuthState => ({
    token: localStorage.getItem("user-token") || "",
    status: "",
    username: "",
  }),
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = AUTH_REQUEST;
    },
    [AUTH_SIGNIN]: (state) => {
      state.status = AUTH_SIGNIN;
    },
    [AUTH_ERROR]: (state) => {
      state.status = AUTH_ERROR;
    },
    [AUTH_LOGOUT]: (state) => {
      state.status = AUTH_LOGOUT;
      state.token = "";
    },
    [AUTH_LOGINED]: (state, token: string) => {
      state.status = AUTH_LOGINED;
      state.token = token;
    },
    [AUTH_SET_USERNAME]: (state, username: string) => {
      state.username = username;
    },
    [AUTH_DEL_USERNAME]: (state) => {
      state.username = "";
    },
  },
  actions: {
    [AUTH_REQUEST]: ({ commit }, payload) => {
      commit(AUTH_REQUEST);
      return new Promise<void>((resolve, reject) => {
        login(payload)
          .then((token) => {
            localStorage.setItem("user-token", token);
            commit(AUTH_LOGINED, token);
            resolve();
          })
          .catch((error) => {
            console.log(error);
            commit(AUTH_ERROR);
            localStorage.removeItem("user-token");
            reject(error);
          });
      });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      commit(AUTH_LOGOUT);
      commit(AUTH_DEL_USERNAME);
      localStorage.removeItem("user-token");
    },
    [AUTH_SIGNIN]: ({ commit }, payload) => {
      commit(AUTH_SIGNIN);
      return new Promise<void>((resolve, reject) => {
        signin(payload)
          .then((data) => {
            if (data.data == "OK") {
              resolve();
            } else reject(data.error);
          })
          .catch((error) => {
            console.log(error);
            commit(AUTH_ERROR);
            reject(error);
          });
      });
    },
    [AUTH_SET_USERNAME]: ({ commit }) => {
      return new Promise<void>((resolve, reject) => {
        get_current_user()
          .then((username) => {
            commit(AUTH_SET_USERNAME, username);
            resolve();
          })
          .catch((error) => {
            console.log(error);
            commit(AUTH_DEL_USERNAME);
            reject(error);
          });
      });
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return !!state.token;
    },
    authHeader(state) {
      return { Authorization: `Bearer ${state.token}` };
    },
    username(state) {
      return state.username;
    },
  },
};

export {
  auth_module,
  AUTH_ERROR,
  AUTH_LOGINED,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_SIGNIN,
  AUTH_DEL_USERNAME,
  AUTH_SET_USERNAME,
};
