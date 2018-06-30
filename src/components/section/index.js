import { h, Component } from 'preact';
import style from './section.less';
import Item from './item';

export default class Section extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    const { data } = this.props;
    const { values, title } = data;
    const listOfItems = values.map((itemData)=> {
      return (<Item 
        obs={itemData.obs} 
        name={itemData.name} 
        price={itemData.price}
        dayQtd={itemData.dayQtd}
        quantity={itemData.quantity}
      />)
    })
    return (
      <div class={style.section}>
        <h1>{title}</h1>
        {listOfItems}
      </div>
    );
  }
};
