import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Header from './components/Header'
import Routes from './Routes'
import	Navtop from './components/NavTop'

export default function App() {
  return (
    <Router>
      <Navtop/>
      <Switch>
        <Routes/>
      </Switch>
    </Router>
  )
}
