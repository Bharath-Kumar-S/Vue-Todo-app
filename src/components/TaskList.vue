<script setup lang="ts">
import type { Task } from "../types";

const props = defineProps<{
  tasks: Task[];
}>();

const emits = defineEmits<{
  toggleDone: [id: string];
  removeTask: [id: string];
}>();
</script>

<template>
  <TransitionGroup name="list" tag="div">
    <article class="task-list" v-for="task in props.tasks" :key="task.id">
      <div class="task-actions">
        <label :class="{ done: task.done }">
          <input
            @change="emits('toggleDone', task.id)"
            :checked="task.done"
            type="checkbox"
            aria-label="Toggle task status"
          />
          {{ task.title }}
        </label>
        <button @click="emits('removeTask', task.id)" class="outline">X</button>
      </div>
    </article>
  </TransitionGroup>
</template>

<style scoped>
.task-list {
  margin-top: 1rem;
}

.task-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: end;
}

.done {
  text-decoration: line-through;
}

.task-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
</style>
