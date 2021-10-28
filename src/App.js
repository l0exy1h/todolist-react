import React, { Component } from 'react'
import './App.css'
import Todo from './Todo'
import NewTodo from './NewTodo'

const APISITE = "REDACTED"
const API_KEY = "REDACTED"
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.add_handler = this.add_handler.bind(this)
    this.remove_handler = this.remove_handler.bind(this)
    this.complete_revoke_handler = this.complete_revoke_handler.bind(this)
    this.display_todos = this.display_todos.bind(this)
  }

  render() {
    return (
      <div id="big-center">
        <div id="title">York's Todo List</div>

        <NewTodo add_handler={this.add_handler}/>

        <div id="list-container">
          {this.display_todos(this.state.todos)}
        </div>
      </div>
    )
  }

  complete_revoke_handler(id, completed) {
    console.log(`trying to ${completed ? 'revoke' : 'complete'} '${id}'`)
    let data = { completed: !completed }

    fetch(APISITE + id, {
      method: 'put',
      headers: {
        'x-api-key': API_KEY,
        'Content-type': "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.status !== 200) {
        console.log("[complete_revoke_handler] API Error! Code: " + response.status)
        return
      }
      this.componentDidMount()
    })
  }

  remove_handler(id) {
    console.log(`trying to remove ${id}`)

    fetch(APISITE + id, {
      method: 'delete',
      headers: {
        'x-api-key': API_KEY,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        console.log("[remove_handler] API Error! Code: " + response.status)
        return
      }
      this.componentDidMount()
    })
  }

  add_handler(newtext) {
    console.log(`trying to add '${newtext}'`)
    let data = { text: newtext }

    fetch(APISITE, {
      method: 'post',
      headers: {
        'x-api-key': API_KEY,
        'Content-type': "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.status !== 200) {
        console.log("[add_handler] API Error! Code: " + response.status)
        return
      }
      this.componentDidMount()
    })
  }

  componentDidMount() {
    // Make API call to fetch existing Todos.
    fetch(APISITE, {
      method: 'get',
      headers: {"x-api-key": API_KEY}
    })
    .then((response) => {
      if (response.status !== 200) {
        console.log("[get all todo] API Error! Code: " + response.status)
        return
      }
      return response.json()
    })
    .then((response_json) => {
      console.log(`refreshing all todos:`, response_json)
      this.setState({todos: response_json})
    })
  }

  display_todos(todos)
  {
    // recolor
    let i = 1
    const r_start = 0x44, g_start = 0x47, b_start = 0x5a
    const r_goal = 0x28, g_goal = 0x2a, b_goal = 0x36
    let r = r_start, g = g_start, b = b_start

    // sort by completion and lexicographic order
    todos.sort((todo_a, todo_b) => {
      if (todo_a.completed == false && todo_b.completed) return -1
      else if (todo_a.completed && todo_b.completed == false) return 1
      else {
        let a = todo_a.text.toLowerCase()
        let b = todo_b.text.toLowerCase()
        if (a < b) return -1
        else if (a > b) return 1
        else return 0
      }
    })

    // construct each Todo component
    return todos.map((todo) => {

      // recolor
      r = interpolate(r_start, r_goal, i)
      g = interpolate(g_start, g_goal, i)
      b = interpolate(b_start, b_goal, i)
      let r_int = Math.floor(r), g_int = Math.floor(g), b_int = Math.floor(b)
      let rgbstring = `rgb(${r_int}, ${g_int}, ${b_int})`
      i++

      return(
        <Todo 
        key={todo.id}
        json={todo}
        backgroundColor={rgbstring}
        remove_handler={this.remove_handler}
        complete_revoke_handler={this.complete_revoke_handler}
        />
      )
    })
  }
}


// return a value between a and b
function interpolate(a, b, i)
{
  return Math.pow(i/(i+1.0), 2) * 0.85 * (b-a) + a
}

export default App
