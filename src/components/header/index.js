import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import style from './style.less';

import * as actions from './../../actions';
import reduce from '../../reducers';
import { GET_DATA, DATA_SAVED, SAVE_DATA, GET_FILES, SCOPES } from '../../constants';

import { NewBudgetBt, SaveBudgetBt } from './actionButtons'

const screens = {
  CREATE:'CREATE',
  SAVE:'SAVE',
  LOADING:'LOADING'
}

@withRouter
@connect(reduce, actions)
export default class Header extends Component {
	constructor(props){
    super(props);
		this.state = {
      activeScreen:screens.CREATE
		}
  }

  dataSaved = ()=>{
    this.setState({activeScreen:screens.SAVE});
  }
  
  saveData = ()=>{
    const { slug } = this.state;
    const { saveSheetData } = this.props;
    this.setState({ activeScreen:screens.LOADING});
    saveSheetData(slug);
  }

  createBudget = ()=>{
    const { newBudget } = this.props;
    this.setState({activeScreen:screens.LOADING});
    newBudget();
  }

  locationChanged = (props)=>{
    const { match:{params} }= props;
    const { googleApp: { action } } = this.props;
    const { slug } = params;
    const { activeScreen } = this.state;

    const isLoading = (action === GET_DATA || action===GET_FILES || action===SAVE_DATA);
    if(isLoading && activeScreen!==screens.LOADING){
      this.setState({activeScreen:screens.LOADING, slug});
    } else if(!isLoading && slug && activeScreen!==screens.SAVE){
      this.setState({activeScreen:screens.SAVE, slug});
    } else if(!isLoading && slug===undefined  && activeScreen!==screens.CREATE){
      this.setState({activeScreen:screens.CREATE, slug:null});
    }
  }

  componentDidUpdate(){
    const { googleApp: { action } } = this.props;
    const { activeScreen } = this.state;
    if(action===DATA_SAVED && activeScreen===screens.LOADING){
      this.dataSaved();
    }
  }

  signIn = ()=>{
    const { signIn } = this.props; 
    signIn();
    if(gapi){
      const GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.signIn();
    }
  }

	render() {    
    const { auth, appRoot } = this.props;

    if(!auth){
      return (
        <header class={style.header}>
          <h1>Sign in to use Budget App</h1>
          <button class={`${style.auth} icon-user`} onClick={this.signIn}>authenticate</button>
        </header>  
      );
    }
    const { activeScreen } = this.state;
    let btElem;
    switch (activeScreen) {
      case screens.SAVE:
        btElem = <SaveBudgetBt action={this.saveData}/>
        break;
      case screens.LOADING:
        btElem = <div class={`${style.white} icon-spin1 animate-spin`} />
        break;
      default:
        btElem = <NewBudgetBt action={this.createBudget}/> 
        break;
    }
		return (
			<header class={style.header}>
        <Route
          exact
          path="/" 
          render={this.locationChanged} 
        />
        <Route
          exact
          path="/:dir/:slug" 
          render={this.locationChanged} 
        />
				<h1>Budget App</h1>
				<nav>
          {btElem}
					<Link to={`/`}>Home</Link>
					<Link to="/profile">Me</Link>
				</nav>
			</header>
		);
	}
}
