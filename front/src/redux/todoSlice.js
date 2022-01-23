import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
  const response = await fetch('http://localhost:7000/todos');
  if(response.ok) {
    const todos = await response.json();
    return { todos }
  }
});

export const addTodoAsync = createAsyncThunk(
    'todo/addTodoAsync',
    async (payload) => {
      const response = await fetch('http://localhost:7000/todos', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(payload),
      });
      if(response.ok) {
        const todo = await response.json();
        return { todo }
      }
    });

export const toggleCompleteAsync = createAsyncThunk('todos/completeTodoAsync',
    async (payload) => {
  const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify({ completed: payload.completed })
  });
  if(response.ok) {
    const todo = await response.json();
    return { todo }
  }
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (payload) => {
  const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json'
    }
  });
  if(response.ok) {
    const todos = await response.json();
    return { todos }
  }
})

const todoSlice = createSlice({
  name: 'todos',
  initialState: [
    { id: 1, title: 'todo1', completed: false },
    { id: 2, title: 'todo2', completed: false },
    { id: 3, title: 'todo3', completed: true }
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false
      }
      state.push(newTodo);
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload.id);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex(todo =>  todo.id === action.payload.id );
      state[index].completed = action.payload.completed;
    }
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state,action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(todo =>  todo.id === action.payload.todo.id);
      state[index] = action.payload.todo;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    }
  }
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
