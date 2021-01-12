export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export interface Action {
  type: string;
  todoItem: Todo;
}

export interface State {
  todoList: Todo[];
}
