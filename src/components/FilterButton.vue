<script setup lang="ts">
import type { FilterType } from "../types";

const props = defineProps<{
  filter: FilterType;
  currentFilter: FilterType;
}>();

const emits = defineEmits<{
  changeFilter: [filter: FilterType];
}>();
</script>

<template>
  <button
    class="secondary"
    @click="emits('changeFilter', props.filter)"
    :class="{ contrast: props.filter === props.currentFilter }"
  >
    {{ props.filter }}
  </button>
</template>
