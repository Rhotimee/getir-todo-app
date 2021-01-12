export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  detail?: string;
  deadline?: Date[];
}
export interface State {
  todoList: Todo[];
  showTodoModal: ShowTodoModal;
}

export interface ShowTodoModal {
  isVisible: boolean;
  selected: null | Todo;
}
