import React, { Component } from 'react'
import './App.css'

class NewTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
    this.onChange = this.onChange.bind(this)
    this.add_handler_wrap = this.add_handler_wrap.bind(this)
    this.onkeyup_wrap = this.onkeyup_wrap.bind(this)
  }

  render() {
    return (
      <div className="add-todo-item">
        <input className="todo-input" type="text" placeholder="Add a todo item" value={this.state.value} onChange={this.onChange} onKeyUp={this.onkeyup_wrap(this.props.add_handler)}/>
        <div className="todo-add" onClick={this.add_handler_wrap(this.props.add_handler)}>
          Add
        </div>
      </div>
    )
  }

  add_handler_wrap(add_handler) {
    return () => {
      add_handler(this.state.value)
      this.setState({value: ''})
    }
  }

  onkeyup_wrap(add_handler) {
    return (event) => {
      if (event.keyCode === 13 /* enter */) {
        add_handler(this.state.value)
        this.setState({value: ''})
      }
    }
  }

  onChange(event) {
    this.setState({value: event.target.value})
  }
}

export default NewTodo
