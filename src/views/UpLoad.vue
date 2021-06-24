<template>
  <div class="file is-boxed is-warning is-centered">
    <label class="file-label">
      <input
        class="file-input"
        type="file"
        name="resume"
        @change="previewFiles"
      />
      <span class="file-cta">
        <span class="file-label"> Choose a file… </span>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue";
import { upload } from "@/api/qa";

export default defineComponent({
  setup() {
    let file: Ref<File | null> = ref(null);
    const filename = computed(() => {
      return file.value?.name;
    });
    const previewFiles = function (event: Event) {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        file.value = files[0];
        upload(files[0]).then((data) => console.log(data));
      } else {
        file.value = null;
      }
    };
    return { previewFiles, file, filename };
  },
});
</script>

<style></style>
