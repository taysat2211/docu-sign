import './App.css';
import Menu from "./components/Menu";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './modules/login/Login'
import Signup from './modules/signup/Signup'
import Notice from './modules/Notice/Notice'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route> 
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/signup-notification" component={Notice}>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
