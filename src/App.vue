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
            <router-link
              v-if="!isAuthenticated"
              to="/sigin"
              class="button is-primary"
              >Sign up
            </router-link>
            <router-link
              v-if="!isAuthenticated"
              to="/login"
              class="button is-light"
              >Log in
            </router-link>
            <router-link
              v-if="isAuthenticated"
              to="/logout"
              class="button is-danger"
              >Log out</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore, TogleMenu } from "@/store/index";
export default defineComponent({
  setup() {
    const store = useStore();
    const isMenuActive = computed(() => store.state.isMenuActive);
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const togleMenu = function () {
      store.commit(TogleMenu);
    };
    return { isMenuActive, togleMenu, isAuthenticated };
  },
});
</script>

<style></style>
