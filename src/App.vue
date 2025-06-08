<script setup lang="ts">
import { computed, ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import type { FilterType, Task } from "./types";
import TaskList from "./components/TaskList.vue";
import FilterButton from "./components/FilterButton.vue";

const name = ref("Tasks App");
const tasks = ref<Task[]>([]);
const currentFilter = ref<FilterType>("all");

const totalDone = computed(
  () => tasks.value.filter((task) => task.done).length
);

const totalPending = computed(
  () => tasks.value.filter((task) => !task.done).length
);

const filteredTasks = computed(() => {
  if (currentFilter.value === "all") {
    return tasks.value;
  }
  return tasks.value.filter((task) =>
    currentFilter.value === "done" ? task.done : !task.done
  );
});

const addTask = (newTask: string) => {
  tasks.value.push({
    id: crypto.randomUUID(),
    title: newTask,
    done: false,
  });
};

const toggleDone = (id: string) => {
  const task = tasks.value.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
  }
};

const removeTask = (id: string) => {
  //   tasks.value = tasks.value.filter((task) => task.id !== id);

  const index = tasks.value.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
};
</script>

<template>
  <main>
    <h1>{{ name }}!</h1>
    <TaskForm @add-task="addTask" />

    <h3 v-if="tasks.length === 0">No tasks yet. Add a new task!</h3>
    <h3 v-else>
      {{ totalPending }} tasks remaining. {{ totalDone }} tasks completed.
    </h3>
    <div v-if="tasks.length" class="task-filters">
      <FilterButton
        :currentFilter
        filter="all"
        @changeFilter="currentFilter = 'all'"
      />
      <FilterButton
        :currentFilter
        filter="done"
        @changeFilter="currentFilter = 'done'"
      />
      <FilterButton
        :currentFilter
        filter="pending"
        @changeFilter="currentFilter = 'pending'"
      />
    </div>
    <TaskList
      :tasks="filteredTasks"
      @toggle-done="toggleDone"
      @remove-task="removeTask"
    />
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 1rem auto;
}

.task-filters {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: end;
}
</style>
