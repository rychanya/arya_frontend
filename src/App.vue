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
        @click="isMenuActive = !isMenuActive"
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
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="loginapi"> Log in </a>
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
import { login } from "@/api/auth";
import { defineComponent, ref, Ref } from "vue";
export default defineComponent({
  setup() {
    let isMenuActive: Ref<boolean> = ref(false);
    const loginapi = function () {
      const payload = { username: "123", password: "123" };
      login(payload).then((resp) => {
        console.log(resp);
      });
    };
    return { isMenuActive, loginapi };
  },
});
</script>

<style></style>
