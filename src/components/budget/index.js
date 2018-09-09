import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router'
import style from './style.less';

import * as actions from './../../actions';
import reduce from '../../reducers';

import Section from './../section';
import Loading from './../loading';

@withRouter
@connect(reduce, actions)
class Budget extends Component {
  constructor(props){
    super(props);
    this.state = {
      slug:null
    }
  }

  componentWillReceiveProps(nextProps){
    const { match:{params}, sheetData} = nextProps;
    const { slug } = params;
    console.log('[componentWillReceiveProps]');
    if((sheetData[slug]===undefined) && (slug!==this.state.slug)){
      console.log('Times RUN');
      nextProps.getSheetData(slug);
      this.setState({slug:slug})
    }
  }

  componentWillUpdate(){
    console.log('componentWillUpdate');
  }
  
  render() {
    const { sheetData, auth, slug} = this.props;
    console.log('[RENDER BUDGET]', slug);
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
          <Section type="communication" data={communication}/>
          <Section type="electricity" data={electricity}/>
          <Section type="others" data={others}/>
          <Section type="hotcold" data={hotcold}/>
          <Section type="signs" data={signs}/>
          <Section type="dress" data={dress}/>
          <Section type="caradds" data={caradds}/>
          <Section type="lounge" data={lounge}/>
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
        <Loading/>
      );
    }
  }
};

export default Budget;