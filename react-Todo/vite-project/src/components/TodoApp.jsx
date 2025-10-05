import React, { useState } from 'react'
import './TodoApp.css' 

const TodoApp = () => {
  const [todo, setTodo] = useState([])
  const [inpval, setInpVal] = useState("")

  function addTodo() {
    if (inpval.trim() !== "") {
      setTodo([...todo, inpval])
      setInpVal("")
    }
  }

  function deleteTodo(index) {
    setTodo(todo.filter((e, i) => i !== index))
  }

  function editTodo(index) {
    const updatedTodos = [...todo]
    updatedTodos[index] = inpval
    setTodo(updatedTodos)
    setInpVal('')
  }

  function clearAll(){
    setTodo([])
  }

  return (
    <div className="app">
      <div className="todo-container">
        <h1 className="title">To-Do List</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a task..."
            value={inpval}
            onChange={(e) => setInpVal(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
          <button onClick={clearAll}>Clear All</button>
        </div>

      
        {todo.length === 0 ? (
          <p className="empty">Empty Todo List: Add Some Task</p>
        ) : (
          <ol className="todo-list">
            {todo.map((ele, index) => (
              <li key={index} className="todo-item">
                <span className="task-text">{ele}</span>
                <div className="btn-group">
                  <button className="edit-btn" onClick={() => editTodo(index)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteTodo(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

export default TodoApp
