import { h, Component } from 'preact';
import style from './style.less';

class Input extends Component {
  render(){
    const { data } = this.props; 
    return (
      <span class={style.budgetInput}>
        <input type="text" name="name" value={data} />
      </span>);
  }
}

export default Input;