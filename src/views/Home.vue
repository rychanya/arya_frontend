<template>
  <section class="section">
    <h1 class="title">Привет!</h1>
    <h2 class="subtitle">
      Теперь можно загружать результаты прохождения тестов в базу. Для этого
      нужно сохранить отчет о прохождении и загрузить его на сайт. Для загрузки
      нужно
      <router-link to="/signin">зарегестрироваться.</router-link>
    </h2>
  </section>
  <section class="section">
    <div class="buttons is-centered">
      <router-link to="/search" class="button">Поиск ответов</router-link>
      <router-link to="/upload" class="button">Загрузка отчета</router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<style></style>
