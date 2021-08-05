<template>
  <nav class="panel has-background-white has-text-black">
    <div class="panel-heading">
      <p class="title is-5 has-text-black">{{ qa.question }}</p>
      <p class="subtitle is-6 has-text-black">{{ qa.type }}</p>
    </div>

    <a v-if="isInc" class="panel-block has-background-warning"
      >Добавлено сообществом</a
    >

    <template v-if="isOne">
      <a v-for="answer in qa.answers" :key="answer" class="panel-block">
        <span class="panel-icon">
          <i
            class="fas"
            :class="
              answer == qa.correct
                ? 'fa-check has-text-success'
                : 'fa-ban has-text-danger'
            "
            aria-hidden="true"
          ></i>
        </span>
        {{ answer }}
      </a>
    </template>

    <template v-if="isMany">
      <a v-for="answer in qa.answers" :key="answer" class="panel-block">
        <span class="panel-icon">
          <i
            class="fas"
            :class="
              qa.correct.includes(answer)
                ? 'fa-check has-text-success'
                : 'fa-ban has-text-danger'
            "
            aria-hidden="true"
          ></i>
        </span>
        {{ answer }}
      </a>
    </template>

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

    <template v-if="isInc">
      <template v-for="qa_inc in qa.answers" :key="qa_inc.id">
        <a class="panel-block has-background-grey-lighter">{{ qa_inc.id }}</a>
        <a v-for="answer in qa_inc.answer" :key="answer" class="panel-block">
          <span class="panel-icon">
            <i
              class="fas"
              :class="
                qa_inc.is_correct
                  ? 'fa-check has-text-success'
                  : 'fa-ban has-text-danger'
              "
              aria-hidden="true"
            ></i>
          </span>
          {{ answer }}
        </a>
      </template>
    </template>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, computed } from "vue";
import { QA } from "@/api/qa";
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
      return (
        qa.value.type == "Выберите один правильный вариант" && "_id" in qa.value
      );
    });
    const isMany = computed(() => {
      return (
        qa.value.type == "Выберите все правильные варианты" && "_id" in qa.value
      );
    });
    const isDrag = computed(() => {
      return (
        qa.value.type ==
          "Перетащите варианты так, чтобы они оказались в правильном порядке" &&
        "_id" in qa.value
      );
    });
    const isJoin = computed(() => {
      return (
        qa.value.type ==
          "Соедините соответствия справа с правильными вариантами" &&
        "_id" in qa.value
      );
    });
    const isInc = computed(() => {
      return !("_id" in qa.value);
    });
    return { isOne, isMany, isDrag, isJoin, isInc };
  },
});
</script>

<style></style>
