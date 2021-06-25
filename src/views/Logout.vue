<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          <span class="icon">
            <i class="fas fa-spinner fa-pulse"></i>
          </span>
          {{ message }}
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, Ref } from "vue";
import { useStore } from "@/store/index";
import { AUTH_LOGOUT } from "@/store/modules/auth";
import { useRouter } from "vue-router";

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    let message: Ref<string> = ref("Logout");
    const logout = function () {
      return delay(500).then(() => {
        if (isAuthenticated.value) {
          store.commit(AUTH_LOGOUT);
          message.value = "You loged out";
        } else {
          message.value = "You alredy loged out";
        }
      });
    };
    const redirect = function () {
      return delay(500).then(() => {
        message.value = "Redirect";
        router.push("/");
      });
    };
    onMounted(() => {
      logout().then(redirect);
    });

    return { isAuthenticated, message };
  },
});
</script>

<style></style>
