import React from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './modules/login/Login'
import Signup from './modules/signup/Signup'
import Notice from './modules/Notice/Notice'
import 'bootstrap/dist/css/bootstrap.min.css';
import Detail from './modules/file-detail/Detail';
import Menu from './components/Menu';

function App() {
	return (
		<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/signup" component={Signup} />
          			<Route path="/signup-notification" component={Notice} />
					<Route path="/file/detail/1" component={Detail} />
				</Switch>
		</Router>
	);
}

export default App;
