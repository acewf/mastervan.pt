import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link } from 'preact-router';
import style from './style.less';
import GoogleApp from '../google';

import * as actions from './../../actions';
import reduce from '../../reducers';

@connect(reduce, actions)
export default class Header extends Component {
	constructor(){
		super();
		this.state = {
      auth:false,
      fecthingData:false,
			data:null
		}
		this.googleApp = new GoogleApp(this.changeStage);
	}

	changeStage = (newState)=>{
    this.setState(newState);
    if(newState.fecthingData){
      this.props.getSheetData();
    }
    if(newState.data){
      this.props.receivedSheetData(newState.data);
    }
    
	}

	render() {
		let renderAuth = <button onClick={this.googleApp.click}>submit to app</button>;
		if(!this.state.auth){
			renderAuth = <button onClick={this.googleApp.auth}>auth to app</button>;
    }
		return (
			<header class={style.header}>
				<h1>Preact App</h1>
				<nav>
					{renderAuth}
					<Link href="/">Home</Link>
					<Link href="/profile">Me</Link>
					<Link href="/profile/john">John</Link>
				</nav>
			</header>
		);
	}
}
