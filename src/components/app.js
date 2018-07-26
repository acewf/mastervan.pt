import { h, Component } from 'preact';
import { Provider } from 'preact-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Header from './header';
import Budget from './Budget';
import Home from './home';
import Profile from './profile';
import store from './../store';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  constructor(props){
    super(props);
  }
  
	render() {
		return (
      <Provider store={store}>
        <BrowserRouter>
          <div id="app">
            <Header/>
              <Switch>
                <Route exact 
                  path="/" 
                  render={()=><Home/>
                } />
                <Route  
                  path="/budget/:id" 
                  render={()=> <Budget />
                } />
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