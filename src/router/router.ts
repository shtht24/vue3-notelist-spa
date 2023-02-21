import NoteList from '@/components/NoteList.vue';
import NotePage from '@/components/NotePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    component: NoteList,
  },
  {
    path: '/:id',
    component: NotePage,
  },
]

export const router = createRouter({
  routes,
  history: createWebHistory(),
})