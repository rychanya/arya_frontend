import { createStore, Store, useStore as BaseUseStore } from "vuex";
import { InjectionKey } from "vue";
import { auth_module } from "@/store/modules/auth";

export interface RootState {
  isMenuActive: boolean;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const state: RootState = {
  isMenuActive: false,
};

export const CloseMenu = "CloseMenu";
export const TogleMenu = "TogleMenu";

export const store = createStore<RootState>({
  state: state,
  mutations: {
    [CloseMenu]: (state) => {
      state.isMenuActive = false;
    },
    [TogleMenu]: (state) => {
      state.isMenuActive = !state.isMenuActive;
    },
  },
  actions: {},
  modules: {
    auth: auth_module,
  },
});

export function useStore(): Store<RootState> {
  return BaseUseStore(key);
}
