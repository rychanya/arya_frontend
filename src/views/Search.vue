<template>
  <div class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-12 is-block">
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  placeholder="Поиск"
                  v-model="q"
                  @keypress.enter="searchMethod(1)"
                />
              </div>
              <div class="control">
                <div
                  class="button"
                  @click="searchMethod(1)"
                  :class="{ 'is-loading': loading }"
                >
                  <span class="icon is-small">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <transition-group
              enter-active-class="animate__animated animate__bounceIn"
              leave-active-class="animate__animated animate__bounceOut"
            >
              <qa-comp v-for="qa in qas" :key="qa._id" :qa="qa"></qa-comp>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { search, QA, Paginator } from "@/api/qa";
import qaComp from "@/components/qaComp.vue";

export default defineComponent({
  name: "Search",
  components: { qaComp },
  setup() {
    let q = ref("");
    let qas = ref<Array<QA>>([]);
    let paginator = ref<Paginator>({ current: 1, all: 1 });
    let loading = ref(false);
    let error = ref(false);
    let errorText = ref("");
    const searchMethod = (page: number) => {
      loading.value = true;
      qas.value = [];
      search(q.value, page)
        .then((data) => {
          qas.value = data;
          // paginator.value = data[1];
        })
        .catch((err) => {
          error.value = true;
          errorText.value = err;
        })
        .finally(() => {
          loading.value = false;
          window.scrollTo(0, 0);
        });
    };

    return {
      q,
      qas,
      loading,
      error,
      errorText,
      searchMethod,
      paginator,
    };
  },
});
</script>

<style></style>
