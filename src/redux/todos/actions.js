const actions = {
  CHANGE_TODO: 'CHANGE_TODO',
  ADD_TODO: 'ADD_TODO',
  DELETE_TODO: 'DELETE_TODO',
  EDIT_TODO: 'EDIT_TODO',
  COMPLETE_TODO: 'COMPLETE_TODO',
  EDIT_NEW_TODO: 'EDIT_NEW_TODO',
  ALL_COMPLETED: 'ALL_COMPLETED',
  DELETE_COMPLETED: 'DELETE_COMPLETED',
  SHOW_MORE: 'SHOW_MORE',
  initTodos: () => ({
    type: actions.SHOW_MORE,
    payload: {}
  }),
  editNewTodo: newTodoText => ({
    type: actions.EDIT_NEW_TODO,
    newTodoText
  }),
  addTodo: newTodoText => ({
    type: actions.ADD_TODO,
    payload: { newTodoText }
  }),
  addTodoReturn: todo => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.CHANGE_TODO,
        todos: [todo, ...getState().Todos.todos],
        addTodo: true
      });
    };
  },
  deleteTodo: todo => ({
    type: actions.DELETE_TODO,
    payload: { todo }
  }),
  deleteTodoReturn: deletedTodo => {
    return (dispatch, getState) => {
      const todos = [];
      getState().Todos.todos.forEach(todo => {
        if (deletedTodo.id !== todo.id) {
          todos.push(todo);
        }
      });
      dispatch({
        type: actions.CHANGE_TODO,
        todos
      });
    };
  },
  editTodo: todo => ({
    type: actions.EDIT_TODO,
    payload: { todo }
  }),
  editTodoReturn: editTodo => {
    return (dispatch, getState) => {
      const todos = [];
      getState().Todos.todos.forEach(todo => {
        if (editTodo.id !== todo.id) {
          todos.push(todo);
        } else {
          todos.push(todo);
        }
      });
      dispatch({
        type: actions.CHANGE_TODO,
        todos
      });
    };
  },
  completeTodo: todo => ({
    type: actions.COMPLETE_TODO,
    payload: { todo }
  }),
  allCompleted: () => {
    return (dispatch, getState) => {
      const todos = getState().Todos.todos;
      dispatch({
        type: actions.ALL_COMPLETED,
        payload: { todos }
      });
    };
  },
  completeAllReturn: () => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        todo.completed = true;
        todos.push(todo);
      });
      dispatch({
        type: actions.CHANGE_TODO,
        todos
      });
    };
  },
  deleteCompleted: () => {
    return (dispatch, getState) => {
      const todos = getState().Todos.todos;
      dispatch({
        type: actions.DELETE_COMPLETED,
        payload: { todos }
      });
    };
  },
  deleteCompletedReturn: () => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        if (!todo.completed) {
          todos.push(todo);
        }
      });
      dispatch({
        type: actions.CHANGE_TODO,
        todos
      });
    };
  },
  showMore: todo => ({
    type: actions.SHOW_MORE,
    payload: { todo }
  }),
  showMoreReturn: (newTodos, showAllenabled) => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      dispatch({
        type: actions.CHANGE_TODO,
        todos: [...oldTodos, ...newTodos],
        showAllenabled
      });
    };
  }
};
export default actions;
