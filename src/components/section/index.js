import { h, Component } from 'preact';
import style from './section.less';
import Item from './item';

export default class Section extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    const { data, type, slug } = this.props;
    const { values, title } = data;
    const listOfItems = values.map((itemData, index)=> {
      return (<Item 
        type={type}
        slug={slug}
        obs={itemData.obs} 
        name={itemData.name} 
        price={itemData.price}
        dayQtd={itemData.dayQtd}
        quantity={itemData.quantity}
        index={index}
      />)
    })
    return (
      <div class={style.section}>
        <div class={style.title}><h1>{title}</h1></div>
        {listOfItems}
      </div>
    );
  }
};
