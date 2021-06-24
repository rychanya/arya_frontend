<template>
  <section class="section">
    <input-comp v-model="username" label="Username" left="fa-user"></input-comp>
    <input-comp v-model="password" label="Password" left="fa-key"></input-comp>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button class="button is-primary">Log in</button>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import inputComp from "@/components/inputComp.vue";

export default defineComponent({
  components: { inputComp },
  name: "Login",
  setup() {
    let username: Ref<string> = ref("");
    let password: Ref<string> = ref("");

    return { username, password };
  },
});
</script>

<style></style>
