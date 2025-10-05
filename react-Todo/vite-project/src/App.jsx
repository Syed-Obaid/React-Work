import { useState } from 'react'
import Button from './components/button'
import './App.css' 
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";  
import TodoApp from './components/todoApp';


const App = () => {
  
  const [todos, setTodos] = useState([])
  const [inp, setInp] = useState("")
  const [editIndex, setEditIndex] = useState(null)  
  const [editText, setEditText] = useState("")      
  
  function handleAddTodo() {
    if (inp.trim() !== "") {
      setTodos([...todos, inp])
      setInp("")
    }
  }
  
  function handleClearAllTodo(){
    setTodos([])
  }
  
  function handleDeleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index))
  }
  
  function handleEdit(index) {
    setEditIndex(index)
    setEditText(todos[index])
  }
  
  function handleSaveEdit(index) {
    const updatedTodos = [...todos]
    updatedTodos[index] = editText
    setTodos(updatedTodos)
    setEditIndex(null)
    setEditText("")
  }
  
  return (
    //   <TodoApp/>
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">To-Do List</h1>

        <div className="input-section">
          <input 
            type="text" 
            placeholder="Enter a new task..." 
            value={inp} 
            onChange={(e) => setInp(e.target.value)} 
            className="todo-input"
          />
          <Button name="Add" className="add-btn" onClick={handleAddTodo} />
          <Button name="Clear All" className="clear-btn" onClick={handleClearAllTodo} />
        </div>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {editIndex === index ? (
                <>
                  <input 
                    type="text" 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)} 
                    className="edit-input"
                  />
                  <Button 
                    name="Save" 
                    className="save-btn" 
                    onClick={() => handleSaveEdit(index)} 
                  />
                </>
              ) : (
                <>
                  <span className="todo-text">{todo}</span>
                  <div className="actions">
                    <Button 
                      name={<FaEdit size={22} />} 
                      className="edit-btn" 
                      onClick={() => handleEdit(index)} 
                    />
                    <Button 
                      name={<MdDeleteForever size={26} />}
                      className="delete-btn" 
                      onClick={() => handleDeleteTodo(index)} 
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
