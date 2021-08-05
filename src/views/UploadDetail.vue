<template>
  <div class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-12 is-block">
            <h1 class="title">Отчет об загрузке</h1>
            <h2 class="subtitle">id {{ upload_id }}</h2>
            <template v-if="isLoaded">
              <div class="box">
                Успешно загружен
                <div class="field is-grouped is-grouped-multiline">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark">Всего</span>
                      <span class="tag is-info">{{ uploadLen }}</span>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark">Новых</span>
                      <span class="tag is-success">{{ uploadNewLen }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="box">Идет обработка. Обновите страницу позже.</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUploadByID, Upload, UploadEl } from "@/api/upload";
export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    let upload_id: Ref<string> = ref(route.params.id as string);
    let upload: Ref<Upload | undefined> = ref(undefined);
    let uploadLen: Ref<number> = ref(0);
    let uploadNewLen: Ref<number> = ref(0);
    let isLoaded: Ref<boolean> = ref(false);
    onMounted(() => {
      getUploadByID(upload_id.value).then((data) => {
        upload.value = data;
        uploadLen.value = upload.value.data.length;
        uploadNewLen.value = upload.value.data.filter((el) => el.new).length;
        if (uploadLen.value > 0) {
          isLoaded.value = true;
        }
      });
    });
    const click = function (qa: UploadEl) {
      if (qa.col == "QA") {
        router.push(`/qa/${qa.id}`);
      } else if (qa.col == "QA_INC") {
        router.push(`/qa/inc/${qa.id}`);
      }
    };

    return { upload, upload_id, click, uploadLen, uploadNewLen, isLoaded };
  },
});
</script>

<style></style>
