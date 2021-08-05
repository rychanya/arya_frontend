<template>
  <div class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-12 is-block">
            <div v-if="!isFileLoad" class="box">
              <p class="block">Выберите файл для загрузки</p>
              <div class="file is-warning control">
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
                    <span class="file-label">Выбрать файл ... </span>
                  </span>
                </label>
              </div>
            </div>
            <div v-if="isFileLoad" class="box">
              <p class="block">
                Если таблица ниже правильная, нажмите сохранить
              </p>
              <div class="control">
                <button class="button is-success" @click="uploadJSON">
                  <span class="icon is-small">
                    <i class="fas fa-check"></i>
                  </span>
                  <span>Сохранить</span>
                </button>
              </div>
            </div>

            <table v-if="isFileLoad" class="table box">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import XLSX from "xlsx";
import { defineComponent, ref, Ref } from "vue";
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
    const normalize_json: Ref<Array<XLSXQA>> = ref([]);
    const uploadFile = function (event: Event) {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target?.result) {
            const data = new Uint8Array(e.target?.result as ArrayBufferLike);
            const book = XLSX.read(data, { type: "array" });
            let result: Array<XLSXQA> = [];
            book.SheetNames.forEach((name) => {
              const roa = XLSX.utils.sheet_to_json(
                book.Sheets[name]
              ) as Array<XLSXQA>;
              if (roa.length > 0) {
                for (const el of roa) {
                  result.push({ title: name, ...el });
                }
              }
            });
            normalize_json.value = result;
            isFileLoad.value = true;
          }
        };
        reader.readAsArrayBuffer(files[0]);
      }
    };
    const uploadJSON = function () {
      upload(normalize_json.value).then((id) => {
        router.push(`/upload/${id}`);
      });
    };
    const click = function (id: string) {
      router.push(`/upload/${id}`);
    };

    return {
      uploadFile,
      click,
      uploadJSON,
      isFileLoad,
      normalize_json,
    };
  },
});
</script>

<style></style>
