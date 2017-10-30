import React from 'react';
import { connect } from 'react-redux';
import InputText from './inputText';
import todoAction from '../redux/todos/actions.js';
import './newTodo.css';

const { editNewTodo, addTodo } = todoAction;

const NewTodo = ({ newTodoText, editNewTodo, addTodo }) => (
  <div className="formNewTodo" style={{ width: '80%' }}>
    <InputText
      id="newTodoText"
      value={newTodoText}
      onChange={editNewTodo}
      onEnter={addTodo}
    />
  </div>
);

function mapStateToProps(state) {
  const { newTodoText } = state.Todos;
  return {
    newTodoText
  };
}
export default connect(mapStateToProps, {
  editNewTodo,
  addTodo
})(NewTodo);
