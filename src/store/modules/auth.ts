const AUTH_REQUEST = "AUTH_REQUEST";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const AUTH_LOGINED = "AUTH_LOGINED";
const AUTH_SIGNIN = "AUTH_SIGNIN";

import { login, signin } from "@/api/auth";
import { RootState } from "@/store/index";
import { Module } from "vuex";

export interface AuthState {
  token: string;
  status: string;
}

const auth_module: Module<AuthState, RootState> = {
  state: (): AuthState => ({
    token: localStorage.getItem("user-token") || "",
    status: "",
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
      localStorage.removeItem("user-token");
    },
    [AUTH_SIGNIN]: ({ commit }, payload) => {
      commit(AUTH_SIGNIN);
      signin(payload)
        .then((token) => {
          localStorage.setItem("user-token", token);
          commit(AUTH_LOGINED, token);
        })
        .catch((error) => {
          console.log(error);
          commit(AUTH_ERROR);
          localStorage.removeItem("user-token");
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
  },
};

export {
  auth_module,
  AUTH_ERROR,
  AUTH_LOGINED,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_SIGNIN,
};
