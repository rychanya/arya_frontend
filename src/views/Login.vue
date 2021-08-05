<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item has-text-centered">
                  <h1 class="title">Войти</h1>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item has-text-centered">
                  <router-link to="/signin" class=""> Регистрация </router-link>
                </div>
              </div>
            </nav>
            <form class="box">
              <input-comp
                :disabled="isLoading"
                placeholder="Имя"
                left="fa-user"
                label="Имя"
                type="text"
                :validation="v.username"
                v-model="v.username.$model"
                @input="v.$clearExternalResults"
              ></input-comp>
              <input-comp
                :disabled="isLoading"
                placeholder="Пароль"
                left="fa-key"
                label="Пароль"
                type="password"
                :validation="v.password"
                v-model="v.password.$model"
                @input="v.$clearExternalResults"
              ></input-comp>
              <button
                class="button is-success"
                :class="{ 'is-loading': isLoading }"
                @click.prevent="login"
                @keypress.enter.prevent="login"
                :disabled="isLoading"
              >
                Войти
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
import { useStore } from "@/store/index";
import { AUTH_REQUEST, AUTH_SET_USERNAME } from "@/store/modules/auth";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import inputComp from "@/components/inputComp.vue";

export default defineComponent({
  components: { inputComp },
  name: "Login",
  setup() {
    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    let username: Ref<string> = ref("");
    let password: Ref<string> = ref("");
    let isLoading: Ref<boolean> = ref(false);
    const $externalResults = ref({});
    const rules = computed(() => ({
      username: { required },
      password: { required },
    }));
    const v = useVuelidate(rules, { username, password }, { $externalResults });
    const login = function () {
      v.value.$touch();
      v.value.$clearExternalResults();
      if (v.value.$error) return;
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
          $externalResults.value = { username: error, password: error };
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
      v,
    };
  },
});
</script>

<style></style>
