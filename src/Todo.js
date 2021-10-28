import React, { Component } from 'react'
import './App.css' // using the same css because my css is so coupled

class Todo extends Component {
  constructor(props) {
    super(props)
    this.remove_handler_wrap = this.remove_handler_wrap.bind(this)
    this.complete_revoke_handler_wrap = this.complete_revoke_handler_wrap.bind(this)
  }

  render() {
    return (
      <div className="todo-item" style={{backgroundColor: this.props.backgroundColor}}>
        <input className="todo-string" type="text" placeholder={this.props.json.text} value={this.props.json.text} style={{textDecoration: this.props.json.completed ? 'line-through' : 'none'}} readOnly={true}/>
        <div className="todo-complete" onClick={this.complete_revoke_handler_wrap(this.props.complete_revoke_handler)}>
          {this.props.json.completed ? 'Revoke' : 'Complete'}
        </div>
        <div className="todo-remove" onClick={this.remove_handler_wrap(this.props.remove_handler)}>
          Remove
        </div>
      </div>
    )
  }

  remove_handler_wrap(remove_handler) {
    return () => {
      remove_handler(this.props.json.id)
    }
  }

  complete_revoke_handler_wrap(complete_revoke_handler) {
    return () => {
      complete_revoke_handler(this.props.json.id, this.props.json.completed)
    }
  }
}

export default Todo
