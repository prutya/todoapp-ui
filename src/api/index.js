import { v4 } from 'node-uuid'
import { visibilityFilterConstants } from '../constants'

const fakeDatabase = {
  todos: [{
    id: v4(),
    title: 'Learn Ruby',
    completed: true,
  }, {
    id: v4(),
    title: 'Learn C#',
    completed: true,
  }, {
    id: v4(),
    title: 'Learn Java',
    completed: false,
  }],
}

const delay = (ms) => (
  new Promise(resolve => setTimeout(resolve, ms))
)

export const fetchTodos = (filter) => (
  delay(500).then(() => {
    if (Math.random() > 0.75) {
      throw new Error('Doom!')
    }

    switch (filter) {
      case visibilityFilterConstants.SHOW_ALL:
        return fakeDatabase.todos
      case visibilityFilterConstants.SHOW_ACTIVE:
        return fakeDatabase.todos.filter(t => !t.completed)
      case visibilityFilterConstants.SHOW_COMPLETED:
        return fakeDatabase.todos.filter(t => t.completed)
      default:
        throw new Error(`Unknown filter: '${filter}'`)
    }
  })
)

export const createTodo = (title) => (
  delay(500).then(() => {
    const todo = {
      id: v4(),
      title,
      completed: false
    }

    fakeDatabase.todos.push(todo)

    return todo
  })
)

export const toggleTodo = (id) => (
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id)
    todo.completed = !todo.completed

    return todo
  })
)
