import React from 'react';
import { connect } from 'react-redux';
import todoAction from '../redux/todos/actions.js';
import Todo from './singleTodo.js';
import Loader from './loader.js';
import BlankCenterDiv from './blankCenterDiv.js';
import './todos.css';

const {
  deleteTodo,
  editTodo,
  completeTodo,
  allCompleted,
  deleteCompleted,
  showMore
} = todoAction;

const Todos = props => {
  const {
    todos,
    allCompleted,
    deleteCompleted,
    showMore,
    showAllenabled,
    loading
  } = props;
  if (loading) {
    return <BlankCenterDiv text={<Loader />} />;
  }
  if (todos.length === 0) {
    return <BlankCenterDiv text="No Todo" />;
  }
  return (
    <form className="todoForm">
      <div className="todoActions">
        <button type="button" className="todoEdit" onClick={allCompleted}>
          COMPLETE ALL
        </button>
        <button type="button" className="todoDelete" onClick={deleteCompleted}>
          Delete Completed
        </button>
      </div>
      {todos.map(todo => <Todo {...props} key={todo.id} todo={todo} />)}
      {showAllenabled && todos.length > 0 ? (
        <button
          type="button"
          onClick={() => {
            showMore(todos[todos.length - 1]);
          }}
          className="todoShowMore"
        >
          SHOW MORE
        </button>
      ) : (
        ''
      )}
    </form>
  );
};

function mapStateToProps(state) {
  const { todos, showAllenabled, loading } = state.Todos;
  return {
    todos,
    showAllenabled,
    loading
  };
}
export default connect(mapStateToProps, {
  deleteTodo,
  editTodo,
  completeTodo,
  allCompleted,
  deleteCompleted,
  showMore
})(Todos);
