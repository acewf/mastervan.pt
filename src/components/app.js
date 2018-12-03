import { h, Component } from 'preact';
import { Provider } from 'preact-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './header';
import Budget from './Budget';
import Home from './home';
import Profile from './profile';
import store from './../store';
import GoogleApp from './google';

export default class App extends Component {
	render() {
    const baseFolder = ''
		return (
      <Provider store={store}>
        <BrowserRouter>
          <div id="app">
            <Header /> 
            <GoogleApp />
            <Switch>
                <Route exact 
                  path="/"
                  render={()=><Home />
                } />
                <Route
                  path={`/budget/:slug`}
                  render={Budget}
                />
                <Route  
                  path={`/profile`}
                  render={()=> <Profile user="me" />
                } />
              </Switch>
          </div>
        </BrowserRouter>
      </Provider>
		);
	}
}