<template>
  <nav class="panel">
    <div class="panel-block has-background-light">
      <div class="container">
        <p class="title is-5">{{ qa.question }}</p>
        <p class="subtitle is-6">{{ qa.type }}</p>
      </div>
    </div>
    <div class="panel-block">
      <table class="table is-fullwidth" v-if="isOne">
        <tbody>
          <tr
            v-for="answer in qa.answers"
            :key="answer"
            :class="{ 'has-background-success': answer == qa.correct }"
          >
            <td>{{ answer }}</td>
          </tr>
        </tbody>
      </table>

      <table class="table is-fullwidth" v-if="isMany">
        <tbody>
          <tr
            v-for="answer in qa.answers"
            :key="answer"
            :class="{
              'has-background-success': qa.correct.includes(answer),
            }"
          >
            <td>{{ answer }}</td>
          </tr>
        </tbody>
      </table>

      <table class="table is-fullwidth" v-if="isDrag">
        <tbody>
          <tr
            v-for="(answer, index) in qa.correct"
            :key="answer"
            class="has-background-success"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ answer }}</td>
          </tr>
        </tbody>
      </table>

      <table class="table is-fullwidth" v-if="isJoin">
        <tbody>
          <tr
            v-for="(extra, answer) in qa.correct"
            :key="answer"
            class="has-background-success"
          >
            <td>{{ answer }}</td>
            <td>{{ extra }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, computed } from "vue";
import { QA } from "@/api/api";
export default defineComponent({
  props: {
    qa: {
      type: Object as PropType<QA>,
      required: true,
    },
  },
  setup(props) {
    const { qa } = toRefs(props);
    const isOne = computed(() => {
      return qa.value.type == "Выберите один правильный вариант";
    });
    const isMany = computed(() => {
      return qa.value.type == "Выберите все правильные варианты";
    });
    const isDrag = computed(() => {
      return (
        qa.value.type ==
        "Перетащите варианты так, чтобы они оказались в правильном порядке"
      );
    });
    const isJoin = computed(() => {
      return (
        qa.value.type ==
        "Соедините соответствия справа с правильными вариантами"
      );
    });
    return { isOne, isMany, isDrag, isJoin };
  },
});
</script>

<style></style>
