import React from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Detail from './components/Detail'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
