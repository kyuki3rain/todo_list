import { Todo } from "../../graphql/generated/graphql";
import getUniqueStr from "../../helpers/getUniqueStr";

type TodoListState = {
  todo_list: Array<Todo>,
}

type TodoListAction = {
  type: String,
  value: any
}

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
  