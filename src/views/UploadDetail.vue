<template>
  <h1 class="title">Отчет об загрузке</h1>
  <h2 class="subtitle">id {{ upload_id }}</h2>
  <template v-if="uploadLen > 0">
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-dark">Всего</span>
          <span class="tag is-info">{{ uploadLen }}</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-dark">Правильных</span>
          <span class="tag is-success">{{ uploadCorrectLen }}</span>
        </div>
      </div>
    </div>
    <table class="table box">
      <thead>
        <tr>
          <th>id</th>
          <th>Новая</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="qa in upload.data" :key="qa.id" @click="click(qa)">
          <td>{{ qa.id }}</td>
          <td>{{ qa.new }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  <template v-else>
    <div class="box">Идет обработка. Обновите страницу позже.</div>
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUploadByID, Upload, UploadEl } from "@/api/upload";
export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    let upload_id: Ref<string> = ref(route.params.id as string);
    let upload: Ref<Upload | undefined> = ref();
    onMounted(() => {
      getUploadByID(upload_id.value).then((data) => {
        upload.value = data;
      });
    });
    const uploadLen = computed(() => {
      if (upload.value) {
        return upload.value.data.length;
      } else {
        return 0;
      }
    });
    const uploadCorrectLen = computed(() => {
      if (upload.value) {
        return upload.value.data.filter((el) => el.new).length;
      } else {
        return 0;
      }
    });
    const click = function (qa: UploadEl) {
      if (qa.col == "QA") {
        router.push(`/qa/${qa.id}`);
      } else if (qa.col == "QA_INC") {
        router.push(`/qa/inc/${qa.id}`);
      }
    };

    return { upload, upload_id, click, uploadLen, uploadCorrectLen };
  },
});
</script>

<style></style>
