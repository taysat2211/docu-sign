import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Login from './modules/login/Login'
import Signup from './modules/signup/Signup'
import  Home from './modules/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Detail from "./modules/file-detail/Detail";
import Notice from './modules/Notice/Notice';
import AppContext from './components/appContext';
import { useState } from "react";

function App() {
  const  [previewLink, setLink ] = useState('gg drive link'); 

  const [ fileId, setFileId ] = useState('1');

  return (
    <>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} /> 
            <Route path="/signup" component={Signup}/>
            <Route path='/home' render={props => 
              localStorage.getItem('access_token') !== null
              ? (
                <AppContext.Provider value={{ previewLink, setLink, fileId, setFileId }}>
                  <Home {...props} />
                </AppContext.Provider>
              ) : (
                <Redirect to={{ pathname: "/" }} />
              )
            }/>
            <Route path="/file/detail" render={props => 
              localStorage.getItem('access_token') !== null
              ? (
                <AppContext.Provider value={{ previewLink, setLink, fileId, setFileId }}>
                  <Detail {...props} />
                  </AppContext.Provider>
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
