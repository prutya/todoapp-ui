import React from 'react'
import Todo from './Todo'
import SpinnerWrapper from './SpinnerWrapper'
import NoEntriesMessage from './NoEntriesMessage'
import ErrorMessage from './ErrorMessage'

const TodoList = ({ todos, onTodoClick, isFetching, onErrorClick, errorMessage }) => {
  const wrapGutter = (gutter) => (
    <ul className='todo-list'>
      <SpinnerWrapper active={isFetching} paddingTop="120px"/>
      {gutter}
    </ul>
  )

  if (isFetching) {
    return wrapGutter(null)
  }

  if (!!errorMessage) {
    return wrapGutter(
      <ErrorMessage
        onBtnClick={() => onErrorClick()}
        text={errorMessage}
      />
    )
  }

  if (!todos.length) {
    return wrapGutter(
      <NoEntriesMessage/>
    )
  }

  return wrapGutter(
    todos.map(todo =>
      <Todo
        key={todo.id}
        completed={todo.completed}
        onClick={() => onTodoClick(todo.id)}
      >
        {todo.title}
      </Todo>
    )
  )
}

export default TodoList
