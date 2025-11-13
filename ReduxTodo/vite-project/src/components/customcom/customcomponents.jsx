import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from './features/todoSlice'

function App() {
  const [input,setInput] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector((state)=>state.todo)
  function addTodofn(){
    dispatch(addTodo({
      task: input
    }))
    console.log(input)
    setInput('')
  }
  return (
    <div>
    <input type="text" name="" id="" value={input} onChange={(e)=> setInput(e.target.value)} />
    <button onClick={addTodofn}>add</button>
    {
  todos.map((item) => (
    <p key={item.id}>{item.task}</p>
  ))
}

    </div>
  )
}

export default App
