import React from "react";
import './App.css';
import Menu from "./components/Menu";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Menu />
        <Switch>
          <Route path="/" exact/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
