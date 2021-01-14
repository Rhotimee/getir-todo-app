export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  detail?: string;
  deadline?: Date;
}
export interface State {
  todoList: TodoList;
  showTodoModal: ShowTodoModal;
  loading: boolean;
  username: string | null
}

export interface ShowTodoModal {
  isVisible: boolean;
  selected: null | Todo;
}

export interface TodoList {
  loading: boolean;
  error: boolean;
  data: Todo[];
}
