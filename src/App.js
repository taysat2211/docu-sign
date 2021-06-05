import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Login from './modules/login/Login'
import Signup from './modules/signup/Signup'
import  Home from './modules/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Detail from "./modules/file-detail/Detail";
import Notice from './modules/Notice/Notice';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} /> 
          <Route path="/signup" component={Signup}/>
          <Route path="/home" render={props => 
            localStorage.getItem('access_token') !== null
            ? (
              <Home {...props} />
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          } />
          <Route path="/file/detail/1" render={props => 
            localStorage.getItem('access_token') !== null
            ? (
              <Detail {...props} />
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          } />
          <Route path="/signup-notification" component={Notice}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
