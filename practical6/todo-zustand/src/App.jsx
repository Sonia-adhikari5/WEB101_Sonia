import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import useTodoStore from './store/todoStore'

function App() {
  const todoCount = useTodoStore(state => state.todos.length)
  const completedCount = useTodoStore(
    state => state.todos.filter(todo => todo.completed).length
  )

  return (
    <div>
      <h1>Todo List with Zustand</h1>
      <TodoInput />
      <p>Total todos: {todoCount}</p>
      <p>Completed: {completedCount}</p>
      <TodoList />
    </div>
  )
}

export default App

