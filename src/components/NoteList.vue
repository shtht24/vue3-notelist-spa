<template>
  <div class="container-md">
    <h1>NoteList</h1>

    <div class="input-container">
      <input
        type="text"
        class="form-control"
        v-model="newNoteTitle"
      >
      <button
        type="button"
        class="btn btn-primary"
        @click="addNote"
      >
        Add note
      </button>
    </div>

    <div
      v-for="note in store.notes"
      :key="note.id"
    >
      <ConfirmWindow
        v-if="confimingNoteId === note.id"
        :id="note.id"
        @confirmDelete="deleteNote(note.id)"
        @cancelDelete="toConfirm('no_id')"
      />
      <div
        v-else
        class="note-container"
      >
        <div class="header-container">
          <h2>{{ note.title }}</h2>
          <div class="button-container">
            <button
              class="btn btn-danger"
              @click="toConfirm(note.id)"
            >
              Delete note
            </button>
            <button
              class="btn btn-secondary"
              @click="$router.push('/' + note.id)"
            >
              Edit note
            </button>
          </div>
        </div>

        
        <div v-if="note.todos.length > 3">
          <div
            v-for="todo in note.todos.slice(0, 3)"
            :key="todo.id"
          >
            <img
              src="../icons/check-circle-fill.svg"
              alt="completed"
              v-if="todo.completed"
            >
            <img
              src="../icons/record-circle-fill.svg"
              alt="incompleted"
              v-else
            >
            {{ todo.title }}
          </div>
          <div class="text-container">and {{note.todos.length - 3}} more...</div>
        </div>

        <div v-else-if="note.todos.length > 0">
          <div
            v-for="todo in note.todos"
            :key="todo.id"
          >
            <img
              src="../icons/check-circle-fill.svg"
              alt="completed"
              v-if="todo.completed"
            >
            <img
              src="../icons/record-circle-fill.svg"
              alt="incompleted"
              v-else
            >
            {{ todo.title }}
          </div>
        </div>

        <p v-else>No todos</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Note } from '../types/Note';
import { store } from '../api/store.js';
import ConfirmWindow from './ConfirmWindow.vue';

export default defineComponent({
  name: 'NoteList',
  components: {
    ConfirmWindow,
  },
  setup() {
    const newNoteTitle = ref('');
    const confimingNoteId = ref('no_id');
    
    const addNote = () => {
      const newNote: Note = {
        id: `Note-${Math.floor(Math.random() * 10000)}`,
        title: newNoteTitle.value,
        todos: [],
      };

      if (newNoteTitle.value !== '') {
        store.notes.push(newNote);
      }
      
      newNoteTitle.value = '';
    };

    const deleteNote = (noteId: string) => {
      store.notes = store.notes.filter((note: Note) => note.id !== noteId);
      confimingNoteId.value = 'no_id';
    };
    const toConfirm = (noteId: string) => {
      confimingNoteId.value = noteId;
    };
    return {
      store,
      newNoteTitle,
      confimingNoteId,
      addNote,
      deleteNote,
      toConfirm,
    };
  },
});
</script>

<style scoped>
.note-container {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
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
</style>
