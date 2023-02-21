import { reactive } from "vue";
import type { Note } from "@/types/Note";

export const store = reactive({
  notes: [
    {
      "id": "Note-2342",
      "title": "Note 1",
      "todos": [
        {
          "id": "todo-1000",
          "title": "sepellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
          "completed": false
        },
        {
          "id": "todo-1004",
          "title": "quis ut nam facilis et officia qui",
          "completed": true
        },
        {
          "id": "todo-1010",
          "title": "lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "completed": false
        },
        {
          "id": "todo-1077",
          "title": "fugiat veniam minus 1", 
          "completed": false
        },
        {
          "id": "todo-1205",
          "title": "et netus et malesuada fames ac turpis egestas",
          "completed": true
        },
        {
          "id": "todo-1065",
          "title": "asperiores ea ipsam voluptatibus modi minima quia sint",
          "completed": false
        },
      ]
    },
    {
      "id": "Note-1212",
      "title": "Note 2",
      "todos": [
        {
          "id": "todo-1002",
          "title": "et porro tempora",
          "completed": true
        },
        {
          "id": "todo-1003",
          "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
          "completed": false
        }
      ]
    },
    {
      "id": "Note-7650",
      "title": "Note 3",
      "todos": [
        {
          "id": "todo-1006",
          "title": "qui ullam ratione quibusdam voluptatem quia omnis",
          "completed": false
        }
      ]
    }
  ] as Note[],
});

