import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import configureStore from './configureStore'
import styles from './styles/application.scss'

const store = configureStore()
render(
  <Root store={store} />,
  document.getElementById('root')
)
