import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/app'
import './styles.scss'

const mountNode = document.getElementById('app')
ReactDOM.render(<App />, mountNode)
