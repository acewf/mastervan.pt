import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import style from './style.less';

import * as actions from './../../actions';
import reduce from '../../reducers';

import { NewBudgetBt, SaveBudgetBt } from './actionButtons'

const screens = {
  CREATE:'CREATE',
  SAVE:'SAVE',
  SAVING:'SAVING'
}

@withRouter
@connect(reduce, actions)
export default class Header extends Component {
	constructor(props){
    super(props);
		this.state = {
      fecthingData:false,
      saving:false,
      type:null,
      activeScreen:screens.CREATE
		}
  }

  dataSaved = ({status,data})=>{
    this.setState({activeScreen:screens.SAVE});
  }
  
  saveData = ()=>{
    const { googleApp } = this.props;
    this.setState({ activeScreen:screens.SAVING});
    // googleApp.saveData(this.props.sheetData, this.dataSaved);
  }

  createBudget = ()=>{
    const { googleApp, newBudget } = this.props;
    this.setState({activeScreen:screens.SAVING});
    newBudget();
  }

  budgetCreated = ({status,data})=>{
    if(status){
      const { history } = this.props;
      const {id} = data;
      this.setState({activeScreen:screens.SAVE});
      history.push(`/budget/${id}`);
    }
  }

  locationChanged = (props)=>{
    const {match:{params} }= props;
    const { auth } = this.state;
    const { dir,slug }= params;
    if(auth && slug){
      this.setState({activeScreen:screens.SAVE});
    }
  }

	render() {    
    const { auth, signIn } = this.props;

    if(!auth){
      return (
        <header class={style.header}>
          <h1>Sign in to use Budget App</h1>
          <button class={`${style.auth} icon-user`} onClick={signIn}>authenticate</button>
        </header>  
      );
    }
    const { activeScreen } = this.state;
    
    let btElem = activeScreen===screens.CREATE ? <NewBudgetBt action={this.createBudget}/> 
        :<SaveBudgetBt action={this.saveData}/>;

    if(activeScreen.SAVING){
      btElem = <div class={`${style.white} icon-spin1 animate-spin`} />;
    }
		return (
			<header class={style.header}>
        <Route
          path="/:dir/:slug" 
          render={this.locationChanged} 
        />
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
