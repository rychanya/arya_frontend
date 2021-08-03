<template>
  <section class="section">
    <input-comp
      v-model="username"
      label="Username"
      left="fa-user"
      :disabled="isLoading"
      type="text"
    ></input-comp>
    <input-comp
      v-model="password"
      label="Password"
      left="fa-key"
      :disabled="isLoading"
      type="password"
    ></input-comp>
    <input-comp
      v-model="password2"
      label="Password"
      left="fa-key"
      :disabled="isLoading"
      type="password"
    ></input-comp>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button
          class="button is-primary"
          :class="{ 'is-loading': isLoading }"
          @click="login"
        >
          Sign up
        </button>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import inputComp from "@/components/inputComp.vue";
import { useStore } from "@/store/index";
import { AUTH_SIGNIN, AUTH_SET_USERNAME } from "@/store/modules/auth";
import { useRoute, useRouter } from "vue-router";

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
    const login = function () {
      isLoading.value = true;
      store
        .dispatch(AUTH_SIGNIN, {
          username: username.value,
          password: password.value,
        })
        .then(() => store.dispatch(AUTH_SET_USERNAME))
        .then(() => {
          router.push((route.query.redirect as string) || "/");
        })
        .catch((error) => {
          console.log("err");
          console.log(error);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    return { username, password, password2, isLoading, login };
  },
});
</script>

<style></style>
