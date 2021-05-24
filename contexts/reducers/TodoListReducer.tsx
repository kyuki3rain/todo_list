import getUniqueStr from "../../helpers/getUniqueStr";

export function reducer(state: TodoListState, action: TodoListAction) {
    switch (action.type) {
      case "add": {
        const id = getUniqueStr();
        return { todo_list: [...state.todo_list, { ...action.value, id }] };
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }
  