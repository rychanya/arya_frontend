<template>
  <div class="file is-boxed is-warning is-centered">
    <label class="file-label">
      <input
        class="file-input"
        type="file"
        name="resume"
        @change="uploadFile"
      />
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label"> Choose a file… </span>
      </span>
    </label>
  </div>
  <div v-for="upload in uploads" :key="upload.id" @click="click(upload._id)">
    {{ upload._id }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { upload, Upload, getUploads } from "@/api/upload";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const uploads: Ref<Array<Upload>> = ref([]);
    onMounted(() => {
      getUploads().then((data) => {
        uploads.value = data;
      });
    });
    const uploadFile = function (event: Event) {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        upload(files[0]).then((upload_id) => {
          console.log(upload_id)
          // router.push({ name: "UpLoadDetail", params: { id: upload_id } });
        });
      }
    };
    const click = function (id: string) {
      router.push(`/upload/${id}`);
    };

    return { uploadFile, uploads, click };
  },
});
</script>

<style></style>
