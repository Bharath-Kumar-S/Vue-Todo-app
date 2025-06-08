<script setup lang="ts">
import type { FilterType } from "../types";

const props = defineProps<{
  filter: FilterType;
}>();

const emits = defineEmits<{
  changeFilter: [filter: FilterType];
}>();
</script>

<template>
  <button class="secondary" @click="emits('changeFilter', props.filter)">
    {{ props.filter }}
  </button>
</template>
