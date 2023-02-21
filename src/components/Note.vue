<template>
  <div class="container-md">
    <router-link to="/" type="button" class="btn btn-primary"> Go home </router-link>
    <div class="header-container">
      <h1> {{ currentNote.title }}</h1>
      <div class="button-container">
        <button class="btn btn-success" @click="saveNote">Save note</button>
        <button class="btn btn-danger" @click="discardNote">Discard note</button>
      </div>
    </div>

    <div class="input-container">
      <input type="text" v-model="newToDoTitle" class="form-control">
      <button class="btn btn-primary" @click="addTodo">Add todo</button>
    </div>

    <div class="todos-container">
      <div v-if="currentNote.todos.length === 0">
        <h2>No todos</h2>
      </div>
      <div v-else>
        <h2>Todos</h2>
        
        <div :key="todo.id" v-for="todo in currentNote.todos">
          <confirm 
            v-if="confimingTodoId === todo.id" 
            :id="todo.id" 
            @confirmDelete="deleteTodo" 
            @cancelDelete="toConfirm('no_id')"
          />
          <div v-else class="todo-container">
          <img 
            src="../icons/check-circle-fill.svg"
            alt="completed"
            v-if="todo.completed" 
            @click="changeStatus(todo.id)"
          >
          <img 
            src="../icons/record-circle-fill.svg"
            alt="incompleted"
            v-else
            @click="changeStatus(todo.id)"
          >
          <img
            src="../icons/x-circle-fill.svg"
            alt="delete"
            @click="toConfirm(todo.id)"
          >
          <div class="text-container">{{ todo.title }}</div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Note } from '../types/Note';
import { store } from '../api/store.js';
import { useRoute, useRouter } from 'vue-router';
import type { Todo } from '../types/Todo';
import Confirm from './Confirm.vue';

export default defineComponent({
  name: 'Note',
  components: {
    Confirm,
  },
  setup() {
    const route = useRoute();
    const newToDoTitle = ref('');
    const confimingTodoId = ref('no_id');
    const router = useRouter();
    const currentNoteIndex = store.notes.findIndex((note: Note) => note.id === route.params.id);
    let currentNote = {...store.notes[currentNoteIndex], todos: [...store.notes[currentNoteIndex].todos]};
    const currentNoteCopy = {...store.notes[currentNoteIndex], todos: [...store.notes[currentNoteIndex].todos]};


    const addTodo = () => {
      const newTodo = {
        id: `todo-${Math.floor(Math.random() * 10000)}`,
        title: newToDoTitle.value,
        completed: false,
      };

      currentNote.todos.push(newTodo);
      newToDoTitle.value = '';
    };

    const deleteTodo = (todoId: string) => {
      currentNote.todos = currentNote.todos.filter((todo: Todo) => todo.id !== todoId);
      confimingTodoId.value = 'no_id';
    };

    const changeStatus = (todoId: string) => {
      // const todoIndex = currentNote.todos.findIndex((todo: Todo) => todo.id === todoId);
      // currentNote.todos[todoIndex].completed = !currentNote.todos[todoIndex].completed; 

      const searchedTodo = currentNote.todos.find((todo: Todo) => todo.id === todoId);
      if (searchedTodo) {
        searchedTodo.completed = !searchedTodo.completed;
      }
    };

    const saveNote = () => {
      store.notes[currentNoteIndex] = currentNote;
      router.push('/');
    };

    const discardNote = () => {
      currentNote.todos = [...currentNoteCopy.todos];
      router.push('/');
    };
    const toConfirm = (todoId: string) => {
      confimingTodoId.value = todoId;
    };
    return {
      store,
      currentNoteIndex,
      currentNote,
      newToDoTitle,
      confimingTodoId,
      addTodo,
      deleteTodo,
      saveNote,
      discardNote,
      changeStatus,
      toConfirm,
    };
  }
});

</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button-container button {
  margin-left: 10px;
}
.input-container {
  display: flex;
  justify-content: space-between;
  height: 50px;
}
.input-container button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
.todos-container {
  margin-top: 20px;
}
.todo-container {
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin-top: 20px;
}
.todo-container img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.text-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 5px;
}
</style>