import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Header from './components/Header'
import Routes from './Routes'

export default function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Routes/>
      </Switch>
    </Router>
  )
}
