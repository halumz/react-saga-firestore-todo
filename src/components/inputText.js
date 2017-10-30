import React, { Component } from 'react';
import './newTodo.css';

export default class extends Component {
  componentDidMount() {
    document.getElementById(this.props.id).focus();
  }
  render() {
    const { value, id } = this.props;
    const onChange = event => {
      this.props.onChange(event.target.value);
    };
    const onKeyPress = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (value) {
          this.props.onEnter(value);
        } else {
          alert('No data');
        }
      }
    };
    return (
      <input
        id={id}
        className="inputTodo"
        placeholder="New Todo"
        type="text"
        required=""
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={value}
      />
    );
  }
}
