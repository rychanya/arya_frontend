<template>
  <nav
    v-if="pages"
    class="pagination is-centered"
    role="navigation"
    aria-label="pagination"
  >
    <a
      class="pagination-previous"
      v-if="current != 1"
      @click="goTo(current - 1)"
      >Previous</a
    >
    <a class="pagination-next" v-if="current != all" @click="goTo(current + 1)"
      >Next page</a
    >
    <ul class="pagination-list">
      <li v-for="page in pages" :key="page">
        <a
          v-if="page != 0"
          class="pagination-link"
          :class="{ 'is-current': page == current }"
          @click="goTo(page)"
          >{{ page }}</a
        >
        <span v-else class="pagination-ellipsis">&hellip;</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    all: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  },
  emits: ["goto"],
  setup(props, { emit }) {
    const { all, current } = toRefs(props);
    const goTo = function (page: number) {
      emit("goto", page);
    };
    let pages = computed(() => {
      if (all.value == 1) {
        return [] as number[];
      } else {
        let pages_array = new Array(all.value);
        for (let index = 0; index < pages_array.length; index++) {
          pages_array[index] = index + 1;
        }
        let left: number[] = Array.from(
          pages_array.slice(0, current.value - 1)
        );
        if (left.length > 3) {
          left = [...left.slice(0, 1), 0, ...left.slice(-1)];
        }
        let right = pages_array.slice(current.value);
        if (right.length > 3) {
          right = [...right.slice(0, 1), 0, ...right.slice(-1)];
        }
        return [...left, current.value, ...right] as number[];
      }
    });
    return { pages, goTo };
  },
});
</script>

<style></style>
