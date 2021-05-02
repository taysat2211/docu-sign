import React from "react";
import './App.css';
import Menu from "./components/Menu";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './modules/login/Login'
import Signup from './modules/signup/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Login} /> 
          <Route path="/signup" component={Signup}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
