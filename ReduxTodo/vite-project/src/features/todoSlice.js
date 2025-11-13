import { createSlice,nanoid } from '@reduxjs/toolkit'

const initialState = {
    todo:[]
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo:(state,action)=>{
        const todo = {
            id: nanoid(),
            task: action.payload.task
        }
        state.todo.push(todo)
        console.log("Add New Todo", action.payload.task)
    },
     deleteTodo: (state, action) => {
      state.todo = state.todo.filter(t => t.id !== action.payload)
    },
    editTodo: (state, action) => {
      const edittask = state.todo.find(x => x.id === action.payload.id)
      if (edittask) edittask.task = action.payload.newTask
    }
   
  },
})

export const { addTodo, deleteTodo, editTodo }  = todoSlice.actions
export default todoSlice.reducer