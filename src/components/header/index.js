import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import style from './style.less';
import GoogleApp from '../google';

import * as actions from './../../actions';
import reduce from '../../reducers';

import {NewBudgetBt,SaveBudgetBt} from './actionButtons'

@withRouter
@connect(reduce, actions)
export default class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
      auth:null,
      fecthingData:false,
      data:null,
      saving:false,
      type:null
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
    if(newState.data && this.state.type==='getFiles'){
      this.props.receivedFiles(newState.data);
    }

    if(newState.data && this.state.type==='getData'){
      this.props.receivedSheetData(newState.data);
    } 
  }

  dataSaved = ({status,data})=>{
    this.setState({saving:false});
  }
  
  saveData = ()=>{
    this.setState({saving:true});
    this.googleApp.saveData(this.props.sheetData, this.dataSaved);
  }

  createBudget = ()=>{
    this.setState({saving:true});
    this.googleApp.newBudget(this.budgetCreated);
  }

  budgetCreated = ({status,data})=>{
    if(status){
      const { history } = this.props;
      const {id} = data;
      this.setState({saving:false});
      history.push(`/budget/${id}`);
    }
  }

	render() {
    const { location } = this.props;
    const { pathname }= location;
    console.log(this.props);
     if(!this.state.auth){
      return (
        <header class={style.header}>
          <h1>Sign in to use Budget App</h1>
          <button class={`${style.auth} icon-user`} onClick={this.googleApp.auth}>authenticate</button>
        </header>  
      );
    }
    let btElem = <NewBudgetBt action={this.createBudget}/>;
    if(pathname.length>1){
      btElem = <SaveBudgetBt action={this.saveData}/>;
    }

    if(this.state.saving){
      btElem = <div class={`${style.white} icon-spin1 animate-spin`} />;
    }
		return (
			<header class={style.header}>
				<h1>Budget App</h1>
				<nav>
          {btElem}
					<Link to="/">Home</Link>
					<Link to="/profile">Me</Link>
				</nav>
			</header>
		);
	}
}
