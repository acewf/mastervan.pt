import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';
import GoogleApp from '../googleApp';


export default class Header extends Component {
	constructor(){
		super();
		this.state = {
			auth:false
		}
		this.googleApp = new GoogleApp(this.changeStage);
	}

	changeStage = (e)=>{
		this.setState({
			auth:true
		})
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
