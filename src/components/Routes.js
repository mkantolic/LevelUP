import React, {Component} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';

import Main from "./Main.js";
import Info from "./Info.js";

export default class Routes extends Component {
	render() {
		return (
			<Router history={history}>
				<Switch>	
					<Route path="/" exact component = {Main} />
					<Route path="/info" component = {Info} />
				</Switch>
			</Router>
			)
	}
}