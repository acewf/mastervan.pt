import { h, Component } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'preact-router';

import Header from './header';
import Home from './home';
import Profile from './profile';
import store from './../store';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
    console.log('Props:',this.props);
		return (
      <Provider store={store}>
        <div id="app">
          <Header />
          <Router onChange={this.handleRoute}>
            <Home path={`${window.location.pathname}/`} />
            <Profile path={`${window.location.pathname}/profile/`} user="me" />
            <Profile path={`${window.location.pathname}/profile/:user`} />
          </Router>
        </div>
      </Provider>
		);
	}
}
