<template>
  <section class="section">
    <div class="buttons is-centered">
      <router-link to="/search" class="button">Поиск ответов</router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    let togle = ref(false);

    return { togle };
  },
});
</script>

<style></style>
