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

  <table class="table box">
    <thead>
      <tr>
        <th>Страница/#</th>
        <th>Вопрос</th>
        <th>Правильный</th>
        <th>Баллы</th>
        <th>Ответ</th>
        <th>Затраченное время (сек.)</th>
        <th>Тип</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in normalize_json" :key="row">
        <td>{{ row["title"] }}/{{ row["#"] }}</td>
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

<script lang="ts">
import XLSX from "xlsx";
import { defineComponent, ref, Ref, computed } from "vue";
import { upload } from "@/api/upload";
import { useRouter } from "vue-router";

interface XLSXQA {
  "#": string;
  Вопрос: string;
  Правильный: string;
  Баллы: string;
  Ответ: string;
  "Затраченное время (сек.)": string;
  Тип: string;
  title?: string;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const isFileLoad = ref(false);
    const json_data: Ref<{ [key: string]: Array<XLSXQA> }> = ref({});
    const normalize_json = computed(() => {
      let result: Array<XLSXQA> = [];
      for (const [title, qas] of Object.entries(json_data.value)) {
        for (const el of qas) {
          result.push({ title: title, ...el });
        }
      }
      return result;
    });
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
      upload(normalize_json.value[0]).then((id) => {
        console.log(id);
      });
    };
    const click = function (id: string) {
      router.push(`/upload/${id}`);
    };

    return {
      uploadFile,
      click,
      json_data,
      uploadJSON,
      isFileLoad,
      normalize_json,
    };
  },
});
</script>

<style></style>
