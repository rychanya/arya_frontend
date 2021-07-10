<template>
  <div v-for="qa in newUploads" :key="qa.id" @click="click(qa)">
    {{ qa.id }}
  </div>
  <br />
  <div v-for="qa in oldUploads" :key="qa.id" @click="click(qa)">
    {{ qa.id }}
  </div>
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
    const newUploads = computed(() => {
      if (upload.value) {
        return upload.value.data.filter((el) => el.new);
      } else {
        return [];
      }
    });
    const oldUploads = computed(() => {
      if (upload.value) {
        return upload.value.data.filter((el) => !el.new);
      } else {
        return [];
      }
    });
    onMounted(() => {
      getUploadByID(upload_id.value).then((data) => {
        upload.value = data;
      });
    });
    const click = function (qa: UploadEl) {
      if (qa.col == "QA") {
        router.push(`/qa/${qa.id}`);
      } else if (qa.col == "QA_INC") {
        router.push(`/qa/inc/${qa.id}`);
      }
    };

    return { upload, upload_id, newUploads, oldUploads, click };
  },
});
</script>

<style></style>
