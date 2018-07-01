import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link } from 'preact-router';
import style from './style.less';
import GoogleApp from '../google';

import * as actions from './../../actions';
import reduce from '../../reducers';

@connect(reduce, actions)
export default class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
      auth:null,
      fecthingData:false,
      data:null,
      saving:false
		}
    this.googleApp = new GoogleApp(this.changeStage);
	}

	changeStage = (newState)=>{
    this.setState(newState);
    if(newState.auth){
      this.props.signIn();
    } else if(newState.auth===false){
      this.props.signOut();
    }
    
    if(newState.fecthingData){
      this.props.getSheetData();
    }
    if(newState.data){
      this.props.receivedSheetData(newState.data);
    } 
  }
  
  saveData = ()=>{
    this.setState({saving:true});
    this.googleApp.click(this.props.sheetData);
  }

	render() {
    if(!this.state.auth){
      return (
        <header class={style.header}>
          <h1>Sign in to use Bugget App</h1>
          <button class={`${style.auth} icon-user`} onClick={this.googleApp.auth}>authenticate</button>
        </header>  
      );
    }
    let btElem = (<button class={`icon-floppy`} 
    onClick={this.saveData}>Save Bugget</button>);

    if(this.state.saving){
      btElem = <div class={`${style.white} icon-spin1 animate-spin`} />;
    }
		return (
			<header class={style.header}>
				<h1>Bugget App</h1>
				<nav>
          {btElem}
					<Link href="/">Home</Link>
					<Link href="/profile">Me</Link>
				</nav>
			</header>
		);
	}
}
