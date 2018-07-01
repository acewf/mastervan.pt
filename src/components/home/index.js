import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style.less';

import * as actions from './../../actions';
import reduce from '../../reducers';

import Section from './../section';

@connect(reduce, actions)
export default class Home extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    const { sheetData, auth } = this.props;
    const { 
      client, film,
      communication, electricity,
      caradds, signs, hotcold,
      dress, lounge, others
     } = sheetData;

    if(client){
      return (
        <div class={style.home}>
          <h1>{client}</h1>
          <p>{film}</p>
          <Section data={communication}/>
          <Section data={electricity}/>
          <Section data={others}/>
          <Section data={hotcold}/>
          <Section data={signs}/>
          <Section data={dress}/>
          <Section data={caradds}/>
          <Section data={lounge}/>
        </div>
      );
    } else if(!auth){
      return (
        <div class={style.home}>
          <h1>Sign in first please.</h1>
        </div>
      );
    } else {
      return (
        <div class={style.home}>
          <h1>Loading..</h1>
        </div>
      );
    }
  }
};
