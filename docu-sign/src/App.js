import React from "react";
import './App.css';
// import Menu from "./components/Menu";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './modules/login/Login'
import Signup from './modules/signup/Signup'
import  Home from './modules/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Detail from "./modules/file-detail/Detail";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} /> 
          <Route path="/signup" component={Signup}/>
          <Route path="/file/detail/1" component={Detail}/>
          <Route path="/Home" component={Home}/>

        </Switch>
      </Router>
    </>
  );
}

export default App;
