import NoteList from '@/components/NoteList.vue';
import Note from '@/components/Note.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    component: NoteList,
  },
  {
    path: '/:id',
    component: Note,
  },
]

export const router = createRouter({
  routes,
  history: createWebHistory(),
})