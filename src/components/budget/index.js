import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router'
import style from './style.less';

import * as actions from './../../actions';
import reduce from '../../reducers';

import Section from './../section';
import Loading from './../loading';

import Input from './Input';

@withRouter
@connect(reduce, actions)
class Budget extends Component {
  constructor(props){
    super(props);
    this.state = {
      slug:null,
      film:null,
      client:null,
    }
  }

  onChangeFilm = (e)=>{
    const { value } = e.target;
    const { match:{params}, sheetData } = this.props;
    const { slug } = params;
    const newFileData = {
      ...sheetData[slug],
      film:value
    }
    this.props.updateBudgetTitle(newFileData, slug);
  }

  onChangeClient= (e)=>{
    const { value } = e.target;
    const { match:{params}, sheetData } = this.props;
    const { slug } = params;
    const newFileData = {
      ...sheetData[slug],
      client:value
    }
    this.props.updateBudgetTitle(newFileData, slug);
  }

  render() {
    const { match:{params}, sheetData, auth, getSheetData } = this.props;
    const { slug } = params;
    const fileData = sheetData[slug];

    if(!auth){
      return (
        <div class={style.home}>
          <h1>Sign in first please.</h1>
        </div>
      );
    }
    if(fileData===undefined && slug!==this.state.slug){
      getSheetData(slug);
      this.setState({slug});
    }
    
    if(fileData){
      const { 
        client, film,
        communication, electricity,
        caradds, signs, hotcold,
        dress, lounge, others
       } = fileData;
      return (
        <div class={style.home}>
          <h1><Input data={client} onChange={this.onChangeClient}/></h1>
          <p><Input data={film} onChange={this.onChangeFilm}/></p>
          <Section type="communication" slug={slug} data={communication}/>
          <Section type="electricity" slug={slug} data={electricity}/>
          <Section type="others" slug={slug} data={others}/>
          <Section type="hotcold" slug={slug} data={hotcold}/>
          <Section type="signs" slug={slug} data={signs}/>
          <Section type="dress" slug={slug} data={dress}/>
          <Section type="caradds" slug={slug} data={caradds}/>
          <Section type="lounge" slug={slug} data={lounge}/>
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