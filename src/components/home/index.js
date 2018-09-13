import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router'
import style from './style.less';

import * as actions from './../../actions';
import reduce from '../../reducers';

import Loading from './../loading';
import Files from './../Files';

import {
  CREATE_BUDGET,
  BUDGET_CREATED,
  RECEIVED_FILES,
  GET_FILES
} from './../../constants';

@withRouter
@connect(reduce, actions)
export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      filesLoaded: false,
      loading: false
    };
  }

  componentWillReceiveProps(nextProps){
    const { googleApp } = nextProps;
    if(googleApp){
      const { action } = googleApp;
      if(action!==this.props.googleApp.action){
        if(action === CREATE_BUDGET){
          this.setState({loading: true});
        }
        if(action === GET_FILES){
          this.setState({loading: true});
        }
        if(action === RECEIVED_FILES){
          this.setState({loading: false});
        }
      }
    }
  }

  getFiles = ()=>{
    const { getFiles, files } = this.props;
    if(files.length<1){
      this.setState({loading:true})
      getFiles();
    }
  }

  render() {
    const { files, auth } = this.props;
    const { loading , filesLoaded} = this.state;

    if(!auth){
      return (
        <div class={style.home}>
          <h1>Sign in first please.</h1>
        </div>
      );
    } else if(!filesLoaded && !loading){
      this.getFiles();
    }

    if(files && !loading){
      return (
        <div class={style.home}>
          <h1>List of budgets</h1>
          <Files data={files}/>
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }
};
