<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item has-text-centered">
                  <h1 class="title">Регистрация</h1>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item has-text-centered">
                  <router-link to="/login" class=""> Войти </router-link>
                </div>
              </div>
            </nav>
            <form class="box">
              <input-comp
                v-model="v.username.$model"
                placeholder="Имя"
                label="Имя"
                left="fa-user"
                :validation="v.username"
                :disabled="isLoading"
                type="text"
                @input="v.$clearExternalResults"
              ></input-comp>
              <input-comp
                v-model="v.password.$model"
                label="Пароль"
                placeholder="Пароль"
                left="fa-key"
                :validation="v.password"
                :disabled="isLoading"
                type="password"
                @input="v.$clearExternalResults"
              ></input-comp>
              <input-comp
                v-model="v.password2.$model"
                label="Повтор пароля"
                placeholder="Пароль"
                left="fa-key"
                :validation="v.password2"
                :disabled="isLoading"
                type="password"
                @input="v.$clearExternalResults"
              ></input-comp>
              <button
                class="button is-success level-item"
                :class="{ 'is-loading': isLoading }"
                @click.prevent="login"
                @keypress.enter.prevent="login"
                :disabled="isLoading"
              >
                Регистрация
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue";
import inputComp from "@/components/inputComp.vue";
import { useStore } from "@/store/index";
import {
  AUTH_SIGNIN,
  AUTH_REQUEST,
  AUTH_SET_USERNAME,
} from "@/store/modules/auth";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";

export default defineComponent({
  components: { inputComp },
  name: "Login",
  setup() {
    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    let username: Ref<string> = ref("");
    let password: Ref<string> = ref("");
    let password2: Ref<string> = ref("");
    let isLoading: Ref<boolean> = ref(false);
    const $externalResults = ref({});
    const rules = computed(() => ({
      username: { required },
      password: { required },
      password2: { required: required, same: sameAs(password) },
    }));
    const v = useVuelidate(
      rules,
      { username, password, password2 },
      { $externalResults }
    );
    const login = function () {
      v.value.$touch();
      v.value.$clearExternalResults();
      if (v.value.$error) return;
      isLoading.value = true;
      store
        .dispatch(AUTH_SIGNIN, {
          username: username.value,
          password: password.value,
        })
        .then(() =>
          store.dispatch(AUTH_REQUEST, {
            username: username.value,
            password: password.value,
          })
        )
        .then(() => store.dispatch(AUTH_SET_USERNAME))
        .then(() => {
          router.push((route.query.redirect as string) || "/");
        })
        .catch((error) => {
          $externalResults.value = { username: error };
          console.log(error);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    return { username, password, password2, isLoading, login, v };
  },
});
</script>

<style></style>
