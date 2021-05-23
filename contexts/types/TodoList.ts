type Todo = {
    title: String,
    body: String
}

type TodoList = Array<Todo>;

type TodoListState = {
    todo_list: TodoList,
}

type TodoListAction = {
    type: String,
    value: any
}
