<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="columnn">
            <h1 class="title">Войти</h1>
            <form class="box">
              <div class="field">
                <label class="label">Имя</label>
                <p class="control has-icons-left">
                  <input
                    class="input"
                    type="text"
                    placeholder="Имя"
                    v-model="username"
                    @input="validate"
                    :disabled="isLoading"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </p>
                <p
                  v-for="error in usernameHelp"
                  :key="error"
                  class="help is-danger"
                >
                  {{ error }}
                </p>
              </div>
              <div class="field">
                <label class="label">Пароль</label>
                <p class="control has-icons-left">
                  <input
                    class="input"
                    type="password"
                    placeholder="*******"
                    v-model="password"
                    @input="validate"
                    :disabled="isLoading"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                  </span>
                </p>
                <p
                  v-for="error in passwordHelp"
                  :key="error"
                  class="help is-danger"
                >
                  {{ error }}
                </p>
              </div>
              <div class="level">
                <div class="level-left">
                  <button
                    class="button is-success level-item"
                    :class="{ 'is-loading': isLoading }"
                    @click.prevent="login"
                    @keypress.enter.prevent="login"
                    :disabled="isLoading"
                  >
                    Войти
                  </button>
                </div>
                <div class="level-right">
                  <router-link
                    to="/signin"
                    class="button is-success is-inverted level-item"
                  >
                    Регестрация
                  </router-link>
                </div>
              </div>
              <div
                v-for="error in errors"
                class="notification is-danger"
                :key="error"
              >
                {{ error }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { useStore } from "@/store/index";
import { AUTH_REQUEST, AUTH_SET_USERNAME } from "@/store/modules/auth";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    let username: Ref<string> = ref("");
    let usernameHelp = ref<Array<string>>([]);
    let passwordHelp = ref<Array<string>>([]);
    let password: Ref<string> = ref("");
    let isLoading: Ref<boolean> = ref(false);
    let errors = ref<Array<string>>([]);
    const validate = function () {
      let result = true;
      usernameHelp.value = [];
      passwordHelp.value = [];
      errors.value = [];
      if (username.value.length == 0) {
        usernameHelp.value.push("Имя не может быть пустым");
        result = false;
      }
      if (password.value.length == 0) {
        passwordHelp.value.push("Пароль не может быть пустым");
        result = false;
      }
      return result;
    };
    const login = function () {
      if (!validate()) {
        return;
      }
      isLoading.value = true;
      store
        .dispatch(AUTH_REQUEST, {
          username: username.value,
          password: password.value,
        })
        .then(() => store.dispatch(AUTH_SET_USERNAME))
        .then(() => {
          router.push((route.query.redirect as string) || "/");
        })
        .catch((error) => {
          errors.value.push(error);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    return {
      username,
      password,
      isLoading,
      login,
      errors,
      usernameHelp,
      passwordHelp,
      validate,
    };
  },
});
</script>

<style></style>
