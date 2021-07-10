<template>
  {{ qa }}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import { getQAINC, QAINC } from "@/api/qa";
export default defineComponent({
  setup() {
    const route = useRoute();
    let id: Ref<string> = ref(route.params.id as string);
    let qa: Ref<QAINC | undefined> = ref();
    onMounted(() => {
      getQAINC(id.value).then((data) => {
        qa.value = data;
      });
    });

    return { qa, id };
  },
});
</script>

<style></style>
