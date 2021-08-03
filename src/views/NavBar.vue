<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        :class="{ 'is-active': isMenuActive }"
        @click="togleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/search" class="navbar-item">Search</router-link>
        <router-link to="/upload" class="navbar-item">UpLoad</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="!isAuthenticated">
              <router-link to="/signin" class="button is-primary"
                >Sign up
              </router-link>
              <router-link to="/login" class="button is-light"
                >Log in
              </router-link></template
            >
            <template v-if="isAuthenticated">
              <button class="button">
                <span class="icon">
                  <i class="fas fa-user"></i>
                </span>
                <span>{{ userName }}</span>
              </button>
              <a class="button is-danger" @click="logout">Log out </a></template
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore, TogleMenu } from "@/store/index";
import { AUTH_LOGOUT, AUTH_SET_USERNAME } from "@/store/modules/auth";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const isMenuActive = computed(() => store.state.isMenuActive);
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const userName = computed(() => {
      if (store.getters.username == "" && isAuthenticated.value) {
        store.dispatch(AUTH_SET_USERNAME);
      }
      return store.getters.username;
    });
    const togleMenu = function () {
      store.commit(TogleMenu);
    };
    const logout = function () {
      store.dispatch(AUTH_LOGOUT).then(() => router.push("/"));
    };
    return { isMenuActive, togleMenu, isAuthenticated, logout, userName };
  },
});
</script>

<style></style>
