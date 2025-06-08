<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{ addTask: [newTask: string] }>();

const newTask = ref("");
const error = ref("");

const formSubmitted = () => {
  if (newTask.value.trim()) {
    emit("addTask", newTask.value);
    newTask.value = "";
  } else {
    error.value = "Task cannot be empty.";
  }
};
</script>

<template>
  <form @submit.prevent="formSubmitted">
    <label for="task"
      >New Task:
      <input
        type="text"
        id="task"
        name="task"
        v-model="newTask"
        placeholder="Enter a new task"
        :aria-invalid="!!error || undefined"
        @input="error = ''"
      />
      <small v-if="error" id="invalid-helper">{{ error }}</small>
    </label>
    <div class="add-container">
      <button ty>Add</button>
    </div>
  </form>
</template>

<style scoped>
.add-container {
  display: flex;
  justify-content: end;
  margin-top: 1rem;
}
</style>
