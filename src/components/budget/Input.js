import { h, Component } from 'preact';
import style from './style.less';

class Input extends Component {
  render(){
    const { data, onChange } = this.props; 
    return (
      <span class={style.budgetInput}>
        <input type="text" name="name" value={data} onChange={onChange} />
      </span>);
  }
}

export default Input;