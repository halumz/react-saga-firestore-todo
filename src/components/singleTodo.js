import React, { Component } from 'react';
import InputText from './inputText';
import Switch from 'react-toggle-switch';
import { timeDifference } from '../helper';

import 'react-toggle-switch/dist/css/switch.min.css';

export default class extends Component {
  state = {
    editable: false,
    value: this.props.todo.todo
  };
  render() {
    const { todo, deleteTodo, editTodo, completeTodo } = this.props;
    const { editable, value } = this.state;
    const onEditableClicked = () => {
      this.setState({ editable: !editable });
    };
    const onChange = value => {
      this.setState({ value });
    };
    const onEnter = () => {
      todo.todo = value;
      editTodo(todo);
      this.setState({ editable: false });
    };
    const onComplete = () => {
      todo.completed = !todo.completed;
      completeTodo(todo);
    };
    return (
      <div className="todoHoler">
        <div className="todoGroup">
          <label className="todoLabel">{todo.todo}</label>
          <div className="todoContainer">
            <Switch onClick={onComplete} on={todo.completed} />
          </div>
          <div className="todoContainer">
            <button
              type="button"
              className="todoEdit"
              onClick={onEditableClicked}
            >
              {editable ? 'cancel' : 'edit'}
            </button>
          </div>
          <div className="todoContainer">
            <button
              type="button"
              className="todoDelete"
              onClick={() => {
                deleteTodo(todo);
              }}
            >
              delete
            </button>
          </div>
        </div>
        <div className="createTime">{timeDifference(todo.createTime)}</div>
        {editable ? (
          <div style={{ paddingBottom: '5px' }}>
            <InputText
              onChange={onChange}
              onEnter={onEnter}
              width="100%"
              id={todo.id}
              value={value}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
