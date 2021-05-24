export function reducer(state: TodoListState, action: TodoListAction) {
    switch (action.type) {
      case "add": {
        return { todo_list: [...state.todo_list, action.value.todo] };
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }
  