import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './item.less';

import * as actions from './../../actions';
import reduce from '../../reducers';

const getSum = (total, num)=> {
  return Number(total) + Number(num);
}

@connect(reduce, actions)
export default class Item extends Component {
  constructor(props){
    super(props);

    const { dayQtd, quantity, slug } = props;
    const days = dayQtd.length ? dayQtd.split(',').map(i=>Number(i)) : [Number(dayQtd)];
    this.state = {
      days,
      slug,
      quantity:Number(quantity)
    }
  }

  updateStateData = (data)=>{
    if(data.days){
      const { slug } = this.state;
      this.props.updateSectionData({
        type:this.props.type, 
        index:this.props.index,
        data:data.days
      }, slug);
    }
  }

  removeDay = (index)=>{
    const days = this.state.days;
    days.splice(index,1);
    const quantity = days.length>0? days.reduce(getSum) : 0;
    this.updateStateData({days, quantity});
  }

  addDay = ()=>{
    const days = this.state.days;
    days.push(0);
    this.updateStateData({days});
  }

  addQtd = (index)=>{
    const qtd = Number(this.state.days[index]);
    let days = this.state.days;
    days[index] = (qtd+1);
    const quantity = days.reduce(getSum);
    this.updateStateData({days,quantity});
  }

  removeQtd = (index)=>{
    const qtd = Number(this.state.days[index]);
    if(qtd-1>=0){
      const days = this.state.days;
      days[index] = Number(qtd-1);
      const quantity = days.reduce(getSum);
      this.updateStateData({days, quantity});
    }
  }


  dayQuantity = (itemsPerDay, index)=>{
    return (
      <li key={index}>
        <div>day {index+1}</div>
        <button onClick={this.removeQtd.bind(this,index)} class={`icon-minus`} />
        {itemsPerDay}
        <button onClick={this.addQtd.bind(this,index)} class={`icon-plus`} />
        <button onClick={this.removeDay.bind(this,index)} class={`icon-trash`}/>
      </li>);
  }

  render() {
    const { price, name, quantity, dayQtd } = this.props;
    const { days } = this.state;
    const listOfDays = days.map(this.dayQuantity);
    return (
      <div  class={style.item}>
        <div class={style.itemProps}>
          <h5>{name}</h5>
          <div class={style.price}>Item Price:{price}€</div>
          <div class={style.quantity}>Total Quantity:{quantity}</div>
          <button onClick={this.addDay}  class={`${style.addDay} icon-calendar-plus-o`}>Add</button>
        </div>
        <ul>
          {listOfDays}
        </ul>
      </div>
    );
  }
};
