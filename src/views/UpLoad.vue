<template>
  <div class="field is-grouped">
    <div v-if="!isFileLoad" class="file is-warning control">
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
    <div v-if="isFileLoad" class="control">
      <button class="button is-success" @click="uploadJSON">
        <span class="icon is-small">
          <i class="fas fa-check"></i>
        </span>
        <span>Save</span>
      </button>
    </div>
  </div>
  <template v-for="(t, title) in json_data" :key="title">
    <h1 class="title">{{ title }}</h1>
    <table class="table box">
      <thead>
        <tr>
          <th>#</th>
          <th>Вопрос</th>
          <th>Правильный</th>
          <th>Баллы</th>
          <th>Ответ</th>
          <th>Затраченное время (сек.)</th>
          <th>Тип</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in t" :key="row">
          <td>{{ row["#"] }}</td>
          <td>{{ row["Вопрос"] }}</td>
          <td>{{ row["Правильный"] }}</td>
          <td>{{ row["Баллы"] }}</td>
          <td>{{ row["Ответ"] }}</td>
          <td>{{ row["Затраченное время (сек.)"] }}</td>
          <td>{{ row["Тип"] }}</td>
        </tr>
      </tbody>
    </table>
  </template>
</template>

<script lang="ts">
import XLSX from "xlsx";
import { defineComponent, ref, Ref } from "vue";
import { upload } from "@/api/upload";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const isFileLoad = ref(false);
    const json_data: Ref<any> = ref({});
    const uploadFile = function (event: Event) {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target?.result) {
            const data = new Uint8Array(e.target?.result as ArrayBufferLike);
            const book = XLSX.read(data, { type: "array" });
            let result: any = {};
            book.SheetNames.forEach((name) => {
              const roa = XLSX.utils.sheet_to_json(book.Sheets[name]);
              if (roa.length > 0) result[name] = roa;
            });
            json_data.value = result;
            isFileLoad.value = true;
          }
        };
        reader.readAsArrayBuffer(files[0]);
      }
    };
    const uploadJSON = function () {
      upload(json_data.value).then((id) => {
        console.log(id);
      });
    };
    const click = function (id: string) {
      router.push(`/upload/${id}`);
    };

    return { uploadFile, click, json_data, uploadJSON, isFileLoad };
  },
});
</script>

<style></style>
