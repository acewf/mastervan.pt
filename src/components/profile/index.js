import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router'
import style from './style.less';

import * as actions from './../../actions';
import reduce from '../../reducers';

@withRouter
@connect(reduce, actions)
export default class Profile extends Component {
	state = {
		count: 0
	};

  signOut = ()=>{
    const {signOut, history} = this.props;
    signOut();
    gapi.auth2.getAuthInstance().signOut();
    history.push('/');
  }

	render({ user }) {
		return (
			<div class={style.profile}>
				<h1>Profile: {user}</h1>
				<p>This is the user profile for a user named {user}.</p>

        <button class={`${style.auth} icon-user`} onClick={this.signOut}>Sign Out</button>
			</div>
		);
	}
}
