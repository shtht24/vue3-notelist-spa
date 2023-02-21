import type { Todo } from './Todo';

export interface Note {
  id: string;
  title: string;
  todos: Todo[];
}