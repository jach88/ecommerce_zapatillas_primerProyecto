import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
// import Header from './components/Header'
import Routes from './Routes'
import Navtop from './components/NavTop'
import CarritoContextProvider, { CarritoContext } from './context/carritoContext'

export default function App() {
  return (
    <Router>
      <CarritoContextProvider>
      <Navtop/>
      <Switch>
        <Routes/>
      </Switch>
      </CarritoContextProvider>
    </Router>
  )
}
