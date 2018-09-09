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
                  path="/budget/:slug" 
                  render={(props)=><Budget {...props}/>}
                />
                <Route  
                  path="/profile" 
                  render={()=> <Profile user="me" />
                } />
                <Route  
                  path="/profile/:user" 
                  render={()=> <Profile />
                } />
              </Switch>
          </div>
        </BrowserRouter>
      </Provider>
		);
	}
}