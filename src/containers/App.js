import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewTodo from '../components/newTodo';
import Todos from '../components/todos';
import todoAction from '../redux/todos/actions.js';

const { initTodos } = todoAction;

class App extends Component {
  componentDidMount() {
    this.props.initTodos();
  }
  render() {
    return (
      <div className="App">
        <NewTodo />
        <Todos />
      </div>
    );
  }
}
export default connect(null, {
  initTodos
})(App);
