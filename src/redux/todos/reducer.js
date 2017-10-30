import actions from './actions';

export const step = 5;

const initState = {
  todos: [],
  newTodoText: '',
  showAllenabled: true,
  loading: true
};

export default function todoReducer(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_TODO:
      const newTodoText = action.addTodo ? '' : state.newTodoText;
      const showAllenabled =
        action.showAllenabled !== undefined
          ? action.showAllenabled
          : state.showAllenabled;
      return {
        ...state,
        newTodoText,
        todos: action.todos,
        showAllenabled,
        loading: false
      };
    case actions.EDIT_NEW_TODO:
      return { ...state, newTodoText: action.newTodoText };
    default:
      return state;
  }
}
