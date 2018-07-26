import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link } from 'preact-router';
import style from './style.less';

import * as actions from './../../actions';
import reduce from '../../reducers';

import Loading from './../loading';
import Files from './../Files';

@connect(reduce, actions)
export default class Home extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    const { files, auth } = this.props;

    if(!auth){
      return (
        <div class={style.home}>
          <h1>Sign in first please.</h1>
        </div>
      );
    }

    if(files){
      return (
        <div class={style.home}>
          <h1>List of budgets</h1>
          <Files data={files}/>
        </div>
      );
    } else {
      return (
        <Loading style={style}/>
      );
    }
  }
};
