<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div
      class="control"
      :class="{ 'has-icons-left': left, 'has-icons-right': right }"
    >
      <input
        class="input"
        :class="[color]"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="disabled"
      />
      <span v-if="left" class="icon is-small is-left">
        <i class="fas" :class="[left]"></i>
      </span>
      <span v-if="right" class="icon is-small is-right">
        <i class="fas" :class="[right]"></i>
      </span>
    </div>
    <p v-if="help" class="help" :class="[color]">{{ help }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: [
    "modelValue",
    "label",
    "help",
    "placeholder",
    "type",
    "color",
    "left",
    "right",
    "disabled",
  ],
  emits: ["update:modelValue"],
});
</script>

<style></style>
