import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { withRouter } from 'react-router'
import style from './style.less';

import * as actions from './../../actions';
import reduce from '../../reducers';

import Section from './../section';
import Loading from './../loading';
import DatePicker from './../datePicker';

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
      activeDate:null,
      date:{
        startDate:new Date(),
        endDate: new Date()
      },
      datePickerOpened: false
    }
  }

  dateReciever = (date)=> {
    const { activeDate, slug } = this.state;
    this.props.updateBudgetDates({activeDate,date: date.toLocaleDateString('en-gb')}, slug);
  } 

  openDatePicker = (e)=> {
    const dateProp =  e.target.getAttribute('dateProp');
    this.setState({ datePickerOpened: true, activeDate:dateProp });
  }
  
  closeDatePicker = ()=> {
    this.setState({ datePickerOpened: false });
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
    const { datePickerOpened, activeDate } = this.state;
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
        client, film, startDate, endDate, budgetTotal,
        communication, electricity,
        caradds, signs, hotcold, furniture,
        dress, lounge, others
       } = fileData;

      return (
        <div class={style.home}>
          <h1><Input data={client} onChange={this.onChangeClient}/></h1>
          <p><Input data={film} onChange={this.onChangeFilm}/></p>
          <div  class={`${style.date} icon-calendar`} dateProp='startDate' onClick={this.openDatePicker}>{startDate}</div>
          <div  class={`${style.date} icon-calendar`} dateProp='endDate' onClick={this.openDatePicker}>{endDate}</div>
          <div  class={style.total}>{budgetTotal}</div>
          <DatePicker 
            activeDate={fileData[activeDate]}
            closeFunction={this.closeDatePicker} 
            opened={datePickerOpened} 
            dateReciever={this.dateReciever}
          />
          <Section type="communication" slug={slug} data={communication}/>
          <Section type="signs" slug={slug} data={signs}/>
          <Section type="others" slug={slug} data={others}/>
          <Section type="furniture" slug={slug} data={furniture}/>
          <Section type="hotcold" slug={slug} data={hotcold}/>
          <Section type="dress" slug={slug} data={dress}/>
          <Section type="caradds" slug={slug} data={caradds}/>
          <Section type="lounge" slug={slug} data={lounge}/>
          <Section type="electricity" slug={slug} data={electricity}/>
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